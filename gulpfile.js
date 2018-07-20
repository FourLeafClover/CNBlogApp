'use strict'
var gulp = require('gulp')
var GulpSSH = require('gulp-ssh')

let config = {
  version: '1.0.0',
  ssh: {
    host: 'xxxx', // 服务器ip地址
    port: 22, // 端口号
    username: 'root', // 用户名
    password: 'xxxx' // 密码
  },
  remoteDir: `/usr/local/xxx`, // 部署路径
  commands: [
    `rm -rf ` // 部署前需要执行的脚本。譬如重新发布后需要清空发布包之前的js和css
  ]
}

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config.ssh
})

gulp.task('default', ['deployFile'], function () {})

/**
 * 上传文件
 */
gulp.task('deployFile', ['execSSH'], () => {
  return gulp
    .src(['./dist/**'])
    .pipe(gulpSSH.dest(config.remoteDir))
})

/**
 * 执行命令
 */
gulp.task('execSSH', () => {
  console.log('删除服务器上现有文件...')
  return gulpSSH.shell(config.commands, {
    filePath: 'commands.log'
  })
    .pipe(gulp.dest('logs'))
})
