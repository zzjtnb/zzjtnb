---
title: lua中将表转成json格式的字符串
category: Lua
tags:
  - Lua
cover: https://cdn.pixabay.com/photo/2020/07/04/06/40/clouds-5368435_960_720.jpg
---

> 经常要用 Lua 处理 JSON 格式的字符串，于是写了一个可以从 Lua 中的 table 生成 JSON 格式字符串的方法，虽有重造轮子之嫌，但自己写的这一小段代码在工作中更实用一些（其实主要原因还是我读不懂别人写的代码![icon_redface](http://haiyi.iteye.com/images/smiles/icon_redface.gif) ）：
Lua 代码  

```lua
function table2json(t)
  local function serialize(tbl)
    local tmp = {}
    for k, v in pairs(tbl) do
      local k_type = type(k)
      local v_type = type(v)
      local key = (k_type == "string" and '"' .. k .. '":') or (k_type == "number" and "")
      local value =
        (v_type == "table" and serialize(v)) or (v_type == "boolean" and tostring(v)) or
        (v_type == "string" and '"' .. v .. '"') or
        (v_type == "number" and v)
      tmp[#tmp + 1] = key and value and tostring(key) .. tostring(value) or nil
    end
    if table.maxn(tbl) == 0 then
      return "{" .. table.concat(tmp, ",") .. "}"
    else
      return "[" .. table.concat(tmp, ",") .. "]"
    end
  end
  assert(type(t) == "table")
  return serialize(t)
end

```

当 Lua table 的 key 和 value 之中有不符合 JSON 语法的数据类型出现时，第 13 行代码可以忽略这些不合法的 key-value 对，最终生成的 JSON 字符串中它们不会出现。
调用：
Lua 代码

```lua
table1 = {
  test1 = {
    "test1", "test2", "test3", true, false,
  },
  test2 = "bbb",
  test3 = {
    table2 = {
      a = "a",
      ttt= {
        1, 2, 3, { 4, 5, 6, },   
                        },
b = "b",
  c = {},  
                },
[true] = 999,  
        },
[{}] = 34545,  
}

print(table2json(table1))
```

输出：
引用  

```json
{
  "test3": {
    "table2": {
      "a": "a",
      "c": {},
      "b": "b",
      "ttt": [1, 2, 3, [4, 5, 6]]
    }
  },
  "test1": ["test1", "test2", "test3", true, false],
  "test2": "bbb"
}

```

可以看到 [true] = 999, [{}] = 34545 这两个不能转化为 JSON 的 key-value 在生成的 JSON 字符串中已经被过滤掉了。
惭愧的是，因为 Lua 的语法特性，这个方法暂时还不能将 Lua 中的 nil 转化为 JSON 中的 null，等想到好的办法再说，目前看来这样的需求也没有存在的必要，所以现在也够用了![icon_redface](http://haiyi.iteye.com/images/smiles/icon_redface.gif)
以上代码稍作修改，也可以用来实现 Lua table 的序列化
