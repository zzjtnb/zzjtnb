---
title: CSS 选择器优先级（特异性、权重）详解
category: 前端
tags:
  - css
cover: https://images.unsplash.com/photo-1529001858512-4cd62628bd5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

在写 CSS 的时候你一定遇到过有些样式明明写对了，也选择了正确的 html 元素去应用这些样式，可是就是不生效，这是为什么呢？因为在选择同一个 HTML 元素的时候，不同的选择器有不同的优先级，优先级低的选择器的样式会被优先级高的覆盖。

## 什么是 CSS 选择器优先级

CSS 选择器优先级，也叫特异性，是指在给 HTML 元素应用样式时，如果有多个 CSS 选择器同时指向了这个元素，那么优先级高的选择器的样式会最终应用到这个元素上。

<!-- truncate -->

## 不同选择器的权重

CSS 选择器的优先级是通过权重计算来得到的，选择器权重分为三大类，从高到低依次是：

- ID 选择器，例如: `#container`
- Class、属性和伪类选择器，例如：`.title`, `input[type="text"]`, `:hover`
- 类型和伪元素选择器，例如：`div`, `::before`

除了选择器之外，行内样式的优先级最高，也就是通过 html 中的 style 属性定义的样式。但是它的权重也可能会被`!important`覆盖，我们在后边的例子中再介绍。

## 权重的计算

在计算权重的时候，可以用一组向量标志来表示：`(0, 0, 0, 0)`，从左到右：

- 第一位是行内元素，在有行内元素的时候加 1
- 第二位是 ID 选择器的数量
- 第三位是 class、属性和伪类选择器的数量
- 第四位是类型和伪元素选择器的数量

如果计算结果权重相同，那么以定义顺序靠后的选择器优先，或者有`!important`标记优先。

> 通配符选择器(\*)，组合选择器(+, >, ~), 伪类中的:not()选择器不参与权重的计算。
>
>!important 标记常用来覆盖一些其他第三方库定义（如 bootstrap) 的行内样式，除此以外能用选择器优先级解决的就不用!important，因为它会打乱优先级顺序，引起调试困难。

## 看几个例子

比如说有一个 div，它有 id 和 class 两个属性，我们要给它设置背景色：

```html
<div id="container" class="background" />
```

那么我们从 `id` 选择器开始，给它设置一个绿色，此时它的权重：(0, 1, 0, 0)：

```css
#container {
  background-color: #2ed573;
}
```

<div class="sc-AxjAm gKsVMe">
  <div id="container" class="background">
  </div>
</div>
<style>
  .gKsVMe #container {
    height: 100px;
    background-color: rgb(46, 213, 115);
  }
</style>

如果用 class 选择器给它设置一个红色，那么它并不能生效，因为它的权重为`(0, 0, 1, 0) ：

```css
#container {
  height: 100px;
  background-color: #2ed573;
}
.background {
  background-color: #ff6b81;
}
```

<div class="sc-AxjAm bBWEnO">
  <div id="container" class="background"></div>
</div>
<style>
  .bBWEnO #container {
    height: 100px;
    background-color: rgb(46, 213, 115);
  }
</style>

我们可以通过添加一个 ID 选择器在它的前方来提高权重，此时变成了`(0, 1, 1, 0)`，高于`(0, 1, 0, 0)`：

```css
#container.background {
  background-color: #ff6b81;
}
```

<div class="sc-AxjAm lfFLcW">
  <div id="container" class="background"></div>
</div>
<style>
  .lfFLcW #container.background {
    height: 100px;
    background-color: rgb(255, 107, 129);
  }
</style>

如果这个 div 有行内样式，则以行内样式优先，此时它优先级变成了`(1, 0, 0, 0)`，有行内样式时，后边的外部样式选择器就不再计算了：

```html
<div id="container" class="background" style="background: #1e90ff" />
```

这里把 div 背景设置成了蓝色：

<div id="container" class="background" style="background: rgb(30, 144, 255); height: 100px; margin-bottom: 24px;"></div>

要覆盖行内样式，可以使用`!important`标记：

```css
#container {
  background-color: #5352ed !important;
}
```

<div class="sc-AxjAm kZPKEf">
  <div id="container" class="background" style="background: rgb(30, 144, 255); height: 100px;"></div>
</div>
<style>
  .kZPKEf #container {
    margin-bottom: 24px;
    background-color: rgb(83, 82, 237) !important;
}
</style>

再来看一个稍微复杂一点的例子，假如有这样 html 结构：

```html
<main>
  <div id="container">
    <ul class="menu">
      <li id="item1" class="item1">项目1</li>
      <li class="item2">项目2</li>
      <li class="item3">项目3</li>
    </ul>
  </div>
</main>
```

如果要修改`项目2` 的字体颜色，可以直接用 class 选择器，它的优先级标志为`(0, 0, 1, 0)`：

```css
.item2 {
  color: #ff6b81;
}
```

<div class="sc-AxjAm ckouJE">
  <main>
    <div id="container">
      <ul class="menu">
        <li id="item1" class="item1">项目 1</li>
        <li class="item2">项目 2</li>
        <li class="item3">项目 3</li>
      </ul>
    </div>
  </main>
</div>
<style>
  .menu {
    font-weight: 500;
    overflow-x: hidden;
  }
  .ckouJE .item2 {
    color: rgb(255, 107, 129);
  }
</style>

还可以添加其他不同权重的选择器到它的上边来提高优先级，为了演示效果，我把高优先级的选择器放到上边，使得顺序不成为影响优先级的因素，例如在`.item2`前加一个元素选择器`li`：

```css
li.item2 {
  color: #5352ed;
}

