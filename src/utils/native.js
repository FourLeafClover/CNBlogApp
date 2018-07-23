export function copy (text) {
  if (window.cordova && window.cordova.plugins.clipboard) {
    window.cordova.plugins.clipboard.copy(text)
    window.$vm.$toast({
      message: '复制成功'
    })
  }
}
