---
title: CSS 基础知识复习总结
category: 前端
tags:
  - CSS
cover: https://cdn.pixabay.com/photo/2016/11/30/20/44/computer-1873831_1280.png
---

# CSS 基础知识复习总结

## 一、基础选择器

### 1. 标签选择器

标签选择器：写上标签名

```css
p {
  color: green;
}

div {
  color: yellow;
}
```

### 2. 类选择器

类选择器口诀: 样式.定义 结构class调用 一个或多个 开发最常用

```css
.red {
    color: red;
}

.star-sing {
  color: green;
}

.memeda {
    color: yellow;
}
```

### 3. id选择器

id选择器的口诀: 样式#定义, 结构id调用, 只能调用一次, 别人切勿使用

```css
#man {
 color: red;
}
```

### 4. 通配符选择器

可以匹配任意类型的HTML元素

```css
* {
    color: red;
}

/* 这里把 html body div span li 等等的标签都改为了红色 */
```

## 二、复合属性

复合属性: 简写的方式 节约代码

### 1. 字体属性

```css

/* font: font-style font-weight font-size/line-height font-family; */
font: italic 700 16px 'Microsoft yahei';
font: 20px '黑体';
font-family: 'Microsoft yahei';
font-size: 16px;font-style: italic;
font-weight: 700;
```

## 三、样式表

### 1. 内部样式表

所谓内部样式表, 就是在html页面内部写样式, 但是是单独写到style标签内部.

### 2. 行内样式表

```html
<p style="color: red; font-size: 20px;">Hello World</p>
```

### 3. 外部样式表

html head标签内link引入

```html
<link rel="stylesheet" href="style.css">
```

## 四、元素选择器

在CSS3中包含了四种组合方式:

- 后代选择器 (以空格分隔)
- 子元素选择器 (以大于>号分隔)
- 相邻兄弟选择器 (以加号+分隔)
- 普通兄弟选择器 (以波浪号~分隔)

### 1. 后代选择器

后代选择器(descendant selector)又称为包含选择器。
后代选择器可以选择作为某元素后代的元素。
在后代选择器中, 规则左边的选择器一端包括两个或多个用空格分隔的选择器。选择器之间的空格是一种结合符(combinator)。

每个空格结合符可以解释为"...在...找到"，"...作为...的一部分"，"...作为...的后代"，但是要求必须从右向左读选择器。

```css
/* 实例选取所有<em>元素插入到<h1>元素中 */
h1 em {
  color: red;
}
```

因此,h1 em选择器可以解释为"作为h1元素后代的任何em元素"。如果要从左向右读选择器, 可以换成以下说法："包含em的所有h1会把以上样式应用到该em"。

### 2. 子元素选择器

与后代选择器相比, 子元素选择器(Child selectors)只能选择作为某元素子元素的元素。

```css
/* 选择了<div>元素中所有直接子元素<p>: */
div > p {
  background-color: yellow;
}
```

### 3. 相邻兄弟选择器

相邻兄弟选择器(Adjacent sibling selector)可选择紧接在另一元素后的元素, 且二者有相同父元素。
如果需要选择紧接在另一个元素后的元素, 而且二者有相同的父元素, 可以使用相邻兄弟选择器(Adjacent sibling selector)。

```css
/* 选取了所有位于<div>元素后的第一个<p>元素 */
div + p {
  background-color: yellow;
}
```

### 4. 后续兄弟选择器

后续兄弟选择器选取所有指定元素之后的相邻兄弟元素。

```css
/* 选取了所有<div>元素之后的所有相邻兄弟元素<p>: */
div ~ p {
  background-color: yellow;
}
```

### 5. 并集选择器(选择器分组)

1. 约定的语法规范, 我们并集选择器喜欢竖着写
2. 逗号告诉浏览器, 规则中包含两个不同的选择器。如果没有这个逗号, 那么规则的含义将完全不同。参见后代选择器。
3. 一定要注意, 最后一个选择器不需要加逗号
在规则的最后一个声明后也加上分号是一个好习惯。在向规则增加另一个声明时, 就不必担心忘记再插入一个分号。

```css
/* 把熊大和熊二改为粉红色还有小猪一家改为红色 */
div,
p,
.pig li {
  color: red;
}
```

## 五、伪类和伪元素

