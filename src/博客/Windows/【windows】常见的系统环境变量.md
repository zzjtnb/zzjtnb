---
title: 【windows】常见的系统环境变量
category: Windows
tags:
  - Win10
cover: https://cdn.pixabay.com/photo/2020/07/04/06/41/clouds-5368444_960_720.jpg
---

## 一、介绍

`%appdata%` 就代表了`C:Users/用户名/AppData/Roaming` 这个文件夹.

`"%"` 是系统变量的一种表示方法, 在升级补丁或者软件需要将某些内容写入系统文件夹时, 都是用的这种写法, 可以准确的定位.

## 二、其他常见变量

### 环境变量与对应的路径

```bash
%ALLUSERSPROFILE%                C:/ProgramData

%APPDATA%                        C:/Users/用户名/AppData/Roaming

%COMMONPROGRAMFILES%             C:/Program Files/Common Files

%COMMONPROGRAMFILES(x86)%        C:/Program Files (x86)/Common Files

%COMSPEC%                        C:/Windows/System32/cmd.exe

%HOMEDRIVE% 和 %SystemDrive%     C:/

%HOMEPATH%                       C:/Users/用户名

%LOCALAPPDATA%                   C:/Users/用户名/AppData/Local

%PROGRAMDATA%                    C:/ProgramData

%PROGRAMFILES%                   C:/Program Files

%PROGRAMFILES(X86)%              C:/Program Files (x86)

%PUBLIC%                         C:/UsersPublic

%SystemRoot%                     C:/Windows

%TEMP% 和 %TMP%                  C:/Users/用户名/AppData/LocalTemp

%USERPROFILE%                    C:/Users 用户名

%WINDIR%                         C:/Windows
```

## 3. 自定义环境变量

### 1. 当然了我们还可以自己定义环境变量

右键点击我的电脑选择系统属性, 然后点击高级 (advanced), 再点击环境变量 (Environment Variables). 如下:

![20170419111900908](https://i.ibb.co/FVMjf0q/20170419111900908.png)

### 2. 然后弹出如下对话框

你可以看到系统已经有的一些环境变量.

![20170419112055518](https://i.ibb.co/bzmHz8N/20170419112055518.png)

点击新建 (New) 按钮, 输入 Variable name: 为 123;Variable value 为 C:/. 表示 123 这个变量名代表的是`C`盘根目录. 继续点击 OK 按钮, 更新后的环境变量如下:

![20170419112230018](https://i.ibb.co/9qFxwBm/20170419112230018.png)

(当然你也看到了环境变量分为用户环境变量和系统环境变量, 区别就是系统环境变量对当前电脑的所有用户都是有效的.)

### 3. 测试效果

在 Run 中直接输入 `%123%`回车:

![20170419112706731](https://i.ibb.co/f9mwTv3/20170419112706731.png)

也可以在资源管理器的导航栏中, 直接输入 `%123%`就打开了`C`盘.

## 四、终端设置

## win10 默认环境变量

```bash
%SystemRoot%;%SystemRoot%\system32;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;
```

简单说下 Path 修改及生效的原理：

+ 图形界面修改 Path，同步到注册表，立即生效，已打开的 cmd 中不会生效；
+ cmd 命令修改 Path，同步到注册表，不立即生效，已打开的 cmd 中不会生效；
+ 重启计算机、重启文件管理器 explorer.exe、手动发送系统全局广播，均会导致修改的系统 Path 生效，其中前两种较为常见。

### 1. 查看系统已经设置的环境变量

打开终端输入`path`并回车

未关闭的 IDEA/PyCharm/Goland/Vs Code
如果你在修改系统 Path 前打开了以上任意 IDE，无论你怎么修改环境 Path 都不会生效，必须重启 IDE 才能生效。
由此，我们可以利用未关闭的 IDE 得到修改之前的 Path 变量的值。
在 IDE 的 Terminal 窗口输入以下命令显示未修改前的系统变量：

```bash
echo %Path%
```

### 2.set 命令

set 命令用于设置当前 cmd 窗口中的环境变量，只在当前 cmd 窗口有效，cmd 窗口关闭后将会失效,而其不会影响到系统中保存的用户环境变量。

### 3.setx 命令

setx 设置永久用户环境变量
终端输入`setx /?`会出现具体的使用方法

要设置系统环境变量而不是用户环境变量, 我们只需要在 setx 命令中使用 / m 选项并从提升的 (管理员) 命令下运行它即可.

```bash
setx variable value /m
```

示例: 以管理员身份打开命令并发运行

```bash
setx Path "%PATH%;D:\Office\Node\npm" /m
```

说明: 上面的命令设置`D:\Office\Node\npm`~~追加到已经存在的路径变量(系统环境变量)中~~,有 bug,会覆盖`Path`下面的值.

**如果没有`/m`参数, 则只能更改或创建用户级`Path`变量.**

从`setx`用户手册中,

`/M`指定应在系统范围`(HKEY_LOCAL_MACHINE)`环境中设置变量. 设置是`在HKEY_CURRENT_USER`环境下设置变量.
