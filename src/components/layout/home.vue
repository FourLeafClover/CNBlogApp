<template>
<div class="layout" :class="$route.name">
  <div class="content">
    <slot></slot>
  </div>
  <van-tabbar class="bottomBar">
    <van-tabbar-item icon="shop" v-show="active==1" @click.native="go('/')">
      <span class="on">首页</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/blog_on.png" />
    </van-tabbar-item>
    <van-tabbar-item icon="shop" v-show="active!=1" @click.native="go('/')">
      <span>首页</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/blog.png" />
    </van-tabbar-item>
    <van-tabbar-item icon="shop" v-show="active==2" @click.native="go('/news')">
      <span class="on">新闻</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/news_on.png">
    </van-tabbar-item>
    <van-tabbar-item icon="shop" v-show="active!=2" @click.native="go('/news')">
      <span>新闻</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/news.png">
    </van-tabbar-item>
    <van-tabbar-item icon="shop" v-show="active==4" @click.native="go('/bloggerrank')">
      <span class="on">排行榜</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/rank_on.png">
    </van-tabbar-item>
    <van-tabbar-item icon="shop" v-show="active!=4" @click.native="go('/bloggerrank')">
      <span>排行榜</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/rank.png">
    </van-tabbar-item>
    <van-tabbar-item icon="shop" v-show="active==3" @click.native="go('/user')">
      <span class="on">我的</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/user_on.png">
    </van-tabbar-item>
    <van-tabbar-item icon="shop" v-show="active!=3" @click.native="go('/user')">
      <span>我的</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/user.png">
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
  created () {
  },
  methods: {
    go (url) {
      if (!window.location.href.endsWith(url)) {
        this.$router.push(url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  >.bottomBar {
    .on {
      color: dodgerblue;
      font-weight: bold;
    }
  }
}
</style>
