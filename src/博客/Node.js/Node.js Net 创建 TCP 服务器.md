---
title: Node.js Net创建TCP服务器
category: Node.js
tags:
  - Node.js
cover: https://images.unsplash.com/photo-1540028317582-ab90fe7c343f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=1350&q=80
---

## 方式一

```JavaScript
/**
 * 无法server.getConnections()统计
 */
const PORT = 3000
const HOST = "localhost"
/* 引入net模块 */
var net = require("net");

/* 创建TCP服务器 */
var server = net.createServer(function (socket) {
  // console.log('someone connects');
  console.log('DCS World已连接');
  /* 获取地址信息，得到的是一个json { address: '::', family: 'IPv6', port: 8000 } */
  // var address = server.address();
  // var message = "the server address is" + JSON.stringify(address);
  /* TCP服务器监听的端口号 */
  // console.log("the port of server is" + address.port);
  /* TCP服务器监听的地址 */
  // console.log("the address of server is" + address.address);
  /* 说明TCP服务器监听的地址是 IPv6 还是 IPv4 */
  // console.log("the family of server is" + address.family);
  /* 发送数据 */
  // socket.write(message, function () {
  //   var writeSize = connection.bytesWritten;
  //   console.log(message + "has send");
  //   console.log("the size of message is" + writeSize);
  // })
  /* 监听data事件 */
  socket.on('data', function (data) {
    // console.log(data.toString());
    // var readSize = connection.bytesRead;
    // console.log("the size of data is" + readSize);
  })

  /**
   * 方式一、
   * socket.on('close', function (){}) 关闭当前连接
   */
  socket.on('close', function () {
    console.log('DCS World已关闭连接');
  });
  /**
   * 方式二、
   * server.close()永久关闭
   */
  // server.close(function (error) {
  //   if (error) {
  //     console.log('close回调：服务端异常：' + error.message);
  //   } else {
  //     console.log('close回调：服务端正常关闭');
  //   }
  // });
})
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('地址正被使用，重试中...');
    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  }
});
/* 获取监听端口 */
server.listen(PORT, function () {
  console.log(`服务已创建并监听${PORT}端口,等待DCS World连接`);
  console.log(`Creat server on http://${HOST}:${PORT}`);
})
```

## 方式二

```JavaScript
/**
 * 正确统计连接服务器的客户端数量
 */
const PORT = 3000
const HOST = "localhost"
/* 引入net模块 */
var net = require("net");

/* 创建TCP服务器 */
var server = net.createServer(function (socket) {
  console.log('someone connects');
  /* 获取地址信息，得到的是一个json { address: '::', family: 'IPv6', port: 8000 } */
  // var address = server.address();
  // var message = "the server address is" + JSON.stringify(address);
  /* TCP服务器监听的端口号 */
  // console.log("the port of server is" + address.port);
  /* TCP服务器监听的地址 */
  // console.log("the address of server is" + address.address);
  /* 说明TCP服务器监听的地址是 IPv6 还是 IPv4 */
  // console.log("the family of server is" + address.family);
  /* 发送数据 */
  // socket.write(message, function () {
  //   var writeSize = connection.bytesWritten;
  //   console.log(message + "has send");
  //   console.log("the size of message is" + writeSize);
  // })
  /* 设置最大连接数量 */
  const maxConnections = 3;
  /* 设置最大连接数量 */
  server.maxConnections = maxConnections;
  server.getConnections(function (err, count) {
    if (count >= maxConnections) {
      // console.log(err);
      console.log("已到最大连接数");
    } else {
      console.log("the count of client is " + count);
    }
  });

})
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('地址正被使用，重试中...');
    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  }
});
/* 获取监听端口 */
server.listen(PORT, function () {
  console.log(`服务已创建并监听${PORT}端口,等待DCS World连接`);
  console.log(`Creat server on http://${HOST}:${PORT}`);
})
```
