---
title: Node.js构建TCP服务器和TCP客户端
category: Node.js
tags:
  - Node.js
cover: https://images.unsplash.com/photo-1518734121739-7550d2c027f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1350&q=80
---

网络是通信互联网的基础，Node.js 提供了 net、http、dgram 模块、分别用来实现 TCP、HTTP、UDP 的通信。上次的文章[《Node.js 构建 HTTP 服务器》](https://zc95.github.io/2018/03/19/nodejs-HTTP/)实现了 HTTP 的通信，这篇文章说一说 TCP 服务器和 TCP 客户端的构建。

[](#用 Node-js 创建 TCP 服务器 "用 Node.js 创建 TCP 服务器")## 用 Node.js 创建 TCP 服务器

### [](#构建 TCP 服务器 "构建 TCP 服务器")构建 TCP 服务器

为了使用 Node.js 创建 TCP 服务器，首先要使用 require(“net”) 来加载 net 模块，然后使用 net 模块的 createServer 方法就可以轻松地创建一个 TCP 服务器。

```JavaScript
/**
 * 构建TCP客户端
 */

/* 引入net模块 */
var net = require("net");

/* 创建TCP服务器 */
var server = net.createServer(function(socket){
    console.log('someone connects');
})

/* 设置连接的服务器 */
server.listen(8000, function(){
    console.log("Creat server on http://127.0.0.1:8000/");
})

```

运行这段代码并访问了 [http://127.0.0.1:8000/](http://127.0.0.1:8000/) 的话会看到控制台打印了”someone connects”，表明已经成功连接到这个创建的 TCP 服务器。

> / _设置连接的服务器_ /  
> server.listen(8000, function(){  
> ​ console.log(“Creat server on [http://127.0.0.1:8000/](http://127.0.0.1:8000/)“);  
> })

上面这段代码实际上触发的是 server 下的 listening 事件，等同于：

> / _设置监听端口_ /
>
> server.listen(8000);
>
> / _设置监听时的回调函数_ /
>
> server.on(“listening”, function () {
>
> ​ console.log(“Creat server on [http://127.0.0.1:8000/](http://127.0.0.1:8000/)“);
>
> })

事实上，除了 listening 事件外，TCP 服务器还支持以下事件：

1. connection：当有新的连接创建时触发，回调函数的参数为 socket 连接对象。
2. close：TCP 服务器关闭的时候触发，回调函数没有参数
3. error：TCP 服务器发生错误的时候触发，回调函数的参数为 error 对象

下列代码通过 net.Server 类来创建一个 TCP 服务器，并添加以上事件。

```JavaScript
 /**
 * 通过net.Server类来创建一个TCP服务器
 */

/* 引入net模块 */
var net = require("net");

/* 实例化一个服务器对象 */
var server = new net.Server();

/* 监听 connection 事件 */
server.on("connection", function (socket) {
    console.log("someone connects");
});

/* 设置监听端口 */
server.listen(8000);

/* 设置监听时的回调函数 */
server.on("listening", function () {
    console.log("Creat server on http://127.0.0.1:8000/");
})

/* 设置关闭时的回调函数 */
server.on("close", function () {
    console.log("server closed!");
})

/* 设置错误时的回调函数 */
server.on("error", function (err) {
    console.log("error!");
})

```

### [](#查看服务器监听的地址 "查看服务器监听的地址")查看服务器监听的地址

当创建了一个 TCP 服务器后，可以通过 server.address() 方法来查看这个 TCP 服务器监听的地址，并返回一个 JSON 对象。这个对象的属性有：

1. port：TCP 服务器监听的端口号
2. family：说明 TCP 服务器监听的地址是 IPv6 还是 IPv4
3. address：TCP 服务器监听的地址

```JavaScript
/**
 * 查看服务器监听的地址
 */

/* 引入net模块 */
var net = require("net");

/* 创建TCP服务器 */
var server = net.createServer(function(socket){
    console.log('someone connects');
})

/* 获取地址信息 */
server.listen(8000,function(){
    /* 获取地址信息，得到的是一个json { address: '::', family: 'IPv6', port: 8000 } */
    var address = server.address();

    /* TCP服务器监听的端口号 */
    console.log("the port of server is"+ address.port);

    /* TCP服务器监听的地址 */
    console.log("the address of server is"+ address.address);

    /* 说明TCP服务器监听的地址是 IPv6 还是 IPv4 */
    console.log("the family of server is"+ address.family);
})

```

### [](#连接服务器的客户端数量 "连接服务器的客户端数量")连接服务器的客户端数量

创建一个 TCP 服务器后，可以通过 server.getConnections() 方法获取连接这个 TCP 服务器的客户端数量。除此之外，也可以通过 maxConnections 属性来设置这个服务器的最大连接数量，当连接数量超过最大值时，服务器将拒绝新的连接。

```JavaScript
/**
 * 连接服务器的客户端数量
 */

/* 引入net模块 */
var net = require("net");

/* 创建TCP服务器 */
var server = net.createServer(function(socket){
    console.log('someone connects');

    /* 设置最大连接数量 */
    server.maxConnections=3;
    server.getConnections(function(err,count){
        console.log("the count of client is "+count);
    })
})

/* 获取监听端口 */
server.listen(8000,function(){
    console.log("Creat server on http://127.0.0.1:8000/");
})

```

你可以打开多个网页输入 localhost:8000 来测试这段代码，也可以用 Telnet 命令 `telnet localhost 8000` 来连接这个 TCP 服务器（上一篇文章有提到如何用 Homebrew 安装 Telnet：[《Homebrew》](https://zc95.github.io/2018/03/20/Homebrew/)）。

![006tKfTcgy1fpkqytum6zj31kw0s7toa](https://ws4.sinaimg.cn/large/006tKfTcgy1fpkqytum6zj31kw0s7toa.jpg)

### [](#服务器和客户端之间的通信 "服务器和客户端之间的通信")服务器和客户端之间的通信

利用 socket.write() 可以使 TCP 服务器发送数据给客户端；

socket 对象可以用来获取客户端发出的流数据，每次接收到数据的时候触发 data 事件，通过监听这个事件就可以在回调函数中获取客户端发送的数据了。

```JavaScript
/**
 * 发送和获取
 */

/* 引入net模块 */
var net = require("net");

/* 创建TCP服务器 */
var server = net.createServer(function(socket){
    /* 获取地址信息 */
    var address = server.address();
    var message = "the server address is"+JSON.stringify(address);

    /* 发送数据 */
    socket.write(message,function(){
        var writeSize = socket.bytesWritten;
        console.log(message + "has send");
        console.log("the size of message is"+writeSize);
    })

    /* 监听data事件 */
    socket.on('data',function(data){
        console.log(data.toString());
        var readSize = socket.bytesRead;
        console.log("the size of data is"+readSize);
    })
})

/* 获取地址信息 */
server.listen(8000,function(){
    console.log("Creat server on http://127.0.0.1:8000/");
})

```

下图中 TCP 服务器给客户端发送了字符串：

> the server address is{“address”:”::”,”family”:”IPv6”,”port”:8000}has send

客户端给 TCP 服务器发送了字符串 `hello TCP!` 和字节数。

![006tKfTcgy1fpkr5446asj31kw0p5gvz](https://ws1.sinaimg.cn/large/006tKfTcgy1fpkr5446asj31kw0p5gvz.jpg)

[](#用 Node-js 创建 TCP 客户端 "用 Node.js 创建 TCP 客户端")## 用 Node.js 创建 TCP 客户端

### [](#构建 TCP 客户端 "构建 TCP 客户端")构建 TCP 客户端

上面说到用打开网页或者 Telnet 来访问 TCP 服务器，其实我们也可以用 Node.js 来构建一个 TCP 客户端，实现 TCP 客户端和 TCP 服务器的通信。

为了使用 Node.js 创建 TCP 客户端，首先要使用 require(“net”) 来加载 net 模块，然后创建一个连接 TCP 客户端的 socket 对象即可：

> / _引入 net 模块_ /
>
> var net = require(“net”);
>
> / _创建 TCP 客户端_ /
>
> var client = net.Socket();

创建完 socket 对象后，使用 socket 对象的 connect 方法就可以连接一个 TCP 服务器。

```JavaScript
/**
 * 构建TCP客户端
 */

/* 引入net模块 */
var net = require("net");

/* 创建TCP客户端 */
var client = net.Socket();

/* 设置连接的服务器 */
client.connect(8000, '127.0.0.1', function () {
    console.log("connect the server");

    /* 向服务器发送数据 */
    client.write("message from client");
})

/* 监听服务器传来的data数据 */
client.on("data", function (data) {
    console.log("the data of server is " + data.toString());
})

/* 监听end事件 */
client.on("end", function () {
    console.log("data end");
})

```

### [](#TCP 客户端和 TCP 服务器的通信 "TCP 客户端和 TCP 服务器的通信")TCP 客户端和 TCP 服务器的通信

运行 [这段代码](#服务器和客户端之间的通信) 之后再运行 [这段代码](#构建 TCP 客户端) ，可以发现服务器已经接收到客户端的数据，客户端也已经接收到服务端的数据。

![006tKfTcgy1fpkso73cqdj31kw0o27bv](https://ws4.sinaimg.cn/large/006tKfTcgy1fpkso73cqdj31kw0o27bv.jpg)

## LINK

1. 本章 github 源码：[https://github.com/zc95/nodeTest/tree/master/TCP](https://github.com/zc95/nodeTest/tree/master/TCP)
2. 《Node.js 构建 HTTP 服务器》：[https://zc95.github.io/2018/03/19/nodejs-HTTP/](https://zc95.github.io/2018/03/19/nodejs-HTTP/)
