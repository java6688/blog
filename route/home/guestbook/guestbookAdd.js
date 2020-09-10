const { Guestbook } = require('../../../model/guestbook')
const getTime = require('../../tools/getTime')

module.exports = async (req, res) => {
  const { content, uid } = req.body
  const time = getTime()
  await Guestbook.create({
    uid,
    content,
    time
  })
  res.redirect('/home/guestbook')
  }