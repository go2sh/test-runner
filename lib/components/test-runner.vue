<template>
<div class="test-runner">
  <div class="test-runner-row">
    <TestInfo />
  </div>
  <div class="test-runner-row">
    <TestTree />
    <TestLog />
  </div>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import TestInfo from './test-info.vue'
import TestTree from './test-tree.vue'
import TestLog from './test-log.vue'
import store from '../store'

module.exports ={
  name: "TestRunner",
  store,
  components: {
    TestInfo,
    TestTree,
    TestLog
  },
  data: function () {
    return {
      'isVisible': false
    }
  },
  methods: {
    toggle: function() {
      this.isVisible = !this.isVisible
    },
    ...mapActions([
      'runAllTests',
      'runFailedTests',
    ])
  },
  watch: {
    'isVisible': function() {
      if (this.isVisible) {
        this.panel.show()
      } else {
        this.panel.hide()
      }
    }
  },
  created: function () {
    var element = document.createElement('div')
    this.panel = atom.workspace.addBottomPanel({
      item: element,
      visible: this.isVisible
    })
    this.$mount(element)
  }
}
</script>

<style>
.test-runner {
  display: flex;
  flex-direction: column;
}
.test-runner .test-runner-row {
  display: flex;
  flex-direction: row;
}
.test-runner-row:last-child {
  height: 100%;
}
</style>
