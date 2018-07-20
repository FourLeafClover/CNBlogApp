<template>
<transition :name="transitionName">
    <keep-alive :include="exclude">
      <router-view class="router-view"></router-view>
    </keep-alive>
  </transition>
</template>

<script>
import routerConfig from '@/router/router'
import { getAuthCookie } from '@/utils/user'
console.log(routerConfig)
const cacheRouter = routerConfig.filter(x => x.meta.cache).map(x => x.name)
console.log(cacheRouter)
export default {
  name: 'App',
  data () {
    return {
      transitionName: '',
      exclude: cacheRouter.length > 0 ? cacheRouter.join(',') : ''
    }
  },
  created () {
    const token = getAuthCookie()
    if (token) {
      document.cookie = `.CNBlogsCookie=${token}`
      document.addEventListener(
        'deviceready',
        function () {
          if (window.cookieMaster) {
            if (token) {
              window.cookieMaster.setCookieValue(
                'www.cnblogs.com',
                '.CNBlogsCookie',
                token,
                function () {},
                function (error) {
                  this.$toast({
                    message: '登录Token设置失败'
                  })
                  this.$toast({
                    message: error
                  })
                }
              )
            }
          }
        },
        false
      )
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.index > from.meta.index) {
        this.$set(this.$data, 'transitionName', 'slide-left')
      } else if (to.meta.index < from.meta.index) {
        this.$set(this.$data, 'transitionName', 'slide-right')
      } else {
        this.$set(this.$data, 'transitionName', 'slide-none')
      }
    }
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
