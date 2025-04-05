---
title: css闪烁动画
category: 前端
tags:
  - css
cover: https://images.unsplash.com/photo-1539023918645-8a5a85a822c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

```html
<div>
  <img src='xxx.jpg' class="ballon"></img>
</div>

<style>
@keyframes scaleDraw {
 /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
 0% {
  transform: scale(1);
  /*开始为原始大小*/
 }

 25% {
  transform: scale(1.1);
  /*放大1.1倍*/
 }

 50% {
  transform: scale(1);
 }

 75% {
  transform: scale(1.1);
 }
}

.ballon {
 /* width: 150px;
      height: 200px;
      background: url("./assets/images/download.png"); */
 background-size: 150px 200px;
 -webkit-animation-name: scaleDraw;
 /*关键帧名称*/
 -webkit-animation-timing-function: ease-in-out;
 /*动画的速度曲线*/
 -webkit-animation-iteration-count: infinite;
 /*动画播放的次数*/
 -webkit-animation-duration: 1.5s;
 /*动画所花费的时间*/
}
</style>
```
