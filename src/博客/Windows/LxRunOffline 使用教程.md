---
title: LxRunOffline 使用教程
category: Windows
tags:
  - LxRunOffline
cover: https://cdn.pixabay.com/photo/2021/06/27/03/06/supreme-administrative-court-6367607_960_720.jpg
---

## 前言

虽然 WSL (Win­dows Sub­sys­tem for Linux) 可以直接访问 Win­dows 下的文件, 但是因为文件权限的问题, 把需要在 WSL 中使用的文件放在 WSL 的用户主目录是最好的解决方案没有之一. 为了不撑爆系统盘, 除了修改 Win­dows 应用安装位置, 还可以把 WSL 整个安装目录进行转移, 使用 `wsl --export` 和 `wsl --import` 这两个命令可以对 WSL 进行打包再自定义目录安装,就相当于转移.我以为这已经是相当完美的解决方案了,但最近发现了一款非常实用的 WSL 管理软件:[LxRunOffline](https://github.com/DDoSolitary/LxRunOffline),它可以安装任意发行版到任意目录.转移已安装的 WSL 目录.备份 WSL.设置默认用户和修改环境变量等操作,完全碾压 `wsl`.`wslconfig` 这些简陋原生管理命令.

## 安装 LxRunOffline

* 普通手动安装:下载解压 [LxRunOffline](https://github.com/DDoSolitary/LxRunOffline/releases) ,并设置环境变量().
* 使用 [Chocolatey](https://chocolatey.org/) 安装.

```bash
choco install lxrunoffline
```

* 使用 [Scoop](https://scoop.sh/) 安装.

```bash
scoop bucket add extras
scoop install lxrunoffline
```

当然最为简单的安装办法则是直接在其 GitHub 上下载安装, 文件下载并解压缩之后设置环境变量 , 解压路径添加到系统变量`Path`.

如果需要未来可以通过右键菜单功能执行某些功能操作, 则需要**以管理员权限打开终端**, 再执行下面的命令, 完成功能注册.

### 注册

```bash
regsvr32 LxRunOfflineShellExt.dll
```

### 取消注册

```bash
regsvr32 /u LxRunOfflineShellExt.dll
```

## LxRunOffline 选项及参数

开发者并没有在 GitHub 上给出任何选项参数说明, 你需要在终端内直接输入 `lxrunoffline` 查看, 这里列举一下当前版本 `(LxRunOffline-v3.5.0-27)` 的选项说明. 相关的参数可以直接输入选项查看, 比如 `lxrunoffline i`.

```bash
支持的操作是:
  l, list - 列出所有已安装的发行版.
  gd, get-default - 获取 bash.exe 使用的默认发行版.
  sd, set-default - 设置 bash.exe 使用的默认发行版.
  i, install - 安装新的发行版.
  sd, set-default - 设置 bash.exe 使用的默认发行版.
  ui, uninstall - 卸载发行版.
  rg, register - 注册现有的安装目录.
  ur, unregister - 取消注册发行版但不删除安装目录.
  m, move - 将发行版移动到新目录.
  d, duplicate - 在新目录中复制现有发行版.
  e, export - 将发行版的文件系统导出到.tar.gz 文件,该文件可以通过 install 命令安装.
和.
  r, run - 在发行版中运行命令.
  di, get-dir - 获取发行版的安装目录.
  gv, get-version - 获取发行版的文件系统版本.
  ge, get-env - 获取发行版的默认环境变量.
  se, set-env - 设置发行版的默认环境变量.
  ae, add-env - 添加到发行版的默认环境变量.
  re, remove-env - 从发行版的默认环境变量中删除.
  gu, get-uid - 获取发行版的默认用户的 UID.
  su, set-uid - 设置发行版的默认用户的 UID.
  gk, get-kernelcmd - 获取发行版的默认内核命令行.
  sk, set-kernelcmd - 设置发行版的默认内核命令行.
  gf, get-flags - 获取发行版的一些标志.有关详细信息,请参考[这里](https://docs.microsoft.com/en-us/windows/win32/api/wslapi/ne-wslapi-wsl_distribution_flags).
  sf, set-flags - 设置发行版的一些标志.有关详细信息,请参考[这里](https://docs.microsoft.com/en-us/windows/win32/api/wslapi/ne-wslapi-wsl_distribution_flags).
  s, shortcut - 创建启动发行版的快捷方式.
  ec, export-config - 将发行版配置导出到 XML 文件.
  ic, import-config - 从 XML 文件导入发行版的配置.
  sm, summary - 获取发行版的一般信息.
  version - 获取有关此 LxRunOffline.exe 的版本信息.
```

## 使用 LxRunOffline 安装 WSL

与微软商店的安装方式不同,LxRunOf­fline 安装 WSL 更灵活, 它可以安装任意发行版到任意目录, 还可以自定义 WSL 名称.

如果你没有使用过 WSL , 首先以管理员身份运行 Pow­er­Shell (WIN+X), 输入下面的命令开启 **适用于 Linux 的 Win­dows 子系统** 功能, 并重启.

```bash
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

下载 [WSL 官方离线包](https://docs.microsoft.com/en-us/windows/wsl/install-manual),改后缀名为`.zip`, 解压后可得到名为 `install.tar.gz` 的文件.或者在 [LxRunOffline WiKi](https://github.com/DDoSolitary/LxRunOffline/wiki) 中下载大佬们提供的镜像文件.

输入以下命令进行安装:

```bash
# lxrunoffline i -n <WSL名称> -d <安装路径> -f <安装包路径>.tar.gz
lxrunoffline i -n Ubuntu -d F:\Linux\Ubuntu -f F:\Linux\Ubuntu_2004.2020.424.0_x64\install.tar.gz
```

> 加入`-s`参数可在桌面创建快捷方式.

## 使用 LxRunOffline 设置默认用户

当修改过 WSL 的名称或目录后就无法通过[微软官方提供的方法](https://zzjtnb.com/blog/details/wndxlinuxfxbcjyhzhhmm)设置默认用户.这时可以使用 LxRunOf­fline 进行设置.

### 设置普通用户为默认用户

使用 LxRunOf­fline 新安装的 WSL 默认是以 root 用户登录, 如果你需要默认以普通用户进行登录, 就需要进行下面的操作.

#### 首先运行 WSL , 输入以下命令创建用户

```bash
# useradd -m -s /bin/bash <用户名>
useradd -m -s /bin/bash zzjtnb
```

#### 然后对该用户设置密码, 输入命令后会提示输入两次密码

```bash
# passwd <用户名>
passwd zzjtnb
```

#### 授予该用户 sudo 权限

```bash
# usermod -aG sudo <用户名>
usermod -aG sudo zzjtnb
```

> 为了保持和微软商店安装的效果一致,这里提及的方法是把用户添加到 sudo 用户组.其他关于 sudo 权限的设置方法以及免密设置可参考<[Linux 中授予普通用户 sudo 权限的正确方法](https://p3terx.com/archives/linux-grants-normal-user-sudo-permission.html)>这篇文章.

#### 查看用户 UID , 一般是 `1000`

```bash
# id -u <用户名>
id -u zzjtnb
```

按 `Ctrl`+`D` 退出 `WSL` , 在 `Pow­er­Shell` 中输入以下命令:

```bash
# lxrunoffline su -n <WSL名称> -v 1000
lxrunoffline su -n Ubuntu -v 1000
```

### 设置 root 为默认用户

root 用户的 UID 为 `0`, 所以可以直接在 Pow­er­Shell 输入以下命令进行设置:

```bash
# lxrunoffline su -n <WSL名称> -v 0
lxrunoffline su -n Ubuntu -v 0
```

## wsl1 升级为 wsl2

### 安装 wsl2 的前置设置

进入页面 [更新 WSL 2 Linux 内核](https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-kernel)

下载 Linux 内核更新包，安装更新。

## 用管理员模式启动 PowerShell 然后运行

**

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

```

这两个安装完成直接 重启 ！！！！！！！！！重启！！！！！！

### 升级

```bash
wsl --set-version Ubuntu 2
# 正在进行转换，这可能需要几分钟时间...
# 有关与 WSL 2 的主要区别的信息，请访问 https://aka.ms/wsl2
# 转换完成。
```

## 新 WSL 命令，切换 WSL 2 与 WSL 1 的命令

```bash
# 新的 WSL 还添加了一些命令来帮助用户控制和查看 WSL 版本和相关信息：

wsl --set-version <Distro> <Version>:切换 WSL 2 与 WSL 1

wsl --set-default-version <Version>：更改默认 WSL 版本

wsl --shutdown：立即终止所有正在运行的发行版和 WSL 2 VM

wsl --list --quiet：列出发行版名称

wsl --list --verbose：显示发行版的详细信息

wsl --shutdown - 停止wsl

wsl -d Ubuntu -重新启动
```

### 查看 已安装 wls 版本

```bash
wsl --list --verbose 或 wsl -l -v
#C:\Users\Administrator> wsl -l -v
#  NAME      STATE           VERSION
#* Ubuntu    Stopped         1
```

## 使用 LxRunOffline 运行 WSL

和原生运行方式本质上是一样的.

### 创建快捷方式

使用微软应用商店安装的 WSL 会在开始菜单添加应用图标 (快捷方式), 而使用 LxRunOf­fline 安装 WSL 时可以通过添加 `-s` 参数在桌面创建快捷方式. 如果你安装时忘记添加参数, 可以使用以下命令进行创建.

```bash
# lxrunoffline s -n <WSL名称> -f <快捷方式路径>.lnk
lxrunoffline s -n Ubuntu -f Desktop\Ubuntu.lnk
```

### 使用命令运行指定 WSL

在有多个 WSL 的情况下, 可以指定运行某个发行版.

```bash
# lxrunoffline r -n <WSL名称>
lxrunoffline r -n Ubuntu
```

> 等同于`wsl -d <WSL名称>`

## 使用 LxRunOffline 设置默认 WSL

设置默认 WSL 后, 可以在 `cmd` 和 `powershell` 中输入 `wsl` 直接调用默认的 WSL .

```bash
# lxrunoffline sd -n <WSL名称>
lxrunoffline sd -n Ubuntu
```

> 等同于`wsl -s <WSL名称>`

## 使用 LxRunOffline 修改 WSL 名称

### 查看 WSL 名称

```bash
wsl -l
```

### 查看 WSL 安装目录

```bash
# lxrunoffline di -n <WSL名称>
lxrunoffline di -n Ubuntu
```

### 导出指定的 WSL 配置文件到目标路径

```bash
# lxrunoffline ec -n <WSL名称> -f <配置文件路径>.xml
lxrunoffline ec -n Ubuntu -f F:\Linux\Backup\Ubuntu.xml
```

> 配置信息可以输入`lxrunoffline sm -n <WSL名称>`查看

### 取消注册 (这个操作不会删除目录)

```bash
# lxrunoffline ur -n <WSL名称>
lxrunoffline ur -n Ubuntu
```

### 使用新名称注册

```bash
# lxrunoffline rg -n <WSL名称> -d <WSL路径> -c <配置文件路径>.xml
lxrunoffline rg -n Ubuntu -d F:\Linux\Ubuntu -c F:\Linux\Backup\Ubuntu.xml
```

## 使用 LxRunOffline 转移 WSL 安装目录

LxRunOf­fline 可以对系统中已经安装的 WSL 进行目录转移操作, 拯救爆满的 C 盘.

### 查看系统中已安装的 WSL

```bash
lxrunoffline l
# Ubuntu
```

> 类似于`wsl -l`.LxRunOf­fline 不会显示默认 WSL , 查看默认 WSL 需要使用 `lxrunoffline gd`命令.

### 输入命令对 WSL 的目录进行移动

```bash
# lxrunoffline m -n <WSL名称> -d <路径>
LxRunOffline m -n Ubuntu -d F:\Linux\Ubuntu
```

### 最后查看路径, 进行确认

```bash
# lxrunoffline di -n <WSL名称>
lxrunoffline di -n Ubuntu

# F:\Linux\Ubuntu
```

## 使用 LxRunOffline 备份和恢复 WSL

使用 LxRunOf­fline 可以方便的对 WSL 进行备份和恢复, 同样可以实现转移的操作, 而且还可以在转移到其它电脑上.

### 备份 WSL

#### 查看系统中已安装的 WSL

```bash
wsl -l
# 适用于 Linux 的 Windows 子系统分发版:
# Ubuntu (默认)
```

#### 然后输入需要备份的 WSL 名称和备份的目标路径

```bash
# lxrunoffline e -n <WSL名称> -f <压缩包路径>.tar.gz
lxrunoffline e -n Ubuntu -f F:\Linux\Backup\Ubuntu.tar.gz
```

> 类似但不等同于`wsl --export <WSL名称> <压缩包路径>.tar`.LxRunOf­fline 备份完会生成一个`.xml`后缀的同名配置文件, 比如`WSL.tar.gz.xml`.

## 注意这里只能导出 wsl 为版本 1 的，版本 2 的不行，必须先转换成版本 1 的才行。方式看上面文章

**

### 恢复 WSL

输入以下命令可以恢复已备份的 WSL, 和安装是相同的命令.

```bash
# lxrunoffline i -n <WSL名称> -d <安装路径> -f <压缩包路径>.tar.gz
lxrunoffline i -n <WSL名称> -d <安装路径> -f <压缩包路径>.tar.gz
```

> 类似但不等同于`wsl --import <WSL名称> <安装路径> <压缩包路径>.tar`.LxRunOf­fline 会读取备份时生成的配置文件并写入配置, 前提是同目录且同名. 否则你需要加入`-c`参数指定配置文件.

## 使用 LxRunOffline 卸载 WSL

```bash
lxrunoffline l
# Ubuntu
# 卸载旧系统
lxrunoffline uninstall -n Ubuntu
```
