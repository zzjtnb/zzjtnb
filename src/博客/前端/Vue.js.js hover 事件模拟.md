---
title: vue.js hover事件模拟
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2020/04/02/19/39/seagull-4996560_960_720.jpg
---

## 一、HTML（用的 element-ui）

① 用@（v-on 的缩写）绑定事件监听器 [官方文档](官方文档)
② :class 绑定 HTML 与 class ，也就是说，show 和 hide 这两个类是否被添加是根据 showText 和 hideText 两个属性值来决定的， true 则添加，false 则不添加 [官方文档](官方文档)

```html
<div @mouseover="overShow" @mouseout="outHide"> 
  <el-menu>
    <el-submenu index="checkbatch">
      <template slot="title"><i class="el-icon-document"></i>
        <span :class="{show:showText,hide:hideText}">批次信息</span>
      </template>
       <el-menu-item>全部批次信息查看</el-menu-item>
       <el-menu-item>接受中批次信息查看</el-menu-item>
       <el-menu-item>审核中批次信息查看</el-menu-item>
       <el-menu-item>已完成批次信息查看</el-menu-item>
    </el-submenu>
  </el-menu>
 </div>
```

二、JavaScript

```JavaScript
 data () {
    return {
      showText: false,
      hideText: true
    }
  },
  methods: {
    overShow () {
      this.showText = !this.showText
      this.hideText = !this.hideText
    },
    outHide () {
      this.showText = !this.showText
      this.hideText = !this.hideText
    }
  }
```

三、CSS

```css
.show{
    display: block;
}
.hide{
    display: none;
}
```
