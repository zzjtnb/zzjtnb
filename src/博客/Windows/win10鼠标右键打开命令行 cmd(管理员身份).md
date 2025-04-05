---
title: win10鼠标右键打开命令行cmd(管理员身份)
category: Windows
tags:
  - Win10
cover: https://cdn.pixabay.com/photo/2017/08/31/20/14/blue-2702172_960_720.jpg
---

## 添加到注册表

将下面命令保存为 reg 文件：

```json
Windows Registry Editor Version 5.00
; Created by: zzjtnb
; Created on: Jul 3, 2021
; Tutorial: https://zzjtnb.com/blog/details/win10sbyjdkmlxcmdglysf

[-HKEY_CLASSES_ROOT\Directory\shell\runas]

[HKEY_CLASSES_ROOT\Directory\shell\runas]
@="命令提示符(管理员)"
"HasLUAShield"=""

[HKEY_CLASSES_ROOT\Directory\shell\runas\command]
@="cmd.exe /s /k pushd \"%V\""

[-HKEY_CLASSES_ROOT\Directory\Background\shell\runas]

[HKEY_CLASSES_ROOT\Directory\Background\shell\runas]
@="命令提示符(管理员)"
"HasLUAShield"=""

[HKEY_CLASSES_ROOT\Directory\Background\shell\runas\command]
@="cmd.exe /s /k pushd \"%V\""



[-HKEY_CLASSES_ROOT\Drive\shell\runas]

[HKEY_CLASSES_ROOT\Drive\shell\runas]
@="命令提示符(管理员)"
"HasLUAShield"=""

[HKEY_CLASSES_ROOT\Drive\shell\runas\command]
@="cmd.exe /s /k pushd \"%V\""



[-HKEY_CLASSES_ROOT\LibraryFolder\background\shell\runas]

[HKEY_CLASSES_ROOT\LibraryFolder\background\shell\runas]
"HasLUAShield"=""
@="命令提示符(管理员)"

[HKEY_CLASSES_ROOT\LibraryFolder\background\shell\runas\command]
```

保存 文件名为 Add_Open_in_Windows_Terminal_as_Administrator.reg
注意文件字符格式为 `utf-8 with bom`或着`GBK`或`GBK(132)`
然后双击执行就可以了。

## 卸载

类似上面的，执行下面注册表命令就可以了：

```json
Windows Registry Editor Version 5.00

; Created by: zzjtnb
; Created on: Jul 3, 2021
; Tutorial: https://zzjtnb.com/blog/details/win10sbyjdkmlxcmdglysf

[-HKEY_CLASSES_ROOT\Directory\shell\runas]

[-HKEY_CLASSES_ROOT\Directory\Background\shell\runas]

[-HKEY_CLASSES_ROOT\Drive\shell\runas]

[-HKEY_CLASSES_ROOT\LibraryFolder\background\shell\runas]
```
