---
title: js里调用函数时，函数名带括号和不带括号的区别
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1539716865555-e9caa9ed1ac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

```JavaScript
function hi(){  
  var a = 1;  
  return function(){
   console.log(a++);
  };  
};         
var aaa = hi();
var bbb = hi;
```

如以上代码：
aaa 是将 hi() 的运行结果赋值给它，即 return 返回的匿名函数，此时有一个闭包，则每次调用 aaa 时都访问的同一个 a，aaa() 第一次运行结果为 1，第二次为 2
而 bbb 将是将 hi 这个函数名赋值给它，则调用 bbb() 后返回一个函数表达式，即 function(){console.log(a++)};
