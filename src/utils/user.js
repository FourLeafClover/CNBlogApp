import { setItem, getItem } from '@/utils/$storage'

export function setAuthCookie (cookie) {
  setItem('cnblog.cookie', cookie)
  document.cookie = `.CNBlogsCookie=${cookie}`
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
  }
}

export function setUser (user) {
  setItem('cnblog.user', user)
}

export function removeUser (cookie) {
  setItem('cnblog.user', '')
}

export function removeAuthCookie (cookie) {
  setItem('cnblog.cookie', '')
}

export function getAuthCookie () {
  return getItem('cnblog.cookie')
}

export function getUser () {
  return getItem('cnblog.user')
}
