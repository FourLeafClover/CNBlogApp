import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './action'
import mutations from './mutations'
import * as getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
