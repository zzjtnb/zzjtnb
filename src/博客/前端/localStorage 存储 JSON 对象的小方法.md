---
title: localStorage存储JSON对象的小方法
category: 前端
tags:
  - localStorage
cover: https://cdn.pixabay.com/photo/2020/04/30/05/13/sunrise-5111409_960_720.jpg
---

有时候, 我们需要将数据存储到 sessionStorage 和 localStorage 中, 这样做的好处有:

1 缓存数据

2 减少对内存的占用

但是, storage 只能存储字符串的数据, 对于 JS 中常用的数组或对象却不能直接存储.

``` js
var obj = {
  name: 'Jim'
};
sessionStorage.obj = obj;
localStorage.obj = obj;
var arr = [1, 2, 3];
sessionStorage.obj = arr;
localStorage.obj = arr;
```

上面的写法都是不能成功的! 但我们可以通过 JSON 对象提供的 parse 和 stringify 将其他数据类型转化成字符串, 再存储到 storage 中就可以了. 请看下面的代码.

``` js
var obj = {
  name: 'Jim'
};
var str = JSON.stringify(obj);
//存入 
sessionStorage.obj = str;
//读取 
str = sessionStorage.obj;
//重新转换为对象 
obj = JSON.parse(str);
```

localStorage 也一样, 只是和 sessionStorage 的存储时间不一样.

需要注意的是, JS 中的数组本质上也是对象类型, 所以上面的代码对数组也是适用的.

利用 localStorage 可以简单的存储一些 JSON 对象, 可以方便简易应用的数据存储.

　　简单介绍下 localStorage, localStorage 是 html5 提供的一种本地存储的方法, 可以把数据存储在本地[浏览器](http://www.it165.net/edu/ewl/), 下次打开后仍然可以获取到存储的数据, 如果在存储的数据 量小的时候可以起到代替数据库的功能, 比 cookies 更有优越性.

``` js
localStorage.setItem("key", "value"); //存储变量名为key，值为value的变量
localStorage.key = "value" //存储变量名为key，值为value的变量
localStorage.getItem("key"); //获取存储的变量key的值www.it165.net
localStorage.key; //获取存储的变量key的值
localStorage.removeItem("key") //删除变量名为key的存储变量
```

以上即为 localStorage 调用的方法. 下面介绍存储 JSON 对象的方法.

上面即可保存 JSON 对象, 接下来我们在要使用的时候再将存储好的 students 变量取回

``` JS
var students = localStorage.getItem("students"); // 取回 students 变量
students = JSON.parse(students); // 把字符串转换成 JSON 对象
```

以上即可得到存储的 students 的 JSON 对象了
