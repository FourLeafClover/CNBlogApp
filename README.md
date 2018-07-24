CnBlogApp

        此项目,本地运行能够使用,本地运行所有接口都做了代理,图片也做了中转处理,此项目引用了部分cordova功能,
        譬如原生复制,返回事件,Webview的cookie写入(Cordova中document.cookie不生效).

命令

    npm install
    npm run start  本地运行
    npm run build  本地编译

基于 vue-cli@3.0: https://cli.vuejs.org/

UI 库使用 vant: https://youzan.github.io/vant/#/zh-CN/intro/

/src/utils 下提供了 http 请求,localstorage 存储,cookie 操作

提供了this.push和this.goBack方法,调用这两个方法才能实现切换动画效果

监控了原始backbutton事件,让其调用提供的goBack方法

Cordova打包的时候需要引入如下Plugin,如果觉得运行慢可以自行引入inter的crosswalk或者腾讯的x5引擎提升性能

    <plugin name="com.cordova.plugins.cookiemaster" 
    spec="https://github.com/chaoszero6/com.cordova.plugins.cookiemaster.git" />
    
    <plugin name="eeschiavo-cordova-plugin-clipboard" spec="^1.0.1" />

登录:

    1.个人中心有登录按钮,登录功能里面有一个博客id和cookie输入框。其中博客id只是用来获取用户信息跟用户登录没关系，
    
    2.只有cnlogcookie才是真正评论推荐功能需要使用的。cnblogcookie请用Chrome登陆后在cookie里面查看。
    
    3.登录Cookie会过期，如果过期了请重新更新
    
    4.博客ID请输入完整准确的,不然接口可能匹配不到。

接口:

    1.非登录的接口来源于: http://wcf.open.cnblogs.com/news/help /  http://wcf.open.cnblogs.com/blog/help
        
    2.登录后操作的接口来源于博客园PC断原有接口

实现功能:

    1.新闻列表
    
    2.博客列表
    
    3.博客详情[评论功能,推荐功能]
    
    4.新闻详情[新闻详情不提供评论和推荐功能,原因是新闻的接口,居然需要把所有的cookie都加进去,而博客的操作只需要加入.CNBlogsCookie这个cookie,个人觉得没太大比较了。基本上也就只有博客评论和推荐的人多,所以登录界面我也就只提供了.CNBlogsCookie的设置输入框。
    
下载地址:
    http://images.cnblogs.com/cnblogs_com/FourLeafCloverZc/1226959/o_03f17e2c2b5632a675cd39f79613bf1e.png
