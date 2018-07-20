vue-mobile

命令

    npm install
    npm run start  本地运行
    npm run build  本地编译
    npm run deploy 部署到服务器
    npm run lint   eslint校验,并自动更正

基于 vue-cli@3.0: https://cli.vuejs.org/

UI 库使用 vant: https://youzan.github.io/vant/#/zh-CN/intro/

/src/utils 下提供了 http 请求,localstorage 存储,cookie 操作

实现了简单的登录验证跳转

    routers.beforeEach((to, from, next) => {
        if (to.meta.needAuth) {
            if (getCookie('vue.auth')) {
                next();
            } else {
                next(`/login?redirect=${to.fullPath}`)
            }
        } else {
            next()
        }
    })

通过配置路由 meta index 实现页面过渡动画。相同的直接跳转，index 高的就左切换

动态设置页面缓存

/src/router/router.js 配置路由,实现方案请查看 App.vue。通过 watch router 变化实现的.

    meta: {
        needAuth: false,
        index: 0, // 用于页面过渡动画,index从小跳转到大的页面,左滑动,从大到小右滑动,同级没有动画效果
        cache: true // 页面是否缓存,不设置默认不缓存
    }

/src/language 新增多语言支持. cn.js 和 en.js 默认都是语言配置

    export default {
        App: {
            Home: '首页',
            About: '关于',
            Back: '返回'
        }
    }

    export default {
        App: {
            Home: 'Home',
            About: 'About',
            Back: 'Back'
        }
    }

新增 gulp-ssh,用于拷贝文件到发布包.Gulpfile.js 配置服务器地址

    let config = {
        version: '1.0.0',
        ssh: {
            host: 'xxxx', //服务器ip地址
            port: 22, //端口号
            username: 'root', //用户名
            password: 'xxxx' //密码
        },
        remoteDir: `/usr/local/xxx`, //部署路径
        commands: [
            `rm -rf ` //部署前需要执行的脚本。譬如重新发布后需要清空发布包之前的js和css
        ]
    };