| 选择器             | 示例                 | 示例说明                                      |
| :----------------- | :------------------- | :-------------------------------------------- |
| :checked           | input:checked        | 选择所有选中的表单元素                       |
| :disabled          | input:disabled       | 选择所有禁用的表单元素                       |
| :empty             | p:empty              | 选择所有没有子元素的p元素                    |
| :enabled           | input:enabled        | 选择所有启用的表单元素                       |
| :first-of-type     | p:first-of-type      | 选择的每个p元素是其父元素的第一个p元素       |
| :in-range          | input:in-range       | 选择元素指定范围内的值                       |
| :invalid           | input:invalid        | 选择所有无效的元素                           |
| :last-child        | p:last-child         | 选择所有p元素的最后一个子元素                |
| :last-of-type      | p:last-of-type       | 选择每个p元素是其母元素的最后一个p元素       |
| :not(selector)     | :not(p)              | 选择所有p以外的元素                          |
| :nth-child(n)      | p:nth-child(2)       | 选择所有p元素的父元素的第二个子元素          |
| :nth-last-child(n) | p:nth-last-child(2)  | 选择所有p元素倒数的第二个子元素             |
| :nth-last-of-type(n)| p:nth-last-of-type(2)| 选择所有p元素倒数的第二个为p的子元素        |
| :nth-of-type(n)    | p:nth-of-type(2)     | 选择所有p元素第二个为p的子元素              |
| :only-of-type      | p:only-of-type       | 选择所有仅有一个子元素为p的元素             |
| :only-child        | p:only-child         | 选择所有仅有一个子元素的p元素               |
| :optional          | input:optional       | 选择没有"required"的元素属性                |
| :out-of-range      | input:out-of-range   | 选择指定范围以外的值的元素属性              |
| :read-only         | input:read-only      | 选择只读属性的元素属性                      |
| :read-write        | input:read-write     | 选择没有只读属性的元素属性                  |
| :required          | input:required       | 选择有"required"属性指定的元素属性          |
| :root              | root                 | 选择文档的根元素                            |
| :target            | \#news:target        | 选择当前活动#news元素(点击URL包含锚的名字)   |
| :valid             | input:valid          | 选择所有有效值的属性                        |
| :link              | a:link               | 选择所有未访问链接                          |
| :visited           | a:visited            | 选择所有访问过的链接                        |
| :active            | a:active             | 选择正在活动链接                            |
| :hover             | a:hover              | 把鼠标放在链接上的状态                      |
| :focus             | input:focus          | 选择元素输入后具有焦点                      |
| :first-letter      | p:first-letter       | 选择每个p元素的第一个字母                   |
| :first-line        | p:first-line         | 选择每个p元素的第一行                       |
| :first-child       | p:first-child        | 选择器匹配属于任意元素的第一个子元素的p元素  |
| :before            | p:before             | 在每个p元素之前插入内容                     |
| :after             | p:after              | 在每个p元素之后插入内容                     |
| :lang(_language_)  | p:lang(it)           | 为p元素的lang属性选择一个开始值             |

## 六、元素显示模式

### 1. 块元素

常见的块级元素：

```
h1~h6, p, div, ul, ol, li等，其中div标签是最典型的块元素
```

#### 1.1 块元素特点

- 独占一行
- 高度宽度内外边距都可以控制
- 宽度默认是容器(父级宽度)的100%
- 是一个容器及盒子, 里面可以放行内或者块级元素

#### 1.2 注意

- 文字类的元素内不能使用块级元素
- `p`标签主要存放文字, 因此`p`里面不能放块级元素, 特别是不能放`div`
- 同理,`h1`标签等文字类块级标签, 里面也不能放其它块级元素

**示例**
显示模式之块级元素

```html
<style>
  div {
    /* width: 200px; */
    height: 200px;
    background-color: yellow;
  }
</style>
<div>比较霸道,自己独占一行</div> 瑟瑟发抖
<p>
  <div>这里有问题</div>
</p>
```

### 2. 行内元素(内联元素)

常见的行内元素

```
a, strong, b, em, i, del, s, ins, u, span等, 其中span标签是最典型的行内元素.
```

#### 2.1 行内元素特点

- 相邻行内元素在一行上, 一行可以显示多个
- 宽高直接设置是无效的
- 默认宽度就是它本身内容的宽度
- 行内元素只能容纳文本或者其它行内元素

#### 2.2 注意

- 链接里面不能再放链接
- 特殊情况链接`<a>`里面可以放块级元素, 但是给`<a>`转换一下块级模式(display: block)最安全

### 3. 行内块元素

在行内元素中有几个特殊的标签`<img>`,`<input>`,`<td>`, 它们**同时具有块元素和行内元素的特点**, 有些资料称它们为行内块元素

