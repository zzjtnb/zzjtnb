---
title: Flutter 和 Android 环境搭建之仅限命令行工具创建虚拟机
category: Flutter
tags:
  - Flutter
  - Android
cover: https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png
---


## JDK

### 下载安装

[JDK 开发工具包下载](https://www.oracle.com/java/technologies/downloads/)

### 配置环境变量

1. `右键此电脑属性 -> 高级系统设置 -> 环境变量`, 新建 `JAVA_HOME` 系统变量, 变量值为 `JDK 安装路径`, 比如 `D:\Program Files\Java\jdk-21`

2. 在 `Path` 系统变量中添加`%JAVA_HOME%\bin`

查看

```bash
# echo %JAVA_HOME%
# D:\Program Files\Java\jdk-21

java
# 用法:java [options] <主类> [args...]

java -version
# java version "21.0.1" 2023-10-17 LTS
# Java(TM) SE Runtime Environment (build 21.0.1+12-LTS-29)
# Java HotSpot(TM) 64-Bit Server VM (build 21.0.1+12-LTS-29, mixed mode, sharing)
```

## Android SDK 工具详解

`Android SDK` 中包含了开发应用所需的多个软件包. 下面列出了可供使用的最重要的命令行工具 (按提供这些工具的软件包整理).

您可以使用 `Android Studio` 的 `SDK 管理器`或 `sdkmanager` 命令行工具来安装和更新每个软件包. 所有软件包都会下载到 `Android SDK` 目录中, 您可以按以下方式找到此目录:

1. 在 Android Studio 中, 依次点击 `File > Project Structure`.
2. 在左窗格中, 选择 `SDK Location`. 该路径即显示在 `Android SDK location` 下.

如果您不需要 `Android Studio`, 您可以下载下面的基本 `Android SDK 命令行工具 (commandlinetools)`. 您可以使用随附 `sdkmanager` 的下载其他 `SDK` 包.

下面是推荐的软件包

您应该特别考虑 SDK Tools 标签页中的以下工具:

### Android SDK 命令行工具 (commandlinetools)

**必需** 包括 ProGuard 等基本工具. 如需了解已废弃的 SDK 工具软件包, 请参阅 [SDK 工具版本说明](https://developer.android.com/studio/releases/sdk-tools?hl=zh-cn).

位置:`android_sdk/cmdline-tools/{version}/bin/`
>注意:Android SDK 命令行工具软件包 (位于 cmdline-tools) 取代了 SDK 工具软件包 (位于 tools). 使用新软件包时, 您可以选择要安装版本的命令行工具, 还可以一次安装多个版本. 使用旧软件包时, 您只能安装最新版本的工具. 因此, 新软件包可让您在发布新版本时依赖于特定版本的命令行工具, 而不会造成代码中断.

如果您不使用 `Android Studio`, 可以在[此处](https://developer.android.com/tools?hl=zh-cn)下载命令行工具软件包.

[apkanalyzer](https://developer.android.com/studio/command-line/apkanalyzer)

用于在构建流程完成后深入分析您的 APK 组成.

[avdmanager](https://developer.android.com/studio/command-line/avdmanager)

用于从命令行创建和管理 Android 虚拟设备 (AVD).

[lint](https://developer.android.com/studio/write/lint#commandline)

用于扫描代码, 可帮助您识别和纠正代码结构质量方面的问题.

[retrace](https://developer.android.com/studio/command-line/retrace)

对于由 R8 编译的应用,`retrace` 会解码经过混淆处理的堆栈轨迹, 该堆栈轨迹会映射回您的原始源代码.

[sdkmanager](https://developer.android.com/studio/command-line/sdkmanager)

用于查看, 安装, 更新和卸载 Android SDK 的软件包.

#### 安装

1. 创建一个名为`android_sdk`文件夹

2. 把下载的文件放到 `android_sdk` 解压

3. 在 `cmdline-tools` 新建一个名为`latest`的文件夹 , 文件夹是版本号

4. `cmdline-tools` 下面所有的东西移动到 `latest` 这个文件夹下面

    最终的结构长下面这样 (lib 是文件夹省略显示里面的内容)

      ```bash
      android_sdk
      └── cmdline-tools
          └── latest
              ├── bin
              │   ├── apkanalyzer.bat
              │   ├── avdmanager.bat
              │   ├── lint.bat
              │   ├── profgen.bat
              │   ├── resourceshrinker.bat
              │   ├── retrace.bat
              │   ├── screenshot2.bat
              │   └── sdkmanager.bat
              ├── lib
              ├── NOTICE.txt
              └── source.properties
      ```

5. 执行命令

>android_sdk/cmdline-tools/latest/bin 目录下

```bash
# 列出已安装和可用的软件包
sdkmanager --list

# 列出已安装的软件包
sdkmanager --list_installed
```

### Android SDK 构建工具 (build-tools)

**必需** 包含构建 Android 应用的工具. 如需了解详情,请参阅 [SDK 构建工具版本说明](https://developer.android.com/studio/releases/build-tools).

```bash
# Android SDK Build-Tools 33
# 适用于 API 级别 33 的 Android SDK 构建工具

sdkmanager "build-tools;33.0.0"

# android_sdk文件夹下面多出:build-tools
```

位于以下位置:`android_sdk/build-tools/version/`

此软件包对于构建 Android 应用是必要的. 此软件包中的大多数工具都由构建工具调用, 而非供您使用. 不过, 以下命令行工具可能很有用:

[AAPT2](https://developer.android.com/studio/command-line/aapt2)

解析 Android 资源, 为其编制索引, 然后将其编译为针对 Android 平台优化的二进制格式, 最后将编译后的资源打包到单个输出中.

[apksigner](https://developer.android.com/studio/command-line/apksigner)

为 APK 签名, 并检查签名能否在给定 APK 支持的所有平台版本上成功通过验证.

[zipalign](https://developer.android.com/studio/command-line/zipalign)

确保所有未压缩数据的开头均相对于文件开头部分执行特定的对齐, 从而优化 APK 文件.

**注意**: 您可以使用多个版本的构建工具来针对不同的 Android 版本构建应用.

### Android SDK 平台工具 (platform-tools)

**必需** 包含 Android 平台所需的各种工具, 包括 adb 工具.如需了解详情,请参阅 [SDK 平台工具版本说明](https://developer.android.com/studio/releases/platform-tools).

```bash
# Android SDK Platform 33
# 适用于 API 级别 33 的 Android SDK 平台工具

sdkmanager "platforms;android-33"

# android_sdk文件夹下面多出:platforms
```

位于以下位置:`android_sdk/platform-tools/`

在 Android 平台推出每个新版本时, 这些工具也会相应地更新以支持新功能, 修复工具存在的问题或改进工具, 并且每次更新都向后兼容更早的平台版本.

除了从 SDK 管理器下载,您还可以在[此处](https://developer.android.com/studio/releases/platform-tools#downloads.html)下载 SDK 平台工具.

[adb](https://developer.android.com/studio/command-line/adb)

Android 调试桥 (adb) 是一种多功能的工具, 您可以用它来管理模拟器实例或 Android 设备的状态. 还可以使用它在设备上安装 APK.

[etc1tool](https://developer.android.com/studio/command-line/etc1tool)

一种命令行实用程序, 您可以使用该工具将 PNG 图片编码为 ETC1 压缩标准格式, 并将 ETC1 压缩图片解码回 PNG.

`fastboot`

将平台或其他系统映像刷写到设备上.如需了解刷写说明,请参阅[适用于 Nexus 和 Pixel 设备的出厂映像](https://developers.google.com/android/images).

[logcat](https://developer.android.com/studio/command-line/logcat)

可通过 adb 调用, 用于查看应用和系统日志.

### Android SDK Platform

> `Android SDK Platform`即常说的`Android 12, Android 11...`所对应 API 级别.

**必需** 您的开发环境中必须至少有一个平台, 这样您才能构建应用. 为了在最新设备上提供最佳用户体验, 请使用最新版本的平台作为构建目标. 您的应用仍然可以在旧版系统上运行, 但您必须以最新版本为目标构建应用, 以便在安装最新版 Android 的设备上运行应用时能够使用新功能. 如需了解详情,请参阅 [Android SDK Platform 版本说](https://developer.android.com/studio/releases/platforms?hl=zh-cn).

```bash
# Android SDK Platform 33
# 适用于 API 级别 33 的 Android SDK 平台工具(包含skins)

sdkmanager "platforms;android-33"

## android_sdk文件夹下面多出:platforms
```

每个 SDK 平台版本都包含以下软件包:

1. `Android SDK 平台`软件包. 您必须拥有此软件包, 才能针对相应版本编译您的应用.
2. 多个 `System Image` 软件包.您必须至少拥有其中一个软件包,才能在 [Android 模拟器](https://developer.android.com/studio/run/emulator?hl=zh-cn)上运行相应版本.

    每个平台版本都包含分别适用于每个支持的设备类型 (手机,Android TV 和 Android Wear) 的系统映像. 每种设备类型都可提供各种变体, 以匹配计算机的处理器架构 (例如 Intel x86 和 ARM EABI). 标记为 `Google APIs` 的系统映像包含对 [Google Play 服务](https://developers.google.com/android/guides/overview?hl=zh-cn)的访问权限,而标记为 `Google Play` 的系统映像还包含对 Google Play 商店的访问权限.

3. `Sources for Android` 软件包. 此软件包中包含平台的源文件. 在您调试应用时,Android Studio 可能会显示这些文件中的代码行.

### Android 模拟器 (Android Emulator)

**推荐**. 基于 QEMU 的设备模拟工具, 可用于在实际的 Android 运行时环境中调试和测试应用. 如需了解详情,请参阅 [Android 模拟器版本说明](https://developer.android.com/studio/releases/emulator).

```bash
# Android 模拟器

sdkmanager "emulator" --channel=1
## android_sdk 文件夹下面多出:emulator,licenses
```

位于以下位置:`android_sdk/emulator/`

使用 Android 模拟器时需要使用此软件包. 此软件包包含以下工具:

[emulator](https://developer.android.com/studio/run/emulator-commandline)

基于 QEMU 的设备模拟工具, 可用于在实际的 Android 运行时环境中调试和测试应用.

[mksdcard](https://developer.android.com/studio/command-line/mksdcard)

可帮助您创建可与模拟器一起使用的磁盘映像, 以模拟存在外部存储卡 (例如 SD 卡) 的情形.

**注意**: 在修订版 25.3.0 之前, 模拟器工具包含在 SDK 工具软件包中.

### 为 Android 模拟器配置硬件加速

如果模拟器可以使用计算机的硬件(例如 CPU,GPU 和调制解调器),而不是作为纯软件运行,则其运行效果最佳.使用计算机硬件提升性能的功能称为硬件加速. 如需了解详情,请参阅 [为 Android 模拟器配置硬件加速](https://developer.android.com/studio/run/emulator-acceleration?hl=zh-cn)

模拟器可以使用硬件加速来改善您的体验, 主要有两种方式:

1. 使用图形加速来改进屏幕渲染
2. 使用虚拟机 (VM) 加速来提高执行速度

大多数计算机在默认情况下会启用硬件加速功能; 如果您的计算机未启用该功能, 查看上面链接如何配置图形加速和虚拟机 (VM) 加速以提升模拟器的性能.

#### 在 Windows 上使用 Android Emulator Hypervisor Driver (AEHD) 配置虚拟机加速

>注意: 标准 (模拟器 33.xxx 及更高版本)

```bash
sdkmanager "emulator" --channel=1
```

```bash
# Intel x86 模拟器加速器 (HAXM 安装程序)- 已弃用
# 从模拟器 33.xxx 开始,HAXM 已废弃, 因为 Intel 已停止开发 HAXM.
# Android Emulator Hypervisor Driver (AEHD) 取代了 Intel 处理器上的 Intel HAXM.
# sdkmanager "extras;intel;Hardware_Accelerated_Execution_Manager"

# Android 模拟器管理程序驱动程序 (安装程序)
sdkmanager "extras;google;Android_Emulator_Hypervisor_Driver"
## android_sdk 文件夹下面多出:extras
```

您也可以通过 [GitHub](https://github.com/google/android-emulator-hypervisor-driver/releases)下载并安装 `Android Emulator Hypervisor Driver`. 解压缩驱动程序软件包后, 使用管理员权限在命令行中运行 `silent_install.bat`.

安装后, 通过在命令行中使用以下命令, 确认驱动程序能正常运行:

AEHD 2.1 及更高版本

```bash
sc query aehd
```

状态消息包含以下信息:

```bash
SERVICE_NAME: aehd
       ...
       STATE              : 4  RUNNING
       ...
```

以下错误消息表示您的 BIOS 中未启用虚拟化扩展, 或您未停用 Hyper-V.

```bash
SERVICE_NAME: aehd
       ...
       STATE              : 1  STOPPED
       WIN32_EXIT_CODE    : 4294967201 (0xffffffa1)
       ...
```

您可通过使用管理员权限在命令行中运行以下命令, 来卸载 `Android Emulator Hypervisor Driver`.

AEHD 2.1 及更高版本

```bash
sc stop aehd
sc delete aehd
```

## Android SDK 环境变量

您可以通过设置环境变量来配置 Android Studio 和命令行工具的行为. 其中一个最有用的环境变量之一是 `ANDROID_HOME`, 很多工具都会读取该变量来确定 Android SDK 安装目录. 如需通过命令行运行工具, 而不包含可执行文件的完整路径, 请将命令搜索路径环境变量设置为包含`%ANDROID_HOME%\cmdline-tools\latest\bin`,`%ANDROID_HOME%\platform-tools` 和 `%ANDROID_HOME%\emulator`.具体步骤因所用操作系统而异, 但如需查看一般指导信息, 请参阅[如何设置环境变量](https://developer.android.com/studio/command-line/variables?hl=zh-cn#set).

### ANDROID_HOME

>设置 SDK 安装目录的路径. 设置后, 该值通常不会更改, 并且可以由同一台计算机上的多个用户共享.`ANDROID_SDK_ROOT` 也指向 SDK 安装目录, 但已废弃. 如果您继续使用它,Android Studio 和 Android Gradle 插件将检查旧变量和新变量是否一致.

1. `右键此电脑属性 -> 高级系统设置 -> 环境变量`, 新建 `ANDROID_HOME` 系统变量, 变量值为 `SDK 安装路径`, 就是上面创建的路径, 比如 `D:\Android\android_sdk`

2. 在 `Path` 系统变量中添加

```bash
# 使命令行可以在任意位置直接执行 emulator 命令
%ANDROID_HOME%\emulator

# 使命令行可以在任意位置直接执行 adb,fastboot 等命令
%ANDROID_HOME%\platform-tools

# 使命令行可以在任意位置直接执行 sdkmanager,avdmanager 等命令
%ANDROID_HOME%\cmdline-tools\latest\bin
```

### ANDROID_USER_HOME

>为 Android SDK 中包含的工具设置用户偏好设置目录的路径. 默认为 `$HOME/.android/`. 某些较旧的工具 (例如 Android Studio 4.3 及更低版本) 不会读取 `ANDROID_USER_HOME`. 如需替换这些旧工具的用户偏好设置位置, 请将 `ANDROID_SDK_HOME` 设置为要在其下创建 `.android` 目录的父目录.

`右键此电脑属性 -> 高级系统设置 -> 环境变量`

1. 新建 `ANDROID_USER_HOME` 系统变量, 变量值为 `SDK 安装路径`, 就是上面创建的路径, 比如 `D:\Android\.android`
2. 新建 `ANDROID_SDK_HOME` 系统变量, 变量值为 `D:\Android`

## 模拟器环境变量

如果上面手动添加了 `ANDROID_SDK_HOME`这一步可以跳过

默认情况下, 模拟器会将配置文件存储在 `$HOME/.android/` 下, 将 AVD 数据存储在 `$HOME/.android/avd/` 下. 您可以通过设置以下环境变量来替换默认设置.`emulator -avd <avd_name>` 命令会依次按照 `$ANDROID_AVD_HOME`,`$ANDROID_USER_HOME/avd/` 和 `$HOME/.android/avd/` 中的值来搜索 avd 目录.
如需模拟器环境变量方面的帮助, 请在命令行中输入 `emulator -help-environment`.如需了解 emulator 命令行选项,请参阅[从命令行启动模拟器](https://developer.android.com/studio/run/emulator-commandline?hl=zh-cn).

### ANDROID_EMULATOR_HOME

>设置特定于用户的模拟器配置目录的路径. 默认为 `ANDROID_USER_HOME`. 较旧的工具 (如 Android Studio 4.3 及更早版本) 不会读取 `ANDROID_USER_HOME`. 对于这些工具, 默认值为 `ANDROID_SDK_HOME/.android`.

1. `右键此电脑属性 -> 高级系统设置 -> 环境变量`, 新建 `ANDROID_EMULATOR_HOME` 系统变量, 变量值为 `SDK 安装路径`, 就是上面创建的路径, 比如 `D:\Android\.android`

2. 在 `Path` 系统变量中添加

```bash
%ANDROID_EMULATOR_HOME%
```

### 确认配置

配置完毕后, 在任意目录重新打开新的 CMD 命令行, 确认一下配置的正确性:

```bash
sdkmanager --version
# 11.0

emulator -version
# INFO    | Android emulator version 33.1.21.0 (build_id 11009868) (CL:N/A)
# INFO    | Storing crashdata in: , detection is enabled for process: 8088
# INFO    | Duplicate loglines will be removed, if you wish to see each individual line launch with the -log-nofilter flag.
# Android emulator version 33.1.21.0 (build_id 11009868) (CL:N/A)

adb version
# Android Debug Bridge version 1.0.41
# Version 34.0.5-10900879

fastboot --version
# fastboot version 34.0.5-10900879
```

看到上述输出的版本号信息就证明配置成功.

## Android 13 SDK 安装全部流程

要创建某个版本的虚拟机首先需要安装对应的平台, 以 Android 13(API 级别 33) 为例:

### 安装 SDK 平台

[查询 SDK 平台版本说明](https://developer.android.com/studio/releases/platforms?hl=zh-cn)

```bash
# Android 13(API 级别 33)
sdkmanager "platforms;android-33"
```

### 安装 Android 13 SDK

[设置 Android 13 SDK](https://developer.android.com/about/versions/13/setup-sdk)

在 Android Studio 中, 您可以按如下方式安装 Android 13 SDK:

1. 依次点击 `Tools > SDK Manager`.
2. 在 `SDK Platforms` 标签页中, 选择 `Android Tiramisu Preview`.
3. 在 `SDK Tools` 标签页中, 选择`Android SDK Build-Tools 33`.
4. 点击 OK 安装 SDK.

```bash
sdkmanager "build-tools;33.0.0"
```

### 安装模拟器

[设置 Android 13 模拟器](https://developer.android.com/about/versions/13/get#on_emulator)

请务必为[受支持的 Pixel 设备](https://developer.android.com/about/versions/13/get?hl=zh-cn#on_pixel)选择设备定义以及 64 位 Android 13 模拟器系统映像.如果您尚未安装与您的设备定义匹配的 Android 13 系统映像,请点击 Release Name 旁边的 Download 获取该映像

```bash
sdkmanager "system-images;android-33;google_apis_playstore;x86_64"
```

### 成功创建 Android 13 的虚拟机所需 SDK 示例

Installed packages:

|Path|Version|Description|Location|
|-------|-------|-------|-------|
|build-tools;33.0.0|33.0.0|Android SDK Build-Tools 33.0.0|build-tools\33.0.0|
|emulator|32.1.15|Android Emulator|emulator|
|extras;google;Android_Emulator_Hypervisor_Driver|2.0.0|Android Emulator hypervisor driver (installer)|extras\google\Android_Emulator_Hypervisor_Driver|
|platform-tools|34.0.5|Android SDK Platform-Tools|platform-tools|
|platforms;android-33|3|Android SDK Platform 33|platforms\android-33|
|skiaparser;3|3|Layout Inspector image server for API 31-34|skiaparser\3|
|sources;android-33|1|Sources for Android 33|sources\android-33|
<!-- |system-images;android-33;google_apis;arm64-v8a|15|Google APIs ARM 64 v8a System Image| system-images\android-33\google_apis\arm64-v8a| -->
|system-images;android-33;google_apis_playstore;x86_64|7|Google Play Intel x86_64 Atom System Image|system-images\android-33\google_apis_playstore\x86_64|

```bash
# Android SDK Build-Tools 33
# 适用于 API 级别 33 的 Android SDK 构建工具
sdkmanager "build-tools;33.0.0"
## android_sdk 文件夹下面多出:build-tools|licenses|.temp

# Android SDK Platform 33
# 适用于 API 级别 33 的 Android SDK 平台工具 (包含 skins)
sdkmanager "platforms;android-33"
## android_sdk 文件夹下面多出:platforms|.knownPackages

# Google Play Intel x86 Atom_64 System Image
# 适用于 API 级别 33 的带有Google Play商店的 x86_64架构的系统映像
# 除了谷歌商店普通的安装包无法安装提示不兼容
sdkmanager "system-images;android-33;google_apis_playstore;x86_64"

# Google APIs ARM 64 v8a System Image
# 适用于 API 级别 33 的包含Google APIs
# 架构是arm64-v8a,适用于模拟基于ARM的设备,这对于模拟真实设备尤其重要
# 因为大多数现代Android设备都使用ARM架构的处理器
# 不同于Google Play商店版本,这个版本不包含Google Play商店,但包含其他Google服务
# sdkmanager "system-images;android-33;google_apis;arm64-v8a"

## android_sdk 文件夹下面多出:system-images

# Android 模拟器
sdkmanager "emulator" --channel=1
## android_sdk 文件夹下面多出:emulator

# Android SDK Platform-Tools(包括 adb 和 fastboot)
sdkmanager "platform-tools"
## android_sdk 文件夹下面多出:platform-tools

# Sources for Android 33
# Android 33 的源代码
sdkmanager "sources;android-33"
## android_sdk 文件夹下面多出:sources

# Layout Inspector image server for API 31-34
# 适用于 API 级别 31-34 的 Android 布局检查图像服务器
sdkmanager "skiaparser;3"
## android_sdk 文件夹下面多出:skiaparser

# Android 模拟器管理程序驱动程序 (安装程序)
sdkmanager "extras;google;Android_Emulator_Hypervisor_Driver"
## android_sdk 文件夹下面多出:extras
```

>上面 sources,skiaparser,extras 可选安装

## 创建和管理虚拟设备

Android 虚拟设备 (AVD) 是一种配置,用于定义您要在 Android 模拟器中模拟的 Android 手机,平板电脑,Wear OS,Android TV 或 Automotive OS 设备的特性.设备管理器是一款可从 Android Studio 启动的工具,旨在帮助您创建和管理 AVD.如需了解更多详情,请参阅[创建和管理虚拟设备](https://developer.android.com/studio/run/managing-avds?hl=zh-cn)

>查看 avdmanager 命令行工具帮助

```bash
# 查看 list avd 帮助
avdmanager -h list avd

# 列出现有的 Android 虚拟设备
avdmanager list avd

# 列出已经安装了的 platform
avdmanager list target

# 列出已经创建了的 avd 和可以使用的 AVD 设备
avdmanager list device

# 删除模拟器
avdmanager delete avd -n name

# 删除名称为 flutter_emulator 的模拟器详并输出错误, 警告和参考性消息
avdmanager -v delete avd -n flutter_emulator

# 查看 create avd 命令行帮助
avdmanager -h create avd
```

### 创建模拟器

[硬件配置文件属性](https://developer.android.com/studio/run/managing-avds?hl=zh-cn#hpproperties)

```bash
# 列出现有设备
avdmanager list device

# Available devices definitions:
# ...
# id: 30 or "pixel_7"
#     Name: Pixel 7
#     OEM : Google
# ---------
# id: 31 or "pixel_7_pro"
#     Name: Pixel 7 Pro
#     OEM : Google
# ---------
# ...
```

1. 创建一个名为 "flutter_emulator" 的新 Android 虚拟设备, 该设备使用 pixel 7 pro 的硬件配置, 运行的是 Android 33, 含有 Google APIs 和 谷歌应用商店 的 `x86_64` 架构的系统, 并且在创建之前清除 AVD 管理器的缓存

    ```bash
    # avdmanager --verbose --clear-cache create avd --name flutter_emulator --package "system-images;android-33;google_apis;arm64-v8a" --device "pixel_7_pro"
    avdmanager --verbose --clear-cache create avd --name flutter_emulator --package "system-images;android-33;google_apis_playstore;x86_64" --device "pixel_7_pro"
    ```

      * avdmanager: 这是 Android SDK 提供的命令行工具,用于创建和管理 Android 虚拟设备(AVD).

      * --verbose: 这个选项使命令在执行时提供详细的输出,包括错误,警告和其他消息.这对于调试和获取有关进程的更多信息非常有用.

      * --clear-cache: 清除 SDK Manager 的仓库清单缓存.如果有任何缓存的数据出现问题或者过时,这个选项可以确保从一个干净的状态开始创建 AVD.

      * create avd: 这是 avdmanager 的子命令,用于创建一个新的 Android 虚拟设备.

      * --name flutter_emulator: 这个选项指定创建的 AVD 的名称为 "flutter_emulator".

      * --package "system-images;android-33;google_apis_playstore;x86_64": 指定了要用于虚拟设备的系统映像的路径.这里的路径包含以下部分:

          * system-images: 指定了这是一个系统映像的路径.
          * android-33: 指定了系统映像的 API 级别,即 Android 33.
          * google_apis: 表明这个映像包含了 Google APIs.这意味着除了 Android 标准 API 外,它还包括了 Google 的服务和 APIs..
          * google_apis_playstore: 表示该系统映像包括 Google Play 商店和 Google API。这意味着创建的 AVD 将能够访问 Google Play 商店，并使用 Google 提供的服务.
          * arm64-v8a: 指定了系统映像的 CPU 架构类型,这里是 ARM 64 位的 V8 架构.
          * x86_64: 表示该系统映像是为 x86_64 架构(即 64 位的 Intel 或 AMD 处理器)准备的.
      * --device "pixel_7_pro": 指定 AVD 模拟的硬件设备.这里的 "pixel_7_pro" 应该是对应于 Google Pixel 7 Pro 或类似配置的硬件设备的一个设备定义别名.

    请注意,命令中的 `--device "pixel_7_pro"` 部分需要确保该设备定义在你的 `Android SDK` 中是`可用`的.如果该设备定义不存在,`avdmanager` 命令将无法执行,并会报告错误.如果你不确定,可以通过运行 `avdmanager list device` 来查看所有可用的设备定义.

    执行这个命令后,将会创建一个名为 "flutter_emulator" 的新 AVD,具有 Pixel 7 Pro 的硬件配置,运行包含 Google APIs 和 Google Play 商店的 `Android 33 x86_64` 架构的系统映像.

    >创建模拟器后, 会在 `D:\Android\.android\avd`下生成一个名为 flutter_emulator 的虚拟设备

    ```bash
    avd
    ├── flutter_emulator.avd
    │   ├── config.ini
    │   ├── sdcard.img
    │   └── userdata.img
    └── flutter_emulator.in
    ```

2. 创建一个自定义硬件配置, 储存空间为 512MB , 名为 Pixel 7 Pro API 33 的模拟器, 如果存在相同名称的模拟器, 则会覆盖

    ```bash
   avdmanager create avd -n "Pixel_7_Pro_API_33" -k "system-images;android-33;google_apis_playstore;x86_64" -f
    ```

    此时会弹出

    ```bash
    [==============] 100% Fetch remote repository...
    Auto-selecting single ABI arm64-v8a
    # 输入 yes 或者 y 创建自定义硬件配置
    Do you wish to create a custom hardware profile? [no] yes

    0: PlayStore: Does the device supports Google Play?
    PlayStore.enabled [no]:yes
    ...

    # 重要. 默认:no.启动后右侧的电源关闭,返回,首页,菜单 (Hardware Buttons/Back/Home/Menu) 不起作用
    77: Keyboard support: Whether the device has a QWERTY keyboard.
    hw.keyboard [no]:y
    ```

    详细配置参照下面的`Android Emulator 自定义硬件配置文件`

### 编辑模拟器的 `config.ini`

对于创建的每个 Android 虚拟设备, 都会在默认 (`~/.android/avd` 或 `%USERPROFILE%/.android/avd`) 文件夹中创建一个目录. 它将被命名如下`<NAME>.avd`. 在此目录中, 您将找到该 `config.ini` 文件.

找到 avd 安装位置 上面我们定义了 `ANDROID_USER_HOME`=`D:\Android\.android` , 那就去`D:\Android\.android\avd\flutter_emulator.avd`找到 `config.ini`

>上面创建之后有可能会遇到一个问题就是启动之后右侧的电源关闭, 返回, 首页, 菜单 (Hardware Buttons/Back/Home/Menu) 不起作用. 在这个文件中找到 hhw.keyboard, 把 n 或者 no 修改成 y 或者 yes

```bash
hw.keyboard = yes
```

下面是`config.ini`文件的一些属性, 它们的含义和示例.
该 [文档在此处](https://developer.android.com/studio/run/managing-avds?hl=zh-cn#avdproperties)有更详细的版本.我发现的另一个有用的模板是[Android Source](https://android.googlesource.com/platform/external/adt-infra/+/refs/heads/emu-master-dev/emu-image/templates/avd/Pixel2.avd/config.ini).也可以参考[编辑 Android 虚拟设备属性](https://learn.microsoft.com/zh-cn/xamarin/android/get-started/installation/android-emulator/device-properties?pivots=windows)

```bash
# 设备上的物理 RAM 量(以兆字节为单位)
# 整数,默认:0
hw.ramSize = 1536

# 设备是否可以播放音频
# 布尔值,默认: yes
hw.audioOutput = yes

# 设备上是否安装了 Google Play 商店
# 布尔值,默认: yes
Playstore.enabled = yes

# 启用 / 禁用模拟 OpenGLES GPU
# 布尔值,默认: yes
hw.gps = yes

# 设备是否有 QWERTY 键盘
# 布尔值,默认: no
hw.keyboard = yes

# 用于大致描述 LCD 屏幕密度的值,用于自动资源/资产选择
# 整数枚举 [120, 160, 240, 213, 320],默认值:160
hw.lcd.density = 560

# LCD 像素高度
# 整数,默认:640
hw.lcd.height = 3120

# LCD 像素宽度
# 整数,默认:320
hw.lcd.width = 1440
```

## 皮肤

[创建模拟器皮肤](https://developer.android.com/studio/run/managing-avds?hl=zh-cn#skins)

[Samsung Galaxy Emulator Skin](https://developer.samsung.com/galaxy-emulator-skin)
[iPhone_AndroidStudioEmulator_Skin](https://github.com/SemihK/iPhone_AndroidStudioEmulator_Skin)
[Android-emulator-skins](https://github.com/larskristianhaga/Android-emulator-skins)

### 配置说明

>在 Android 虚拟设备(AVD)的`config.ini`配置文件中,`skin.name`,`skin.path`和`skin.dynamic`这三个配置项与 AVD 的外观皮肤相关:

* skin.name: 指定了皮肤的名称.这通常对应于 SDK 的 skins 目录下的一个子目录的名称.
* skin.path: 指定了皮肤文件所在的完整路径.这可以是默认的 SDK 路径,也可以是自定义的任何路径.
* skin.dynamic: 这个参数表示皮肤是否支持动态调整大小.如果设置为`yes`,则表示 AVD 的窗口大小可以在模拟器运行时动态改变.如果设置为`no`,窗口大小则是固定的.某些设备皮肤可能没有提供动态大小调整的功能,特别是那些为了精确模拟特定设备外观和用户界面而设计的皮肤.在这种情况下,`skin.dynamic` 会被设置为 `no`

例如,如果你有一个名为`pixel_7_pro`的皮肤,`config.ini`文件中的相关设置可能看起来像这样:

```bash
skin.dynamic = yes
skin.name = pixel_7_pro
skin.path = /path/to/android/sdk/skins/pixel_7_pro
```

在这个例子中:

* 使用了名为 pixel_7_pro 的皮肤.
* 皮肤文件位于/path/to/android/sdk/skins/pixel_7_pro 目录.
* 皮肤支持动态调整大小,即可以在模拟器运行时调整其窗口的大小.

如果`config.ini`文件中没有明确指定`skin.path`,模拟器通常会从`默认的皮肤目录`中寻找匹配`skin.name`的皮肤.如果`skin.dynamic`设置为`no`或未设置,模拟器窗口将不支持调整大小,其大小将匹配定义在皮肤文件中的设备尺寸.

### 默认的皮肤目录

默认的皮肤目录通常位于`Android SDK`的安装路径下.具体的位置可能取决于你的操作系统以及`Android SDK`的版本.通常,`默认皮肤目录的路径`格式如下:

```bash
<android_sdk_path>/skins/
```

或者对于`较新版本`的`Android SDK`,皮肤可能位于`每个API级别的platforms目录`下:

```bash
<android_sdk_path>/platforms/android-<api_level>/skins/
```

这里:

* <android_sdk_path> 是 Android SDK 的安装目录.
* <api_level> 是指 Android 平台的 API 级别,例如 android-33.
例如,如果你在 macOS 上安装了 Android SDK,并且 SDK 路径为/Users/yourusername/Library/Android/sdk,那么默认的皮肤目录可能会是:

```bash
/Users/yourusername/Library/Android/sdk/skins/
```

或者对于特定 API 级别的皮肤:

```bash
/Users/yourusername/Library/Android/sdk/platforms/android-29/skins/
```

请根据你的 SDK 安装位置和版本来确定确切的路径.如果你使用`Android Studio`管理你的`SDK`,通常可以在`Android Studio`的`Preferences`(macOS)或`Settings`(Windows/Linux)下的`Appearance & Behavior` → `System Settings` → `Android SDK路径设置`中找到 SDK 的安装路径.

## 示例

编辑模拟器的 `config.ini`

```bash
# 外观动态 – 外观是否为动态的. 如果仿真器是基于指定的宽度和高度构造给定大小的外观,仿真器外观则为动态外观.
skin.dynamic = yes

# 外观名称 – Android 仿真器外观的名称. 外观是定义仿真显示的视觉对象和控件元素的文件集合,描述了 AVD 的窗口在开发计算机上的外观. 外观描述屏幕大小,按钮和整体设计,但不会影响应用的操作.
skin.name = pixel_7_pro

# 外观路径 – 包含在 skin.name 中指定的仿真器外观文件的目录的路径.此目录包含 hardware.ini 布局文件以及外观显示元素的映像文件.
# skin.path = %ANDROID_SDK_HOME%\android_sdk\platforms\android-33\skins\HVGA
skin.path = %ANDROID_HOME%\skins\pixel_7_pro
```

## 启动虚拟机

### emulator 命令行工具

```bash
# 查看帮助
emulator -help

# 获取有关所有模拟器选项的详细帮助
emulator -help-all

# 查看 list-avds 的使用帮助
emulator -help-list-avds

# 列出所有可用的 AVD
emulator -list-avds

# 启动指定版本的虚拟机
emulator -avd <avd name>
```

### 启动前面创建的虚拟机

```bash
emulator -avd flutter_emulator
```

### 启动带皮肤的

```bash
emulator -skindir <path_to_skin_directory> -skin <skin_name> -avd <avd_name>
```

* <path_to_skin_directory> 是你的皮肤文件所在的目录的路径.
* <skin_name> 是你想使用的皮肤的名称.
* <avd_name> 是你想启动的 Android 虚拟设备(AVD)的名称.

`-skin` 选项的默认目录是`安卓SDK`的 `skins` 子目录.当你安装安卓`SDK`时,它通常会包含一些预设的设备皮肤,这些皮肤位于`SDK`的 `platforms` 目录下的每个平台的 `skins` 子目录中.

具体来说,默认皮肤目录的路径看起来可能是这样的:

```bash
<android_sdk_path>/platforms/android-<api_level>/skins/
```

* <android_sdk_path> 是你的安卓 SDK 的安装路径.

* <api_level> 是对应安卓平台版本的 API 等级.
例如,如果你的安卓 SDK 安装在 `D:\Android\android_sdk` 路径下,你可能会在如下的路径找到默认的皮肤:

```bash
D:\Android\android_sdk\platforms\android-33\skins
```

这里 `android-33` 对应的是`API 33`,你需要根据实际安装的 SDK 平台版本来确定路径.

### 报错解决

有可能会出现下面的错误

#### 报错一

> [13324]:ERROR:android/android-emu/android/qt/qt_setup.cpp:28:Qt library not found at \AndroidSDK\emulator\lib64\qt\lib
> Could not launch '\AndroidSDK\emulator/qemu/windows-x86_64/qemu-system-x86_64.exe': No such file or directory

解决:

android_sdk/emulator/emulator.exe 右键创建快捷方式
android_sdk/tools/emulator.exe 重命名为 emulator1.exe

重新执行 `emulator -avd flutter_emulator`

#### 报错二

> [13324]:ERROR | x86_64 emulation currently requires hardware acceleration!
> CPU acceleration status: Please disable Hyper-V before using the Android Emulator. Start a command prompt as Administrator, run 'bcdedit /set hypervisorlaunchtype off', reboot.
> More info on configuring VM acceleration on Windows:
> <https://developer.android.com/studio/run/emulator-acceleration#vm-windows>
> General information on acceleration: <https://developer.android.com/studio/run/emulator-acceleration>.

Windows 上配置虚拟机加速 (WHPX & HAXM)

> 您拥有 Intel 处理器且不需要在运行 Android 模拟器的同时运行 Hyper-V. 使用 Intel HAXM.
> 您拥有 Intel 处理器且需要在运行 Android 模拟器的同时运行 Hyper-V. 使用 WHPX.

大兄弟, 你怎么又报错了?
WHPX 是什么?
HAXM 又是什么?
不要着急, 仔细看提示:

> 使用 仿真 (虚拟机) 需要硬件加速
> 请确保 Windows 虚拟机监控程序平台 (WHPX) 已正确安装并可用
> CPU 加速状态: 此计算机上未安装 硬件加速执行管理器 (HAXM)
> 如果您使用的是 Intel CPU: 请检查 BIOS 中是否启用了虚拟化, 以及 HAXM 是否已安装并可用
> 如果您使用 AMD CPU 或需要与基于 Hyper-V-based 的应用程序 (如 Docker) 一起运行, 我们建议您使用 Windows 系统管理程序平台

So, 看完之后知道 WHPX & HAXM 是什么了么?
这时候只要下载 HAXM 支持包, 以及在 BIOS 中开启主板虚拟化支持就可以解决问题啦!

1. 方式一 下载 HAXM 支持包

    ```bash
    sdkmanager "extras;intel;Hardware_Accelerated_Execution_Manager"
    ```

    打开`android_sdk\extras\intel\Hardware_Accelerated_Execution_Manager`
    双击安装 `haxm-7.6.5-setup.exe`即可 (如果安装失败则是因为虚拟化支持未开启成功)

2. 方式二

    打开`控制面板 ->程序和功能 ->启用或关闭 Windows 功能 ->Windows 虚拟机监控程序平台 (WHPX)`打钩, 安装完成重启

## 参考

PowerShell 自动化安装脚本

`$envVars`替换成自己实际的

>创建安卓 13.ps1

```shell
$envVars = @{
  "JAVA_HOME"         = "D:\Program Files\Java\jdk-21"
  "ANDROID_SDK_HOME"  = "D:\Android"
  "ANDROID_HOME"      = "D:\Android\android_sdk"
  "ANDROID_USER_HOME" = "D:\Android\.android"
}

# 需要添加的路径
$newPaths = @(
  "%JAVA_HOME%\bin",
  "%ANDROID_HOME%\emulator",
  "%ANDROID_HOME%\platform-tools",
  "%ANDROID_HOME%\cmdline-tools\latest\bin"
)

# 定义要检查的组件
$components = @(
  "build-tools;33.0.0",
  "platforms;android-33",
  "system-images;android-33;google_apis_playstore;x86_64",
  "emulator",
  "platform-tools",
  "sources;android-33",
  "skiaparser;3",
  "extras;google;Android_Emulator_Hypervisor_Driver"
)

# 设置环境变量函数
function SetEnvironmentVariable {
  param (
    [Parameter(Position = 0)]
    [string]$name,

    [Parameter(Position = 1)]
    [string]$value,

    [Parameter(Position = 2)]
    [string]$target = "Machine"
  )

  if ($target -eq "Machine") {
    if (-not [string]::IsNullOrWhiteSpace($value)) {
      setx $name $value /M > $null
    }
    else {
      Write-Host "无效的值传入给环境变量 '$name'"
    }
  }
  else {
    if (-not [string]::IsNullOrWhiteSpace($value)) {
      setx $name $value > $null
    }
    else {
      Write-Host "无效的值传入给环境变量 '$name'"
    }
  }
}

# 设置环境变量的包装器函数
function SetEnvironmentVariableWrapper {
  param (
    [Parameter(Position = 0)]
    [string]$name,

    [Parameter(Position = 1)]
    [string]$value,

    [Parameter(Position = 2)]
    [string]$target = "Machine",

    [Parameter(Position = 3)]
    [switch]$prompt = $false
  )

  $existingValue = [System.Environment]::GetEnvironmentVariable($name, $target)

  if ($null -ne $existingValue) {
    if ($prompt) {
      Write-Host "传入环境变量: $name  传入的值: $value"
      Write-Host "当前环境变量: $name  当前值为: $existingValue"
      $replace = Read-Host "是否要替换它?(Y/N) 默认N"
      if ($replace -eq "Y" -or $replace -eq "y") {
        # [System.Environment]::SetEnvironmentVariable($name, $value, $target)
        SetEnvironmentVariable $name $value $target
        Write-Host "环境变量 '$name' 已经被替换为新值 '$value'"
      }
      else {
        Write-Host "$name 已跳过."
      }
    }
  }
  else {
    # [System.Environment]::SetEnvironmentVariable($name, $value, $target)
    SetEnvironmentVariable $name $value $target
    Write-Host "环境变量 '$name' 已经设置为新值 '$value'"
  }
}

# 导出系统环境变量为备份
Function ExportSystemEnvVariables {
  Write-Host "正在导出系统环境变量为备份..."
(Get-ItemProperty -Path 'Registry::HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment').PSObject.Properties |
  Where-Object { $_.Name -ne "PSPath" } |
  ForEach-Object { "$($_.Name)=$($_.Value)" } > system_env.reg
  Write-Host "系统环境变量导出完成"
}

# 设置系统环境变量
Function SetSystemEnvVariables {
  Write-Host "正在设置系统环境变量..."
  $envVars.GetEnumerator() | ForEach-Object {
    SetEnvironmentVariableWrapper -name $_.Key -value $_.Value
  }
  Write-Host "系统环境变量设置完成"
}

# 更新系统Path环境变量...
Function setSystemPathEnvVariable {
  Write-Host "正在设置系统Path环境变量..."

  # 运行 reg query 命令并获取输出
  $regQueryOutput = & reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path
  # 查找并提取 Path 键的值
  $currentPath = ($regQueryOutput -split "\r?\n" | Select-String -Pattern "Path\s+REG_EXPAND_SZ\s+(.+)").Matches.Groups[1].Value

  if ($currentPath) {
    # 把 Path 环境变量的值分割为一个数组
    $currentPaths = $currentPath -split ';'

    # 创建一个新的字符串来存储更新后的 Path
    $updatedPath = $currentPath

    # 检查新路径是否已经存在于 Path 环境变量中,如果不存在,添加到 Path 环境变量中
    foreach ($newPath in $newPaths) {
      if ($currentPaths -notcontains $newPath) {
        $updatedPath += $newPath + ";"
      }
    }

    # 更新 currentPath
    $currentPath = $updatedPath
  }
  else {
    Write-Output "未找到 Path 键或值."
  }

  setx 'PATH' $currentPath /M > $null
  Write-Host "系统Path环境变量设置完成"
}

# 重新加载 PowerShell 环境变量
Function ReloadPowerShellEnvironment {
  write-host "正在重新加载 PowerShell 环境变量..."
  $env:JAVA_HOME = [System.Environment]::GetEnvironmentVariable("JAVA_HOME", "Machine")
  # Write-Host "当前 JAVA_HOME: " $env:JAVA_HOME

  $env:ANDROID_SDK_HOME = [System.Environment]::GetEnvironmentVariable("ANDROID_SDK_HOME", "Machine")
  # Write-Host "当前 ANDROID_SDK_HOME: " $env:ANDROID_SDK_HOME

  $env:ANDROID_HOME = [System.Environment]::GetEnvironmentVariable("ANDROID_HOME", "Machine")
  # Write-Host "当前 ANDROID_HOME: " $env:ANDROID_HOME

  $env:ANDROID_USER_HOME = [System.Environment]::GetEnvironmentVariable("ANDROID_USER_HOME", "Machine")
  # Write-Host "当前 ANDROID_USER_HOME: " $env:ANDROID_USER_HOME

  $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
  # Write-Host "当前 Path: " $env:Path
  write-host "重新加载 PowerShell 环境变量完成"
}

# 执行命令的通用函数
Function ExecuteCommand {
  param (
    [Parameter(Mandatory = $true)]
    [string]$command
  )
  Write-Output "正在执行命令: $command"
  Invoke-Expression -Command $command
}

# 检查组件是否已安装的函数
Function CheckComponentInstalled {
  param (
    [Parameter(Mandatory = $true)]
    [string]$component
  )

  # 使用 sdkmanager --list_installed 命令获取已安装的组件
  $installedComponents = ExecuteCommand "sdkmanager --list_installed"

  # 如果没有任何已安装的组件,返回 false
  if ($null -eq $installedComponents) {
    return $false
  }

  # 使用 Select-String 命令检查组件是否已安装
  $installed = $installedComponents | Select-String -Pattern $component

  # 返回组件是否已安装
  return $null -ne $installed
}

# 检查和接受许可协议的函数
Function CheckAndAcceptLicenses {
  Write-Output "正在检查并接受许可协议..."
  ExecuteCommand "cmd /c 'echo y | sdkmanager --licenses'"

}

# 安装 Android SDK 的函数
Function InstallAndroidSDK {
  # 首先检查和接受许可协议
  CheckAndAcceptLicenses
  Write-Host "正在安装 Android SDK..."
  # 遍历每个组件
  foreach ($component in $components) {
    # 检查组件是否已安装
    if (CheckComponentInstalled $component) {
      Write-Output "组件 $component 已经安装."
    }
    else {
      Write-Output "正在安装组件 $component..."
      ExecuteCommand "sdkmanager `"$component`" --channel=1"
    }
  }
  # Write-Host '正在安装 Android SDK Build-Tools 33'
  # sdkmanager "build-tools; 33.0.0"

  # Write-Host '正在安装 Android SDK Platform 33'
  # sdkmanager "platforms; android-33"

  # Write-Host  '正在安装 Google APIs ARM 64 v8a System Image'
  # sdkmanager "system-images;android-33;google_apis;arm64-v8a"

  # Write-Host  '正在安装 Google Play Intel x86_64 Atom System Image'
  # sdkmanager "system-images;android-33;google_apis_playstore;x86_64"

  # Write-Host '正在安装 Android 模拟器'
  # sdkmanager "emulator" --channel=1

  # Write-Host '正在安装 Android SDK Platform-Tools'
  # sdkmanager "platform-tools"

  # Write-Host '正在安装 Sources for Android 33'
  # sdkmanager "sources; android-33"

  # Write-Host '正在安装 Layout Inspector image server for API 31-34'
  # sdkmanager "skiaparser; 3"

  # Write-Host '正在安装 Android 模拟器管理程序驱动程序'
  # sdkmanager "extras; google; Android_Emulator_Hypervisor_Driver"

  Write-Host "Android SDK 安装完成"
}

# 创建Android虚拟设备
Function CreateAndroidVirtualDevice {
  Write-Host "正在创建 Android 虚拟设备..."
  avdmanager --verbose --clear-cache create avd --force --name flutter_emulator --package "system-images;android-33;google_apis_playstore;x86_64" --abi "arm64-v8a" --device pixel_7_pro
  Write-Host "Android 虚拟设备创建完成"
}

# 启动Android虚拟设备
Function StartAndroidVirtualDevice {
  Write-Host "正在启动 Android 虚拟设备..."
  emulator -avd flutter_emulator
}

# 检查 sdkmanager 是否可用
Function checkSDKmanager {
  ReloadPowerShellEnvironment
  Write-Host "正在检查 sdkmanager 是否可用..."
  # $env:path -split "; "
  if (!(Get-Command "sdkmanager" -ErrorAction SilentlyContinue)) {
    Write-Host "错误:sdkmanager 不可用.请确保 Android SDK 是正确安装的, 并且 sdkmanager 在您的 PATH 环境变量中."
  }
  else {
    InstallAndroidSDK
    CreateAndroidVirtualDevice
    StartAndroidVirtualDevice
  }
}

# 执行步骤
ExportSystemEnvVariables
SetSystemEnvVariables
setSystemPathEnvVariable
checkSDKmanager

Read-Host -Prompt "`n`n按下回车键以退出..."
```

## 附录

### 文档

[sdkmanager 文档](https://developer.android.google.cn/studio/command-line/sdkmanager)
[安卓模拟器文档](https://developer.android.google.cn/studio/run/emulator#install)
[sdkmanager](https://developer.android.google.cn/studio/command-line/sdkmanager)
[Android 调试桥 (adb)](https://developer.android.google.cn/studio/command-line/adb)
[avdmanager](https://developer.android.google.cn/studio/command-line/avdmanager)
[从命令行启动模拟器](https://developer.android.google.cn/studio/run/emulator-commandline)

### Android Emulator 自定义硬件配置文件

```bash
[=======================================] 100% Fetch remote repository...
Auto-selecting single ABI arm64-v8a
# 你希望创建一个自定义的硬件配置文件吗?
Do you wish to create a custom hardware profile? [no] y
# 0: PlayStore:设备是否支持 Google Play
 0: PlayStore: Does the device supports Google Play?
PlayStore.enabled [no]:y

# 1: 在构建此 hardware.ini 时使用的 "avd home":这可以由后处理工具用来迁移快照.
 1: avd home that was used during the construction of this hardware.ini: This can be used by post processing tools to migrate snapshots
android.avd.home []:

# 2: 在构建此 hardware.ini 时使用的 "sdk root":这可以由后处理工具用来迁移快照.
 2: sdk root that was used during the construction of this hardware.ini: This can be used by post processing tools to migrate snapshots
android.sdk.root []:

# 3: 正在运行的 AVD 的 ID:
 3: ID of the AVD being run:
avd.id [<build>]:

# 4: 正在运行的 AVD 的名称
 4: Name of the AVD being run:
avd.name [<build>]:

# 5:缓存分区支持:我们是否在设备上使用/cache分区.
 5: Cache partition support: Whether we use a /cache partition on the device.
disk.cachePartition [yes]:

#  6: 缓存分区: 在设备上使用的缓存分区.如果 disk.cachePartition 不是 'yes',则忽略此项.
 6: Cache partition: Cache partition to use on the device. Ignored if disk.cachePartition is not 'yes'.
disk.cachePartition.path []:

# 7: 缓存分区大小
 7: Cache partition size:
disk.cachePartition.size [66MB]:

# 8: 初始数据分区:如果不为空,启动时其内容将被复制到 disk.dataPartition.path 文件中.
 8: Initial data partition: If not empty, its content will be copied to the disk.dataPartition.path file at boot-time.
disk.dataPartition.initPath []:

# 9: 数据分区文件的路径:数据分区文件的路径.不能为空.特殊值 表示使用临时文件.如果 disk.dataPartition.initPath 不为空,它的内容将在启动时复制到 disk.dataPartition.path 文件.
 9: Path to data partition file: Path to data partition file. Cannot be empty. Special value <temp> means using a temporary file. If disk.dataPartition.initPath is not empty, its content will be copied to the disk.dataPartition.path file at boot-time.
disk.dataPartition.path [<temp>]:

# 10: 数据分区的理想大小
10: Ideal size of data partition:
disk.dataPartition.size [0]:

# 11: 加密键分区文件的路径: 加密键分区文件的路径.应该是至少16K字节的空磁盘,上面没有任何文件系统.
11: Path to encryption key partition file: Path to encryption key partition file. Should be at least 16K bytes empty disk without any filesystem on it.
disk.encryptionKeyPartition.path []:

# 12: 硬盘分区的路径: 硬盘分区的路径.
12: Path to the ramdisk image: Path to the ramdisk image.
disk.ramdisk.path []:

# 13: 快照存储路径:指向一个'快照存储'文件的路径,所有快照都存储在这里.
13: Path to snapshot storage: Path to a 'snapshot storage' file, where all snapshots are stored.
disk.snapStorage.path []:

# 14: 初始系统分区镜像:
14: Initial system partition image:
disk.systemPartition.initPath []:

# 15: 系统分区镜像的路径
15: Path to runtime system partition image:
disk.systemPartition.path []:

# 16: 系统分区的理想大小
16: Ideal size of system partition:
disk.systemPartition.size [0]:

# 17: 初始供应商分区镜像
17: Initial vendor partition image:
disk.vendorPartition.initPath []:

# 18: 供应商分区镜像的路径
18: Path to runtime vendor partition image:
disk.vendorPartition.path []:

# 19: 供应商分区的理想大小
19: Ideal size of vendor partition:
disk.vendorPartition.size [0]:

# 20: 配置设置 xml 文件用于 Android 窗口管理
20: Configure setting xml file for Android Window Manager:
display.settings.xml []:

# 21: 总是使用冷启动:如果设置,AVD将始终使用完全的冷启动而不是基于快照的快速启动过程
21: Always use cold boot: If set, AVD will always use the full cold boot instead of snapshot-based quick boot process
fastboot.forceColdBoot [no]:

# 22: 总是使用下载的快照来加速首次启动:如果设置,AVD将始终使用 snapshots/downloaded/avd 来加速首次启动
22: Always use downloaded snapshot to speed up first boot: If set, AVD will always use the snapshots/downloaded/avd to speed up first boot
firstboot.bootFromDownloadableSnapshot [yes]:

# 23: 总是使用本地快照来加速首次启动:如果设置,AVD将始终使用 snapshots/local/avd 来加速首次启动
23: Always use local snapshot to speed up first boot: If set, AVD will always use the snapshots/local/avd to speed up first boot
firstboot.bootFromLocalSnapshot [yes]:

# 24: 下载的快照目录路径:
24: Path to downloaded snapshot dir:
firstboot.downloaded.path []:

# 25: 本地快照目录路径
25: Path to local snapshot dir:
firstboot.local.path []:

# 26: 总是保存本地快照以加速首次启动:如果设置,如果不存在,AVD将会保存一个快照到 snapshots/local/avd
26: Always save a local snapshot to speed up first boot: If set, AVD will save a snapshot to snapshots/local/avd, if it does not exist
firstboot.saveToLocalSnapshot [yes]:

# 27: 加速度计:设备中是否有加速度计.
27: Accelerometer: Whether there is an accelerometer in the device.
hw.accelerometer [yes]:

# 28: 未校准的加速度计:设备中是否有未校准的加速度计.
28: AccelerometerUncalibrated: Whether there is an uncalibrated accelerometer in the device.
hw.accelerometer_uncalibrated [yes]:

# 29: Chrome OS设备(Chrome应用运行时):模拟的设备是一台Chrome OS机器.
29: Chrome OS device (App Runtime for Chrome): The emulated device is a Chrome OS machine.
hw.arc [no]:

# 30: Chrome OS设备的自动登录:用于启用Chrome OS设备的自动登录.
30: Auto login for Chrome OS devices: Used to enable auto login into Chrome OS devices
hw.arc.autologin [no]:

# 31: 音频录制支持:设备是否能录制音频
31: Audio recording support: Whether the device can record audio
hw.audioInput [yes]:

# 32: 音频播放支持:设备是否能播放音频
32: Audio playback support: Whether the device can play audio
hw.audioOutput [yes]:

# 33: 电池支持:设备是否有电池
33: Battery support: Whether the device can run on a battery.
hw.battery [yes]:

# 34: 配置面向后的摄像头:如果是假摄像头应设为 'emulated',如果是网络摄像头应设为 'webcam',如果后摄像头被禁用应设为 'none'.
34: Configures camera facing back: Must be 'emulated' for a fake camera, 'webcam<N>' for a web camera, or 'none' if back camera is disabled.
hw.camera.back [emulated]:

# 35: 配置面向前的摄像头:如果是假摄像头应设为 'emulated',如果是网络摄像头应设为 'webcam',如果前摄像头被禁用应设为 'none'.
35: Configures camera facing front: Must be 'emulated' for a fake camera, 'webcam<N>' for a web camera, or 'none' if front camera is disabled.
hw.camera.front [none]:

# 36: CPU架构:模拟器的CPU架构
36: CPU Architecture: The CPU Architecture to emulator
hw.cpu.arch [arm]:

# 37: CPU模型:CPU模型(QEMU特定的字符串)
37: CPU model: The CPU model (QEMU-specific string)
hw.cpu.model []:

# 38: SMP CPU核心数量:模拟的SMP CPU中的核心数量.
38: SMP CPU core count: Number of cores in a simulated SMP CPU.
hw.cpu.ncore [2]:

# 39: DPad支持:设备是否有DPad键.
39: DPad support: Whether the device has DPad keys
hw.dPad [yes]:

# 40: 设备的名称,例如,pixel,resizable...#内核镜像.
40: Name of the device, e.g., pixel, resizable...# Kernel image.:
hw.device.name []:

# 41: 第二显示器的屏幕密度:
41: Screen density of the second display:
hw.display1.density [0]:

# 42: 在Android系统中初始化第二显示器时使用的标志:
42: the flag to use when the second display is initialized in the Android system.:
hw.display1.flag [0]:

# 43: 第二显示器的像素高度
43: Pixel height of the second display:
hw.display1.height [0]:

#  44: 第二显示器的像素宽度
44: Pixel width of the second display:
hw.display1.width [0]:

# 45: 第二显示器相对于主QT窗口的水平偏移:
45: the horizontal offset of the second display with respect to the host QT window.:
hw.display1.xOffset [-1]:

# 46: 第二显示器相对于主QT窗口的垂直偏移:
46: the veritcal offset of the second display with respect to the host QT window.:
hw.display1.yOffset [-1]:

# 47: 第三显示器的屏幕密度:
47: Screen density of the third display:
hw.display2.density [0]:

# 48: 在Android系统中初始化第三显示器时使用的标志:
48: the flag to use when the third display is initialized in the Android system.:
hw.display2.flag [0]:

# 49: 第三显示器的像素高度
49: Pixel height of the third display:
hw.display2.height [0]:

# 50: 第三显示器的像素宽度
50: Pixel width of the third display:
hw.display2.width [0]:

# 51: 第三显示器相对于主QT窗口的水平偏移
51: the horizontal offset of the third display with respect to the host QT window.:
hw.display2.xOffset [-1]:

# 52: 第三显示器相对于主QT窗口的垂直偏移
52: the veritcal offset of the third display with respect to the host QT window.:
hw.display2.yOffset [-1]:

# 53: 第四显示器的屏幕密度
53: Screen density of the fourth display:
hw.display3.density [0]:

# 54: 在Android系统中初始化第四显示器时使用的标志
54: the flag touse when the fourth display is initialized in the Android system.:
hw.display3.flag [0]:

# 55: 第四显示器的像素高度
55: Pixel height of the fourth display:
hw.display3.height [0]:

# 56: 第四显示器的像素宽度
56: Pixel width of the fourth display:
hw.display3.width [0]:

# 57: 第四显示器相对于主QT窗口的水平偏移
57: the horizontal offset of the fourth display with respect to the host QT window.:
hw.display3.xOffset [-1]:

# 58: 第四显示器相对于主QT窗口的垂直偏移
58: the veritcal offset of the fourth display with respect to the host QT window.:
hw.display3.yOffset [-1]:

# 59: 子区域的垂直大小:
59: Vertical size of the sub-region:
hw.displayRegion.0.1.height [0]:

# 60: 子区域的水平大小
60: Horizontal size of the sub-region:
hw.displayRegion.0.1.width [0]:

# 61: 子区域的水平偏移:
61: Horizontal offset of the sub-region:
hw.displayRegion.0.1.xOffset [-1]:

# 62: 子区域的垂直偏移
62: Vertical offset of the sub-region:
hw.displayRegion.0.1.yOffset [-1]:

# 63: 子区域的垂直大小
63: Vertical size of the sub-region:
hw.displayRegion.0.2.height [0]:

# 64: 子区域的水平大小
64: Horizontal size of the sub-region:
hw.displayRegion.0.2.width [0]:

# 65: 子区域的水平偏移
65: Horizontal offset of the sub-region:
hw.displayRegion.0.2.xOffset [-1]:

# 66: 子区域的垂直偏移
66: Vertical offset of the sub-region:
hw.displayRegion.0.2.yOffset [-1]:

# 67: 子区域的垂直大小
67: Vertical size of the sub-region:
hw.displayRegion.0.3.height [0]:

# 68: 子区域的水平大小
68: Horizontal size of the sub-region:
hw.displayRegion.0.3.width [0]:

# 69: 子区域的水平偏移
69: Horizontal offset of the sub-region:
hw.displayRegion.0.3.xOffset [-1]:

# 70: 子区域的垂直偏移
70: Vertical offset of the sub-region:
hw.displayRegion.0.3.yOffset [-1]:

# 71: 特性标志:用于启用或禁用的特性标志的逗号分隔列表,例如'Enabled,-Disabled'.
71: Feature flags: A comma-separated list of feature flags to enable or disable, such as 'Enabled,-Disabled'.
hw.featureflags []:

# 72: 用于运行图形的传输方式:
72: Transport used to run graphics:
hw.gltransport [pipe]:

# 73: 对于地址空间图形,用于传输较大缓冲区的环的大小:
73: For address space graphics, the size of the ring used to transfer larger buffers.:
hw.gltransport.asg.dataRingSize [32768]:

# 74: 对于地址空间图形,客户机可以写入的写缓冲区的总大小:
74: For address space graphics, the total size of the write buffer the guest can write into:
hw.gltransport.asg.writeBufferSize [1048576]:

# 75: 对于地址空间图形,每个客户机到主机事务的最大大小:
75: For address space graphics, the max size of each guest-to-host transaction.:
hw.gltransport.asg.writeStepSize [4096]:

# 76: 刷新绘制调用的间隔(平衡主机GPU饥饿与管道通知开销):
76: Interval over which to flush draw calls (balance host gpu starve vs pipe notif overhead):
hw.gltransport.drawFlushInterval [800]:

# 77: GPS支持:设备中是否有GPS.
77: GPS support: Whether there is a GPS in the device.
hw.gps [yes]:

# 78: GPU模拟:启用/禁用模拟的OpenGLES GPU
78: GPU emulation: Enable/Disable emulated OpenGLES GPU
hw.gpu.enabled [no]:

# 79: GPU模拟模式:此值决定了如何实现GPU模拟.
79: GPU emulation mode: This value determines how GPU emulation is implemented.
hw.gpu.mode [auto]:

# 80: GSM调制解调器支持:设备中是否有GSM调制解调器
80: GSM modem support: Whether there is a GSM modem in the device.
hw.gsmModem [yes]:

# 81: 陀螺仪:设备中是否有陀螺仪.
81: Gyroscope: Whether there is a gyroscope in the device.
hw.gyroscope [yes]:

# 82: 如果是,使用HAL热插拔显示创建多显示器,否则,使用Android窗口管理器:
82: If yes, create multidisplay using HAL hotplug display, otherwise, using Android window manager:
hw.hotplug_multi_display [no]:

# 83: 初始屏幕方向:设置初始屏幕方向,后续可以旋转.
83: Initial screen orientation: Setup initial screen orientation, can be rotated later on.
hw.initialOrientation [portrait]:

# 84: 键盘支持:设备是否有QWERTY键盘.
84: Keyboard support: Whether the device has a QWERTY keyboard.
hw.keyboard [no]:

# 85: 键盘字符映射名称:系统键盘字符映射文件的名称.
85: Keyboard charmap name: Name of the system keyboard charmap file.
hw.keyboard.charmap [qwerty2]:

# 86: 键盘盖支持:QWERTY键盘是否可以打开/关闭.
86: Keyboard lid support: Whether the QWERTY keyboard can be opened/closed.
hw.keyboard.lid [yes]:

# 87: LCD背光:启用/禁用LCD背光模拟,yes-启用,no-禁用.
87: LCD backlight: Enable/Disable LCD backlight simulation,yes-enabled,no-disabled.
hw.lcd.backlight [yes]:

# 88: 显示器是圆形的:指定主显示器是否为圆形.默认值:false.
88: Display is circular: Specifies if the main display is circular (round). Default: false.
hw.lcd.circular [false]:

# 89: 抽象的LCD密度:用于大致描述LCD屏幕密度以自动选择资源/资产的值
89: Abstracted LCD density: A value used to roughly describe the density of the LCD screen for automatic resource/asset selection.
hw.lcd.density [160]:

# 90: LCD颜色深度:模拟帧缓冲的颜色位深度.
90: LCD color depth: Color bit depth of emulated framebuffer.
hw.lcd.depth [16]:

# 91: LCD像素高度:
91: LCD pixel height:
hw.lcd.height [640]:

# 92: LCD 垂直同步频率:
92: LCD VSYNC rate:
hw.lcd.vsync [60]:

# 93: LCD像素宽度
93: LCD pixel width:
hw.lcd.width [320]:

# 94: Logcat输出文件路径
94: Logcat Output File Path:
hw.logcatOutput.path []:

# 95: 硬件返回/主页键:设备上是否有硬件返回/主页键.
95: Hardware Back/Home keys: Whether there are hardware back/home keys on the device.
hw.mainKeys [yes]:

# 96: 为每个显示器创建一个窗口:当启用多显示器时,启用此标志将为每个显示器创建一个窗口.
96: Create a window for each display: When multidisplay enabled, enabling this flag will create a window for each display.
hw.multi_display_window [no]:

# 97: 设备RAM大小:设备上的物理RAM量,以兆字节为单位.
97: Device ram size: The amount of physical RAM on the device, in megabytes.
hw.ramSize [0]:

# 98: 一组以逗号分隔的可调整分辨率.每个条目的组织方式为name-id-width-height-dpi,其中id号与android/android-emu/android/resizable_display_config.h中的枚举匹配.
98: : A comma-separated list of resizable resolutions. Each entry is organized as name-id-width-height-dpi, where the id number matches enum in android/android-emu/android/resizable_display_config.h
hw.resizable.configs []:

# 99: 旋转输入支持:设备是否支持旋转输入.
99: Rotary input support: Whether the device has rotary input
hw.rotaryInput [no]:

# 100: 触摸屏类型:定义屏幕的类型.
100: Touch screen type: Defines type of the screen.
hw.screen [multi-touch]:

# 101: SD卡支持:设备是否支持虚拟SD卡的插入/移除.
101: SD Card support: Whether the device supports insertion/removal of virtual SD Cards.
hw.sdCard [yes]:

# 102: SD卡镜像路径:
102: SD Card image path:
hw.sdCard.path []:

# 103: 启用铰链角度传感器.
103: Enalbe hinge angle sensor.:
hw.sensor.hinge [no]:

# 104: 显示器上的铰链区域,格式为屏幕百分比-宽度,例如,对于两个传感器,33.3-0,66.6-10.或者x-y-width-height,例如,对于两个传感器,600-0-0-1200,1200-0-10-1200.
104: hinge areas on the display, format is percentage_of_screen-width, e.g., 33.3-0, 66.6-10 for two sensors. Or x-y-width-height, e.g., 600-0-0-1200, 1200-0-10-1200 for two sensors.:
hw.sensor.hinge.areas []:

# 105: 提供铰链角度传感器的数量.
105: Provides hinge angle sensor count.:
hw.sensor.hinge.count [0]:

# 106: 每个铰链传感器的默认角度,例如,对于两个传感器,180,90.
106: default angel for each hinge sensor, e.g., 180, 90 for two sensors.:
hw.sensor.hinge.defaults []:

# 107: 在某个姿势下设置折叠状态,例如,折叠设备,姿势翻转:
107: set folded status at a certain posture, e.g, fold-out device, posture flipped:
hw.sensor.hinge.fold_to_displayRegion.0.1_at_posture [1]:

# 108: 每个铰链传感器的角度范围,例如,对于两个传感器,0-360,0-180.
108: angel ranges for each hinge sensor, e.g., 0-360, 0-180 for two sensors.:
hw.sensor.hinge.ranges []:

# 109: 提供铰链角度传感器的子类型.0(看不见的铰链,在屏幕上折叠)和1(铰链).
109: Provides hinge angle sensor sub type. 0 (invisible hinge, fold on screen) and 1 (hinge):
hw.sensor.hinge.sub_type [0]:

# 110: 提供铰链角度传感器类型.0(水平)和1(垂直).
110: Provides hinge angle sensor type. 0 (horizontal) and 1 (vertical):
hw.sensor.hinge.type [0]:

# 111: 姿势列表中每个姿势的角度范围:定义每个姿势的起始-结束角度对.可选地,可以为每个姿势指定默认角度,通过提供第三个值.默认姿势角度用于例如在UI中的快速跳转到姿势按钮.
111: angles ranges for each posture in posture_list.: start-end angle pairs which define each posture. optionally, default angle may be specified for each posture, by providing a third value. default posture angle is used e.g. in quick-jump-to-posture buttons in UI.
hw.sensor.hinge_angles_posture_definitions []:

# 112: 按索引列出支持的姿势.0:未知,1:关闭,2:半开,3:开启,4:翻转,5:帐篷:
112: list of supported postures by index. 0: unknown, 1: closed, 2: half-open, 3: open, 4: flipped, 5: tent:
hw.sensor.posture_list []:

# 113: 启用滚动传感器.
113: Enalbe rollable sensor.:
hw.sensor.roll [no]:

# 114: 提供滚动传感器的数量.
114: rollable sensor count.:
hw.sensor.roll.count [0]:

# 115: 默认的显示宽度或高度的百分比,该百分比已经滚动.
115: defaults percentage of display width or height which is rolled.:
hw.sensor.roll.defaults []:

# 116: 从开放姿势开始的滚动方向.0:从左到右或从上到下,1:从右到左或从下到上.
116: rolling direction starting from open posture. 0: left-to-right or top-to-buttom, 1: right-to-left or bottom-to-top:
hw.sensor.roll.direction []:

# 117: 显示宽度或高度的滚动半径.
117: roll radious of display width or height.:
hw.sensor.roll.radius []:

# 118: 显示宽度或高度可以滚动的百分比.
118: the pecentage of display width or height which is rollable.:
hw.sensor.roll.ranges []:

# 119: 当滚动到某个姿势状态时,将默认显示器大小调整为显示区域0.1.
119: resize default display to display region 0.1 when rolling to a posture state:
hw.sensor.roll.resize_to_displayRegion.0.1_at_posture [6]:

# 120: 当滚动到某个姿势状态时,将默认显示器大小调整为显示区域0.2.
120: resize default display to display region 0.2 when rolling to a posture state:
hw.sensor.roll.resize_to_displayRegion.0.2_at_posture [6]:

# 121: 当滚动到某个姿势状态时,将默认显示器大小调整为显示区域0.3.
121: resize default display to display region 0.3 when rolling to a posture state:
hw.sensor.roll.resize_to_displayRegion.0.3_at_posture [6]:

# 122: 姿势列表中每个姿势的角度范围:
122: angles ranges for each posture in posture_list.:
hw.sensor.roll_percentages_posture_definitions []:

# 123: 未校准陀螺仪支持:提供未校准的陀螺仪传感器值.
123: Uncalibrated gyroscope support: Provides uncalibrated gyroscope sensor values.
hw.sensors.gyroscope_uncalibrated [yes]:

# 124: 心率支持:设备是否支持心率传感器.
124: Heart rate support: Whether there is a heart rate sensor in the device
hw.sensors.heart_rate [no]:

# 125: 湿度支持:设备是否支持湿度传感器
125: Humidity support: Whether there is a relative humidity sensor in the device
hw.sensors.humidity [yes]:

# 126: 光照支持:设备是否支持光照传感器
126: Light support: Whether there is a light sensor in the device
hw.sensors.light [yes]:

# 127: 磁场支持:提供磁场传感器值
127: Magnetic field support: Provides magnetic field sensor values.
hw.sensors.magnetic_field [yes]:

# 128: 未校准磁场支持:提供未校准的磁场传感器值
128: Uncalibrated magnetic field suport: Provides uncalibrated magnetic field sensor values.
hw.sensors.magnetic_field_uncalibrated [yes]:

# 129: 方向支持:提供方向传感器值
129: Orientation support: Provides orientation sensor values.
hw.sensors.orientation [yes]:

# 130: 压力支持:设备中是否有压力传感器.
130: Pressure support: Whether there is a pressure sensor in the device
hw.sensors.pressure [yes]:

# 131: 接近支持:设备中是否有接近功能.
131: Proximity support: Whether there is an proximity in the device.
hw.sensors.proximity [yes]:

# 132: RGBC光传感器支持:提供RGBC光传感器值.
132: RGBC light sensor support: Provides RGBC light sensor values.
hw.sensors.rgbclight [no]:

# 133: 温度支持:提供温度传感器值
133: Temperature support: Provides temperature sensor values.
hw.sensors.temperature [yes]:

# 134: 手腕倾斜手势:设备中是否有手腕倾斜手势传感器.
134: Wrist tilt gesture: Whether there is a wrist tilt gesture sensor in the device
hw.sensors.wrist_tilt [no]:

# 135: 轨迹球支持:设备是否支持轨迹球
135: Track-ball support: Whether there is a trackball on the device.
hw.trackBall [yes]:

# 136: 已弃用的选项.被忽略.:曾用于指定Ext4分区镜像类型.现在已自动检测.
136: Deprecated option. Ignored.: Used to specify the Ext4 partition image type. This is now autodetected.
hw.useext4 [yes]:

# 137: 内核是否需要新的设备命名方案?:用于指定内核是否需要新的设备命名方案.通常用于Linux 3.10及以上版本.
137: Does the kernel require a new device naming scheme?: Used to specify whether the kernel requires a new device naming scheme. Typically for Linux 3.10 and above.
kernel.newDeviceNaming [autodetect]:

# 138: 内核启动参数字符串:
138: kernel boot parameters string.:
kernel.parameters []:

# 139: 内核映像的路径:内核映像的路径.
139: Path to the kernel image: Path to the kernel image.
kernel.path []:

# 140: 内核是否支持YAFFS2分区?:用于指定内核是否支持YAFFS2分区映像.通常仅用于3.10之前的版本.
140: Does the kernel supports YAFFS2 partitions?: Used to specify whether the kernel supports YAFFS2 partition images. Typically before 3.10 only.
kernel.supportsYaffs2 [autodetect]:

# 141: avd需要模拟器的版本从快照中正确启动:在创建avd时,这通常由studio中的avd管理器设置.
141: avd requires the version of emulator to boot properly from snapshot: This is often set by avd manager in studio when creating avd
requires.emulator.version []:

# 142: 在客户机完成启动之前,延迟向客户机adb发送数据.
142: Delay sending data to guest adb until guest completed booting:
test.delayAdbTillBootComplete [0]:

# 143: 监视客户机和主机之间的Adb消息.默认:禁用.
143: Monitor Adb messages between guest and host. Default: Disabled.:
test.monitorAdb [0]:

# 144: 在客户机完全启动或超时后退出模拟器.默认:到宇宙末日.
144: Quit emulator after guest boots completely, or after time out. Default: end of universe.:
test.quitAfterBootTimeOut [-1]:

# 145: 为userdata-qemu.img使用QCOW2格式:如果设置,AVD将为userdata-qemu.img使用qcow2,而不是ext4.
145: use QCOW2 format for userdata-qemu.img: If set, AVD will use qcow2 for userdata-qemu.img instead of the ext4
userdata.useQcow2 [no]:

# 146: 最大VM应用程序堆大小:Dalvik应用程序在被系统杀死之前可能分配的最大堆大小.值以兆字节为单位.
146: Max VM application heap size: The maximum heap size a Dalvik application might allocate before being killed by the system. Value is in megabytes.
vm.heapSize [0]:
```
