---
title: 获取数组对象中某个key的最大值和最小值
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2021/10/23/09/24/ink-6734478_960_720.jpg
---

```js
/**
 * 获取数组对象中某个key的最大值
 * @param {Array} array
 * @param {String} key
 * @returns {Number} 返回最大值
 */
const getMax = (array, key) => {
  return Math.max.apply(
    Math,
    array.map((item) => item[key]),
  );
};
/**
 * 获取数组对象中某个key的最小值
 * @param {Array} array
 * @param {String} key
 * @returns {Number} 返回最小值
 */
const getMin = (array, key) => {
  return Math.min.apply(
    Math,
    array.map((item) => item[key]),
  );
};
let arr = [
  {a: 1, b: 2},
  {a: 3, b: 4},
  {a: 5, b: 6},
];
console.log(getMax(arr, 'a')); //5
console.log(getMin(arr, 'a')); //1

```
