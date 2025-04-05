---
title: HTML中CSS之去除li前面的小黑点和ul、li部分属性方法
category: 前端
tags:
  - CSS
  - HTML
  - 列表样式
cover: https://cdn.pixabay.com/photo/2020/06/02/05/39/barley-5249498_960_720.jpg
---

# HTML中CSS之去除li前面的小黑点和ul、li部分属性方法

对于很多人用div来做网站时，总会用到列表，但在显示效果时前面总是会有一个小黑点，这个令很多人头痛，但又找不到要源，我们可以用以下方法来清除。

## 清除列表项目符号的方法

### 1. 在CSS中写入代码

找到相关性的CSS，在 `.li` 和 `.ul` 下写入 `list-style:none;` 当然有的会这样来写 `list-style-type:none`，这种写法特别是在一些CMS中最常见。

### 2. 在页面head部分写入代码

```html
<style type="text/css">
  list-style:none;
</style>
```

### 3. 在li、ul标签内添加样式

```html
<ul style="list-style-type:none">
  <li><a href="http://blog.csdn.net/business122">我的博客</a></li>
</ul>
```

当然这种是很麻烦的了。最简单的就是第一种了，通过CSS来控制，这个当然会有不错的效果了。

## 列表样式属性值

这几种方法都是通过设置 `list-style:none` 来设置的，有的是会用 `list-style-type`，下面我们来看一看它的属性。

- `none`：不使用项目符号
- `disc`：实心圆，默认值
- `circle`：空心圆
- `square`：实心方块
- `decimal`：阿拉伯数字
- `lower-roman`：小写罗马数字
- `upper-roman`：大写罗马数字
- `lower-alpha`：小写英文字母
- `upper-alpha`：大写英文字母

这些都可以来代替上文中的 `none`，想要什么样的都会有一个相应的对应。

## 列表样式实用技巧

### A. 运用CSS格式化列表符

```css
ul li {
  list-style-type: none;
}
```

### B. 将列表符换成图像

```css
ul li {
  list-style-image: url("images/icon.gif");
  list-style-type: none;
}
```

### C. 左对齐列表

```css
ul {
  margin: 0;
  list-style-type: none;
}
```

### D. 给列表添加背景色

```css
ul {
  margin: 0;
  list-style-type: none;
}

ul li {
  background: #CCC;
}
```

### E. 给列表添加鼠标悬停背景变色效果

```css
ul {
  margin: 0;
  list-style-type: none;
}

ul li a {
  display: block;
  width: 100%;
  background: #ccc;
}

ul li a:hover {
  background: #999;
}
```

说明：`display:block;` 这一行必须要加的，这样才能块状显示！

### F. 列表元素水平排列

关键点是使用 `float:left`：

```css
ul {
  width: 100%;
  list-style-type: none;
}

ul li {
  margin-right: 10px;
  float: left;
}
```
