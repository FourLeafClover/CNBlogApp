import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HttpService } from "../service/httpService";
import { ConstValue } from '../service/constValue';
import { CookieService } from '../service/cookie';
import { NewsCommentPage } from "../comment/news_comment";
import { MemberService } from '../service/memberService';
import { LoginPage } from '../member/login';

@Component({
    selector: 'page-all',
    templateUrl: 'news_detail.html',
    providers: [HttpService, ConstValue, CookieService, MemberService]
})
export class NewsDetailPage {

    public detail: any;
    public newsSummary: any;
    public commentDetail: string;

    goToComments() {
        this.navCtrl.push(NewsCommentPage, this.newsSummary, MemberService);
    }

    share() {

        let options = {
            message: this.newsSummary.Title,
            subject: this.newsSummary.Summary,
            url: `https://news.cnblogs.com/n/${this.newsSummary.Id}/`
        };

        window['plugins'].socialsharing.share(options.message, options.message, null, options.url);
    }

    Comment() {
        var currentUser = window['currentUser'];

        if (this.commentDetail == undefined || this.commentDetail == null || this.commentDetail.trim() == '') {
            return;
        }

        if (currentUser == undefined || currentUser == null) {
            this.navCtrl.push(LoginPage);
            return;
        }

        let loading = this.loadingCtrl.create({
            duration: 2000
        });

        loading.present();

        this.memberService.appendNewsComment(
            this.newsSummary.Id,
            this.commentDetail,
            0,
            (result) => {

                loading.dismiss();
                if (result.IsSuccess) {
                    this.newsSummary.CommentCount += 1;
                    this.commentDetail = '';
                }
                let toast = this.toastCtrl.create({
                    message: result.IsSuccess ? '评论添加成功.' : result.Message,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
    }

    constructor(private httpService: HttpService, private navParams: NavParams,
        private navCtrl: NavController,
        private memberService: MemberService,
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController) {
        this.newsSummary = this.navParams.data;
        httpService.get({
            url: `api/newsitems/${this.newsSummary.Id}/body`
        }, (result) => {
            this.detail = result;
        })
    }
}
