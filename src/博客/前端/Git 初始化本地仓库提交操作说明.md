---
title: git初始化本地仓库提交操作说明
category: 前端
tags:
  - Git
cover: https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_960_720.jpg
---

git 关联仓库、拉取代码、提交代码完整流程

  1. 本地项目上传到 github 上指定项目地址

      在项目里面打开点击右键

      ```bash
      git bash here
      ```

  2. 通过命令把这个目录变成 git 可以管理的仓库:

      ```bash
      git init
      ```

  3. 关联到远程库, 这里的远程仓库选择 Clone with HTTPS 的地址.

      ```bash
      git remote add origin https://github.com/***/***.git
      ```

  4. 把文件添加到版本库中, 添加到暂存区里面去, 不要忘记后面的小数点".", 意为添加文件夹下的所有文件

      ```bash
      git add .
      ```

  5. 告诉 Git, 把文件提交到本地仓库. 引号内为提交说明

      ```bash
      git commit -m 'creat project'
      ```

  6. 拉取文件合并冲突

      ```bash
      git pull https://github.com/***/***.git master --allow-unrelated-histories
      ```

  7. 出错 fatal: refusing to merge unrelated histories

      ```bash
      git pull origin master --allow-unrelated-histories
      ```

  8. 本地库的内容推送到远程

      ```bash
      git push origin master
      ```

### 以上是当你本地与线上仓库都有文件时的操作方法, 线上如果是一个空的仓库可以直接跳过 6、7 步

## 注意: 如果推送到远程报错了说明你本地有文件, 就先拉再推, 再合并冲突并提交到本地, 再推送到远程

**

```bash
git pull  https://github.com/***/***.git master
```

再处理 本地冲突文件

```bash

```bash
git commit -m 'creat project'
```

```bash
git push origin master
```
