---
title: 实时编辑CSS
category: 前端
tags:
  - css
cover: https://cdn.pixabay.com/photo/2020/08/19/15/31/huangpu-river-5501210_960_720.jpg
---

在 HTML 5 中新增了一个新的全局属性, contenteditable 属性.

> contenteditable 属性规定是否可编辑元素的内容.

我们可以通过设置这个属性, 来对之前的一些文本进行编辑.

| 值 | 描述 |
|  ----  | ----  |
| 真正 | 规定可以编辑元素内容. |
| 假|规定无法编辑元素内容. |
| 班级名称|继承父元素的 contenteditable 属性. |

样例代码:

``` html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title> 李鹏李先生 < /title>
</head>

<body>
  <p contenteditable="true"> 这是一段可编辑的段落。 请试着编辑该文本。 </p>
</body>

</html>
```

那这个属性值和我们今天要说的内容有什么关系呢?

我们可以利用当前内容可编辑的这个特性, 来去实现一个小的效果
  <p contenteditable="true"> 这是一段可编辑的段落。 请试着编辑该文本。 </p>

``` html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>MR_LP</title>
</head>

<body>
  <style style="display:block" contentEditable>
    body {
      color: blue
    }
  </style>
</body>

</html>
```

当然, 要测试出来效果, 你自己还是需要会一些 CSS 的, 尴尬脸.
