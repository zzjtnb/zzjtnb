---
title: DCS World开发手册
category: DCS World
tags:
  - DCS World
  - Lua
cover: https://cdn.pixabay.com/photo/2020/04/03/21/35/spring-5000242_960_720.jpg
---

## 一、ED 官方接口手册

+ DCS server gameGUI
[https://wiki.hoggitworld.com/view/DCS_server_gameGUI](https://wiki.hoggitworld.com/view/DCS_server_gameGUI)
+ DCS export
[https://wiki.hoggitworld.com/view/DCS_export](https://wiki.hoggitworld.com/view/DCS_export)
+ 模拟器脚本引擎文档
[https://wiki.hoggitworld.com/view/Simulator_Scripting_Engine_Documentation](https://wiki.hoggitworld.com/view/Simulator_Scripting_Engine_Documentation)
+ Mission Scripting
[https://wiki.hoggitworld.com/view/Category:Functions](https://wiki.hoggitworld.com/view/Category:Functions)

常用函数:

+ 1.DCS func getByName()
使用范例:

```lua
local myGroup = Group.getByName("name")
local myUnit = Unit.getByName("name")
local myObject = StaticObject.getByName("name")
```

+ 2.DCS func getPoint()
使用范例:

```lua
local myPoint = unit:getPoint()
--或者
local myPoint = Unit.getPoint(unit)
```

+ 3.DCS func destroy()
使用范例:

```lua
local myGroup = Group.getByName('tanks')
Group.destroy(myGroup)
--或者
local myGroup = Group.getByName('tanks')
myGroup:destroy()
```

## 二、第三方函数库 (mist)

常用函数:

+ 1.mist.respawnGroup()
使用范例:

```lua
local newGroup = mist.respawnGroup("oldGroupName", true)
local newGroupName = newGroup.name
```

+ 2.mist.teleportToPoint()
使用范例:

```lua
local vars = {}
local myUnit = Unit.getByName("anotherUnit")
vars.gpName = "gpName"
vars.action = "tele"
vars.point = myUnit:getPoint()
myUnit:destroy()
local teleGroup = mist.teleportToPoint(vars)
local teleGroupName = teleGroup.name
mist.cloneGroup('myGroup')
```

## Lua 环境问题

![stats-architecture](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/stats-architecture.png)

我的 hook 在 Server Control Environment (Saved Games/DCS/Scripts/Hooks/statsexport.lua) 中运行。

我发现在 Mission Environment ("Manager") 中我可以通过 a_do_script 在 Mission Environment ("Real") 中执行代码。我可以在那里访问所有 Mission API。

在我禁用 `DCS_ROOT/Scripts/MissionScripting.lua` 中的 `Mission Environment sanitizing` 后,我现在也可以通过 UDP 在那里导出所有必要的数据。

### Scripts 和 Hooks 的区别

scripts 文件夹本身是用来放脚本的, 相当于专门脚本的地方, 写脚本的时候可以直接导入这个路径就不需要你去写绝对路径找脚本.
Hooks 是勾在 ED 定义的一些事件上的, 这些事件主要在网络环境里.
Hooks 里的脚本都需要作为 DCS 事件的回调, 比如玩家尝试连接, 玩家尝试断开等等

>任务环境 (mission) 里就是在本地吧, 不是服务器中? 比如快速开始, 自己建个 miz 运行

+ mission 环境就是 DCS 客户端或者服务器当前运行的任务<br>
Hooks 下直接使用 loadstring 就是 lua 原生的, 进 mission 才用 net.dostring_in.<br>
net.dostring_in 直接把字符串发给任务环境, 然后任务环境里自己调用 loadstring, 也是就是说在 Hooks 下 loadstring(需要执行 dcs 的 lua 脚本) 这个方法就直接运行代码了,scripts 下的 export.lua 才用 net.dostring_in.

+ scripts 就只是覆盖那个游戏安装目录里的 scripts 文件夹
下的 Export.lua 其实在 Hooks 里也可以接入, 就用 Export 这个表 (table)<br>
只有需要在任务环境里运行才用 net.dostring_in('server', '')
我不知道那个'mission'里有什么, 很可能是 miz 文件, 拆开那个 mission 文件本身.

+ 我一般自己是这么分的 mission|Hooks|export
这三个环境完全独立, 但是 Hooks 可以控制 expor, 然后 export.lua 主要控制 export.
比如你如果在编辑器里写 lua 脚本到 mission 里运行,
如果你在 Hooks 里用 net.dostring_in 去调用你在编辑器里加的脚本定义的变量什么的会发现不存在, 虽然都可以接到 mission 但实际上处于不同的 state, 最理想的方法自然是 Hooks 直接 dostring_in 去控制任务，不然每个任务里还要单独放个服务器.

+ Hooks 有一些 Export 的函数是用不了的, 这个要单独写在 Export.
+ Scripts 这个文件夹就只是个文件夹，dcs 默认会把他加到 path 里, 如果这里面没有某个 lua, 它会到其他路经去找, 比如 bin.
然后现在还有个 state 叫 webgui.lua, 那个完全不懂.srs 的开发说他们在 ed 的指点下把 Export.lua 里的逻辑圈移过去了避免和其他插件冲突.

+ server?DCS.isServer()?
这个 server 是进任务环境的
任务环境没有 DCS 这个表

+ net.dostring_in() 这个函数, 入参是普通的 string, 返回一个 string. 返回的 string 你可以把一个 table 转成 json 返回出来, 但没法直接返回一个 table.
但是 lua 原生的 loadstring 没这个限制, 所以 hook 和 export 里可以直接返回 table

## Lua API

### Lua File System (lfs) API

### lfs.currentdir() -> string

+ 返回 DCS 安装文件夹的路径

### lfs.writedir() -> string

+ 返回当前'Saved Games\DCS' 文件夹的路径。

### lfs.tempdir() -> string

+ 返回 DCS Temp 文件夹 (AppData\Local\Temp\DCS) 的拍号。

### lfs.mkdir(dirname)

+ 新建目录

### lfs.rmdir(dirname)

+ 删除目录

### dofile

```lua
dofile(lfs.writedir() .. [[Scripts\Net\stats.lua]])
```

载入文件并执行代码块，对于相同的文件每次都会执行

### 更改服务器管理员昵称

```lua
--[[
问题：服务器的玩家名字只是"PILOT_"，不能改变
提示：创建服务器个人文件夹文件夹中的脚本：保存的游戏\％DCS_Dedicated_Server％\脚本,并在该文件夹中的文件创建dedicatedServer.lua文本：
--]]
net.set_name('your desired server player name')
local res = net.start_server(serverSettings)
if res ~= 0 then
  log.write('Dedicated Server', log.DEBUG, 'Failed to start server with code: ', res)
end
```

### Table 和 JSON 互转

```lua
--[[
mission加载json(游戏安装目录\\Scripts\\MissionScripting.lua)
--]]
local JSON = loadfile('Scripts\\JSON.lua')() --不能使用local JSON = require('JSON')
local tb = {name = '张三', age = 20}
local tableToString = JSON:encode(tb) --转字符串
env.info(tableToString)
local stringToTable = JSON:decode(tableToString)
env.info(JSON:decode(tableToString)) --转json
env.info(stringToTable)

--[[
Server环境加载json(保存的游戏\\Scripts\\Hooks\\test.lua)
--]]
local JSON = require('JSON') --也可以使用loadfile的方式
local res = {}
res.name = {}
res.id = {}
for i, tb in pairs(world.getAirbases()) do
  res.id[i] = Object.getName(tb)
  res.name[i] = tb:getName()
end
return JSON:encode(res)
```

### LuaSocket

```lua
package.path = package.path .. ";.\\LuaSocket\\?.lua"
package.cpath = package.cpath .. ";.\\LuaSocket\\?.dll"
local socket = require("socket")
```

### 其他

+ 获取阵营群组信息

```lua
--net.dostring_in('server')
local JSON = require('JSON')
local res = {}
res.id = {}
res.name = {}
res.units = {}
for i, gp in pairs(coalition.getGroups(1)) do
  res.id[i] = Group.getID(gp)
  res.name[i] = Group.getName(gp)
  res.units[i] = Group.getByName(res.name[i])
  -- res.units[i] = gp:getUnits()
  --Group.getByName(res.name[i])就等于gp
  env.info('测试:' .. JSON:encode(gp))
end
return JSON:encode(res)
```

+ 获取单位信息

```lua
--net.dostring_in('server')
local JSON = require('JSON')
local res = {}
res.id = {}
res.name = {}
res.getByName = {}
res.getUnits = {}
for i, gp in pairs(coalition.getGroups(1)) do
  res.id[i] = Group.getID(gp)
  res.name[i] = Group.getName(gp)
  res.getByName[i] = Group.getByName(res.name[i])
  res.getUnits[i] = gp:getUnits()
  for index, data in pairs(gp:getUnits()) do
    env.info(Unit.getFuel(data))
    env.info('测试:' .. JSON:encode(data)) --测试:{"id_":16777729}
  end
end
return JSON:encode(res)
```

+ 获取武器

```lua
--net.dostring_in('server')
local JSON = require('JSON')
local res = {}
res.id = {}
res.name = {}
res.getByName = {}
res.getUnits = {}
res.getAmmo = {}
for i, gp in pairs(coalition.getGroups(1)) do
  res.id[i] = Group.getID(gp)
  res.name[i] = Group.getName(gp)
  res.getByName[i] = Group.getByName(res.name[i])
  res.getUnits[i] = gp:getUnits()
  for index, data in pairs(gp:getUnits()) do
    --获取武器
    res.getAmmo[index] = Unit.getAmmo(data)
    --data等于gp:getUnits()[index]
    -- env.info('测试:' .. JSON:encode(data)) --测试:{"id_":16777729}
  end
end
return JSON:encode(res)
```

### 武器信息

```lua
--武器类别
Weapon.Category = {
  SHELL, --0 =炮弹
  MISSILE, --1 =导弹
  ROCKET, --2 =火箭
  BOMB, --3 =炸弹
  TORPEDO
}
--武器制导类型
Weapon.GuidanceType = {
  INS, --1 =惯性导航
  IR, --2 =红外
  RADAR_ACTIVE, --3 =主动雷达
  RADAR_SEMI_ACTIVE, --4 =半主动雷达
  RADAR_PASSIVE, --5 =被动雷达制导
  TV, --6 =电视制导
  LASER, --7 =激光制导
  TELE --8 =
}

--导弹类型
Weapon.MissileCategory = {
  AAM, --1 ==空空导弹
  SAM, --2 =防空/地空导弹
  BM, --3 =
  ANTI_SHIP, --4 = 反舰导弹
  CRUISE, --5 = 巡航导弹
  OTHER --6 =其他
}

```

### serrver

```lua
--net.dostring_in('server')
local JSON = require('JSON')
local keys = {}
for k, v in pairs(_G) do
  table.insert(keys, k)
end
return JSON:encode(keys)
````

### loadstring

```lua
local keys = {}
for k, v in pairs(_G) do
  table.insert(keys, k)
end
return keys
```

### config

```lua
--net.dostring_in('config')
local JSON = loadfile('Scripts/JSON.lua')()
local keys = {}
for k, v in pairs(_G) do
  table.insert(keys, k)
end
 print(keys)
return JSON:encode(keys)
```

```json
["webgui", "log", "startProfiler", "tostring", "gcinfo", "renderer_revision: %s", "os", "safeDoFileWithRequire", "getfenv", "servermode", "debug", "assert", "tonumber", "io", "norender", "value2code", "new_login", "load", "module", "socket", "Serializer", "silent_shaders_compilation", "_G", "ED_PUBLIC_AVAILABLE", "dx11backend", "coroutine", "ED_FINAL_VERSION", "loadstring", "dump", "ConfigHelper", "optionsEditor", "xpcall", "package", "updateGraphicsOptions", "print", "force_VR", "unpack", "_ARCHITECTURE", "reloadOptions", "Factory", "dcs_revision", "setmetatable", "next", "_ED_VERSION", "theatre", "MAC", "dont_bind_modules", "track_file", "plane", "rawequal", "terrain_revision: %s", "collectgarbage", "value2string", "newproxy", "netview", "ambientSound", "options", "show_debug_output_console", "write_subdir", "guiDebugDraw", "rawset", "sound", "net", "input", "env_dofile", "_VERSION", "setAutoLogin", "math", "string", "pcall", "getAutoLogin", "table", "type", "getPermissionToCollectStatistics", "require", "lfs", "pairs", "ipairs", "rawget", "editor", "setfenv", "getmetatable", "dofile", "web_browser", "select", "error", "loadfile"]
```

## DCS 编程文档

## 单个对象（Singleton）

有以下几种单个对象

+ env

编程环境对象

+ timer

计时器对象

+ land

地表对象

+ atmosphere

大气对象

+ world

世界对象

+ coalition

阵营管理对象

+ trigger

触发器对象

+ coord

坐标管理对象

+ missionCommands

任务管理对象

+ VoiceChat

语音聊天室对象

## 函数库

### A

+ Group.activate(class self)

>激活一个组

```lua
-- 激活 / 取消激活一个组。作为触发器的动作使用。原理是调用 Group.activate。
trigger.action.activateGroup(Group group)
trigger.action.deactivateGroup(Group group)
```

+ 添加事件处理器。事件的种类见“事件”

> world.addEventHandler(EventHandler handler)

+ coalition.addGroup(enum countryId, enum groupCategoryh, table groupData)

>生成一个新的组。单位数据 GroupData 的格式如下

```lua
local groupData = {
  -- 必需值

  ["name"] = "Ground Group", -- 组名。组名可以与单位名重复，但是组和组之间不能重复。
  ["task"] = "Ground Nothing", -- 主任务名
  ["x"] = -288585.71428572,
  ["y"] = 616314.28571429, -- x坐标和y坐标

  -- 可选值

  ["groupId"] = 2, -- 组ID。不填默认自动分配
  ["start_time"] = 0, -- 延时启动时间，从任务开始时开始计算。填0则执行代码时立即生成
  ["lateActivation"] = false, -- 强制延时生成。只有通过触发器动作才能激活。覆盖延时激活时间。
  ["visible"] = false, -- 激活前可见
  ["hidden"] = false, -- 在F10地图上可见
  ["taskSelected"] = true,
  ["route"] = -- 复杂表格。表示路径点
  {}, -- end of ["route"]
  ["tasks"] = -- 复杂表格，表示任务
  {}, -- end of ["tasks"]
  ["units"] = -- 单位的表格
  {
    [1] = {
      -- 必需值
      ["name"] = "Ground Unit1",
      ["type"] = "LAV-25",
      ["x"] = -288585.71428572,
      ["y"] = 616314.28571429,
      -- 可选值
      ["transportable"] = {
        ["randomTransportable"] = false
      }, -- end of ["transportable"]
      ["unitId"] = 2,
      ["skill"] = "Average",
      ["playerCanDrive"] = true,
      ["heading"] = 0.28605144170571
    } -- end of [1]
  } -- end of ["units"]

} -- end of [1]

coalition.addGroup(country.id.USA, Group.Category.GROUND, groupData)

```

可选的值（固定翼和直升机）

```bash
 uncontrolled    boolean for ground starts, whether or not the aircraft will be visible but not active
 modulation      number (0 or 1) for AM or FM radio
 frequency       number of the radio frequency the unit will broadcast to
 communication   boolean for whether or not the group will communicate over the radio
 ```

地面部队和水面舰艇的可选值

```bash
 visible         boolean For whether or not the group is visible before its start time
 ```

单位的必需值

```bash
name         name for the type of object
type         string for the type of object
x            number for x coordinate
y            number for y coordinate
```

固定翼和直升机单位的必需值

```bash
 alt         number altitude in meters
 alt_type    string "BARO" or "RADIO" for Above sea level or above ground level
 speed       number velocity the aircraft will spawn at measured in meters per second
 payload     table of the aircrafts payload including fuel, weapons, and countermeasures
 callsign    table/number of the callsign for the unit. NATO countries use a table to define callsigns while the Russian style uses a number
 ```

其他可选值

```bash
unitId       number unitId
heading      number heading of the object in radians
skill        string of the units skill level. Can be "Excellent", "High", "Good", "Average", "Random", "Player"
```

固定翼和直升机的值

```bash
 livery_id   string name of the livery for the aircraft
 psi         number
 onboard_num string of the tail number on the aircraft
 ```

直升机的值

```bash
 ropeLength  number length of a rope used for sling loading, default is 15
```

+ coalition.addRefPoint(enum coalitionId, table refPoint)

>添加一个参考点。JTAC 的工作需要用到参考点。参考点的格式如下

```lua
RefPoint = {
  callsign = number,
  type = number,
  point = Vec3
}

```

+ coalition.addStaticObject(enum countryId, table groupData)

>动态生成一组静态对象。静态对象是只有模型和血量，没有动作的单位。

```lua
local staticObj = {
  -- 必需值
  ["name"] = "dynBuilding", -- 名字
  ["type"] = "Cafe", -- 类别
  ["x"] = -294100, -- x坐标和y坐标
  ["y"] = 621528.57142856,
  -- 可选值
  ["dead"] = false, -- 是已经破坏的
  ["rate"] = 100, -- 炸毁所值的分数
  ["groupId"] = 3, -- 组ID
  ["unitId"] = 3, -- 单位ID
  ["heading"] = 0, -- 朝向
  ["shape_name"] = "stolovaya", -- 模型名字
  ["category"] = "Fortifications", -- 类别
  -- 货物类静态单位的可选值
  ["mass"] = 100, -- 质量
  ["canCargo"] = false, -- 能被吊运与否
  -- 飞机类静态单位的可选值
  ["livery_id"] = "xxx"
}

coalition.addStaticObject(country.id.USA, staticObj)

```

### C

-createInfraRed
>创建红外或激光光点。其中激光光点允许进行激光编码。激光编码从 1111 到 1788.

```lua
createLaser(Object Source, Vec3 localRef, Vec3 point, [number laseCode])
-- localRef 表示从相对 source 中心的哪个位置发出。
```

+ createRoom

>创建语音房间

### D

+ Object.destroy(class Self)

>摧毁一个对象，不触发对象摧毁的事件

+ dostring_in

>多人模式函数，执行字符串形式的 lua 代码。

### E

+ trigger.action.effectSmokeBig(table vec3, enum smoke_preset, number density)

>产生大烟火效果。smoke_preset 种类如下：

```lua
 1 = small smoke and fire
 2 = medium smoke and fire
 3 = large smoke and fire
 4 = huge smoke and fire
 5 = small smoke
 6 = medium smoke
 7 = large smoke
 8 = huge smoke
 ```

density 值在 0 到 1 之间。

+ error(string log, [boolean showMessageBox])
warning
info 在 log 文件中记录一条错误 / 警告 / 信息，可选变量表示弹出警告框与否。

+ DCS.exitProcess

>关闭游戏

+ trigger.action.explosion(table vec3, number power)
+ 制造给定当量的爆炸。

### F

+ land.findPathOnRoads(string roadType, number xCoord, number yCoord, number destX, number destY)

>求连接两点之间的道路。返回值是一系列在道路上的点。roadType 可以是'rails'（铁路）或'roads'（公路）

### G

 groupContinueMoving
 groupStopMoving
暂停 / 恢复一个组的移动 / 执行在途任务

### H

+ hasAttribute
+ hasSensors
+ hasTask

### I

+ illuminationBomb

>产生照明弹效果

+ inAir
+ isExist
+ isActive
+ isMultiplayer
+ isServer
+ isTargetDetected
+ isVisible

### J

+ json2lua
+ lua2json

lua 和 json 代码相互转换

### K

+ kick
+ knowTarget

### L

+ LLtoLO
+ LOtoLL
+ LLtoMGRS
+ MGRStoLL
+ net.load_next_mission

### M

+ markToAll
+ markToCoalition
+ markToGroup

推送一个 F10 地图标记给所有人 / 特定阵营 / 特定组

### O

+ outSound
+ outSoundForCoalition
+ outSoundForCountry
+ outSoundForGroup

+ outText
+ outTextForCoalition
+ outTextForCountry
+ outTextForGroup

推送声音 / 显示文字给所有人 / 特定单位 / 特定国家 / 特定组

### P

+ popTask
+ profile
+ pushAITask
+ pushTask

### R

+ radioTransmission
+ removeEventHandler
+ removeFunction
+ removeItem
+ removeItemForCoalition
+ removeItemForGroup
+ removeMark
+ resetTask

### S

+ scheduleFunction
+ searchObjects
+ net.send_chat

>给客户端发送聊天信息

+ signalFlare
+ smoke
+ stopMission

### get/set 系列函数

+ timer.getAbsTime

>返回任务开始后的秒数

+ coalition.getAirbases(enum coalitionId)

>返回一个阵营的所有空军基地

+ unit.getAmmo(class self)

>返回一个单位目前持有的弹药

+ DCS.getAvailableCoalitions()

>返回客户端所有的阵营（多人游戏）

+ DCS.getAvailableSlots(number/string coalitionId)

>返回给定阵营在客户端可用的玩家格子（多人游戏）

+ Group/Unit/StaticObject.getByName(string name)

>按照输入的名字返回一个对象。

+ Unit/Airbase.getCallsign(class self)

>返回一个对象的呼号

+ Static_Object.getCargoDisplayName(class self)

>返回一个货物对象的质量，格式是"*质量* kg"

+ Static_Object.getCargoWeight(class self)

>以数字形式返回一个货物对象的质量

+ Object/Group/Spot/Airbase.getCategory(class self)

>返回一个对象的类别

+ land.getClosestPointOnRoads(string roadType, number xCoord, number yCoord, number zCoord)

>返回离输入点最近的道路。道路种类字符串可以是 roads 或 railroads

+ Object/Group/Coalition_Object.getCoalition(class self)

>返回对象所属的阵营。

+ Spot.getCode(class self)

>返回激光点的激光代码。

+ Group.getController(class self)

>返回一个组或单位的 AI 实体。
>水面舰船和地面单位必须按组控制，固定翼和直升机可以按单位或按组控制。

+ coalition.getCountryCoalition(enum countryId)

>返回一个国家所属的阵营

+ Object.getCountry(class self)

>返回一个单位所属的国家

+ DCS.getCurrentMission

>返回任务文件中安排的任务

+ Object.getDescByName(String typeName)

>返回对象类别名所对的描述。

+ Object.getDesc(class self)

>返回对象所对的描述

+ Controller.getDetectedTargets(class self, [enum detectionType1],[enum detectionType2...])

>按照所提供的探测手段返回已经探测到的目标。

目标格式如下：

```lua
DetectedTarget = {
  object = Object, --the target
  visible = boolean, --the target is visible
  type = boolean, --the target type is known
  distance = boolean --distance to the target is known
```

对单个单位控制器有效，对组控制器无效。

+ Unit.getDrawArgumentValue(class self, number arg)

>按编号返回单位的“绘制参数值”，即模型的某个部件运动到某个位置的值。

+ Unit.getFuel(class self)

>返回单位**内油**的百分比。如果单位携带副油箱该百分比可能超过 1.

+ Unit.getGroup(class self)

>返回单位所在的组

+ coalition.getGroups(enum coalitionId, [enum GroupCategory])

>返回某个阵营所有特定种类的组。

+ land.getHeight(table vec2)

>返回地面一点的海拔高度

+ Group.getID(class self)

>返回一个对象的任务 ID

+ Group.getInitialSize(class self)
+ Group.getSize(class self)

返回一个组的初始成员数 / 当前成员数

+ land.getIP(table origin, table direction, number distance)

>将原点 - 方向 - 距离值转换为点。如果无法转换则返回 nil

+ Weapon.getLauncher(class self)

>返回武器的发射者

+ Unit.getLife(class self)
+ getLife
返回初始 / 当前血量

+ coalition.getMainRefPoint(enum coalitionId)

>返回阵营靶眼位置

+ world.getMarkPanels()

>返回目前所有的标记点

```lua
 [1] ={
   idx = idxMark(IDMark),
   time = Time,
   initiator = Unit,
   coalition = -1 (or RED/BLUE),
   groupID = -1 (or ID),
   text = markText,
   pos = vec3
 }
 ```

+ DCS.getMissionFilename()

>返回任务文件名

+ DCS.getMissionName()

>返回任务名称

+ DCS.getMissionOptions()

>返回任务选项

+ DCS.getMissionResult(string side)

>根据任务目标定义，返回特定阵营的任务进度

+ DCS.getModelTime()

>返回 DCS 模拟持续时间。单位秒。

+ Object.getName(class self)

>返回对象的名字

+ Unit.getNearestCargos(class self)

>返回最近的货物单位。如果输入的单位不是直升机，返回 nil。

+ Unit.getNumber(class self)

>返回特定单位在组内的编号

+ Airbase.getParking(class self, boolean available)

>返回特定空军基地的停机位信息。类别数字格式如下：

```lua
16 : Valid spawn points on runway
40 : Helicopter only spawn
68 : Hardened Air Shelter
72 : Open/Shelter air airplane only
104: Open air spawn
```

+ DCS.getPause()

>返回服务器是否为暂停状态

+ world.getPlayer()

>返回技术水平设为“玩家”的单位。

+ Unit.getPlayerName(Class Self)

>如果传入的单位由玩家控制，返回玩家名字，否则返回 nil

+ coalition.getPlayers(enum coalitionId)

>返回某个阵营目前被玩家控制的单位表格

+ Object/Spot.getPoint(class self)

>返回给定对象所在的 3d 位置

+ Object/Spot.getPosition(class self)

>返回给定对象的 3d 位置和 3d 朝向

```lua
Position3 = {
  p = Vec3,
  x = Vec3,
  y = Vec3,
  z = Vec3
}
```

+ Unit.getRadar(class self)

>返回两个值，一个 bool 值表示有无雷达，另一个 object 是该雷达正在跟踪或最感兴趣的搜索目标。

+ DCS.getRealTime()

>返回 DCS 程序启动后的秒数

+ coalition.getRefPoints(enum coalitionId)

>返回一个阵营所有参考点。JTAC 会用到参考点。

+ Unit.getSensors(class self)

>返回一个单位的传感器信息

+ coalition.getServiceProviders(enum coalitionId, enum coalition.service>

>返回某一阵营某种空中服务的提供者。空中服务包括加油 TANKER, 预警 AWACS, 空管 ATC, 前进火力控制 FAC

+ coalition.getStaticObjects(enum coalitionId)

>返回某一阵营所有静态对象的列表

+ land.getSurfaceType(table vec2)

>返回某一点的地面种类

+ Weapon.getTarget(class self)

>返回武器正在追踪的目标

+ atmosphere.getTemperatureAndPressure(table vec3)

>返回当前点的气温和气压（2 个返回值）

+ timer.getTime0()

>返回任务开始后的时间

+ timer.getTime()

>返回任务开始后的时间，精确到毫秒。即使暂停这个数字也会增长。

+ Object.getTypeName()

>返回对象的类名。例如对一架 A-10C 战机对象使用返回字符串"A-10C"

+ Group.getUnit(number unitIndex)

>按照编号返回组内的一个单位

+ DCS.getUnitProperty(number unitId, string propertyId)

>返回一个单位的一项属性。

```lua
DCS.UNIT_RUNTIME_ID, -- unique within runtime mission. int
DCS.UNIT_MISSION_ID, -- unique within mission file. int>0
DCS.UNIT_NAME, -- unit name, as assigned by mission designer.
DCS.UNIT_TYPE, -- unit type (Ural, ZU-23, etc)
DCS.UNIT_CATEGORY,
DCS.UNIT_GROUP_MISSION_ID, -- group ID, unique within mission file. int>0
DCS.UNIT_GROUPNAME, -- group name, as assigned by mission designer.
DCS.UNIT_GROUPCATEGORY,
DCS.UNIT_CALLSIGN,
DCS.UNIT_HIDDEN,-- ME hiding
DCS.UNIT_COALITION,-- "blue", "red" or "unknown"
DCS.UNIT_COUNTRY_ID,
DCS.UNIT_TASK, --"unit.group.task"
DCS.UNIT_PLAYER_NAME, -- valid for network "humanable" units
DCS.UNIT_ROLE,--"artillery_commander", "instructor", etc
DCS.UNIT_INVISIBLE_MAP_ICON,--ME invisible map icon
```

+ Group.getUnits(class self)

>返回一个组的所有单位

+ DCS.getUnitTypeAttribute(string typeName, string attribute>

>返回一个单位类别的一种属性

+ DCS.getUnitType(number missionId)

>等效于 DCS.getUnitProperty(missionId, DCS.UNIT_TYPE)

+ trigger.misc.getUserFlag(string flagnum/flagname)

>按照 ID 号或名字返回用户 flag

+ env.getValueDictByKey(string value)

>返回字典键值对应的值。

+ Object.getVelocity(class self)

>返回对象的速度

+ atmosphere.getWind(table vec3)

>返回当前点的风

+ atmosphere.getWindWithTurbulence(table vec3)

>返回当前点的风和湍流

+ trigger.misc.getZone(string zoneName)

>按名字返回触发区

+ setAITask
+ setCode
+ setCommand
+ setErrorMessageBoxEnabled
+ setFunctionTime
+ setGroupAIOff
+ setGroupAIOn
+ setOnOff
+ setOption
+ setPause
+ setPoint
+ setTask
+ setUnitInternalCargo
+ setUserFlag

### F10 无线电指令函数

+ missionCommands.addCommand(string name, table/nil path, function functionToRun, [any anyArgument])

+ missionCommands.addCommandForCoalition(enum coalitionId, 同上)

+ missionCommands.addCommandForGroup(enum groupId, 同上)

为所有人 / 指定阵营 / 指定组添加 F10 命令。可选变量 Argument 是 functionToRun 的参数。返回一个 table，该 table 从上往下表示所添加的子菜单的路径。

例：

```lua
local displayRequests = missionCommands.addSubMenu( "Display Requests")
local negativeReply = missionCommands.addCommand( "Negative Ghostrider", displayRequests , displayMsg, {flyby = false})
local positiveReply = missionCommands.addCommand( "Roger Ghostrider", displayRequests , displayMsg, {flyby = true})
```

这样可以添加三个命令，其中 negative/positiveReply 两个命令在 displayRequests 之下。

+ trigger.action.addOtherCommand(string name, string userFlagName, number userFlagValue)

+ trigger.action.addOtherCommandForCoalition(enum coalitionId, 其他同上)

+ trigger.action.addOtherCommandForGroup(number groupId, 其他同上)

+ trigger.action.removeOtherCommand(string name, string userFlagName, number userFlagValue)

+ trigger.action.removeOtherCommandForCoalition

+ trigger.action.removeOtherCommandForGroup

为所有人 / 阵营 / 组添加 / 移除 F10 命令，与之前的函数不同，这里的命令只能更改一个 flag 值，且不能有子菜单。该函数作为触发器的动作使用。

+ addSubMenu(string name, [table path])
+ addSubMenuForCoalition
+ addSubMenuForGroup

为所有人 / 阵营 / 组添加子菜单. 子菜单是没有函数与之挂钩的 F10 命令. 路径表格是可选项，如果不填则加到根目录下。返回值是路径表格，从上到下表示所添加子菜单所在的路径。

例如以下代码会添加标题为“Request Asset”的子菜单，子菜单下有“SEAD”“CAS”“CAP”三个命令。

```lua
local requestM = missionCommands.addSubMenu('Request Asset')
local rSead = missionCommands.addCommand('SEAD', requestM, doRequestFunction, {type = 'SEAD'})
local rCAS = missionCommands.addCommand('CAS', requestM, doRequestFunction, {type = 'CAS'})
local rCAP= missionCommands.addCommand('CAP', requestM, doRequestFunction, {type = 'CAP'})
```

以下可以创建嵌套的子菜单。

```lua
local subR = missionCommands.addSubMenu('Root SubMenu')
local subN1 = missionCommands.addSubMenu('SubMenu within RootSubmenu', subR)
local subN2 = missionCommands.addSubMenu('we must go deeper', subN1)
local subN3 = missionCommands.addSubMenu('Go take a UX class', subN2)
```

### net 函数

```lua
net.get_my_player_id()
net.get_name()
net.get_player_info()
net.get_player_listinfo()
net.get_server_id()
net.get_slot()
net.get_stat()
```
