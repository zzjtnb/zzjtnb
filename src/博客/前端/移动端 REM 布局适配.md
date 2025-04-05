---
title: 移动端REM布局适配
category: 前端
tags:
  - 移动端适配
  - ren
cover: https://cdn.pixabay.com/photo/2021/02/02/15/23/rose-5974372_960_720.jpg
---


## 1.rem 、 em 和 px

* `px`：绝对长度单位，与显示设备相关，对于屏幕显示，通常是一个设备像素（点）的显示。pc 端的页面一般使用 px 作为 css 长度单位。
* `em`：相对长度单位，这个单位表示元素的`font-size`的计算值它是相对父元素而言的。值是一个倍数。浏览器的默认字体高都是 16px，未经调整的浏览器显示 1em = 16px。
* `rem`： 相对长度单位，这个单位代表根元素（`<html>`）的`font-size`大小。值是一个倍数。

移动端页面显然不适用`px`作为长度单位，手机的尺寸和分辨率不尽相同，页面难以做到统一。

`em`单位有个问题，就是它是相对于其父级字体的倍数的，当出现有多重嵌套内容时，计算会变得很复杂，可能改变一个元素的字体大小，则子元素的尺寸都会跟着变化，需要重新计算。

`rem` 就不会有这个问题，因为它始终是基于根元素（`<html>`）的。

所以，`rem`是比较适合移动端的。

## 2.正在使用的方法

> rem 布局的本质是等比缩放，一般是基于宽度。最重要的是要给根元素（`<html>`）动态设置多少的`font-size`合适。 一般是将设计稿的宽度等分为 100 份，然后将 1 份大小的 px 值设置为`<html>`元素的`font-size`大小。

比如，设计稿的宽度是 750px，分成 100 份之后每份的大小为`7.5px`，即设置`<html>`元素的`font-size`大小为`7.5px`。在元素中`1rem = 7.5px`。 如果设计稿中有一个宽 20px 的块，那在样式中就需要换算一下啦，`width:2.667rem`。这里的转换看以来有点复杂，不过我们可以使用 css 预处理器或者 gulp、webpack 构建的时候进行转换。

```js
1 rem = 7.5px;
x rem = 20px;
// 由比例关系可以得出：
x = 1 * 20 / 7.5
```

## 2.1 先把项目中所有的 px 替换成 rem

## 2.2 把 html 的字体大小设置成 100

```css
html{
  font-size:100px
}
```

因为 rem 的大小是相对于 html 根元素的字体大小进行变化的,所以要有一个默认的 html 的 font-size

## 2.3 js 等比例计算(已经根据某个机型宽度写好的项目)

```js
//获取当前屏幕宽度
const width = document.documentElement.clientWidth || document.body.clientWidth;
//计算比率:当前屏幕宽度除以适配的宽度
const ratio = (width / 375);
//新设备的字体大小是默认的字体大小乘以比率
const fontSize = 100 * ratio;
//改变html的字体大小
document.getElementsByTagName('html')[0].style['font-size'] = fontSize + 'px'
```

## 2.4 另外一种

下面是我一直的 rem 处理的代码，设置`<html>font-size`的地方不是很明白其用意是什么，不过知道上面的转化规则，`font-size`设置成多少，都能转化 px2rem。

```js
// 只适用于移动端，没有处理pc端的显示，在pc端页面会显示地很大。
(function(window, html) {
    // 默认的设计稿宽度720px
    var designWidth = 720;

    function recalc() {
        //var windowWidth = html.clientWidth < designWidth ? html.clientWidth : designWidth;
        // 获取页面的宽度
        var windowWidth = html.clientWidth;

        // 我的理解是： 将页面等分成 designWidth 份
        // 这样的话，设计稿中的1px 就等于 1rem，方便转换px和rem
        // 后面又 *100 ，我觉得是确保计算出来的值是非小数，保证之后的计算精度。
        //  *100 之后，则样式中rem的值就需要相应的缩小100背
        //  即：设计稿中的20px，在样式中就要写成0.2rem
        var fontSize = windowWidth / designWidth * 100;

        setFontSize(fontSize);

        var completedFontSize = getFontSize();

        // 如果实际 fontSize 与设置的 fontSize 不等，则根据比例，重新计算
        // 存在浏览器自动放大font-size的问题
        // 参考：https://www.cnblogs.com/keaizhouzhou/p/6702551.html
        if (Math.abs(completedFontSize - fontSize) > 0.1) {
            setFontSize(fontSize * fontSize / completedFontSize);
        }
    }
    function setFontSize(fontSize) {
        html.style.fontSize = fontSize + 'px';
    }
    function getFontSize() {
        return parseFloat(window.getComputedStyle(html)['font-size']);
    }
    window.calcRem = function(width) {
        designWidth = width;
        recalc();
        // 监听resize
        window.addEventListener('resize', recalc);
    }
}(window, document.documentElement));


```

