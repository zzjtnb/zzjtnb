---
title: windows 批处理文件bat中当前目录
category: Windows
tags:
  - bat
cover: https://cdn.pixabay.com/photo/2020/10/23/09/02/mountain-5678172_960_720.jpg
---

在批处理文件中，往往我们想运行当前目录下的某些程序，比如说 bat 调用 java，请参看本人的其他文章。今天重点说怎么取得当前目录。

在度娘了很多文章之后做一个总结，目前，我发现的有两个：

```bat
1，命令   %cd%  或者  !cd!
2，命令   %~dp0
```

很多人用第一种命令，但是有弊端。

第一种命令，是当进入到命令所在目录后，可以这样运行，如果用 windows 的自动任务，或者在其他目录输入 bat 命令的全路径，这样就会出问题。

所以，建议使用第二种

以下举例说明：curDir.bat 文件

```bat
@echo off
setlocal EnableDelayedExpansion
echo 路径1.1：!cd!
pause
@echo off
echo 路径1.2：%cd%
pause
@echo off
echo 路径2：%~dp0
pause


```

文件存放于：**D:\\classPath\\battojava**  目录

打开 cmd 窗口：环境目录为 **C:\\Users\\Administrator**

输入全路径：**D:\\classPath\\battojava\\curDir.bat** 运行 bat 文件

运行结果：

>路径 1.1： C:\\Users\\Administrator
路径 1.2： C:\\Users\\Administrator
路径 1.3： D:\\classPath\\battojava

总结：很明显，

```bat
方法 1：命令   %cd%  或者  !cd!  ，取得是运行的环境目录
方法 2：命令  %~dp0   ，取得了 bat 的文件所在目录
```

## npm 启动

+ 不存在 node_modules 就执行 npm install 再执行 npn run dev
+ 存在就直接执行 npm run dev

```bat
@ECHO off 
SETLOCAL EnableDelayedExpansion 
TITLE DCS World Lua脚本调试器
COLOR 0a
CLS
if exist %~dp0node_modules (
  call npm run dev
) else (
  call npm install
  npm run dev
)
pause
```
