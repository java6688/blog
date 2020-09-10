// 导入用户集合
const { User } = require('../../model/user');

module.exports = async (req, res) => {
  
  req.app.locals.active = '个人中心'
  if(!req.session.username) {
    res.redirect('/admin/login')
    return
  }
  // 1.根据id获取当前用户的信息
  const id = req.query.id
  // res.send(id)
  const user = await User.findOne({_id: id})
  // res.send(user)
  // 2.将用户信息发送到网页模板进行渲染
  res.render('home/persional', {
    user
  });
}