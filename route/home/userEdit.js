// 导入用户集合
const { User } = require('../../model/user');
// 验证规则模块
const Joi = require('joi')

module.exports = async (req, res) => {
  // 1.获取用户id
  const id = req.query.id
  // 定义对象的验证规则
  const schema = {
    username: Joi.string().min(2).max(10).required().error(new Error('用户名验证没有通过，用户名长度为2-10个字符！')),
    password: Joi.string().min(6).max(16).required().error(new Error('密码验证没有通过，请输入6-16位数的密码  ！'))
  }
  // 异步函数async，验证需要通过try catch进行错误捕获
  try {
    // 实施验证
    await Joi.validate(req.body, schema)
  } catch (err) {
    // 通过url传递错误信息，然后使用req.query获取错误信息
    res.send(err.message)
    return;
  }
  // 2.将表单数据更新到数据库当中
  await User.updateOne({_id: id}, {
    username: req.body.username,
    password: req.body.password
  })
  res.send('<h1>信息修改成功</h1><a href=/home/persional?id='+ id +'>点击回到个人中心</a>')
}