<template>
<div class="test-tree tree-view-resizer tool-panel" ref="content">
  <div class="tree-view-scroller order--center">
    <ol class="tree-view full-menu list-tree has-collapsable-children focusable-panel">
      <TestTreeNode v-for="item in testTree.childItems" v-bind:item="item"/>
    </ol>
  </div>
  <div class="tree-view-resize-handle" ref="handle" v-on:mousedown="startResize" style="right:-5px;"></div>
</div>
</template>
<script>
import $ from "jquery"
import {mapState} from "vuex"

import TestTreeNode from "./test-tree-node.vue"

module.exports = {
  name: "TestTree",
  components: {
    TestTreeNode
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      "testTree"
    ])
  },
  methods: {
    startResize: function (event) {
      this.isResizing = true;
      this.xOld = event.screenX;
      $("body").on("mousemove",this.handleResize);
      $("body").on("mouseup",this.stopResize);
    },
    handleResize: function (event) {
      var obj = $(this.$refs.content)
      if (this.isResizing) {
        obj.width(obj.width() - (this.xOld - event.screenX));
        this.xOld = event.screenX;
      }
    },
    stopResize: function (event) {
      this.isResizing = false;
      $("body").off("moseup",this.stopResize)
      $("body").off("mousemove",this.handleResize)
    }
  }
}
</script>

<style>
.test-runner .test-tree {
  width: 300px;
}
</style>
