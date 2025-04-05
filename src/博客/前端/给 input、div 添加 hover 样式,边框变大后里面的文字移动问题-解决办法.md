---
title: 给input、div添加hover样式,边框变大后里面的文字移动问题-解决办法
category: 前端
tags:
  - css
cover: https://cdn.pixabay.com/photo/2021/05/01/09/59/city-6220689_960_720.jpg
---

关于给 input、div 添加 hover 样式，边框变大后里面的文字移动问题-解决办法

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>给input、div添加hover样式,边框变大后里面的文字移动问题-解决办法</title>
  <style>
    div {
      width: 200px;
      height: 30px;
    }

    input {
      width: 200px;
      height: 30px;
      border: 1px solid #ccc;
      font-size: 12px;
      line-height: 24px;
    }

    input:hover {
      border: 2px solid #d9d9d9;
    }
  </style>
</head>

<body>
  <div>
    <input type="text" placeholder="Hover移动">
  </div>
</body>

</html>
```

这样写，鼠标移上去后`input`里的文字就会移动

解决办法，给要增大边框先预留一个空间，可以`input`添加一个`padding：1px`;  然后鼠标以上去在设置为 0，`input:hover{padding:0px}`;

```html
<style>
  div {
    width: 200px;
    height: 30px;
  }

  input {
    width: 200px;
    height: 30px;
    border: 1px solid #ccc;
    font-size: 12px;
    line-height: 24px;
    padding: 1px;/*新增*/
  }

  input:hover {
    border: 2px solid #d9d9d9;
    padding: 0;/*新增*/
  }
</style>
<div>
  <input type="text" placeholder="Hover正常">
</div>
```

<style>.div1,.div2{width:200px;height:30px;display:inline-block}.div1 input{width:200px;height:30px;border:1px solid#ccc;font-size:12px;line-height:24px}.div1 input:hover{border:2px solid#d9d9d9}.div2{margin-left:10%}.div2 input{width:200px;height:30px;border:1px solid#ccc;font-size:12px;line-height:24px;padding:1px}.div2 input:hover{border:2px solid#d9d9d9;padding:0}</style><div class="div1">BUG:<input type="text"placeholder="BUG 再现"></div><div class="div2">正常:<input type="text"placeholder="正常"></div>
