import Vue from 'vue'
import { ENV } from '@/config/conf'
const dateFormat = (str) => {
  var date = new Date(str)
  var dateGetTime = date.getTime()
  var nowGetTime = new Date().getTime()
  if ((nowGetTime - dateGetTime) < (60 * 1000)) {
    return '1分钟前'
  } else if ((nowGetTime - dateGetTime) < (60 * 60 * 1000)) {
    return '1小时内发布'
  } else {
    return new Date().toLocaleDateString()
  }
}

const imgConvert = (str) => {
  // 开发模式图片要做中转,不然没有权限访问
  if (ENV === 'development') {
    str = str.replace('http://', '')
    return `https://images.weserv.nl/?url=${str}`
  } else {
    return str
  }
}

Vue.filter('dateFormat', dateFormat)
Vue.filter('imgConvert', imgConvert)
