---
title: Git 回滚到指定版本
category: Git
tags:
  - Git
cover: https://images.unsplash.com/photo-1539673433035-50b0c3110f1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1351&q=80
---

先看图：
![SourceTree.jpg](https://github.com/zzjtnb/static/blob/master/images/zzjtnb/SourceTree.jpg?raw=true)

**SourceTree** 中 **revert** 译为`提交回滚`，作用为忽略你指定的版本，然后提交一个新的版本。新的版本中已近删除了你所指定的版本。

**reset** 为 **重置到这次提交**，将内容重置到指定的版本。`git reset` 命令后面是需要加 2 种参数的：`–-hard` 和 `–-soft`。这条命令默认情况下是 `-–soft`。
执行上述命令时，这该条 commit 号之 后（时间作为参考点）的所有 commit 的修改都会退回到 git 缓冲区中。使用`git status` 命令可以在缓冲区中看到这些修改。而如果加上`-–hard`参数，则缓冲区中不会存储这些修改，git 会直接丢弃这部分内容。可以使用 `git push origin HEAD --force` 强制将分区内容推送到远程服务器。

#### 代码回退

默认参数 `-soft`, 所有 commit 的修改都会退回到 git 缓冲区
参数`--hard`，所有 commit 的修改直接丢弃

```bash
git reset --hard HEAD^        回退到上个版本
git reset --hard commit_id    退到/进到 指定commit_id

```

推送到远程

`$ git push origin HEAD --force`

#### 可以吃的后悔药 -> 版本穿梭

当你回滚之后，又后悔了，想恢复到新的版本怎么办？

用`git reflog`打印你记录你的每一次操作记录

```bash
$ git reflog

输出：
c7edbfe HEAD@{0}: reset: moving to c7edbfefab1bdbef6cb60d2a7bb97aa80f022687
470e9c2 HEAD@{1}: reset: moving to 470e9c2
b45959e HEAD@{2}: revert: Revert "add img"
470e9c2 HEAD@{3}: reset: moving to 470e9c2
2c26183 HEAD@{4}: reset: moving to 2c26183
0f67bb7 HEAD@{5}: revert: Revert "add img"

```

找到你操作的 id 如：`b45959e`，就可以回退到这个版本

```bash
git reset --hard b45959e
```

要想覆盖远程的话

```bash
# 推送到远程
git push origin HEAD --force
```
