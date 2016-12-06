import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../service/httpService";
import { ConstValue } from "../service/constValue";
import { CookieService } from '../service/cookie';
import { DetailPage } from "../detail/detail";

@Component({
    templateUrl: 'search.html',
    selector: "page-all",
    providers: [HttpService, ConstValue, CookieService]
})
export class SearchBlogPage {

    public pageIndex: number;
    public pageSize: number;
    public summaryList: any;
    public type: number;
    private constString: any;
    public curIndex: number;
    public scrollEnable: Boolean;
    public title: String;
    public blogApp: String;
    public searchKeyWord: String;

    getCurrentPage(isShowLoading, callback = null) {
        let url = `api/ZzkDocuments/1?keyWords=${this.searchKeyWord}`;
        this.httpService.get({
            url: url,
            isShowLoading: isShowLoading
        }, (result: any) => {
            result.forEach((item) => {
                item.Title = item.Title.replace(/<.*?>/ig,"");
                item.Content = item.Content.replace(/<.*?>/ig,"");
                this.summaryList.push(item);
            });
            if (callback !== null) {
                callback();
            }
        });
    }

    search() {
        this.pageIndex = 1;
        this.summaryList = [];
        this.scrollEnable = false;
        this.getCurrentPage(false, () => {
            if (this.summaryList.length % this.pageSize == 0) {
                this.scrollEnable = true;
            }
        })
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
        this.navCtrl.push(DetailPage, {
            Title: item.Title,
            Url: item.Uri,
            PostDate: item.PublishTime,
            ViewCount: item.ViewTimes,
            CommentCount: item.CommentTimes,
            DiggCount: item.VoteTimes,
            Id: item.Id,
            BlogApp: item.Uri.replace("http://www.cnblogs.com/", "").split('/')[0]
        });
    }

    constructor(public httpService: HttpService,
        public navCtrl: NavController,
        private constValue: ConstValue,
        private navParams: NavParams) {
        this.pageIndex = 1;
        this.summaryList = [];
        this.constString = this.constValue.getConfig();
        this.curIndex = 1;
        this.pageSize = 20;
        this.scrollEnable = false;
        this.blogApp = this.navParams.data;
    }
}
