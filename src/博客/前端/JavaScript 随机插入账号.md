---
title: js随机插入账号
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1514418197935-e0cac2bb695a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1350&q=80
---

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script>
    var arr = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
    var index = Math.floor((Math.random() * arr.length));
    var text = arr[index];
    var img = arr[index] + ".jpg";
    var images = "<img width='100%'  src='ewm/" + img + "'>";
  </script>
</head>

<body>
  <div>
    <script type="text/javascript">
      document.write(text);
    </script>
  </div>
  <div>
    <script type="text/javascript">
      document.write(images);
    </script>
  </div>
</body>

</html>
```
