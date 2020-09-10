// 导入用户集合
const { User } = require('../../../model/user');

module.exports = async (req, res) => {
  /* 提交后对密码进行对比 */
  // 获取用户表单数据
  const {username, email, password, role, state} = req.body
  // 获取提交的用户id
  const id  = req.query.id
  // 在数据库中查找用户信息
  const user = await User.findOne({_id: id})
  if (password === user.password) {
    // 更新数据库中的用户信息, 返回promise，需要用await修饰
    await User.updateOne({_id: id}, {
      username: username,
      email: email,
      password: password,
      role: role,
      state: state
    })
    // 更新完数据后跳转到用户列表页面
    res.redirect('/admin/user')
  } else {
    // 验证密码失败
    res.send('验证密码失败')
  }
}