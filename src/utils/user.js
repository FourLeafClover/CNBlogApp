import { setItem, getItem, clearItem } from '@/utils/$storage'
import { setCookie } from '@/utils/$cookie'

export function setAuthCookie (cnblogsCookie) {
  // 存储到缓存
  setItem('cnblog.cookie', cnblogsCookie)
  setCookie('.CNBlogsCookie', cnblogsCookie)
  // Cookie中添加
  if (window.cookieMaster) {
    window.cookieMaster.setCookieValue(
      'www.cnblogs.com',
      '.CNBlogsCookie',
      this.cookie
    )
    window.cookieMaster.setCookieValue('news.cnblogs.com', '.CNBlogsCookie', cnblogsCookie)
  }
}

export function initAuthCookie () {
  const cnblogsCookie = getItem('cnblog.cookie')
  const aspNetCoreCookies = getItem('cnblog.aspnetcookie')
  if (cnblogsCookie) {
    setCookie('.CNBlogsCookie', cnblogsCookie)
    if (window.cookieMaster) {
      window.cookieMaster.setCookieValue(
        'www.cnblogs.com',
        '.CNBlogsCookie',
        this.cookie,
        function () {
          window.$vm.$toast({
            message: '登录Cookie设置成功'
          })
        },
        function () {
          window.$vm.$toast({
            message: '登录Cookie设置失败'
          })
        }
      )
      window.cookieMaster.setCookieValue('www.cnblogs.com', '.Cnblogs.AspNetCore.Cookies', aspNetCoreCookies)
      window.cookieMaster.setCookieValue('news.cnblogs.com', '.CNBlogsCookie', cnblogsCookie)
      window.cookieMaster.setCookieValue('news.cnblogs.com', '.Cnblogs.AspNetCore.Cookies', aspNetCoreCookies)
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
  clearItem('cnblog.cookie')
  if (window.cookieMaster) {
    window.cookieMaster.clear()
  }
}

export function getUser () {
  return getItem('cnblog.user')
}
