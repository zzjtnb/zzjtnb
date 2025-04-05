---
title: JavaScript一键换肤代码
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2021/04/25/15/41/flower-6206819_960_720.jpg
---

```js
let link = []
/**
 *移除css
 * @param {string} href --移除路径
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

/**
 * 创建Link链接
 * @returns link
 */
function createLink() {
  let $link = document.createElement('link')
  $link.rel = 'stylesheet'
  $link.type = 'text/css'
  document.querySelector('body').appendChild($link)
  return $link
}

/**
 * 给link添加href
 * @param {string} path 文件路径
 */
function addLink(path) {
  link = []
  if (path === '/') {
    link.push('/white.css')
  }
  if (/user\/info\/\w/.test(location.pathname)) {
    link.push('/test1.css', '/white.css')
  }
  link.forEach((item, index) => {
    const css = createLink()
    css.href = item
    if (index == link.length - 1) {
      css.onload = function () {
        if (/user\/info\/\w/.test(location.pathname)) {
          removeCss('/test.css')
        }
      }
    }
  });
}
/**
 * 移除link
 */
function removeLink() {
  if (/user\/info\/\w/.test(location.pathname)) {
    const css = createLink()
    css.href = '/test.css'
    css.onload = function () {
      if (/user\/info\/\w/.test(location.pathname)) {
        link.forEach((item) => {
          removeCss(item)
        });
      }
    }
  }
}
/**
 * 点击一键换肤事件
 */
function changeTheme() {
  let theme = localStorage.getItem('theme');
  if (!theme) {
    localStorage.setItem('theme', true);
    addLink(location.pathname)
  } else {
    localStorage.removeItem('theme')
    removeLink()
  }
}

if (localStorage.getItem('theme')) {
  addLink(location.pathname)
}
```
