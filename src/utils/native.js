export function copy (text) {
  if (window.cordova && window.cordova.plugins.clipboard) {
    window.cordova.plugins.clipboard.copy.copy(text)
    window.$vm.$toast({
      messsage: '复制成功'
    })
  }
}
