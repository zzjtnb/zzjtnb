---
title: VS Code 插件 Beautify 和 Vetur 中的 js-beautify-html 配置项
category: VS Code
tags:
  - Vue
  - VS Code
cover: https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528_960_720.jpg
---


### 简介

* Beautify 是格式化代码的插件
* 可美化 JS.JSON.CSS.Sass.HTML(其他类型的文件不行)

### 配置规则

#### 1. 适合所有文件类型的规则

|设置|适用|描述|
|:----|:----|:----|
|indent_size|所有|[Int] 缩进大小, 默认:4|
|indent_char|所有|[String] 缩进字符, 默认:" "|
|eol|所有|[String] 行结束符, 默认:"\n"|
|end_with_newline|所有|[Bool] 确保最后一行是新行, 默认:false|
|indent_with_tabs|所有|[Bool] 用 Tab 缩进, 会覆盖 indent_size 和 indent_char, 默认:false|
|preserve_newlines|所有|[Bool] 留原有的多余空行, 默认:true|

```json
{
  "indent_char": " ",
  "indent_size": 0,
  "eol": "\n",
  "end_with_newline": false,
  "indent_with_tabs": false,
  "preserve_newlines": true
}

```

#### 2. 适合 JS.HTML 的规则

|设置|适用|描述|
|:----|:----|:----|
|max_preserve_newlines|JS.HTML|[Int] 最多能保留的空行, 默认:10|
|wrap_line_length|JS.HTML|[Int] 在 N 个字符后换行, 默认:0(忽略)|

```json
{
  "max_preserve_newlines": 10,
  "wrap_line_length": 0
}

```

#### 3. 适合 HTML 的规则

|设置|适用|描述|
|:----|:----|:----|
|extra_liners|HTML|[Array] 数组内定义的标签, 在它们之前有一个换行符, 默认 ["head", "body", "html"]|
|indent_body_inner_html|HTML|[Bool] 缩进 < body> 中的元素, 默认:true|
|indent_head_inner_html|HTML|[Bool] 缩进 < head> 中的元素, 默认:true|
|indent_inner_html|HTML|[Bool] 缩进 < head > 和 < body > 中的元素 (head 和 body 也会缩进), 默认:false|
|indent_scripts|HTML|[String] 缩进 < script> 标签里的代码, 有三个值:"keep"(对齐 < script > 标签)."separate"(对齐左边界)."normal"(正常缩进), 默认:"normal"|
|wrap_attributes|HTML|[String] 将属性换到新行, 有 5 个值:**"auto"**(不换行).**"force"**(第 2 个起换行). **"force-aligned"**(第 2 个起换行, 与第 1 个属性对齐). **"force-expand-multiline"或"align-multiple"**(两个效果一样, 所有属性都换行), 默认:"auto"|
|wrap_attributes_indent_size|HTML|[Int] 属性换行缩进大小, 默认:indent_size|
|unformatted|HTML|[Array] 数组中的标签不会重新格式化, 默认:[]|
|content_unformatted|HTML|[Array] 数组中标签的内容不会重新格式化, 默认:["pre","textarea"]|

```json
{
  "extra_liners": ["head", "body", "/html"],
  "indent_body_inner_html": true,
  "indent_head_inner_html": true,
  "indent_inner_html": false,
  "indent_scripts": "normal",
  "wrap_attributes": "auto",
  "wrap_attributes_indent_size": 2,
  "unformatted": [],
  "content_unformatted": ["pre","textarea"]
}

```

#### 4. 适合 CSS 的规则

|设置|适用|描述|
|:----|:----|:----|
|newline_between_rules|CSS|[Bool] 规则之间添加换行符, 默认:false|
|selector_separator_newline|CSS|[Bool] 选择器之间添加换行符, 默认:true|
|space_around_combinator|CSS|[Bool] 选择器和样式规则周围添加空格, 默认:false|

```json
{
  "newline_between_rules": false,
  "selector_separator_newline": false,
  "space_around_combinator": false,
}

```

#### 5. 适合 JS 的规则

|设置|适用|描述|
|:----|:----|:----|
|comma_first|JS|[Bool] 将逗号放在新行的开头, 默认:false|
|indent_level|JS|[Int] 缩放级别, 即距离左边界多远开始, 默认:0|
|keep_array_indentation|JS|[Bool] 保留数组缩进, 默认:false|
|keep_function_indentation|JS|[Bool] 保留函数缩进, 默认:false|
|space_after_anon_function|JS|[Bool] 匿名函数与括号之间添加空格, 默认:false|
|space_after_named_function|JS|[Bool] 函数名与括号之间添加空格, 默认:false|
|space_before_conditional|JS|[Bool] 条件语句和括号之间添加空格, 默认:true|
|space_in_empty_paren|JS|[Bool] 空括号中保留空格, 默认:false|
|space_in_paren|JS|[Bool] 括号内添加填充空格, 如 f( a, b ), 默认:false|

```json
{
  "comma_first": false,
  "indent_level": 0,
  "keep_array_indentation": false,
  "keep_function_indentation": false,
  "space_after_anon_function": false,
  "space_after_named_function": false,
  "space_before_conditional": false,
  "space_in_empty_paren": false,
  "space_in_paren": false
}

```

### 运行

* Shift+Alt+F(不同的电脑可能不一样)

### 补充

有些规则没有补充完整, 理解不是很清楚, 更多详细内容可参考
[https://github.com/HookyQR/VSCodeBeautify/blob/master/Settings.md](https://github.com/HookyQR/VSCodeBeautify/blob/master/Settings.md)
