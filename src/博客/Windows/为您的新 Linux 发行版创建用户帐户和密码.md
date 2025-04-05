---
title: 为您的新 Linux 发行版创建用户帐户和密码
category: Windows
tags:
  - Linux
cover: https://cdn.pixabay.com/photo/2018/04/23/14/43/ubuntu-3344434_960_720.png
---


> 使用适用于 Linux 的 Windows 子系统进行用户帐户和权限管理的参考.

### 在此中

1. [更新和升级包]
2. [发生你的 Linux 密码]
3. [忘记密码]

你已经可以使用[WSL 并安装到 Microsoft Store 上的 Linux 发行版](https://zzjtnb.com/blog/details/syywindows10dwindowszxtlinuxazzn),初步,你会被要求完成时打开新安装的 Linux 发行版是创建一个帐户,包括**用户名**和**密码**.

- 此**用户名**状语从句:**密码**特定于您安装的每个单独的的 Linux 发行版,与您的 Windows 用户名分享.

- 创建**用户名**和**密码后**,该帐户将成为开放的默认用户并在启动时自动登录.

- 此帐户将被视为 Linux 管理员,具有运行(超级用户执行)管理命令的能力 `sudo`.

- 在适用 Linux 的 Windows 用户上运行的每个 Linux 发行版于自己的 Linux 用户帐户和密码.每次添加发行版.安装或时,您必须必须配置 Linux 用户帐户.

![ubuntuinstall](https://docs.microsoft.com/en-us/windows/wsl/media/ubuntuinstall.png)

## 更新和升级包

期刊版附带一个空的或最小的包目录.我们强烈建议您不定期更新您的软件包目录并使用您的首选软件包管理器升级已安装的软件包.对于 Debian/Ubuntu,使用贴切:

```bash
sudo apt update && sudo apt upgrade
```

Windows 不会自动更新或升级您的 Linux 发行版.这是大多数 Linux 用户更喜欢控制自己的任务.

## 发生你的 Linux 密码

要更改密码,请打开您的 Linux 发行版(例如 Ubuntu)并输入命令: `passwd`

系统会要求您输入当前密码,然后要求输入新密码,然后确认新密码.

## 忘记密码

如果您忘记了 Linux 发行版的密码:

1. 打开 PowerShell 并使用以下命令输入默认 WSL 发行版的根目录: `wsl -u root`

    > 如果您需要在非默认发行版上更新忘记的密码,请使用命令:`wsl -d Debian -u root`,替换为目标发行版的名称 `Debian` .

2. 你的 WSL 发布在里面的 PowerShell 根级别被打开,你可以使用这个命令来更新你的密码:`passwd <WSLUsername>`这里`<WSLUsername>`是账户在其密码你已经忘记了 DISTRO 的用户名.

3. 系统将提示您输入新的 UNIX 密码,然后确认该密码.您的版本被告知密码已成功更新,请使用以下命令关闭 PowerShell 内的 WSL:`exit`

笔记

如果您运行的是早期版本的 Windows 操作系统,例如 1703(创作者更新)或 1709(创作者更新),请参阅[此用户帐户更新文档版本](https://docs.microsoft.com/en-us/windows/wsl/user-support-archived).
