<template>
<div class="item">
  <div class="header">
    <!--<img :src="item.author.avatar" alt="">-->
    <div class="name">{{item.author.name}}</div>
    <div class="time">{{item.published | dateFormat}}</div>
  </div>
  <div class="content">{{item.content.trim()}}</div>
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
  margin-bottom: 5px;
  box-shadow: 0 5px #eee;
  .header {
    height: 30px;
    position: relative;
    width: 100%;
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
    .time{
      position: absolute;
      right: 10px;
      line-height: 30px;
      color: dodgerblue;
      font-size: 12px;
    }
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
  }
  .content{
    margin-top: 10px;
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
