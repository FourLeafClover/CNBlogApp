import { getItem, setItem } from '@/utils/$storage'
import { Version } from '@/config/conf'
import { getConf } from '@/api/app'
const state = {
  pageAnimation: 0,
  openPageAnimation: getItem('cnblog.openPageAnimation') !== null ? getItem('cnblog.openPageAnimation') : true, // 是否开启页面过渡动画,默认开启
  version: Version,
  serveConf: null, // 服务端配置
  openUpdateAppNotice: false,
  readVersion: getItem('cnblog.readVersion'), // 记录是否已经关闭某个版本更新的弹窗,
  isHaveUpdate: false
}
const mutations = {
  UPDATE_PAGEANIMATION (state, animation) {
    state.pageAnimation = animation
  },
  OPEN_PAGEANIMATION (state, isOpen) {
    state.openPageAnimation = isOpen
  },
  GET_SERVECONF (state, conf) {
    state.serveConf = conf
    if (state.serveConf.version.id !== state.version) {
      state.isHaveUpdate = true
      if (state.serveConf.version.fourceUpdate) {
        state.openUpdateAppNotice = true
      } else {
        if (state.readVersion !== state.serveConf.version.id) {
          state.openUpdateAppNotice = true
        }
      }
    }
  },
  CLOSE_UPDATEAPP_NOTICE (state) {
    setItem('cnblog.readVersion', state.serveConf.version.id)
    state.openUpdateAppNotice = false
  }
}
const actions = {
  UPDATE_PAGEANIMATION ({ commit }, animation) {
    commit('UPDATE_PAGEANIMATION', animation)
  },
  OPEN_PAGEANIMATION ({ commit }, isOpen) {
    setItem('cnblog.openPageAnimation', isOpen)
    commit('OPEN_PAGEANIMATION', isOpen)
  },
  GET_SERVECONF ({ commit }) {
    getConf().then(res => {
      if (res) {
        commit('GET_SERVECONF', res)
      }
    })
  },
  CLOSE_UPDATEAPP_NOTICE ({ commit }) {
    commit('CLOSE_UPDATEAPP_NOTICE')
  }
}

export const app = { namespaced: true, state: state, mutations: mutations, actions: actions }
