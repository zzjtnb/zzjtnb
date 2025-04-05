---
title: VS Code Debug 调试
category: 前端
tags:
  - VS Code
cover: https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_1280.jpg
---

## 配置

以下是一个示例的 Chrome 调试配置文件 (`launch.json`) 的内容:

```json
{
  // 使用 IntelliSense 了解相关属性.
  // 悬停以查看现有属性的描述.
  // 欲了解更多信息,请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome: 附加",
      "type": "chrome",
      "request": "attach",
      "port": 9222,
      "url": "http://localhost:5500",
      "webRoot": "${workspaceRoot}"
    },
  ]
}
```

在这个配置文件中, 有几个关键的选项:

1. "name": 配置的名称, 用于在 VS Code 中标识该配置.
2. "type": 调试器的类型. 对于 Chrome 的调试, 这个值应该是"chrome".
3. "request": 调试请求类型
    - "launch": 表示启动一个新的实例来进行调试.
    - "attach": 表示连接到已经运行的 Chrome 实例进行调试
4. "port": 调试器连接的 Chrome 调试端口. 默认情况下,Chrome 调试器使用 9222 作为默认端口. 你可以根据需要将该值修改为你所需的端口号.
5. "url": 要调试的网页或应用程序的 URL.
    - 在"attach"模式下, 该 URL 是可选的, 并且可以不填. 如果不指定 URL, 调试器将连接到已经运行的 Chrome 实例, 并等待你手动导航到要调试的网页或应用程序
    - 在"launch"模式下,"url"选项是必需的, 因为它指定了要在启动调试时自动打开的网页或应用程序的 URL. 如果在"launch"模式下没有指定"url"选项, 将无法启动调试
6. "webRoot": 工作目录的根路径. 这个值通常是 `${workspaceFolder}`, 表示当前打开的工作区文件夹的根路径.

根据你的具体需求, 你可以根据这个示例进行调试配置的自定义. 例如, 你可以更改调试的 URL, 工作目录, 或者添加其他调试选项, 以满足你的调试需求.

根据选择的调试模式, 你需要相应地设置"request"和"url"选项. `在"attach"模式下,"url"是可选的, 而在"launch"模式下,"url"是必需的.`

## 一. 附加调试 (attach)

在 VS Code 中,"附加调试"是一种调试模式, 用于将调试器连接到已运行的应用程序或进程, 以便在 VS Code 中进行调试. 它通常用于调试远程服务器, 浏览器或其他外部进程.

附加调试需要与目标应用程序或进程建立连接, 并将调试器附加到该进程上. 这样, 调试器就可以监视并控制目标进程的执行, 并提供调试工具和功能, 以帮助你在 VS Code 中进行调试.

在使用"附加调试"之前, 你需要确保目标应用程序或进程已经在运行, 并且已启用了调试支持. 然后, 你可以通过创建适当的调试配置文件 (例如 `launch.json`) 来配置附加调试, 并指定目标应用程序或进程的调试端口或其他相关信息. 接下来, 你可以在 VS Code 中启动附加调试配置, 它将尝试连接到目标应用程序或进程, 并开始调试过程.

请注意, 附加调试的具体配置和步骤可能因具体的目标应用程序或进程而异. 你需要根据目标应用程序或进程的要求和调试器的支持来进行适当的配置.

### Mac

#### 1. Mac 命令行

在 Mac 上, 使用双击 Chrome 图标打开的浏览器默认不会启动调试端口. 要启用调试端口, 你需要通过命令行运行 Chrome 浏览器并指定调试端口.

请按照以下步骤操作:

1. 打开终端应用程序 (Terminal).
2. 在终端中运行以下命令, 启动 Chrome 浏览器并指定调试端口:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

这将启动 Chrome 浏览器并将调试端口设置为 `9222`.
3. 确保 Chrome 浏览器已成功启动, 并且在浏览器地址栏中输入 <http://localhost:9222>. 你应该能够看到一个调试目标列表.

