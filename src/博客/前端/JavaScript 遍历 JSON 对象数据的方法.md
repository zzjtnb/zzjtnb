---
title: JavaScript遍历JSON对象数据的方法
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2020/04/24/18/28/blue-bell-5088073_960_720.jpg
---

JSON 中, 有两种结构: 对象和数组, 对象是没有 length 这个属性, 而数组结构是有的, 下面分别说下这两种结构之间的区别和遍历方式.

## 对象

一个对象以 "{" 开始, "}"结束. 每个 "key" 后跟一 ":", "'key/value' 对" 之间运用 ", "分隔.

packJson = {"name":"phpernote", "password":"111"}

原生 Js 遍历 json 对象的方法

```js
myJson = {
  "name": "phpernote",
  "password": "1111"
};
for (var val in myJson) {
  alert(val + " " + myJson[val]); //输出如:name
}
```

## 数组

packJson = [{"name":"phpernote", "password":"111"}, {"name":"tony", "password":"111"}];

数组是值的有序集合. 一个数组以 "[" 开始, "]"结束. 值之间运用 ", "分隔.

原生 Js 遍历 json 数组的方法

无规律 json 数组:

var json = [{dd: 'SB', AA: '东东', re1: 123}, {cccc: 'dd', lk: '1qw'}];

```js
for (var i = 0, l = json.length; i < l; i++) {
  for (var key in json[i]) {
    alert(key + ':' + json[i][key]);
  }
}
```

有规律 json 数组:

```js
packJson = [{
  "name": "nikita",
  "password": "1111"
}, {
  "name": "tony",
  "password": "2222"
}];
for (var p in packJson) { //遍历json数组时，这么写p为索引，0,1
  alert(packJson[p].name + " " + packJson[p].password);
}
```

也可以这样:

```js
for (var i = 0; i < packJson.length; i++) {
  alert(packJson[i].name + " " + packJson[i].password);
}
```
