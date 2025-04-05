---
title: js闭包实现每次调用一个函数自动加1
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1539718110656-942f6db1bfa0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

1.首先考虑使用闭包

```JavaScript
  function getId () {
  'use strict';
  
  var i = 0;
  getId = function () {
    return i++;
  };
  return i++;
  
}


console.log(getId());
console.log(getId());
```

结果为

0

1

这段代码可以如我们期望地那样工作，也很简单，然而还有一点不完美，函数体内再次用到了 getId 这个函数名，下次我们如果要改函数名，还需要改内部的名字了。

2.使用 JavaScript 世界里的一等公民函数来创建闭包来解决试试，通过即时函数创建闭包，返回一个自增的值

```JavaScript
var getId = (function () {
  
    "use strict";


    var i = 0;
    return function () {
        return i++;
    };
    
})();


console.log(getId());
console.log(getId());

```

结果

0

1
