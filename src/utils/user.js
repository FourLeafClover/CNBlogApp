import { setItem, getItem, clearItem } from '@/utils/$storage'
import { setCookie } from '@/utils/$cookie'

export function setAuthCookie (cnblogsCookie) {
  // 存储到缓存
  setItem('cnblog.cookie', cnblogsCookie)
  // Cookie中添加
  if (window.cookieMaster) {
    window.cookieMaster.setCookieValue(
      'www.cnblogs.com',
      '.CNBlogsCookie',
      cnblogsCookie
    )
    window.cookieMaster.setCookieValue('news.cnblogs.com', '.CNBlogsCookie', cnblogsCookie)
  } else {
    setCookie('.CNBlogsCookie', cnblogsCookie)
  }
}

export function initAuthCookie () {
  const cnblogsCookie = getItem('cnblog.cookie')
  if (cnblogsCookie) {
    if (window.cookieMaster) {
      window.cookieMaster.setCookieValue(
        'www.cnblogs.com',
        '.CNBlogsCookie',
        cnblogsCookie
      )
      window.cookieMaster.setCookieValue('news.cnblogs.com', '.CNBlogsCookie', cnblogsCookie)
    } else {
      setCookie('.CNBlogsCookie', cnblogsCookie)
    }
  }
}

export function setUser (user) {
  setItem('cnblog.user', user)
}

export function removeUser (cookie) {
  clearItem('cnblog.user')
}

export function removeAuthCookie (cookie) {
  setAuthCookie('')
}

export function getUser () {
  return getItem('cnblog.user')
}

export function getBlogColl () {
  let coll = getItem('cnblog.blog.coll')
  return coll === null ? [] : coll
}

export function setBlogColl (blog) {
  let coll = getBlogColl()
  coll.unshift(blog)
  setItem('cnblog.blog.coll', coll)
}

export function unCollectBlog (blog) {
  let coll = getBlogColl()
  let index = coll.findIndex(x => x.id === blog.id)
  if (index >= 0) {
    coll.splice(index, 1)
    setItem('cnblog.blog.coll', coll)
  }
}
