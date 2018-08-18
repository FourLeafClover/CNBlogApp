<template>
<v-layout :active="3" class="user">
  <div class="header">
    <div class="loginHeader" @click="()=>showLogin=true" v-if="!user">
      <img src="@/assets/icon/blog_on.png" />
      <div class="name">博客园 Cnblog.com</div>
      <div class="blogapp">Code change the world</div>
    </div>
    <div v-else class="loginHeader">
      <img class="img" :src="user.avatar|imgConvert" />
      <div class="name">{{user.title}}</div>
      <div class="blogapp">博客ID : {{user.blogapp}}</div>
    </div>
  </div>
  <van-cell-group>
    <van-cell title="登录" v-if="user==null" @click="()=>showLogin=true" is-link>
      <img slot="icon" class="cell-icon" src="@/assets/icon/account.png" />
    </van-cell>
    <van-cell title="进入主页" @click="gotoZone" v-if="user" is-link>
      <img slot="icon" class="cell-icon" src="@/assets/icon/qzone.png" />
    </van-cell>
    <van-cell title="更新登录Cookie" v-if="user" @click="editCookieShow=true" is-link>
      <img slot="icon" class="cell-icon" src="@/assets/icon/update.png" />
    </van-cell>
    <van-cell title="页面过渡动画">
      <img slot="icon" class="cell-icon" src="@/assets/icon/setting.png" />
      <van-switch class="right-icon" size='25px' v-model="isOpenPageAnimation" />
    </van-cell>
    <van-cell title="本地收藏" @click="push('collection')" is-link>
      <img slot="icon" class="cell-icon" src="@/assets/icon/collect_on.png" />
    </van-cell>
    <van-cell title="有更新啦" v-if="isHaveUpdate" is-link @click="downloadApp">
      <img slot="icon" class="cell-icon" src="@/assets/icon/updateapp.png" />
    </van-cell>
    <van-cell title="暂无更新" v-else is-link @click="downloadApp">
      <img slot="icon" class="cell-icon" src="@/assets/icon/updateapp.png" />
    </van-cell>
    <van-cell title="关于" is-link @click="()=>this.push('/about')">
      <img slot="icon" class="cell-icon" src="@/assets/icon/about.png" />
    </van-cell>
    <van-cell title="退出登录" v-if="user!=null" @click="logout" is-link>
      <img slot="icon" class="cell-icon" src="@/assets/icon/logout.png" />
    </van-cell>
  </van-cell-group>
  <van-actionsheet v-model="showLogin" title="登录">
    <van-cell-group>
      <van-field v-model="blogApp" type="text" placeholder="请输入登录名" rows="1" autosize />
      <van-field v-model.trim="cookie" style="border-bottom: 2px solid #e8e8e8" type="textarea" placeholder="请输入.CNBlogsCookie" rows="5" autosize />
    </van-cell-group>
    <div>
      <van-button style="width:100%" type="primary" @click="login">确定</van-button>
    </div>
  </van-actionsheet>
  <van-actionsheet v-model="editCookieShow" title="更新Cookie">
    <van-cell-group>
      <van-field v-model.trim="cookie" style="border-bottom: 2px solid #e8e8e8;" type="textarea" placeholder="请输入.CNBlogsCookie" rows="3" :autosize="false" />
    </van-cell-group>
    <div>
      <van-button style="width:100%" type="primary" @click="updateCookie">确定</van-button>
    </div>
  </van-actionsheet>
  <v-waves class="mywaves" :speed="2"></v-waves>
</v-layout>
</template>

<script>
import {
  loadUser
} from '@/api/blog.js'
import {
  setAuthCookie,
  removeAuthCookie
} from '@/utils/user'
import {
  mapActions
} from 'vuex'
export default {
  name: 'about',
  data () {
    return {
      blogApp: '',
      cookie: '',
      newsCookie: '',
      showLogin: false,
      editCookieShow: false,
      isOpenPageAnimation: this.$store.state.app.openPageAnimation
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    isHaveUpdate () {
      return this.$store.state.app.isHaveUpdate
    }
  },
  methods: {
    ...mapActions('app', ['OPEN_PAGEANIMATION']),
    ...mapActions('user', ['SET_USER', 'REMOVE_USER']),
    login () {
      if (this.blogApp !== '' && this.cookie !== '') {
        let loading = this.$toast.loading({
          duration: 10000,
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner'
        })
        loadUser(this.blogApp).then(res => {
          loading.clear()
          if (res) {
            this.user = res
            this.showLogin = false
            this.SET_USER(res)
            setAuthCookie(this.cookie)
            this.$toast({
              message: '登录信息设置成功'
            })
          } else {
            this.$toast({
              message: '无法匹配用户,请重试输入'
            })
          }
        })
      } else {
        this.$toast({
          message: '请输入登录名和博客园Cookie'
        })
      }
    },
    logout () {
      this.REMOVE_USER()
      removeAuthCookie()
      this.user = null
      this.$toast({
        message: '退出登录'
      })
    },
    updateCookie () {
      if (this.cookie) {
        setAuthCookie(this.cookie)
      }
      this.editCookieShow = false
    },
    gotoZone () {
      this.push({
        name: 'page-blogapp',
        query: {
          name: this.user.title,
          blogapp: this.user.blogapp
        }
      })
    },
    downloadApp () {
      window.open('https://fir.im/cnblog')
    }
  },
  watch: {
    isOpenPageAnimation () {
      this.OPEN_PAGEANIMATION(this.isOpenPageAnimation)
    }
  }
}
</script>

<style lang="scss" scoped>
.loginHeader {
  position: relative;
  height: 90px;
  background-color: #f8f8f8;
  margin-bottom: 5px;
  img {
    margin-left: 20px;
    width: 50px;
    border-radius: 10px;
    margin-top: 20px;
    top: 30px;
  }
  .name {
    text-align: left;
    width: 100%;
    color: black;
    position: absolute;
    font-size: bold;
    top: 22px;
    left: 80px;
  }
  .blogapp {
    left: 80px;
    text-align: left;
    width: 100%;
    color: black;
    position: absolute;
    font-size: 14px;
    top: 50%;
    transform: translateY(6px);
    color: gray;
  }
  .exit {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 5px;
    color: gray;
  }
}

.user {
  /deep/ .van-cell {
    border-bottom: 1px solid #eeeeee !important;
    background-color: rgba(0, 0, 0, 0) !important;
    z-index: 9;
  }
  /deep/ textarea {
    max-height: 100px;
  }
}

.cell-icon {
  height: 25px;
  margin-right: 10px;
}

.zone {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
}

.mywaves {
  position: fixed;
  bottom: 50px;
  height: 150px;
}
</style>
