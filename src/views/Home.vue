<template>
<v-layout class="home" :active="1">
  <v-update-app />
  <van-tabs :swipeable="true" style="height:100%">
    <i class="iconfont icon-ego-blog"></i>
    <van-tab class="tabs" style="height:100%" swipeable v-for="(tab,index) in blogs" :title="tab.name" :key="index">
      <div class="items" v-if="tab.name==='最新'">
        <van-pull-refresh @refresh="onRefresh" v-model="isRefresh">
          <v-blog-item :item="item" :key="key" v-for="(item,key) in tab.items"></v-blog-item>
          <div class="loadmore" @click="loadBlogs" v-if="!isLoadingAll">
            点击加载更多
          </div>
          <v-loading v-else></v-loading>
        </van-pull-refresh>
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
      scrollTop: 0,
      isRefresh: false,
      scrollPosition: []
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
    loadBlogs () {
      this.isLoadingAll = true
      let pageSize = 50
      let page = Math.floor(this.blogs[0].items.length / pageSize) + 1
      getHomePage(page, pageSize).then(res => {
        this.blogs[0].items.push(...res)
        this.isLoadingAll = false
      })
    },
    onRefresh () {
      this.isRefresh = true
      let pageSize = 50
      getHomePage(1, pageSize).then(res => {
        this.blogs[0].items = res
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
.icon-ego-blog {
    position: fixed;
    left: 10px;
    top: 0px;
    z-index: 99;
    height: 40px;
    margin-top: 2px;
    @include themify {
        color: themed('color') !important
    };
    font-size: 38px;
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
    overflow-y: auto;
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
