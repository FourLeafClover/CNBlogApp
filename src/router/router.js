let configs = [{
  path: '/',
  name: 'home',
  component: () =>
    import('@/views/Home.vue'),
  meta: {
    needAuth: false,
    index: 0,
    cache: true
  }
},
{
  path: '/user',
  name: 'user',
  component: () =>
    import('@/views/User.vue'),
  meta: {
    needAuth: false,
    index: 0,
    cache: true
  }
}, {
  path: '/news',
  name: 'news',
  component: () =>
    import('@/views/News.vue'),
  meta: {
    needAuth: false,
    index: 0,
    cache: true
  }
}, {
  path: '/blogdetail',
  name: 'blogdetail',
  component: () => import('@/views/BlogDetail.vue'),
  meta: {
    needAuth: false,
    index: 0,
    cache: false
  }
}, {
  path: '/newsdetail',
  name: 'newsdetail',
  component: () => import('@/views/NewsDetail.vue'),
  meta: {
    needAuth: false,
    index: 0,
    cache: false
  }
}, {
  path: '/blogapp',
  name: 'blogapp',
  component: () => import('@/views/BlogZone.vue'),
  meta: {
    needAuth: false,
    index: 0,
    cache: false
  }
}
]

export default configs