.item2 {
  color: #ff6b81;
}
```

现在它的颜色就会变成新定义的紫色，此时优先级标志为(0, 0, 1, 1)，最后一位大于之前的(0, 0, 1, 0)：

<div class="sc-AxjAm itgcDH">
  <main>
    <div id="container">
      <ul class="menu">
        <li id="item1" class="item1">项目 1</li>
        <li class="item2">项目 2</li>
        <li class="item3">项目 3</li>
      </ul>
    </div>
  </main>
</div>
<style>
  .menu {
    font-weight: 500;
    overflow-x: hidden;
  }
  .itgcDH li.item2 {
    color: rgb(83, 82, 237);
  }
</style>

接着如果加上一个 ID 选择器放在 CSS 定义的最上边：

```css
#container li.item2 {
  color: #ffa502;
}
// 其它低优先级选择器
```

这个选择器的优先级标志为(0, 1, 1, 1)：

<div class="sc-AxjAm duanbK">
  <main>
    <div id="container">
      <ul class="menu">
        <li id="item1" class="item1">项目 1</li>
        <li class="item2">项目 2</li>
        <li class="item3">项目 3</li>
      </ul>
    </div>
  </main>
</div>
<style>
  .menu {
    font-weight: 500;
    overflow-x: hidden;
  }
  .duanbK #container li.item2 {
    color: rgb(255, 165, 2);
  }
  .duanbK li.item2 {
    color: rgb(83, 82, 237);
  }
  .duanbK .item2 {
    color: rgb(255, 107, 129);
  }
</style>

如果再加上一个伪类选择器`:nth-child`：

```css
#container li:nth-child(2).item2 {
  color: #7bed9f;
}

// 其它低优先级选择器
```

那么优先级标志变成了(0, 1, 2, 1)：

<div class="sc-AxjAm bpEHsm">
  <main>
    <div id="container">
      <ul class="menu">
        <li id="item1" class="item1">项目 1</li>
        <li class="item2">项目 2</li>
        <li class="item3">项目 3</li>
      </ul>
    </div>
  </main>
</div>
<style>
  .menu {
    font-weight: 500;
    overflow-x: hidden;
  }
  .bpEHsm .item2 {
    color: rgb(255, 107, 129);
  }
  .bpEHsm li.item2 {
    color: rgb(83, 82, 237);
  }
  .bpEHsm #container li.item2 {
    color: rgb(255, 165, 2);
  }
  .bpEHsm #container li:nth-child(2).item2 {
    color: rgb(123, 237, 159);
  }
</style>

如果把`:nth-child(2)`去掉，再来添加一个`.menu` class 选择器，那它的优先级标志也是(0, 1, 2, 1)，那这样的话，如果这个选择器在最上边，它是不能覆盖带有`:nth-child(2)`的选择器的样式的：

```css
#container .menu li.item2 {
  color: #ff4757; /* 这里设置了一个红色 */
}

#container li:nth-child(2).item2 {
  color: #7bed9f;
}
// 其它低优先级选择器
```

结果还是上边的绿色：

<div class="sc-AxjAm hEEDTV">
  <main>
    <div id="container">
      <ul class="menu">
        <li id="item1" class="item1">项目 1</li>
        <li class="item2">项目 2</li>
        <li class="item3">项目 3</li>
      </ul>
    </div>
  </main>
</div>
<style>
  .menu {
    font-weight: 500;
    overflow-x: hidden;
  }
  .hEEDTV .item2 {
    color: rgb(255, 107, 129);
  }
  .hEEDTV li.item2 {
    color: rgb(83, 82, 237);
  }
  .hEEDTV #container li.item2 {
    color: rgb(255, 165, 2);
  }
  .hEEDTV #container .menu li.item2 {
    color: rgb(255, 71, 87);
  }
  .hEEDTV #container li:nth-child(2).item2 {
    color: rgb(123, 237, 159);
  }
</style>

如果想让它覆盖上边的绿色，有一个小技巧，可以重复写两次`.menu` class 选择器，那么它的优先级标志就变成了`(0, 1, 3, 1)`，这样就用红色覆盖掉了绿色：

```css
#container .menu.menu li.item2 {
  color: #ff4757;
}
// 其它低优先级选择器
```

<div class="sc-AxjAm eJmDZh">
  <main>
    <div id="container">
      <ul class="menu">
        <li id="item1" class="item1">项目 1</li>
        <li class="item2">项目 2</li>
        <li class="item3">项目 3</li>
      </ul>
    </div>
  </main>
</div>
<style>
  .menu {
    font-weight: 500;
    overflow-x: hidden;
  }
  .eJmDZh .item2 {
    color: rgb(255, 107, 129);
  }
  .eJmDZh li.item2 {
    color: rgb(83, 82, 237);
  }
  .eJmDZh #container li.item2 {
    color: rgb(255, 165, 2);
  }
  .eJmDZh #container .menu li.item2 {
    color: rgb(255, 71, 87);
  }
  .eJmDZh #container li:nth-child(2).item2 {
    color: rgb(123, 237, 159);
  }
</style>

## 总结

从上边的例子来看，计算 CSS 选择器优先级只需要用一个向量标志来统计不同选择器的数量就可以了，然后逐位进行比较，只要最左边的那一位大的，优先级就一定高，不用再比低位了。掌握了这个权重的计算方法之后相信你也不会再发愁为什么有些样式无法被覆盖了，赶紧用起来吧！
