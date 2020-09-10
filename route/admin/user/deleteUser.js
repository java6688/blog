// 导入用户集合
const { User } = require('../../../model/user');
const { Comment } = require('../../../model/comment')
const { Guestbook } = require('../../../model/guestbook')
const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
 
  const id = req.query.id

  await Guestbook.deleteMany({uid: id})
  await Comment.deleteMany({uid: id})
  
  // 根据用户id进行删除数据库中的用户
  await User.findOneAndDelete({_id: id})
  res.redirect('/admin/user')
}