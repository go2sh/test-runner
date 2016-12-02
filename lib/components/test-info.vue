<template>
<div class="test-info">
  <select class="form-control" v-model="selectedTestConfigIndex">
    <option v-for="testConfig, index in testConfigs" v-bind:value="index">
      {{testConfig.displayName}}
    </option>
  </select>
  <button class="btn btn-default fa fa-play" v-on:click="runCurrentTestConfig" ref="runButton"></button>
  <button class="btn btn-default fa fa-times text-error" v-on:click="runFailedTests" ref="runButton" />
  <button class="btn btn-default fa fa-search" v-on:click="loadTestConfigs" ref="searchButton"></button>

  <span>Runs: {{testResults.testsStarted}}/{{testResults.testsTotal}}</span>
  <span>Errors: {{testResults.testsError}}</span>
  <span>Failures: {{testResults.testsFailed}}</span>
  <div class="test-progress" >
    <div
      v-bind:style="{width: progress + '%' }"
      v-bind:class="progressClass"
    />
  </div>
</div>
</template>

<script>
import {mapState, mapActions} from 'Vuex'

module.exports = {
  name: "TestInfo",
  mounted: function() {
    atom.tooltips.add(this.$refs.runButton,{
      title: "Run Test Config",
      placement: "bottom"
    })
    atom.tooltips.add(this.$refs.searchButton,{
      title: "Discover Test Configs",
      placement: "bottom"
    })
  },
  methods: {
    ...mapActions([
      'loadTestConfigs',
      'runCurrentTestConfig',
      'runFailedTests'
    ])
  },
  computed: {
    'progressClass': function () {
      return {
        'progress-successful': !this.testResults.testsError && !this.testResults.testsFailed,
        'progress-error': this.testResults.testsError || this.testResults.testsFailed
      }
    },
    progress: function() {
      if (this.testResults.testsTotal == 0)
        return 0
      return (this.testResults.testsFinished / this.testResults.testsTotal)*100
    },
    'selectedTestConfigIndex': {
      get() {
        return this.$store.state.selectedTestConfigIndex
      },
      set(value) {
        this.$store.commit('selectTestConfigByIndex',value)
      }
    },
    ...mapState([
      'testConfigs',
      'testResults'
    ])
  }
}
</script>

<style>
.test-info {
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.test-info > * {
  margin-left: 10px;
  margin-right: 10px;
}

.test-info:last-child {
  margin-right: 0px;
}

.test-info:first-child {
  margin-left: 0px;
}

.test-info > select {
  flex: 1 1;
}

.test-progress {
  border-radius: 13px; /* (height of inner div) / 2 + padding */
  padding: 3px;
  flex: 3 3;
}

.test-progress > div {
   height: 20px;
   border-radius: 10px;
   width: 0%;
}

</style>
