<template>
<div class="test-log">
  <div ref="terminal" style="width:100%;height: 100%;"></div>
</div>
</template>

<script>
import 'xterm/src/xterm.css'
import Term from 'xterm'
import { mapState } from 'vuex'

module.exports = {
  name: 'TestLog',
  mounted: function() {
    Term.loadAddon("fit")
    this.term = new Term()
    this.term.open(this.$refs.terminal)
  },
  computed: {
    ...mapState([
        'selectedTest'
      ]),
  },
  watch: {
    'selectedTest': function() {
      this.term.fit()
      this.term.clear()
      this.term.write(this.selectedTest.log.join(require('os').EOL))
    }
  }
}
</script>

<style>
.test-log {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 400px;
  min-height: 100px;
}
</style>
