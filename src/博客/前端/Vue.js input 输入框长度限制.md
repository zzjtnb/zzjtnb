---
title: vue input输入框长度限制
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2020/04/12/07/15/trees-5033072_960_720.jpg
---

今天在开发登录页时, 需要设置登录输入框的长度, 输入类型为 number

``` HTML
<!--发现在这样写时，输入长度限制并没有生效，经过测试发现在type为number或者text时，设置maxlength参数并不会生效。 -->
<input type="number" maxlength="11" placeholder="请输入手机号"> 
<!--下面这种方法可以-->
<input type="number" oninput="if(value.length > 11)value = value.slice(0, 11)" placeholder="请输入手机号">
```
