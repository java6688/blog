// 引入文章集合
const { Article } = require('../../model/article')
// 引入分页功能模块
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  // 记录当前页面，登录后通过session跳转到登录前页面
  req.session.url = req.url
  req.app.locals.active = '随心分享'
  const category = req.query.cate
  // 获取客户端传递过来的当前页码
  const page = req.query.page
  // 1.查找数据库文章数据
  // const articles = await Article.find().populate('author')
  const articles = await pagination(Article).page(page).size(6).display(3).find({category}).sort({_id: -1}).populate('author').exec()
  const newArticles = await Article.find().limit(6).sort({_id: -1})
  res.render('home/life', {
    articles,
    newArticles
  });
}