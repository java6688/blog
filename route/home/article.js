const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')

async function article(req, res) {
  // 记录当前页面，登录后通过session跳转到登录前页面
  req.session.url = req.url
  // 1.获取客户端传递过来的文章id值
  const id = req.query.id
  // 2.根据id在数据库中查找文章
  const article = await Article.findOne({_id: id}).populate('author')
  const prePage = await Article.findOne({ '_id': { '$gt': id } }).sort({_id: 1})
  const nextPage = await Article.findOne({_id: { '$lt': id }}).sort({_id: -1})
  // 3.根据文章id查找出本条文章的评论信息
  const comments = await Comment.find({aid: id}).sort({_id: -1}).populate('uid')
  const newArticles = await Article.find().limit(6).sort({_id: -1})
  // 点击文章时，阅读量加1, 3秒内只执行一次
  setTimeout(async () => {
    await Article.updateOne({_id: id}, {
      views: article.views + 1
    })
  }, 1000*3)
  res.render('home/article', {
    article,
    comments,
    newArticles,
    prePage,
    nextPage
  });
}

module.exports = article