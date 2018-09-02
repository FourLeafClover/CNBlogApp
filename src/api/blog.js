import $http from '../utils/$http'
import { getHomePageConvert, getCommentConvert, userConvert, bloggerConvert } from '@/api/blog.convert'
import Axios from '../../node_modules/axios'
const xmltojson = require('xmltojson')
const options = {
  mergeCDATA: true,
  grokAttr: true,
  grokText: true,
  normalize: true,
  xmlns: true,
  namespaceKey: '_ns',
  textKey: '_text',
  valueKey: '_value',
  attrKey: '_attr',
  cdataKey: '_cdata',
  attrsAsObject: true,
  stripAttrPrefix: true,
  stripElemPrefix: true,
  childrenAsArray: false
}
export function getHomePage (page, pageSize = 50) {
  return $http.get(`/blog/sitehome/paged/${page}/${pageSize}`).then((res) => {
    const data = getHomePageConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function get48Top () {
  return $http.get('/blog/48HoursTopViewPosts/1000').then(res => {
    const data = getHomePageConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function get10TopDigg () {
  return $http.get('blog/TenDaysTopDiggPosts/1000').then(res => {
    const data = getHomePageConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function loadBlogBody (id) {
  return $http.get(`/blog/post/body/${id}`).then(res => {
    const data = res
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function getBlogComment (id, page, pageSize) {
  return $http.get(`/blog/post/${id}/comments/${page}/${pageSize}`).then(res => {
    const data = getCommentConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data == null ? [] : data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function loadUser (name) {
  return $http.get(`/blog/bloggers/search?t=${name}`).then(res => {
    const data = bloggerConvert(xmltojson.parseString(res, options))
    let user = data.find(item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    return Promise.resolve(user)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function loadBlogApp (blogapp, page, pageSize) {
  return $http.get(`/blog/u/${blogapp}/posts/${page}/${pageSize}`).then(res => {
    const data = getHomePageConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function loadBloggerRank (count) {
  return $http.get(`/blog/bloggers/recommend/1/${count}`).then(res => {
    const data = bloggerConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function searchBloggers (keyword) {
  return $http.get(`/blog/bloggers/search?t=${keyword}`).then(res => {
    const data = bloggerConvert(xmltojson.parseString(res, options))
    debugger
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

// WCF获取body接口不稳定.直接从博客园PC端通过连接获取博文body
export function loadBlogBodyFromPC (url) {
  return Axios.get(url).then(res => {
    let body = ''
    if (res.data) {
      let element = document.createElement('div')
      element.innerHTML = res.data
      body = element.querySelector('#cnblogs_post_body').innerHTML
      /* diggCount = Number(element.querySelector('#digg_count').innerHTML)
      buryCount = Number(element.querySelector('#bury_count').innerHTML)
      let diggElem = element.querySelector('#digg_tips')
      if (diggElem) {
        isDigg = diggElem.html().indexOf('您已推荐') >= 0
        isBury = diggElem.html().indexOf('您已反对') >= 0
      } */
    }
    return Promise.resolve(body)
  }).catch(err => {
    return Promise.reject(err)
  })
}
