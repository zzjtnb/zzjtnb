---
title: VS Code 导出或导入用户配置脚本
category: VS Code
tags:
  - VS Code
cover: https://cdn.pixabay.com/photo/2023/11/14/14/59/mountains-8387889_1280.jpg
---


Windows 用户推荐使用 Git Bash

## 检查 code 命令是否可用

```bash
code -v
# 1.84.2
# 1a5daa3a0231a0fbba4f14db7ec463cf99d7768e
# x64
```

对于 `Windows` 用户，如果 `Code` 命令不可用
在系统环境变量`Path`添加`VS Code完整安装路径\bin`.

例如`D:\Program Files\Microsoft VS Code\bin`
添加好之后重新打开终端检查 `Code`命令

`Mac` 和 `Linux` 用户一般不会有这个问题

## 查看帮助

```bash
code -help
```

## 将扩展导出到 `shell` 文件

1. 导出

    ```bash
    code --list-extensions | sed -e 's/^/code --install-extension /' > my_vscode_extensions.sh
    ```

2. 查看你的扩展安装程序文件

    ```bash
    less my_vscode_extensions.sh
    ```

3. 也可以直接在`Bash`输入

    ```bash
    code --list-extensions | xargs -L 1 echo code --install-extension
    ```

## 安装您的扩展（可选）

```bash
bash my_vscode_extensions.sh
```

## 导出或导入

导出或导入内容：

1. 插件列表
2. 用户设置
3. 语言设置
4. 代码片段
5. UI 状态

## sdf

```shell
#!/bin/bash

# 定义一些函数来减少代码重复
check_file_exists() {
  if [ ! -f "$1" ]; then
    echo "文件未找到,请确认文件路径是否正确:$1"
    exit 1
  fi
}

copy_file() {
  local src=$1
  local dest=$2
  local message=$3
  local is_import=$4

  if [ -e "$dest" ] && [ "$is_import" = true ]; then
    read -p "$dest 已存在,是否替换?(默认为n): " replace
    if [[ $replace != "y" && $replace != "yes" ]]; then
      echo "$dest 已存在,已跳过."
      return
    fi
  fi

  if [ -d "$src" ]; then
    # 源文件是一个目录,使用-r选项
    if cp -r "$src" "$dest"; then
      echo "$message成功."
    else
      echo "$message失败."
      exit 1
    fi
  else
    # 源文件是一个文件
    if cp "$src" "$dest"; then
      echo "$message成功."
    else
      echo "$message失败."
      exit 1
    fi
  fi
}

# 判断操作系统
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  OS='Linux'
  CONFIG_PATH="$HOME/.config/Code/User"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  OS='Mac'
  CONFIG_PATH="$HOME/Library/Application Support/Code/User"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
  OS='Windows'
  CONFIG_PATH="$APPDATA/Code/User"
else
  echo "无法识别的操作系统类型: $OSTYPE"
  exit 1
fi

# 检查code命令是否存在
if ! command -v code &>/dev/null; then
  echo "VS Code命令 'code' 未找到,请确认你已经安装了VS Code并将其添加到了PATH中."
  exit 1
fi

# 检查用户设置文件是否存在
SETTINGS_PATH="$CONFIG_PATH/settings.json"
check_file_exists "$SETTINGS_PATH"

# 提示用户确认
echo "你的操作系统是:$OS"
echo "你的用户设置文件路径是:$SETTINGS_PATH"
echo "请选择操作:"
echo "1. 导出"
echo "2. 导入"
read -p "请输入你的选择(默认为1): " choice
if [[ $choice == "2" ]]; then
  operation="import_settings"
else
  operation="export_settings"
fi

# 创建导出目录
EXPORT_DIR="./vscode_settings_export"
mkdir -p $EXPORT_DIR

# 导出插件列表和用户设置
export_settings() {
  if code --list-extensions >"$EXPORT_DIR/extensions.txt"; then
    echo "插件列表导出成功."
  else
    echo "插件列表导出失败."
    exit 1
  fi

  copy_file "$SETTINGS_PATH" "$EXPORT_DIR/settings.json" "用户设置导出" false
  copy_file "$CONFIG_PATH/locale.json" "$EXPORT_DIR/locale.json" "语言设置导出" false
  copy_file "$CONFIG_PATH/snippets" "$EXPORT_DIR/snippets" "代码片段导出" false
  copy_file "$CONFIG_PATH/globalStorage/state.vscdb" "$EXPORT_DIR/state.vscdb" "UI状态导出" false
}

# 导入插件列表和用户设置
import_settings() {
  while read extension; do
    if ! code --install-extension $extension; then
      echo "插件安装失败: $extension"
    fi
  done <"$EXPORT_DIR/extensions.txt"

  copy_file "$EXPORT_DIR/settings.json" "$SETTINGS_PATH" "用户设置导入" true
  copy_file "$EXPORT_DIR/locale.json" "$CONFIG_PATH/locale.json" "语言设置导入" true
  copy_file "$EXPORT_DIR/snippets" "$CONFIG_PATH/snippets" "代码片段导入" true
  copy_file "$EXPORT_DIR/state.vscdb" "$CONFIG_PATH/globalStorage/state.vscdb" "UI状态导入" true
}

$operation
```
