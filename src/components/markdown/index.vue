<template>
  <div class="markdown" v-html="html">
  </div>
</template>
<script>
import { ENV } from '@/config/conf'
export default {
  name: 'vMarkdown',
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  mounted () {
    if (ENV === 'development') {
      // 开发模式图片做中转
      setTimeout(() => {
        const imgList = this.$el.querySelectorAll('img')
        if (imgList) {
          imgList.forEach(element => {
            let src = element.getAttribute('src').replace('https://', '')
            src = `https://images.weserv.nl/?url=${src}`
            element.setAttribute('src', src)
          })
        }
      }, 1500)
    }
  }
}
</script>
