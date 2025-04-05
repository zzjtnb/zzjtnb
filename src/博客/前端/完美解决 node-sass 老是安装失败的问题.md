---
title: 完美解决node-sass老是安装失败的问题
category: 前端
tags:
  - Node.js
  - sass
cover: https://cdn.pixabay.com/photo/2021/04/10/21/45/music-book-6168179_960_720.jpg
---

我们在项目安装**node-sass**是有时候会遇到以下问题

```bash
> node-sass@4.13.1 install E:\DEV\test\node_modules\node-sass
> node scripts/install.js

Downloading binary from https://github.com/sass/node-sass/releases/download/v4.13.1/win32-x64-83_binding.node
Cannot download "https://github.com/sass/node-sass/releases/download/v4.13.1/win32-x64-83_binding.node":

HTTP error 404 Not Found

Hint: If github.com is not accessible in your location
      try setting a proxy via HTTP_PROXY, e.g.

      export HTTP_PROXY=http://example.com:1234

or configure npm proxy via

      npm config set proxy http://example.com:8080

> node-sass@4.13.1 postinstall E:\DEV\test\node_modules\node-sass
> node scripts/build.js
```

## 1.打开浏览器输入

[https://github.com/sass/node-sass/releases](https://github.com/sass/node-sass/releases)

## 2.然后找到对应版本

上面的错误信息

```bash
Cannot download "https://github.com/sass/node-sass/releases/download/v4.13.1/win32-x64-83_binding.node":
```

对应的版本就是**v4.13.1**,文件为**win32-x64-83_binding.node**
LCtrl+f 搜索 win32-x64-83_binding.node,下载下来

## 3.找到 npm 缓存路径

**WIN+R**或者**资源管理器地址栏**输入下面的指令回车

```bash
%APPDATA%\npm-cache\node-sass
```

然后找到对应的文件夹**4.13.1**
把刚才下载的**win32-x64-83_binding.node**移动到这个文件夹下

## 4.重新回到项目

运行`npm install`即可完美解决上面的报错

## 为什么 node-sass 总是安装失败？

node-sass 是我们开发中很常见的依赖包，也是安装时间冗长和最常见到报错的依赖。
安装 node-sass 失败原因有很多种，我们在说失败原因之前，先来分析一下 node-sass 的安装过程 (以下 node 版本为 v10.15.3)：

```bash
PS D:\demo> npm i node-sass

// 从npm源安装到node_modules
> node-sass@4.13.0 install D:\demo\node_modules\node-sass
> node scripts/install.js

// 下载binding.node
Downloading binary from https://github.com/sass/node-sass/releases/download/v4.13.0/win32-x64-64_binding.node
Download complete .] - :
Binary saved to D:\demo\node_modules\node-sass\vendor\win32-x64-64\binding.node

// 缓存binding.node
Caching binary to C:\Users\leepi\AppData\Roaming\npm-cache\node-sass\4.13.0\win32-x64-64_binding.node

> node-sass@4.13.0 postinstall D:\demo\node_modules\node-sass
> node scripts/build.js

Binary found at D:\demo\node_modules\node-sass\vendor\win32-x64-64\binding.node
Testing binary
Binary is fine

// 写package-lock.json
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN demo@1.0.0 No description
npm WARN demo@1.0.0 No repository field.

+ node-sass@4.13.0
added 174 packages from 138 contributors and audited 529 packages in 24.379s
found 0 vulnerabilities
```

我们可以看到，安装 node-sass 有几个步骤：

1. 校验本地 node_modules 中是否已安装 node-sass，版本是否一致;
2. 如未安装或版本不符，从 npm 源安装 node-sass 本体;
3. 检测全局缓存和本地中是否有`binding.node`, 如有即跳过安装;
4. 没有`binding.node`则从 github 下载该二进制文件并将其缓存到全局;
5. 假如`binding.node`下载失败，则尝试本地编译出该文件;
6. 将版本信息写到`package-lock.json`;

由此看到，实际上 node-sass 依赖了一个二进制文件`binding.node`，从 npm 源安装完本体后还会从 github 下载`binding.node`。

因此安装 node-sass 相关的失败原因有以下几种：

## 原因一: npm 源速度慢

由于众所周知的国内网络环境，从国内安装官方源的依赖包会很慢。可以将 npm 源设置成国内镜像源 (如淘宝 npm)：

```bash
npm config set registry https://registry.npm.taobao.org
```

或者通过`.npmrc`文件设置:

```bash
// .npmrc
registry=https://registry.npm.taobao.org/
```

## 原因二: binding.node 源无法访问或速度慢

node-sass 除了 npm 部分的代码，还会下载二进制文件`binding.node`，默认源是 github，国内访问较慢, 特殊时期甚至无法访问。我们也可以将其改成国内源：

```bash
// linux、mac 下
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

// window 下
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ && npm install node-sass
```

或者通过`.npmrc`文件设置:

```bash
// .npmrc
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

有类似问题的还有`chromedriver`,`phantomjs`,`electron`等常见依赖包, 我们可以一并写到`.npmrc`中:

```bash
// .npmrc
sass_binary_site=https://npm.taobao.org/mirrors/node-sass
chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs
electron_mirror=https://npm.taobao.org/mirrors/electron
```

## 原因三: node 版本与 node-sass 版本不兼容

node-sass 版本兼容性并不好，老项目中依赖的 node-sass 很可能已经不兼容新的 node，对应版本兼容如下 (或参考[官方仓库](https://github.com/sass/node-sass))：

<table><thead><tr><th>NodeJS</th><th>Minimum node-sass version</th><th>Node Module</th></tr></thead><tbody><tr><td>Node 13</td><td>4.13+</td><td>79</td></tr><tr><td>Node 12</td><td>4.12+</td><td>72</td></tr><tr><td>Node 11</td><td>4.10+</td><td>67</td></tr><tr><td>Node 10</td><td>4.9+</td><td>64</td></tr><tr><td>Node 8</td><td>4.5.3+</td><td>57</td></tr></tbody></table>

本文开头的安装例子中，`binding.node`的版本是`v4.13.0/win32-x64-64_binding.node`, 可以看到，里面包括 node-sass 版本号`v4.13.0`, 平台`win32`, 架构`x64`, 以及`Node Module`的版本 64。Node Module 是 node 的一个模块，其版本号可以在进程`process.versions`中查到：

```bash
PS D:\demo> node
> console.log(process.versions);
{ http_parser: '2.8.0',
  node: '10.15.3',
  v8: '6.8.275.32-node.51',
  uv: '1.23.2',
  zlib: '1.2.11',
  ares: '1.15.0',
  modules: '64',
  nghttp2: '1.34.0',
  napi: '3',
  openssl: '1.1.0j',
  icu: '62.1',
  unicode: '11.0',
  cldr: '33.1',
  tz: '2018e' }
undefined
>
```

如上显示，node10.15.3 对应的 module 版本为 64。
假如 node-sass 与 node 的版本不兼容，就会找不到对应的`binding.node`而报错，例如你的 node 是 10.15.3，装 node-sass4.6.1，则会尝试安装`v4.6.1/win32-x64-64_binding.node`, 但这个版本的`binding.node`是不存在的。
此时改 node-sass 或 node 的版本即可。

## 原因四: 缓存中 binding.node 版本不一致

假如本地 node 版本改了，或在不同机器上运行，node 版本不一致，会报类似错误：

```bash
Found bindings for the following environments:
  - Windows 64-bit with Node.js 6.x
```

这是因为原有`binding.node`缓存跟现 node 版本不一致。按提示`npm rebuild node-sass`或清除缓存重新安装即可。

## 原因五: 安装失败后重新安装

安装失败后重新安装，有可能无权限删除已安装内容，此时`npm uninstall node-sass`或手动删掉原目录后再安装即可。

## 原因六: 提示没有安装 python、build 失败等

假如拉取`binding.node`失败，node-sass 会尝试在本地编译`binding.node`，过程就需要 python。假如你遇到前面几种情况解决了，实际上也不会出现在本地构建的情况了，我们就不谈这种失败中失败的情况吧 :-)
