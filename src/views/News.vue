<template>
<v-layout class="home" :active="2">
  <div class="logo"><img src="@/assets/icon/news_logo.png" /></div>
  <van-tabs :swipeable="true" :sticky='true'>
    <van-tab class="tabs toptabs" v-for="(tab,index) in news" :title="tab.name" :key="index">
      <div class="items">
        <div v-if="tab.name==='最新'">
          <v-news-item :item="item" :key="key" v-for="(item,key) in tab.items"></v-news-item>
          <div class="loadmore" @click="loadLastNews" v-if="!tab.loadingComplete" v-show="!tab.isLoading">
            点击加载更多
          </div>
          <div class="loadmore" v-if="tab.loadingComplete">
            加载完毕
          </div>
          <v-loading v-show="tab.isLoading"></v-loading>
        </div>
        <div v-if="tab.name==='推荐'">
          <v-news-item :item="item" :key="key" v-for="(item,key) in tab.items"></v-news-item>
          <div class="loadmore" @click="loadRecommendNews" v-if="!tab.loadingComplete" v-show="!tab.isLoading">
            点击加载更多
          </div>
          <div class="loadmore" v-if="tab.loadingComplete">
            加载完毕
          </div>
          <v-loading v-show="tab.isLoading"></v-loading>
        </div>
        <div v-if="tab.name==='热门'">
          <div class="tip">最近100热门新闻</div>
          <v-news-item :item="item" :key="key" v-for="(item,key) in tab.items"></v-news-item>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</v-layout>
</template>

<script>
import {
  getLastNews,
  getHotNews,
  getRecommendNews
} from '@/api/news'

export default {
  name: 'home',
  data () {
    return {
      news: [{
        name: '最新',
        items: [],
        isLoading: false,
        loadingComplete: false
      },
      {
        name: '推荐',
        items: [],
        isLoading: false,
        loadingComplete: false
      },
      {
        name: '热门',
        items: []
      }
      ]
    }
  },
  mounted () {
    this.loadLastNews()
    this.loadHotNews()
    this.loadRecommendNews()
  },
  methods: {
    loadLastNews () {
      let pageSize = 20
      let page =
        this.news[0].items.length % pageSize === 0
          ? Math.floor(this.news[0].items.length / pageSize) + 1
          : Math.floor(this.news[0].items.length / pageSize) + 2
      this.news[0].isLoading = true
      getLastNews(page, pageSize).then(res => {
        this.news[0].items.push(...res)
        this.news[0].isLoading = false
        if (res.length < pageSize) {
          this.news[0].loadingComplete = true
        }
      })
    },
    loadHotNews () {
      getHotNews().then(res => {
        this.news[2].items.push(...res)
      })
    },
    loadRecommendNews () {
      let pageSize = 20
      let page =
        this.news[0].items.length % pageSize === 0
          ? Math.floor(this.news[0].items.length / pageSize) + 1
          : Math.floor(this.news[0].items.length / pageSize) + 2
      this.news[1].isLoading = true
      getRecommendNews(page, pageSize).then(res => {
        this.news[1].items.push(...res)
        this.news[1].isLoading = false
        if (res.length < pageSize) {
          this.news[0].loadingComplete = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  .logo {
    position: fixed;
    left: 10px;
    top: 2px;
    z-index: 999;
    img{
      width: 30px;
    }
  }
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
