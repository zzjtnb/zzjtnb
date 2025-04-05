---
title: JavaScript根据某一个相同的字段的值合并数组
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2020/12/28/18/32/mountains-5868127_960_720.jpg
---

```js
a = [{ name: 'dd', age: 18 }, { name: 'b', age: 11 }]
b = [{ name: 'dd', sex: 'M' }, { name: 'x', sex: 'L' }]


//第一种
a.map(item => {
  let flag = b.some((item1, index) => {
    if (item.name === item1.name) {
      item.sex = item1.sex
      b.splice(b.findIndex(item2 => item2.name === item1.name), 1)
      return true
    } else {
      a.push(item1)
    }
  })
  if (flag) {
    return item
  }
})
console.log(a);
//第二种优化版本
/**
 * @description 数组扁平化
 * @param {Array} args -原数组
 * @param {Array} result -目标数组
 * @returns {Array}
 */
function flattening(args, result = []) {
  for (const item of args) {
    Array.isArray(item) ? flattening(item, result) : result.push(item)
  }
  return result
}

/**
 * @description 合并数组
 * @param  {String} key  -需要对比的key值
 * @param  {...any} args  -原数组
 * @returns {Array}   合并后的数组
 */
function merge(key, ...args) {
  const _origin = flattening(args);
  const targer = []
  _origin.forEach(item => {
    const findIndex = targer.findIndex((item2) => item[key] === item2[key]);
    findIndex < 0 ? targer.push(item) : Object.assign(targer[findIndex], item);
  });
  return targer
}
console.log(merge('name', a, b));
```
