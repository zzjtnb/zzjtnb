---
title: 使用 Line-Height 垂直居中图片
category: 前端
tags:
  - css
cover: https://images.unsplash.com/photo-1532787799187-93655e51d472?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80
---

使 line-height 可以实现图片的垂直居中，只需要在包含图片的父元素上设置 line-height 然后为图片设置 vertical-align: middle。

## HTML

```html
<div id="parent">
    <img src="image.png" alt="" />
</div>
```

## CSS

```css
#parent { 
    line-height: 200px;
}

#parent img {
    vertical-align: middle;
}
```
