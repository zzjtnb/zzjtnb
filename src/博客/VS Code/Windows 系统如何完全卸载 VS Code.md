---
title: Windows 系统如何完全卸载 VSCode
category: VS Code
tags:
  - VS Code
cover: https://images.unsplash.com/photo-1531332284185-744ef7764058?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---


* * *

### 文章目录

* [Windows 系统如何完全卸载 VSCode]

* [0. 参考资料]
* [1. 删不干净的用户数据]
* [2. 解决方案]

* * *

0. 参考资料

* * *

* [Uninstall visual studio code in windows](https://stackoverflow.com/questions/47689536/uninstall-visual-studio-code-in-windows)

* * *

1. 删不干净的用户数据

* * *

最近正在从 `Sublime Text 3` 环境切换到 `VS Code`，看重的是后者的开源、免费、跨平台等特性，以及强大的后台与广泛的用户群。
但是对 `VS Code` 的一次卸载重装之后，我发现之前的插件和配置还在，不禁感叹这么多年了，微软还是没有学会软件的正确卸载姿势，只能自己动手将其卸载干净了。

* * *

2. 解决方案

* * *

> **注意**：以下步骤需要在执行 `VSCode` 自带卸载程序之后执行。

* `win + r` 打开运行
* `%appdata%` 回车
* 删除 `Code` 和 `Visual Studio Code` 文件夹
* 地址栏输入 `%userprofile%` 回车
* 删除 `.vscode` 文件夹

* * *
