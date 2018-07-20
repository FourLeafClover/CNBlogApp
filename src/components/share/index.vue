<template>
<van-actionsheet v-model="vShow" title="点击链接进行复制">
  <div class="item" @click="copy" ><a>{{link}}</a></div>
  <div class="item" @click="close()">关闭</div>
</van-actionsheet>
</template>

<script>
import { copy as nativeCopy } from '@/utils/native'
export default {
  name: 'vShare',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      vShow: false
    }
  },
  created () {
    this.vShow = this.show
  },
  methods: {
    close () {
      this.vShow = false
    },
    copy () {
      nativeCopy(this.message + '  ' + this.link, () => {
        this.$toast({
          message: '复制成功,感觉前去分享吧!'
        })
      })
    }
  },
  watch: {
    show () {
      this.vShow = this.show
    },
    vShow () {
      this.$emit('update:show', this.vShow)
    }
  }
}
</script>
<style lang="scss" scoped>
  .item {
    padding: 10px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    box-shadow: 0px 2px #e5e5e5;
    margin-bottom: 2px;
  }
</style>
