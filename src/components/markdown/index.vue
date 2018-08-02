<template>
<div class="markdown">
  <div v-html="vHtml"></div>
</div>
</template>

<script>
import {
  ENV
} from '@/config/conf'
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
  mounted () {
    let pElement = this.$el.querySelectorAll('p')
    if (pElement.length > 0) {
      for (var index = 0; index < pElement.length; index++) {
        let pHtml = pElement[index].innerHTML.trim()
        while (pHtml.startsWith('&nbsp')) {
          pHtml = pHtml.replace('&nbsp;', '').trim()
        }
        pElement[index].innerHTML = pHtml
      }
    }
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
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

<style>
.MathJax_Display {
  text-align: center;
  margin: 1em 0em;
  position: relative;
  display: block !important;
  text-indent: 0;
  max-width: none;
  max-height: none;
  min-width: 0;
  min-height: 0;
  width: 100%;
  overflow: auto;
}

.MathJax .merror {
  background-color: #ffff88;
  color: #cc0000;
  border: 1px solid #cc0000;
  padding: 1px 3px;
  font-style: normal;
  font-size: 90%;
}

.MathJax .MJX-monospace {
  font-family: monospace;
}

.MathJax .MJX-sans-serif {
  font-family: sans-serif;
}

#MathJax_Tooltip {
  background-color: InfoBackground;
  color: InfoText;
  border: 1px solid black;
  box-shadow: 2px 2px 5px #aaaaaa;
  -webkit-box-shadow: 2px 2px 5px #aaaaaa;
  -moz-box-shadow: 2px 2px 5px #aaaaaa;
  -khtml-box-shadow: 2px 2px 5px #aaaaaa;
  filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true');
  padding: 3px 4px;
  z-index: 401;
  position: absolute;
  left: 0;
  top: 0;
  width: auto;
  height: auto;
  display: none;
}

.MathJax {
  display: inline;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 100%;
  font-size-adjust: none;
  text-indent: 0;
  text-align: left;
  text-transform: none;
  letter-spacing: normal;
  word-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  float: none;
  direction: ltr;
  max-width: none;
  max-height: none;
  min-width: 0;
  min-height: 0;
  border: 0;
  padding: 0;
  margin: 0;
}

.MathJax:focus,
body :focus .MathJax {
  display: inline-table;
}

.MathJax.MathJax_FullWidth {
  text-align: center;
  display: table-cell !important;
  width: 10000em !important;
}

.MathJax img,
.MathJax nobr,
.MathJax a {
  border: 0;
  padding: 0;
  margin: 0;
  max-width: none;
  max-height: none;
  min-width: 0;
  min-height: 0;
  vertical-align: 0;
  line-height: normal;
  text-decoration: none;
}

img.MathJax_strut {
  border: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  vertical-align: 0 !important;
}

.MathJax span {
  display: inline;
  position: static;
  border: 0;
  padding: 0;
  margin: 0;
  vertical-align: 0;
  line-height: normal;
  text-decoration: none;
}

.MathJax nobr {
  white-space: nowrap !important;
}

.MathJax img {
  display: inline !important;
  float: none !important;
}

.MathJax * {
  transition: none;
  -webkit-transition: none;
  -moz-transition: none;
  -ms-transition: none;
  -o-transition: none;
}

.MathJax_Processing {
  visibility: hidden;
  position: fixed;
  width: 0;
  height: 0;
  overflow: hidden;
}

.MathJax_Processed {
  display: none !important;
}

.MathJax_ExBox {
  display: block !important;
  overflow: hidden;
  width: 1px;
  height: 60ex;
  min-height: 0;
  max-height: none;
}

.MathJax .MathJax_EmBox {
  display: block !important;
  overflow: hidden;
  width: 1px;
  height: 60em;
  min-height: 0;
  max-height: none;
}

.MathJax_LineBox {
  display: table !important;
}

.MathJax_LineBox span {
  display: table-cell !important;
  width: 10000em !important;
  min-width: 0;
  max-width: none;
  padding: 0;
  border: 0;
  margin: 0;
}

.MathJax .MathJax_HitBox {
  cursor: text;
  background: white;
  opacity: 0;
  filter: alpha(opacity=0);
}

.MathJax .MathJax_HitBox * {
  filter: none;
  opacity: 1;
  background: transparent;
}

#MathJax_Tooltip * {
  filter: none;
  opacity: 1;
  background: transparent;
}

.MathJax .noError {
  font-size: 90%;
  text-align: left;
  color: black;
  padding: 1px 3px;
  border: 1px solid;
}
</style>