**行内块元素特点:**

- 和相邻行内元素(行内块)在一行上, 但是它们之间会有空白缝隙,**一行可以显示多个(行内元素特点)**
- 默认宽度就是它本身内容的宽度(行内元素特点)
- 高度、行高、外边距以及内边距都可以控制(块级元素特点)
- **行内块中间有缝隙**

**示例：**
显示模式之行内块元素(特殊情况)

```html
<style>
  input {
    width: 249px;
    height: 35px;
  }
</style>
<input type="text">
<input type="text">
```

### 4. 总结

| 元素模式   | 元素排列            | 设置样式        | 默认宽度         | 包含                    |
| :--------- | :------------------ | :-------------- | :--------------- | :---------------------- |
| 块级元素   | 一行只能放一个块级元素 | 可以设置宽高    | 容器的100%       | 容器级可以包含任何标签    |
| 行内元素   | 一行可以放多个行内元素 | 不可以直接设置宽高 | 它本身内容的宽度  | 容纳文本或者其它行内元素   |
| 行内块元素 | 一行可以放多个行内块元素 | 可以设置宽高    | 它本身内容的宽度  |                       |

### 5. 元素显示模式转换

- 转为块元素: display:block;
- 转为行内元素: display:inline;
- 转为行内块: display:inline-block;

### 6. 单行文字垂直居中

解决方案: 让文字的行高等于盒子的高度就可以让文字在当前盒子内垂直居中

当行文字垂直居中的原理

行高组成: 上空隙 + 文字本身高度 + 下空袭

简单理解: 行高的上空隙和下空隙把文字挤到中间了. 如果行高小于盒子高度, 文字会偏上, 反之偏下

## 七、CSS复合写法

示例: 背景复合写法
当使用简写属性时, 没有特定的书写顺序, 一般习惯约定顺序为:
**background: 背景颜色 背景图片地址 背景平铺 背景图像滚动 背景图片位置;**

```css
body {
  /* background-image: url('images/bg.jpg');
  background-repeat: no-repeat;
  background-position: center top; */

  /* 把背景图片固定住 */

  /* background-attachment: fixed;
  background-color: black; */
  background: black url('images/bg.jpg') no-repeat fixed center top;
  color: #fff;
  font-size: 20px;
}
```

## 八、CSS三大特性

### 1. 层叠性

相同选择器给设置相同的样式, 此时一个样式就会覆盖(层叠)另一个冲突的样式, 层叠性主要解决样式冲突的问题.

**层叠性原则:**

- 样式冲突: 遵循的原则时就近原则, 哪个样式离结构近(一般执行顺序从上往下), 就执行哪个样式
- 样式不冲突: 不会层叠

**示例:**

```css
div {
  color: red;
  font-size: 12px;
}

div {
  color: yellow;
}
```

上述代码最终显示效果为

```css
div {
  color: yellow;
  font-size: 12px;
}
```

总结: 后来者居上, 后面覆盖前面

### 2. 继承性

- 子标签会继承父标签的某些样式, 如文本颜色和字号. 简单的理解就是子承父业.
比如img外面套div, 通过div改样式来达到控制图片的目的.

- 恰当的使用继承可以简化代码, 降低CSS样式的复杂性.

- 子元素可以继承的父元素样式(text-、font-、line-这些元素开头的可以继承, 以及color属性, 高度宽度内外边距不会继承).

**示例**
CSS继承性

```html
<style>
  div {
    color: yellow;
    font-size: 14px;
  }
</style>
<div>
  <p>龙生龙,凤生凤,老鼠生的孩子会打洞</p>
</div>
```

- 行高的继承性
行高可以跟单位也可以不跟单位

#### 2.1 不跟单位

```css
body{
  font:12px/1.5 "Microsoft YaHei"
}
```

如果子元素没有行高, 则会继承父元素的行高为1.5, 此时子元素的行高是: 当前子元素的文字大小*1.5

#### 2.2 跟单位

```css
body{
  font:12px/24px "Microsoft YaHei"
}
```

如果子元素没有行高, 子元素的行高为24px

总结: body行高1.5这样的写法最大的优势就是里面的子元素可以根据自己文本大小自动调整行高。

**示例**
行高的继承

