<template>
<v-back-layout title="主题选择">
  <div @click="changeTheme(item)" class="item" v-for="(item,index) in $store.state.app.themeList" :key="index" :style="{ 'background-color':item }">
  </div>
</v-back-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('app', ['CHANGE_THEME']),
    changeTheme (item) {
      this.CHANGE_THEME(item)
      this.goBack(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  width: 300px;
  border-radius: 5px;
  margin:0 auto;
  margin-top:10px;
  height:50px;
}
</style>
