---
title: VSCode中使用Emmet神器快速编写HTML代码
category: VS Code
tags:
  - VS Code
cover: https://cdn.pixabay.com/photo/2020/08/07/09/23/flower-5470156_960_720.jpg
---

Emmet 的前身是大名鼎鼎的 Zen coding. 它使用仿 CSS 选择器的语法来生成代码, 大大提高了 HTML/CSS 代码编写的速度, 而且作为一款插件能够支持大部分的代码编辑器, VSCoder 内置了 Emmet 插件.

请看下面演示:

![94a63945abace17af370ff50f07cf9c5](http://www.weitusi.com/upload/default/20181206/94a63945abace17af370ff50f07cf9c5.gif)
编码演示

## 一、快速编写 HTML 代码

## 1.  初始化

**Emmet初始化**

HTML 文档需要包含一些固定的标签, 比如 `<html>`、`<head>`、`<body>` 等, 现在你只需要 1 秒钟就可以输入这些标签. 比如输入 "!" 或"html:5", 然后按 Tab 键:

![c56f2ba2d1f238f23837b910f4f3f854](http://www.weitusi.com/upload/default/20181206/c56f2ba2d1f238f23837b910f4f3f854.gif)

html:5 或!: 用于 HTML5 文档类型 html:xt: 用于 XHTML 过渡文档类型 html:4s: 用于 HTML4 严格文档类型

## 2.  轻松添加类、id、文本和属性

**添加属性**

连续输入元素名称和 ID, Emmet 会自动为你补全, 比如输入 p#foo:

![d9280b67e89e9e74cf8e1a61588b05ef](http://www.weitusi.com/upload/default/20181206/d9280b67e89e9e74cf8e1a61588b05ef.gif)

连续输入类和 id, 比如 p.bar#foo, 会自动生成:

Html 代码

``` html
<p class="bar" id="foo"></p>
```

下面来看看如何定义 HTML 元素的内容和属性. 你可以通过输入 h1{foo} 和 a[href=#], 就可以自动生成如下代码:

Html 代码

```html
<h1>foo</h1>
<a href="#"></a>
```

![587b97f31155ead8cb58a617780b8015](http://www.weitusi.com/upload/default/20181206/587b97f31155ead8cb58a617780b8015.gif)

## 3.  嵌套

**嵌套元素**

现在你只需要 1 行代码就可以实现标签的嵌套.

>: 子元素符号, 表示嵌套的元素 +: 同级标签符号 ^: 可以使该符号前的标签提升一行

效果如下图所示:

![beda79cf50362b56e5c07e15021800db](http://www.weitusi.com/upload/default/20181206/beda79cf50362b56e5c07e15021800db.gif)

## 4.  分组

**元素分组**

你可以通过嵌套和括号来快速生成一些代码块, 比如输入 (.foo>h1)+(.bar>h2), 会自动生成如下代码:

Html 代码

```html
<div class="foo">
    <h1></h1>
</div>
<div class="bar">
    <h2></h2>
</div>
```

![4b4c46b7995ada2b7f2f0d3bc18bca7d](http://www.weitusi.com/upload/default/20181206/4b4c46b7995ada2b7f2f0d3bc18bca7d.gif)

## 5.  隐式标签

**隐式标签**

声明一个带类的标签, 只需输入 div.item, 就会生成 <div class="item"></div>.

在过去版本中, 可以省略掉 div, 即输入.item 即可生成 <div class="item"></div>.

![3e9f6ea25b399a21c6bc7100a7e83e11](http://www.weitusi.com/upload/default/20181206/3e9f6ea25b399a21c6bc7100a7e83e11.gif)

下面是所有的隐式标签名称:

li: 用于 ul 和 ol 中 tr: 用于 table、tbody、thead 和 tfoot 中 td: 用于 tr 中 option: 用于 select 和 optgroup 中

## 6.  定义多个元素

**多元素定义**

要定义多个元素, 可以使用 *符号. 比如, ul>li*3 可以生成如下代码:

Html 代码

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

![3a14ab6c72ee0f2aaf351e9dfab374f6](http://www.weitusi.com/upload/default/20181206/3a14ab6c72ee0f2aaf351e9dfab374f6.gif)

## 7.  定义多个带属性的元素

**带属性的多元素**

如果输入 ul>li.item$*3, 将会生成如下代码:

Html 代码

```html
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
</ul>
```

![64817b334ed9392cd3301865073a9f79](http://www.weitusi.com/upload/default/20181206/64817b334ed9392cd3301865073a9f79.gif)

## 二、CSS 缩写

## 1.  值

**CSS值**

比如要定义元素的宽度, 只需输入 w100, 即可生成

Css 代码

``` css
width: 100px;
```

![492e0bb3adfb6798f62f00303fb60777](http://www.weitusi.com/upload/default/20181206/492e0bb3adfb6798f62f00303fb60777.gif)

除了 px, 也可以生成其他单位, 比如输入 h10p+m5e, 结果如下:

Css 代码

```css
height: 10%;
margin: 5em;
```

单位别名列表:

p 表示 % e 表示 em x 表示 ex

## 2.  附加属性

**附加属性**

可能你之前已经了解了一些缩写, 比如 @f, 可以生成:

Css 代码

```css
@font-face {
   font-family:;
   src:url();
}
```

一些其他的属性, 比如 background-image、border-radius、font、@font-face, text-outline、text-shadow 等额外的选项, 可以通过 "+" 符号来生成, 比如输入 @f+, 将生成:

Css 代码

```css
@font-face {
    font-family: FontName;
    font-style: normal;
    font-weight: normal;
    src: url('FileName.eot');
    src: url('FileName.eot?#iefix') format('embedded-opentype'),
    url('FileName.woff') format('woff'),
    url('FileName.ttf') format('truetype'),
    url('FileName.svg#FontName') format('svg');
}
```

![3224789bbd898b45ffa40b605a05146c](http://www.weitusi.com/upload/default/20181206/3224789bbd898b45ffa40b605a05146c.gif)

## 3.  模糊匹配

**模糊匹配**

如果有些缩写你拿不准, Emmet 会根据你的输入内容匹配最接近的语法, 比如输入 ov:h、ov-h、ovh 和 oh, 生成的代码是相同的:

Css 代码

```css
overflow: hidden;
```

![de5517ac374532e8eccc2bcb56725075](http://www.weitusi.com/upload/default/20181206/de5517ac374532e8eccc2bcb56725075.gif)

## 4.  供应商前缀

**供应商前缀**

如果输入非 W3C 标准的 CSS 属性, Emmet 会自动加上供应商前缀, 比如输入 trs, 则会生成:

Css 代码

```css
transform: ;
```

![4147bb02930f01301e15ce8911b03cf3](http://www.weitusi.com/upload/default/20181206/4147bb02930f01301e15ce8911b03cf3.gif)

你也可以在任意属性前加上 "-" 符号, 也可以为该属性加上前缀. 比如输入 - super-foo:

Css 代码

```css
-webkit-super-foo: ;
-moz-super-foo: ;
-ms-super-foo: ;
-o-super-foo: ;
super-foo: ;
```

如果不希望加上所有前缀, 可以使用缩写来指定, 比如 - wm-trf 表示只加上 - webkit 和 - moz 前缀:

Css 代码

```css
transform: ;
```

前缀缩写如下:

w 表示 -webkit- m 表示 -moz- s 表示 -ms- o 表示 -o-

## 5.  渐变

**渐变**

输入 lg(left, #fff 50%, #000), 会生成如下代码:

Css 代码

```css
background-image: -webkit-gradient(linear, 0 0, 100% 0, color-stop(0.5, #fff), to(#000));
background-image: linear-gradient(left, #fff 50%, #000);
background-image: linear-gradient(left, #fff 50%, #000);
background-image: linear-gradient(left, #fff 50%, #000);
background-image: linear-gradient(left, #fff 50%, #000);
```

![c00dd04c18a0e3b003c0c454fd277102](http://www.weitusi.com/upload/default/20181206/c00dd04c18a0e3b003c0c454fd277102.gif)

## 三、附加功能

**Lorem ipsum文本**

Lorem ipsum 指一篇常用于排版设计领域的拉丁文文章, 主要目的是测试文章或文字在不同字型、版型下看起来的效果. 通过 Emmet, 你只需输入 lorem 或 lipsum 即可生成这些文字. 还可以指定文字的个数, 比如 lorem10, 将生成:

引用 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero delectus.

![89babf9bb0c1a77dac9162e7536f70ae](http://www.weitusi.com/upload/default/20181206/89babf9bb0c1a77dac9162e7536f70ae.gif)

## 四、定制

你还可以定制 Emmet 插件:

添加新缩写或更新现有缩写, 可修改 snippets.json 文件 更改 Emmet 过滤器和操作的行为, 可修改 preferences.json 文件 定义如何生成 HTML 或 XML 代码, 可修改 syntaxProfiles.json 文件

## 五、基本语法

语法及标签缩写方法如下:

后代:>

缩写:nav>ul>li

``` html
<nav>
  <ul>
    <li></li>
  </ul>
</nav>
```

兄弟:+

缩写:div+p+bq

```html
<div></div>
<p></p>
<blockquote></blockquote>
```

上级:^

缩写:div+div>p>span+em^bq

```html
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```

缩写:div+div>p>span+em^^bq

```html
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

分组:()

缩写:div>(header>ul>li*2>a)+footer>p

```html
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```

缩写:(div>dl>(dt+dd)*3)+footer>p

```html
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```

乘法:*

缩写:ul>li*5

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

自增符号:$

缩写:ul>li.item$*5

```html
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```

缩写:h$[title=item$]{Header $}*3

```html
<h1 title="item1">Header 1</h1>
<h2 title="item2">Header 2</h2>
<h3 title="item3">Header 3</h3>
```

缩写:ul>li.item$$$*5

```html
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```

缩写:ul>li.item$@-*5

```html
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

缩写:ul>li.item$@3*5

```html
<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```

ID 和类属性

缩写:#header

```html
<div id="header"></div>
```

缩写:.title

```html
<div class="title"></div>
```

缩写:form#search.wide

```html
<form action="" id="search" class="wide"></form>
```

缩写:p.class1.class2.class3

```html
<p class="class1 class2 class3"></p>
```

自定义属性

缩写:p[title="Hello world"]

```html
<p title="Hello world"></p>
```

缩写:td[rowspan=2 colspan=3 title]

```html
<td rowspan="2" colspan="3" title=""></td>
```

缩写:[a='value1' b="value2"]

```html
<div a="value1" b="value2"></div>
```

文本:{}

缩写:a{Click me}

```html
<a href="">Click me</a>
```

缩写:p>{Click}+a{here}+{ to continue}

```html
<p>
Click
    <a href="">here</a>
to continue
</p>
```

隐式标签

缩写:.class

```html
<div class="class"></div>
```

缩写:em>.class

```html
<em><span class="class"></span></em>
```

缩写:ul>.class

```html
<ul>
    <li class="class"></li>
</ul>
```

缩写:table>.row>.col

```html
<table>
    <tr class="row">
        <td class="col"></td>
    </tr>
</table>
```

HTML

所有未知的缩写都会转换成标签, 例如, foo → `<foo></foo>`

缩写:!

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
    </body>
</html>
```

缩写:a

```html
<a href=""></a>
```

缩写:a:link

```html
<a href="http://"></a>
```

缩写:a:mail

```html
<a href="mailto:"></a>
```

缩写:abbr

```html
<abbr title=""></abbr>
```

缩写:acronym

```html
<acronym title=""></acronym>
```

缩写:base

```html
<base href="">
```
