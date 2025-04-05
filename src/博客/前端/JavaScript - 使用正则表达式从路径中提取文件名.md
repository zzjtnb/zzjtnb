---
title: javascript - 使用正则表达式从路径中提取文件名
category: 前端
tags:
  - 正则
cover: https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

## 如何使用正则表达式从下面的 URL 中提取字符串“ XMLFileName”

## 可以使用 split()，pop()和 replace()

```JavaScript
var x = "C:\\Documents and Settings\\Dig\\Desktop\\XMLFileName.xml";
var filename = x.split('\\').pop().replace(/\..+$/, '');
console.log(filename)
```

[jsbin](https://jsfiddle.net/h8uK6)

## 也可以使用单个正则表达式

```JavaScript
var x = "C:\\Documents and Settings\\Dig\\Desktop\\XMLFileName.xml";
var filename = x.replace(/.*\\|\..*$/g, '');
console.log(filename) ;
```

[jsbin](http://jsfiddle.net/3xdrX)

==确保在字符串文字中也转义\。==
