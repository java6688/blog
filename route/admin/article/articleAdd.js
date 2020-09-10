// 引入具有上传文件表单处理功能的第三方模块
const formidable = require('formidable')
const path = require('path')
const getTime = require('../../tools/getTime')
// 引入文章集合
const { Article } = require('../../../model/article')

module.exports = (req, res) => {
  // 定义发布文章时间
  var publicDate = ''
  const detailTime = getTime().split(' ')[1]
  // 1.创建表单解析对象
  const form = new formidable.IncomingForm()
  // 2.配置上传文件的存放位置
  form.uploadDir = path.join(__dirname, '../', '../', '../', 'public', 'upload')
  // 3.保留上传文件的后缀
  form.keepExtensions = true
  // 4.解析表单
  form.parse(req, async (err, fields, files) => {
    // fileds 对象类型，保存普通表单数据
    // files 对象类型， 保存了和上传文件相关的数据
    // 保存表单数据到数据库
    if (!fields.publicDate) {
      publicDate = getTime()
    } else {
      publicDate = fields.publicDate + ' ' + detailTime
    }
    await Article.create({
      title: fields.title,
      author: fields.author,
      cover: files.cover.path.split('public')[1],
      content: fields.content,
      category: fields.category,
      views: fields.views,
      comments: fields.comments,
      publicDate
    })
    // 将页面重定向到文章列表页面
    res.redirect('/admin/article')
  })
}