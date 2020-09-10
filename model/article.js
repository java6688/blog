const mongoose = require('mongoose')

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 20,
    required: [true, '请填写文章标题']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    // 将文章与用户集合关联
    ref: 'User',
    required: [true, '请传递作者']
  },
  publicDate: {
    type: String
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  },
  category: {
    type: String
  },
  // 文章阅读量
  views: {
    type: Number,
    default: 0
  },
  // 评论数量
  comments: {
    type: Number,
    default: 0
  }
})

// 根据规则创建集合
const Article = mongoose.model('Article', articleSchema)

// 将集合规则作为模块成员进行导出
module.exports = {
  Article
}