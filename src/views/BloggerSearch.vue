<template>
<div class="search">
  <div class="header">
    <van-icon class="back" name="arrow-left" @click="()=>this.goBack(-1)"></van-icon>
    <van-search background="#eeeeee" placeholder="请输入博客名称,模糊匹配" @search="search" slot="title" v-model.trim="keyword">
    </van-search>
  </div>
  <v-loading v-if="isLoading"></v-loading>
  <div class="item">
    <v-bloggeritem v-for="(item,index) in items" :item="item" :key="index"></v-bloggeritem>
  </div>
  <v-empty v-if="isShowEmpty" message="啥也没搜到"></v-empty>
</div>
</template>

<script>
import {
  searchBloggers
} from '@/api/blog'
export default {
  name: 'page-bloggerrank',
  data () {
    return {
      keyword: '',
      items: [],
      isLoading: false,
      isShowEmpty: false
    }
  },
  methods: {
    search () {
      this.isLoading = true
      this.isShowEmpty = false
      this.items = []
      searchBloggers(this.keyword).then(res => {
        this.isLoading = false
        if (res) {
          this.items = res
        } else {
          this.isShowEmpty = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding-top: 50px;
  box-sizing: border-box;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    background-color: #eeeeee
  }
  .back {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: gray;
  }
}
</style>