在 window 上挂了一个`calcRem`方法，如果设计稿的宽度是 750px 的，则执行`calcRem(750)`。代码最好放在 html 中 css 加载之前执行。

上面的注释是我的理解，我觉得`var fontSize = windowWidth / designWidth * 100;` 这个算式是简化后得来的，具体怎么简化的我还真的想不明白。或许是考虑到了简化 px 到 rem 的转化计算问题。 不过，根据 rem 的定义，我们也很容易知道样式中的 rem 的值要怎么写。

## 3.px2rem 方法

## 3.1 css 预处理器

我是用的是`stylus`预处理器，可以定义一个方法：

```js
// px转换rem的方法，这里的100是根据动态设置的html的font-size设置的
px2rem(pxValue) {
    unit(pxValue / 100, rem);
}
// 样式中就可以使用方法，20和30都是设计稿的尺寸，写代码的时候就不用手动转换了
.sign-box {
    padding: px2rem(20) px2rem(30);
}
```

[sass-rem](https://link.zhihu.com/?target=https%3A//github.com/pierreburel/sass-rem) [mixin-rem](https://github.com/bitmanic/rem)

## 3.2 gulp 构建时转换

[postcss-px2rem](https://www.npmjs.com/package/postcss-px2rem)

## 3.3 webpack 构建时转换

## 3.4 postcss-px2rem

```js
// vue.config.js
// remUnit是指1rem等于多少px的值，我这里1rem = 100px，则 remUnit为100
css: {
    loaderOptions: {
        postcss: {
            plugins: [require('postcss-px2rem')({
                remUnit: 100
            })]
        }
    }
}


```

参考：

* [Github-px2rem-postcss](https://github.com/songsiqi/px2rem-postcss)
* [postcss-px2rem](https://www.jianshu.com/p/5b8b7cd11fce)

## 3.5 px2rem-loader

```js
// vue.config.js
chainWebpack: config => {
    config.optimization.splitChunks({
        cacheGroups: {
            vendors: {
                name: 'chunk-vendors',
                minChunks: 2,
                chunks: 'initial'
            }
        }
    });
    config.module
        .rule('stylus')
        .oneOf('vue')
        .use('px2rem-loader')
        .loader('px2rem-loader')
        .before('postcss-loader') // this makes it work.
        .options({ remUnit: 100, remPrecision: 8 })
        .end()
}
```

参考：

* [npm-px2rem-loader](https://www.npmjs.com/package/px2rem-loader)
* [vue cli3 添加 px2rem-loader 样式嵌套问题](https://www.jianshu.com/p/1613b599d5be)

## 待学习

* [rem, vw, 还是…? 各凭本事的移动端适配方案](https://juejin.im/post/5bc07ebf6fb9a05d026119a9)
* [如何利用 vw+rem 进行移动端布局](https://juejin.im/post/5b29f476e51d455892718380)

## 参考：[](#参考)

* [Rem 布局的原理解析](https://www.jianshu.com/p/09bd0ca51ef5)
* [stylus 中文版参考文档之方法 (Functions)](https://www.zhangxinxu.com/jq/stylus/functions.php)
* [移动端 h5 之 rem 布局／px2rem](https://www.jianshu.com/p/e96ccb603a50)
* [简单粗暴的移动端适配方案 - REM](https://zhuanlan.zhihu.com/p/33034872)
* [基于 REM 的移动端自适应布局方案](https://juejin.im/entry/5ac431d46fb9a028ba1faee6)

* * *
