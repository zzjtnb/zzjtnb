---
title: VUE防抖与节流的最佳解决方案——函数式组件
category: 前端
tags:
  - Vue
cover: https://images.unsplash.com/photo-1445112098124-3e76dd67983c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80
---

## 函数防抖（debounce）

>解释：当持续触发某事件时，一定时间间隔内没有再触发事件时，事件处理函数才会执行一次，如果设定的时间间隔到来之前，又一次触发了事件，就重新开始延时。
案例：持续触发 scroll 事件时，并不立即执行 handle 函数，当 1000 毫秒内没有触发 scroll 事件时，才会延时触发一次 handle 函数。

```JavaScript
 * @param {Function} fn   需要执行的函数
 * @param {Number} wait   需要触发的时间
 */
function debounce(fn, wait) {
  let timeout = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}
function handle() {
  console.log(Math.random())
}
window.addEventListener('scroll', debounce(handle, 1000))
```

## addEventListener 的第二个参数实际上是 debounce 函数里 return 回的方法，let timeout = null 这行代码只在 addEventListener 的时候执行了一次 触发事件的时候不会执行，那么每次触发 scroll 事件的时候都会清除上次的延时器同时记录一个新的延时器，当 scroll 事件停止触发后最后一次记录的延时器不会被清除可以延时执行，这是 debounce 函数的原理

**

## 函数节流（throttle）
>
>解释：当持续触发事件时，有规律的每隔一个时间间隔执行一次事件处理函数。
案例：持续触发 scroll 事件时，并不立即执行 handle 函数，每隔 1000 毫秒才会执行一次 handle 函数。

```JavaScript
/**
 * @param {Function} fn   需要执行的函数
 * @param {Number} delay   需要每隔多长时间执行
 */
function throttle(fn, delay) {
  var prev = Date.now()
  return function () {
    var now = Date.now()
    if (now - prev > delay) {
      fn()
      prev = Date.now()
    }
  }
}
function handle() {
  console.log(Math.random())
}
window.addEventListener('scroll', throttle(handle, 1000))
```

**原理和防抖类似，每次执行 fn 函数都会更新 prev 用来记录本次执行的时间，下一次事件触发时判断时间间隔是否到达预先的设定，重复上述操作。**
防抖和节流都可以用于 mousemove、scroll、resize、input 等事件，他们的区别在于防抖只会在连续的事件周期结束时执行一次，而节流会在事件周期内按间隔时间有规律的执行多次。

## 在 vue 中的实践

在 vue 中实现防抖无非下面这两种方法

- 封装 utils 工具
- 封装组件

## 封装 utils 工具

把上面的案例改造一下就能封装一个简单的 utils 工具
~~utils.js~~

```JavaScript
let timeout = null
function debounce(fn, wait) {
  if(timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}
export default debounce
```

~~app.js~~

```JavaScript
<input type="text" @input="debounceInput($event)">

import debounce from './utils'
export default {
  methods: {
    debounceInput(E){
      debounce(() => {
        console.log(E.target.value)
      }, 1000)
    }
  }
}
```
