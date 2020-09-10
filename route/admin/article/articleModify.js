// 导入用户集合
const { Article } = require('../../../model/article');
const formidable = require('formidable')
const getTime = require('../../tools/getTime')
const path = require('path')

module.exports = async (req, res) => {
  // 1.创建表单解析对象
  const form = new formidable.IncomingForm()
  // 2.配置上传文件的存放位置
  form.uploadDir = path.join(__dirname, '../', '../', '../', 'public', 'upload')
  // 3.保留上传文件的后缀
  form.keepExtensions = true
  
  form.parse(req, async (err, fields, files) => {
    // 保存表单数据到数据库
    // 获取需要修改信息的文章id
    const id  = req.query.id
    // 获取当前文章的详细时间点
    const article = await Article.findOne({_id: id})
    var detailTime = article.publicDate.split(' ')[1]
    const publicDate = fields.publicDate + ' ' + detailTime
    if (files.cover.size === 0) {
      await Article.updateOne({_id: id}, {
        title: fields.title,
        content: fields.content,
        category: fields.category,
        views: fields.views,
        comments: fields.comments,
        publicDate
      })
    } else {
      // 更新数据库中的用户信息, 返回promise，需要用await修饰
      await Article.updateOne({_id: id}, {
        title: fields.title,
        content: fields.content,
        category: fields.category,
        views: fields.views,
        comments: fields.comments,
        cover: files.cover.path.split('public')[1],
        publicDate
      })
    }
  })
  
  // 更新完数据后跳转到用户列表页面
  res.redirect('/admin/article')
}
