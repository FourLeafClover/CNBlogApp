import { NEWS_API } from '../config/conf'
import axios from 'axios'

const instance = axios.create({
  baseURL: NEWS_API,
  timeout: 1000 * 10,
  withCredentials: true
})

instance.interceptors.request.use(function (config) {
  config.headers['Accept'] = 'application/json'
  config.headers['Content-Type'] = 'application/json'
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  if (response.data.Message.indexOf('登录') >= 0) {
    response.data.Message = '请重新设置登录Cookie'
  }
  return response.data
}, function (error) {
  window.$vm.$toast({
    message: error
  })
  return Promise.reject(error)
})

export default instance
