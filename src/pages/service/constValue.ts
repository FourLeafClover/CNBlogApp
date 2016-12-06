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