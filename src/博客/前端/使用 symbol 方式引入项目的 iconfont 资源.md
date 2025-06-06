---
title: 使用symbol方式引入项目的iconfont资源
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg
---

symbol 引用
这是一种全新的使用方式, 应该说这才是未来的主流, 也是平台目前推荐的用法. 相关介绍可以参考这篇文章 这种用法其实是做了一个 svg 的集合, 与上面两种相比具有如下特点:

支持多色图标了, 不再受单色限制.
通过一些技巧, 支持像字体那样, 通过 font-size, color 来调整样式.
兼容性较差, 支持 ie9+, 及现代浏览器.
浏览器渲染 svg 的性能一般, 还不如 png.
使用步骤如下:

第一步: 拷贝项目下面生成的 symbol 代码:
//xxx.xxxx.xxx.js
在自己的网页添加

``` html
<script src="http://xxx.xxxx.xxx.js"></script>
```

第二步: 加入通用 css 代码(引入一次就行):

``` html
<style type="text/css">
 .icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
 }
</style>
```

第三步: 挑选相应图标并获取类名, 应用于页面:

``` html
<svg class="icon" aria-hidden="true">
 <use xlink:href="#icon-xxx"></use>
</svg>
```
