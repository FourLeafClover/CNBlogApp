import $http from '../utils/$http'
import { getHomePageConvert, getCommentConvert, userConvert, bloggerConvert } from '@/api/blog.convert'
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
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function loadUser (blogApp) {
  return $http.get(`/blog/bloggers/search?t=${blogApp}`).then(res => {
    const data = userConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
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
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}
