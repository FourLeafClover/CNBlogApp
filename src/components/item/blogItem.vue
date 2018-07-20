<template>
  <div class="item">
    <div class="header">
      <img :src="item.author.avatar" @click="gotoZone" alt="">
      <div class="name" @click="gotoZone">{{item.author.name}}</div>
    </div>
    <div class="title" @click="goDetail">{{item.title}}
    </div>
    <div class="summary" @click="goDetail">{{item.summary}}
    </div>
    <div class="opt">阅读:{{ item.views }} 创建于: {{ item.published | dateFormat }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'vBlogItem',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  created () {},
  methods: {
    goDetail () {
      this.$router.push(
        `/blogdetail?id=${this.item.id}&title=${this.item.title}&author=${
          this.item.author.name
        }&blogapp=${this.item.blogapp}&link=${this.item.link}&published=${
          this.item.published
        }`
      )
    },
    gotoZone () {
      this.$router.push(
        `/blogapp?blogapp=${this.item.blogapp}&name=${this.item.author.name}`
      )
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
      left: 40px;
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
    word-break: break-word;
  }
  .opt {
    color: gray;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
