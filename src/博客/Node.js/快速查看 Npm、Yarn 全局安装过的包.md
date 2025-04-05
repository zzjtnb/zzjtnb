---
title: 快速查看 npm、yarn全局安装过的包
category: Node.js
tags:
  - yarn
  - npm
cover: https://cdn.pixabay.com/photo/2018/05/26/01/21/wall-3430446_960_720.jpg
---

npm、yarn 可以很方便的帮助我们快速安装开发前端项目需要的各种依赖包

同时也有意无意的安装了不少全局安装包，有些可能不会再使用了，有些已经太旧

使用以下命令查看自己电脑曾经安装过哪些全局工具包，顺便把那些不再需要的卸载掉吧

## 查看 npm 全局安装过的包

```bash
$ npm list -g --depth=0

/usr/local/lib
├── npm@6.4.1
├── nrm@1.0.2
└── yrm@1.0.6
```

## 查看 yarn 全局安装过的包

```bash
$ yarn global list --depth=0

yarn global v1.9.4
info "@vue/cli@3.0.1" has binaries:
   - vue
info "create-react-app@1.5.2" has binaries:
   - create-react-app
✨  Done in 0.68s.
```

## npx 也许是个不错的选择

如果有些包我们只会使用一次，或者只想尝试以下，不想安装到全局，也不想作为当前项目的依赖
可以使用 `npx` 的方式来执行

`npx` 是 `npm 5.2+` 版本之后自带的工具，能够帮助我们更高效的执行 `npm` 软件仓库里的安装包

* 更方便的执行**_当前项目_**中的可执行工具，比如：

```bash
# npx 之前
$ node ./node_modules/.bin/mocha

# 使用 npx:
$ npx mocha
```

* 也可直接执行那些不在当前项目，也没在全局安装过的 `npm` 工具包，比如：`create-react-app`

```bash
$ npx create-react-app my-app
# 执行以上这条命令 npx 会按以下顺序工作：
# 1. 先查看当前项目有没 create-react-app
# 2. 如果当前项目找不到，会去全局查找 create-react-app
# 3. 如果全局还找不到，会帮我们临时从 npm 包仓库安装 create-react-app，不会污染到当前项目，也不会装到全局
```

✨ 重点推荐 ✨：对于那些不常使用、或者只想一次性尝试的工具，推荐使用 `npx` 的方式代替 `npm install -g`、`yarn global 全局安装`
