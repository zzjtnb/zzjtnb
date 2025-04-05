---
title: css 跳动文字
category: 前端
tags:
  - css
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80
---

```html
<h1 class=“css-jump”>  
  <span>C</span>  
  <span>S</span>  
  <span>S</span>  
  <span>跳</span>  
  <span>动</span>  
  <span>文</span>  
  <span>字</span>  
</h1>  
  
<style>  
  /* 跳动文字 */  
  .css-jump {  
    cursor: default;  
    position: absolute;  
    top: 0;  
    left: 0;  
    right: 0;  
    bottom: 0;  
    width: 100%;  
    height: 100px;  
    margin: auto;  
    display: block;  
    background: #e0e0e0;  
    padding: 30px 0;  
    text-align: center;  
  }  
  
  .css-jump span {  
    position: relative;  
    top: 20px;  
    display: inline-block;  
  
    animation: bounce .3s ease infinite alternate;  
  
    font-family: ‘Titan One’, cursive;  
    font-size: 80px;  
    color: #FFF;  
    text-shadow: 0 1px 0 #CCC,  
      0 2px 0 #CCC,  
      0 3px 0 #CCC,  
      0 4px 0 #CCC,  
      0 5px 0 #CCC,  
      0 6px 0 transparent,  
      0 7px 0 transparent,  
      0 8px 0 transparent,  
      0 9px 0 transparent,  
      0 10px 10px rgba(0, 0, 0, .4);  
  }  
  
  .css-jump span:nth-child(2) {  
    animation-delay: .1s;  
  }  
  
  .css-jump span:nth-child(3) {  
    animation-delay: .2s;  
  }  
  
  .css-jump span:nth-child(4) {  
    animation-delay: .3s;  
  }  
  
  .css-jump span:nth-child(5) {  
    animation-delay: .4s;  
  }  
  
  .css-jump span:nth-child(6) {  
    animation-delay: .5s;  
  }  
  
  .css-jump span:nth-child(7) {  
    animation-delay: .6s;  
  }  
  
  /* 动画 */  
  @keyframes bounce {  
    100% {  
      top: -20px;  
  
      text-shadow: 0 1px 0 #CCC,  
        0 2px 0 #CCC,  
        0 3px 0 #CCC,  
        0 4px 0 #CCC,  
        0 5px 0 #CCC,  
        0 6px 0 #CCC,  
        0 7px 0 #CCC,  
        0 8px 0 #CCC,  
        0 9px 0 #CCC,  
        0 50px 25px rgba(0, 0, 0, .2);  
    }  
  }  
</style>  
```

## @keyframes 使用说明

使用@keyframes 规则，创建动画。

创建动画是通过逐步改变从一个 CSS 样式设定到另一个。

在动画过程中，可多次更改 CSS 样式的设定。

指定的变化时发生时使用％，或关键字”from”和”to”，这是和 0％到 100％相同。

0％是开头动画，100％是当动画完成。
