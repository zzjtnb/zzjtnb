---
title: HTML中的表格
category: 前端
tags:
  - html
cover: https://cdn.pixabay.com/photo/2020/07/14/13/39/cornflower-5404185_960_720.jpg
---

html 中表格 table 的内容水平和垂直居中显示

```html
#class td /*设置表格文字左右和上下居中对齐*/ 
{  
    vertical-align: middle;
    text-align: center;  
}
/*class 是所属的类*/
<div id="class" align="center" style="margin: 0cm 0cm 0pt; text-align: left"> 
   <table class="table table-bordered" border="1" width="100%" style="font-size: 14pt; color: #000000; font-family: 楷体;mso-ascii-font-family: 'times new roman'; mso-hansi-font-family: 'times new roman'"> 
    <caption>
     <h2 style="text-align: left;font-size: 16pt;font-family: 宋体;color: red;">title</h2>
    </caption> 
    <tbody> 
     <tr style="font-weight: bold;mso-bidi-font-size: 12.0pt;font-family: 宋体;"> 
      <td>序号</td> 
      <td>适用情况</td> 
      <td>详情</td> 
      <td>备注</td> 
     </tr> 
     <tr> 
      <td>1</td> 
      <td>xxxxx</td> 
      <td style="text-align: left;"> 
       <!--指定靠左对齐--> <span> xxxxxx<br /> </span> </td> 
      <td><a href="#">查看详情</a></td> 
     </tr> 
    </tbody> 
   </table> 
  </div> 
```

CSS table 表格颜色

```css
.tftable {
    width: 800px;
    height: 500px;
}

table,
td,
th {
    border-width: 1px;
    border-style: solid;
    border-color: #f9ca24;
    border-image: initial;
    color: white;
    vertical-align: middle;
    text-align: center;
    background: #a51f14;
}

th {
    background-color: #fff100;
    color: #000000;
}
```

html td 的横向与纵向合并
`colspan是横向合并；rowspan是纵向合并。`
如

```html
<!--横向的两个单元格进行合并-->
<td class="subject" colspan="2">回复觉得很分阶段方</td>    
```
