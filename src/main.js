import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vant from 'vant'
import 'vant/lib/vant-css/index.css'
import i18n from './language'
require('./filters')
require('./components')
require('./assets/styles/base.scss')
Vue.prototype.push = function (location) {
  this.$store.dispatch('app/UPDATE_PAGEANIMATION', 1)
  this.$router.push(location)
}
Vue.prototype.goBack = function (index) {
  this.$store.dispatch('app/UPDATE_PAGEANIMATION', -1)
  this.$router.go(index)
}
Vue.use(vant)
Vue.config.productionTip = false
let $vm = new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
window.$vm = $vm
document.addEventListener('deviceready', function () {
  document.addEventListener('backbutton', function () {
    if (window.$vm.$router.currentRoute === 'page-home') {
      window.navigator.app.exitApp()
    } else {
      window.$vm.goBack(-1)
    }
  }, false)
}, false)
