export function copy (text, success, fail) {
  if (window.plugins && window.plugins.clipboardManager) {
    window.plugins.clipboardManager.copy(
      text,
      function (r) {
        if (success) {
          success(r)
        }
      },
      function (e) {
        fail(e)
      }
    )
  }
}
