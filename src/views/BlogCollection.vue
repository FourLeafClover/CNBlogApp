<template>
<v-back-layout class="blog-coll" :class="$route.name" title="我的收藏">
  <div class="item" @click="gotoDetail(item)" v-for="(item,index) in $store.state.user.blog_coll" :key="index">
    <div class="author">{{item.author}}
    </div>
    <div class="header"><span>{{item.title}}</span>
    </div>
  </div>
  <vEmpty message="啥也没有呢!" v-if="$store.state.user.blog_coll.length===0"></vEmpty>
</v-back-layout>
</template>

<script>
export default {
  name: 'page-blogCollection',
  methods: {
    gotoDetail (item) {
      this.push({
        name: 'page-blogdetail',
        query: item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-coll {
  background-color: #eeeeee;
  .item {
    background-color: white;
    margin-bottom: 5px;
    padding: 10px;
    box-sizing: border-box;
    .author {
      font-weight: bold;
    }
    .header {
      margin-top:5px;
      font-size: 16px;
    }
    .content {
      margin-top: 10px;
      font-size: 14px;
      color: gray;
    }
  }
}
</style>
