const mutations = {
  appendRunner(state, {
    key,
    runner
  }) {
    var runners = state.runners
    runners[key] = runner
    state.runners = runners
  },
  selectTestConfigByIndex(state, index) {
    if (index < 0 && index > state.testConfigs.length) return
    state.selectedTestConfigIndex = index
  },
  setTestTree(state, testTree) {
    state.testTree = testTree
  },
  setSelectTest(state, test) {
    state.selectedTest = test
  },
  setTestResults(state, testResults) {
    state.testResults = testResults
  },
  clearTestResults(state) {
    state.testResults = {
      testsStarted: 0,
      testsFinished: 0,
      testsTotal: 0,
      testsPassed: 0,
      testsFailed: 0,
      testsError: 0,
      duration: 0
    }
  },
  setTestConfigs(state, testConfigs) {
    state.testConfigs = testConfigs
  },
  setTests(state, tests) {
    var testTree = {
      childItems: {}
    }
    state.tests.length = 0
    var element = testTree
    var parent = null
    for (var test of tests) {
      element = testTree
      if (test.packageNames instanceof Array) {
        for (var pkgName of test.packageNames) {
          if (typeof element.childItems[pkgName] !== "object") {
            element.childItems[pkgName] = {
              isContainer: true,
              isPackage: true,
              duration: 0,
              name: pkgName,
              parent: parent,
              childItems: {}
            }
          }
          parent = element
          element = element.childItems[pkgName]
        }
      }
      if (typeof test.classname === "string") {
        if (typeof element.childItems[test.classname] !== "object") {
          element.childItems[test.classname] = {
            isContainer: true,
            isClass: true,
            duration: 0,
            name: test.classname,
            parent: parent,
            childItems: {}
          }
        }
        parent = element
        element = element.childItems[test.classname]
      }
      element.childItems[test.testname] = {
        isContainer: false,
        isTest: true,
        filename: test.filename,
        line: test.line,
        column: test.column,
        duration: 0,
        name: test.testname,
        testIdentifier: test.testIdentifier,
        testname: test.testname,
        classname: test.classname,
        packageNames: test.packageNames,
        parent: parent,
        childItems: {},
        hasRun: false,
        hasFailed: false,
        hasError: false,
        log: [],
        traceback: []
      }
      state.tests.push(element.childItems[test.testname])
    }
    state.testResults.testsTotal = tests.length
    state.testTree = testTree
  },
  addTestResult(state, result) {
    /* Discover testTree entry */
    var test = state.testTree.childItems
    if (result.packageNames instanceof Array) {
      for (var pkgName of result.packageNames) {
        test = test[pkgName]
      }
    }
    if (typeof result.classname === "string") {
      test = test.childItems[result.classname]
    }
    if (result.testname in test.childItems) {
      test = test.childItems[result.testname]
    } else {
      return
    }
    /* Set result */
    test.hasRun = true
    test.hasFailed = result.hasFailed
    test.hasError = result.hasError
    test.log = result.log
    test.traceback = result.traceback
    /* recursive duration */
    var entry = test
    while (entry !== null) {
      entry.duration += result.duration
      entry = entry.parent
    }
    state.testResults.duration += result.duration
    state.testResults.testsFinished += 1
    if (result.hasError) state.testResults.testsError += 1
    if (result.hasFailed) state.testResults.testsFailed += 1
  },
  incrementTestsStarted(state) {
    state.testResults.testsStarted += 1
  }
}

module.exports = mutations
