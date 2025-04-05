---
title: CSS完美实现iframe高度自适应（支持跨域）
category: 前端
tags:
  - css
cover: https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736875_960_720.jpg
---

Iframe 的强大功能偶就不多说了，它不但被开发人员经常运用，而且黑客们也常常使用它，总之用过的人知道它的强大之处，但是 Iframe 有个致命的"BUG"就是 iframe 的高度无法自动适应，这一点让很多人都头疼万分。百度或是谷歌一下，确实很多解决方法，但尝试一下，会发现问题很多：浏览器兼容性差，不能自适应，仅支持同域 Iframe 等诸多问题，尤其是跨域 Iframe 高度自适应问题。网上根本找不到一种可行的方案（唯一有一种提到加入代理页面的，经过测试发现无用）。难道真的没有一种可行的解决方案了吗？ No，下面和大家分享一种强大的方法，代码如下：

```html
<html>

<head>
  <style>
    body {
      margin-left: 0px;
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
      overflow: hidden;
    }
  </style>
</head>

<body>
  <iframe src='" http://www.baidu.com/' width='100%' height='100%' frameborder='0' name="_blank" id="_blank"></iframe>
</body>

</html>
```

代码强大之处：

``` bash
1. 该方法完美兼容IE6，7，8 ，Fire fox,chrome，opera 等主流的浏览器；

2.同域，跨域皆支持；

3.不调用任何JS脚本；
```

注意三点.

``` bash
1. 文件开头不能是：
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
必须是**<html xmlns="http://www.w3.org/1999/xhtml">**开头

2. body样式中的 overflow: hidden; 绝对不对省略；

3.Iframe 中的 height='100%' 以及 滚动条不能设为no(默认是yes，不用设置即可)
```

好了，马上试试吧。100%不会让你失望。
