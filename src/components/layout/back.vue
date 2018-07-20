<template>
<div class="layout">
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
  created () {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.layout{
  /deep/ .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .content{
    padding-top: 50px;
  }
}
</style>
