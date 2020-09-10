
const express = require('express');
const path = require('path');
const home = require('./route/home');
const admin = require('./route/admin');
const session = require('express-session')
// art模板渲染模块
const expressArtTemplate = require('express-art-template');
// 引入body-parser 模块，用来处理post请求参数
const bodyParser = require('body-parser');
// 引入登录拦截中间件
const loginGuard = require('./middleGuard/loginGuard')
// 引入时间格式模块
const dateformat = require('dateformat')
// 引入art-template模板引擎，添加时间格式方法
const template = require('art-template')
// 开发环境下把请求等相关信息打印到控制台
const morgan = require('morgan')
// 引入配置信息模块
const config = require('config')

// 创建网站服务器
const app = express();

const cors = require('cors')
app.use(cors());

// 数据库连接
require('./model/connect');

// saveUninitialized: 退出登录是否保存初始cookie
app.use(session({
  secret: 'secret key',
  saveUninitialized: false,
  cookie: {
    // 把一天转换成毫秒
    maxAge: 24*60*60*1000
  }
}))

/* 使用res.render()时所需要的配置开始 */
// 配置网页模板所在位置, 第一个参数views是express固定的
app.set('views', path.join(__dirname, 'views'));
// 配置express框架模板默认后缀名
app.set('view engine', 'html');
// 当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('html', expressArtTemplate);
/* 使用res.render()时所需要的配置结束 */

// 向模板引擎中添加时间格式方法
template.defaults.imports.dateformat = dateformat

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));
// 处理post请求参数
app.use(bodyParser.urlencoded({extended: false}));

// 获取系统环境变量, 放在路由下面测试morgan模块没有反应
console.log('----------------------------------------------------------')
if (process.env.NODE_ENV == 'development') {
  // 当前为开发环境
  console.log('当前为开发环境')
  app.use(morgan('dev'))
} else {
  // 当前为生产环境
  console.log('当前为生产环境')
}
console.log('----------------------------------------------------------')

// 获取config文件夹下面的json里面的title属性值
console.log(config.get('title'))

// 拦截请求，判断用户登录状态
app.use('/admin', loginGuard)

// 前台路由挂载
app.use('/', home);
app.use('/home', home);
// 配置以 /admin 开头的路由地址
app.use('/admin', admin);

app.listen(80);