```html
<style>
  body {
    color: red;

    /* font: 12px/24px 'Microsoft YaHei'; */
    font: 12px/1.5 'Microsoft YaHei';
  }

  div {
    /* 子元素继承了父元素body的行高1.5 */

    /* 这个1.5就是当前元素文字大小font-size的1.5倍，所以当前div的行高就是21像素 */
    font-size: 14px;
  }

  p {
    /* 1.5 * 16 = 24当前的行高 */
    font-size: 16px;
  }

  /*
    li没有手动指定文字大小则会继承父亲的文字大小 body 12px所以li的文字大小为12px.
    当前li的行高就是 12 * 1.5 = 18
  */
</style>
<div>红色记忆</div>
<p>红色记忆</p>
<ul>
  <li>我没有指定文字大小</li>
</ul>

```

### 3. 优先级

当同一个元素指定多个选择器就会有优先级的产生

- 选择器相同, 则执行层叠性
- 选择器不同, 则根据**选择器权重**执行

#### 3.1 选择器权重

| 选择器             | 选择器权重 |
| :----------------- | :--------- |
| 继承或者*          | 0,0,0,0    |
| 元素选择器         | 0,0,0,1    |
| 类选择器、伪类选择器 | 0,0,1,0    |
| ID 选择器          | 0,1,0,0    |
| 行内样式 style=''  | 1,0,0,0    |
| !important(重要的) | ∞ 无穷大   |

**示例:**
CSS 优先级

```html
<style>
  .test {
    color: red;
  }

  div {
    color: yellow !important;
  }

  #demo {
    color: green;
  }
</style>
<div class="test" id="demo" style="color: purple">你笑起来真好看</div>
```

#### 3.2 优先级注意点

- 权重是由4组数字组成, 但是不会有进位
- 可以理解为类选择器永远大于元素选择器,ID选择器永远大于类选择器, 以此类推
- 等级判断从左向右, 如果某一位数值相同, 则判断下一位数值
- 简单记忆法: 通配符和继承权重为0, 标签选择器为1, 类(伪类)选择器为100, 行内样式为1000,!important无穷大

**示例:**
CSS权重注意点

```html
<style>
  /* 父亲的权重是100 */
  #father {
    color: red !important;
  }

  /* p继承的权重为0 */

  /* 所以以后我们看标签到底执行那个样式,就先看这个标签有没有直接被选出来 */
  p {
    color: yellow;
  }

  body {
    color: red;
  }

  /* a链接浏览器默认指定了一个样式 蓝色的 有下划线 a{color: blue;} */
  a {
    color: green;
  }
</style>
<div id="father">
  <p>你还是很好看</p>
</div>
<a href="#">我是单独的样式</a>
```

#### 3.3 权重叠加

- div ul li ------------> 0,0,0,1 + 0,0,0,1 + 0,0,0,1 = 0,0,0,3
- .nav ul li -----------> 0,0,1,0 + 0,0,0,1 + 0,0,0,1 = 0,0,1,2
- a:hover --------------> 0,0,0,1 + 0,0,1,0 = 0,0,1,1
- .nav a ---------------> 0,0,1,0 + 0,0,0,1 = 0,0,1,1

如果是复合选择器, 则会有权重叠加, 需要计算权重

**示例:**
权重的叠加

```html
<style>
  /* 复合选择器会有权重叠加的问题 */

  /* 权重虽然会叠加,但是永远不会有进位 */

  /* ul li 权重 0,0,0,1 + 0,0,0,1 = 0,0,0,2 */
  ul li {
    color: green;
  }

  /* li 的权重是 0,0,0,1 */
  li {
    color: red;
  }

  /* .nav li 权重 0,0,1,0 + 0,0,0,1 = 0,0,1,1 */
  .nav li {
    color: yellow;
  }
</style>
<ul class="nav">
  <li>大猪蹄子</li>
  <li>大肘子</li>
  <li>猪尾巴</li>
</ul>
```

## 九、盒子模型(Box Model)

### 1. 标准盒模型(w3c标准)

所谓盒子模型: 就是把HTML页面中的布局元素看作是一个矩形的盒子, 也就是一个盛放内容的容器。

### 标准盒子模型组成

外边距(margin) + 边框(border) + 内边距(padding) + 实际内容(content)

#### 1.1 margin(外边距)

控制盒子与盒子之间的距离

##### 外边距典型应用(水平居中)

外边距可以让块级元素水平居中, 但是必须要满足两个条件：
**1. 盒子必须指定宽度**
**2. 盒子左右的外边距都设置为auto**

```css
header {
  width: 960px;
  margin: 0 auto;
}
```

常见的写法, 以下三种都可以:

- margin-left: auto; margin-right: auto;
- margin: auto;
- margin: 0 auto;

