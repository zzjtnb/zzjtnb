---
title: Lua语法官方小例子
category: Lua
tags:
  - Lua
cover: https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/luaa.gif
---

> Lua 是一个简单轻量的脚本语言，例子来自 Lua 官方的小例子，全部学会就会用啦
[lua 官网](https://www.lua.org)
[lua 参考手册](https://www.lua.org/manual/)
[Lua 5.1 参考手册](https://www.lua.org/manual/5.1/manual.html)
[lua 使用维基](http://lua-users.org/wiki/TutorialDirectory)
[Lua 程序设计](http://www.inf.puc-rio.br/~roberto/pil2/)
[Lua 程序设计第四版习题答案](https://github.com/0kk470/pil4)
[TypeScriptToLua](https://typescripttolua.github.io/docs/getting-started/)

## Example 1 -- Helloworld

用 print 就可以打印啦

```lua
-- Classic hello program.
print("helloworld")
-------- Output ------
hello
```

## Example 2 -- 注释

注释有两种啦，两个横线，多行注释要用两个方括号

```lua
-- Single line comments in Lua start with double hyphen.

--[[ Multiple line comments start
with double hyphen and two square brackets.
  and end with two square brackets. ]]

-- And of course this example produces no
-- output, since it's all comments!


```

## Example 3 -- 变量

变量不用声明哒，直接用，而且没有类型 hhh 类似于 py 叭

```lua
-- Variables hold values which have types, variables don't have types.

a=1
b="abc"
c={}
d=print

print(type(a))
print(type(b))
print(type(c))
print(type(d))

-------- Output ------

number
string
table
function
```

## Example 4 -- 变量名

-

注：和 C 语言一样

```lua
-- Variable names consist of letters, digits and underscores.
-- They cannot start with a digit.
one_two_3 = 123 -- is valid varable name
-- 1_two_3 is not a valid variable name.
```

> 变量名可以用 字母 数字 and 下划线
> 但是不可以使用数字开头

## Example 5 保留字

就是下划线开头的

```lua
-- The underscore is typically used to start special values
-- like _VERSION in Lua.
print(_VERSION)
-- So don't use variables that start with _,
-- but a single underscore _ is often used as a
-- dummy variable.

-------- Output ------
Lua 5.1

```

> 下划线是保留字使用的开头，变量不能使用_开头

## Example 6 -- 区分大小写

```lua
-- Lua is case sensitive so all variable names & keywords
-- must be in correct case.

ab=1
Ab=2
AB=3
print(ab,Ab,AB)

-------- Output ------

1       2       3
```

> 区分大小写

## Example 7 -- 保留的关键字

大写的不是关键字

```lua
-- Lua reserved words are: and, break, do, else, elseif,
--     end, false, for, function, if, in, local, nil, not, or,
--     repeat, return, then, true, until, while.

-- Keywords cannot be used for variable names,
-- 'and' is a keyword, but AND is not, so it is a legal variable name.
AND=3
print(AND)

-------- Output ------

```

## Example 8 -- 字符串

3 种， 单引号、双引号和多行（多行包含换行）

```lua
a="single 'quoted' string and double \"quoted\" string inside"
b='single \'quoted\' string and double "quoted" string inside'
c= [[ multiple line
with 'single'
and "double" quoted strings inside.]]

print(a)
print(b)
print(c)

-------- Output ------

single 'quoted' string and double "quoted" string inside
single 'quoted' string and double "quoted" string inside
 multiple line
with 'single'
and "double" quoted strings inside.
```

> 3 种字符串的表示方法

## Example 9 -- 奇怪的赋值方式是支持的

```lua
-- a,b = b,a is valid
a,b,c,d,e = 1,2,3,'four','five'
print(a,b,c,d,e)

-------- Output ------
1       2       3       four    five
```

## Example 10 -- 奇怪的赋值方式可以交换变量

```lua
-- Multiple assignments allows one line to swap two variables.

print(a,b)
a,b=b,a
print(a,b)

-------- Output ------

1       2
2       1
```

## Example 11 -- 数字

用两个点可以连接字符串和数字

```lua
-- Multiple assignment showing different number formats.
-- Two dots (..) are used to concatenate strings (or a
-- string and a number).

a,b,c,d,e = 1, 1.123, 1E9, -123, .0008
print("a="..a, "b="..b, "c="..c, "d="..d, "e="..e)

-------- Output ------

a=1     b=1.123 c=1000000000    d=-123  e=0.0008
```

## Example 12 -- print 可以不写括号？

```lua
-- More writing output.

print "Hello from Lua!"
print("Hello from Lua!")

-------- Output ------

Hello from Lua!
Hello from Lua!
```

## Example 13 -- 可以用 stdout 嗷

```lua
-- io.write writes to stdout but without new line.

io.write("Hello from Lua!")
io.write("Hello from Lua!")

-- Use an empty print to write a single new line.
print()

-------- Output ------

Hello from Lua!Hello from Lua!
```

> io.write 可以不换行 空的 print 可以输出一个新行

## Example 14 -- 数组

-

数组，官方文档写的是 Tables，可以用下标来访问

```lua
-- Simple table creation.

a={} -- {} creates an empty table
b={1,2,3} -- creates a table containing numbers 1,2,3
c={"a","b","c"} -- creates a table containing strings a,b,c
print(a,b,c) -- tables don't print directly, we'll get back to this!!

-------- Output ------

table: 008A48A8 table: 008A4420 table: 008A4768

--在 Lua 里表的默认初始索引一般以 1 开始。
> b = {4,5,6,7,8}
> print(b)
table: 009B9978
> print(b[0])
nil
> print(b[1])
> print(b[2])
```

## Example 15 下标可以是字符串

```lua
-- Associate index style.

address={} -- empty address
address.Street="Wyman Street"
address.StreetNumber=360
address.AptNumber="2a"
address.City="Watertown"
address.State="Vermont"
address.Country="USA"

print(address.StreetNumber, address["AptNumber"])

-------- Output ------

360     2a
```

## Example 16 -- if statement

记得有 then 和 end

```lua
-- Simple if.

a=1
if a==1 then
    print ("a is one")
end

-------- Output ------

a is one
```

## Example 17 -- if else statement

if else end

```lua
b="happy"
if b=="sad" then
    print("b is sad")
else
    print("b is not sad")
end

-------- Output ------

b is not sad
```

> if then else end

## Example 18 -- if elseif else statement

多分支

```lua
c=3
if c==1 then
    print("c is 1")
elseif c==2 then
    print("c is 2")
else
    print("c isn't 1 or 2, c is "..tostring(c))
end


-------- Output ------

c isn't 1 or 2, c is 3
```

> if then elseif then else end

## Example 19 -- 条件赋值？

有点像 C 的三目运算符

相当于`b = ( a == 1) ? "one": "not one";`

```lua
-- value = test and x or y

a=1
b=(a==1) and "one" or "not one"
print(b)

-- is equivalent to
a=1
if a==1 then
    b = "one"
else
    b = "not one"
end
print(b)

-------- Output ------

one
one

```

## Example 20 -- while

while do end （~= 就是 C 语言的!=）

```lua
a=1
while a~=5 do -- Lua uses ~= to mean not equal
    a=a+1
    io.write(a.." ")
end

-------- Output ------

2 3 4 5
```

## Example 21 -- repeat until statement

do while?

```lua
a=0
repeat
    a=a+1
    print(a)
until a==5

-------- Output ------

```

## Example 22 -- for 循环

for [1,4] do end

```lua
-- Numeric iteration form.

-- Count from 1 to 4 by 1.
for a=1,4 do io.write(a) end

print()

-- Count from 1 to 6 by 3.
for a=1,6,3 do io.write(a) end

-------- Output ------

```

> for do end

## Example 23 -- foreach？

for 还能这样用 *(foreach?)

```lua
-- Sequential iteration form.

for key,value in pairs({1,2,3,4}) do print(key, value) end

-------- Output ------

1       1
2       2
3       3
4       4

```

## Example 24 -- 用 pairs 打印数组

-----------

pairs?

```lua
-- Simple way to print tables. ##  iterator

a={1,2,3,4,"five","elephant", "mouse"}

for i,v in pairs(a) do print(i,v) end

-------- Output ------

1       1
2       2
3       3
4       4
5       five
6       elephant
7       mouse
```

## Example 25 -- break 跳出循环

```lua
-- break is used to exit a loop.
a=0
while true do
    a=a+1
    if a==10 then
        break
    end
end

print(a)


-------- Output ------

Press 'Enter' key for next example
```

## Example 26 -- 函数

-

```lua
-- Define a function without parameters or return value.
function myFirstLuaFunction()
    print("My first lua function was called")
end

-- Call myFirstLuaFunction.
myFirstLuaFunction()

-------- Output ------

My first lua function was called
```

## Example 27 -- 带返回值的函数

```lua
-- Define a function with a return value.
function mySecondLuaFunction()
    return "string from my second function"
end

-- Call function returning a value.
a=mySecondLuaFunction("string")
print(a)
```

## Example 28 -- 返回一堆值

```lua
-- Define function with multiple parameters and multiple return values.
function myFirstLuaFunctionWithMultipleReturnValues(a,b,c)
    return a,b,c,"My first lua function with multiple return values", 1, true
end

a,b,c,d,e,f = myFirstLuaFunctionWithMultipleReturnValues(1,2,"three")
print(a,b,c,d,e,f)

-------- Output ------

1       2       three   My first lua function with multiple return values 1true
```

## Example 29 -- 局部变量 local

默认变量就是全局变量，局部变量要用 local 声明

```lua
-- All variables are global in scope by default.

b="global"

-- To make local variables you must put the keyword 'local' in front.
function myfunc()
    local b=" local variable"
    a="global variable"
    print(a,b)
end

myfunc()
print(a,b)

-------- Output ------

global variable  local variable
global variable global
```

> All variables are global in scope by default.

## Example 30 -- 格式化输出 printf

```lua
-- An implementation of printf.

function printf(fmt, ...)
    io.write(string.format(fmt, ...))
end

printf("Hello %s from %s on %s\n",
       os.getenv"USER" or "there", _VERSION, os.date())

-------- Output ------

Hello there from Lua 5.1 on 08/05/19 09:34:49
```

## Example 31 标准库？

-

```lua
--[[

 Standard Libraries

  Lua has standard built-in libraries for common operations in
  math, string, table, input/output & operating system facilities.

 External Libraries

  Numerous other libraries have been created: sockets, XML, profiling,
  logging, unittests, GUI toolkits, web frameworks, and many more.

]]

-------- Output ------

```

## Example 32 -- math 库

```lua
-- Math functions:
-- math.abs, math.acos, math.asin, math.atan, math.atan2,
-- math.ceil, math.cos, math.cosh, math.deg, math.exp, math.floor,
-- math.fmod, math.frexp, math.huge, math.ldexp, math.log, math.log10,
-- math.max, math.min, math.modf, math.pi, math.pow, math.rad,
-- math.random, math.randomseed, math.sin, math.sinh, math.sqrt,
-- math.tan, math.tanh

print(math.sqrt(9), math.pi)

-------- Output ------

3       3.1415926535898
```

## Example 33 -- string 库

```lua
-- String functions:
-- string.byte, string.char, string.dump, string.find, string.format,
-- string.gfind, string.gsub, string.len, string.lower, string.match,
-- string.rep, string.reverse, string.sub, string.upper

print(string.upper("lower"),string.rep("a",5),string.find("abcde", "cd"))

-------- Output ------

LOWER   aaaaa   3       4
```

## Example 34 -- table 库

```lua
-- Table functions:
-- table.concat, table.insert, table.maxn, table.remove, table.sort

a={2}
table.insert(a,3);
table.insert(a,4);
table.sort(a,function(v1,v2) return v1 > v2 end)
for i,v in ipairs(a) do print(i,v) end

-------- Output ------

1       4
2       3
3       2

```

## Example 35 --input/output 库

```lua
-- IO functions:
-- io.close , io.flush, io.input, io.lines, io.open, io.output, io.popen,
-- io.read, io.stderr, io.stdin, io.stdout, io.tmpfile, io.type, io.write,
-- file:close, file:flush, file:lines ,file:read,
-- file:seek, file:setvbuf, file:write

       print(io.open("file doesn't exist", "r"))

-------- Output ------

nil     file doesn't exist: No such file or directory   2
```

## Example 36 -- os 库

```lua
-- OS functions:
-- os.clock, os.date, os.difftime, os.execute, os.exit, os.getenv,
-- os.remove, os.rename, os.setlocale, os.time, os.tmpname

print(os.date())

-------- Output ------

08/05/19 09:36:36
```

## Example 37 -- 外部库

外部的库需要用 require 导入

```lua
-- Lua has support for external modules using the 'require' function
-- INFO: A dialog will popup but it could get hidden behind the console.

require( "iuplua" )
ml = iup.multiline
    {
    expand="YES",
    value="Quit this multiline edit app to continue Tutorial!",
    border="YES"
    }
dlg = iup.dialog{ml; title="IupMultiline", size="QUARTERxQUARTER",}
dlg:show()
print("Exit GUI app to continue!")
iup.MainLoop()


-------- Output ------

failed to load & run sample code
error loading module 'iuplua' from file 'C:\Dev\Lua\clibs\iuplua51.dll':
        The specified module could not be found.
```

## Example 38 关于例子

```lua
--[[

 To learn more about Lua scripting see

 Lua Tutorials: http://lua-users.org/wiki/TutorialDirectory

 "Programming in Lua" Book: http://www.inf.puc-rio.br/~roberto/pil2/

 Lua 5.1 Reference Manual:
     Start/Programs/Lua/Documentation/Lua 5.1 Reference Manual

 Examples: Start/Programs/Lua/Examples
]]

```
