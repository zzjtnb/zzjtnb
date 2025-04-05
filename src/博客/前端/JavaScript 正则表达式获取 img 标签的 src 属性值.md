---
title: js正则表达式获取img标签的src属性值
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2022/07/05/10/54/ocean-7302776_960_720.jpg
---

## 读取数组

```js
let imgStr = `
<p><img src='http://zzjtnb.com'/></p>
<p><img src='http://zzjtnb.com/img'/></p>
`;
function getUrl(imgStr) {
  //解析富文本获取img里面的src属性值
  let patt = /<img[^>]+src=['"]([^'"]+)['"]+/g;
  let result = [];
  let temp = [];
  while ((temp = patt.exec(imgStr)) != null) {
    result.push({'url': temp[1]});
  }
  return result;
}

console.log(getUrl(imgStr));
// [{url: 'http://zzjtnb.com'}, {url: 'http://zzjtnb.com/img'}];
```

## 读取 html 文件并且把结果写入另一个 js 文件

```js
const fs = require('fs');
let text = fs.readFileSync('./test.html', 'utf8');
function getUrl(imgStr) {
  let img = `let img=[`;
  //解析富文本获取img里面的src属性值
  let patt = /<img[^>]+src=['"]([^'"]+)['"]+/g;
  let result = [];
  let temp = [];
  while ((temp = patt.exec(imgStr)) != null) {
    let str = temp[1].replace('1222224444', '${number}');
    img += `\`${str}\`,`;
    result.push(str);
  }
  img += `]`;
  fs.writeFileSync('./img.js', img, 'utf8');
  return result;
}
getUrl(text);
```
