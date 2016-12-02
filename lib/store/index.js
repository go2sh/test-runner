import Vue from "vue"
import Vuex from "vuex"
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

Vue.use(Vuex)

const getters = {
  selectedTestConfig(state) {
    if (state.selectedTestConfigIndex < 0 && state.selectedTestConfigIndex > state.testConfigs.length)
      return null
    else
      return state.testConfigs[state.selectedTestConfigIndex]
  }
}

import state from "./state.js"
import mutations from "./mutations.js"
import actions from "./actions.js"

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
