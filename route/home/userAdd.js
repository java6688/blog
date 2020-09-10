// 导入用户集合
const { User } = require('../../model/user');
// 验证规则模块
const Joi = require('joi')

module.exports = async (req, res) => {
  // 定义对象的验证规则
  const schema = {
    username: Joi.string().min(2).max(10).required().error(new Error('用户名验证没有通过！')),
    password: Joi.string().min(6).max(16).required().error(new Error('密码验证不通过，密码为6位数以上！')),
    email: Joi.string().email().required().error(new Error('邮箱验证没有通过！')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色验证没有通过！')),
    state: Joi.string().valid('0', '1').required().error(new Error('状态验证没有通过！'))
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
  // 验证邮箱地址是否被占用
  let user = await User.findOne({email: req.body.email})
  if (user) {
    res.send('邮箱地址已经被占用')
  }
  // 将用户信息添加到数据库
  await User.create(req.body)
  res.send('<h1>注册成功</h1><a href="/admin/login">点击跳转到登录页面</a>')
}