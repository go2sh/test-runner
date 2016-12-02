<template>
<li class="entry"
    v-bind:class="classObject" v-on:click.stop="onClick" v-on:dblclick.stop="onDblClick">
  <div class="header list-item" v-bind:class="{'test-failed': item.hasFailed}">
    <span class="name icon" v-bind:class="iconClass" />
    <span>{{ item.name }}</span>
    <span v-if="item.duration > 0.0" class="test-time">&nbsp;({{ item.duration.toFixed(3) }}s)</span>
  </div>
  <ol class="entries list-tree">
    <TestTreeNode v-for="child in item.childItems" v-bind:item="child" />
  </ol>
</li>
</template>

<script>

module.exports = {
  name: "TestTreeNode",
  props: [
    'item'
  ],
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    onClick: function (event) {
      this.isExpanded = !this.isExpanded;
      if (this.item.isTest)
        this.$store.commit('setSelectTest',this.item)
    },
    onDblClick: function(event) {
      if (this.item.isTest) {
        if (this.item.filename !== undefined) {
          atom.workspace.open(this.item.filename, {
            initialLine: this.item.line-1,
            initialColumn: this.item.column-1
          })
        }
      }
    }
  },
  computed: {
    classObject: function () {
      return {
        directory: this.item.isContainer,
        'list-nested-item': this.item.isContainer,
        expanded: this.isExpanded,
        collapsed: !this.isExpanded,
        file : !this.item.isContainer,
        'list-item' : !this.item.isContainer,
        selected: this.item === this.$store.state.selectedTest
      }
    },
    iconClass: function () {
      return {
        'fa fa-cubes': this.item.isPackage,
        'fa fa-file-code-o' : this.item.isClass,
        'fa fa-list-ul' : this.item.isTest
      }
    }
  }
}

</script>
