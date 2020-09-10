// 导入用户集合
const { User } = require('../../model/user');

module.exports = async (req, res) => {
  // 在app.js里面配置好body-parser后，req会多一个body属性接收请求参数
  // res.send(req.body);
  const { email, password } = req.body;
  if (req.body.email.trim().length === 0 || req.body.password.trim().length === 0) {
   return res.status(404).render('admin/error', {msg: '邮箱地址或者密码错误'})
  }
  // 如果查询到了用户变量，则其值为对象类型
  // 如果没查询到，user变量为空
  let user = await User.findOne({ email });
  if (user && user.state !== 1) {
    // 将用户输入的邮箱地址和数据库中的对比
    if (password === user.password) {
      //登录成功，将用户名存储到请求对象当中
      req.session.username = user.username
      req.session.role = user.role
      // 把用户信息存到app.locals对象下面，然后在header.art文件里面使用{{userInfo.username}},获取用户名称
      req.app.locals.userInfo = user
      // 判断用户是否是管理员
      if (user.role == 'admin'){
        // 是管理员，跳转到后台管理页面
        res.redirect('/admin/user')
      } else {
        // 不是管理员，跳转到博客首页
        req.session.url ? res.redirect(req.session.url) :res.redirect('/home')
      }
    } else {
      res.status(404).send('邮箱或密码不正确!');
    }
  } else {
    res.status(404).send('邮箱或密码不正确!');
  }
}