<template>
  <div class="markdown" v-html="html">
  </div>
</template>
<script>
export default {
  name: 'vMarkdown',
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  mounted () {
    setTimeout(() => {
      const imgList = this.$el.querySelectorAll('img')
      imgList.forEach(element => {
        let src = element.getAttribute('src').replace('https://', '')
        src = `https://images.weserv.nl/?url=${src}`
        element.setAttribute('src', src)
      })
    }, 2000)
  }
}
</script>
