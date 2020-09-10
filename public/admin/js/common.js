// 获取用户表单数据
function serializeToJson(form) {
  // 用来保存遍历出来的用户数据
  var userObj = {}
  var users = form.serializeArray();
  $.each(users, (i, item) => {
    userObj[item.name] = item.value;
  })
  return userObj;
}