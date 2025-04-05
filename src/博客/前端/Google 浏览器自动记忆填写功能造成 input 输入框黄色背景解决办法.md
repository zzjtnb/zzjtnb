---
title: Google浏览器自动记忆填写功能造成input输入框黄色背景解决办法
category: 前端
tags:
  - css
cover: https://cdn.pixabay.com/photo/2020/12/27/12/07/sunrise-5863751_960_720.png
---


使用 chrome 浏览器选择记住密码的账号，输入框会自动加上黄色的背景，有些设计输入框是透明背景的，需要去除掉这个黄色的背景；

![144066304dd9a1d7e21246bfc81db90b6be](https://oscimg.oschina.net/oscnet/144066304dd9a1d7e21246bfc81db90b6be.png)

## 方法 1：阴影覆盖  （由于是设置颜色覆盖，所以只对非透明的纯色背景有效；）

**

```css
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}
```

![0b6f3a63fd699a69a05c4bac079cddf910e](https://oscimg.oschina.net/oscnet/0b6f3a63fd699a69a05c4bac079cddf910e.png)

## 方法 2：修改 chrome 浏览器渲染黄色背景的时间 （透明背景）

**

```css
input:-webkit-autofill {
  -webkit-text-fill-color: yellow !important;/*更改文本颜色*/
  transition: background-color 5000s ease-in-out 0s;/*更改背景颜色*/
}
```

![1563943-20190419104923923-366139984](https://img2018.cnblogs.com/blog/1563943/201904/1563943-20190419104923923-366139984.png)
