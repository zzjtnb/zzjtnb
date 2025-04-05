---
title: js小数点截取四舍五入和不四舍五入
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2020/07/21/16/24/landscape-5426755_960_720.jpg
---

```js
/**
 * 解决精度缺失问题(四舍五入)
 * @param {*} num 需要截取的数字
 * @param {*} pos 需要截取小数点后面的位数
 * @returns
 */
function fix_jingdu(num, pos = 10) {
  if (!num) return 0;
  // Math.pow(x,y) x 的 y 次幂
  let m = Math.pow(10, pos);
  // round() 方法可把一个数字舍入为最接近的整数。
  return Math.round(num * m, 10) / m;
}
console.log(fix_jingdu(2.06665, 3)); //2.067

/**
 * 解决精度缺失问题(不四舍五入)
 * @param {*} num 需要截取的数字
 * @param {*} decimal 需要截取小数点后面的位数
 * @returns
 */
function retain(num, decimal) {
  num = num.toString();
  let index = num.indexOf('.');
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1);
  } else {
    num = num.substring(0);
  }
  return parseFloat(num);
}

console.log(retain(2.06665, 3)); //2.066
```
