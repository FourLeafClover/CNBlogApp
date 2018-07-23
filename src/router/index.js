import Vue from 'vue'
import Router from 'vue-router'
import config from './router'
Vue.use(Router)
// import store from '@/store'
let routers = new Router({
  routes: config
})

routers.beforeEach((to, from, next) => {
  next()
})

export default routers
