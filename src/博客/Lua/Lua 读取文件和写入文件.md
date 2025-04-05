---
title: Lua读取文件和写入文件
category: Lua
tags:
  - Lua
cover: https://cdn.pixabay.com/photo/2021/01/10/18/01/milky-way-5905903_960_720.jpg
---

```lua
function FileSaveLoad()
   local file = io.open("test.txt", "r");
   assert(file);
   local data = file:read("*a"); --读取所有内容
   file:close();
   file = io.open("test.lua", "w");
   assert(file);
   file:write(data);
   file:close();
 end
 FileSaveLoad()
```

```lua
--Lua读取文件和写入文件
function FileSaveLoad()
  local file1 = io.open('./test.txt', 'r')
  assert(file1)
  local data = file1:read('*a') --读取所有内容
  file1:close()
  local file2 = io.open('./test.lua', 'w')
  assert(file2)
  file2:write(data)
  file2:close()
end
FileSaveLoad()
```
