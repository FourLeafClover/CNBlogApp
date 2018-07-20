import { newsItemConvert, newsCommentConvert } from '@/api/news.convert'
import $http from '../utils/$http'
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
export function getLastNews (page, pageSize = 50) {
  return $http.get(`/news/recent/paged/${page}/${pageSize}`).then((res) => {
    const data = newsItemConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function getRecommendNews (page, pageSize) {
  return $http.get(`/news/recommend/paged/${page}/${pageSize}`).then((res) => {
    const data = newsItemConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function getHotNews () {
  return $http.get(`/news/hot/100`).then((res) => {
    const data = newsItemConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function getNewsDetail (id) {
  return $http.get(`/news/item/${id}`).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function getNewsComment (id, page, pageSize) {
  return $http.get(`/news/item/${id}/comments/${page}/${pageSize}`).then((res) => {
    const data = newsCommentConvert(xmltojson.parseString(res, options))
    return Promise.resolve(data)
  }).catch((err) => {
    return Promise.reject(err)
  })
}