**注意:** 以上方法是让块级元素水平居中, 行内元素或者行内块元素水平居中给其父元素添加text-align: center即可。

##### 外边距合并 - 嵌套块元素塌陷

外边距合并: 使用margin定义块元素的垂直外边距时, 可能会出现外边距的合并。
嵌套块元素垂直外边距的塌陷: 对于两个嵌套关系(父子关系)的块元素, 父元素和子元素同时有上外边距, 此时父元素会塌陷较大的外边距值。

解决方案:

1. 可以为父元素定义上边框
2. 可以为父元素定义上内边距
3. 可以为父元素添加overflow: hidden
还有其它方法: 比如浮动、固定、绝对定位的盒子不会有塌陷问题

```html
<style>
.father {
  /* border: 1px solid transparent; */

  /* padding: 1px; */
  overflow: hidden;
  width: 400px;
  height: 400px;
  margin-top: 50px;
  background-color: purple;
}

.son {
  width: 200px;
  height: 200px;
  margin-top: 100px;
  background-color: pink;
}
</style>
<div class="father">
  <div class="son"></div>
</div>
```

#### 1.2 border

控制外边距与内边距之间的距离

```css
/* 合并相邻的边框 */
border-collapse: collapse;
```

#### 1.3 padding(内边距)

控制内容与盒子边框之间的距离。
如果盒子本身没有指定width/height属性, 则此时padding不会撑开盒子大小。

### 总结

1. padding和border会影响盒子实际大小(增大盒子)
2. 行内元素为了照顾兼容性, 尽量只设置左右的内外边距(上下不起作用), 如果需要上下边距把行内元素转换为块元素和行内块元素再设置
3. 在标准盒模型中,width和height指的是内容区域的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸, 但是会增加元素框的总尺寸.

### 2. 怪异盒模型

IE5.X和6在怪异模式中使用自己的非标准模型。这些浏览器的width属性不是内容的宽度, 而是内容、内边距和边框的宽度的总和.

### 3. box-sizing

```css
box-sizing: content-box|border-box|inherit:
```

1. content-box：指定盒模型为W3C标准模型, 设置border、padding会增加元素width与height的尺寸, 即border与padding相当于是元素的"殖民地", 元素的"土地"、尺寸会增加, 为向外延伸.

2. border-box：指定盒模型为IE模型(怪异模式), 设置border、padding不会影响元素width与height的尺寸, 即border与padding由元素已设空间转变. 即空间还是这个空间, 只是将部分空余的地方, 转变成了其它空间用法而已, 为内部转变.

#### 3.1 设置border与padding与被影响属性值的关系公式

①. W3C标准盒模型(conten-box值)【width/height被改变, 扩展】
**width = content + border + padding;**

其中,width为浏览器视窗呈现尺寸,content为在CSS中设置的元素的width;

②. IE怪异盒模型(border-box值)【content被改变, 压缩】
**content = width - border - padding;**

其中,width为在CSS中设置的元素的width;

**总之:**
1.W3C标准盒模型(content-box),border、padding的设置会破坏元素宽高, 必须得重新计算, 非常麻烦(除了在IE浏览器, 默认就是标准盒模型, 所以可以用box-sizing来转换);

2.IE(怪异)盒模型(border-box),border、padding的设置不会影响元素的宽高, 这非常实用(且因为IE盒模型不是标准, 所以才有box-sizing这个标准属性来设置, 将它标准化)【IE6/5是怪异模型,IE7开始是标准盒模型】

## 十、布局方式

**网页布局第一准则:** 多个块元素纵向排列找标准流, 多个块级元素横向排列找浮动

### 1. 标准流(普通流/文档流)

所谓标准流: 就是标签按照规定好的默认方式排列

1. 块级元素会独占一行, 从上到下顺序排列.
2. 行内元素会按照顺序, 从左到右排列, 碰到父元素边缘则自行换行.

### 2. 浮动布局(float)

**float**属性用于创建浮动框, 将其移动到一边, 直到左边缘或右边缘触及包含块或另一个浮动框的边缘

#### 2.1. 浮动特性

1. 浮动元素会脱离标准流的控制(浮)移动到指定位置(动)(俗称脱标).
2. 浮动的盒子不再保留原先的位置(浮动的元素会按照属性值一行内显示并且元素顶部对齐)
**注意: 浮动的元素是相互贴靠在一起的, 不会有缝隙, 如果父级宽度装不下这些浮动的盒子, 多出的盒子会另起一行对齐**
3. 浮动的元素会具有行内块元素相似的特性.
**任何元素都可以浮动。不管原先是什么模式的元素, 添加浮动之后具有行内块元素相似的特性.**
**如果行内元素有了浮动, 则不需要转换块级/行内块元素就可以直接给高度和宽度**

