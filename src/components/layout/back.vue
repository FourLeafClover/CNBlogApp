<template>
<div class="layout" :class="$route.name">
  <van-nav-bar
  :title="title"
  left-text="Back"
  left-arrow
  @click-left="onClickLeft"
/>
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>
<script>
export default {
  name: 'vBackLayout',
  props: {
    title: ''
  },
  created () {
  },
  methods: {
    onClickLeft () {
      this.goBack(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.layout{
  overflow-y: auto;
  overflow-x: hidden;
  /deep/ .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  >.content{
    padding-top: 50px;
  }
}
</style>
