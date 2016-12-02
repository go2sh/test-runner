const actions = {
  loadTestConfigs(context) {
    var testConfigs = []
    for (var projectPath of atom.project.getPaths()) {
      var configFile = path.join(projectPath, ".trrc")
      try {
        var stat = fs.statSync(configFile)
      } catch (e) {
        return
      }

      var configs
      try {
        configs = yaml.safeLoad(fs.readFileSync(configFile, "utf8"))
      } catch (e) {
        atom.notifications.addError("Could not load test runner config file.", {
          detail: e
        })
        return
      }
      for (var config of configs) {
        config.projectPath = projectPath
        /* Check for no name and generate one */
        if (!("name" in config))
          config.name = "Test Config Nr. " + (configs.indexOf(config)+1)
        /* Check for no runner */
        if (!("runner" in config)) {
          atom.notifications.addWarning("No runner for defined for: " + config.name)
          config.runner = "unknown"
        }
        Object.defineProperty(config, "displayName", {
          get() {
            if (this._runner == null) {
              return this.name
            } else {
              return this.name + " (" + this._runner.name + ")"
            }
          }
        });
        if (config.runner in context.state.runners) {
          config._runner = new context.state.runners[config.runner](config)
          config._runner.onTestStart((test) => {
            context.commit("incrementTestsStarted")
          })
          config._runner.onTestEnd((testResult) => {
            context.commit("addTestResult", testResult)
          })
        } else
          config._runner = null
        testConfigs.push(config)
      }
    }
    context.commit("setTestConfigs", testConfigs)
  },
  runCurrentTestConfig: function(context) {
    var testConfig = context.getters.selectedTestConfig
    if (testConfig == null) {
      atom.notifications.addError("No test config selected.")
      return
    }
    if (testConfig._runner == null) {
      atom.notifications.addError(testConfig.name + "  has no test runner.")
      return
    }
    testConfig._runner.getTests().then(
      (tests) => {
        context.commit("clearTestResults")
        context.commit("setTests", tests)
        testConfig._runner.runAllTests()
      }, (err) => {
        atom.notifications.addError("Failed to load tests for: " + testConfig.name, {detail: err})
      })
  },
  runFailedTests: function(context) {
    var testConfig = context.getters.selectedTestConfig
    if (testConfig == null) {
      atom.notifications.addError("No test config selected.")
      return
    }
    if (testConfig._runner == null) {
      atom.notifications.addError(testConfig.name + "  has no test runner.")
      return
    }
    var failedTests = []
    for (var test of context.state.tests)
      if (test.hasFailed)
        failedTests.push(test)
    context.commit("clearTestResults")
    context.commit("setTests",failedTests)
    testConfig._runner.runTests(failedTests)
  },
  appendRunner(context, options) {
    context.commit("appendRunner", options)
    context.dispatch("loadTestConfigs")
  }
}

module.exports = actions
