<template>
<div class="markdown">
   <div v-html="vHtml"></div>
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
  data () {
    return {
      vHtml: ''
    }
  },
  created () {
    let html = this.html
    while (html.indexOf('src="//images2018') > 0) {
      html = html.replace('src="//images2018', 'src="https://images2018')
    }
    this.vHtml = html
  },
  updated () {
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
