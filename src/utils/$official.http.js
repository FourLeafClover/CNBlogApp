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
  config.loading = window.$vm.$toast.loading({
    duration: 10,
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner'
  })
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  if (response.data.Message.indexOf('登录') >= 0) {
    response.data.Message = '请重新设置登录Cookie'
  }
  response.config.loading.clear()
  return response.data
}, function (error) {
  window.$vm.$toast({
    message: error
  })
  return Promise.reject(error)
})

export default instance
