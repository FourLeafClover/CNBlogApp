<template>
<v-layout :active="3" class="user">
  <div class="header">
    <div class="loginHeader" @click="()=>showLogin=true" v-if="!user">
      <i class="logo iconfont icon-blogger"></i>
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
      <i slot="icon" class="iconfont icon-account1 cell-icon" />
    </van-cell>
    <van-cell title="进入主页" @click="gotoZone" v-if="user" is-link>
      <i slot="icon" class="iconfont icon-qzone cell-icon" />
    </van-cell>
    <van-cell title="更新登录Cookie" v-if="user" @click="editCookieShow=true" is-link>
      <i slot="icon" class="iconfont icon-account1 cell-icon" />
    </van-cell>
    <van-cell title="页面过渡动画">
      <i slot="icon" class="iconfont icon-setting cell-icon" />
      <van-switch class="right-icon" size='25px' v-model="isOpenPageAnimation" />
    </van-cell>
    <van-cell title="本地收藏" @click="push('collection')" is-link>
      <i slot="icon" class="iconfont icon-emaxcitygerenxinxitubiaoji02 cell-icon" />
    </van-cell>
    <van-cell title="主題切换" is-link @click="()=>this.push('/theme')">
      <i slot="icon" class="iconfont icon-theme cell-icon" />
    </van-cell>
    <van-cell title="有更新啦" v-if="isHaveUpdate" is-link @click="downloadApp">
      <i slot="icon" class="iconfont icon-update cell-icon" />
    </van-cell>
    <van-cell title="暂无更新" v-else is-link @click="downloadApp">
      <i slot="icon" class="iconfont icon-update cell-icon" />
    </van-cell>
    <van-cell title="关于" is-link @click="()=>this.push('/about')">
      <i slot="icon" class="iconfont icon-about cell-icon" />
    </van-cell>
    <van-cell title="退出登录" v-if="user!=null" @click="logout" is-link>
      <i slot="icon" class="iconfont icon-exit cell-icon" />
    </van-cell>
  </van-cell-group>
  <van-actionsheet v-model="showLogin" title="登录">
    <van-cell-group>
      <van-field @click-icon="showLoginNameHelper=true" v-model="loginName" type="text" placeholder="请输入登录名" rows="1" icon="question" autosize />
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
  <van-popup v-model="showLoginNameHelper" class="helper_notice">
    <img src="https://images2018.cnblogs.com/blog/657942/201809/657942-20180902114550257-147904121.jpg" />
    <div>
      登录名请使用个人资料里面的昵称
    </div>
  </van-popup>
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
      loginName: '',
      cookie: '',
      newsCookie: '',
      showLogin: false,
      editCookieShow: false,
      isOpenPageAnimation: this.$store.state.app.openPageAnimation,
      showLoginNameHelper: false
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
      if (this.loginName !== '' && this.cookie !== '') {
        let loading = this.$toast.loading({
          duration: 10000,
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner'
        })
        loadUser(this.loginName).then(res => {
          loading.clear()
          if (res) {
            this.user = res
            this.showLogin = false
            res.title = res.name
            this.SET_USER(res)
            setAuthCookie(this.cookie)
            this.$toast({
              message: '登录信息设置成功'
            })
          } else {
            this.$toast({
              message: '无法匹配用户,请重试输入登录名'
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
@import '@/assets/styles/variable.scss';
.loginHeader {
  position: relative;
  height: 90px;
  background-color: #f8f8f8;
  margin-bottom: 5px;
  .logo {
    font-size: 50px;
    position: absolute;
    left: 20px;
    top: 20px;
    @include themify {
      color: themed('color') !important
    }
  }
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
  padding-bottom: 60px;
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
  margin-right: 10px;
  font-size: 18px;
  @include themify {
    color: themed('color') !important
  }
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

.helper_notice {
  img {
    width: 80vw;
  }
  div {
    line-height: 40px;
    font-size: 12px;
    text-align: center;
    color: gray;
  }
}
</style>
