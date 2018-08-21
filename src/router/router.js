let configs = [{
  path: '/',
  name: 'page-home',
  component: () =>
    import('@/views/Home.vue'),
  meta: {
    needAuth: false,
    cache: true
  }
},
{
  path: '/user',
  name: 'page-user',
  component: () =>
    import('@/views/User.vue'),
  meta: {
    needAuth: false,
    cache: true
  }
}, {
  path: '/news',
  name: 'page-news',
  component: () =>
    import('@/views/News.vue'),
  meta: {
    needAuth: false,
    cache: true
  }
}, {
  path: '/blogdetail',
  name: 'page-blogdetail',
  component: () => import('@/views/BlogDetail.vue'),
  meta: {
    needAuth: false,
    cache: false
  }
}, {
  path: '/newsdetail',
  name: 'page-newsdetail',
  component: () => import('@/views/NewsDetail.vue'),
  meta: {
    needAuth: false,
    cache: false
  }
}, {
  path: '/blogapp',
  name: 'page-blogapp',
  component: () => import('@/views/BlogApp.vue'),
  meta: {
    needAuth: false,
    cache: true
  }
}, {
  path: '/about',
  name: 'page-about',
  component: () => import('@/views/About.vue'),
  meta: {
    needAuth: false,
    cache: true
  }
}, {
  path: '/bloggerrank',
  name: 'page-bloggerrank',
  component: () => import('@/views/BloggerRank.vue'),
  meta: {
    needAuth: false,
    cache: true
  }
}, {
  path: '/bloggersearch',
  name: 'page-bloggersearch',
  component: () => import('@/views/BloggerSearch.vue'),
  meta: {
    needAuth: false,
    cache: true
  }
}, {
  path: '/collection',
  name: 'page-blogCollection',
  component: () => import('@/views/BlogCollection'),
  meta: {
    needAuth: false,
    cache: true
  }
}, {
  path: '/theme',
  name: 'page-theme',
  component: () => import('@/views/Theme'),
  meta: {
    needAuth: false,
    cache: true
  }
}
]

export default configs
