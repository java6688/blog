// 引入文章集合
const { Article } = require('../../../model/article')
// 引入分页模块
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  // 做标识符，用来判断当前的激活链接是哪个 locals属性在页面当中可以直接访问
  req.app.locals.active = 'article'
  // 获取客户端传递过来的当前页
  const page = req.query.page
  /*
      mongoose-sex-page用法
      pagination(需要查询的集合对象)
      page(指定当前页)
      zize(指定每页显示的数据条数)
      display(指定客户端要显示的页码数量)  最少设置为3才可以继续显示下面的页码
      exec():向数据库中发送请求
  */
  // 查询所有文章数据，传递到网页模板当中渲染
  const articles = await pagination(Article).find().sort({_id: -1}).page(page).size(10).display(3).populate('author').exec()
  // res.send(articles)
  res.render('./admin/article/article', {
    articles: articles
  });
}