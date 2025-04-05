---
title: Vue美东时间获取示例
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2020/09/03/15/55/church-5541729_960_720.jpg
---

```html
<template>
  <div>
    <div id="ddate"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    setInterval(() => {
      this.updatedate()
    }, 1000)
  },

  methods: {
    updatedate() {
      var ddate = document.getElementById('ddate')
      var dd1 = new Date()
      dd1.setMinutes(dd1.getMinutes() + dd1.getTimezoneOffset() - 240) 
      //取当地时间加上和格林威治的时差减要求地区和格林的时差分钟，
      //这里是-300，代表美国东部纽约和格林的时差
      //先设置setMinutes再取getHours才有效
      var tmin = dd1.getHours()
      if (tmin >= 0 && tmin < 6) {
        tmin = '凌晨' + tmin
      }
      if (tmin >= 6 && tmin <= 12) {
        tmin = '早上' + tmin
      }
      if (tmin > 12 && tmin <= 18) {
        tmin = '下午' + tmin
      }
      if (tmin > 18 && tmin <= 24) {
        tmin = '晚上' + tmin
      }

      ddate.innerHTML =
        '美国东部时间:' +
        dd1.getFullYear() +
        '年' +
        (dd1.getMonth() + 1) +
        '月' +
        dd1.getDate() +
        '日' +
        tmin +
        '点' +
        dd1.getMinutes() +
        '分' +
        dd1.getSeconds() +
        '秒'
    }
  }
}
</script>

<style scoped>
</style>
```