4. 然后, 你可以使用 VS Code 的 `launch.json` 配置中的相同端口号和 URL 进行调试.

请注意, 每次启动 Chrome 浏览器时, 你都需要使用命令行指定调试端口. 如果你需要频繁地进行调试, 你可以将上述命令添加到一个脚本文件中, 以便更方便地启动 Chrome 浏览器和调试端口.

#### 2. Mac 启动脚本

以下是一个简单的 Shell 脚本, 用于在 Mac 上启动 Chrome 浏览器并指定调试端口:

```shell
#!/bin/bash

# 设置调试端口
debug_port=9222

# 检查Chrome是否已经运行
if pgrep -x "Google Chrome" >/dev/null; then
  echo "Chrome is already running. Please close any existing Chrome instances before running this script."
  exit 1
fi

# 启动Chrome并指定调试端口
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=$debug_port &

echo "Chrome started with debugging enabled on port $debug_port."
```

使用文本编辑器创建一个新文件, 将以上代码复制并粘贴到文件中, 然后将文件保存为 `start_chrome_debug.sh` 或其他你喜欢的名称. 接下来, 通过终端运行该脚本:

```bash
bash start_chrome_debug.sh
```

这将启动 Chrome 浏览器并指定调试端口为 `9222`. 每次你需要启动 Chrome 进行调试时, 只需运行该脚本即可.

### Window

#### 1. 启动脚本

在 Windows 上, 你可以使用以下的批处理脚本来启动 Chrome 浏览器并指定调试端口:

```bash
@echo off

REM 设置调试端口
set debug_port=9222

REM 检查Chrome是否已经运行
tasklist /FI "IMAGENAME eq chrome.exe" 2>NUL | find /I /N "chrome.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo Chrome is already running. Please close any existing Chrome instances before running this script.
    exit /b 1
)

REM 启动Chrome并指定调试端口
start chrome.exe --remote-debugging-port=%debug_port%

echo Chrome started with debugging enabled on port %debug_port%.
```

使用文本编辑器创建一个新文件, 将以上代码复制并粘贴到文件中, 然后将文件保存为 `start_chrome_debug.bat` 或其他你喜欢的名称. 接下来, 通过命令提示符运行该批处理脚本:

```bash
start_chrome_debug.bat
```

这将启动 Chrome 浏览器并指定调试端口为 `9222`. 每次你需要启动 Chrome 进行调试时, 只需运行该批处理脚本即可.

**注意:**
如果直接执行 chrome.exe, 可能会因为系统环境变量配置的问题而找不到 Chrome 浏览器的可执行文件. 为了解决这个问题, 你可以尝试以下两种方法之一:

1. 使用完整的 Chrome 浏览器安装路径: 你可以在脚本中指定完整的 Chrome 浏览器安装路径. 例如, 假设 Chrome 浏览器安装在 `C:\Program Files\Google\Chrome\Application\chrome.exe`, 你可以将脚本中的 `start chrome.exe` 行修改为:

```bash
start "Chrome" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=%debug_port%
```

2. 添加 Chrome 浏览器安装路径到系统环境变量: 你可以将 Chrome 浏览器的安装路径添加到系统环境变量中, 这样你就可以直接使用 `chrome.exe` 命令来启动 Chrome 浏览器. 以下是添加环境变量的步骤:

- 在 Windows 搜索栏中, 输入"环境变量", 并选择"编辑系统环境变量".
- 在系统属性对话框中, 点击"环境变量"按钮.
- 在"系统变量"部分, 找到名为"Path"的变量, 并点击"编辑"按钮.
- 在编辑环境变量对话框中, 点击"新建"按钮, 并添加 Chrome 浏览器的安装路径 (例如:`C:\Program Files\Google\Chrome\Application`).
- 点击"确定"保存更改.
- 现在你应该能够直接在命令提示符中执行 `chrome.exe` 命令来启动 Chrome 浏览器了.
无论你选择哪种方法, 确保你的 Chrome 浏览器安装路径正确, 并能够在脚本中正确启动 Chrome 浏览器.

