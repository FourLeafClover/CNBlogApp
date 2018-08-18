import $http from '../utils/$http'
export function getConf () {
  return $http.get('https://raw.githubusercontent.com/FourLeafClover/CNBlogApp/master/conf.json')
}
