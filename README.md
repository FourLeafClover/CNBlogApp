# CNBlogApp
博客园APP,用于练手熟悉AngularJS,代码结构很乱,不打算整理,只在乎完成项目功能. 因为博客园是Auth2.0验证所以要去申请验证ID和验证秘钥.
#Service/HttpService 里面对http进行了封装, 如果没有Auth会自动去获取AuthTokey. Service/Cookie对Cookie进行简单封装了的。因为Auth2.0的AuthToken是有有效时间的.
#ConstValue是用来存储变量, 因为博客园调用的API 基地址不一样。真的很蛋疼。 因为博客园提供的OAuth API 不全。有部分API 只能去官网抓取URL调用博客园官网的API.
