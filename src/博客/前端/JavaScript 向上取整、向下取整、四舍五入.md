---
title: js 向上取整、向下取整、四舍五入
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1539689816072-86231273b4d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1350&q=80
---

```JavaScript
// 1.只保留整数部分（丢弃小数部分）
parseInt(5.1234);// 5
// 2.向下取整（<= 该数值的最大整数）和parseInt()一样
Math.floor(5.1234);// 5    
// 3.向上取整（有小数，整数就+1）
Math.ceil(5.1234);

// 4.四舍五入（小数部分）
Math.round(5.1234);// 5
Math.round(5.6789);// 6
// 5.绝对值
Math.abs(-1);// 1
// 6.返回两者中的较大值
Math.max(1,2);// 2
// 7.返回两者中的较小值
Math.min(1,2);// 1
// 随机数（0-1）
Math.random();

```

关于 Math.floor() 与 parseInt()

它们两个都是只保留整数部分，但是在转换时可能会出现不精确的情况：

临界点：

　　当有 16 位小数，且最后一位小数为 5 时，取的值是该数值的最大整数；

　　Math.floor(5.9999999999999995);// 5

　　当有 16 位小数，且最后一位小数为 6 时，取的值是该数值的最大整数 + 1。

　　Math.floor(5.9999999999999996);// 6
