<template>
  <van-loading type="circle" class="loading" color="black" />
</template>
<script>
export default {
  name: 'vLoading',
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    margin: 0 auto;
    margin-top: 10px;
    /deep/ .van-loading__spinner--circle {
      height: 30px !important;
      width: 30px !important;
      border-color: white !important;
      border-top-color: dodgerblue !important;
    }
  }
</style>
