// 引入分页功能模块
const pagination = require('mongoose-sex-page')
const { Article } = require('../../../model/article')

module.exports = async (req, res) => {
  req.app.locals.active = ''
  // 获取搜索关键词
  const keyword = req.query.keyword
  // replace里无法直接使用，直接后台写好传过去
  const keywordReg = new RegExp(keyword, "ig")
  // 获取客户端传递过来的当前页码
  const page = req.query.page
  // {$or:[{title: {$regex: keyword, $options:'i'}},{content: {$regex: keyword, $options:'i'}}]}
  const articles = await pagination(Article).find({title: {$regex: keyword, $options:'i'}}).sort({_id: -1}).page(page).size(6).display(3).exec()
    // res.send(articles)
    // return
  res.render('./home/search', {
    articles,
    keyword,
    keywordReg
  })
}