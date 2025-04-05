---
title: 解决js new Date()的浏览器兼容性问题，IE、safari的new Date()的值为Invalid Date、NaN-NaN的问题
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1503862242163-608ef852091d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1324&q=80
---


当我们需要将一串日期字符串转换为具体的 Date 格式的时候，往往需要用到 new Date("xxxx") 方法。

当时在 IE、safari 浏览器下，会遇到这种问题：  

``` bash
new Date('2016-01-01 00:00:00')    //却返回这个值Invalid Date，转换失败

```

但在 chrome、FF 返回的正确的结果，所以不同的浏览器还是存在差异的，以下列出了所有浏览器都支持的方式。

``` bash
1 var d = new Date(2011, 01, 07); // yyyy, mm-1, dd  
2 var d = new Date(2011, 01, 07, 11, 05, 00); // yyyy, mm-1, dd, hh, mm, ss  
3 var d = new Date("02/07/2011"); // "mm/dd/yyyy"  
4 var d = new Date("02/07/2011 11:05:00"); // "mm/dd/yyyy hh:mm:ss"  
5 var d = new Date(1297076700000); // milliseconds  
6 var d = new Date("Mon Feb 07 2011 11:05:00 GMT"); // ""Day Mon dd yyyy hh:mm:ss GMT/UTC
```

例如从服务器取回的数据是：

``` bash
dateStr = "02-07-2011 11:05:00"

```

解决办法：可将  - 替换为 /  , 斜杠通用于所有斜杠  

``` bash
dateStr = dateStr .replace(/-/g,"/");
let date = new Date(dateStr );
```
