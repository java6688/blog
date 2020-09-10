const { Mood } = require('../../../model/mood')

module.exports = async (req, res) => {
  await Mood.findOneAndDelete({_id: req.body.id})
  res.redirect('/admin/mood')
}