---
title: Vue的项目使用Element ui 走马灯 不能实现的问题
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2017/06/11/02/05/summer-2391348_960_720.jpg
---

1. 在 vue 项目中引入 element ui

<http://element.eleme.io/#/zh-CN/component/carousel>

引入后, HTML 部分

``` html
<el-carousel height="150px">
 <el-carousel-item v-for="item in imgList" :key="item" height="300px">
  <h3><img :src="item" alt=""> </h3>
 </el-carousel-item>
</el-carousel>
```

JS 部分

``` js
< script >
 export default {
  data() {
   return {
    imgList: [
     require('../../assets/img/images/a1.png'),
     require('../../assets/img/images/a2.png'),
     require('../../assets/img/images/a3.png'),
     require('../../assets/img/images/a4.png'),
     require('../../assets/img/images/a5.png')
    ]
   }
  },
  components: {}
  }
</script>
```

用 webpack 搭建的项目不能直接使用绝对路径, 要用 require, 如果不使用这个, 必须是线上图片.http 类型的
