<template>
<div class="layout" :class="$route.name">
  <div class="content">
    <slot></slot>
  </div>
  <van-tabbar class="layoutNav">
    <van-tabbar-item  v-if="$store.state.app.isHaveUpdate" @click.native="download">
      <i class="iconfont icon-theme" slot="icon"></i>
      <span>更新</span>
    </van-tabbar-item>
    <van-tabbar-item  :class="active==1?'on':''" @click.native="go('/')">
      <i class="iconfont icon-blogger" slot="icon"></i>
      <span>首页</span>
    </van-tabbar-item>
    <van-tabbar-item :class="active==2?'on':''" @click.native="go('/news')">
      <i class="iconfont icon-news_hot" slot="icon" />
      <span class="on">新闻</span>
    </van-tabbar-item>
    <van-tabbar-item :class="active==4?'on':''" @click.native="go('/bloggerrank')">
      <i class="iconfont icon-paihangbang" slot="icon" />
      <span>排行榜</span>
    </van-tabbar-item>
    <van-tabbar-item :class="active==3?'on':''" @click.native="go('/user')">
      <i class="iconfont icon-account" slot="icon" />
      <span class="on">我的</span>
    </van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'vLayout',
  props: {
    active: 0
  },
  created () {},
  methods: {
    go (url) {
      if (!window.location.href.endsWith(url)) {
        this.$router.push(url)
      }
    },
    download () {
      window.open('https://fir.im/cnblog')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.layout {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
<style lang="scss">
@import '@/assets/styles/variable.scss';
.layoutNav{
  .on{
    i,span{
      @include themify($themes) {
          color: themed('color') !important;
        }
    }
  }
}
</style>
