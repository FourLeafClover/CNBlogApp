<template>
  <van-dialog class="update" v-if="$store.state.app.openUpdateAppNotice" v-model="$store.state.app.openUpdateAppNotice" title="有更新啦" :confirm-button-text="confirmText" @confirm="onConfirm">
    <div class="updatecontent" v-html="serveVersion.message">
    </div>
  </van-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'vUpdateApp',
  data () {
    return {
      show: true
    }
  },
  methods: {
    ...mapActions('app', ['GET_SERVECONF', 'CLOSE_UPDATEAPP_NOTICE']),
    onConfirm () {
      if (this.forceUpdate) {
        window.open('https://fir.im/cnblog')
      } else {
        this.CLOSE_UPDATEAPP_NOTICE()
      }
    }
  },
  computed: {
    ...mapState({
      serveVersion: state => state.app.serveConf.version,
      forceUpdate: state => state.app.serveConf.version.forceUpdate
    }),
    confirmText () {
      if (this.forceUpdate) {
        return '前往更新'
      } else {
        return '暂不更新'
      }
    }
  },
  mounted () {
    this.GET_SERVECONF()
  }
}
</script>

<style>
.updatecontent {
  line-height: 25px;
  text-align: left;
  color: gray;
  font-size: 14px;
  padding: 5px 20px;
}
</style>
