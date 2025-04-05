---
title: input search更改默认删除按钮和placeholder样式
category: 前端
tags:
  - css
cover: https://images.unsplash.com/photo-1458349726531-234ad56ba80f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1360&q=80
---

```css
input[type="search"]::-webkit-search-cancel-button {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      background: url(https://yxs-web.oss-cn-beijing.aliyuncs.com/328e4d97f9d0d68ea04e872f68e508e3.png) no-repeat;
      background-size: contain;
    }
```

更改 placeholder

```css
input::placeholder {
  color: red;
  font-size: 1.2em;
  font-style: italic;
}
```
