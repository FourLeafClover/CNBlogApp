import { ConstValue } from '../service/constValue';
import { CookieService } from '../service/cookie';
import { Injectable } from '@angular/core';

@Injectable()
export class CollectService {

    private cookieConfig: any;

    constructor(private constValue: ConstValue, private cookie: CookieService) {
        this.cookieConfig = this.constValue.getCookieConfig();
    }

    collectBlogLocal(item: any) {
        let blogList = this.cookie.getCookie(this.cookieConfig.key_collectBlog);
        if (blogList == null) {
            blogList = [];
        }
        blogList.push(item);
        this.cookie.setCookie(this.cookieConfig.key_collectBlog, blogList, 0);
    }

    getCollectBlogLocal() {
        let blogList = this.cookie.getCookie(this.cookieConfig.key_collectBlog);
        return blogList == null ? [] : blogList.reverse(0);
    }
}