#### 2. 快捷方式

如果你使用的是 Chrome 浏览器的快捷方式来启动浏览器, 可以尝试以下方法来启动带有调试端口的 Chrome 浏览器:

1. 找到你的 Chrome 浏览器的快捷方式, 右键点击它, 然后选择"属性".
2. 在属性窗口的"快捷方式"选项卡中, 找到"目标"字段. 它将显示 Chrome 浏览器的可执行文件的完整路径.
3. 在目标字段的末尾添加 `--remote-debugging-port=9222`, 并确保在添加参数时空格分隔. 例如, 如果目标字段原本是"`C:\Program Files\Google\Chrome\Application\chrome.exe`", 则修改后的目标字段将是`"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222`.
4. 点击"应用"或"确定"保存更改.
5. 双击该快捷方式, 它将以带有调试端口的方式启动 Chrome 浏览器.
现在, 你可以在 VS Code 的 `launch.json` 配置中使用相同的调试端口和 URL 进行调试.

## 二. 启动调试 (launch)

在 VS Code 中,"启动调试"是一种功能, 用于启动和执行调试配置, 以便在 IDE 中进行代码调试. 通过启动调试, 你可以将调试器连接到正在运行的应用程序或进程, 并使用调试工具和功能来检查代码的执行过程, 监视变量的值, 设置断点等.

在 VS Code 中, 启动调试的步骤如下:

创建调试配置文件: 首先, 你需要创建一个调试配置文件, 以告诉 VS Code 如何启动和配置调试器. 调试配置文件通常是一个名为 `launch.json` 的文件, 位于你的项目中的.vscode 文件夹中. 你可以手动创建该文件, 或者使用 VS Code 的调试功能自动生成.

配置调试器: 在调试配置文件中, 你需要指定要调试的应用程序或进程的类型, 执行命令, 工作目录, 调试参数等信息. 这取决于你要调试的具体语言, 框架和工具.

选择调试配置: 在 VS Code 的侧边栏中, 点击调试图标 (通常是一个虫子的图标), 然后在顶部的调试工具栏中选择你要使用的调试配置. 如果你有多个调试配置文件, 可以在下拉菜单中选择一个.

启动调试: 点击调试工具栏中的启动按钮, 或者使用快捷键 (通常是 F5) 来启动调试.VS Code 将根据你选择的调试配置来启动应用程序或进程, 并将调试器连接到它.

一旦启动调试, 你就可以使用调试工具栏上的按钮来控制调试过程, 例如设置断点, 单步执行, 监视变量等. 你还可以在调试控制台中查看输出和日志.

通过启动调试, 你可以在 VS Code 中获得强大的调试功能, 以便更轻松地诊断和修复代码中的问题.

## 三. 两者区别

"启动调试"和"附加调试"是两种不同的调试模式, 它们之间有以下区别:

1. 启动调试: 启动调试是在应用程序开始执行之前启动调试器, 并将调试器连接到正在运行的应用程序或进程. 在启动调试模式下, 调试器能够监视并控制整个应用程序的执行, 包括应用程序的启动和初始化阶段. 启动调试通常用于调试本地应用程序或进程.

2. 附加调试: 附加调试是在应用程序已经在运行时将调试器连接到它. 在附加调试模式下, 调试器会连接到目标应用程序或进程, 并监视其执行状态. 附加调试模式通常用于调试远程应用程序, 浏览器, 移动设备或其他外部进程. 你需要确保目标应用程序或进程已启动, 并已启用了调试支持.

总的来说, 启动调试适用于在应用程序开始执行之前启动调试器, 而附加调试适用于将调试器连接到已经在运行的应用程序或进程. 选择何种调试模式取决于你要调试的具体情况和需求.
