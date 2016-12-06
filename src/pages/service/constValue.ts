import { Injectable } from '@angular/core';

@Injectable()
export class ConstValue {

    constructor() {

    }

    getConfig() {

        let config = {
            blogWCFBaseUrl: "http://wcf.open.cnblogs.com/",
            blogAuthBaseApi: "https://api.cnblogs.com/",
            blogLoginBaseApi: "https://passport.cnblogs.com/",
            blogUrl: "http://www.cnblogs.com/"
        };

        let isDebug = false;
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

    

    getCookieConfig() {
        return {
            key_collectBlog: "collect_blog",
            key_collectBlogApp: "collect_blogApp",
            key_auth: "blog_auth"
        }
    }
}