<template>
<div class="markdown">
   <div v-html="html"></div>
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
    },
    convert: {
      type: Boolean,
      default: false
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
    } else {
      // 非开发模式下设置中转的时候就进行中转,主要是为了解决新闻图片必须中转才能展示的问题
      // 博客和头像APP断不需要中转
      if (this.convert) {
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
}
</script>
