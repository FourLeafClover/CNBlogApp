import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from "../service/httpService";
import { ConstValue } from "../service/constValue";
import { CookieService } from '../service/cookie';
import { DetailPage } from "../detail/detail";

@Component({
    templateUrl: 'blog.html',
    selector: "page-all",
    providers: [HttpService, ConstValue, CookieService]
})
export class BlogPage {

    public pageIndex: number;
    public pageSize: number;
    public summaryList: any;
    public type: number;
    private constString: any;
    public curIndex: number;

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

    getFirstText(value) {
        if (value !== undefined && value !== null && value.length > 0) {
            return value[0]._text;
        }

        return "";
    }

    getCurrentTab(type: number) {
        this.curIndex = type;
        this.type = type;
        this.summaryList = [];
        this.pageIndex = 1;
        this.getCurrentPage(true, null);
    }

    convertXmlToJson(xml) {

        let obj = window['xmlToJSON'].parseString(xml);
        let result = [];
        if (obj.feed !== undefined && obj.feed.length > 0) {
            if (obj.feed[0].entry !== undefined && obj.feed[0].entry.length > 0) {
                obj.feed[0].entry.forEach((item) => {

                    if (this.type == 3) {
                        result.push({
                            Author: this.getFirstText(item.author[0].name),
                            Title: this.getFirstText(item.title),
                            Description: this.getFirstText(item.summary),
                            Avatar: item.author[0].avatar !== undefined ? this.getFirstText(item.author[0].avatar) : "",
                            BlogApp: this.getFirstText(item.blogApp),
                            PostDate: this.getFirstText(item.published),
                            CommentCount: this.getFirstText(item.comments),
                            DiggCount: this.getFirstText(item.diggs),
                            Id: this.getFirstText(item.id)
                        })
                    }
                })
            }
        }

        return result;
    }

    getCurrentPage(isShowLoading, callback = null) {

        let url = '';
        let baseUrl = '';
        let isAuth = true;
        if (this.type == 1) {
            url = `api/blogposts/@sitehome?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        }
        else if (this.type == 2) {
            url = `api/blogposts/@picked?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        }
        else if (this.type == 3) {
            isAuth = false;
            baseUrl = this.constString.blogWCFBaseUrl;
            url = `blog/48HoursTopViewPosts/${this.pageIndex * this.pageSize}`;
        }

        this.httpService.get({
            url: url,
            baseUrl: baseUrl,
            isShowLoading: isShowLoading,
            isAuth: isAuth
        }, (result: any) => {

            if (this.type == 3 || this.type == 4) {
                result = this.convertXmlToJson(result);
            }

            result.forEach((item) => {
                this.summaryList.push(item);
            });
            if (callback !== null) {
                callback();
            }
        });
    }

    gotoToDetail(item) {
        this.navCtrl.push(DetailPage, item);
    }

    constructor(public httpService: HttpService, public navCtrl: NavController, private constValue: ConstValue) {
        this.pageIndex = 1;
        this.pageSize = 20;
        this.type = 1;
        this.summaryList = [];
        this.getCurrentPage(true, null);
        this.constString = this.constValue.getConfig();
        this.curIndex = 1;
    }
}
