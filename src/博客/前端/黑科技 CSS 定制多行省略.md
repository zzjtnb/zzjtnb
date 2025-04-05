---
title: 黑科技：CSS定制多行省略
category: 前端
tags:
  - css
cover: https://cdn.pixabay.com/photo/2019/08/06/12/14/desert-4388204_960_720.jpg
---

## 什么是多行省略？

![bVKr2N](https://segmentfault.com/img/bVKr2N?w=660&h=325)

当字数多到一定程度就显示省略号点点点。最初只是简单的点点点，之后花样越来越多，点点点加下箭头，点点点加更多，点点点加更多加箭头...。多行省略就是大段文字后面的花式点点点。

同行这么做

![bVKr22](https://segmentfault.com/img/bVKr22?w=660&h=587)

1. Google Plus 用透明到白色的渐变遮罩，渐变遮罩在文字超出的时候才显示，但无法挤出文字，且背景只能纯色，不理想。

2. 豌豆荚则更简单粗暴换行显示，换行显示则文字未超出时依然显示 ...xxx，更不理想！

我这样做

![bVKr3m](https://segmentfault.com/img/bVKr3m?w=660&h=1176)

在 QQ 浏览器的页面用了一个**原创**的 mod-more UI 组件，实现了**定制**的多行省略，还是**纯 CSS** 的，领先同行一大截，赞！赞！赞！只可惜，mod-more 组件的高度是固定的。对 mod-more 进一步进化，完美自适应高度，而且代码简化易用。

## 怎么做到的？

![bVKr3W](https://segmentfault.com/img/bVKr3W?w=658&h=564)

原理详解

### 按需显示`...更多`

![bVKr4p](https://segmentfault.com/img/bVKr4p?w=320&h=127)

```html
<!doctype html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px}}/*测试*/</style>
<div style="font-size:12px;line-height: 18px;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);">
    <div style="float:right;margin-left: -50px;width:100%;position:relative;background: hsla(229, 100%, 75%, 0.5);">腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
    <div style="float:right;position:relative;width:50px;height: 108px;color:transparent;background: hsla(334, 100%, 75%, 0.5);">placeholder</div>
    <div style="float:right;width:50px;height:18px;position: relative;background: hsla(27, 100%, 75%, 0.5);">...更多</div>
</div>
</body></html>
```

利用右浮动原理——右浮动元素从右到左依次排列，不够空间则换行。蓝色块、粉色块、橙色块依次右浮动，蓝色块高度小于 6 行文字时，橙色块在右边，蓝色块高度大于 6 行文字时，左下角刚好够橙色块排列的空间，于是橙色块就到左边了

![bVKr4w](https://segmentfault.com/img/bVKr4w?w=590&h=127)

```html
<!doctype html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px}}/*测试*/</style>
<div style="font-size:12px;line-height: 18px;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);">
    <div style="float:right;margin-left: -50px;width:100%;position:relative;background: hsla(229, 100%, 75%, 0.5);">腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
    <div style="float:right;position:relative;width:50px;height: 108px;color:transparent;background: hsla(334, 100%, 75%, 0.5);">placeholder</div>
    <div style="float:right;width:50px;height:18px;position: relative;background: hsla(27, 100%, 75%, 0.5);left: 100%;-webkit-transform: translate(-100%,-100%);">...更多</div>
</div>
</body></html>
```

进一步将橙色块偏移到正确位置就大功告成了！细心的同学会发现，将橙色块加上渐变底就是 Google Plus 在用的方案。

### 文字溢出截断

![bVKr4z](https://segmentfault.com/img/bVKr4z?w=321&h=125)

```html
<!DOCTYPE html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px}}/*测试*/</style>
<div style="font-size: 12px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: red;line-height: 18px;position: relative;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);">
    <div style="color:#000;display: inline;vertical-align: top;background: rgb(204, 204, 204);">腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
</div>
</body></html>
```

`-webkit-line-clamp`是 webkit 内核的私有 css 属性，用于进行多行省略，在安卓和 ios 上全支持。但它固定使用省略号，无法直接扩展。而且自带了溢出截断逻辑，作用于容器高度。仔细考察可发现它使用的省略号是单字符`…`，可以用文字 css 属性如`font-size`,`letter-spacing`,`color`等控制。

![bVKr4H](https://segmentfault.com/img/bVKr4H?w=321&h=125)

```html
<!DOCTYPE html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px}}/*测试*/</style>
<div style="font-size: 36px;letter-spacing: 28px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: red;line-height: 18px;position: relative;-webkit-animation: width-change 8s ease infinite;background: rgb(230, 230, 230);">
    <div style="color:#000;display: inline;font-size: 12px;vertical-align: top;letter-spacing: 0;background: rgb(204, 204, 204);">腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
</div>
</body></html>
```

设置外容器的`font-size`、`letter-spacing`、`color`，并在子容器里恢复就可以单独设置省略号。这里外容器设置`font-size`的值等于 2 倍行高（余下要撑开的宽度可用`letter-spacing`补足，也可仅用`font-size`撑开全部的宽度），`color:transparent`可以让 line-clamp 既挤出文字又不截断容器高度，外容器高度达到 7 行而不是默认表现的 6 行，从而达到需要的溢出截断效果

![bVKr4T](https://segmentfault.com/img/bVKr4T?w=362&h=552)

### 合体！定制多行省略

![bVKr4U](https://segmentfault.com/img/bVKr4U?w=480&h=127)

```html
<!DOCTYPE html><html><body>
<style>@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px}}/*测试*/</style>
<div style="position: relative;line-height:18px;-webkit-animation: width-change 8s ease infinite;max-height: 108px;">
    <div style="font-size: 36px;letter-spacing: 28px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;color: transparent;line-height: 18px;position: relative;">
        <div style="font-size:12px;color: #000;display: inline;vertical-align: top;letter-spacing: 0;">
        腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。
        </div>
        <div style="position:absolute;top: 0;left: 50%;width: 100%;height: 100%;letter-spacing: 0;color: #000;font-size: 12px;background: rgba(173, 216, 230, 0.5);">
            <div style="float: right;width: 50%;height: 100%;background: rgba(255, 192, 203, 0.5);"></div>
            <div style="float: right;width: 50%;height: 108px;background: hsla(223, 100%, 50%, 0.19);"></div>
            <div style="float: right;width: 50px;height: 18px;position: relative;background: rgba(255, 165, 0, 0.5);" class="">... 更多</div>
        </div>
    </div>
</div>   
</body></html>
```

将`-webkit-line-clamp`实现的文字溢出截断代码为主体，叠加绝对定位同步的按需显示`...更多`结构。因为绝对定位，这里使用百分比简化代码。最外包一层结构限制最大高度。

![bVKr47](https://segmentfault.com/img/bVKr47?w=321&h=111)

```html
<!DOCTYPE html><html><body>
<style>
/*
 * 行高 h
 * 最大行数 n
 * ...更多容器的宽 w
 * 字号 f
 */

@-webkit-keyframes width-change {0%,100%{width: 320px} 50%{width:260px}}
.ellipsis {
    position: relative;
    background: rgb(230, 230, 230);
    width: 260px;
    max-height: 108px; /* h*n */
    line-height: 18px; /* h */
    overflow: hidden;
    -webkit-animation: width-change 8s ease infinite;
}
.ellipsis-container {
    position: relative;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6; /* n */
    font-size: 50px; /* w */
    color: transparent;
}
.ellipsis-content {
    color: #000;
    display: inline;
    vertical-align: top;
    font-size: 12px; /* f */
}
.ellipsis-ghost {
    position:absolute;
    z-index: 1;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    color: #000;
}
.ellipsis-ghost:before {
    content: "";
    display: block;
    float: right;
    width: 50%;
    height: 100%;
}
.ellipsis-placeholder {
    content: "";
    display: block;
    float: right;
    width: 50%;
    height: 108px; /* h*n */
}
.ellipsis-more {
    float: right;
    font-size: 12px; /* f */
    width: 50px; /* w */
    height: 18px; /* h */
    margin-top: -18px; /* -h */
}
</style>
<div class="ellipsis">
    <div class="ellipsis-container">
        <div class="ellipsis-content">腾讯成立于1998年11月，是目前中国领先的互联网增值服务提供商之一。成立10多年来，腾讯一直秉承“一切以用户价值为依归”的经营理念，为亿级海量用户提供稳定优质的各类服务，始终处于稳健发展状态。2004年6月16日，腾讯控股有限公司在香港联交所主板公开上市(股票代号700)。</div>
        <div class="ellipsis-ghost">
            <div class="ellipsis-placeholder"></div>
            <div class="ellipsis-more">...更多</div>
        </div>
    </div>
</div>   
</body></html>
```

## 为什么这么做？

### line-clamp 有 **3** 宗罪

![bVKr5z](https://segmentfault.com/img/bVKr5z?w=320&h=72)

`text-align:justify`一起用会使省略号和文字相叠

![bVKr9O](https://segmentfault.com/img/bVKr9O?w=320&h=152)

超出截断后会截掉部分行高

![bVKr7a](https://segmentfault.com/img/bVKr7a?w=320&h=103)

省略号出现在单词中间

### 定制省略当然某问题啦

![bVKr9P](https://segmentfault.com/img/bVKr9P?w=320&h=108)

`text-align:justify`时如期所示，没问题！

![1460000008648963](https://segmentfault.com/img/remote/1460000008648963?w=320&h=181)

截断时如期所示，也没问题！

![1460000008648964](https://segmentfault.com/img/remote/1460000008648964?w=320&h=120)

省略号在有单词时如期显示，依然没问题！

### 更别说点点点花样增改

![bVKr9K](https://segmentfault.com/img/bVKr9K?w=225&h=225)

![1460000008648966](https://segmentfault.com/img/remote/1460000008648966?w=320&h=108)

简单增改文字加链接只是小 case

![1460000008648967](https://segmentfault.com/img/remote/1460000008648967?w=340&h=148)

用折角还是其他图片表示文本溢出可以增添趣味

![bVKr9U](https://segmentfault.com/img/bVKr9U?w=320&h=108)

溢出时显示溢出字数增加了实用用途

![1460000008648969](https://segmentfault.com/img/remote/1460000008648969?w=203&h=204)