#### 2.2 浮动布局注意点

1. 浮动元素经常和标准流父级搭配使用
为了约束浮动元素位置, 我们网页布局一般采用的策略是:
**先用标准流的父元素排列上下位置, 之后内部子元素采取浮动排列左右位置, 符合网页布局第一准则**
2. 一个元素浮动了, 理论上其余的兄弟元素也要浮动
一个盒子里面有多个盒子, 如果其中一个盒子浮动了, 那么其它兄弟也应该浮动, 以防引起问题.
**浮动的盒子只会影响浮动盒子后面的标准流, 不会影响前面的标准流**

#### 2.3 清除浮动的方法

**清除浮动的本质是清除浮动元素脱离标准流造成的影响**
如果父盒子本身有高度, 则不需要清除浮动
清除浮动之后, 父级就会根据浮动的子盒子自动检测高度, 父级有了高度, 就不会影响下面的标准流了
clear: both;
清除浮动的策略是: 闭合浮动
**只让浮动在父盒子内部影响, 不影响父盒子外面的其它盒子**

##### 1. 额外标签法也称隔墙法, 是W3C推荐的做法

在浮动元素末尾添加一个空的标签, 例如:

```html
<div style="clear:both"></div>
```

**注意:** 要求这个新的空标签必须是块级元素

```html
<style>
.box {
  width: 800px;
  border: 1px solid blue;
  margin: 0 auto;
}
.item{
  float: left;
  width: 300px;
  height: 200px;
  background-color: purple;
}
.clear {
  clear: both;
}
</style>
<div class="box">
  <div class="item"></div>
  <div class="item"></div>
  <!-- 这个新增的盒子要求必须是块级元素不能是行内元素 -->
  <div class="clear"></div>
</div>
```

##### 2. 父级添加overflow属性

**缺点: 无法显示溢出的部分**

```html
<style>
.box {
  /* 清除浮动 */
  overflow: hidden;
  width: 800px;
  border: 1px solid blue;
  margin: 0 auto;
}
.item{
  float: left;
  width: 300px;
  height: 200px;
  background-color: red;
}
</style>
<div class="box">
  <div class="item"></div>
  <div class="item"></div>
</div>
```

##### 3. 父级添加after伪元素

```css
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;  /* IE6、7专有 */
}
```

```html
<style>
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;  /* IE6、7专有 */
}
.box {
  width: 800px;
  border: 1px solid blue;
  margin: 0 auto;
}
.item{
  float: left;
  width: 300px;
  height: 200px;
  background-color: red;
}
</style>
<div class="box clearfix">
  <div class="item"></div>
  <div class="item"></div>
</div>
```

##### 4. 父级添加双伪元素

```css
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
```

```html
<style>
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.box {
  width: 800px;
  border: 1px solid blue;
  margin: 0 auto;
}
.item{
  float: left;
  width: 300px;
  height: 200px;
  background-color: red;
}
</style>
<div class="box clearfix">
  <div class="item"></div>
  <div class="item"></div>
</div>
```

### 3. 定位布局(position)

#### 3.1 定位方式

##### 3.1.1 静态定位`position:static`

静态定位是元素的默认定位方式, 无定位的意思。

静态定位按照标准流特性摆放位置, 它没有边偏移。

##### 3.1.2 相对定位`position:relative`

1. 相对定位是元素在移动位置的时候, 是相对于**它原来的位置**来移动
2. 原来在标准流的位置继续占有, 后面的盒子仍然以标准流的方式对待它(不脱标, 继续保留原来位置)

##### 3.1.3 绝对定位`position:absolute`

绝对定位是元素在移动位置的时候, 是相对于它祖先元素来说的

1. 如果没有祖先元素或者祖先元素没有定位, 则以浏览器为准定位(Document文档)
2. 如果祖先元素有定位(相对、绝对、固定定位), 则以最近一级的有定位祖先元素为参考点移动位置
3. 绝对定位不在占有原先的位置(脱标)

##### 3.1.4 固定定位`position:fixed`

固定定位是元素固定于浏览器可视区的位置。主要使用场景: 可以在浏览器页面滚动时元素的位置不会改变

1. 以浏览器的可视窗口为参照点移动
2. 跟父元素没有任何关系
3. 不随滚动条滚动而滚动

