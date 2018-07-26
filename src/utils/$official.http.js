import { OFFICAL_API } from '../config/conf'
import axios from 'axios'

const instance = axios.create({
  baseURL: OFFICAL_API,
  timeout: 1000 * 10,
  withCredentials: true
})

instance.interceptors.request.use(function (config) {
  config.headers['Accept'] = 'application/json'
  config.headers['Content-Type'] = 'application/json'

  // loading 1.5s后太出现,请求快的话就不需要出现
  config.loadingTimeOut = setTimeout(() => {
    config.loading = window.$vm.$toast.loading({
      duration: 10000,
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner'
    })
  }, 500)

  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  if (response.data.Message.indexOf('登录') >= 0) {
    response.data.Message = '请重新设置登录Cookie'
  }
  if (response.config.loading) {
    response.config.loading.clear()
  } else {
    clearTimeout(response.config.loadingTimeOut)
  }
  return response.data
}, function (error) {
  window.$vm.$toast({
    message: error.message
  })
  if (error.config.loading) {
    error.config.loading.clear()
  } else {
    clearTimeout(error.config.loadingTimeOut)
  }
  return Promise.reject(error)
})

export default instance
