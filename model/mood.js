const mongoose = require('mongoose')

// 创建文章集合规则
const moodSchema = new mongoose.Schema({
  publishDate: {
    type: String
  },
  content: {
    type: String
  }
})

// 根据规则创建集合
const Mood = mongoose.model('Mood', moodSchema)

// 将集合规则作为模块成员进行导出
module.exports = {
  Mood
}