import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HttpService } from "../service/httpService";
import { ConstValue } from "../service/constValue";
import { CookieService } from '../service/cookie';
import { MemberService } from '../service/memberService';

@Component({
    templateUrl: 'login.html',
    selector: "page-all",
    providers: [HttpService, ConstValue, CookieService, MemberService]
})
export class LoginPage {

    public userName: String;
    public password: String;
    public isRemember: boolean;


    login() {

        let loading = this.loadingCtrl.create({
            duration: 3000
        });
        loading.present();
        this.memberService.login(this.userName, this.password, (result) => {
            loading.dismiss();
            if (result) {
                if (this.isRemember) {
                    this.cookie.setCookie('lastLoginUser', {
                        userName: this.userName,
                        password: this.password,
                        isRemember: this.isRemember
                    }, 0);
                }
                this.navCtrl.pop();
            }
        })
    }

    register() {
        window.open('https://passport.cnblogs.com/register.aspx');
    }

    constructor(public httpService: HttpService,
        public navCtrl: NavController,
        private memberService: MemberService,
        private cookie: CookieService,
        private loadingCtrl: LoadingController
    ) {
        let lastLoginUser = this.cookie.getCookie('lastLoginUser');
        if (lastLoginUser) {
            this.userName = lastLoginUser.userName;
            this.password = lastLoginUser.password;
            this.isRemember = true;
        }
    }
}
