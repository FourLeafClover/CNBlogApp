<template>
<v-back-layout class="news" title="新闻" v-if="detail!=null">
  <div v-if="detail!=null">
    <div class="header">
      <div class="title">{{detail.Title}}</div>
      <div class="author">
        <span class="name">{{detail.SourceName}}</span>
        <span class="date">发布于: {{detail.SubmitDate | dateFormat}}</span>
      </div>
    </div>
    <v-markdown v-if="detail.Content!=''" :html="detail.Content" ></v-markdown>
    <div style="height:50px"></div>
    <van-tabbar>
      <van-tabbar-item @click="()=>showShare=true">
        <span>分享</span>
        <img slot="icon" slot-scope="props" src="@/assets/icon/share.png">
      </van-tabbar-item>
      <van-tabbar-item icon="shop" @click="showComment=true">
        <span>查看评论</span>
        <img slot="icon" slot-scope="props" src="@/assets/icon/comment.png">
      </van-tabbar-item>
    </van-tabbar>
    <v-share :show.sync="showShare" :link="link" :title="detail.Title"></v-share>
    <van-actionsheet style="overflow:hidden" v-model="showComment" title="评论">
      <div class="comments">
        <v-comment-item v-for="(item,key) in comments" :item="item" :key="key"></v-comment-item>
        <div class="item" v-show="showLoadingMore" @click="loadComments">点击加载更多评论</div>
        <div class="item" v-show="commentLoadComplete">评论加载完毕</div>
        <div class="item" v-if="showNoComment">没有评论</div>
        <v-loading v-if="commentIsLoading"></v-loading>
      </div>
      <van-cell-group class="addComment">
      </van-cell-group>
    </van-actionsheet>
  </div>
</v-back-layout>
<v-back-layout v-else title="新闻">
  <v-loading>
  </v-loading>
</v-back-layout>
</template>

<script>
import {
  getNewsDetail,
  getNewsComment
} from '@/api/news'
import {
  addNewsComment,
  voteNews as voteNewsApi
} from '@/api/user'
export default {
  name: 'page-newsdetail',
  data () {
    return {
      detail: null,
      showShare: false,
      showComment: false,
      comments: [],
      commentLoadComplete: false,
      commentIsLoading: false,
      link: '',
      commentInput: ''
    }
  },
  created () {
    getNewsDetail(this.$route.query.id).then(res => {
      this.detail = res
    })
    this.loadComments()
    this.link = `https://www.cnblogs.com/youclk/p/${this.$route.query.id}.html`
  },
  methods: {
    loadComments () {
      this.commentIsLoading = true
      const pageSize = 20
      let page = this.comments.length / pageSize + 1
      getNewsComment(this.$route.query.id, page, pageSize).then(res => {
        this.comments.push(...res)
        if (res.length < pageSize) {
          this.commentLoadComplete = true
        }
        this.commentIsLoading = false
      })
    },
    sendComment () {
      addNewsComment(this.commentInput, this.$route.query.id).then(res => {
        this.$toast({
          message: res
        })
      })
    },
    voteNews () {
      voteNewsApi(this.$route.query.id).then(res => {
        this.$toast({
          message: res.Message
        })
      })
    }
  },
  computed: {
    showLoadingMore () {
      return (!this.commentIsLoading &&
        this.comments.length > 0 &&
        !this.commentLoadComplete
      )
    },
    showNoComment () {
      return this.commentLoadComplete && this.comments.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.news {
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
    padding-bottom: 55px;
    box-sizing: border-box;
  }
  .addComment {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 2px solid #eee
  }
}
</style>
