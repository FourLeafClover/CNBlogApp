import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CookieService } from '../service/cookie';
import { ConstValue } from '../service/constValue';
import { ToastController } from 'ionic-angular';

@Injectable()
export class MemberService {

    private requestOptions: any;
    public currentUser: any;

    constructor(private http: Http,
        private cookie: CookieService,
        private constValue: ConstValue,
        private toastCtrl: ToastController) {
        this.requestOptions = new RequestOptions();
        this.currentUser = null;
    }

    login(userName, password, success: Function) {

        this.http.get("https://passport.cnblogs.com/logout.aspx", null).subscribe(() => {

            let encrypt = new window['JSEncrypt']();
            encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp0wHYbg/NOPO3nzMD3dndwS0MccuMeXCHgVlGOoYyFwLdS24Im2e7YyhB0wrUsyYf0/nhzCzBK8ZC9eCWqd0aHbdgOQT6CuFQBMjbyGYvlVYU2ZP7kG9Ft6YV6oc9ambuO7nPZh+bvXH0zDKfi02prknrScAKC0XhadTHT3Al0QIDAQAB');
            let userNameEncrypt = encrypt.encrypt(userName);
            let passwordEncrypt = encrypt.encrypt(password);
            var ajax_data = {
                input1: userNameEncrypt,
                input2: passwordEncrypt
            };

            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('X-Requested-With', 'XMLHttpRequest');
            headers.append('VerificationToken', 'rInMJqvare15oVxAXjtdqzyjI-x86JMxlLQnBYgos03dOmT-_JthuT5eChxYvHilGKdp68ZhoEF7IIC8hm9ZIKnbWus1:WNSI-vAG75ONFLUYkrCoBhyh9DUlHX4tPUBpOZ43UM0YoR5CjBh0XysQFoub88k_cZ5-20K1X9lGKXi8uttR7nkyHE41');
            this.requestOptions = {
                headers: headers,
                withCredentials: true
            }

            this.http.post(this.constValue.getConfig().blogLoginBaseApi + 'user/signin', JSON.stringify(ajax_data), this.requestOptions).subscribe((data: any) => {
                if (data.status == 200) {
                    let loginResponse = JSON.parse(data._body);
                    if (loginResponse.success) {
                        window['currentUser'] = {
                            blogApp: userName,
                            password: password
                        }
                        success(true);
                    } else {
                        this.toastCtrl.create({
                            duration: 2000,
                            position: 'top',
                            message: data.message == undefined ? "登录失败" : data.message
                        }).present();
                        window['currentUser'] == null;
                        success(false);
                    }
                }
            })
        });
    }

    logout(callback) {
        this.http.get("https://passport.cnblogs.com/logout.aspx", null).subscribe((result) => {
            window['currentUser'] = null;
            if (callback) {
                callback();
            }
        });
    }

    appendComment(blogApp, postId, content, parentCommentId, callback) {

        let commentObj = {
            "blogApp": blogApp,
            "postId": postId, "body": content,
            "parentCommentId": parentCommentId
        };

        let commentHeader = new Headers();
        commentHeader.append('X-Requested-With', "XMLHttpRequest");
        commentHeader.append("Content-Type", "application/json; charset=UTF-8");
        this.requestOptions = {
            headers: commentHeader,
            withCredentials: true
        }
        this.http
            .post(this.constValue.getConfig().blogUrl + "mvc/PostComment/Add.aspx", JSON.stringify(commentObj), this.requestOptions)
            .subscribe((data: any) => {
                if (data.status == 200) {
                    if (callback) {
                        callback({
                            IsSuccess: JSON.parse(data._body).IsSuccess
                        });
                    }
                } else {
                    callback({
                        IsSuccess: false
                    })
                }
            });
    }

    appendNewsComment(newsId, content, parentCommentId, callback) {

        let commentObj = {
            Content: content,
            parentCommentId: parentCommentId,
            ContentID: newsId,
            title: ''
        };

        let commentHeader = new Headers();
        commentHeader.append('X-Requested-With', "XMLHttpRequest");
        commentHeader.append("Content-Type", "application/json; charset=UTF-8");
        this.requestOptions = {
            headers: commentHeader,
            withCredentials: true
        }

        this.http
            .post('https://news.cnblogs.com/Comment/InsertComment', JSON.stringify(commentObj), this.requestOptions)
            .subscribe((data: any) => {
                if (data.status == 200) {
                    if (data._body.indexOf('刚刚发表了评论') > 0) {
                        if (callback) {
                            callback({
                                IsSuccess: true
                            });
                        }
                    } else {
                        if (callback) {
                            callback({
                                IsSuccess: false
                            });
                        }
                    }
                }
            });
    }
}