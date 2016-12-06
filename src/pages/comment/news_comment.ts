import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../service/httpService";
import { ConstValue } from '../service/constValue';
import { CookieService } from '../service/cookie';

@Component({
    templateUrl: 'news_comment.html',
    providers: [HttpService, ConstValue, CookieService]
})
export class NewsCommentPage {

    private pageIndex: any;
    private pageSize: any;
    private newSummary: any;
    public summaryList: any;

    doInfinite(infiniteScroll) {
        this.pageIndex = this.pageIndex + 1;
        this.getCurrentPage(() => {
            infiniteScroll.complete();
            if (this.summaryList.length % 50 > 0) {
                infiniteScroll.enable(false);
            }
        })
    }

    getCurrentPage(callback = null) {
        this.httpService.get({
            url: `api/news/${this.newSummary.Id}/comments?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        }, (result) => {
            this.summaryList = result;
            if (callback !== null) {
                callback();
            }
        })
    }

    constructor(private httpService: HttpService, private navParams: NavParams,
        private navCtrl: NavController) {

        this.pageIndex = 1;
        this.pageSize = 50;
        this.newSummary = this.navParams.data;
        this.getCurrentPage(null);
    }
}
