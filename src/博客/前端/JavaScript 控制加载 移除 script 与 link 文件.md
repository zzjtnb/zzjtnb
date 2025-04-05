---
title: js 控制加载|移除 script 与 link 文件
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2021/06/04/17/04/caldera-6310371_960_720.jpg
---


## script

### js 加载 script 文件

```js
/**
 * 加载 script 文件
 * @param {String} src --需要加载的js路径
 */
 function loadScript(src) {
  var addSign = true;
  var scripts = document.getElementsByTagName("script");
   //遍历scripts是否已经存在要加载的js
  for (var i = 0; i < scripts.length; i++) {
      if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(src) != -1) {
          addSign = false;
      }
  }
  if (addSign) {
      var $script = document.createElement('script');
      $script.setAttribute("type", "text/javascript");
      $script.setAttribute("src", src);
      document.getElementsByTagName("head").item(0).appendChild($script);
  }
}
```

### js 删除 script 文件

```js
/**
 * 删除 script 文件
 * @param {string} src --要删除的js文件路径
 */
 function removeScript(src) {
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
      if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(src) != -1) {
          scripts[i].parentNode.removeChild(scripts[i]);
      }
  }
}
```

## link

### js 加载 link 文件

```js
/**
 * 加载 link 文件
 * @param {String} href --要添加的文件路径
 */
 function loadCss(href) {
  let addSign = true;
  let links = document.getElementsByTagName("link");
  //遍历link是否已经存在要加载的文件
  for (let i = 0; i < links.length; i++) {
      if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
          addSign = false;
      }
  }
  if (addSign) {
    let $link = document.createElement("link");
      $link.setAttribute("rel", "stylesheet");
      $link.setAttribute("type", "text/css");
      $link.setAttribute("href", href);
      document.getElementsByTagName("head").item(0).appendChild($link);
  }
}
```

### js 删除 link 文件

```js
/**
 * 删除 link 文件
 * @param {String} href --要删除的路径
 */
 function removeCss(href) {
  var links = document.getElementsByTagName("link");
  for (var i = 0; i < links.length; i++) {
      var _href = links[i].href;
      if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
          links[i].parentNode.removeChild(links[i]);
      }
  }
}
```
