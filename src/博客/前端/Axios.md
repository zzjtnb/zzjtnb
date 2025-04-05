---
title: axios
category: 前端
tags:
  - Axios
cover: https://cdn.pixabay.com/photo/2013/04/04/12/34/sunset-100367_960_720.jpg
---

```js
import axios from 'axios' // axios http请求库

Vue.prototype.$http = axios
/*
 这样一引用你就可以全局使用this.axios方法来调用接口。
在你需要调用接口的地方就可以使用了 使用方法如下：
axiosTest(){
  this.$http.post('http://g.cn').then(
    (successData) => { console.log(successData.data); },

    (fileData) => { console.log(fileData); })
},
 */

```
