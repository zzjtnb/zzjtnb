---
title: 使windows10的 ubuntu子系统默认以 root用户登陆
category: Windows
tags:
  - Linux
cover: https://cdn.pixabay.com/photo/2016/07/12/19/51/americana-1512910_960_720.png
---

一般子系统就是自己用,每次启动还要人工切到 `root` 权限,很是麻烦,如何让 Windows 的 WSL 子系统默认 `root` 登入呢?

## 1. 首先重置 root 密码

以普通用户登录系统
在终端输入命令:

```bash
sudo passwd root
```

创建 root 用户的密码 , 然后根据提示一步一步来输入你要设置的密码(输密码是会发现看不到数入的密码, 这个貌似是防止偷窥的.)

## 2. 设置 默认 root 登录

- 用 `everything` 搜索 `ubuntu.exe`(一般默认在`C:\Program Files\WindowsApps\`下面的名称有`ubuntu`的文件夹)
- 打开 `ubuntu.exe` 所在路径,复制路径.
- 用管理员模式打开 `cmd`
- 输入 `cd` 然后粘贴复制的路径,按下回车键
- 然后输入:

```bash
ubuntu.exe config --default-user root
```

按下回车键
重启 `WSL` 子系统即可看到效果,默认登入的就是 `root` 账户了.
