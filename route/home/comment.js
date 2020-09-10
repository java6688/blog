const { Comment } = require('../../model/comment')
const { Article } = require('../../model/article')
const getTime = require('../tools/getTime')

module.exports = async (req, res) => {
  // 获取客户端传递过来的数据
  const { aid, uid, content } = req.body
  const time = getTime()
  // 将数据保存到数据库
  await Comment.create({
    content: content,
    aid: aid,
    uid: uid,
    time
  })
  // 更新当前文章评论数量
  const article = await Article.findOne({_id: aid})
  await Article.updateOne({_id: aid}, {
    comments: article.comments + 1
  })
  // 提交后，将页面重定向到文章详情页面
  res.redirect('/home/article?id=' + aid)
}