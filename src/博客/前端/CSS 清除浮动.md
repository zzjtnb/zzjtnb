---
title: CSS清除浮动
category: 前端
tags:
  - css
cover: https://images.unsplash.com/photo-1518008931783-51b25ba2ccc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

### 在 float 的父元素添加 clearfix

html

```html
<div class="ly clearfix">
  <img src="/images/Heroes/picture/pic.jpg" width="71" height="77" />
</div>
```

css

```css
.ly img {
  margin-right: 24px;
  float: right;
}
.clearfix::after,
.clearfix::before {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
.clearfix {
  zoom: 1;
}
```
