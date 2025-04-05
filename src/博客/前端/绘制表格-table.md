---
title: 绘制表格-table
category: 前端
tags:
  - html
cover: https://cdn.pixabay.com/photo/2019/09/21/23/12/highway-4494907_960_720.jpg
---

之前做页面都没有画表格的经历, 最近工作中有接触到, 刚好补了一下这方面的知识

## 结构

--------------

一个较完整的表格结构如下

``` html
<table>
  <caption>title</caption>
  <thead>
    <tr>
      <th>head</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>data</td>
    </tr>
  </tbody>
</table>
```

`caption` 是表格的标题

`thead` 里放的是表格的头, 一个头对应一个 `th`
`tbody` 里放的是表格的数据, 一条数据对应一个 `td`
`th` 与 `td` 都应该在 `tr` 内, 一个 `tr` 就是一行

## 样式

* 边框

需要同时设置 th/td 的边框, 同时还要设置 table 的边框折叠

```css
table {
  border-collapse: collapse; /*默认为separate 分开*/
}
th, td {
  border: 1px solid blue; 
}

```

table 的 html 属性也有 `border`

```html

<table border="1"></table>

```

`border` 属性同时设置了 td/th 的边框宽度, 但缺点是不能设置边框颜色及边框线条样式, 所以还是使用 css 来设置边框更好

`border-spacing` 属性可以设置单元格的边框之间的间距, 但需要 `border-collapse` 属性为 `separate` 时才生效. 一般较少使用

* 文字

文字水平居中使用 `text-align: center;`
文字垂直居中使用 `vertical-align: middle;` Chrome 下默认是垂直居中的

如果限制了单元格的宽度, 此时需要文字换行, 可以使用 `word-break: break-all;`
如果感觉文字太靠近边框, 可以对 td/th 设置内衬 `padding: 2px 5px;`
如果改变标题的位置, 需要对 table 设置 `caption-side: top;` 或 `caption-side: bottom;` Chrome 下的默认值是 `top`

* 跨行与跨列  

跨行需要用到属性 `rowspan` , 跨列需要用到属性 `colspan` , 下面是简单的示例

<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="265" name="cp_embed_1" scrolling="no" src="https://codepen.io/levy9527/embed/vgEoKR?height=265&amp;theme-id=0&amp;slug-hash=vgEoKR&amp;default-tab=html%2Cresult&amp; user=levy9527&amp; embed-version=2&amp; pen-title=table-with-cross-row-col&amp; name=cp_embed_1" style="width: 100%; overflow:hidden; display:block; " title="table-with-cross-row-col" loading="lazy" id="cp_embed_vgEoKR"></iframe>

* 布局算法

``` css
table {
  table-layout: fixed;
}
```

二者有以下区别:

1. automatic 时, 每一列的宽度是自动计算的, 由该列中最宽的内容决定; fixed 时, 每一列的宽度可以用 width 单独设置
2. 前者需要需要接受所有内容后, 才能确定表格布局, 耗时较多; 后者在接受到第一行表格内容时, 即可确定表格布局, 耗时较少

## 实践

--------------

* 多列表格

表格有很多列时, 则宽度会很大, 如果 table 的父元素是 body, 则水平滚动表格时 body 也会一起动, 尤其是手机端, 体验非常不好

解决方案是, 给 table 添加套一个父元素, 则可以只滚动表格, 不滚动页面的其他内容

```html
<div>

<table>

</table>

</div>

```

```css

.table-container {

width: 100%;

overflow: scroll;

}

```

* 固定列

表格的前几列在水平滚动时固定, 我的思路是这样的:

* 把原本一个表格拆分成两个, 一个是拥有固定列的 (以下称为固定表格 fixedTable), 一个是正常的表格, 可以横向滚动 (下面称为滚动表格 scrollTable)
* 固定列其实可以看成表格固定于视窗, 则前一个表格的 `position` 应设置为 `fixed`
* 因为固定表格不在文档流中, 则正常表格应设置 `position` 为 `relative` , 使它可以产生偏移, 使得两个表格拼接看起来像是一个表格

具体看代码
<iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe " frameborder="0" height="265" name="cp_embed_2" scrolling="no" src="https://codepen.io/levy9527/embed/YpmWBg?height=265&amp;theme-id=0&amp;slug-hash=YpmWBg&amp;default-tab=html%2Cresult&amp; user=levy9527&amp; embed-version=2&amp; pen-title=YpmWBg&amp; name=cp_embed_2" style="width: 100%; overflow:hidden; display:block; " title="YpmWBg" loading="lazy" id="cp_embed_YpmWBg"></iframe>
如果固定列是动态的, 则需要元素生成后取得固定表格的宽度, 再设置滚动表格的偏移, 示例代码如下:

```js
let width = fixedTable.clientWidth

let left = width - 1 

scrollTable.style.left = left+'px'

```

如果单元格的内容也是动态的, 且单元格限制了宽度, 则文字过多时, 会产生换行, 则滚动表格的表头的高度也会变化, 需要调整固定表格的表头高度

```js

let height = scrollTable.firstChild.clientHeight 

let ths = fixedTable.getElementsByTagName('th')

for(let i = 0, len = ths.length; i < len; i++) {

  ths[i].style.height = height + 'px'

}

```

这种实现方案的好处是, 主要依赖 html 与 css, 几乎不需要 js, 实现方式较简单. 但缺点在于, 如果固定的列太多, 超出屏幕宽度时 (在移动端很容易出现这种情况), 则整个屏幕会被固定表格遮住, 会只见固定列, 不见滚动列了

实践表明, 这种方案并不完善, 因为以下两种情况:

* 表格行过多  

表格有很多行时, 表格的高度超过视窗, 则需要垂直滚动才能看到下面的内容. 但因固定表格 `position`
为 `fixed` , 无论怎么滚动, 固定表格下面的行都是看不见的, 因此还需要监听 body 的滚动事件, 动态修改固定表格的垂直偏移

``` js
let top = scrollTable.offsetTop
document.body.onscroll = function(e) {
  let y = window.scrollY
  fixedTable.style.top = top - y + 'px'
}
```

* 移动端横屏显示  

移动端还有横屏显示的需求, 则监听到手机横屏时, 需要重新调整固定表格的偏移. 至于事件, 最简单的是 onresize

``` js
let top = scrollTable.offsetTop
let y = window.scrollY
fixedTable.style.top = top - y + 'px'
```

因为每一次滚动都设置一下元素的偏移, 则每一次都会触发 reflow, 极其影响性能, 滚动时可明显看出固定表格在上下" 漂移"

另外, 在写了 css 的基础上, 还要写这么多的 js 代码来应对几种情况, 因此我觉得此方案并非最佳方案, 尤其不推荐在移动端使用
