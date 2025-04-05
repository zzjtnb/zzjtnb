---
title: CSS实现响应式全屏背景图
category: 前端
tags:
  - css
cover: https://cdn.pixabay.com/photo/2017/01/06/23/04/homberg-1959229_960_720.jpg
---

当前很流行的一种网页形式就是满屏大图，本文将用最简单的方式实现该效果。用到了 CSS 属性 `background-size` , 无需 javascript。

先看 [demo](http://cdn.sixrevisions.com/0431-01_responsive_background_image_demo/responsive-full-background-image-demo.html)，打开后，调整浏览器窗口大小，观察背景图的变化。

如果在你的项目中也需要这样的效果，那么你就来对地方了。

## 核心概念

* 使用 `background-size` 属性，填充整个 viewport

    当 css 属性 `background-size` 值为 `cover`时，浏览器会自动按比例缩放背景图的宽和高，直到大于或等于 viewport 的宽和高

* 使用媒体查询为移动设备提供更小尺寸的背景图

    为什么要给移动设备提供小尺寸背景图呢？在 demo 中，我们看到的背景图的实际尺寸为 5498px * 3615px，使用这么大尺寸图片的目的是满足绝大多数宽屏显示器，并且不会显示模糊，而代价就是 1.7MB 的图片体积。

    但是在移动设备上没有必要使用这么大的图片，同时大图还会导致加载变慢，尤其是在移动网络下。

    需要说明的是：为移动设备提供小背景图对该技术方案来说是可选的。

## 实践

* HTML

    ```html
    <!doctype html>
    <html>
    <body>
        ...Your content goes here...
    </body>
    </html>
    
    
    ```

    后面我们会给 `body`标签指定背景图，这样背景图就可以填充整个浏览器 viewport 了。

    其实，该方案对所有的块级容器都可以生效。如果你的块级容器的宽高是动态的，那么背景图将自动伸缩，充满整个容器。

* CSS `body`标签的样式如下：

    ```css
    body {
    
    background-image: url(images/background-photo.jpg);
    
    
    background-position: center center;
    
    
    background-repeat: no-repeat;
    
    
    background-attachment: fixed;
    
    
    background-size: cover;
    
    
    background-color: #464646;
    }
    
    
    ```

上面最重要的一条就是：

```css
background-size: cover;
```

这样浏览器就会按比例缩放背景图直至背景图宽高不小于容器的宽高（在上面的例子中，就是 `body`标签）。

这里需要注意的一点就是：如果背景图小于 `body`标签的尺寸（例如在高分辨率显示器上，或页面内容特别多时），浏览器会拉伸图片。我们都知道，当把一个图片拉伸时，图片会变模糊。

因此，在选择背景图时，要特别注意尺寸。为了照顾到大尺寸屏幕，demo 里用的图片尺寸为 5498px * 3615px 。

同时，为了让背景图始终相对于 viewport 居中，我们声明了：

```css
background-position: center center;
```

上面的规则会把背景图缩放的原点定位到 viewport 的中心。

接下来我们需要解决的问题是：当内容的高度大于 viewport 的高度时，会出现滚动条。我们希望背景图始终相对于 viewport 固定，即使用户滚动时也是一样。

解决办法就是：

```css
background-attachment: fixed;
```

## (可选) 使用媒体查询应对小屏幕

为了应对小屏幕，我用 photoshop 将背景图按比例缩放到 768px * 505px，然后通过 smush.it 压缩图片体积。这样就将图片体积从 1741KB 降到 114KB，节省了 93%。

下面是媒体查询的写法：

```css
@media only screen and (max-width: 767px) {
  body {
    background-image: url(images/background-photo-mobile-devices.jpg);
  }
}
```

上面的媒体查询将 `max-width: 767px` 设为断点，也就是说当浏览器 viewport 大于 767px 时，会使用大背景图，反之使用小背景图。

使用上面媒体查询不利的一面是，如果你把浏览器窗口从 1200px 缩小到 640px(反之亦然)，你会看到一个短暂的闪烁，因为小背景图或大背景图正在加载。

译文到此结束。原文地址 [http://sixrevisions.com/css/responsive-background-image/](http://sixrevisions.com/css/responsive-background-image/)

ps: 由于 IE8 及其以前的浏览器不支持 `background-size:cover`( [查看兼容性](http://caniuse.com/#search=background-size)), 所以要支持这些老古董，还需要多做一些。

要让 IE8 支持 `background-size`, 可以用 [background-size-polyfill](https://github.com/louisremi/background-size-polyfill)
