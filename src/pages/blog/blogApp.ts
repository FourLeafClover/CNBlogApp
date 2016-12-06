import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../service/httpService";
import { ConstValue } from "../service/constValue";
import { CookieService } from '../service/cookie';
import { DetailPage } from "../detail/detail";

@Component({
    templateUrl: 'blogApp.html',
    selector: "page-all",
    providers: [HttpService, ConstValue, CookieService]
})
export class BlogAppPage {

    public pageIndex: number;
    public pageSize: number;
    public summaryList: any;
    public type: number;
    private constString: any;
    public curIndex: number;
    public scrollEnable: Boolean;
    public title: String;
    public blogApp: String;

    getCurrentPage(isShowLoading, callback = null) {
        let url = `api/blogs/${this.blogApp}/posts?pageIndex=${this.pageIndex}`;
        this.httpService.get({
            url: url,
            isShowLoading: isShowLoading
        }, (result: any) => {
            result.forEach((item) => {
                this.summaryList.push(item);
            });
            if (callback !== null) {
                callback();
            }
        });
    }

    doInfinite(infiniteScroll) {

        this.pageIndex = this.pageIndex + 1;
        this.getCurrentPage(false, () => {
            infiniteScroll.complete();
            if (this.summaryList.length % this.pageSize > 0) {
                infiniteScroll.disable();
            }
        })
    }

    gotoBlogApp(blogApp) {
        this.navCtrl.push(BlogAppPage, blogApp);
    }

    gotoToDetail(item) {
        this.navCtrl.push(DetailPage, item);
    }

    constructor(public httpService: HttpService,
        public navCtrl: NavController,
        private constValue: ConstValue,
        private navParams: NavParams) {
        this.pageIndex = 1;
        this.summaryList = [];
        this.constString = this.constValue.getConfig();
        this.curIndex = 1;
        this.scrollEnable = true;
        this.blogApp = this.navParams.data;
        this.getCurrentPage(true, () => {
            this.pageSize = this.summaryList.length;
            this.title == '博客' //this.summaryList[0].Author;
        });
    }
}
