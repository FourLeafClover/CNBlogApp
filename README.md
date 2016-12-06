# CNBlogApp

 * 博客园APP,用于练手熟悉AngularJS,代码结构很乱,不打算整理,只在乎完成项目功能. 因为博客园是Auth2.0验证所以要去申请验证ID和验证秘钥.
 * Service/HttpService 里面对http进行了封装, 如果没有Auth会自动去获取AuthTokey. Service/Cookie对Cookie进行简单封装了的。因为Auth2.0的AuthToken是有有效时间的.
 * ConstValue是用来存储变量, 因为博客园调用的API 基地址不一样。真的很蛋疼。 因为博客园提供的OAuth API 不全。有部分API 只能去官网抓取URL调用博客园官网的API.
 * 由于访问跨域的问题,所以设置了代理,本地Localhost运行需设置isDebug为true.打包App设置isDebug为true
 
```
    Cookie.ts 

    getConfig() {

        let config = {
            blogWCFBaseUrl: "http://wcf.open.cnblogs.com/",
            blogAuthBaseApi: "https://api.cnblogs.com/",
            blogLoginBaseApi: "https://passport.cnblogs.com/",
            blogUrl: "http://www.cnblogs.com/"
        };

        let isDebug = true;
        if (isDebug) {
            
            // 坑坑的博客园OAuth获取Token的API 打死在Localhost会返回Error.所以Localhost只能手动插入Token了。记得用Postman获取最新Token设置到这里
            // 当然打包成APP这些都没问题呢了。APP可以正常去通过Post获取OAuth token
            window.localStorage.setItem('authToken',JSON.stringify({
                value:'NOAddZH5AdApSyv8FNu5cl-1zGmFuVqfaHw8Zpi03cG0DZAqQ7Nu7Hfe8zrICAVcaks_bvlPUF_SfD1pHvbIy9bRGmnhuoBCyZpCtAK4TspBkamV-hSnxsuW4T2ztWdtdrVp2SXZrhNE4Mm_3NrXzOYvV_jZaI-0VJZ6Z5qfjPWoh8Ui8xPEFdcqA-5kPdZk6AgZFLP6UoPKSUs31PoiDw',
                expiredtime:0
            }));
            
            config = {
                blogWCFBaseUrl: "",// "http://wcf.open.cnblogs.com/",
                blogAuthBaseApi: "",// "https://api.cnblogs.com/",
                blogLoginBaseApi: "",//"https://passport.cnblogs.com/",
                blogUrl: ""// "http://www.cnblogs.com/"
            }
        }

        return config;
    }
    
    ionic.config.json 代理配置用于debug模式
    
    "proxies": [{
            "path": "/api",
            "proxyUrl": "https://api.cnblogs.com/api"
        },
        {
            "path": "/blog",
            "proxyUrl": "http://wcf.open.cnblogs.com/blog"
        },
        {
            "path": "/user",
            "proxyUrl": "https://passport.cnblogs.com/user"
        },
        {
            "path": "/mvc",
            "proxyUrl": "http://www.cnblogs.com/mvc"
        },
        {
            "path": "https://api.cnblogs.com/token",
            "proxyUrl": "https://api.cnblogs.com/token"
        }
    ]
    
    
  ```
  * 登录功能loaclhost服务无法使用,坑爹呀,调用了登录接口,登录接口与其他接口的基地址不一样，导致登录后服务端Header添加的Cookie没法传递到其他接口服务里面，PS：手机端是可以的,因为手机端是一个宿主，不想本地服务每个不同的API基地址设置了不同代理,相当于不同的宿主，导致Cookie不能共享
