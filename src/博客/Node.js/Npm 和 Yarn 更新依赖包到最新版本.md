---
title: npm和yarn更新依赖包到最新版本
category: Node.js
tags:
  - yarn
  - npm
cover: https://cdn.pixabay.com/photo/2021/03/26/15/21/beautiful-6126170_960_720.jpg
---

> npm 包的更新速度之快想必大家都了然于心，那么新版本发布后，怎样将依赖包更新到最新版本呢？
>
> 背景：独立维护项目的架构与开发工作，在升级依赖包时发现使用 yarn upgrade 更新依赖包，yarn.lock 文件更新了，但是 package.json 里依赖包的版本没有更新。

## 批量更新依赖包

### ①npm 更新方式

需要全局安装 npm-check-updates，然后执行 ncu -u 命令，回车后即可开始更新

```bash
npm install npm-check-updates --global
ncu -u
```

### ②yarn 更新方式

#### 第一种 (推荐使用这种更新方式，无需安装依赖)

```bash
yarn upgrade-interactive --latest
#需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
```

> 这与 npm-check 交互式更新模式类似。它提供了一种更新过时包的简单方法。
>
> yarn upgrade-interactive [--latest]
> upgrade-interactive 命令采用与基础 upgrade 命令相同的参数，并且其功能与基础命令相同。此命令将在执行任何升级之前显示过时的软件包，允许用户选择要升级的软件包。在 package.json 确定要升级的版本时，Yarn 将尊重版本范围。
>
> 你可以把它 yarn upgrade-interactive 看作是 yarn outdated 和 yarn upgrade [package...] 命令的组合。在 yarn outdated 显示过期软件包列表 yarn upgrade [package...] 并可用于升级所需软件包的位置，yarn upgrade-interactive 显示相同的过期软件包列表，并让您立即选择要升级的软件包。
>
> --latest：该标志告诉 Yarn 忽略 package.json 指定的版本范围，并使用 latest 注册表中标记的版本。

检测到需要更新的包后，空格键可以选择或取消单个需要更新的包，`A` 键可以切换所有需要更新的依赖包，最后回车即可更新。此命令将更新 `yarn.lock` 和 `package.json` 文件

#### 第二种

```bash
yarn upgrade package@version
# yarn.lock和package.json都会更新，但是会进行版本锁定 "echarts": "4.2.0-rc.2"
```

## 更新单个依赖包

以更新 vue 到最新版本为例

### ①npm 更新方式

```bash
npm i --save vue@latest
```

### ②yarn 更新方式

```bash
yarn add vue@latest
```
