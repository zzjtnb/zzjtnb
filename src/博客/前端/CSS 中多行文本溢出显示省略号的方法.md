---
title: CSS中多行文本溢出显示省略号的方法
category: 前端
tags:
  - css
cover: https://cdn.pixabay.com/photo/2020/03/04/02/32/half-moon-4900302_960_720.jpg
---

## 适用范围(重点)

因使用了 WebKit 的 CSS 扩展属性，该方法适用于 WebKit 浏览器及移动端；

## 使用方法

```css
<style>
<p class="text"></p>
    .text{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
</style>
```

## –>-webkit-line-clamp

属性值为行数，用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 WebKit 属性。

是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。
常见结合属性：

## –>display: -webkit-box

必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。

## –>-webkit-box-orient

必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
其属性值有一下几种形式，常用的为从上向下垂直排布

horizontal 在水平行中从左向右排列子元素。
vertical 从上向下垂直排列子元素。 测试
inline-axis 沿着行内轴来排列子元素（映射为 horizontal）。
block-axis 沿着块轴来排列子元素（映射为 vertical）。
inherit 应该从父元素继承 box-orient 属性的值。

此属性支持的浏览器有：
目前没有浏览器支持 box-orient 属性。
Firefox 支持替代的 -moz-box-orient 属性。
Safari、Opera 以及 Chrome 支持替代的 -webkit-box-orient 属性。
