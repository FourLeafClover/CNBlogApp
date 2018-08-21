<template>
<div class="item">
  <div class="title" @click="gotoDetail">{{item.title}}</div>
  <div class="summary" @click="gotoDetail">{{item.summary}}
  </div>
  <div class="opt"> <span class="name">{{item.sourceName}}</span> 阅读: {{ item.views }} &nbsp; 发布于: {{ item.published | dateFormat }}</div>
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
  created () {},
  methods: {
    gotoDetail () {
      this.push(`/newsdetail?id=${this.item.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.item {
  padding: 10px;
  border-bottom: 5px solid #eeeeee;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  .title {
    font-size: 18px;
    font-weight: bold;
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
    .name {
      @include themify {
        color: themed('color')
      };
      margin-right: 10px;
    }
  }
}
</style>
