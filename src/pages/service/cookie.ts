import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

    // cookie 添加过期时间
    setCookie(key, value, expires_in) {

        var expiredtime = 0;
        if (expires_in !== undefined && expires_in != 0) {
            expiredtime = new Date().getTime() + (expires_in) * 1000;
        }
        var data = {
            value: value,
            expiredtime: expiredtime
        }

        window.localStorage.setItem(key, JSON.stringify(data));
    }

    // 获取Cookie,过期的cookie不读取
    getCookie(key) {
        let value = window.localStorage.getItem(key);
        if (value === undefined || value === null || value.trim() === '') {
            return null;
        } else {
            var cookie = JSON.parse(value);
            if (Number(cookie.expiredtime) == 0 || Number(cookie.expiredtime) > new Date().getTime()) {
                return cookie.value;
            } else {
                return null;
            }
        }
    }
}
