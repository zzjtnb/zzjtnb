---
title: Vue中使用Moment.js格式化日期
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2020/03/18/14/48/clouds-4944276_960_720.jpg
---

[Moment.js 中文官网](http://momentjs.cn/)

## 一、安装

 npm install moment --save   # npm

## 二、实时时间显示代码

```html
<template>
  <div>北京时间： <span>{{ time }}</span></div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'banner',
  data() {
    return {
      time: null,
    }
  },

  methods: {
    CurrentDateTime() {
      return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  
  mounted() {
    let vm = this
    setInterval(function() {
      vm.time = vm.getCurrentDateTime()
    }, 1000)
  }
}
</script>

<style scoped>
</style>

```
