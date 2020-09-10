<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <title>Blog - Content Manager</title>
  <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/base.css">
  <!-- 这里是为不是共用的css模块预留的位置 -->
  {{block 'link'}} {{/block}}
</head>
<body>
  <!-- block相当于占位符，可以通过{{extend './common/layout.art'}}继承当前骨架,
   在继承的模板当中可以通过，{{block 'main'}} 这里包裹需要放到block占位的内容 {{/block}} 使用
  -->
  {{block 'main'}} {{/block}}
  <script src="lib/jquery/dist/jquery.min.js"></script>
  <script src="lib/bootstrap/js/bootstrap.min.js"></script>
  <!-- 这里是为不是共用的js模块预留的位置 -->
  {{block 'script'}} {{/block}}
</body>

</html>