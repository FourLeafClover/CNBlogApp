import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from "../service/httpService";
import { ConstValue } from "../service/constValue";
import { CookieService } from '../service/cookie';
import { NewsDetailPage } from '../detail/news_detail'
import { MemberService } from '../service/memberService';

@Component({
    templateUrl: 'news.html',
    selector: "page-all",
    providers: [HttpService, ConstValue, CookieService, MemberService]
})
export class NewsPage {

    public pageIndex: number;
    public pageSize: number;
    public summaryList: any;
    public type: number;
    public curIndex: number;
    public scrollEnable: Boolean;

    doRefresh(refreshScroll) {
        let that = this;
        setTimeout(() => {
            that.pageIndex = 1;
            that.summaryList = [];
            that.getCurrentPage(false, () => {
                refreshScroll.complete();
            });
        }, 1000);
    }

    doInfinite(infiniteScroll) {

        this.pageIndex = this.pageIndex + 1;
        this.getCurrentPage(false, () => {
            infiniteScroll.complete();
        })
    }

    getCurrentTab(type: number) {
        this.scrollEnable = false;
        this.curIndex = type;
        this.type = type;
        this.summaryList = [];
        this.pageIndex = 1;
        this.getCurrentPage(true, () => {
            this.scrollEnable = true;
        });
    }

    getCurrentPage(isShowLoading, callback = null) {

        let url = '';
        if (this.type == 1) {
            url = `api/newsitems/@hot-week?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;

        }
        else if (this.type == 2) {
            url = `api/newsitems/@hot?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        }
        else if (this.type == 3) {
            url = `api/newsitems/@recommended?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        }
        else if (this.type == 4) {
            url = `api/NewsItems?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        }

        this.httpService.get({
            url: url,
            isShowLoading: isShowLoading,
        }, (result: any) => {
            result.forEach((item) => {
                this.summaryList.push(item);
            });
            if (callback !== null) {
                callback();
            }
        });
    }

    gotoNewsDetail(item) {
        this.navCtrl.push(NewsDetailPage, item);
    }

    constructor(public httpService: HttpService, public navCtrl: NavController, private constValue: ConstValue) {
        this.pageIndex = 1;
        this.pageSize = 20;
        this.type = 1;
        this.scrollEnable = true;
        this.summaryList = [];
        this.getCurrentPage(true, null);
        this.curIndex = 1;
    }
}
