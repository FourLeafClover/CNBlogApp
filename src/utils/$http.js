import { WCF_API } from '../config/conf'
import axios from 'axios'

const instance = axios.create({
  baseURL: WCF_API,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 1000 * 60
})

instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  window.$vm.$toast({
    message: error.message
  })
  return Promise.reject(error)
})

export default instance
