import Vue from 'vue'
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
  str = str.replace('http://', '')
  return `https://images.weserv.nl/?url=${str}`
}

Vue.filter('dateFormat', dateFormat)
Vue.filter('imgConvert', imgConvert)
