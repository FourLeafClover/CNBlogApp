import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from "../detail/detail";
import { HttpService } from "../service/httpService";
import { ConstValue } from '../service/constValue';
import { CookieService } from '../service/cookie';
import { MemberService } from '../service/memberService';
// 首页
@Component({
    selector: 'page-all',
    templateUrl: 'first.html',
    providers: [HttpService, ConstValue, CookieService, MemberService]
})
export class FirstPage {

    public pageIndex: number;
    public pageSize: number;
    public summaryList: any;

    doRefresh(refreshScroll) {
        this.pageIndex = 1;
        this.summaryList = [];
        this.getCurrentPage(false, () => {
            refreshScroll.complete();
        });
    }

    doInfinite(infiniteScroll) {

        this.pageIndex = this.pageIndex + 1;
        this.getCurrentPage(false, () => {
            infiniteScroll.complete();
        })
    }

    getCurrentPage(isShowLoading, callback: any) {

        let url = `api/blogposts/@sitehome?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        this.httpService.get({
            url: url,
            isShowLoading: isShowLoading
        }, (result: Array<any>) => {

            result.forEach((item) => {
                this.summaryList.push(item);
            })

            if (callback !== null) {
                callback();
            }
        });
    }

    gotoToDetail(item) {
        this.navCtrl.push(DetailPage, item);
    }

    constructor(private httpService: HttpService, public navCtrl: NavController) {
        this.pageIndex = 1;
        this.pageSize = 20;
        this.summaryList = [];
        this.getCurrentPage(true, null);
    }
}
