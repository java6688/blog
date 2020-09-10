// 引入文章集合
const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  // 根据用户id查询修改信息用户
  const id = req.query.id
  // 当用户存在时,修改洪湖信息
  if (id) {
    const article = await Article.findOne({_id: id});
    res.render('./admin/article/article-edit', {
      article: article,
      // 修改信息提交地址
      link: '/admin/article-modify?id=' + id,
      btnName: '修改'
    })
  } else {
    // 新增用户信息
    res.render('./admin/article/article-edit', {
      // 新增信息提交地址
      link: '/admin/article-add',
    })
  }
}