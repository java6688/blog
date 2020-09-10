const { Guestbook } = require('../../../model/guestbook')
const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  // 记录当前页面，登录后通过session跳转到登录前页面
  req.session.url = req.url
  const guestbooks = await Guestbook.find().populate('uid').sort({_id: -1})
  req.app.locals.active = '给我留言'
  const newArticles = await Article.find().limit(6).sort({_id: -1})
  res.render('./home/guestbook', {
    guestbooks,
    newArticles
  })
}