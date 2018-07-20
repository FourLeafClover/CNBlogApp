<template>
<v-layout :active="3" class="user">
  <div class="header">
    <div class="avatar" @click="()=>showLogin=true" v-if="user==null">
      <img src="@/assets/icon/default_avatar.png" />
    </div>
    <div v-else class="loginHeader">
      <img class="img" :src="user.avatar|imgConvert" />
      <div class="name">{{user.blogapp}}</div>
      <div class="exit" @click="logout">退出登录</div>
      <div class="exit" @click="editCookieShow=true">更新Cookie</div>
    </div>
  </div>
  <van-button class="zone" type="primary" @click="gotoZone">进入主页</van-button>
  <v-waves></v-waves>
  <van-actionsheet v-model="showLogin" title="登录">
    <van-cell-group>
      <van-field v-model="blogApp" type="text" placeholder="请输入登录名,用于获取头像,非必填" rows="1" autosize />
      <van-field v-model.trim="cookie" style="border-bottom: 2px solid #e8e8e8" type="textarea" placeholder="请输入Cookie,请在PC端登录,将浏览器里面的Cookie复制进来" rows="5" autosize />
    </van-cell-group>
    <div>
      <van-button style="width:100%" type="primary" @click="login">确定</van-button>
    </div>
  </van-actionsheet>
  <van-actionsheet v-model="editCookieShow" title="更新Cookie">
    <van-cell-group>
      <van-field v-model.trim="cookie" style="border-bottom: 2px solid #e8e8e8" type="textarea" placeholder="请输入Cookie,请在PC端登录,将浏览器里面的Cookie复制进来" rows="5" autosize />
    </van-cell-group>
    <div>
      <van-button style="width:100%" type="primary" @click="updateCookie">确定</van-button>
    </div>
  </van-actionsheet>
</v-layout>
</template>

<script>
import { loadUser } from '@/api/blog.js'
import {
  setUser,
  setAuthCookie,
  getUser,
  removeUser,
  removeAuthCookie
} from '@/utils/user'
export default {
  name: 'about',
  data () {
    return {
      showLogin: false,
      blogApp: '',
      cookie: '',
      user: getUser(),
      editCookieShow: false
    }
  },
  methods: {
    login () {
      if (this.blogApp) {
        loadUser(this.blogApp).then(res => {
          if (res) {
            setUser(res)
            this.user = res
          }
        })
      }
      if (this.cookie) {
        setAuthCookie(this.cookie)
      }
      this.showLogin = false
    },
    logout () {
      removeUser()
      removeAuthCookie()
      this.loadUser = null
    },
    updateCookie () {
      if (this.cookie) {
        setAuthCookie(this.cookie)
      }
      this.editCookieShow = false
    },
    gotoZone () {
      this.$router.push(`/blogapp?name=${this.user.title}&blogapp=${this.user.blogapp}`)
    }
  }
}
</script>

<style lang="scss" scoped>

.header {
  .avatar {
    overflow: hidden;
    margin: 0 auto;
    margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    /deep/ textarea {
      max-height: 200px;
    }
  }
}

.loginHeader {
  img {
    margin-left: 50%;
    width: 100px;
    border-radius: 50%;
    transform: translateX(-50px);
    margin-top: 50px;
    top: 30px;
  }
  .name {
    margin-top: 10px;
    text-align: center;
    width: 100%;
    color: dodgerblue;
  }
  .exit {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 5px;
    color: gray;
  }
}

.zone {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
