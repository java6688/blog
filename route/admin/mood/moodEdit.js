const { Mood } = require('../../../model/mood')

module.exports = async (req, res) => {
  const id = req.query.id
  if(!id){
    res.render('./admin/mood/mood-edit', {
      link: '/admin/moodAdd'
    })
  }else{
    const mood = await Mood.findOne({_id: id})
    res.render('./admin/mood/mood-edit', {
      link: '/admin/moodUpdate',
      mood
    })
  }
}