---
title: lua下 string 和table 互转
category: Lua
tags:
  - Lua
cover: https://cdn.pixabay.com/photo/2020/11/06/15/33/woman-5718089_960_720.jpg
---

```lua
--[[
  lua下 string 和table 互转
-]]
local module = {}
--table to string 序列化
function module.serialize(obj)
  local lua = ''
  local t = type(obj)
  if t == 'number' then
    lua = lua .. obj
  elseif t == 'boolean' then
    lua = lua .. tostring(obj)
  elseif t == 'string' then
    lua = lua .. string.format('%q', obj)
  elseif t == 'table' then
    lua = lua .. '{\n'
    for k, v in pairs(obj) do
      lua = lua .. '[' .. module.serialize(k) .. ']=' .. module.serialize(v) .. ',\n'
    end
    local metatable = getmetatable(obj)
    if metatable ~= nil and type(metatable.__index) == 'table' then
      for k, v in pairs(metatable.__index) do
        lua = lua .. '[' .. module.serialize(k) .. ']=' .. module.serialize(v) .. ',\n'
      end
    end
    lua = lua .. '}'
  elseif t == 'nil' then
    return nil
  else
    error('can not serialize a ' .. t .. ' type.')
  end
  return lua
end
--string to table 反序列化
function module.unserialize(lua)
  local t = type(lua)
  if t == 'nil' or lua == '' then
    return nil
  elseif t == 'number' or t == 'string' or t == 'boolean' then
    lua = tostring(lua)
  else
    error('can not unserialize a ' .. t .. ' type.')
  end
  lua = 'return ' .. lua
  local func = loadstring(lua)
  if func == nil then
    return nil
  end
  return func()
end

-- local data = {['a'] = 'a', ['b'] = 'b', [1] = 1, [2] = 2, ['t'] = {1, 2, 3}}
-- local sz = module.serialize(data)
-- print(sz)
-- print('---------')
-- local zz = module.unserialize(sz)
-- print(zz)
-- return module

```
