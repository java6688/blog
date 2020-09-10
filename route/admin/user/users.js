// 导入用户集合
const { User } = require('../../../model/user');
// 引入分页模块
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  // 做标识符，用来判断当前的激活链接是哪个 locals属性在页面当中可以直接访问
  req.app.locals.active = 'user'
  const page = req.query.page
  const users = await pagination(User).find().page(page).size(10).display(3).exec()
  res.render('./admin/user', {
    users
  })
  
  // // 客户端传递给来的当前页,默认为第一页
  // let currentPage = req.query.page || 1
  // // 每一页显示的数据条数
  // let pagesize = 10
  // // 查询用户的总数
  // const sum = await User.countDocuments({})
  // // 总页数,向上取整
  // let total = Math.ceil(sum/pagesize)
  // // 页码对应的查询开始位置
  // let start = (currentPage - 1) * pagesize
  // // 在数据库中把所有用户找出来,limit：限制查询条数，skip: 跳过多少条数据再进行查询
  // const user = await User.find({}).limit(pagesize).skip(start)
  // res.render('./admin/user', {
  //   user: user,
  //   currentPage: currentPage,
  //   total: total,
  //   msg: req.session.username
  // });
}