// 引入文章集合
const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  const id = req.query.id
  // 根据用户id进行删除数据库中的用户
  await Article.findOneAndDelete({_id: id})
  res.redirect('/admin/article')
}