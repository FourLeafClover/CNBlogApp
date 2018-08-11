import { getItem, setItem } from '@/utils/$storage'
const state = {
  pageAnimation: 0,
  openPageAnimation: getItem('cnblog.openPageAnimation') !== null ? getItem('cnblog.openPageAnimation') : true // 是否开启页面过渡动画,默认开启
}
const mutations = {
  UPDATE_PAGEANIMATION (state, animation) {
    state.pageAnimation = animation
  },
  OPEN_PAGEANIMATION (state, isOpen) {
    state.openPageAnimation = isOpen
  }
}
const actions = {
  UPDATE_PAGEANIMATION ({ commit }, animation) {
    commit('UPDATE_PAGEANIMATION', animation)
  },
  OPEN_PAGEANIMATION ({ commit }, isOpen) {
    setItem('cnblog.openPageAnimation', isOpen)
    commit('OPEN_PAGEANIMATION', isOpen)
  }
}

export const app = { namespaced: true, state: state, mutations: mutations, actions: actions }