##### 3.1.5 粘性定位`position:sticky`

粘性定位可以被认为是相对定位和固定定位的混合

1. 以浏览器的可视窗口为参照点移动元素(固定定位特点)
2. 粘性定位占有原先的位置(相对定位特点)
3. 必须添加top、left、right、bottom其中一个才有效

#### 3.2 定位叠放次序:`z-index`

1. 如果属性值相同, 则按照书写顺序, 后来者居上
2. 数字后面不能加单位
3. 只有定位的盒子才有`z-index`属性

#### 3.3 定位特殊特性

绝对定位和固定定位也和浮动类似

1. 行内元素添加绝对定位或者固定定位, 可以直接设置宽高
2. 块级元素添加绝对定位或者固定定位, 如果不给宽高, 默认大小是内容大小

##### 3.3.1 脱标的盒子不会触发外边距塌陷

浮动元素、绝对定位、固定定位的元素都不会触发外边距合并的问题

##### 3.3.2 绝对定位和固定定位会完全压住盒子

1. 浮动元素只会压住它下面标准流的盒子, 但是不会压住下面标准流盒子里面的文字(图片)
2. 绝对定位和固定定位会压住下面标准流所有的内容
3. 浮动之所以不会压住文字是因为浮动产生的目的最初是为了做文字环绕效果的。文字会围绕浮动元素

## 十一、CSS3

### 1. 圆角(border-radius)

```css
border-radius: length;
```

radius半径(圆的半径)原理:(椭)圆与边框的交集形成圆角效果

### 2. 盒阴影(box-shadow)

```css
box-shadow: 水平位置 垂直位置 模糊距离 大小 颜色 内/外;
```

**注意:**

1. 默认是外阴影(outset)但是不可以写这个单词, 否则导致阴影无效
2. 盒子阴影不占用空间, 不会影响其它盒子排列

### 3. 文字阴影(text-shadow)

```css
text-shadow: 水平位置 垂直位置 模糊距离 颜色
```

### 4. 过渡(transition)

```css
transition: 要过渡的属性 花费时间 运动曲线 何时开始;
```

属性: 想要变化的css属性, 宽高、背景颜色、内外边距都可以。如果想要所有的属性都变化过渡, 写一个all就可以了

**谁做过渡给谁加**

### 5. 转换(transform)

转换(transform)是CSS3中具有颠覆性的特性之一, 可以实现元素的位移、旋转、缩放等效果

#### 5.1 2D转换

**二维坐标系**
2D转换是改变标签在二维平面的位置和形状的一种技术
以浏览器为例, 左上角为原点, 水平向右为x轴, 垂直向下为y轴

##### 5.1.1 移动(translate)

1. 语法

```css
transform: translate(x,y); /* 或者分开写 */
transform: translateX(n);
transform: translateY(n);
```

2. 重点

- 不会影响到其他元素的位置
- translate中的百分比单位是相当于自身元素的宽高
- 对行内标签没有效果

##### 5.1.2 旋转(rotate)

1. 语法

```css
transform: rotate(度数);
```

2. 重点

- rotate里面跟度数, 单位是deg比如rotate(45deg)
- 角度为正时顺时针旋转, 负时逆时针旋转
- 默认旋转的中心点是元素的中心点

##### 5.1.3 2D转换中心点(transform-origin)

我们可以设置元素转换的中心点

1. 语法

```css
transform-origin: x,y;
```

2. 重点

- 注意后面的参数x和y用空格隔开
- xy默认转换的中心点是元素的中心点
- 还可以给xy设置像素或者方位名词(top bottom left right center)

##### 5.1.4 缩放(scale)

1. 语法

```css
transform: scale(x,y);
```

2. 重点

- 里面写的是数字不跟单位, 意思是倍数的意思 1就是1倍,2就是2倍
- 不影响其它盒子, 可以设置缩放的中心点

**同时有位移和其他属性的时候记得要将位移放到最前面**

#### 5.2 3D转换

三维坐标系其实就是指立体空间, 立体空间是由3个轴共同组成的

x轴: 水平向右  **注意:x右边是正值, 左边是负值**
y轴: 垂直向下  **注意:y下面是正值, 上面是负值**
z轴: 垂直屏幕  **注意:z往外面是正值, 往里面是负值**

##### 5.2.1 3D位移 translate3d(x,y,z)

1. 语法

```css
transform: translate3d(x,y,z);
```

2. 重点
z轴的单位我们一般写px

##### 5.2.2 3D旋转 rotate3d(x,y,z,angle)

