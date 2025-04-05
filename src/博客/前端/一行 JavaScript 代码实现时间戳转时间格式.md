---
title: 一行js代码实现时间戳转时间格式
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1517362302400-873b4e30f5c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80
---

## 美东时间

```JavaScript
function time(time = +new Date()) {
    var date = new Date(time - 4 * 3600 * 1000);
    return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.');
}
time(); 
```

Date 的‘toJSON’方法返回格林威治时间的 JSON 格式字符串，实际是使用‘toISOString’方法的结果。字符串形如‘2018-08-09T10:20:54.396Z’，转化为北京时间需要额外增加八个时区，我们需要取字符串前 19 位，然后把‘T’替换为空格，即是我们需要的时间格式。

把时间格式中的‘-’修改为‘.’或者其他符号都是可以的。对比老方法，这种方法代码量比以前省了不止一星半点的，读起来也简洁多了。如果时间格式需要毫秒数，只需要获取前 23 位字符串，和上面一样用 replace 方法替换。

## 北京时间

```JavaScript
function time(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000);
    return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.');
}
time(); 
```
