---
title: Lua简易教程
category: Lua
tags:
  - Lua
cover: https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/03_Neovim_Lua_Plugins%402x.png
---

## 为什么要学 lua ？

* neovim/nvchad/... 支持 lua 写配置文件
* WezTerm 也是用 lua 写配置文件

用 lua 写配置，其实更多的是倾向于嵌入式编程，写配置用 json/toml/yaml/xml 等文件可能更加好一点

## 安装

以 linux 为例，windows 和 macOS 差不多 (也是使用 brew 安装，更加方便)

```bash
curl -R -O http://www.lua.org/ftp/lua-5.4.4.tar.gz
tar zxf lua-5.4.4.tar.gz
cd lua-5.4.4
make all test
sudo make install
which lua # 检查 lua 命令
```

## repl 环境和文件运行

* lua 的 repl 环境
* 在文件编写 .lua 文件，然后使用 lua 命令运

这里使用第二种 lua 文件运行，了解 lua 的模块化，从而能组成一个完整的程序

## 第一个 lua 程序

```lua
touch index.lua
nvim index.lua

print("hello world")

```

* 增加 shebang 开头注释不需要 lua 运行

```lua
#!/usr/local/bin/lua

print("hello world")

```

## 变量

* 全局变量（注意：没有声明）
* 本地变量（使用 local 声明）
* 函数声明变量 （使用 function 声明）
* 表中域 `t = {} t["k"] = "v"`
* 代码块中的变量 （代码使用 缩颈和关键字包含，没有 {} 包含）
* 变量赋值
  * 使用 `,` 分割变量 `x, y = y, x`

## lua 类型系统

没有类型标注，使用 type 判断类型

<table><thead><tr><th>类型</th><th>type</th><th>说明</th></tr></thead><tbody><tr><td>nil</td><td><code>type(nil) -&gt; nil</code></td><td>nil 表示空，相当于：false。 一个未定义的变量使用时是 nil</td></tr><tr><td>string</td><td><code>type("hello world") -&gt; string</code></td><td>字符串支持<code>单双</code>引号</td></tr><tr><td>boolean</td><td><code>type(false)</code> -&gt; boolean</td><td>false/true</td></tr><tr><td>number</td><td><code>3.14 * 2</code> -&gt; number</td><td>双精度实浮点型</td></tr><tr><td>function</td><td><code>type(print)</code> -&gt; function</td><td>Lua 或 C 函数</td></tr><tr><td>userdata</td><td><code>type(io.stdin)</code> -&gt; userdata</td><td>表示任意存储在变量中的 C 数据结构</td></tr><tr><td>thread</td><td><code>type(type)</code> -&gt; thread</td><td>表示执行的独立线路，用于执行协同程序</td></tr><tr><td>table</td><td><code>type({})</code> -&gt; table</td><td>"关联数组"（associative arrays</td></tr></tbody></table>

## 注释

* 单行注释： `--`
* 多行注释

```lua
--[[
  print("not work, commented")
--]]

```

## 字符串

* 块状字符串 `[[]]` 操作符
* 字符串拼接 `..` 操作符
* 字符串长度 `#"your string"` # 号操作符

字符串的隐式操作行为，就不在这里讨论了，或者有时间在补充。

