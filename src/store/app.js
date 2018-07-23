
const state = {
  pageAnimation: 0
}
const mutations = {
  UPDATE_PAGEANIMATION (state, animation) {
    state.pageAnimation = animation
  }
}
const actions = {
  UPDATE_PAGEANIMATION ({ commit }, animation) {
    commit('UPDATE_PAGEANIMATION', animation)
  }
}

export const app = { namespaced: true, state: state, mutations: mutations, actions: actions }
