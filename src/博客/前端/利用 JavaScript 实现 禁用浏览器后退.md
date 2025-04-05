---
title: 利用js实现 禁用浏览器后退
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2020/06/14/15/45/beach-bar-5298364_960_720.jpg
---

```JavaScript
 <script language="javascript">
    //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
   });
 </script>
```
