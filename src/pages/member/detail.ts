import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { HttpService } from "../service/httpService";
import { ConstValue } from "../service/constValue";
import { CookieService } from '../service/cookie';
import { MemberService } from '../service/memberService';
import { BlogAppPage } from '../blog/blogApp';
import { LoginPage } from '../member/login';

@Component({
    templateUrl: 'detail.html',
    selector: "page-all",
    providers: [HttpService, ConstValue, CookieService, MemberService]
})
export class MemberDetailPage {

    public user: any;
    public status: any;
    public blogApp: string;

    gotoBlog() {
        if (this.checkLogin()) {
            this.navCtrl.push(BlogAppPage, window['currentUser'].blogApp);
        }
    }

    checkLogin() {
        if (!window['currentUser']) {
            this.toastCtrl.create({
                message: '您还未登陆,请登录',
                duration: 3000,
                position: 'top'
            }).present();
            return false;
        } else {
            return true;
        }
    }

    ionViewDidEnter() {
        if (window['currentUser']) {
            this.status = '注销';
            this.httpService.get({
                url: "api/Users",
                isShowLoading: false,
            }, (result) => {
                if (result != null) {
                    this.user = result;
                }
            });
            this.blogApp = window['currentUser'].blogApp;
        } else {
            this.status = '登陆';
            this.blogApp = '';
        }
    }

    logOut() {
        this.memberService.logout(() => {
            this.navCtrl.pop();
        })
    }

    login() {
        if (this.status == '注销') {
            this.logOut();
        } else {
            this.navCtrl.push(LoginPage);
        }
    }

    return() {
        this.navCtrl.pop();
    }

    constructor(public httpService: HttpService,
        public navCtrl: NavController,
        private memberService: MemberService,
        private cookie: CookieService,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
    ) {
        this.user = {};
    }
}
