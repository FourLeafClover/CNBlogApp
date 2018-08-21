<template>
<v-layout class="home" :active="2">
  <i class="iconfont icon-news_hot"></i>
  <van-tabs :swipeable="true" style="height:100%" :sticky='true'>
    <van-tab class="tabs toptabs" style="height:100%" v-for="(tab,index) in news" :title="tab.name" :key="index">
      <div class="items">
        <div v-if="tab.name==='最新'">
          <van-pull-refresh @refresh="onRefresh" v-model="isRefresh">
            <v-news-item :item="item" :key="key" v-for="(item,key) in tab.items"></v-news-item>
            <div class="loadmore" @click="loadLastNews" v-if="!tab.loadingComplete" v-show="!tab.isLoading">
              点击加载更多
            </div>
            <div class="loadmore" v-if="tab.loadingComplete">
              加载完毕
            </div>
            <v-loading v-show="tab.isLoading"></v-loading>
          </van-pull-refresh>
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
  name: 'page-news',
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
      ],
      isRefresh: false,
      scrollPosition: []
    }
  },
  mounted () {
    this.loadLastNews()
    this.loadHotNews()
    this.loadRecommendNews()
  },
  activated () {
    const items = this.$el.querySelectorAll('.items')
    if (this.scrollPosition.length > 0) {
      for (let index = 0; index < items.length; index++) {
        items[index].scrollTo(0, this.scrollPosition[index])
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.scrollPosition = []
    let items = this.$el.querySelectorAll('.items')
    if (items.length > 0) {
      for (let index = 0; index < items.length; index++) {
        this.scrollPosition.push(items[index].scrollTop)
      }
    }
    next()
  },
  methods: {
    loadLastNews () {
      let pageSize = 20
      let page = Math.floor(this.news[0].items.length / pageSize) + 1
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
      let pageSize = 50
      let page = Math.floor(this.news[0].items.length / pageSize) + 1
      this.news[1].isLoading = true
      getRecommendNews(page, pageSize).then(res => {
        this.news[1].items.push(...res)
        this.news[1].isLoading = false
        if (res.length < pageSize) {
          this.news[0].loadingComplete = true
        }
      })
    },
    onRefresh () {
      let pageSize = 50
      this.isRefresh = true
      getRecommendNews(1, pageSize).then(res => {
        this.news[0].items = res
        this.isRefresh = false
        this.$toast({
          message: '刷新完毕'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.icon-news_hot {
  position: fixed;
  left: 10px;
  top: 2px;
  z-index: 999;
  font-size: 35px;
  @include themify {
    color: themed('color') !important
  }
}

.home {
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
    padding-bottom: 70px;
    box-sizing: border-box;
    padding-top: 40px;
    height: 100%;
    overflow: auto;
    .tip {
      margin-top: 10px;
      color: gray;
      padding: 5px 0px;
      text-align: center;
      border-bottom: 5px solid #eeeeee;
    }
    .loadmore {
      text-align: center;
      line-height: 40px;
      border-bottom: 5px solid #eeeeee;
      color: gray;
    }
  }
}
</style>
