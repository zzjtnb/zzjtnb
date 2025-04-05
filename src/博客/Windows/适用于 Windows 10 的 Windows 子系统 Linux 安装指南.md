---
title: 适用于 Windows 10 的 Windows 子系统 Linux 安装指南
category: Windows
tags:
  - Linux
cover: https://cdn.pixabay.com/photo/2020/07/19/20/27/code-5421210_960_720.jpg
---


### 在本文中

1. [Windows 预览体验成员的简化安装]
2. [手动安装步骤]
3. [步骤 1 - 为 Linux 启用 Windows 子系统]
4. [步骤 2 - 检查运行 WSL 2 的要求]
5. [步骤 3 - 启用虚拟机功能]
6. [步骤 4 - 下载 Linux 内核更新包]
7. [第 5 步 - 将 WSL 2 设置为默认版本]
8. [第 6 步 - 安装您选择的 Linux 发行版]
9. [安装 Windows 终端(可选)]
10. [将您的分发版本设置为 WSL 1 或 WSL 2]
11. [Troubleshooting installation]

有两个选项可用于安装适用于 Linux 的 Windows 子系统 (WSL):

- **[简化安装]** _(预览版)_:`wsl --install`

  该 `wsl --install` 简化的安装命令要求您加入[的 Windows 业内人士程序](https://insider.windows.com/getting-started)并安装 Windows 10(OS 构建 20262 或更高)的预览构建,但无需按照手册安装步骤.您需要做的就是打开一个具有管理员权限的命令窗口并运行`wsl --install`,重启后您就可以使用 WSL.

- **[手动安装]**:按照下面列出的六个步骤进行操作.

  下面列出了 WSL 的手动安装步骤,可用于在任何版本的 Windows 10 上安装 Linux.

笔记

如果您在安装过程中遇到问题,请查看本页底部的[安装疑难解答]部分.

## Windows 预览体验成员的简化安装

在 Windows 10 的最新 Windows Insiders 预览版中,适用于 Linux 的 Windows 子系统的安装过程得到了显着改进,用单个命令替换了以下手动步骤.

为了使用 `wsl --install` 简化的安装命令,您必须:

- 加入 [Windows 预览体验计划](https://insider.windows.com/getting-started)
- 安装 Windows 10 的预览版本(操作系统版本 20262 或更高版本).
- 以管理员权限打开命令行窗口

满足这些要求后,要安装 WSL:

- 在您以管理员模式打开的命令行中输入此命令: `wsl.exe --install`
- 重启你的机器

第一次启动新安装的 Linux 发行版时,将打开一个控制台窗口,并要求您等待文件解压缩并存储在您的 PC 上.未来的所有发布都应该不到一秒钟.

然后,您需要[为新的 Linux 发行版创建用户帐户和密码](user-support).

**恭喜!您已经成功安装并设置了一个与您的 Windows 操作系统完全集成的 Linux 发行版!**

--install 命令执行以下操作:

- 启用可选的 WSL 和虚拟机平台组件
- 下载并安装最新的 Linux 内核
- 将 WSL 2 设置为默认值
- 下载并安装 Linux 发行版*(可能需要重新启动)*

默认情况下,安装的 Linux 发行版将是 Ubuntu.这可以使用 `wsl --install -d <Distribution Name>`. *(替换`<Distribution Name>`为所需发行版的名称.)*在使用该 `wsl --install -d <Distribution Name>`命令进行初始安装后,可能会将其他 Linux 发行版添加到您的计算机中.

要查看可用 Linux 发行版的列表,请输入 `wsl --list --online`.

## 手动安装步骤

如果您使用的不是 Windows Insiders 版本,则需要按照以下步骤手动启用 WSL 所需的功能.

## 步骤 1 - 为 Linux 启用 Windows 子系统

在 Windows 上安装任何 Linux 发行版之前,您必须首先启用 "适用于 Linux 的 Windows 子系统" 可选功能.

以管理员身份打开 PowerShell 并运行:

```shell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

我们建议现在继续第 2 步,更新到 WSL 2,但如果您只想安装 WSL 1,您现在可以**重新启动**计算机并继续[第 6 步 - 安装您选择的 Linux 发行版](install-win10#step-6---install-your-linux-distribution-of-choice).要更新到 WSL 2,请**等待重新启动**计算机并继续下一步.

## 步骤 2 - 检查运行 WSL 2 的要求

要更新到 WSL 2,您必须运行 Windows 10.

- 对于 x64 系统:**版本 1903** 或更高版本,**Build 18362** 或更高版本.
- 对于 ARM64 系统:**版本 2004** 或更高版本,**Build 19041** 或更高版本.
- 低于 18362 的版本不支持 WSL 2.使用 [Windows 更新助手](https://www.microsoft.com/software-download/windows10)更新您的 Windows 版本.

要检查您的版本和内部版本号,请选择 **Windows 徽标键 + R**,键入 **winver**,然后选择 **OK**.在 "设置" 菜单中[更新到最新的 Windows 版本](ms-settings:windowsupdate).

笔记

如果您运行的是 Windows 10 版本 1903 或 1909,请从 Windows 菜单中打开 "设置",导航至 "更新和安全" 并选择 "检查更新".您的内部版本号必须是 18362.1049+ 或 18363.1049+,次要版本号超过 0.1049.阅读更多:[Windows 10 版本 1903 和 1909 即将提供 WSL 2 支持](https://devblogs.microsoft.com/commandline/wsl-2-support-is-coming-to-windows-10-versions-1903-and-1909/).请参阅[故障排除说明](troubleshooting#im-on-windows-10-version-1903-and-i-still-do-not-see-options-for-wsl-2).

## 步骤 3 - 启用虚拟机功能

在安装 WSL 2 之前,您必须启用**虚拟机平台**可选功能.您的机器将需要[虚拟化功能](troubleshooting#error-0x80370102-the-virtual-machine-could-not-be-started-because-a-required-feature-is-not-installed)才能使用此功能.

以管理员身份打开 PowerShell 并运行:

```shell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

**重新启动**机器以完成 WSL 安装并更新到 WSL 2.

```shell
wsl.exe --update
```

## 步骤 4 - 下载 Linux 内核更新包

1. 下载最新的软件包:

    - [适用于 x64 机器的 WSL2 Linux 内核更新包](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)

    笔记

    如果您使用的是 ARM64 机器,请改为下载 [ARM64 包](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_arm64.msi).如果您不确定自己的计算机类型,请打开命令提示符或 PowerShell 并输入:`systeminfo | find "System Type"`.**警告:**在非英语的 Windows 版本上,您可能需要修改搜索文本,例如,德语为 `systeminfo | find "Systemtyp"`.

2. 运行上一步下载的更新包.(双击运行 - 系统将提示您提升权限,选择 "是" 以批准此安装.)

安装完成后,继续下一步 - 在安装新的 Linux 发行版时将 WSL 2 设置为默认版本.(如果您希望将新的 Linux 安装设置为 WSL 1,请跳过此步骤).

笔记

有关更多信息,请阅读 [Windows 命令行博客](https://aka.ms/cliblog)上提供的[更新 WSL2 Linux 内核](https://devblogs.microsoft.com/commandline/wsl2-will-be-generally-available-in-windows-10-version-2004)的文章[更改](https://devblogs.microsoft.com/commandline/wsl2-will-be-generally-available-in-windows-10-version-2004).[](https://aka.ms/cliblog)

## 第 5 步 - 将 WSL 2 设置为默认版本

在安装新的 Linux 发行版时,打开 PowerShell 并运行此命令以将 WSL 2 设置为默认版本:

```shell
wsl --set-default-version 2
```

## 第 6 步 - 安装您选择的 Linux 发行版

1. 打开 [Microsoft Store](https://aka.ms/wslstore) 并选择您喜欢的 Linux 发行版.

    ![store](https://docs.microsoft.com/en-us/windows/wsl/media/store.png)

    以下链接将为每个分发打开 Microsoft 商店页面:

    - [Ubuntu 18.04 LTS](https://www.microsoft.com/store/apps/9N9TNGVNDL3Q)
    - [Ubuntu 20.04 LTS](https://www.microsoft.com/store/apps/9n6svws3rx71)
    - [openSUSE Leap 15.1](https://www.microsoft.com/store/apps/9NJFZK00FGKV)
    - [SUSE Linux Enterprise Server 12 SP5](https://www.microsoft.com/store/apps/9MZ3D1TRP8T1)
    - [SUSE Linux Enterprise Server 15 SP1](https://www.microsoft.com/store/apps/9PN498VPMF3Z)
    - [Kali Linux](https://www.microsoft.com/store/apps/9PKR34TNCV07)
    - [Debian GNU/Linux](https://www.microsoft.com/store/apps/9MSVKQC78PK6)
    - [Fedora Remix for WSL](https://www.microsoft.com/store/apps/9n6gdm4k2hnc)
    - [Pengwin](https://www.microsoft.com/store/apps/9NV1GV1PXZ6P)
    - [Pengwin Enterprise](https://www.microsoft.com/store/apps/9N8LP0X93VCP)
    - [Alpine WSL](https://www.microsoft.com/store/apps/9p804crf0395)

2. 从发行版的页面中,选择 "获取".

    ![ubuntustore](https://docs.microsoft.com/en-us/windows/wsl/media/ubuntustore.png)

第一次启动新安装的 Linux 发行版时,将打开一个验证窗口,并要求您等待一两分钟,以便文件解压缩并存储在您的 PC 上.未来的所有发布都应该不会发生.

然后,您需要[为新的 Linux 发行版创建用户帐户和密码](https://zzjtnb.com/blog/details/wndxlinuxfxbcjyhzhhmm).

![ubuntuinstall](https://docs.microsoft.com/en-us/windows/wsl/media/ubuntuinstall.png)

**恭喜!您已经成功安装并设置了一个与您的 Windows 完全集成的 Linux 发行版!**

## 安装窗口终端(任选)

Windows Terminal 可启用多种选项卡(在多种 Linux 命令行.Windows 浪费.电源外壳.Azure CLI 等之间快速切换).创建自定义键绑定(用于打开或关闭选项卡的快捷方式).复制+粘贴等),使用搜索功能和自定义主题配色方案.字体样式和大小.背景图片 / 模糊 / 不知).[了解更多.](https://docs.microsoft.com/en-us/windows/terminal/)

[安装 Windows Terminal](https://docs.microsoft.com/en-us/windows/terminal/get-started).

![terminal](https://docs.microsoft.com/en-us/windows/wsl/media/terminal.png)

## 将您的版本设置为 WSL 1 或 WSL 2

您可以通过打开 PowerShell 命令行并输入命令(仅适用于[Windows Build 18362 或更高版本](ms-settings:windowsupdate)`ms-settings:windowsupdate`)来检查分配给您安装的每个 Linux 发行版的 WSL 版本:`wsl -l -v`

```shell
wsl --list --verbose
```

拟发行版设置为由其他版本的 WSL 支持,请运行:

```shell
wsl --set-version <distribution name> <versionNumber>
```

确保替换`<distribution name>`为您的发行版的实际名称和`<versionNumber>`数字 "1" 或 "2".您可以通过运行与上述相同的命令随时更改回 WSL 1,但将 "2" 替换为 "1".

> 注意
> 可根据目标版本的大小,从 WSL 1 到 WSL 2 的更新可能需要完成.如果您从 Windows 10 周年更新或创意者更新运行 WSL 1 的较旧(旧)安装,您可能会遇到更新错误.按照这些说明[卸载和删除任何旧版发行版](https://docs.microsoft.com/en-us/windows/wsl/install-legacy#uninstallingremoving-the-legacy-distro).
> 如果结果为无效命令 `wsl --set-default-version` ,请输入`wsl --help`.如果_命令_`--set-default-version` 未列出,则表示您的操作系统不支持它,您需要更新到 1903 版.Build 18362 或更高版本.如果您使用的是 ARM64 的 Build 19041,则在使用 PowerShell 时此命令可能会失败,在这种情况下,您可以使用来发出命令 `wsl.exe` .
> 如果你在运行命令后看到提示:`WSL 2 requires an update to its kernel component. For information please visit https://aka.ms/wsl2kernel`.您还需要安装 MSI Linux 内核更新包.

另外,如果您希望 WSL 2 成为您的默认系统,您可以使用以下命令:

```shell
wsl --set-default-version 2
```

这将安装的任何新发行版的版本设置为 WSL 2.

## 安装疑难解答

下面是相关的错误和建议的修复.有关其他常见错误及解决方案,请参阅[WSL 故障排除页面](https://docs.microsoft.com/en-us/windows/wsl/troubleshooting).

- **安装失败,错误 0x80070003**

  - 适用于 Linux 的 Windows 驱动器仅在您的系统驱动器(通常是您的驱动器)上运行 `C:` .确保发布版本存储在您的系统驱动器上:
  - 打开**设置**->**系统**->**存储**->**更多存储设置:更改新内容的保存位置** ![appstorage](https://docs.microsoft.com/en-us/windows/wsl/media/appstorage.png)

- **WslRegisterDistribution 失败,错误为 0x8007019e**

  - 未启用 Linux 任选组件的 Windows 组件:
  - 打开**控制面板**->**程序和功能**->**打开或关闭 Windows 功能**->检查**适用于 Linux 的 Windows**或使用本文开头的 PowerShell cmdlet.

- **安装失败,错误 0x80070003 或错误 0x80370102**

  - 请确保在计算机的 BIOS 中启用虚拟化.关于如何执行此操作的说明因计算机而异,并且很可能在与 CPU 相关的选项下.
  - WSL2 要求您的 CPU Support 二级地址转换 (SLAT) 功能,该功能已在 Intel Nehalem 处理器(Intel Core 1st Generation)和 AMD Opteron 中日期.可能成功安装了虚拟机平台,较旧的 CPU(例如 Intel Core 2 Duo)也无法运行 WSL2.

- **尝试升级时出错: `Invalid command line option: wsl --set-version Ubuntu 2`**

  - 确保您已启用适用于 Linux 的 Windows 每周,并且您使用的是 Windows Build 版本 18362 或更高版本.要启用 WSL 在 PowerShell 中以管理员权限运行此命令`Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`.

- **由于虚拟磁盘系统限制,无法完成请求的操作.虚拟硬盘文件必须是未压缩和未加密的,并且不能是现实的.**

  - 通过打开 Linux 发行版的配置文件文件夹,取消选择 "压缩内容"(以及 "洗内容"(如果选中)).它应该位于 Windows 文件系统上的一个文件夹中,例如:`USERPROFILE%\AppData\Local\Packages\CanonicalGroupLimited...`
  - 在这个 Linux 发行版配置文件中,应该有一个 LocalState 文件夹.右键单击此文件夹以显示选项菜单.选择 "属性">"高级",然后确保取消选中(未选中)"压缩内容以节省磁盘空间" 和 "加密内容以保护数据" 复选框.如果系统询问您是仅将其应用于当前文件夹还是所有子文件夹和文件,请选择 "仅此文件夹",因为您只是清除了压缩标志.在此之后,该 `wsl --set-version` 命令应该可以工作.

![troubleshooting-virtualdisk-compress](https://docs.microsoft.com/en-us/windows/wsl/media/troubleshooting-virtualdisk-compress.png)

笔记

就我而言,我的 Ubuntu 18.04 发行版的 LocalState 文件夹位于 C:\Users<my-user-name>\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu18.04onWindows_79rhkp1fndgsc

检查[WSL 文档 GitHub 线程 #4103](https://github.com/microsoft/WSL/issues/4103),其中正在跟踪此问题以获取更新信息.

- **术语 "wsl" 不被识别为 cmdlet.函数.脚本文件或可运行程序的名称.**

  - 安装确保了[适用于 Linux 的组件可选](install-win10#step-3---enable-virtual-machine-feature)的[的 Windows 子系统](install-win10#step-3---enable-virtual-machine-feature).此外,如果您使用的是 ARM64 设备并从 PowerShell 运行此命令,您将收到此错误.而是[PowerShell 核心](/en-us/powershell/scripting/install/installing-powershell-core-on-windows) `wsl.exe` 从 [](/en-us/powershell/scripting/install/installing-powershell-core-on-windows)或命令提示符运行.

- **错误:此更新仅适用于装有适用于 Linux 的 Windows 子系统的计算机.**

  - 要安装 Linux 内核更新 MSI 包,需要 WSL 并且应该首先启用.如果失败,您将看到消息:`This update only applies to machines with the Windows Subsystem for Linux`.
  - 您看到此消息的可能原因有以下三个:

  1. 您仍然使用不支持 WSL 2 的旧版 Windows.有关版本要求和更新链接,请参阅步骤 #2.

  2. WSL 未启用.您需要返回第 1 步并确保在您的计算机上启用了可选的 WSL 功能.

  3. 启用 WSL 后,需要重新启动才能生效,请重新启动机器并重试.

- **错误:WSL 2 需要更新其内核组件.有关信息,请访问 [https://aka.ms/wsl2kernel](https://aka.ms/wsl2kernel).**

  - 如果 %SystemRoot%\system32\lxss\tools 文件夹中缺少 Linux 内核包,则会遇到此错误.通过在这些安装说明的第 4 步中安装 Linux 内核更新 MSI 包来解决它.您可能需要从 ["添加或删除程序"中](ms-settings:appsfeatures-app)(`ms-settings:appsfeatures-app`)卸 MSI,然后重新安装.
