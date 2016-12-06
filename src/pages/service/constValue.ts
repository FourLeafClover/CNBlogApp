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

        let isDebug = true;
        if (isDebug) {
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