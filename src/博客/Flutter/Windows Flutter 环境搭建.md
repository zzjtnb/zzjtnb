---
title: Windows Flutter 环境搭建
category: Flutter
tags:
  - Flutter
cover: https://cdn.pixabay.com/photo/2023/09/29/07/52/rocks-8283191_1280.jpg
---


## 安装和环境配置

### 系统配置要求

为了安装和运行 Flutter,你的开发环境必须至少满足以下要求:

* 操作系统:Windows 10 或更高的版本(基于 x86-64 的 64 位操作系统).

* 磁盘空间:除安装 IDE 和一些工具之外还应有至少 2.5 GB 的空间.

* 工具:要让 Flutter 在你的开发环境中正常使用,依赖于以下的工具:

  * Windows PowerShell 5.0 或者更高的版本(Windows 10 中已预装)

  * Git for Windows,并且勾选`从 Windows 命令提示符使用 Git 选项(Use Git from the Windows Command Prompt)`.

  * 如果 Windows 版的 Git 已经安装过了,那么请确保能从命令提示符或者 `PowerShell` 中直接执行 `git` 命令.

### 获取 Flutter SDK

**重点提醒: 国内的网络环境下可能需要对 Flutter 工具进行一些额外配置,请参考文档 [在中国网络环境下使用 Flutter](https://docs.flutter.dev/community/china)**

1. 下载以下安装包以获取 Flutter SDK 的最新稳定版本:
    [flutter_windows_3.16.2-stable.zip](https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.16.2-stable.zip)

    对于其他发布渠道和较旧的版本,请查看[SDK 存档](https://docs.flutter.dev/release/archive).

2. 将压缩包解压,然后把其中的 `flutter` 目录整个放在你想放置 `Flutter SDK` 的路径中(例如 `%USERPROFILE%\flutter` 或者 `D:\Android\flutter`).

**请注意:请勿将 `Flutter` 有`特殊字符或空格`的路径下.**
**请注意:请勿将 `Flutter` 安装在`需要高权限的文件夹`内,例如 `C:\Program Files\`.**

### 更新 path 环境变量

如果你想在 Windows 控制台中运行 Flutter 命令,需要按照下面的步骤来将 Flutter 的运行文件路径加入到 PATH 环境变量.

* 在开始菜单的搜索功能键入 `env`,然后选择 `编辑系统环境变量`.

* 在 `系统变量` 一栏中,检查是否有 `Path` 这个条目:

  * 如果存在这个条目,以 ; 分隔已有的内容,加入 `flutter\bin` 目录的完整路径.

  * 如果不存在的话,在`系统环境变量`中创建一个新的 `Path` 变量,然后将 `flutter\bin` 所在的完整路径作为新变量的值.

你需要重新打开已经打开的命令行提示符窗口,这样下次启动命令提示符时,才能访问到刚才修改的变量.

### 运行 flutter doctor

在将 `Path` 变量更新后,打开一个新的控制台窗口,然后执行下面的命令.如果它提示有任何的平台相关依赖,那么你就需要按照指示完成这些配置:

```bash
flutter doctor

Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel stable, 3.16.2, on Microsoft Windows [Version 10.0.19045.3693], locale zh-CN)
[√] Windows Version (Installed version of Windows is version 10 or higher)
[√] Android toolchain - develop for Android devices (Android SDK version 33.0.0)
[X] Chrome - develop for the web (Cannot find Chrome executable at .\Google\Chrome\Application\chrome.exe)
    ! Cannot find Chrome. Try setting CHROME_EXECUTABLE to a Chrome executable.
[X] Visual Studio - develop Windows apps
    X Visual Studio not installed; this is necessary to develop Windows apps.
      Download at https://visualstudio.microsoft.com/downloads/.
      Please install the "Desktop development with C++" workload, including all of its default components
[!] Android Studio (not installed)
[√] Connected device (3 available)
[√] Network resources

! Doctor found issues in 3 categories.
```

上述命令会检查你的现有环境,并将检测结果以报告形式呈现出来.仔细阅读它显示的内容,检查是否有尚未安装的软件或是有其他的步骤需要完成(通常会以**粗体**呈现).

提示没有设置 `CHROME_EXECUTABLE`
找到自己的 Chrome 安装位置 设置路径

* 在开始菜单的搜索功能键入`env`,然后选择 `编辑系统环境变量`
* 在`系统环境变量`中创建 `CHROME_EXECUTABLE` 变量,然后将 `chrome.exe` 所在的完整路径作为新变量的值.例如:`C:\Program Files\Google\Chrome Dev\Application\chrome.exe`

打开新的终端

```bash
flutter doctor

# Doctor summary (to see all details, run flutter doctor -v):
# [✓] Flutter (Channel stable, 3.16.2, on Microsoft Windows [Version 10.0.19045.3693], locale zh-CN)
# [✓] Windows Version (Installed version of Windows is version 10 or higher)
# [✓] Android toolchain - develop for Android devices (Android SDK version 33.0.0)
# [✓] Chrome - develop for the web
# [✗] Visual Studio - develop Windows apps
#     ✗ Visual Studio not installed; this is necessary to develop Windows apps.
#       Download at https://visualstudio.microsoft.com/downloads/.
#       Please install the "Desktop development with C++" workload, including all of its default components
# [!] Android Studio (not installed)
# [✓] Connected device (4 available)
# [✓] Network resources

# ! Doctor found issues in 2 categories.
```

Chrome 的报错已经解决了,因为是使用`VS Code`开发`Android`,所以剩下的两个可以不用理会,有需要的话查看官方文档进行解决.

### 同意 Android 协议

在使用 `Flutter` 前,你必须同意 `Android SDK` 平台的协议.你可以在安装完上述工具后执行这一步.

打开一个已经提升管理员权限的终端窗口,运行以下命令进行协议的确认.

```bash
 flutter doctor --android-licenses
```

仔细阅读每条协议后同意.

当你同意所有协议后,再次运行 `flutter doctor` 以确认是否已经可以正常使用 `Flutter`.

## 编辑工具设定

### 安装 VS Code

VS Code 是一个可以运行和调试 Flutter 的编辑器.安装 Flutter 插件后,你可以编译,部署及调试 Flutter 应用.

请参考 Microsoft 针对不同平台的安装指引来安装最新版本的 VS Code:

* [Install on macOS](https://code.visualstudio.com/docs/setup/mac)
* [Install on Windows](https://code.visualstudio.com/docs/setup/windows)
* [Install on Linux](https://code.visualstudio.com/docs/setup/linux)

### 安装 VS Code 的 Flutter 扩展

#### Flutter 插件

1. 打开`VS Code`.

2. 打开浏览器,访问市场的 [Flutter 插件](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) 页面.

3. 点击 `Install`,安装 `Flutter` 与 `Dart` 依赖.

#### Android 虚拟设备 (AVD) 管理器(可选)

1. 打开`VS Code`.

2. 打开浏览器,访问市场的 [AVD 管理器](https://marketplace.visualstudio.com/items?itemName=toroxx.vscode-avdmanager) 页面.

3. 点击 `Install`, Android 虚拟设备 (AVD) 管理器.

### 验证您的 VS Code 设置

1. 打开 `查看(View)` > 输出(Output).

    你也可以按下`Ctrl / Cmd + Shift + U`.

2. 在 `输出(Output)` 面板右上角的下拉菜单中选择`flutter (flutter)`.

3. 打开 `查看(View)` >`命令面板(Command Palette)`.

    你也可以按下 `Ctrl / Cmd + Shift + P`.

4. 输入 `doctor`.

5. 选择 `Flutter: Run Flutter Doctor`.输出结果会显示在 `输出(Output)` 面板中.

## 开发体验初探

本篇文章讲解以下内容:

1. 如何基于模板创建新的 Flutter 应用.

2. 如何运行创建好的 Flutter 应用.

3. 如何在应用中使用「热重载」应用你的更改.

### 创建应用

1. 打开 `查看(View)` > `命令面板(Command Palette)`.

2. 输入`flutter`,选择 `Flutter: New Project`.

3. 选择 `Application`.

4. 新建或选择新项目将存放的上层目录.

5. 输入项目名称,例如 `my_app`,并点击 `Enter`.

6. 等待项目创建完成,并且 `main.dart` 文件展现在编辑器中.

该命令会创建一个名为 `my_app`,里面包含一个简单的示例程序,里面用到了 [Material](https://m3.material.io/components) 组件.
>每当创建一个新的 `Flutter` 应用时,一些 `Flutter IDE`插件会请你输入一个类似 `com.example` 的包名,包名(在 `iOS` 里叫 `Bundle ID`)一般都是公司域名的反写.如果你的应用打算上架商店,建议一开始的时候把这个全网唯一的包名设置好,因为应用上架之后就不能再修改了.
>如果你的 `VSCode` `运行时,Flutter` 正在进行初始化安装,你需要在 SDK 安装完成后重启 `VSCode` 使其可以检测到 `Flutter SDK`.
>应用程序的代码存放在`lib/main.dart` 中.想要查看每块代码具体的作用,请查看文件中的对应注释.
>
### 启动 app

1. 定位到 VS Code 的状态栏(窗口底部的蓝色栏):

    ![状态栏](https://docs.flutter.dev/assets/images/docs/tools/vs-code/device_status_bar.png)

2. 从 `Device Selector`区域选择一个设备.更多信息,参考 [快速切换用于 Flutter 的设备](https://dartcode.org/docs/quickly-switching-between-flutter-devices/).

    * 如果没有可用的设备,而同时你想使用模拟器,点击 No Devices 并点击 Start iOS Simulator 启动一个模拟器.

    >点击 `VS Code` 的 `No Devices` 时,你可能不会看到 `Start iOS Simulator` 的选项.如果你在使用 `macOS`,请在终端中执行以下命令:

    ```bash
    open -a simulator
    ```

    >在 Windows 或 Linux 上你无法启动 iOS 模拟器.

    * 想要配置真机用于调试,请查看你正在使用的系统的对应 [安装](https://docs.flutter.dev/get-started/install) 设备指导.

3. `运行(Run)` > `启动调试(Start Debugging)` 或按下`F5`.

4. 等待应用启动——启动进度会在`调试控制台(Debug Console)` 中展示.

当应用编译完成后,就可以在设备上运行这个起步应用了.

#### 报错

```bash
BUILD FAILED in 3s

  Flutter Fix
  [!] Your project's Gradle version is incompatible with the Java version that Flutter is using for Gradle.
  To fix this issue, consult the migration guide at docs.flutter.dev/go/android-java-gradle-error.

Exception: Gradle task assembleDebug failed with exit code 1│
```

由于使用的是 java 21,因此至少将 gradle 升级到版本 8.3.可以从[Gradle Release](https://gradle.org/releases/)获取版本信息

#### 解决

1. 打开`android\gradle\wrapper\gradle-wrapper.properties`

    ```dart
    distributionUrl=https\://services.gradle.org/distributions/gradle-7.5-all.zip
    ```

2. 修改`Gradle`版本

    ```bash
    # distributionUrl=https://services.gradle.org/distributions/gradle-{Latest version}-all.zip
    distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-all.zip
    ```

### 尝试热重载 (hot reload)

`Flutter` 通过 `热重载` 提供快速开发周期,该功能支持应用程序在运行状态下重载代码,无需重新启动应用程序或者丢失程序运行状态.修改一下代码,然后告诉 IDE 或者命令行工具你需要热重载,然后看一下模拟器或者设备上应用的变化.

1. 打开`lib/main.dart`.

2. 修改字符串
    **You have ~~pushed~~ the button this many times**
    改为
    **You have `clicked` the button this many times**

    >不要 停止应用.保持应用处于运行状态.

3. 保存修改: `invoke Save All`, or click`Hot Reload` ![lightning bolt](https://docs.flutter.dev/assets/images/docs/get-started/hot-reload.svg) .

你会发现修改后的字符串几乎马上出现在正在运行的应用程序上.

### 以 profile 模式运行

 **重点提醒:请勿 在调试模式和热重载功能开启的情况下做性能测试.**

截止目前文档所示内容,你的应用应该运行在调试 (debug) 模式中,这个模式意味着在更大的性能开销下实现了更快速的开发效率,比如热重载功能的启用,因此你可能要面临较差质量的动画效果.当你准备分析应用性能或要打包发布的时候,你可能需要 Flutter 的 profile 或者 release 构建,相关文档,请查阅文档: [Flutter 的构建模式选择.](https://docs.flutter.dev/testing/build-modes).

 重点提醒:

如果你关心应用大小,请参考 [测量应用程序的大小](https://docs.flutter.dev/perf/app-size).

## 构建您的第一个 Flutter 应用

[代码实验室](https://codelabs.developers.google.com/codelabs/flutter-codelab-first?hl=zh-cn#0)

>小提示: 上面的 `代码实验室` 将引导您编写适用于`所有平台(移动,桌面和 Web)`的第一个 `Flutter` 应用程序.您可能更愿意选择 另一个专门为 `Web 应用` 编写的 [代码实验室](https://docs.flutter.dev/get-started/codelab-web).
