---
title: Node利用数组制作分页效果
category: Node.js
tags:
  - Node.js
cover: https://images.unsplash.com/photo-1476445704028-a36e0c798192?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

## js

```JavaScript
let arr= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
function pagination (currentPage, pageSize, array) {
  const skipNum = (currentPage - 1) * pageSize;
  return (skipNum + pageSize >= array.length) ? array.slice(skipNum, array.length) : array.slice(skipNum, skipNum + pageSize)
}
console.log(pagination(2,4,arr))
```

## ts

```ts
/**
 * 利用数组制作分页效果
 * @param {Number} currentPage 当前的页数
 * @param {Number} pageSize 一页的总数
 * @param {Array} array 待分页的数组
 * @return {Array}  newArr 分页后的数组
 */
exports.pagination = function (currentPage, pageSize, array) {
  // skipNum：跳过的数量
  const skipNum = (currentPage - 1) * pageSize;
  return (skipNum + pageSize >= array.length) ? array.slice(skipNum, array.length) : array.slice(skipNum, skipNum + pageSize)

}
// module.exports = {
//   pagination
// }
```
