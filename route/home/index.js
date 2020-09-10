// 引入文章集合
const { Article } = require('../../model/article')
// 引入分页功能模块
const pagination = require('mongoose-sex-page')
// const { Comment } = require('../../model/comment')

module.exports = async (req, res) => {
  // const comments = await Comment.find().populate('aid')
  req.app.locals.active = '首页'
  // 获取客户端传递过来的当前页码
  const page = req.query.page
  // 1.查找数据库文章数据
  const articles = await pagination(Article).page(page).size(6).display(3).find().sort({_id: -1}).populate('author').exec()
  const newArticles = await Article.find().limit(6).sort({_id: -1})
  // res.send(newArticles)
  res.render('home/index', {
    articles: articles,
    newArticles: newArticles
  });
}