---
title: JavaScript把空字符串转null
category: Node.js
tags:
  - Node.js
cover: https://cdn.pixabay.com/photo/2020/12/17/00/43/skyscrapers-5838029_960_720.jpg
---


JavaScript 把'' ,'  '这种空字符串转成 null

## 1.str2null.js

```js
/**
 * null => ''
 * @param {*} data 要处理的数据
 */
function null2str(data) {
  for (let x in data) {
    if (data[x] === null) { // 如果是null 把直接内容转为 ''
      data[x] = '';
    } else {
      if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
        data[x] = data[x].map(z => {
          return null2str(z);
        });
      }
      if (typeof (data[x]) === 'object') { // 是json 递归继续处理
        data[x] = null2str(data[x])
      }
    }
  }
  return data;
}

/**
 * '' => null
 * @param {*} data 要处理的数据
 */
function str2null(data) {
  let reg = /^\s+|\s+$/g
  for (let x in data) {
    if (data[x] === '' || reg.test(data[x])) { // 如果是'' 把直接内容转为 null
      data[x] = null;
    } else {
      if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
        data[x] = data[x].map(z => {
          return str2null(z);
        });
      }
      if (typeof (data[x]) === 'object') { // 是json 递归继续处理
        data[x] = str2null(data[x])
      }
    }
  }
  return data;
}
module.exports = {
  null2str, str2null,
};
```

## 2.router.js

```js
'use strict';

const router = require('express').Router()
const auth = require('../middleware/auth')
const user = require('../controller/user')
const { str2null } = require('../utils/str2null')
router.use(function (req, res, next) {
  if (req.body) req.body = str2null(req.body)
  next();
})
//登录
router.post('/user/login', user.login);
router.post('/user/register', user.register);
module.exports = router; //导出
```
