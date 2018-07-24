<template>
<v-back-layout class="about" :class="$route.name" title="关于我">
  <div class="item">
    <div class="header">
      开发者
    </div>
    <div class="content">
      中文名:张聪,英文名:Frank Zhang
    </div>
  </div>
  <div class="item">
    <div class="header">
      格言
    </div>
    <div class="content">
      因为没有翅膀,所以要努力奔跑
    </div>
  </div>
  <div class="item">
    <div class="header">
      出生日期
    </div>
    <div class="content">
      1992/02/02
    </div>
  </div>
  <div class="item">
    <div class="header">
      邮箱
    </div>
    <div class="content" @click="openEmail">
      zc_smile@outlook.com
    </div>
  </div>
  <div class="item">
    <div class="header">
      github
    </div>
    <div class="content" @click="openGithub">
      https://github.com/FourLeafClover
    </div>
  </div>
  <div class="item">
    <div class="header">
      爱好
    </div>
    <div class="content">
      骑自行车,旅游,回顾经典电视剧,电影
    </div>
  </div>
</v-back-layout>
</template>

<script>
export default {
  name: 'page-about',
  methods: {
    openGithub () {
      window.open('https://github.com/FourLeafClover')
    },
    openEmail () {
      window.open('mailto:zc_smile@outlook.com')
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  background-color: #eeeeee;
  .item {
    background-color: white;
    margin-bottom: 5px;
    padding: 10px;
    box-sizing: border-box;
    .header {
      font-size: 16px;
      font-weight: bold;
    }
    .content {
      margin-top: 10px;
      font-size: 14px;
      color: gray;
    }
  }
}
</style>
