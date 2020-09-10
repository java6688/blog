// 导入用户集合
const { User } = require('../../../model/user');

module.exports= async (req, res) => {
  // 根据用户id查询修改信息用户
  const id = req.query.id
  // 当用户存在时,修改洪湖信息
  if (id) {
    const user = await User.findOne({_id: id});
    res.render('./admin/user-edit', {
      user: user,
      // 修改信息提交地址
      link: '/admin/user-modify?id=' + id,
      btnName: '修改'
    })
  } else {
    // 新增用户信息
    res.render('./admin/user-edit', {
      // 新增信息提交地址
      link: '/admin/user-edit',
    })
  }
}