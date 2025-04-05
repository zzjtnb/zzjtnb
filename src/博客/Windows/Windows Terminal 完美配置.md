---
title: Windows Terminal 完美配置
category: Windows
tags:
  - Terminal
cover: https://cdn.pixabay.com/photo/2013/07/18/10/59/pulse-trace-163708_960_720.jpg
---

## 1. 安装 Windows Terminal

`Microsoft Store` 搜索下载或者 github 下载

Github 地址:[Windows Terminal](https://github.com/microsoft/terminal)

## 2. 安装字体

这里仅推荐一款字体:**Fira Code**. 该字体支持 ligature 连字功能, 而且是一款专门为代码显示准备的字体. 该字体开源, 广受海内外程序员好评!

GitHub 地址:[FiraCode](https://github.com/tonsky/FiraCode)

装上该字体, 即可进入下一步.

## 3. 安装新款 Powershell Core

首先声明, 我们这儿用的 `Powershell` 与 `Windows` 自带的 `Windows PowerShell` 是完全不同的两个东西, 除了功能相似和名字相同, 两者内在已经天差地别.

自带的 Powershell **错误提示冗长**,**颜值低**,**速度慢**, 总之就是不值得去用.

那么 `Powershell Core` 是什么呢? 这是伟大的 **.Net Core 跨平台战略**的一个重要组成部分, 微软设想, 要让强大的 .Net 在所有平台上通用, 让这么强大的 `Powershell` 在所有平台上都能用, 古老的 `bash` 可以退休了!

基于以上愿景, 微软开始了漫长而辉煌的征程.

GitHub 地址:[PowerShell](https://github.com/PowerShell/PowerShell)

这个 `GitHub` 链接里有目前 `Powershell` 的最新版, 我建议你从 `release` 里选个最新的 `preview` 版本.**经过测试, 这些预览版都相当稳定.**

## 4. 安装 Powershell 插件

这一步是整个过程的灵魂.

直接上代码: 打开刚装好的新版 powershell, 逐行输入命令.

```bash
# 1. 安装 PSReadline 包,该插件可以让命令行很好用,类似 zsh
Install-Module -Name PSReadLine -AllowPrerelease -Force

# 2. 安装 posh-git 包,让你的 git 更好用
Install-Module posh-git -Scope CurrentUser

# 3. 安装 oh-my-posh 包,让你的命令行更酷炫.优雅
Install-Module oh-my-posh -Scope CurrentUser
```

安装过程可能有点慢,**好像卡住了一样**, 但是请耐心等待几分钟. 另外, 可能需要挂代理才能下载. 安装. 这几个包的都不大, 所以如果迟迟装不上, 就基本上是网络问题.

后面两个包的**来源可能不受系统信任**, 不用管它, 如果让你选择是否信任, 直接输入 `Y` 即可.

## 5. 配置 Windows Terminal

[Windows Terminal Themes](https://windowsterminalthemes.dev)

这一项也是灵魂.

只有新款 `Powershell` 而没有 `Windows Terminal`, 好比吃肉不放盐.

简单点, 直接上配置代码, 遇到不懂的地方, 自己读注释. 记得将此设置默认配置 (代码已经给出).

```json
// 此文件最初由 Windows Terminal 1.8.1521.0 生成
// 它应该在新版本中仍然可用,但新版本可能有额外的
// 除非清除此文件,否则您将看不到的设置.帮助文本或更改
// 让我们为您生成一个新的.
// 要查看默认设置,请在单击"设置"按钮的同时按住"alt".
// 有关这些设置的文档,请参阅:https://aka.ms/terminal-documentation
{
  "$schema": "https://aka.ms/terminal-profiles-schema",
  //默认的配置就是我们的新 powershell(重要!!!)
  "defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
  // 您可以在此处添加更多全局应用程序设置.
  // 要了解有关全局设置的更多信息,请访问 https://aka.ms/terminal-global-settings
  // 如果启用,选择将自动复制到剪贴板.
  "copyOnSelect": false,
  // 如果启用,格式化的数据也会复制到剪贴板
  "copyFormatting": false,
  // 配置文件指定要执行的命令以及有关其外观和感觉的信息.
  // 它们中的每一个都将出现在"新标签"下拉列表中,
  // 并且可以使用 `wt.exe -p xxx` 从命令行调用
  // 要了解有关配置文件的更多信息,请访问 https://aka.ms/terminal-profile-settings
  "profiles": {
    "defaults": {
      // 在此处放置要应用于所有配置文件的设置.
      // 字体
      "fontFace": "Fira Code",
      "fontSize": 12,
      "historySize": 9001,
      "padding": "5, 5, 20, 25",
      "snapOnInput": true,
      "useAcrylic": true,
      "acrylicOpacity": 0.3,
      // 颜色
      "colorScheme": "Homebrew"
    },
    "list": [
      {
        // Powershell7 配置
        "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
        "hidden": false,
        "name": "PowerShell",
        // 注意:一定要写上 -nologo,否则开启 powershll 会有一段话输出,很讨厌!
        "commandline": "C:/Program Files/PowerShell/7/pwsh.exe -nologo",
        "source": "Windows.Terminal.PowershellCore",
        // 启动菜单一定要设置为 <.>,否则后面重要的一步将会无效!
        "startingDirectory": "."
      },
      {
        // 在此处对 cmd.exe 配置文件进行更改.
        "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
        "name": "命令提示符",
        "commandline": "cmd.exe",
        "hidden": false
      },
      {
        "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
        "hidden": false,
        "name": "Ubuntu",
        "source": "Windows.Terminal.Wsl"
      },
      {
        "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
        "hidden": false,
        "name": "Azure Cloud Shell",
        "source": "Windows.Terminal.Azure"
      }
    ]
  },
  // 向该数组添加自定义配色方案.
  // 要了解有关配色方案的更多信息,请访问 https://aka.ms/terminal-color-schemes
  "schemes": [
    {
      "name": "Homebrew",
      "black": "#000000",
      "red": "#FC5275",
      "green": "#00a600",
      "yellow": "#999900",
      "blue": "#6666e9",
      "purple": "#b200b2",
      "cyan": "#00a6b2",
      "white": "#bfbfbf",
      "brightBlack": "#666666",
      "brightRed": "#e50000",
      "brightGreen": "#00d900",
      "brightYellow": "#e5e500",
      "brightBlue": "#0000ff",
      "brightPurple": "#e500e5",
      "brightCyan": "#00e5e5",
      "brightWhite": "#e5e5e5",
      "background": "#0C0C0C",
      "foreground": "#00ff00"
    }
  ],
  // 向该数组添加自定义操作和键绑定.
  // 要从 defaults.json 取消绑定组合键,请将命令设置为"unbound".
  // 要了解有关操作和键绑定的更多信息,请访问 https://aka.ms/terminal-keybindings
  "actions": [
    // 复制和粘贴绑定到 defaults.json 中的 Ctrl+Shift+C 和 Ctrl+Shift+V.
    // 这两行另外将它们绑定到 Ctrl+C 和 Ctrl+V.
    // 要了解有关选择的更多信息,请访问 https://aka.ms/terminal-selection
    {
      "command": {
        "action": "copy",
        "singleLine": false
      },
      "keys": "ctrl+c"
    },
    {
      "command": "paste",
      "keys": "ctrl+v"
    },
    // 按Ctrl+Shift+F打开搜索框
    {
      "command": "find",
      "keys": "ctrl+shift+f"
    },
    // 按 Alt+Shift+D 打开一个新窗格.
    // - "split": "auto" 使此窗格以提供最大表面积的方向打开.
    // - "splitMode": "duplicate" 使新窗格使用聚焦窗格的配置文件.
    // 要了解有关窗格的更多信息,请访问 https://aka.ms/terminal-panes
    {
      "command": {
        "action": "splitPane",
        "split": "auto",
        "splitMode": "duplicate"
      },
      "keys": "alt+shift+d"
    }
  ]
}
```

需要懂点 json, 还**需要会配置 Windows Terminal**.

## 6. 添加右键菜单

这一步是**灵魂中的灵魂**.
[右键打开 Open in Windows Terminal(管理员)](https://zzjtnb.com/blog/details/yjdkopeninwindowsterminalgly)

## 7. 添加 Powershell 启动参数

在 powershell 中输入

```bash
notepad.exe $Profile
```

紧接着在弹出的页面中输入下面这一长串代码, 保存并关闭. 这个 Profile 配置文件与 .zshrc / .bashrc 文件一样, 都是控制启动前参数的.

```bash
#------------------------------- Import Modules BEGIN -------------------------------
# 引入 posh-git
Import-Module posh-git

# 引入 oh-my-posh
Import-Module oh-my-posh
#------------------------------- Import Modules END   -------------------------------

#-------------------------------  Set Hot-keys BEGIN  -------------------------------
# 设置 Tab 键补全
Set-PSReadlineKeyHandler -Key Tab -Function Complete

# 设置 Ctrl+d 为菜单补全和 Intellisense
Set-PSReadLineKeyHandler -Key "Tab" -Function MenuComplete

# 设置 Ctrl+d 为退出 PowerShell
Set-PSReadlineKeyHandler -Key "Ctrl+d" -Function ViExit

# 设置 Ctrl+z 为撤销
Set-PSReadLineKeyHandler -Key "Ctrl+z" -Function Undo

# 设置向上键为后向搜索历史记录
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward

# 设置向下键为前向搜索历史纪录
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward


#-------------------------------   Set Alias Begin    -------------------------------

# 查看目录 ls & ll
function ListDirectory {
    (Get-ChildItem).Name
    Write-Host("")
}
Set-Alias -Name ls -Value ListDirectory
Set-Alias -Name ll -Value Get-ChildItem
#-------------------------------    Set Alias END     -------------------------------
```

非常完美.

## 结束语

为什么不用 `WSL` 作为默认界面? 当然, 这也很好, 但是在某些编辑和交互控制上,**Powershell 才是 Windows 上的正主**,`WSL` 说白了, 就是个临时替代之用的. 对于老程序员, 当然是 "我全都要".

经过测试, 该做法**界面美观, 性能优异, 配置简单**, 值得大家使用. 在此强烈推荐!
