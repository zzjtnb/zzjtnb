---
title: Vue打包后出现一些map文件
category: 前端
tags:
  - Vue
cover: https://images.unsplash.com/photo-1478034460338-249ef2da6c0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1953&q=80
---


问题： 可能很多人在做 vue 项目打包，打包之后 js 中，会自动生成一些 map 文件，怎么把它去掉不要呢？
运行 cnpm run build 开始打包后会在项目目录下自动创建 dist 目录，打包好的文件都在其中
解决办法：去 config/index.js 中改一个参数：
productionSourceMap:false
把这个改为 false。不然在最终打包的文件中会出现一些 map 文件

map 文件的作用：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
有了 map 就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
