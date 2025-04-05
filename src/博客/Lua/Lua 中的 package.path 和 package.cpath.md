---
title: Lua中的package.path和package.cpath
category: Lua
tags:
  - Lua
cover: https://cdn.pixabay.com/photo/2021/01/05/06/40/boat-5889919_960_720.png
---

>
>很多 LUA 的模块：包含 C 动态库和 lua 封装代码两部分.
C 动态库必须放在 C 库路径下，Lua 封装代码需放在 Lua 库路径下.
可以通过以下命令来查看 C 库路径和 Lua 库路径：

```lua
print("C path:", package.cpath)
print("Lua path:", package.path)
```

## package.path
>
>package.path 用于搜索自己写的库文件或者第三方的库文件

```lua
--方法1 只加载想要的目录(搜索指定路径下,以 .lua结尾的文件)
package.path = "E:/Eagle Dynamics/DCS World OpenBeta/Scripts/?.lua;"
--方法2 增加目录(搜索指定路径下,以 .lua结尾的文件)
package.path = "E:/Eagle Dynamics/DCS World OpenBeta/Scripts/?.lua;" .. package.path
```

## package.cpath
>
>package.cpath 用于搜索自己写的 so 库文件或者第三方的 so 库文件

```lua
--方法1 只加载想要的目录(搜索指定路径下,以.so结尾的文件)
package.cpath = "E:/Eagle Dynamics/DCS World OpenBeta/?.so;"..package.cpathpackage.cpath = "E:/Eagle Dynamics/DCS World OpenBeta/?.so;"
--方法2 增加目录(搜索指定路径下,以.so结尾的文件)
package.cpath = "E:/Eagle Dynamics/DCS World OpenBeta/?.so;"..package.cpathpackage.cpath = "E:/Eagle Dynamics/DCS World OpenBeta/?.so;"..package.cpath
```

### 示例

```lua
package.path =[[
E:/Eagle Dynamics/DCS World OpenBeta/bin/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/Scripts/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/Scripts/Common/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/Scripts/UI/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/Scripts/UI/F10View/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/dxgui/bind/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/dxgui/skins/skinME/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/dxgui/skins/common/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/MissionEditor/modules/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/Mods/tech/CombinedArms/UI/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/dxgui/skins/skinME/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/dxgui/skins/common/?.lua;
E:/Eagle Dynamics/DCS World OpenBeta/LuaSocket/?.lua; package.path;
]] .. package.path

package.cpath = [[
E:/Eagle Dynamics/DCS World OpenBeta/bin/lua-?.dll;
E:/Eagle Dynamics/DCS World OpenBeta/bin/?.dll;
E:/Eagle Dynamics/DCS World OpenBeta/LuaSocket/?.dll
]] .. package.cpath
local JSON = require("JSON")
```

假设 package.path 的值是上面定义的,那么调用 require("module") 时就会尝试打开以下文件目录去搜索目标。

```bash
E:/Eagle Dynamics/DCS World OpenBeta/bin/module.lua
E:/Eagle Dynamics/DCS World OpenBeta/Scripts/module.lua
E:/Eagle Dynamics/DCS World OpenBeta/Scripts/Common/module.lua
...
```

如果找过目标文件，则会调用 package.loadfile 来加载模块。否则，就会去找 C 程序库。

搜索的文件路径是从全局变量 package.cpath 获取,而这个变量则是通过环境变量 LUA_CPATH 来初始。

搜索的策略跟上面的一样，只不过现在换成搜索的是 so 或 dll 类型的文件。如果找得到，那么 require 就会通过 package.loadlib 来加载它。
