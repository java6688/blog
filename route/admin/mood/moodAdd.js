const { Mood } = require('../../../model/mood')
const getTime = require('../../tools/getTime')

module.exports = async (req, res) => {
  var { publishDate, content } = req.body
  if(!publishDate) {
    publishDate = getTime().split(' ')[0]
  }
  await Mood.create({
    publishDate: publishDate,
    content: content
  })
  res.redirect('/admin/mood')
}