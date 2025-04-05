---
title: CSS Flexbox 布局教程 2020 最新版
category: 前端
tags:
  - css
cover: https://images.unsplash.com/photo-1518727818782-ed5341dbd476?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

在 CSS flexbox 布局出现以前，如果要控制 HTML 元素的布局，要用到很多种奇葩的方式。在水平方向上得用`float`控制左右对齐，稍一不注意，就会有浮动的元素飞来飞去~。在垂直方向上就更是百家争鸣了：要么手动计算高度然后算出中心点，要么用 `line-height` 和 `height` 的结合，要么用十之八九不生效的 `vertical-align` 属性等等等等。自从 flex-box 出现以后，一切似乎就豁然开朗了，水平垂直各种花式对齐，空间分配由你做主。当然，要用好它，用对它也不是一件容易的事，今天就给你说说 flex-box 布局，看完之后你也能熟练的运用它！（博客中的示例都是真实的 HTML 代码，可以使用 chrome 开发者工具查看属性。(此文为了演示某些 flex 示例，在小屏幕下会有横向滚动条)

## 开启 Flexbox 布局

假设有下边这么一个 html 结构：

```html
<div class="flex">
  <div class="flex1">Flex 1</div>
  <div class="flex2">Flex 2</div>
  <div class="flex3">Flex 3</div>
</div>
```

一个`div` 容器包含了三个 `div` 子元素，按照默认的布局方式进行排列。因为 `div` 是块级元素，每个 `div` 占了整个一行的空间：

<div class="sc-AxirZ ktnnZL">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
.ktnnZL .flex {
    height: 100px;
}
.ktnnZL .flex > * {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
}
.ktnnZL .flex2 {
    background: rgb(91, 215, 234);
}
.ktnnZL .flex3 {
    background: rgb(247, 220, 124);
}
</style>

如果要开启容器的 flex 布局，只需要在 css 里边给 `.flex` 设置 `display: flex` 属性，同时为了演示效果，我给它加上了 100px 的高度：

```css
display: flex;
height: 100px;
```

<div class="sc-AxirZ bYuEFX">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>

<style>
.bYuEFX .flex {
    height: 100px;
    display: flex;
}
.bYuEFX .flex > * {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
}
.bYuEFX .flex2 {
    background: rgb(91, 215, 234);
}
.bYuEFX .flex3 {
    background: rgb(247, 220, 124);
}
</style>

可以看到里边的三个元素自动变成了一行，因为 flex 默认是按行进行排列的。Flexbox 布局是一维布局方式，要么按行排列，要么按列排列。

## 对齐方式

Flex 布局有一个隐式的坐标空间，水平方向有一条主轴(main-axis)，垂直方向上有一条交叉轴(cross-axis)：

