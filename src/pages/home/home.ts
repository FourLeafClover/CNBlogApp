import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, FabContainer } from 'ionic-angular';
import { Http } from '@angular/http';
import { FirstPage } from '../first/first'
import { BlogPage } from '../blog/blog';
import { BlogAppPage } from '../blog/blogApp';
import { SearchBlogPage } from '../blog/search';
import { NewsPage } from '../news/news';
import { LoginPage } from '../member/login';
import { MemberDetailPage } from '../member/detail';
import { ConstValue } from '../service/constValue';
import { CookieService } from '../service/cookie';
import { CollectService } from '../service/collectService';
import { MemberService } from '../service/memberService';
import { HttpService } from "../service/httpService";
import { DetailPage } from "../detail/detail";
import { NewsDetailPage } from '../detail/news_detail';

@Component({
    selector: 'page-all',
    templateUrl: 'home.html',
    providers: [ConstValue, CookieService, CollectService, MemberService, HttpService, FabContainer]
})
export class HomePage {

    public collectBlogList: Array<any>;
    public loginName: string;
    public fistpageList: Array<any>;
    public hotpageList: Array<any>;
    public firstNewsPageList: Array<any>;

    ionViewDidEnter() {
        if (window['currentUser']) {
            this.loginName = '注销'
        } else {
            this.loginName = '登陆'
        }
    }

    gotoFirstPage(id) {
        this.navCtrl.push(FirstPage);
    }

    gotoBlog(type) {
        this.navCtrl.push(BlogPage, type);
    }

    gotoNews() {
        this.navCtrl.push(NewsPage);
    }

    gotoSearch() {
        this.navCtrl.push(SearchBlogPage);
    }

    gotoBlogApp(blogApp) {
        this.navCtrl.push(BlogAppPage, blogApp);
    }

    login() {

        if (window['currentUser']) {
            this.memeberService.logout(() => {
                this.loginName = '登陆';
            });
        } else {
            this.navCtrl.push(LoginPage);
        }
    }

    getToMemeber() {
        this.navCtrl.push(MemberDetailPage);
    }

    closeFab(fab: FabContainer) {
        fab.close();
    }

    getFistPage() {
        let url = `api/blogposts/@sitehome?pageIndex=1&pageSize=5`;
        this.httpService.get({
            url: url,
            isShowLoading: false
        }, (result: Array<any>) => {
            this.fistpageList = result;
        });
    }

    getHotPage() {
        let url = `api/blogposts/@picked?pageIndex=1&pageSize=5`;
        this.httpService.get({
            url: url,
            isShowLoading: false
        }, (result: Array<any>) => {
            this.hotpageList = result;
        });
    }

    getFistNewsPage() {
        let url = `api/newsitems/@hot-week?pageIndex=1&pageSize=5`;
        this.httpService.get({
            url: url,
            isShowLoading: false
        }, (result: Array<any>) => {
            this.firstNewsPageList = result;
        });
    }

    goToNewsPage(item) {
        this.navCtrl.push(NewsDetailPage, item);
    }

    gotoToDetail(item) {
        this.navCtrl.push(DetailPage, item);
    }

    gotoToNewsDetail(item) {
        this.navCtrl.push(NewsDetailPage, item);
    }

    constructor(private http: Http,
        public navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private collectService: CollectService,
        private memeberService: MemberService,
        private toastCtrl: ToastController,
        private httpService: HttpService) {
        this.collectBlogList = this.collectService.getCollectBlogLocal();
        this.fistpageList = [];
        this.hotpageList = [];
        this.firstNewsPageList = [];
        this.httpService.getAuthToken(() => {
            this.getFistPage();
            this.getHotPage();
            this.getFistNewsPage();
        });
    }
}
