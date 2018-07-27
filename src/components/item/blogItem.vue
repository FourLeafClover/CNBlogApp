<template>
  <div class="item">
    <div class="header" style="display:none">
      <img :src="item.author.avatar" @click="gotoZone" alt="">
      <div class="name" @click="gotoZone">{{item.author.name}}</div>
    </div>
    <div class="title" @click="goDetail">{{item.title}}
    </div>
    <div class="summary" @click="goDetail">{{item.summary}}
    </div>
    <div class="opt"> <span class="name" @click="gotoZone">{{item.author.name}}</span> 阅读: {{ item.views }} &nbsp;  推荐: {{item.diggs}} &nbsp;  发布于: {{ item.published | dateFormat }}
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
      /* this.push({
        path: `/blogdetail?id=${this.item.id}&title=${this.item.title}&author=${
          this.item.author.name
        }&blogapp=${this.item.blogapp}&link=${this.item.link}&published=${
          this.item.published
        }`
      }) */
      this.push({
        name: 'page-blogdetail',
        query: {
          id: this.item.id,
          title: this.item.title,
          author: this.item.author.name,
          blogapp: this.item.blogapp,
          link: this.item.link,
          published: this.item.published
        }
      })
    },
    gotoZone () {
      this.push({
        name: 'page-blogapp',
        query: {
          name: this.item.author.name,
          blogapp: this.item.blogapp
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  padding: 10px;
  border-bottom: 5px solid #eeeeee;
  box-sizing: border-box;
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
    word-break: break-word;
  }
  .opt {
    color: gray;
    font-size: 12px;
    margin-top: 10px;
    .name {
      color: dodgerblue;
      margin-right: 10px;
    }
  }
}
</style>
