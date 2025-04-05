---
title: Node.js 如何获取真实 IP？（Nginx 服务器）
category: Node.js
tags:
  - nginx
cover: https://cdn.pixabay.com/photo/2020/12/03/16/58/sunset-5801050_960_720.jpg
---

## 在 nginx.conf 中配置

```sh
  # 反向代理
  location /api {
    proxy_set_header X-Real-IP $remote_addr; # 获取到与服务器本身直连的上层请求ip
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 获取所有的代理ip 客户ip
    proxy_pass http://127.0.0.1:5000; # 后台 API 地址
  }
```

## 在 node.js 中获取 ip

```js
// const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
const headers = req.headers;
let ip = req.connection.remoteAddress;
if (headers["x-real-ip"]) {
  ip = headers["x-real-ip"];
}
if (headers["x-forwarded-for"]) {
  const ipList = headers["x-forwarded-for"].split(",");
  ip = ipList[0];
}

```

## 请注意，表达小写标头

**
