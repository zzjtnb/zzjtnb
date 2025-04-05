---
title: linux下node.js和npm升级
category: Linux
tags:
  - linux
cover: https://cdn.pixabay.com/photo/2016/04/20/19/47/wolf-1341881_960_720.jpg
---


## Node

## Node.js 的开发非常活跃, 它的最新稳定版本也频繁变化, 你不时会发现, 一个模块不能在你当前的 Node 版本上使用, 此时你需要升级 Node

## 幸运的是, 可以用一种非常简单的方法来管理你的 Node 版本, 即使用 Node Binary 管理模块"n"

## 1. 检查 Node 的当前版本, 使用命令

```bash
node -v  

```

## 2. 清除 npm cache

```bash
sudo npm cache clean -f   
```

## 3. 安装 n 模块

```bash
sudo npm install -g n    

```

## 4. 升级到最新版本(该步骤可能需要花费一些时间)

 你可以制定一个受欢迎的版本, 比如

```bash
sudo n 0.8.11   
```

或者你也可以告诉管理器, 安装最新的稳定版本

``` bash
sudo n stable  
```

## 5. 查看 Node 的版本, 检查升级是否成功

```bash
node -v  

```

如果得到的版本信息不正确, 你可能需要重启机器

## NPM

## 1. 检查 npm 的当前版本, 使用命令

```bash
npm-v  
```

## 2. npm 版本更新

``` bash
sudo npm install -g npm
```
