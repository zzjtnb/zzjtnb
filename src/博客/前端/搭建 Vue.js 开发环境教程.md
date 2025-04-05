---
title: 搭建vue开发环境教程
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_960_720.jpg
---

vue-cli 是一个官方发布 vue.js 项目脚手架, 使用 vue-cli 可以快速创建 vue 项目, GitHub 地址是:<https://github.com/vuejs/vue-cli>

一、 安装 node.js

``` js
首先需要安装node环境， 可以直接到中文官网http: //nodejs.cn/下载安装包。
 只是这样安装的 node 是固定版本的， 如果需要多版本的 node， 可以使用 nvm 安装[npv](http: //blog.csdn.net/s8460049/article/details/52396399)
  安装完成后， 可以命令行工具中输入 node - v 和 npm - v， 如果能显示出版本号， 就说明安装成功。
```

二、安装 vue-cli

``` js
安装好了 node， 我们可以直接全局安装 vue - cli：
npm install - g vue - cli
但是这种安装方式比较慢， 推荐使用国内镜像来安装， 所以我们先设置 cnpm：
npm install - g cnpm--registry = https: //registry.npm.taobao.org
 如果安装失败， 可以使用 npm cache clean 清理缓存， 然后再重新安装。 后面的安装过程中， 如有安装失败的情况， 也需要先清理缓存
同样可以使用 cnpm - v 查看是否安装成功
然后使用 cnpm 安装 vue - cli 和 webpack
cnpm install - g vue - cli
最新的 vue 项目模板中， 都带有 webpack 插件， 所以这里可以不安装 webpack
安装完成后， 可以使用 vue - V（ 注意 V 大写） 查看是否安装成功。
```

``` js
如果提示“ 无法识别 'vue'”，
有可能是 npm 版本过低， 可以使用 npm install - g npm 来更新版本
```

三、生成项目

``` js
首先需要在命令行中进入到项目目录， 然后输入：
vue init webpack Vue - Project
其中 webpack 是模板名称， 可以到 vue.js 的 GitHub 上查看更多的模板https: //github.com/vuejs-templates
 Vue - Project 是自定义的项目名称， 命令执行之后， 会在当前目录生成一个以该名称命名的项目文件夹 ? Project name vue_testdemo //项目名称 即html中的title
 ? Project description A Vue.js project //项目描述
 ? Author Brice //作者
 ? Vue build standalone //打包方式
 ? Install vue - router ? Yes //是否安装路由
 ? Use ESLint to lint your code ? Yes //使用ESLint规范代码
 ? Pick an ESLint preset Standard ? Set up unit tests No //单元测试
 ? Setup e2e tests with Nightwatch ? No ? Should we run `npm install`
for you after the project has been created ? (recommended) npm
```

``` js
 vue - cli· Generated "Vue-Project".
```

``` js
配置完成后， 可以看到目录下多出了一个项目文件夹， 里面就是 vue - cli 创建的一个基于 webpack 的 vue.js 项目
然后进入项目目录（ cd Vue - Project）， 使用 cnpm 安装依赖
cnpm install
然后启动项目
npm run dev
如果浏览器打开之后， 没有加载出页面， 有可能是本地的 8080 端口被占用， 需要修改一下配置文件 config > index.js
建议将端口号改为不常用的端口。 另外我还将 build 的路径前缀修改为 ' ./ '（
原本为 ' / '），
是因为打包之后， 外部引入 js 和 css 文件时， 如果路径以 ' / '
开头，
在本地是无法找到对应文件的（ 服务器上没问题）。 所以如果需要在本地打开打包后的文件， 就得修改文件路径。
```

四、打包上线

``` js
自己的项目文件都需要放到 src 文件夹下
项目开发完成之后， 可以输入 npm run build 来进行打包工作
npm run build
打包完成后， 会生成 dist 文件夹， 如果已经修改了文件路径， 可以直接打开本地文件查看
项目上线时， 只需要将 dist 文件夹放到服务器就行了。
```

*安装 npm install 时, 长时间停留在 fetchMetadata: sill 解决方法——换 npm 的源

``` js
安装npm install时， 长时间停留在fetchMetadata: sill mapToRegistry uri http: //registry.npmjs.org/whatwg-fetch处，
 此处需要在对应的URL处下载一些文件， 只要网络稳定， 一般花不了多长时间
但是， 最近两次操作都是长时间停留， 在网上找了一些原因， 才发现后面的URL地址可以由淘宝的源代替， 原来是资源问题导致的
方法如下：
更换成淘宝的源
npm config set registry https: //registry.npm.taobao.org 
 –配置后可通过下面方式来验证是否成功
npm config get registry– 或npm info express
```

[参考来源](https://www.cnblogs.com/wisewrong/p/6255817.html)
