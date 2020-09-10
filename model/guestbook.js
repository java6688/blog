const mongoose = require('mongoose')

// 编辑留言板集合规则
const guestbookSchema = new mongoose.Schema({
  // 评论人用户id
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 评论时间
  time: {
    type: String
  },
  // 评论内容
  content: {
    type: String
  }
})

// 创建评论集合规则
const Guestbook = mongoose.model('Guestbook', guestbookSchema)

// 将评论集合构造函数作为模块成员进行导出
module.exports = {
  Guestbook
}