---
title: '报错：Uncaught ReferenceError: xxx is not defined解决方案'
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2021/06/16/06/05/lotus-6340337_960_720.jpg
---

报错：`Uncaught ReferenceError: xxx is not defined`, 判断 `xxx` 的类型不等于`undefined`, 再去操作
下面以 `window` 为例

```js
if (typeof window !== 'undefined') {
  console.log('window is defined');
}
```