[Lua 字串操作内置函数](http://www.lua.org/manual/5.4/manual.html#6.4)

## 函数与函数调用以及函数返回值

* 声明一个命名函数 `function end` 关键字

```lua
function fn_name(params)
  // your lua function code
end
fn_name("a")
```

* 声明一个匿名函数

匿名函数一般考虑作为另一个函数的参数

```lua
function fn_name(params,fn)
    -- your lua function code
end
fn_name("a", function(p)
    return a
 end
);
```

* lua 函数支持多值返回

## 循环

* while
* for
* repleat until

### for 循环语法

```lua
for var=exp1,exp2,exp3 do
    -- <执行体>
end

```

### 跳出循环

* break
* goto

### if then else 的

```lua
if (nil)
then
    -- your code
end

```

> Lua 中 false/nil 是假，0 是真（这一点与 javascript 是不一致）

## Lua 表达式

[Lua 5.4 表达式与操作符](http://www.lua.org/manual/5.4/manual.html#3.4) 与其他的语言大同小于

## 数组

* 本质是线性表
* 数组使用 `{member}` 包裹元素，使用 `[index]` 访问，与 javascript 有很大区别
* lua 数组索引从 1 开始
* 一维数组
* 二维数组
* 数组循环

## 迭代器

* for-in 迭代
  * ipairs 迭代函数
  * pairs

## 表

用于创建不同的数据数据类型，如上面已经提及的数组，还有字典类型等

### 表的 crud

* table.concat 拼接（增加）
* table.insert 插入（增加）
* table.remove 移除 （移除）
* table.sort 排序

## 模块与包

> 从 Lua 5.1 开始，Lua 加入了标准的模块管理机制， Lua 的就是一个 table

### 定义一个 模块

```lua
module = {} -- 定义一个module

return module -- 返回一个 module
```

### 给 module 添加变量

```lua
module = {} -- 定义一个module

module.ct = "this is a constant"

-- 共有函数， 没有 pub 之类的关键偶
function module.fn()
    -- your fn body
end
-- 私有函数
local function module.fnp()
    -- your private fn body
end
-- 在共有函数中，调用私有函数
function module.func3()\
    func2()\
end

return module -- 返回一个 module
```

模块是编程核心，更好的组织代码，也是能看懂被人组织代码的基础

## 导入模块

```lua
require("<module_name>") -- 有括号包裹
require "<module_name>" -- 没有括号包裹
local m = require("<module_name>") -- 定义别名
```

## 错误处理

* 语法错误
* 运行错误
* 处理错误
  * 断言函数 assert
  * 抛出错误函数 error
  * pcall(protected call) 函数
  * xpcall 函
  * debug 错误库
    * debug.debug
    * debug.traceback

## Lua 垃圾回收

Lua 采用了自动内存管理。 这意味着你不用操心新创建的对象需要的内存如何分配出来， 也不用考虑在对象不再被使用后怎样释放它们所占用的内存。

## nvchad 配置 nvim

[NvChad](https://github.com/NvChad/NvChad)

### 加载 lua 文件

* nvim 首先读取 [init.lua](https://github.com/NvChad/NvChad/blob/main/init.lua) 文件
* 然后使用 packer 管理 nvim 插件

## 前端友好的 Lua

由于 lua 是弱类型语言，并且在生产环境也出过一些知名的问题。但对于前端而言其实更多是如何写编辑器之类配置文件，并用于追求稳定生产环境。前端友好的 Lua 起就是，给 Lua 提供类型约束，或者使用其他编译等等。

[TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua) TypeScript 类型约束来编译生成 lua 项目可以了解一下

## wexterm 配置文件

>WezTerm 是一个 GPU 加速的跨平台终端

### 安装

[在 Windows 上安装](https://wezfurlong.org/wezterm/install/windows.html)

![202211221304469](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/202211221304469.png)

### 配置文件

```bash
md ~/.config/wexterm/wexterm.lua
```

* 默认使用 bash 打开

```lua
local wezterm = require "wezterm"

local LEFT_ARROW = utf8.char(0xff0b3)
local SOLID_LEFT_ARROW = utf8.char(0xff0b2)
local SOLID_RIGHT_ARROW = utf8.char(0xff0b0)
local scrollback_lines = 200000;

local COLORS = {
  "#3c1361",
  "#52307c",
  "#663a82",
  "#7c5295",
  "#b491c8"
}

local launch_menu = {}

if wezterm.target_triple == "x86_64-pc-windows-msvc" then
  ssh_cmd = { "powershell.exe" }

  table.insert(
    launch_menu,
    {
      label = "PowerShell",
      args = { "powershell.exe", "-NoLogo" }
    }
  )

  table.insert(
    launch_menu,
    {
      label = "Bash",
      args = { "C:/Program Files/Git/bin/bash.exe", "-li" }
    }
  )

  table.insert(
    launch_menu,
    {
      label = "CMD",
      args = { "cmd.exe" }
    }
  )


end

function recompute_padding(window)
  local window_dims = window:get_dimensions()
  local overrides = window:get_config_overrides() or {}
  if not window_dims.is_full_screen then
    if not overrides.window_padding then
      return
    end
    overrides.window_padding = nil
  else
    local third = math.floor(window_dims.pixel_width / 3)
    local new_padding = {
      left = third,
      right = third,
      top = 0,
      bottom = 0
    }
    if overrides.window_padding and new_padding.left == overrides.window_padding.left then
      return
    end
    overrides.window_padding = new_padding
  end
  window:set_config_overrides(overrides)
end

wezterm.on(
  "window-config-reloaded",
  function(window)
    recompute_padding(window)
  end
)

wezterm.on(
  "trigger-nvim-with-scrollback",
  function(window, pane)
    local scrollback = pane:get_lines_as_text(scrollback_lines)
    local name = os.tmpname()
    local f = io.open(name, "w+")
    f:write(scrollback)
    f:flush()
    f:close()
    window:perform_action(wezterm.action { SpawnCommandInNewTab = { args = { "nvim", name } } }, pane)

    wezterm.sleep_ms(1000)
    os.remove(name)
  end
)

wezterm.on(
  "window-resized",
  function(window, pane)
    recompute_padding(window)
  end
)

wezterm.on(
  "open-uri",
  function(window, pane, uri)
    local start, match_end = uri:find("file://")
    if start == 1 then
      local file = uri:sub(match_end + 1)
      window:perform_action(
        wezterm.action { SpawnCommandInNewWindow = { args = { "nu", "-c", "nvim " .. file } } },
        pane
      )
      return false
    end
  end
)


wezterm.on(
  "toggle-opacity",
  function(window, pane)
    local overrides = window:get_config_overrides() or {}
    if not overrides.window_background_opacity then
      overrides.window_background_opacity = 0.5
    else
      overrides.window_background_opacity = nil
    end
    window:set_config_overrides(overrides)
  end
)

local mouse_bindings = {
  -- 右键粘贴
  {
    event = { Down = { streak = 1, button = "Right" } },
    mods = "NONE",
    action = wezterm.action { PasteFrom = "Clipboard" }
  },
  -- Change the default click behavior so that it only selects
  -- text and doesn't open hyperlinks
  {
    event = { Up = { streak = 1, button = "Left" } },
    mods = "NONE",
    action = wezterm.action { CompleteSelection = "PrimarySelection" }
  },
  -- and make CTRL-Click open hyperlinks
  {
    event = { Up = { streak = 1, button = "Left" } },
    mods = "CTRL",
    action = "OpenLinkAtMouseCursor"
  }
}


function font_with_fallback(name, params)
  -- local names = { name, "Hack" }
  local names = { "CaskaydiaCove Nerd Font Mono", "CaskaydiaCove Nerd Font Mono" }
  return wezterm.font_with_fallback(names, params)
end

wezterm.on(
  "toggle-ligature",
  function(window, pane)
    local overrides = window:get_config_overrides() or {}
    if not overrides.font then
      overrides.font = font_with_fallback("Hack", {})
      overrides.font_rules = {
        {
          italic = false,
          intensity = "Normal",
          font = font_with_fallback("Hack", {})
        },
        {
          italic = false,
          intensity = "Bold",
          font = font_with_fallback("Hack", {})
        },
        {
          italic = true,
          intensity = "Normal",
          font = font_with_fallback("Hack", {})
        },
        {
          italic = true,
          intensity = "Bold",
          font = font_with_fallback("Hack", {})
        }
      }
    else
      overrides.font = nil
      overrides.font_rules = nil
      overrides.font_antialias = nil
    end
    window:set_config_overrides(overrides)
  end
)


local default_prog = { "C:/Program Files/Git/bin/bash.exe" }

return {
  window_decorations           = "RESIZE",
  native_macos_fullscreen_mode = true,
  tab_max_width                = 16,
  enable_scroll_bar            = true,
  initial_rows                 = 20,
  initial_cols                 = 80,
  window_background_opacity    = 0.85,
  window_padding               = {
    left = 5,
    right = 5,
    top = 5,
    bottom = 5
  },
  text_background_opacity      = 1,

  exit_behavior                              = "Close",
  font_size                                  = 11,
  font                                       = font_with_fallback("Hack", {}),
  font_rules                                 = {
    {
      italic = false,
      intensity = "Normal",
      font = font_with_fallback("Hack", {})
    },
    {
      italic = false,
      intensity = "Bold",
      font = font_with_fallback("Hack", {})
    },
    {
      italic = true,
      intensity = "Normal",
      font = font_with_fallback("Hack", {})
    },
    {
      italic = true,
      intensity = "Bold",
      font = font_with_fallback("Hack", {})
    }
  },
  colors                                     = {
    tab_bar = {
      background = "#0b0022",
      active_tab = {
        bg_color = "#3c1361",
        fg_color = "#c0c0c0",
        intensity = "Normal"
      },
      inactive_tab = {
        bg_color = "#1b1032",
        fg_color = "#808080",
      },
      inactive_tab_hover = {
        bg_color = "#3b3052",
        fg_color = "#909090"
      }
    }

  },
  tab_bar_style                              = {
    active_tab_left = wezterm.format(
      {
        { Background = { Color = "#0b0022" } },
        { Foreground = { Color = "#3c1361" } },
        { Text = SOLID_LEFT_ARROW }
      }
    ),
    active_tab_right = wezterm.format(
      {
        { Background = { Color = "#0b0022" } },
        { Foreground = { Color = "#3c1361" } },
        { Text = SOLID_RIGHT_ARROW }
      }
    ),
    inactive_tab_left = wezterm.format(
      {
        { Background = { Color = "#0b0022" } },
        { Foreground = { Color = "#1b1032" } },
        { Text = SOLID_LEFT_ARROW }
      }
    ),
    inactive_tab_right = wezterm.format(
      {
        { Background = { Color = "#0b0022" } },
        { Foreground = { Color = "#1b1032" } },
        { Text = SOLID_RIGHT_ARROW }
      }
    )
  },
  window_close_confirmation                  = "NeverPrompt",
  window_background_image_hsb                = {
    brightness = 0.8,
    hue = 1.0,
    saturation = 1.0
  },
  inactive_pane_hsb                          = {
    brightness = 0.8,
    hue = 1.0,
    saturation = 0.8
  },
  launch_menu                                = launch_menu,
  check_for_updates                          = false,
  enable_tab_bar                             = true,
  show_tab_index_in_tab_bar                  = true,
  adjust_window_size_when_changing_font_size = false,
  mouse_bindings                             = mouse_bindings,
  default_prog                               = default_prog,
  unix_domains = {
    {
      name = 'wsl',
      serve_command = { 'wsl', 'wezterm-mux-server', '--daemonize' },
    },
  },
  -- default_gui_startup_args = { 'connect', 'wsl' },
}

```

## 小结

* 了解 lua 基本语法与模块机制
* 为 nvim/nvchad 使用 lua 写配置文件准备
* 为 wezterm 跨平台 使用 lua 写配置文件
* 后面具体在 windows/linux/macOS 实际使用体验后写一篇关于 wezterm 的文章
* 配置文件对 lua 的要求对别低，采用编程的方式写配置文件，灵活度极高

## 参考

* [Lua 5.4 Reference Manual - contents](http://www.lua.org/manual/5.4/)
* [Lua 5.3 参考手册 (runoob.com)](https://www.runoob.com/manual/lua53doc/)
* 《Lua 程序设计》