对于元素旋转的方向的判断使用左手准则

左手准则:

- 左手的手拇指指向x轴的正方向, 其余手指的弯曲方向就是该元素沿着x轴旋转的方向
- 左手的拇指指向y轴的正方向, 其余手指弯曲的方向就是该元素沿着y轴旋转的方向(正值)

##### 5.2.3 3D透视 perspective(n)

在2D平面产生近大远小视觉立体, 但是只是效果是二维的

- 如果想要在网页产生3D效果需要透视(理解成3D物体投影在2D平面内)
- 模拟人类的视觉位置, 可认为安排一只眼睛去看
- 透视我们也称为视距: 视距就是人的眼睛到屏幕的距离
- 距离视觉点越近的电脑平面成像越大, 越远成像越小
- 透视的单位是像素

1. 语法

```css
perspective(n)
```

2. 重点

- 透视写在被观察元素的父盒子上面

##### 5.2.4 3D呈现 transform-style

- 控制子元素是否开启三维立体环境
- `transform-style:flat`子元素不开启3D立体空间(默认)
- `transform-style:preserve-3d`, 子元素开启立体空间
- 代码要写给父级, 但是会影响的是子盒子
- 这个属性很重要

### 6. 动画(animation)

#### 6.1 制作动画步骤

1. 用@keyframes定义动画(类似于定义类选择器)

```css
@keyframes 动画名称{
  0%{
    width:100px;
  }
  100%{
    width:200px;
  }
}
@keyframes move {
  from {
    transform: translateX(0px);
  }

  to {
    transform: translateX(100px);
  }
}
```

#### 动画序列

- 0%是动画的**开始**,100%是动画的**完成**, 这样的规则就是动画序列.
- 在**@keyframes**中规定某项CSS样式, 就能创建由当前样式逐渐改为新样式的动画效果.
- 动画是使元素从一种样式逐渐变化成为另一种样式的效果. 可以改变任意多样式任意多**次数**.
- 使用百分比来规定变化发生的时间, 使用关键字**from**和**to**, 等同于**0%**和**100%**

2. 使用(调用动画)

```css
div{
  width:100px;
  height:100px;
  background-color:red;
  /*调用动画*/
  animation-name:动画名称;
  /*持续时间*/
  animation-duration:持续时间;
}
```

#### 6.2 动画属性

| 属性                     | 描述                                                     | CSS |
| :----------------------- | :------------------------------------------------------- | :-- |
| @keyframes               | 规定动画                                                 | 3   |
| animation                | 所有动画属性的简写属性                                   | 3   |
| animation-name           | 动画名称                                                 | 3   |
| animation-duration       | 动画完成时间 默认是0                                     | 3   |
| animation-timing-function | 动画运动曲线. 默认是"ease"                               | 3   |
| animation-delay          | 动画何时开始. 默认是0                                    | 3   |
| animation-iteration-count | 动画播放次数. 默认是1, 还有infinite(无限循环)            | 3   |
| animation-direction      | 动画是否在下一周期反方向播放. 默认是"normal","alternate逆向播放" | 3   |
| animation-play-state     | 动画是否正在运行或暂停. 默认是"running", 还有"pause"      | 3   |
| animation-fill-mode      | 动画结束后的状态, 保持"forwards", 回到起始"backwards"(默认) | 3   |

```html
<style>
@keyframes move {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(1000px, 0);
  }
}
div {
  width: 100px;
  height: 100px;
  background-color: red;
  /* 动画名称 */
  animation-name: move;
  /*持续时间*/
  animation-duration: 2s;
  /* 运动曲线 */
  animation-timing-function: ease;
  /* 何时开始 */
  animation-delay: 1s;
  /* 重复次数 */
  /* animation-iteration-count: infinite; */
  /* 是否反方向 */
  /* animation-direction: alternate; */
  animation-fill-mode: forwards;
}

div:hover {
  animation-play-state: paused;
}
</style>
<div></div>
```

#### 6.3 动画属性简写

```css
/* animation:动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画开始或者结束状态 */
animation: move 5s linear 2s infinite alternate;
```

**注意:**

- 前两个属性`animation-name`和`animation-duration`必须写.
- 简写属性里面不包含`animation-play-state`
- 暂停动画:`animation-play-state:paused`, 经常配合鼠标经过等其它配合使用.
- 想要动画走回来而不是直接跳回来`animation-direction: alternate`.
- 盒子动画结束后, 停在结束位置`animation-fill-mode: forwards`.
