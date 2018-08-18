import Vue from 'vue'
import home from './layout/home.vue'
import blogItem from './item/blogItem'
import newsItem from './item/newsItem'
import markdown from './markdown'
import commentItem from './item/commentItem'
import loading from './loading/loading'
import back from './layout/back'
import share from './share'
import bloggerItem from './item/bloggerItem'
import empty from './404/blogger404.vue'
import waves from './waves'
import updateApp from './notice/updateApp'
Vue.component(waves.name, waves)
Vue.component(home.name, home)
Vue.component(blogItem.name, blogItem)
Vue.component(newsItem.name, newsItem)
Vue.component(markdown.name, markdown)
Vue.component(commentItem.name, commentItem)
Vue.component(loading.name, loading)
Vue.component(back.name, back)
Vue.component(share.name, share)
Vue.component(bloggerItem.name, bloggerItem)
Vue.component(empty.name, empty)
Vue.component(waves.name, waves)
Vue.component(updateApp.name, updateApp)
