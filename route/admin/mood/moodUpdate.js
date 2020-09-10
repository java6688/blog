const { Mood } = require('../../../model/mood')
const getTime = require('../../tools/getTime')

module.exports = async (req, res) => {
  var { publishDate, content , id} = req.body
  await Mood.update({_id: id}, {
    publishDate,
    content
  })
  res.redirect('/admin/mood')
}