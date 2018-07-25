<template>
<v-back-layout class="blog" :class="$route.name" title="博客详情">
  <div class="header" v-if="curItem">
    <div class="title">{{curItem.title}}
    </div>
    <div class="author">
      <span class="name" @click="gotoZone">{{curItem.author.name}}</span>
      <span class="date">发布于: {{curItem.published | dateFormat}}</span>
    </div>
  </div>
  <v-loading v-if="body==''"></v-loading>
  <v-markdown :html="body"></v-markdown>
  <div style="height:70px"></div>
  <van-tabbar>
    <van-tabbar-item @click="()=>showShare=true">
      <span>分享</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/share.png">
    </van-tabbar-item>
    <van-tabbar-item icon="shop" @click="showComment=true">
      <span>评论</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/comment.png">
    </van-tabbar-item>
    <van-tabbar-item icon="shop" @click="vote">
      <span>推荐</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/like.png">
    </van-tabbar-item>
  </van-tabbar>
  <v-share :show.sync="showShare" :link="curItem.link" :title="curItem.title"></v-share>
  <van-actionsheet v-model="showComment" title="评论">
    <div class="comments">
      <v-comment-item v-for="(item,key) in comments" :item="item" :key="key"></v-comment-item>
      <div class="item" v-show="showLoadingMore" @click="loadComments">点击加载更多评论</div>
      <div class="item" v-show="commentLoadComplete">评论加载完毕</div>
      <div class="item" v-if="showNoComment">没有评论</div>
      <v-loading v-if="commentIsLoading"></v-loading>
    </div>
    <van-cell-group class="addComment">
      <van-field type='text' v-model.trim="commentInput" autosize center clearable placeholder="我来说两句">
        <van-button slot="button" size="small" type="primary" @click="sendComment">发送</van-button>
      </van-field>
    </van-cell-group>
  </van-actionsheet>
</v-back-layout>
</template>

<script>
import {
  loadBlogBody,
  getBlogComment
} from '@/api/blog'
import {
  voteBlog,
  addComment
} from '@/api/user'
export default {
  name: 'page-blogdetail',
  data () {
    return {
      body: '',
      showShare: false,
      showComment: false,
      comments: [],
      commentLoadComplete: false,
      commentIsLoading: false,
      commentInput: '',
      curItem: this.$route.params
    }
  },
  created () {
    this.body = ''
    loadBlogBody(this.$route.params.id).then(res => {
      this.body = res
    })
    this.loadComments()
  },
  methods: {
    loadComments () {
      this.commentIsLoading = true
      let page = this.comments.length / 50 + 1
      getBlogComment(this.$route.params.id, page, 50).then(res => {
        this.comments.push(...res)
        if (res.length < 50) {
          this.commentLoadComplete = true
        }
        this.commentIsLoading = false
      })
    },
    vote () {
      voteBlog(this.$route.query.blogapp, this.$route.query.id, true).then(res => {
        if (!res.IsSuccess) {
          this.$toast({
            message: res.Message
          })
        }
      })
    },
    sendComment () {
      if (this.commentInput.length === 0) {
        this.$toast({
          message: '请输入评论'
        })
      }
      addComment(this.$route.query.blogapp, this.$route.query.id, this.commentInput).then(res => {
        if (!res.IsSuccess) {
          this.$toast({
            message: res.Message
          })
        } else {
          this.$toast({
            message: '发表成功'
          })
          this.comments.unshift({
            author: {
              name: '我'
            },
            published: new Date().toGMTString(),
            content: this.commentInput
          })
          this.commentInput = ''
        }
      })
    },
    gotoZone () {
      const query = this.$route.query
      return this.push(`/blogapp?name=${query.author}&blogapp=${query.blogapp}`)
    }
  },
  computed: {
    showLoadingMore () {
      return (!this.commentIsLoading) && this.comments.length > 0 && (!this.commentLoadComplete)
    },
    showNoComment () {
      return this.commentLoadComplete && this.comments.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.blog {
  .header {
    border-bottom: 5px solid #eeeeee;
    padding-bottom: 5px;
    margin-bottom: 20px;
  }
  .title {
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    font-size: 20px;
    text-align: left;
    font-weight: bold;
  }
  .author {
    color: gray;
    margin-bottom: 10px;
    padding-left: 10px;
    position: relative;
    .name {
      margin-right: 5px;
      color: dodgerblue;
      font-size: 14px;
    }
    .date {
      font-size: 14px;
      right: 20px;
      position: absolute;
    }
  }
  .item {
    padding: 10px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    border-bottom: 5px solid #eeeeee;
  }
  .comments {
    height: 80vh;
    overflow: scroll;
    padding-bottom: 55px;
    box-sizing: border-box;
    .header {
      display: inline-block;
      height: 30px;
      .name{
        position: absolute;
        left: 10px;
        font-size: 12px;
      }
      .date{
        position: absolute;
        left: 10px;
        font-size: 12px;
      }
    }
  }
  .addComment {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 2px solid #eee
  }
}
</style>
