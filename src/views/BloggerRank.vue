<template>
<v-layout :active="4">
  <div class="blogger">
    <van-nav-bar class="search" title="排行榜Top50"  @click-right="gotoSearch" >
       <van-icon name="search" slot="right" ></van-icon>
    </van-nav-bar>
    <v-loading v-if="isShowLoading"></v-loading>
    <div class="items">
      <v-bloggeritem v-for="(item,index) in items" :item='item' :key="index"></v-bloggeritem>
    </div>
  </div>
</v-layout>
</template>

<script>
import {
  loadBloggerRank
} from '@/api/blog'
export default {
  name: 'page-bloggerrank',
  data () {
    return {
      items: [],
      isShowLoading: true,
      scrollTop: 0
    }
  },
  created () {
    loadBloggerRank(50).then(res => {
      this.items = res
      this.isShowLoading = false
    })
  },
  methods: {
    gotoSearch () {
      this.push('/bloggersearch')
    }
  },
  activated () {
    this.$el.scrollTo(0, this.scrollTop)
  },
  deactivated () {
    this.scrollTop = this.$el.scrollTop
  }
}
</script>
<style lang="scss" scoped>
.blogger{
  padding-top: 50px;
  padding-bottom: 50px;
  box-sizing: border-box;
  .search{
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
