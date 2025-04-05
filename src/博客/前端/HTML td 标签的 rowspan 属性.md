---
title: HTML <td> 标签的 rowspan 属性
category: 前端
tags:
  - html
cover: https://cdn.pixabay.com/photo/2020/03/26/10/51/norway-4970019_960_720.jpg
---

## 代码

```html
<table width="" border="1" cellspacing="0" cellpadding="0" style="color:#000">
  <tbody>
    <tr style="font-weight:bold">
      <th idth="105" height="46" align="center" bgcolor="#FFFF00">书名 </th>
      <th width="101" align="center" bgcolor="#FFFF00">价格 </th>
      <th width="95" align="center" bgcolor="#FFFF00">评价</th>
      <th width="108" align="center" bgcolor="#FFFF00">类型</th>
      <th width="109" align="center" bgcolor="#FFFF00">难度</th>
    </tr>
    <tr>
      <td height="28" align="center" bgcolor="#FFFF00">全球通史</td>
      <td height="28" align="center" bgcolor="#FFFF00">无价</td>
      <td height="28" align="center" bgcolor="#FFFF00">优</td>
      <td height="28" align="center" bgcolor="#FFFF00">史学</td>
      <td height="28" align="center" bgcolor="#FFFF00">难</td>
    </tr>
    <tr>
      <td height="31" align="center" bgcolor="#FFFF00">大国的兴衰 </td>
      <td rowspan="5" align="center" bgcolor="#FFF"> 无价</td>
      <td rowspan="5" align="center" bgcolor="#FFF">优</td>
      <td rowspan="5" align="center" bgcolor="#FFF">史学 </td>
      <td rowspan="5" align="center" bgcolor="#FFF"> 难</td>
    </tr>
    <tr>
      <td height="31" align="center" bgcolor="#FFFF00">资治通鉴 </td>
    </tr>
    <tr>
      <td height="31" align="center" bgcolor="#FFFF00">史记 </td>
    </tr>
  </tbody>
</table>
```

rowspan 属性规定单元格可横跨的行数。

## 浏览器支持

 所以浏览器都支持 rowspan 属性。

 没有浏览器支持 rowspan="0"，这个值有特殊的意义。（参见属性值表格中的描述）

## 语法

```html
<td rowspan="value">
```

## 属性值

  | 值 | 描述 |
  | -------- | -----: |
  | number | 设置单元格可横跨的行数。 |
  |  | 注释：rowspan="0" 指示浏览器横跨到表格部分的最后一行（thead、tbody 或者 tfoot）。|

## 预览效果

<table  style="color:#000">
  <tbody>
    <tr style="font-weight:bold">
      <th idth="105" height="46" align="center" bgcolor="#FFFF00">书名 </th>
      <th width="101" align="center" bgcolor="#FFFF00">价格 </th>
      <th width="95" align="center" bgcolor="#FFFF00">评价</th>
      <th width="108" align="center" bgcolor="#FFFF00">类型</th>
      <th width="109" align="center" bgcolor="#FFFF00">难度</th>
    </tr>
    <tr>
      <td height="28" align="center" bgcolor="#FFFF00">全球通史</td>
      <td height="28" align="center" bgcolor="#FFFF00">无价</td>
      <td height="28" align="center" bgcolor="#FFFF00">优</td>
      <td height="28" align="center" bgcolor="#FFFF00">史学</td>
      <td height="28" align="center" bgcolor="#FFFF00">难</td>
    </tr>
    <tr>
      <td height="31" align="center" bgcolor="#FFFF00">大国的兴衰 </td>
      <td rowspan="5" align="center" bgcolor="#FFF"> 无价</td>
      <td rowspan="5" align="center" bgcolor="#FFF">优</td>
      <td rowspan="5" align="center" bgcolor="#FFF">史学 </td>
      <td rowspan="5" align="center" bgcolor="#FFF"> 难</td>
    </tr>
    <tr>
      <td height="31" align="center" bgcolor="#FFFF00">资治通鉴 </td>
    </tr>
    <tr>
      <td height="31" align="center" bgcolor="#FFFF00">史记 </td>
    </tr>
  </tbody>
</table>
