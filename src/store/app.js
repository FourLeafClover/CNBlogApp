import { getItem, setItem } from '@/utils/$storage'
import { Version } from '@/config/conf'
import { getConf } from '@/api/app'
let theme = getItem('cnblog.theme')
const state = {
  pageAnimation: 0,
  openPageAnimation: getItem('cnblog.openPageAnimation') !== null ? getItem('cnblog.openPageAnimation') : true, // 是否开启页面过渡动画,默认开启
  version: Version,
  serveConf: null, // 服务端配置
  openUpdateAppNotice: false,
  readVersion: getItem('cnblog.readVersion'), // 记录是否已经关闭某个版本更新的弹窗,
  isHaveUpdate: false,
  theme: theme || 'dodgerblue',
  themeList: ['dodgerblue', 'green', 'red', 'gray', 'purple', 'orange']
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
      if (state.serveConf.version.forceUpdate) {
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
  },
  CHANGE_THEME (state, theme) {
    state.theme = theme
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
  },
  CHANGE_THEME ({ commit }, theme) {
    setItem('cnblog.theme', theme)
    commit('CHANGE_THEME', theme)
  }
}

export const app = { namespaced: true, state: state, mutations: mutations, actions: actions }
