const state = {
  runners: {},
  selectedTest: null,
  selectedTestConfigIndex: -1,
  testConfigs: [],
  testTree: {},
  tests: [],
  testResults: {
    testsStarted: 0,
    testsFinished: 0,
    testsTotal: 0,
    testsPassed: 0,
    testsFailed: 0,
    testsError: 0,
    duration: 0
  }
}

module.exports = state
