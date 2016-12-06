import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { BlogPage } from '../pages/blog/blog';
import { BlogAppPage } from '../pages/blog/blogApp';
import { SearchBlogPage } from '../pages/blog/search';
import { NewsPage } from '../pages/news/news';
import { HomePage } from '../pages/home/home';
import { FirstPage } from '../pages/first/first';
import { DetailPage } from '../pages/detail/detail'
import { CommentPage } from '../pages/comment/comment'
import { NewsCommentPage } from '../pages/comment/news_comment'
import { NewsDetailPage } from '../pages/detail/news_detail'
import { LoginPage } from '../pages/member/login'
import { MemberDetailPage } from '../pages/member/detail'

@NgModule({
  declarations: [
    MyApp,
    BlogPage,
    NewsPage,
    HomePage,
    FirstPage,
    DetailPage,
    CommentPage,
    NewsCommentPage,
    NewsDetailPage,
    LoginPage,
    MemberDetailPage,
    BlogAppPage,
    SearchBlogPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BlogPage,
    NewsPage,
    HomePage,
    FirstPage,
    DetailPage,
    CommentPage,
    NewsCommentPage,
    NewsDetailPage,
    LoginPage,
    MemberDetailPage,
    BlogAppPage,
    SearchBlogPage
  ],
  providers: []
})
export class AppModule { }
