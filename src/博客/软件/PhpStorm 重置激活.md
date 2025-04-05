---
title: PhpStorm重置激活
category: 软件
tags:
  - PhpStorm
cover: https://cdn.pixabay.com/photo/2021/08/12/10/38/mountains-6540497_960_720.jpg
---

## 一、把新建 PhpStorm 重置.bat

>PhpStorm 重置.bat
把下面内容写入 PhpStorm 重置.bat

```bat
reg delete HKEY_CURRENT_USER\SOFTWARE\JavaSoft\Prefs\jetbrains\phpstorm /f
del /F /S /Q %APPDATA%\JetBrains\PhpStorm2021.1\eval
del /F /S /Q %APPDATA%\JetBrains\PhpStorm2021.1\options\other.xml
```

## 二、注意

其中`PhpStorm2021.1`按照自己安装的版本写入正确的路径
可以`win+r`输入`%APPDATA%\JetBrains`回车看下面的文件夹
写入正确的路劲后关闭运行的 `PhpStorm` 程序和进程进入第三步

## 三、运行

双击 hpStorm 重置.bat
