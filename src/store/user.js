import { getUser, removeUser, setUser, setBlogColl, unCollectBlog, getBlogColl } from '@/utils/user'

const state = {
  user: getUser(),
  blog_coll: getBlogColl()
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  REMOVE_USER (state) {
    state.user = null
  },
  COLLECT_BLOG (state, blog) {
    state.blog_coll.unshift(blog)
    setBlogColl(blog)
  },
  UNCOLLECT_BLOG (state, blog) {
    const index = state.blog_coll.findIndex(x => x.id === blog.id)
    if (index >= 0) {
      state.blog_coll.splice(index, 1)
      unCollectBlog(blog)
    }
  }
}

const actions = {
  SET_USER ({ commit }, user) {
    setUser(user)
    commit('SET_USER', user)
  },
  REMOVE_USER ({ commit }) {
    removeUser()
    commit('REMOVE_USER')
  },
  COLLECT_BLOG ({ commit }, blog) {
    commit('COLLECT_BLOG', blog)
  },
  UNCOLLECT_BLOG ({ commit }, blog) {
    commit('UNCOLLECT_BLOG', blog)
  }
}

export const user = { namespaced: true, state: state, mutations: mutations, actions: actions }
