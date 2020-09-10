const { Mood } = require('../../../model/mood')
// 引入分页功能模块
const pagination = require('mongoose-sex-page')
const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  // 记录当前页面，登录后通过session跳转到登录前页面
  req.session.url = req.url
  req.app.locals.active = '每日一语'
  // const moods = await Mood.find().sort({_id: -1})
  const moods = await pagination(Mood).page(req.query.page).size(9).display(3).find().sort({_id: -1}).exec()
  const newArticles = await Article.find().limit(6).sort({_id: -1})
  res.render('./home/mood', {
    moods,
    newArticles
  })
}