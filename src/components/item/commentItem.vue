<template>
<div class="item">
  <div class="header">
    <!--<img :src="item.author.avatar" alt="">-->
    <div class="name">{{item.author.name}}</div>
    <div class="time">发布于: {{item.published | dateFormat}}</div>
  </div>
  <div class="content" v-html="item.content.trim()"></div>
</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  name: 'vCommentItem'
}
</script>

<style lang="scss" scoped>
.item {
  padding: 10px;
  margin-bottom: 5px solid #eeeeee;
  position: relative;
  box-sizing: border-box;
  .header {
    display: inline-block;
    height: 25px;
    .name {
      position: absolute;
      left: 10px;
      font-size: 14px;
      font-weight: bold;
    }
    .time {
      position: absolute;
      right: 15px;
      font-size: 14px;
      color: gray;
    }
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
  }
  .content {
    font-size: 14px;
    color: gray;
    line-height: 20px;
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
    text-align: left;
    word-break: break-word;
  }
}
</style>
