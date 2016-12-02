import Vue from "vue"
import TestRunnerView from "./components/test-runner.vue"

module.exports = {
  testRunnerView: null,

  activate(state) {
    this.testRunnerView = new Vue(TestRunnerView)
    this.testRunnerView.$store.dispatch("loadTestConfigs")
    this.testRunnerView.isVisible = state.isVisible
    this.testRunnerView.$store.commit("setTestTree", state.testTree)
    this.testRunnerView.$store.commit("setTestResults", state.testResults)
    this.testRunnerView.$store.commit("selectTestConfigByIndex",state.selectedTestConfigIndex)

    atom.commands.add("atom-workspace", {
      "test-runner:toggle-view": () => {
        this.testRunnerView.toggle()
      },
      "test-runner:run-current-test-config": () => {
        this.testRunnerView.$store.dispatch("runAllTests")
      },
      "test-runner:select-test-config": () => {

      }
    })
  },

  deactivate() {
    this.testRunnerView.$destroy()
  },

  serialize() {
    return {
      isVisible: this.testRunnerView.$data.isVisible,
      testResults: this.testRunnerView.$store.state.testResults,
      testTree: this.testRunnerView.$store.state.testTree,
      selectedTestConfigIndex: this.testRunnerView.$store.state.selectedTestConfigIndex
    }
  },

  consumeService(service) {
    this.testRunnerView.$store.dispatch("appendRunner", {key: service.key, runner: service.runner})
  }
}
