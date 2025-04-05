---
title: 【译】如何创造带方向感应的纯 CSS 悬停效果
category: 前端
tags:
  - CSS
  - 翻译
cover: https://cdn.pixabay.com/photo/2018/03/10/09/45/businessman-3213659_1280.jpg
---

# 【译】如何创造带方向感应的纯 CSS 悬停效果

> 原文：[How to Create Direction-Aware CSS-Only Hover Effects](https://css-tricks.com/direction-aware-hover-effects/)

## 简介

很多时候，当我们使用图片集展示我们的作品集或者产品列表时，为图片添加一个悬停效果是很常见的做法，通常是在悬停时展示一个标题或者一些额外信息。而通过让悬停效果感知鼠标的方向，可以让这些效果更加生动有趣。

在这篇文章中，我将展示如何创建一个方向感知的悬停效果，完全使用CSS实现，无需JavaScript。

## 最终效果

在开始之前，让我们先看看我们将要实现的效果：

当鼠标从不同方向进入元素时，覆盖层会从对应方向滑入。

## 实现原理

实现这个效果的关键在于利用CSS的`:hover`伪类和`clip-path`属性来创建从不同方向滑入的效果。

### HTML结构

首先，我们需要创建基本的HTML结构：

```html
<div class="direction-reveal">
  <a href="#" class="direction-reveal__card">
    <img src="image.jpg" alt="图片描述" class="direction-reveal__img">
    <div class="direction-reveal__overlay">
      <h3 class="direction-reveal__title">标题文字</h3>
      <p class="direction-reveal__text">描述文字</p>
    </div>
  </a>
</div>
```

### CSS基础样式

接下来，我们添加基础CSS样式：

```css
.direction-reveal {
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 200px;
}

.direction-reveal__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.direction-reveal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgb(0 0 0 / 80%);
  color: white;
  opacity: 0;
  text-align: center;
  transition: opacity 0.3s;
}

.direction-reveal__card:hover .direction-reveal__overlay {
  opacity: 1;
}
```

### 实现方向感知

为了实现方向感知，我们需要使用CSS的`clip-path`属性，并根据不同方向定义不同的初始和终点状态：

```css
/* 从上方滑入 */
.direction-reveal__overlay--top {
  clip-path: inset(0 0 100% 0);
}

.direction-reveal__card:hover .direction-reveal__overlay--top {
  clip-path: inset(0);
}

/* 从右侧滑入 */
.direction-reveal__overlay--right {
  clip-path: inset(0 0 0 100%);
}

.direction-reveal__card:hover .direction-reveal__overlay--right {
  clip-path: inset(0);
}

/* 从下方滑入 */
.direction-reveal__overlay--bottom {
  clip-path: inset(100% 0 0 0);
}

.direction-reveal__card:hover .direction-reveal__overlay--bottom {
  clip-path: inset(0);
}

/* 从左侧滑入 */
.direction-reveal__overlay--left {
  clip-path: inset(0 100% 0 0);
}

.direction-reveal__card:hover .direction-reveal__overlay--left {
  clip-path: inset(0);
}
```

### 添加过渡效果

为了使动画更加平滑，我们需要给`clip-path`添加过渡效果：

```css
.direction-reveal__overlay {
  transition: clip-path 0.3s;
}
```

## 如何检测鼠标进入方向？

现在的关键问题是：如何检测鼠标从哪个方向进入元素？这就是这个效果的核心。

在这个纯CSS实现中，我们将使用一个巧妙的技巧：利用多个重叠的元素和CSS的`:hover`选择器来检测方向。

具体做法是创建四个不可见的区域，分别位于卡片的上、右、下、左四个边缘：

```html
<div class="direction-reveal">
  <a href="#" class="direction-reveal__card">
    <img src="image.jpg" alt="图片描述" class="direction-reveal__img">

    <!-- 方向检测区域 -->
    <div class="direction-detector direction-detector--top"></div>
    <div class="direction-detector direction-detector--right"></div>
    <div class="direction-detector direction-detector--bottom"></div>
    <div class="direction-detector direction-detector--left"></div>

    <!-- 悬停效果覆盖层 -->
    <div class="direction-reveal__overlay direction-reveal__overlay--top">
      <h3 class="direction-reveal__title">标题文字</h3>
      <p class="direction-reveal__text">描述文字</p>
    </div>
    <div class="direction-reveal__overlay direction-reveal__overlay--right">
      <h3 class="direction-reveal__title">标题文字</h3>
      <p class="direction-reveal__text">描述文字</p>
    </div>
    <div class="direction-reveal__overlay direction-reveal__overlay--bottom">
      <h3 class="direction-reveal__title">标题文字</h3>
      <p class="direction-reveal__text">描述文字</p>
    </div>
    <div class="direction-reveal__overlay direction-reveal__overlay--left">
      <h3 class="direction-reveal__title">标题文字</h3>
      <p class="direction-reveal__text">描述文字</p>
    </div>
  </a>
</div>
```

然后添加CSS让这些检测区域能够显示对应方向的覆盖层：

```css
.direction-detector {
  position: absolute;
  z-index: 1;
}

.direction-detector--top {
  top: 0;
  left: 0;
  width: 100%;
  height: 25%;
}

.direction-detector--right {
  top: 0;
  right: 0;
  width: 25%;
  height: 100%;
}

.direction-detector--bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25%;
}

.direction-detector--left {
  top: 0;
  left: 0;
  width: 25%;
  height: 100%;
}

/* 隐藏所有覆盖层 */
.direction-reveal__overlay {
  z-index: 2;
  opacity: 0;
}

/* 当检测器被悬停时显示对应方向的覆盖层 */
.direction-detector--top:hover ~ .direction-reveal__overlay--top,
.direction-detector--right:hover ~ .direction-reveal__overlay--right,
.direction-detector--bottom:hover ~ .direction-reveal__overlay--bottom,
.direction-detector--left:hover ~ .direction-reveal__overlay--left {
  clip-path: inset(0);
  opacity: 1;
}
```

## 完整代码

下面是完整的HTML和CSS代码：

```html
<div class="direction-reveal">
  <a href="#" class="direction-reveal__card">
    <img src="image.jpg" alt="图片描述" class="direction-reveal__img">

    <!-- 方向检测区域 -->
    <div class="direction-detector direction-detector--top"></div>
    <div class="direction-detector direction-detector--right"></div>
    <div class="direction-detector direction-detector--bottom"></div>
    <div class="direction-detector direction-detector--left"></div>

    <!-- 悬停效果覆盖层 -->
    <div class="direction-reveal__overlay direction-reveal__overlay--top">
      <h3 class="direction-reveal__title">标题文字</h3>
      <p class="direction-reveal__text">描述文字</p>
    </div>
    <div class="direction-reveal__overlay direction-reveal__overlay--right">
      <h3 class="direction-reveal__title">标题文字</h3>
      <p class="direction-reveal__text">描述文字</p>
    </div>
    <div class="direction-reveal__overlay direction-reveal__overlay--bottom">
      <h3 class="direction-reveal__title">标题文字</h3>
      <p class="direction-reveal__text">描述文字</p>
    </div>
    <div class="direction-reveal__overlay direction-reveal__overlay--left">
      <h3 class="direction-reveal__title">标题文字</h3>
      <p class="direction-reveal__text">描述文字</p>
    </div>
  </a>
</div>
```

```css
.direction-reveal {
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 200px;
}

.direction-reveal__card {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.direction-reveal__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.direction-detector {
  position: absolute;
  z-index: 1;
}

.direction-detector--top {
  top: 0;
  left: 0;
  width: 100%;
  height: 25%;
}

.direction-detector--right {
  top: 0;
  right: 0;
  width: 25%;
  height: 100%;
}

.direction-detector--bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25%;
}

.direction-detector--left {
  top: 0;
  left: 0;
  width: 25%;
  height: 100%;
}

.direction-reveal__overlay {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgb(0 0 0 / 80%);
  color: white;
  opacity: 0;
  text-align: center;
  transition: clip-path 0.3s, opacity 0.3s;
}

.direction-reveal__overlay--top {
  clip-path: inset(0 0 100% 0);
}

.direction-reveal__overlay--right {
  clip-path: inset(0 0 0 100%);
}

.direction-reveal__overlay--bottom {
  clip-path: inset(100% 0 0 0);
}

.direction-reveal__overlay--left {
  clip-path: inset(0 100% 0 0);
}

.direction-detector--top:hover ~ .direction-reveal__overlay--top,
.direction-detector--right:hover ~ .direction-reveal__overlay--right,
.direction-detector--bottom:hover ~ .direction-reveal__overlay--bottom,
.direction-detector--left:hover ~ .direction-reveal__overlay--left {
  clip-path: inset(0);
  opacity: 1;
}
```

## 浏览器兼容性

这个效果主要依赖于`clip-path`属性，所以兼容性主要取决于该属性。目前，大多数现代浏览器都支持`clip-path`，但IE不支持。对于需要支持旧浏览器的项目，可以考虑添加回退方案。

## 扩展

这个基本实现可以进一步扩展：

1. 可以添加更多动画效果，比如文字的淡入淡出
2. 可以调整检测区域的大小和形状
3. 可以尝试更复杂的过渡效果，如波纹或径向过渡

## 总结

通过这个纯CSS技巧，我们创建了一个方向感知的悬停效果，让用户体验更加生动有趣。这种效果特别适合作品集、产品展示或图片画廊等场景。

希望这篇文章对你有所帮助！如果你想了解更多CSS技巧，欢迎关注我的博客。
