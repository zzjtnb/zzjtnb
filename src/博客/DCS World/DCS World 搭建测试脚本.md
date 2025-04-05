---
title: DCS World 搭建测试脚本
category: DCS World
tags:
  - DCS World
  - Lua
cover: https://cdn.pixabay.com/photo/2012/09/17/21/24/fantasy-57073_960_720.png
---

## 客户端环境

打开**游戏界面**选择**任务编辑器**, 之后新建一个任务, 然后游戏左边菜单点击**设置触发器规则**用来创建两条触发器规则

触发器包含三个选项: **触发 ->条件 ->动作**

### 1. 设置第一条触发器

- 新建触发

```bash
类型: 当条件改变(3)
名称: loadfile(可以不填)
```

- 新建条件

```bash
类型: 旗标值等于
旗标: 1
值: 1
```

- 新建动作

>新建动作 1

```bash
动作: 执行脚本
文本: assert(loadfile("C:\\Users\\\Administrator\\Desktop\\DCS World\\test.lua"))()
```

>新建动作 2

```bash
动作: 设置旗标值
旗标: 1
值: 0
```

### 2. 设置第二条触发器

- 新建触发

```bash
类型: 仅一次(1)
名称: add target(可以不填)
事件: 无事件
```

- 新建条件

```bash
空,不用设置
```

- 新建动作

```bash
动作: 添加无线电内容
名称: 测试脚本(随便命名)
旗标: 1
值: 1
```

>以上完整的触发器流程:
>
>1. 当条件 旗标 1 的值改变后执行动作执行脚本, 然后设置旗标值为 0
>2. 添加 F10 菜单, 点击改菜单选项的时候设置旗标 1 的值等 1, 这时候满足第一个触发器的条件将会重新加载脚本

### 用脚本实现上述步骤

`游戏安装目录/Scripts/MissionScripting.lua`
原始:

```lua
--Initialization script for the Mission lua Environment (SSE)

dofile('Scripts/ScriptingSystem.lua')

--Sanitize Mission Scripting environment
--This makes unavailable some unsecure functions.
--Mission downloaded from server to client may contain potentialy harmful lua code that may use these functions.
--You can remove the code below and make availble these functions at your own risk.

local function sanitizeModule(name)
 _G[name] = nil
 package.loaded[name] = nil
end

do
 sanitizeModule('os')
 sanitizeModule('io')
 sanitizeModule('lfs')
 _G['require'] = nil
 _G['loadlib'] = nil
 _G['package'] = nil
end
```

添加下列代码

```lua
--Initialization script for the Mission lua Environment (SSE)

dofile('Scripts/ScriptingSystem.lua')

--Sanitize Mission Scripting environment
--This makes unavailable some unsecure functions.
--Mission downloaded from server to client may contain potentialy harmful lua code that may use these functions.
--You can remove the code below and make availble these functions at your own risk.

local function sanitizeModule(name)
 _G[name] = nil
 package.loaded[name] = nil
end

do
 sanitizeModule('os')
 sanitizeModule('io')
 sanitizeModule('lfs')
 _G['require'] = nil
 _G['loadlib'] = nil
 _G['package'] = nil
end
--从在这里开始
DebugLua = {}
DebugLua.path = 'F:\\Office\\GitHub\\DCS_World_Debugger\\test\\test.lua'
function DebugLua.Load()
  local status, error =
    pcall(
    function()
      dofile(DebugLua.path)
    end
  )
  if (not status) then
    trigger.action.outText('脚本加载错误->%s' .. tostring(error), 10)
  else
    trigger.action.outText('脚本加载成功-->' .. tostring(DebugLua.path), 10)
  end
end
missionCommands.addCommand('加载脚本', DebugLua.loadScript, DebugLua.Load)
```

这样所有的任务都会自带 F10 菜单

## 服务端环境

### 1. 创建代码

```lua

LoadLua = {}
LoadLua.callbacks = {}
-- 按空格分割字符串转换 table
---@param str string 需要处理的字符串
---@return string 处理后的字符串 ' hello world ' -> '{[1]="hello",[2]="world"}'
LoadLua.split_by_space = function(str)
  if str == nil then
    return
  end
  str = string.format('%s', str:match('^%s*(.-)%s*$'))
  local arr = {}
  for w in string.gmatch(str, '%S+') do
    table.insert(arr, w)
  end
  return arr
end
-------------------------------- 定义 Debugger 的 callbacks --------------------------------
function LoadLua.callbacks.onPlayerTrySendChat(playerID, msg, all)
  local val = LoadLua.split_by_space(msg)
  if val[1] == 'debug' then
    if not val[2] then
      return net.send_chat_to('请输入文件路径...', playerID)
    end
    local status, error =
      pcall(
      function()
        dofile(val[2])
      end
    )
    if (not status) then
      local result = string.format('脚本加载失败: %s', error)
      net.log(result)
    else
      net.log('脚本加载完成')
    end
  end
end
DCS.setUserCallbacks(LoadLua.callbacks)

```

把上面的代码存放到下面的位置
>C:/Users/Administrator/Saved Games/DCS.openbeta/Scripts/Hooks/debug.lua

打开游戏服务端
聊天框输入`debug path`

### 2. 示例

```bash

debug C:\\Users\\Administrator\\Desktop\\DCS\\test.lua

```

然后在 test.lua 里面输入你想调试的内容

>test.lua

```lua

net.dostring_in('server', 'trigger.action.outText("加载成功 -->server", 10, false)')

```

游戏界面会提示`加载成功-->server`