![Alignment](https://raw.githubusercontent.com/zzjtnb/images/master/test/Alignment.png)

### justify-content

控制主轴（即水平方向）对齐方式使用`justify-content`属性，它有下边几种对齐方式：

#### flex-start

`flex-start` 是默认值，如果是从左到右的文字阅读习惯(LTR)，就是靠左对齐。因为默认的对齐方式，所以跟上边的例子没有什么区别：

```css
justify-content: flex-start;
```

<div class="sc-AxirZ khASpQ">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .khASpQ .flex {
    height: 100px;
    display: flex;
    justify-content: flex-start;
  }
  .khASpQ .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .khASpQ .flex2 {
    background: rgb(91, 215, 234);
  }
  .khASpQ .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

#### center

居中对齐，此时整个 flex 容器被居中到了页面中间：

<div class="sc-AxirZ dAoVUF">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .dAoVUF .flex {
    height: 100px;
    display: flex;
    justify-content: center;
  }
  .dAoVUF .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .dAoVUF .flex2 {
    background: rgb(91, 215, 234);
  }
  .dAoVUF .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

#### flex-end

靠右对齐：

<div class="sc-AxirZ iIymkX">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .iIymkX .flex {
    height: 100px;
    display: flex;
    justify-content: flex-end;
  }
  .iIymkX .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .iIymkX .flex2 {
    background: rgb(91, 215, 234);
  }
  .iIymkX .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

#### space-between

两端对齐，这种对齐方式是第一个和最后一个元素贴边，中间的元素平分剩余的空间：

<div class="sc-AxirZ hXfwpJ">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .hXfwpJ .flex {
    height: 100px;
    display: flex;
    justify-content: space-between;
  }
  .hXfwpJ .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .hXfwpJ .flex2 {
    background: rgb(91, 215, 234);
  }
  .hXfwpJ .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

#### space-evenly

分散对齐，所有的元素都平分空间：

<div class="sc-AxirZ gtbjnu">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .gtbjnu .flex {
    height: 100px;
    display: flex;
    justify-content: space-evenly;
  }
  .gtbjnu .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .gtbjnu .flex2 {
    background: rgb(91, 215, 234);
  }
  .gtbjnu .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

#### space-around

跟`space-evenly`类似，但是左右两边的留白为平分空间的 1/2.

<div class="sc-AxirZ eCEhQo">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .eCEhQo .flex {
    height: 100px;
    display: flex;
    justify-content: space-around;
  }
  .eCEhQo .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .eCEhQo .flex2 {
    background: rgb(91, 215, 234);
  }
  .eCEhQo .flex3 {
    background: rgb(247, 220, 124);
  }
</style>
### align-items

控制交叉轴方向（即垂直方向）上的对齐方式使用`align-items`属性，有下边几种对齐方式：

#### stretch

`stretch` 是 `align-items` 的默认值，它会自动把子元素拉伸成容器的高度，所以之前的例子里子元素在垂直方向上都占满了容器，只要改变容器的`align-items`的值，它就会变成内容的高度。`stretch` 对齐效果如下：

<div class="sc-AxirZ dMpSuF">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .dMpSuF .flex {
    height: 100px;
    display: flex;
    align-items: stretch;
  }
  .dMpSuF .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .dMpSuF .flex2 {
    background: rgb(91, 215, 234);
  }
  .dMpSuF .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

#### 1. flex-start 对齐方式

靠上对齐，在交叉轴开始的最上方，可以看到子元素不再占满容器宽度：

<div class="sc-AxirZ HSHng">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .HSHng .flex {
    height: 100px;
    display: flex;
    align-items: flex-start;
  }
  .HSHng .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .HSHng .flex2 {
    background: rgb(91, 215, 234);
  }
  .HSHng .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

#### 2. center 对齐方式

居中对齐：

<div class="sc-AxirZ fsxvul">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .fsxvul .flex {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .fsxvul .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .fsxvul .flex2 {
    background: rgb(91, 215, 234);
  }
  .fsxvul .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

#### flex-end

靠下对齐：

<div class="sc-AxirZ FvUDX">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .FvUDX .flex {
    height: 100px;
    display: flex;
    align-items: flex-end;
  }
  .FvUDX .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .FvUDX .flex2 {
    background: rgb(91, 215, 234);
  }
  .FvUDX .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

#### baseline

基线对齐，如果子元素文字尺寸和行高不同，则子元素会按照文字的基线进行对齐：

```css
.flex2 {
  font-size: 24px;
}
```

<div class="sc-AxirZ hSvbmy">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .hSvbmy .flex {
    height: 100px;
    display: flex;
    align-items: baseline;
  }
  .hSvbmy .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .hSvbmy .flex2 {
    background: rgb(91, 215, 234);
    font-size: 24px;
  }
  .hSvbmy .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

如果是 `flex-start` 对齐方式：

<div class="sc-AxirZ ljuIgH">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .ljuIgH .flex {
    height: 100px;
    display: flex;
    align-items: flex-start;
  }
  .ljuIgH .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .ljuIgH .flex2 {
    background: rgb(91, 215, 234);
    font-size: 24px;
  }
  .ljuIgH .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

### align-content

本小节在下边讲到折行时再介绍

## 子元素覆盖对齐方式

子元素可以通过设置 `align-self` 来控制自己在交叉轴上的对齐方式，例如把 `.flex3` 子元素在垂直方向上靠下对齐：

```css
.flex {
  display: flex;
  align-items: flex-start;
}

.flex3 {
  align-self: flex-end;
}
```

<div class="sc-AxirZ jMEihy">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .jMEihy .flex {
    height: 100px;
    display: flex;
    align-items: flex-start;
  }
  .jMEihy .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .jMEihy .flex2 {
    background: rgb(91, 215, 234);
  }
  .jMEihy .flex3 {
    background: rgb(247, 220, 124);
  }
  .jMEihy .flex .flex3 {
    align-self: flex-end;
  }
</style>

在水平方向上控制子元素对齐并没有`justify-self`属性，而是使用`margin`属性，通过把左或右边距设置为`auto`来控制水平对齐，比如把 `flex3` 放到最右边：

```css
.flex3 {
  margin-left: auto;
}
```

<div class="sc-AxirZ hdsNyw">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .hdsNyw .flex {
    height: 100px;
    display: flex;
    justify-content: flex-start;
  }
  .hdsNyw .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .hdsNyw .flex2 {
    background: rgb(91, 215, 234);
  }
  .hdsNyw .flex3 {
    background: rgb(247, 220, 124);
  }
  .hdsNyw .flex .flex3 {
   margin-left:auto;
  }
</style>

## 排列方式

flex 支持按行排布，也支持按列排布。按列排布时，主轴和交叉轴换了方向，但是 align-items 和 justify-content 控制的轴线不变，即 `align-items` 还是控制交叉轴，`justify-content` 控制主轴：

![Arrangement](https://raw.githubusercontent.com/zzjtnb/images/master/test/Arrangement.png)

所以说，在水平方向上对齐变成了使用`align-items`，垂直方向则用`justify-content`。

要使 flex 按列排布，只需要设置：

```css
flex-direction: column;
```

来看几个例子：

## 水平居中对齐

**

```css
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

<div class="sc-AxirZ hejvOP">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .hejvOP .flex {
    height: 100px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
  }
  .hejvOP .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .hejvOP .flex2 {
    background: rgb(91, 215, 234);
  }
  .hejvOP .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

## 垂直居中对齐

**

```css
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

<div class="sc-AxirZ bFFUyv">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .bFFUyv .flex {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .bFFUyv .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .bFFUyv .flex2 {
    background: rgb(91, 215, 234);
  }
  .bFFUyv .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

另外 flex 布局也可以支持反向按行和列布局，相当于按容器中心线进行 180 度翻转：

## row-reverse

**

```css
.flex {
  display: flex;
  flex-direction: row-reverse;
}
```

<div class="sc-AxirZ cwZLWE">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .cwZLWE .flex {
    height: 100px;
    display: flex;
    flex-direction: row-reverse;
  }
  .cwZLWE .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .cwZLWE .flex2 {
    background: rgb(91, 215, 234);
  }
  .cwZLWE .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

## column-reverse

**

列模式下会垂直翻转：

```css
.flex {
  display: flex;
  flex-direction: column-reverse;
}
```

<div class="sc-AxirZ ldOkvU">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .ldOkvU .flex {
    height: 100px;
    display: flex;
     flex-direction: column-reverse;
  }
  .ldOkvU .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .ldOkvU .flex2 {
    background: rgb(91, 215, 234);
  }
  .ldOkvU .flex3 {
    background: rgb(247, 220, 124);
  }
</style>

## 空间占比

子元素可以通过设置`flex`属性来调整空间的占比，例如让 `flex2` 在水平方向上占据其他子元素的 2 倍大小，可以设置：

```css
.flex1,
.flex3 {
  flex: 1;
}
.flex2 {
  flex: 2;
}
```

<div class="sc-AxirZ doJaQP">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .doJaQP .flex {
    height: 100px;
    display: flex;
  }
  .doJaQP .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .doJaQP .flex2 {
    background: rgb(91, 215, 234);
  }
  .doJaQP .flex3 {
    background: rgb(247, 220, 124);
  }
  .doJaQP .flex1,
  .doJaQP .flex3 {
  flex: 1;
  }
  .doJaQP .flex2 {
  flex: 2;
  }
</style>

## Flex-basis

在介绍 flex-basis 之前，先讲一个概念 `main size`，即主轴方向的尺寸，那么，在行排布模式下，也就是水平方向的尺寸，其实就是子元素的宽度，而在列模式下，它是子元素的高度，相对应的也有`cross size`，即行模式下是子元素的高度，列模式下是宽度。
而`flex-basis`是用来设置`main size`的，它的优先级会高于`width`。**它的默认值是`auto`**，即在行模式下，如果子元素设置了宽度，它就取自这个宽度值，没有设置的话，就是内容的宽度。使用 `flex-basis`，可以同时管理行模式下的宽度和列模式下的高度。

来看一个例子，把之前的子元素改成固定宽度，比如 `200px`：

```css
.flex > * {
  flex-basis: 200px;
}
```

这样每个子元素宽度变为了 200px：

<div class="sc-AxirZ eZBtZI">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .eZBtZI .flex {
    height: 100px;
    display: flex;
  }
  .eZBtZI .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .eZBtZI .flex2 {
    background: rgb(91, 215, 234);
  }
  .eZBtZI .flex3 {
    background: rgb(247, 220, 124);
  }
 .eZBtZI .flex > * {
    flex-basis: 200px;
}
</style>

如果再添加 `width` 属性，发现并不会生效：

```css
.flex > * {
  flex-basis: 200px;
  width: 250px;
}
```

<div class="sc-AxirZ eZBtZI">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .eZBtZI .flex {
    height: 100px;
    display: flex;
  }
  .eZBtZI .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .eZBtZI .flex2 {
    background: rgb(91, 215, 234);
  }
  .eZBtZI .flex3 {
    background: rgb(247, 220, 124);
  }
.eZBtZI .flex > * {
  flex-basis: 200px;
  width: 250px;
}
</style>

但是，可以通过设置 `min-width`来强制设置最小宽度：

```css
.flex > * {
  flex-basis: 200px;
  min-width: 250px;
}
```

<div class="sc-AxirZ dGgGSR">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .dGgGSR .flex {
    height: 100px;
    display: flex;
  }
  .dGgGSR .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .dGgGSR .flex2 {
    background: rgb(91, 215, 234);
  }
  .dGgGSR .flex3 {
    background: rgb(247, 220, 124);
  }
  .dGgGSR .flex > * {
  flex-basis: 200px;
  min-width: 250px;
 }
</style>

同理的，在列模式下，`flex-basis`变成了高度，因为容器高度为 `100px`，这里把子元素高度设置成了 `30px` 总计 `90px` 来效果：

```css
.flex {
  flex-direction: column;
}

.flex > * {
  flex-basis: 30px;
}
```

<div class="sc-AxirZ jFyfHz">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .jFyfHz .flex {
    height: 100px;
    display: flex;
    flex-direction: column;
  }
  .jFyfHz .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .jFyfHz .flex2 {
    background: rgb(91, 215, 234);
  }
  .jFyfHz .flex3 {
    background: rgb(247, 220, 124);
  }
  .jFyfHz .flex>* {
    flex-basis: 30px;
  }
</style>

同样的，也可以用`min-height`来控制最小高度。

## 缩放

（后续例子都假设是行模式）之前的小节简单说了一下 flex 子元素空间的占比，这里把缩放单独拿出来是为了说明：除了调整 flex 子元素的增长之外，也可以调整收缩，以及`flex`属性背后的原理（下一小节）。

### flex-grow

先看一下增长，`flex-grow`，这个属性是说 flex 容器在有剩余空间的时候，子元素占据剩余空间的占比。例如，给`.flex2`子元素设置：

```css
.flex2 {
  flex-grow: 1;
}
```

其它的元素保持默认的宽度（即内容的宽度，flex-basis 为 auto)，那么 `.flex2` 就会自动增长并占据整个剩余空间：

<div class="sc-AxirZ eFSPBr">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .eFSPBr .flex {
    height: 100px;
    display: flex;
  }
  .eFSPBr .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .eFSPBr .flex2 {
    background: rgb(91, 215, 234);
  }
  .eFSPBr .flex3 {
    background: rgb(247, 220, 124);
  }
.eFSPBr .flex .flex2 {
    -webkit-box-flex: 1;
    flex-grow: 1;
}
</style>

如果把三个元素全部设置成 1，那么所有元素都会自动增长，并各自占据 1/3 的空间：

<div class="sc-AxirZ kyACGF">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .kyACGF .flex {
    height: 100px;
    display: flex;
  }
  .kyACGF .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .kyACGF .flex2 {
    background: rgb(91, 215, 234);
  }
  .kyACGF .flex3 {
    background: rgb(247, 220, 124);
  }
 .kyACGF .flex .flex1,
 .kyACGF .flex .flex2,
 .kyACGF .flex .flex3 {
    flex-grow: 1;
}
</style>

使用 `flex-grow` 就能够自由的调整元素的空间占比了，非常适合一些浮动的布局。

### flex-shrink

子元素的收缩是说：当它们的宽度超过 flex 容器之后，该如何进行收缩。通过 `flex-shrink` 来设置一个数值，数值越大，收缩程度也越大，比如`flex-shrink: 2`的元素会比`flex-shrink:1`收缩的值大 2 倍：

```css
.flex1,
.flex3 {
  flex-basis: 600px;
  flex-shrink: 1;
}
.flex2 {
  flex-basis: 600px;
  flex-shrink: 2;
}
```

这里为了方便演示，我把所有的 flex 子元素的 main size (宽度) 都设置成了 600px。在我的显示器下，flex 容器的宽度是 728px，三个子元素总和 1800px，显然超出了容器的宽度，那么根据上边定义的收缩规则，`.flex2` 将收缩 2 倍于 `.flex` 和 `.flex3` 收缩的空间。下边的例子中，`.flex1` 和 `.flex3` 的宽度变成了 `332px`，相比于 `600px` 收缩了 `268px`，那么 `.flex2` 就要收缩 `536px (268px * 2)` 的宽度，那么它最后就会剩下 `64px (600px - 536px)` 的宽度：

<div class="sc-AxirZ  czGReX">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .czGReX .flex {
    height: 100px;
    display: flex;
  }
  .czGReX .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .czGReX .flex2 {
    background: rgb(91, 215, 234);
  }
  .czGReX .flex3 {
    background: rgb(247, 220, 124);
  }
  .czGReX .flex1,
  .czGReX .flex3 {
    flex-basis: 600px;
    flex-shrink: 1;
  }
  .czGReX .flex2 {
    flex-basis: 600px;
    flex-shrink: 2;
  }
</style>
## 再说 flex 属性

说完`flex-grow`、`flex-shrink` 和 `flex-basis` 之后，再来看一下这个 `flex` 属性，它其实是前边三个属性的缩写，默认值是 `0 1 auto`，即不增长，但收缩，收缩比例为 1，flex-basis 为 auto，即取自用户定义的宽度或内容的宽度。

flex 的值可以是下边几种：

- 指定一个数字 - 例如`flex: 1`，就等同于是`flex: 1 1 0`，即自动缩放，比例为 1，flex-basis 为 0。
- auto - 等同于`flex: 1 1 auto`。
- 指定两个数字 - 第一个为`flex-grow`，第二个，如果是数字则认为是 `flex-shrink`，如果是宽度，则是`flex-basis`。
- 指定三个值 - 分别为`flex-grow`，`flex-shrink` 和 `flex-basis`。

所以说，通过`flex`属性可以方便的同时设置`flex-grow`、`flex-shrink` 和 `flex-basis` 这三个值。

## 折行

如果子元素有固定宽度，并且超出了容器的宽度，还不允许收缩的话，那么可以使用`flex-wrap`属性来让元素进行折行排列，使得每行的元素都不超过容器的宽度。**这里跟 css grid 布局的主要区别是，它无法控制单独控制行、列的占比，比如跨行、夸列，也不能自由定位元素到特定的位置**。下边的示例新增了 2 个元素，一共 5 个，每个元素的 main size 为 300px，然后超出宽度后折行：

```css
.flex {
  flex-wrap: wrap;
}

.flex > * {
  flex-shrink: 0;
  flex-basis: 300px;
}
```

<div class="sc-AxirZ cySuoI">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
    <div class="flex4">Flex 4</div>
    <div class="flex5">Flex 5</div>
  </div>
</div>
<style>
  .cySuoI .flex {
    height: 100px;
    display: flex;
    flex-wrap: wrap;
  }
  .cySuoI .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .cySuoI .flex2 {
    background: rgb(91, 215, 234);
  }
  .cySuoI .flex3 {
    background: rgb(247, 220, 124);
  }
  .cySuoI .flex4 {
    background: rgb(207, 154, 255);
  }
  .cySuoI .flex5 {
    background: rgb(255, 164, 164);
  }
  .cySuoI .flex>* {
    flex-shrink: 0;
    flex-basis: 300px;
  }
</style>

### align-content

如果 flex 容器开启了折行，那么两行及以上的内容可以通过`align-content`属性来控制各行之间在交叉轴上的排列规则，它的取值和 `justify-content`基本相同，这里演示其中几个，还是使用之前三个元素的 flex 容器，每个容器宽度为 300px，超出后换行：

```css
.flex {
  display: flex;
  flex-wrap: wrap;
}
.flex > * {
  flex-basis: 300px;
}
```

#### center

垂直居中：

<div class="sc-AxirZ dharsV">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .dharsV .flex {
    height: 100px;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
  }
  .dharsV .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .dharsV .flex2 {
    background: rgb(91, 215, 234);
  }
  .dharsV .flex3 {
    background: rgb(247, 220, 124);
  }
  .dharsV .flex>* {
    flex-basis: 300px;
  }
</style>

#### space-between

两端对齐：

<div class="sc-AxirZ jGAztd">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
  </div>
</div>
<style>
  .jGAztd .flex {
    height: 100px;
    display: flex;
    align-content: space-between;
   flex-wrap: wrap;
  }
  .jGAztd .flex>* {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
  }
  .jGAztd .flex2 {
    background: rgb(91, 215, 234);
  }
  .jGAztd .flex3 {
    background: rgb(247, 220, 124);
  }
  .jGAztd .flex>* {
    flex-basis: 300px;
  }
</style>

## 嵌套的 flex 容器的问题

如果 HTML 结构复杂，有嵌套的 flex 容器，很有可能会遇到嵌套的 flex 容器并不能自动收缩的问题，即使设置了`flex-shrink`。比如有下边一个 html 结构：

```html
<div class="flex">
  <div class="flex1">Flex 1</div>
  <div class="flex2">Flex 2</div>
  <div class="flex3">Flex 3</div>
  <div class="flex4">
    <p>
      这是一段很长很长很长很长很长很长很长很长很长很长很长很长长很长很长很长很长很长长很长很长很长很长很长的文本
    </p>
  </div>
</div>
```

这里给之前的 flex 容器添加了一个新的子元素`.flex4`，这 4 个子元素都设置成`flex: 1`来平分空间，但是 `.flex4` 自己本身也是一个`flex`布局的容器，里边有一长串文本，我想让它超长之后自动显示省略号，它的 CSS 代码：

```css
.flex {
  display: flex;
}
.flex > * {
  flex: 1;
}
.flex4 {
  display: flex;
  flex: 1;
}
.flex4 > p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

<div class="sc-AxirZ caYluE">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
    <div class="flex4">
      <p>这是一段很长很长很长很长很长很长很长很长很长很长很长很长长很长很长很长很长很长长很长很长很长很长很长的文本</p>
    </div>
  </div>
</div>
<style>
  .sc-AxirZ .caYluE{
    width:100%
  }
  .caYluE .flex {
    height: 100px;
    display: flex;
  }
  .caYluE .flex > * {
      color: rgb(47, 53, 66);
      background: rgb(92, 241, 124);
  }
  .caYluE .flex2 {
    background: rgb(91, 215, 234);
  }
  .caYluE .flex3 {
    background: rgb(247, 220, 124);
  }
  .caYluE .flex4 {
    background: rgb(207, 154, 255);
  }
  .caYluE .flex>* {
    flex: 1 1 0%;
  }
  .caYluE .flex .flex4 {
    display: flex;
    flex: 1 1 0%;
  }
  .caYluE .flex4>p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

可以看到，最后本应该占 1/4 空间的`.flex4`，因为文本不能换行，直接把 flex 容器撑开了，并且把其他的三个子元素挤成了最小空间，它本应该把文字截短并显示省略号，这是为什么呢？原来，flex 容器的 `min-width` 属性值为 auto，是由浏览器自行计算的，在这里它取了`<p>`元素的宽度，使得宽度成为了一整行 `<p>` 的宽度。那么要解决这个问题，可以把`.flex4` 这个嵌套 flex 容器的 `min-width` 改为`0`，即最小宽度是`0`，那么就可以正常收缩了：

```css
.flex4 {
  display: flex;
  flex: 1;
  min-width: 0;
}
```

<div class="sc-AxirZ  kDfLoh">
  <div class="flex">
    <div class="flex1">Flex 1</div>
    <div class="flex2">Flex 2</div>
    <div class="flex3">Flex 3</div>
    <div class="flex4">
      <p>这是一段很长很长很长很长很长很长很长很长很长很长很长很长长很长很长很长很长很长长很长很长很长很长很长的文本</p>
    </div>
  </div>
</div>
<style>
  .kDfLoh .flex {
    height: 100px;
    display: flex;
  }
 .kDfLoh .flex > * {
    color: rgb(47, 53, 66);
    background: rgb(92, 241, 124);
 }
  .kDfLoh .flex2 {
    background: rgb(91, 215, 234);
  }
  .kDfLoh .flex3 {
    background: rgb(247, 220, 124);
  }
  .kDfLoh .flex4 {
    background: rgb(207, 154, 255);
  }
  .kDfLoh .flex > * {
    flex: 1 1 0%;
  }
  .kDfLoh .flex .flex4 {
    display: flex;
    min-width: 0px;
    flex: 1 1 0%;
  }
  .kDfLoh .flex .flex4 > p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

<style>
  .sc-AxirZ {
    margin: 10px auto;
    background: rgb(241, 242, 246);
  }
</style>

## 总结

到这里，整个 flex 布局就介绍完了，还是有不少东西的，但不难。相信通过实例你一定可以掌握它的用法，下边总结一下要点：

- 开启 flex 布局使用`display: flex`属性。
- flex 布局有主轴和交叉轴，分别使用`justify-content`和`align-items`控制对齐方式。
- 支持按行或列进行排列，使用`flex-direction`，另外也支持`row-reverse`和`column-reverse`反向排列。
- 子元素可以通过`flex`简写形式，或者`flex-grow`，`flex-shrink`，`flex-basis` 来调整元素的空间占比和缩放。
- 通过`flex-wrap`可以设置 flex 子元素折行显示。
- 嵌套`flex`容器的缩放问题。
