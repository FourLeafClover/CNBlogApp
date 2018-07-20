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
Vue.use(vant)
Vue.config.productionTip = false
let $vm = new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
window.$vm = $vm
