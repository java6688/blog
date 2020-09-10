/* 首页路由模块 */
const express = require('express');
const home = express.Router();

// 首页路由
home.get('/', require('./home/index'))

// 文章详情页路由
home.get('/article', require('./home/article'))

// 提交评论路由
home.post('/comment', require('./home/comment'))

// 生活随笔路由
home.get('/life', require('./home/life'))

// 个人中心路由
home.get('/persional', require('./home/persional'))

// 用户注册路由
home.get('/register', require('./home/register'))

// 添加用户路由
home.post('/user-add', require('./home/userAdd'))

// 修改用户信息路由
home.post('/user-edit', require('./home/userEdit'))

// 技术分享路由
home.get('/technology', require('./home/technology'))

// 每日一语路由
home.get('/mood', require('./home/mood/mood'))

// 留言板路由
home.get('/guestbook', require('./home/guestbook/guestbook'))

// 添加留言路由
home.post('/guestbookAdd', require('./home/guestbook/guestbookAdd'))

// 搜索引擎路由
home.get('/search', require('./home/search/search'))

// 退出登录路由
home.get('/logout', require('./home/logout'))

module.exports = home;