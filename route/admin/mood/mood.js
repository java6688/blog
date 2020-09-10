const { Mood } = require('../../../model/mood')
// 引入分页功能模块
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  req.app.locals.active = 'mood'
  const page = req.query.page
  const moods = await pagination(Mood).page(page).size(6).display(5).find().sort({_id: -1}).exec()
  res.render('./admin/mood/mood', {
    moods
  })
}