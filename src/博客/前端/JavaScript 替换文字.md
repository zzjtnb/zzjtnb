---
title: js替换文字
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1586244439413-bc2288941dda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

```html
<!DOCTYPE html>
<html ">
<head>
  <meta charset=" UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>js替换文字</title>
<script>
  let titleArr = {
    'name': '张三',
    'age': '18',
  }
  var domain = window.location.host;
  var num = domain.indexOf(".");
  var str = domain.slice(0, num);
  var logo = "<img width='100%'  src='static/picture/" + str + "png'>";
  var names = titleArr[str];
// var div = document.getElementById('test');
// div.innerHTML = div.innerHTML.replace(/XXX/g, name).replace(/google.com/g, domain).replace(/logo.png/, str + '.png');
// div.style.display = 'block';
</script>
</head>

<body>
  <script>document.write(this.names);</script>
  <script>document.write(this.logo);</script>
</body>

</html>
```
