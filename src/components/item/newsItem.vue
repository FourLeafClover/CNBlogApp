<template>
<div class="item">
  <div class="header">
    <div class="name">{{item.sourceName}}</div>
  </div>
  <div class="title" @click="gotoDetail">{{item.title}}</div>
  <div class="summary" @click="gotoDetail">{{item.summary}}
  </div>
  <div class="opt">阅读:{{ item.views }} 创建于:{{ item.published | dateFormat }}</div>
</div>
</template>

<script>
export default {
  name: 'vNewsItem',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  created () {
  },
  methods: {
    gotoDetail () {
      this.$router.push(`/newsdetail?id=${this.item.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 10px;
  margin-bottom: 5px;
  box-shadow: 0 5px #eee;
  .header {
    height: 30px;
    position: relative;
    img {
      width: 30px;
      border-radius: 50%;
    }
    .name {
      position: absolute;
      top: 0px;
      line-height: 30px;
      color: dodgerblue;
    }
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
  }
  .summary {
    margin-top: 10px;
    font-size: 14px;
    color: gray;
    line-height: 20px;
  }
  .opt {
    color: gray;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
