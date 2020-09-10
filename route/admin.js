/* 首页路由模块 */
const express = require('express');
const admin = express.Router();

// /login 是在app.js中app.use('/admin')后面添加的， admin/login
admin.get('/login', require('./admin/login'))

// 实现登录功能
admin.post('/login', require('./admin/loginHome'));

// 创建用户列表路由
admin.get('/user', require('./admin/user/users'))

// 创建新建/修改用户路由
admin.get('/user-edit', require('./admin/user/userEdit'))

// 获取新增用户数据
admin.post('/user-edit', require('./admin/user/joiUserEdit'))

// 修改用户信息提交路由
admin.post('/user-modify', require('./admin/user/userModify'))

// 删除用户路由
admin.get('/deleteUser', require('./admin/user/deleteUser'))

// 文章列表页面路由
admin.get('/article', require('./admin/article/articles'))

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article/articleEdit'))

// 添加文章请求路由
admin.post('/article-add', require('./admin/article/articleAdd'))

// 修改文章信息提交路由（待完善）
admin.post('/article-modify', require('./admin/article/articleModify'))

// 删除文章路由
admin.get('/deleteArticle', require('./admin/article/deleteArticle'))

// 每日一语路由
admin.get('/mood', require('./admin/mood/mood'))

// 每日一语页面渲染
admin.get('/mood-edit', require('./admin/mood/moodEdit'))

// 每日一语编辑页面路由
admin.post('/moodAdd', require('./admin/mood/moodAdd'))

// 每日一语更新
admin.post('/moodUpdate', require('./admin/mood/moodUpdate'))

// 每日一语编删除
admin.post('/moodDel', require('./admin/mood/moodDelete'))


// 退出登录路由
admin.get('/logout', require('./admin/logout'))

module.exports = admin;