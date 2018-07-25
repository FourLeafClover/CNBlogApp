<template>
<div class="item" @click="gotoZone">
  <img :src="item.avatar|imgConvert" alt="">
  <div class="name">{{item.name}} <span class="blogapp"></span> </div>
  <div class="summary"> 博客ID: {{item.blogapp}} &nbsp; 博客:{{item.postcount}}篇 </div>
</div>
</template>

<script>
export default {
  name: 'vBloggeritem',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    gotoZone () {
      this.push(`blogapp?name=${this.item.name}&blogapp=${this.item.blogapp}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: 80px;
  position: relative;
  border-bottom: 5px solid #eeeeee;
  overflow: hidden;
  padding: 0 10px;
  box-sizing: border-box;
  img {
    position: absolute;
    left: 10px;
    width: 50px;
    height: 50px;
    top: 10px;
    border-radius: 10px;
  }
  .name {
    position: absolute;
    left: 80px;
    top: 12px;
    color: dodgerblue;
    white-space: nowrap;
    text-overflow: ellipsis;
    .blogapp {
      font-size: 13px;
      color: gray;
      margin-left: 10px;
    }
  }
  .summary {
    position: absolute;
    left: 80px;
    bottom: 17px;
    font-size: 13px;
    color: gray;
  }
  .postcount {
    position: absolute;
    right: 10px;
  }
}
</style>
