module.exports = {
  baseUrl: './',
  devServer: {
    port: 7878,
    proxy: {
      '/blog': {
        target: 'http://wcf.open.cnblogs.com',
        changeOrigin: true,
        secure: false
      },
      '/news': {
        target: 'http://wcf.open.cnblogs.com/',
        changeOrigin: true,
        secure: false
      },
      '/mvc': {
        target: 'https://www.cnblogs.com/mvc',
        changeOrigin: true,
        secure: false
      },
      '/Comment/InsertComment': {
        target: ' https://news.cnblogs.com',
        changeOrigin: true,
        secure: false
      },
      '/News/VoteNews': {
        target: ' https://news.cnblogs.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  lintOnSave: true
}
