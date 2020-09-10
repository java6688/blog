const loginGuard = (req, res, next) => {
  // 判断用户访问的是否是登录页面
  // 如果用户不是登录状态，重定向到登录页面
  if (req.url != '/login' && !req.session.username) {
    res.redirect('/admin/login')
  } else {
    // if (req.session.role == 'normal') {
    //   // 是管理员， 跳转到后台管理页面
    //   return res.redirect('/home')
    // }
    // 用户是登录状态，请求放行
    next()
  }
}
module.exports = loginGuard