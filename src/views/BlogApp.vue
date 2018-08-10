<template>
<v-back-layout :title="this.$route.query.name">
  <div class="items">
    <v-blog-item :item="item" :key="key" v-for="(item,key) in items"></v-blog-item>
    <div v-if="!loadingComplete">
      <div class="notice" @click="loadBlogs" v-if="!isLoading">
        点击加载更多
      </div>
      <v-loading v-else></v-loading>
    </div>
    <div class="notice" v-else>--END--</div>
  </div>
</v-back-layout>
</template>

<script>
import {
  loadBlogApp
} from '@/api/blog'
export default {
  name: 'page-blogapp',
  data () {
    return {
      items: [],
      isLoading: false,
      loadingComplete: false,
      blogapp: '',
      scrollPosition: 0
    }
  },
  created () {
    this.blogapp = this.$route.query.blogapp
    this.loadBlogs()
  },
  activated () {
    if (this.$route.query.blogapp !== this.blogapp) {
      this.blogapp = this.$route.query.blogapp
      this.items = []
      this.isLoading = false
      this.loadingComplete = false
      this.scrollPosition = 0
      this.loadBlogs()
    }
    this.$el.scrollTo(0, this.scrollPosition)
  },
  beforeRouteLeave (to, from, next) {
    this.scrollPosition = this.$el.scrollTop
    next()
  },
  methods: {
    loadBlogs () {
      let pageSize = 50
      let page = Math.floor(this.items.length / pageSize) + 1
      this.isLoading = true
      loadBlogApp(this.$route.query.blogapp, page, pageSize).then(res => {
        this.items.push(...res)
        this.isLoading = false
        if (res.length < pageSize) {
          this.loadingComplete = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.notice {
  text-align: center;
  line-height: 40px;
  margin-bottom: 5px solid #eeeeee;
  color: gray;
}
</style>
