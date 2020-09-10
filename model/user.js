/* 创建同户集合 */
// 引入mongoose第三方模块
const mongoose = require('mongoose');

// 创建用户集合规则
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  email: {
    type: String,
    // 保证邮箱地址在插入数据库时不重复
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // admin 超级管理员    normal 普通管理员
  role: {
    type: String,
    required: true
  },
  // 0是启用状态，1是禁用状态 
  state: {
    type: Number,
    default: 0
  }
});

// 创建集合
const User = mongoose.model('User', userSchema);

// 将用户集合作为模块成员进行导出
module.exports = {
  User
}