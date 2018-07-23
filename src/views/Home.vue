<template>
<v-layout class="home" :active="1">
  <van-tabs :swipeable="true">
    <div class="logo"><img src="@/assets/icon/blog_logo.png" /></div>
    <van-tab class="tabs" swipeable v-for="(tab,index) in blogs" :title="tab.name" :key="index">
      <div class="items" v-if="tab.name==='最新'">
        <v-blog-item :item="item" :key="key" v-for="(item,key) in tab.items"></v-blog-item>
        <div class="loadmore" @click="loadBlogs" v-if="!isLoadingAll">
          点击加载更多
        </div>
        <v-loading v-else></v-loading>
      </div>
      <div class="items" v-if="tab.name==='推荐'">
        <div class="tip">最近10天推荐博客</div>
        <v-blog-item :item="item" :key="key" v-for="(item,key) in tab.items"></v-blog-item>
      </div>
      <div class="items" v-if="tab.name==='热门'">
        <div class="tip">最近48小时阅读排行榜</div>
        <v-blog-item :item="item" :key="key" v-for="(item,key) in tab.items"></v-blog-item>
      </div>
    </van-tab>
  </van-tabs>
</v-layout>
</template>

<script>
import {
  getHomePage,
  get48Top,
  get10TopDigg
} from '@/api/blog'

export default {
  name: 'page-home',
  data () {
    return {
      blogs: [{
        name: '最新',
        items: []
      },
      {
        name: '推荐',
        items: []
      },
      {
        name: '热门',
        items: []
      }
      ],
      isLoadingAll: true,
      scrollTop: 0
    }
  },
  mounted () {
    this.loadBlogs()
    get48Top().then(res => {
      this.blogs[2].items.push(...res)
    })
    get10TopDigg().then(res => {
      this.blogs[1].items.push(...res)
    })
  },
  activated () {
    this.$el.querySelector('.items').scrollTo(0, this.scrollTop)
  },
  deactivated () {
    this.scrollTop = this.$el.querySelector('.items').scrollTop
  },
  methods: {
    loadBlogs () {
      this.isLoadingAll = true
      let pageSize = 20
      let page =
        this.blogs[0].items.length % pageSize === 0
          ? Math.floor(this.blogs[0].items.length / pageSize) + 1
          : Math.floor(this.blogs[0].items.length / pageSize) + 2
      getHomePage(page, pageSize).then(res => {
        this.blogs[0].items.push(...res)
        this.isLoadingAll = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .logo {
    position: fixed;
    left: 10px;
    top: 0px;
    z-index: 99;
    height: 40px;
    margin-top: 2px;
    img{
      height: 100%;
    }
  }
  height: 100vh;
  /deep/ .van-tabs__wrap {
    background-color: white;
    .van-tabs__nav {
      width: 60%;
      margin: 0 auto;
    }
  }
  .tabs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .items {
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 70px;
    box-sizing: border-box;
    padding-top: 40px;
    .tip {
      margin-top: 10px;
      color: gray;
      padding: 5px 0px;
      text-align: center;
      box-shadow: 0 5px #eee;
    }
    .loadmore {
      text-align: center;
      line-height: 40px;
      box-shadow: 0 5px #eee;
      color: gray;
    }
  }
}
</style>
