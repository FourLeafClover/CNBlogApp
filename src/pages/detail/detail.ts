import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HttpService } from "../service/httpService";
import { ConstValue } from '../service/constValue';
import { CookieService } from '../service/cookie';
import { CollectService } from '../service/collectService';
import { MemberService } from '../service/memberService';
import { CommentPage } from "../comment/comment";
import { LoginPage } from '../member/login';
import { BlogAppPage } from '../blog/blogApp';

@Component({
  selector: 'page-all',
  templateUrl: 'detail.html',
  providers: [HttpService, ConstValue, CookieService, CollectService, MemberService]
})
export class DetailPage {

  public detail: any;
  public blogSummary: any;
  public commentDetail: String;

  goToComments() {
    this.navCtrl.push(CommentPage, this.blogSummary);
  }

  collect() {
    this.collectService.collectBlogLocal(this.blogSummary);
  }

  gotoBlogApp() {
    this.navCtrl.push(BlogAppPage, this.blogSummary.BlogApp);
  }

  share() {

    let options = {
      message: this.blogSummary.Title,
      subject: this.blogSummary.Description,
      url: this.blogSummary.Url
    };

    window['plugins'].socialsharing.share(options.message, options.message, null, options.url);

  }

  Comment() {

    let currentUser = window['currentUser'];

    if (this.commentDetail == undefined || this.commentDetail == null || this.commentDetail.trim() == '') {
      return;
    }

    if (!currentUser) {
      this.navCtrl.push(LoginPage);
      return;
    }

    let loading = this.loadCtrl.create({
      duration: 2000
    });

    loading.present();
    this.memberService.appendComment(
      this.blogSummary.BlogApp,
      this.blogSummary.Id,
      this.commentDetail,
      0,
      (result) => {

        loading.dismiss();
        if (result.IsSuccess) {
          this.blogSummary.CommentCount += 1;
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

  constructor(private httpService: HttpService,
    private navParams: NavParams,
    private navCtrl: NavController,
    private collectService: CollectService,
    private memberService: MemberService,
    private cookie: CookieService,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController) {
    this.blogSummary = this.navParams.data;

    // 部分会获取报错
    try {
      httpService.get({
        url: `api/blogposts/${this.blogSummary.Id}/body`
      }, (result) => {
        this.detail = result;
      })
    } catch (ex) {

    }
  }
}
