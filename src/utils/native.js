export function copy (text, cb) {
  if (window.cordova && window.cordova.plugins.clipboard) {
    window.cordova.plugins.clipboard.copy(text)
    if (cb) {
      cb()
    }
    window.$vm.$toast({
      message: '复制成功'
    })
  }
}
