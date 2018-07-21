<template>
<v-layout :active="3" class="user">
  <div class="header">
    <div class="loginHeader" @click="()=>showLogin=true" v-if="!user">
      <img src="@/assets/icon/default_avatar.png" />
    </div>
    <div v-else class="loginHeader">
      <img class="img" :src="user.avatar" />
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
    <van-cell title="设置登录Cookie" @click="editCookieShow=true" is-link>
      <img slot="icon" class="cell-icon" src="@/assets/icon/update.png" />
    </van-cell>
    <van-cell title="关于" is-link>
      <img slot="icon" class="cell-icon" src="@/assets/icon/about.png" />
    </van-cell>
    <van-cell title="退出登录" v-if="user!=null" @click="logout" is-link>
      <img slot="icon" class="cell-icon" src="@/assets/icon/logout.png" />
    </van-cell>
  </van-cell-group>
  <van-actionsheet v-model="showLogin" title="登录">
    <van-cell-group>
      <van-field v-model="blogApp" type="text" placeholder="请输入登录名,用于获取头像,非必填" rows="1" autosize />
      <van-field v-model.trim="cookie" style="border-bottom: 2px solid #e8e8e8" type="textarea" placeholder="请输入.CNBlogsCookie" rows="5" autosize />
    </van-cell-group>
    <div>
      <van-button style="width:100%" type="primary" @click="login">确定</van-button>
    </div>
  </van-actionsheet>
  <van-actionsheet v-model="editCookieShow" title="更新Cookie">
    <van-cell-group>
      <van-field v-model.trim="cookie" style="border-bottom: 2px solid #e8e8e8" type="textarea" placeholder="请输入.CNBlogsCookie" rows="3" autosize />
    </van-cell-group>
    <div>
      <van-button style="width:100%" type="primary" @click="updateCookie">确定</van-button>
    </div>
  </van-actionsheet>
</v-layout>
</template>

<script>
import {
  loadUser
} from '@/api/blog.js'
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
      newsCookie: '',
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
        setAuthCookie(this.cookie, '')
      }
      this.showLogin = false
    },
    logout () {
      removeUser()
      removeAuthCookie()
      this.user = null
    },
    updateCookie () {
      if (this.cookie && this.newsCookie) {
        setAuthCookie(this.cookie, this.newsCookie)
      }
      this.editCookieShow = false
    },
    gotoZone () {
      this.$router.push(
        `/blogapp?name=${this.user.title}&blogapp=${this.user.blogapp}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.loginHeader {
  position: relative;
  height: 90px;
  background-color: #f8f8f8;
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
    top: 50%;
    left: 80px;
    transform: translateY(-20px);
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
  }
  .exit {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 5px;
    color: gray;
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
</style>
