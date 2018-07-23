<template>
<transition :name="transitionName">
    <keep-alive :include="include">
      <router-view class="router-view"></router-view>
    </keep-alive>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import routerConfig from '@/router/router'
import { initAuthCookie } from '@/utils/user'
const cacheRouter = routerConfig.filter(x => x.meta.cache).map(x => x.name)
export default {
  name: 'App',
  data () {
    return {
      transitionName: '',
      include: cacheRouter.length > 0 ? cacheRouter.join(',') : ''
    }
  },
  created () {
    initAuthCookie()
    console.log(this.include)
  },
  watch: {
    $route (to, from) {
      const pageAnimation = this.$store.state.app.pageAnimation
      if (pageAnimation === 1) {
        this.transitionName = 'slide-left'
      } else if (pageAnimation === -1) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-none'
      }
      // 使用完毕后更新成0
      this.UPDATE_PAGEANIMATION(0)
    }
  },
  methods: {
    ...mapActions('app', ['UPDATE_PAGEANIMATION'])
  }
}
</script>

<style lang="scss">
.router-view {
  width: 100%;
  height: 100%;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 200ms;
  position: absolute;
}

.slide-none-leave-active {
  opacity: 0;
  display: none;
}

.slide-none-enter {
  display: inline;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
