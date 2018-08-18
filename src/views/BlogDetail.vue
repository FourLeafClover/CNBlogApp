<template>
<v-back-layout class="blog" :class="$route.name" title="博客详情">
  <div class="header" v-if="curItem">
    <div class="title">{{curItem.title}}
    </div>
    <div class="author">
      <span class="name" @click="gotoZone">{{curItem.author}}</span>
      <span class="date">发布于: {{curItem.published | dateFormat}}</span>
    </div>
  </div>
  <v-loading v-if="isBodyLoading"></v-loading>
  <v-markdown v-if="body!=''" :html="body"></v-markdown>
  <v-empty v-if="showEmpty" message="博客被火星人带走了"></v-empty>
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
    <van-tabbar-item v-if="!isCollect" icon="shop" @click="COLLECT_BLOG($route.query)">
      <span>收藏</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/collect.png">
    </van-tabbar-item>
    <van-tabbar-item v-else icon="shop" @click="UNCOLLECT_BLOG($route.query)">
      <span>已收藏</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/collect_on.png">
    </van-tabbar-item>
    <van-tabbar-item icon="shop" @click="vote">
      <span>推荐</span>
      <img slot="icon" slot-scope="props" src="@/assets/icon/like.png">
    </van-tabbar-item>
  </van-tabbar>
  <v-share :show.sync="showShare" :link="curItem.link" :title="curItem.title"></v-share>
  <van-actionsheet style="overflow:hidden" v-model="showComment" title="评论">
    <div class="comments">
      <v-comment-item @reply="reply" v-for="(item,key) in comments" :item="item" :key="key"></v-comment-item>
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
  <van-actionsheet style="z-index:9000" class="replyComment" v-model="isShowReply" :title="`回复 ${replyItem==null?'':replyItem.author.name}`">
    <div>
      <van-field type='text' v-if="isShowReply" :autofocus="isShowReply" v-model.trim="replyCommentInput" center clearable placeholder="请输入评论">
        <van-button slot="button" size="small" type="primary" @click="sendReplyComment">发送</van-button>
      </van-field>
    </div>
  </van-actionsheet>
</v-back-layout>
</template>

<script>
import {
  loadBlogBody,
  getBlogComment,
  loadBlogBodyFromPC
} from '@/api/blog'
import {
  voteBlog,
  addComment
} from '@/api/user'
import {
  ENV
} from '@/config/conf'
import { mapActions } from 'vuex'
export default {
  name: 'page-blogdetail',
  data () {
    return {
      body: '',
      isBodyLoading: false,
      showShare: false,
      showComment: false,
      comments: [],
      commentLoadComplete: false,
      commentIsLoading: false,
      commentInput: '',
      replyCommentInput: '',
      curItem: this.$route.query,
      showEmpty: false,
      replyItem: null,
      isShowReply: false
    }
  },
  created () {
    this.body = ''
    this.isBodyLoading = true
    if (ENV === 'development') {
      loadBlogBody(this.curItem.id).then(res => {
        if (res != null) {
          this.body = res.body
        } else {
          this.showEmpty = true
        }
        this.isBodyLoading = false
      })
    } else {
      loadBlogBodyFromPC(this.curItem.link).then(res => {
        if (res != null) {
          this.body = res
        } else {
          this.showEmpty = true
        }
        this.isBodyLoading = false
      })
    }
    this.loadComments()
  },
  methods: {
    ...mapActions('user', ['COLLECT_BLOG', 'UNCOLLECT_BLOG']),
    loadComments () {
      this.commentIsLoading = true
      let page = Math.floor(this.comments.length / 50) + 1
      getBlogComment(this.curItem.id, page, 50).then(res => {
        this.comments.push(...res)
        if (res.length < 50) {
          this.commentLoadComplete = true
        }
        this.commentIsLoading = false
      })
    },
    vote () {
      voteBlog(this.curItem.blogapp, this.curItem.id, true).then(res => {
        if (!res.IsSuccess) {
          this.$toast({
            message: res.Message
          })
        } else {
          this.$toast({
            message: '推荐成功'
          })
        }
      })
    },
    sendComment () {
      if (this.commentInput.length === 0) {
        this.$toast({
          message: '请输入评论'
        })
        return
      }
      addComment(this.curItem.blogapp, this.curItem.id, this.commentInput).then(res => {
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
    sendReplyComment () {
      if (this.replyCommentInput.length === 0) {
        this.$toast({
          message: '请输入评论'
        })
        return
      }
      let content = `@${this.replyItem.author.name} \n ${this.replyCommentInput}`
      addComment(this.curItem.blogapp, this.curItem.id, content, this.replyItem.id).then(res => {
        if (!res.IsSuccess) {
          this.$toast({
            message: res.Message
          })
        } else {
          this.$toast({
            message: '回复成功'
          })
          this.comments.unshift({
            author: {
              name: '我'
            },
            published: new Date().toGMTString(),
            content: content
          })
          this.replyCommentInput = ''
          this.isShowReply = false
        }
      })
    },
    gotoZone () {
      return this.push(`/blogapp?name=${this.curItem.author}&blogapp=${this.curItem.blogapp}`)
    },
    reply (item) {
      console.log(item)
      this.replyItem = item
      this.isShowReply = true
    }
  },
  computed: {
    showLoadingMore () {
      return (!this.commentIsLoading) && this.comments.length > 0 && (!this.commentLoadComplete)
    },
    showNoComment () {
      return this.commentLoadComplete && this.comments.length === 0
    },
    isCollect () {
      return this.$store.state.user.blog_coll.findIndex(x => x.id === this.$route.query.id) >= 0
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
    overflow-x: hidden;
    overflow-y: auto;
    height: 90vh;
    padding-bottom: 100px;
    box-sizing: border-box;
    .header {
      display: inline-block;
      height: 30px;
      .name {
        position: absolute;
        left: 10px;
        font-size: 12px;
      }
      .date {
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
    border-top: 2px solid #eeee;
  }
}
</style>
