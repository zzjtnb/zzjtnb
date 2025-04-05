---
title: Lua基础教程
category: Lua
tags:
  - Lua
cover: https://h2.ioliu.cn/bing/ConneryPond_ZH-CN9900515488_800x480.jpg?imageslim
---

## Lua 基本语法

+ 单行注释

```lua
-- 单行注释内容
```

+ 多行注释

```lua
--[[
  多行注释
]]
--[[
多行注释
为了保持对应前可以再下面加上两个减号
--]]
```

+ 全局变量
在默认情况下，变量总是认为是全局的。
全局变量不需要声明，给一个变量赋值后即创建了这个全局变量，访问一个没有初始化的全局变量也不会出错，只不过得到的结果是：nil。

```lua
print(b)
b=10
print(b)
```

>nil
>10
>
## Lua 数据类型

+ 类型判断
我们可以使用 type 函数测试给定变量或者值的类型：

```lua
print(type('Hello world')) --> string
```

+ nil（空）
nil 类型表示一种没有任何有效值，它只有一个值 -- nil，例如打印一个没有赋值的变量，便会输出一个 nil 值：

```lua
print(type(a)) --> nil
```

nil 作比较时应该加上双引号 "：

```lua
type(X)=="nil" --> true
```

+ string（字符串）
字符串由一对双引号或单引号来表示。

```lua
string1 = "this is string1"
string2 = 'this is string2'
```

也可以用 2 个方括号 "[[]]" 来表示"一块"字符串。

```lua
test = [[
  Hello World
  Hello Lua
]]
print(test)
```

>Hello World
>Hello Lua

+ 字符串连接
字符串连接使用的是 x .. y

```lua
a = 'a'
b = 'b'
print(a .. b)
```

>ab

+ 字符串长度
使用 # 来计算字符串的长度，放在字符串前面，如下实例：

```lua
print(#'adfsdfdsfsdfsdf')
```

>15

+ table(表)
在 Lua 里，table 的创建是通过"构造表达式"来完成，最简单构造表达式是{}，用来创建一个空表。也可以在表里添加一些数据，直接初始化表:

```lua
-- 创建一个空的 table
local tbl1 = {}
-- 直接初始表
local tbl2 = {"apple", "pear", "orange", "grape"}
```

不同于其他语言的数组把 0 作为数组的初始索引，在 Lua 里表的默认初始索引一般以 1 开始。

```lua
local tbl2 = {'apple', 'pear', 'orange'}
print(tbl2[1])
```

>apple

```lua
local man = {name = '张三', age = 18}
print(man['name'])
print(man['age'])
```

>张三
>18

```lua
local man = {name = '张三', age = 18}
print(man[1])--这里不是下标,是key值
```

>nil

```lua
local man = {name = '张三', age = 18}
for key, value in pairs(man) do
  print(key .. ':' .. value)
end
```

>age:18
>name:张三

+ function（函数）
在 Lua 中，函数是被看作是"第一类值（First-Class Value）"，函数可以存在变量里:

```lua
function addNUM(v)
  print(v + v)
end
addNUM(5)
test = addNUM
test(1)
```

>10
>2

function 可以以匿名函数（anonymous function）的方式通过参数传递:

```lua
function kkk(tab, func)
  for key, value in pairs(tab) do
    func(key, value)
  end
end

tt = {red = 10, blue = 20}

kkk(
  tt,
  function(key1, value1)
    print(key1 .. value1)
  end
)

```

>blue20
>red10

```lua
local tab = {key1 = 'val1', key2 = 'val2'}
function testFun(tab, fun)
  for k, v in pairs(tab) do
    print(fun(k, v))
  end
end
--匿名函数
testFun(
  tab,
  function(key, val) --匿名函数
    return key .. '=' .. val
  end
)
```

>key1=val1
>key2=val2

## Lua 变量

变量在使用前，需要在代码中进行声明，即创建该变量。

编译程序执行代码之前编译器需要知道如何给语句变量开辟存储区，用于存储变量的值。

Lua 变量有三种类型：全局变量、局部变量、表中的域。

Lua 中的变量全是全局变量，那怕是语句块或是函数里，除非用 local 显式声明为局部变量。

局部变量的作用域为从声明位置开始到所在语句块结束。

变量的默认值均为 nil。

```lua
a = 5               -- 全局变量
local b = 5         -- 局部变量

function joke()
    c = 5           -- 全局变量
    local d = 6     -- 局部变量
end

joke()
print(c,d)          --> 5 nil

do
    local a = 6     -- 局部变量
    b = 6           -- 对局部变量重新赋值
    print(a,b);     --> 6 6
end

print(a,b)      --> 5 6
```

## 赋值语句

赋值是改变一个变量的值和改变表域的最基本的方法。
Lua 可以对多个变量同时赋值，变量列表和值列表的各个元素用逗号分开，赋值语句右边的值会依次赋给左边的变量。

```lua
a, b = 10, 2*x   
--上面的同下面的写法
a=10;
b=2*x
```

遇到赋值语句 Lua 会先计算右边所有的值然后再执行赋值操作，所以我们可以这样进行交换变量的值：

```lua
x, y = y, x                     -- swap 'x' for 'y'
a[i], a[j] = a[j], a[i]         -- swap 'a[i]' for 'a[j]'
```

当变量个数和值的个数不一致时，Lua 会一直以变量个数为基础采取以下策略：

>a. 变量个数 > 值的个数             按变量个数补足 nil
>b. 变量个数 < 值的个数             多余的值会被忽略

实例

```lua
a, b, c = 0, 1
print(a,b,c)             --> 0   1   nil
 
a, b = a+1, b+1, b+2     -- value of b+2 is ignored
print(a,b)               --> 1   2
 
a, b, c = 0
print(a,b,c)             --> 0   nil   nil
```

上面最后一个例子是一个常见的错误情况，注意：如果要对多个变量赋值必须依次对每个变量赋值。

```lua
a, b, c = 0, 0, 0
print(a,b,c)             --> 0   0   0
```

多值赋值经常用来交换变量，或将函数调用返回给变量：

```lua
a, b = f()
```

f()返回两个值，第一个赋给 a，第二个赋给 b。

应该尽可能的使用局部变量，有两个好处：

1. 避免命名冲突。
2. 访问局部变量的速度比全局变量更快。

Lua 对多个变量同时赋值，不会进行变量传递，仅做值传递：

```lua
a, b = 0, 1
a, b = a+1, a+1
print(a,b)               --> 1   1
a, b = 0, 1
a, b = b+1, b+1
print(a,b)               --> 2   2
a, b = 0, 1
a = a+1
b = a+1
print(a,b)               --> 1   2
```

## 索引

对 table 的索引使用方括号 []。Lua 也提供了 . 操作。

```lua
t[i]
t.i                 -- 当索引为字符串类型时的一种简化写法
gettable_event(t,i) -- 采用索引访问本质上是一个类似这样的函数调用
```

实例

```lua
site = {}
site["key"] = "哈哈哈"
print(site["key"])
print(site.key)
```

>哈哈哈
>哈哈哈

## Lua 循环

+ while 循环

```lua
a = 10
while (a < 20) do
  print('a 的值为:', a)
  a = a + 1
end
```

+ for 循环
数值 for 循环

```lua
function f(x)
  print('function')
  return x * 2
end
for i = 1, f(5) do
  print(i)
end
```

函数 f(x)只在循环开始前执行一次。

+ 泛型 for 循环
泛型 for 循环通过一个迭代器函数来遍历所有值，类似 java 中的 foreach 语句。
Lua 编程语言中泛型 for 循环语法格式:

```lua
--打印数组a的所有值  
a = {"one", "two", "three"}
for i, v in ipairs(a) do
    print(i, v)
end 
```

i 是数组索引值，v 是对应索引的数组元素值。ipairs 是 Lua 提供的一个迭代器函数，用来迭代数组。

```lua
--循环数组 days：
days = {'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'}
for i, v in ipairs(days) do
  print(v)
end
```

+ repeat...until 循环

```lua
--[ 变量定义 --]
a = 10
--[ 执行循环 --]
repeat
   print("a的值为:", a)
   a = a + 1
until( a > 15 )
```

## Lua 流程控制

+ if 语句

控制结构的条件表达式结果可以是任何值，Lua 认为 false 和 nil 为假，true 和非 nil 为真。

要注意的是 Lua 中 0 为 true：

```lua
--[ 0 为 true ]
if(0)
then
    print("0 为 true")
end
```

+ if...else 语句

```lua
--[ 定义变量 --]
a = 100
--[ 检查条件 --]
if (a < 20) then
  --[ if 条件为 true 时执行该语句块 --]
  print('a 小于 20')
else
  --[ if 条件为 false 时执行该语句块 --]
  print('a 大于 20')
end
print('a 的值为 :', a)
```

+ if...elseif...else 语句

```lua
--[ 定义变量 --]
a = 100
--[ 检查布尔条件 --]
if (a == 10) then
  --[ 如果条件为 true 打印以下信息 --]
  print('a 的值为 10')
elseif (a == 20) then
  --[ if else if 条件为 true 时打印以下信息 --]
  print('a 的值为 20')
elseif (a == 30) then
  --[ if else if condition 条件为 true 时打印以下信息 --]
  print('a 的值为 30')
else
  --[ 以上条件语句没有一个为 true 时打印以下信息 --]
  print('没有匹配 a 的值')
end
print('a 的真实值为: ', a)
```

## Lua 函数

```lua
--[[ 函数返回两个值的最大值 --]]
function max(num1, num2)

   if (num1 > num2) then
      result = num1;
   else
      result = num2;
   end

   return result;
end
-- 调用函数
print("两值比较最大值为 ",max(10,4))
print("两值比较最大值为 ",max(5,6))
```

+ Lua 中我们可以将函数作为参数传递给函数

```lua
myprint = function(param)
   print("这是打印函数 -   ##",param,"##")
end
function add(num1,num2,functionPrint)
   result = num1 + num2
   -- 调用传递的函数参数
   functionPrint(result)
end
myprint(10)
-- myprint 函数作为参数传递
add(2,5,myprint)
```

+ 多返回值
Lua 函数中，在 return 后列出要返回的值的列表即可返回多值

```lua
function maximum (a)
    local mi = 1             -- 最大值索引
    local m = a[mi]          -- 最大值
    for i,val in ipairs(a) do
       if val > m then
           mi = i
           m = val
       end
    end
    return m, mi
end

print(maximum({8,10,23,12,5}))
```

+ 可变参数
Lua 函数可以接受可变数目的参数，和 C 语言类似，在函数参数列表中使用三点 ... 表示函数有可变的参数。

```lua
function average(...)
   result = 0
   local arg={...}    --> arg 为一个表，局部变量
   for i,v in ipairs(arg) do
      result = result + v
   end
   print("总共传入 " .. #arg .. " 个数")
   return result/#arg
end

print("平均值为",average(10,5,3,4,5,6))
```

我们也可以通过 select("#",...) 来获取可变参数的数量:

```lua
function average(...)
   result = 0
   local arg={...}
   for i,v in ipairs(arg) do
      result = result + v
   end
   print("总共传入 " .. select("#",...) .. " 个数")
   return result/select("#",...)
end

print("平均值为",average(10,5,3,4,5,6))
```

固定参数加上可变参数，固定参数必须放在变长参数之前:

```lua
function fwrite(fmt, ...)  ---> 固定的参数fmt
    return io.write(string.format(fmt, ...))    
end

fwrite("runoob\n")       --->fmt = "runoob", 没有变长参数。  
fwrite("%d%d\n", 1, 2)   --->fmt = "%d%d", 变长参数为 1 和 2
```

通常在遍历变长参数的时候只需要使用 {…}，然而变长参数可能会包含一些 nil，那么就可以用 select 函数来访问变长参数了：select('#', …) 或者 select(n, …)

+ select('#', …) 返回可变参数的长度
+ select(n, …) 用于返回 n 到 select('#',…) 的参数

调用 select 时，必须传入一个固定实参 selector(选择开关) 和一系列变长参数。如果 selector 为数字 n，那么 select 返回 n 后所有的参数，否则只能为字符串 #，这样 select 返回变长参数的总数。

```lua
do  
    function foo(...)  
        for i = 1, select('#', ...) do  -->获取参数总数
            local arg = select(i, ...); -->读取参数
            print("arg", arg);  
        end  
    end  
 
    foo(1, 2, 3, 4);  
end
```

## Lua 字符串

字符串或串(String)是由数字、字母、下划线组成的一串字符。
Lua 语言中字符串可以使用以下三种方式来表示：

+ 单引号间的一串字符。
+ 双引号间的一串字符。
+ \[[ 与 ]] 间的一串字符。

以上三种方式的字符串实例如下：

```lua
string1 = "Lua"
print("\"字符串 1 是\"",string1)
string2 = 'runoob.com'
print("字符串 2 是",string2)

string3 = [["Lua 教程"]]
print("字符串 3 是",string3)
```

## 字符串操作

+ string.format(...)
返回一个类似 printf 的格式化字符串

```lua
print(string.format('the value is:%d', 4))
```

+ string.len(arg)
计算字符串长度。

```lua
print(string.len('abc'))
```

+ ..
链接两个字符串

```lua
print(print('www.zzjtnb.' .. 'com'))
```

## Lua 数组

数组，就是相同数据类型的元素按一定顺序排列的集合，可以是一维数组和多维数组。
Lua 数组的索引键值可以使用整数表示，数组的大小不是固定的。

## 一维数组

一维数组是最简单的数组，其逻辑结构是线性表。一维数组可以用 for 循环出数组中的元素，如下实例：

```lua
array = {"Lua", "Tutorial"}
for i= 0, 2 do
   print(array[i])
end
```

```lua
table = {'Alan', 'red', 'blue'}
for i = 1, 3, 1 do
  print(table[i])
end
```

```lua
table = {}
for i = -2, 2, 1 do
  table[i] = i
end

for i = -2, 2, 1 do
  print(table[i])
end
```

## 多维数组

多维数组即数组中包含数组或一维数组的索引键对应一个数组。

+ 二维数组每一个元素都是一个表

```lua
array = {}
for i = 1, 3, 1 do
  array[i] = {}
  for j = 1, 3, 1 do
    array[i][j] = i * j
  end
end

for i = 1, 3, 1 do
  for j = 1, 3, 1 do
    print(array[i][j])
  end
end

```

+ 一个三行三列的阵列多维数组：

```lua
-- 初始化数组
array = {}
for i=1,3 do
   array[i] = {}
      for j=1,3 do
         array[i][j] = i*j
      end
end

-- 访问数组
for i=1,3 do
   for j=1,3 do
      print(array[i][j])
   end
end
```

+ 不同索引键的三行三列阵列多维数组：

```lua
-- 初始化数组
array = {}
maxRows = 3
maxColumns = 3
for row=1,maxRows do
   for col=1,maxColumns do
      array[row*maxColumns +col] = row*col
   end
end

-- 访问数组
for row=1,maxRows do
   for col=1,maxColumns do
      print(array[row*maxColumns +col])
   end
end
```

以上的实例中，数组设定了指定的索引值，这样可以避免出现 nil 值，有利于节省内存空间。

## Lua table(表)

table 是 Lua 的一种数据结构用来帮助我们创建不同的数据类型，如：数组、字典等。

Lua table 使用关联型数组，你可以用任意类型的值来作数组的索引，但这个值不能是 nil。

Lua table 是不固定大小的，你可以根据自己需要进行扩容。

Lua 也是通过 table 来解决模块（module）、包（package）和对象（Object）的。 例如 string.format 表示使用"format"来索引 table string。

```lua
tt = {}
tt[1] = 10
tt['ww'] = 'abc'
print(tt[1], tt['ww'])
tt2 = tt
print(tt2[1], tt['ww'])
tt2[1] = 99
print(tt[1], tt['ww'])
print(tt2[1], tt2['ww'])
tt = nil
--print(tt[1], tt['ww']) --不能访问
print(tt2[1], tt2['ww']) --可以访问

```

## table(表)的构造

构造器是创建和初始化表的表达式。表是 Lua 特有的功能强大的东西。最简单的构造函数是{}，用来创建一个空表。可以直接初始化数组:

```lua
-- 初始化表
mytable = {}

-- 指定值
mytable[1]= "Lua"

-- 移除引用
mytable = nil
-- lua 垃圾回收会释放内存
```

当我们为 table a 并设置元素，然后将 a 赋值给 b，则 a 与 b 都指向同一个内存。如果 a 设置为 nil ，则 b 同样能访问 table 的元素。如果没有指定的变量指向 a，Lua 的垃圾回收机制会清理相对应的内存。

```lua
-- 简单的 table
mytable = {}
print("mytable 的类型是 ",type(mytable))

mytable[1]= "Lua"
mytable["wow"] = "修改前"
print("mytable 索引为 1 的元素是 ", mytable[1])
print("mytable 索引为 wow 的元素是 ", mytable["wow"])

-- alternatetable和mytable的是指同一个 table
alternatetable = mytable

print("alternatetable 索引为 1 的元素是 ", alternatetable[1])
print("mytable 索引为 wow 的元素是 ", alternatetable["wow"])

alternatetable["wow"] = "修改后"

print("mytable 索引为 wow 的元素是 ", mytable["wow"])

-- 释放变量
alternatetable = nil
print("alternatetable 是 ", alternatetable)

-- mytable 仍然可以访问
print("mytable 索引为 wow 的元素是 ", mytable["wow"])

mytable = nil
print("mytable 是 ", mytable)
```

## Table 操作

+ Table 连接

```lua
tt = {'Alan', 'Red', 'Blue'}
print(table.concat(tt)) -->AlanRedBlue
print(table.concat(tt, ',')) -->Alan,Red,Blue
print(table.concat(tt, ',', 2, 3)) -->Red,Blue
```

+ 插入和移除

```lua
fruits = {"banana","orange","apple"}
-- 在末尾插入
table.insert(fruits,"mango")
print("索引为 4 的元素为 ",fruits[4])

-- 在索引为 2 的键处插入
table.insert(fruits,2,"grapes")
print("索引为 2 的元素为 ",fruits[2])

print("最后一个元素为 ",fruits[5])
table.remove(fruits)
print("移除后最后一个元素为 ",fruits[5])
```

+ Table 排序

```lua
fruits = {"banana","orange","apple","grapes"}
print("排序前")
for k,v in ipairs(fruits) do
  print(k,v)
end

table.sort(fruits)
print("排序后")
for k,v in ipairs(fruits) do
  print(k,v)
end
```

## Lua 模块与包

模块类似于一个封装库，从 Lua 5.1 开始，Lua 加入了标准的模块管理机制，可以把一些公用的代码放在一个文件里，以 API 接口的形式在其他地方调用，有利于代码的重用和降低代码耦合度。

Lua 的模块是由变量、函数等已知元素组成的 table，因此创建一个模块很简单，就是创建一个 table，然后把需要导出的常量、函数放入其中，最后返回这个 table 就行。以下为创建自定义模块 module.lua，文件代码格式如下：

```lua
-- 文件名为 module.lua
-- 定义一个名为 module 的模块
module = {}

-- 定义一个常量
module.constant = '这是一个常量'

-- 定义一个函数
function module.func1()
  io.write('这是一个公有函数！\n')
end

local function func2()
  print('这是一个私有函数！')
end

function module.func3()
  func2()
end
return module
```

由上可知，模块的结构就是一个 table 的结构，因此可以像操作调用 table 里的元素那样来操作调用模块里的常量或函数。

上面的 func2 声明为程序块的局部变量，即表示一个私有函数，因此是不能从外部访问模块里的这个私有函数，必须通过模块里的公有函数来调用.

## require 函数

Lua 提供了一个名为 require 的函数用来加载模块。要加载一个模块，只需要简单地调用就可以了。例如：

```lua
require("<模块名>")
```

或者

```lua
require "<模块名>"
```

执行 require 后会返回一个由模块常量或函数组成的 table，并且还会定义一个包含该 table 的全局变量。
test_module.lua 文件

```lua
-- test_module.lua 文件
-- module 模块为上文提到到 module.lua
require("module")
print(module.constant)-->这是一个常量
module.func3()-->这是一个私有函数！
```

或者给加载的模块定义一个别名变量，方便调用：
test_module2.lua 文件

```lua
-- test_module2.lua 文件
-- module 模块为上文提到到 module.lua
-- 别名变量 m
local m = require("module")
print(m.constant)-->这是一个常量
m.func3()-->这是一个私有函数！
```

## Lua 元表(Metatable)

通过原表改变表的行为(加减乘除查找)

```lua
tt = {}
mymetatable = {}
print(mymetatable) -->table: 00000281029FAB40
--设置原表
setmetatable(tt, mymetatable)
--获取原表
print(getmetatable(tt)) -->table: 00000281029FAB40
```

```lua
tt = {'Red'}
print(tt[1]) -->Red
print(tt[kkk]) -->nil
mymetatable = {
  --__index(元方法)
  __index = function(tab, key)
    if (key == 'kkk') then
      return '12345'
    end
  end,
  --__newindex (新增值的元方法)
  __newindex = function(tab, key, value)
    rawset(tab, key, '--' .. value .. '--')
  end,
  __add = function(tab1, tab2)
    table.insert(tab1, tab2[1])
    return tab1
  end
}
setmetatable(tt, mymetatable)
print(tt['kkk']) -->12345

tt['WW'] = 'abc'
print(tt[1], tt['WW']) -->Red --abc--

yy = {'Yellow'}
tt = tt + yy
print(tt[1], tt[2]) -->Red --Yellow--
```

>如果没设置元表的话他就在本身找,找不到就返回 nil(空值),如果有元表,他会先在普通表找,找不到就会在普通表设置的元表找,找__index 所对应的方法(也可以是其它)
在 Lua table 中我们可以访问对应的 key 来得到 value 值，但是却无法对两个 table 进行操作。

因此 Lua 提供了元表(Metatable)，允许我们改变 table 的行为，每个行为关联了对应的元方法。

例如，使用元表我们可以定义 Lua 如何计算两个 table 的相加操作 a+b。

当 Lua 试图对两个表进行相加时，先检查两者之一是否有元表，之后检查是否有一个叫"__add"的字段，若找到，则调用对应的值。"__add"等即时字段，其对应的值（往往是一个函数或是 table）就是"元方法"。

有两个很重要的函数来处理元表：

+ setmetatable(table,metatable): 对指定 table 设置元表(metatable)，如果元表(metatable)中存在 __metatable 键值，setmetatable 会失败。
+ getmetatable(table): 返回对象的元表(metatable)。
以下实例演示了如何对指定的表设置元表：

```lua
mytable = {}                          -- 普通表
mymetatable = {}                      -- 元表
setmetatable(mytable,mymetatable)     -- 把 mymetatable 设为 mytable 的元表
```

以上代码也可以直接写成一行：

```lua
mytable = setmetatable({},{})
```

以下为返回对象元表：

```lua
getmetatable(mytable)                 -- 这回返回mymetatable
```

## __index

这是 metatable 最常用的键。

当你通过键来访问 table 的时候，如果这个键没有值，那么 Lua 就会寻找该 table 的 metatable（假定有 metatable）中的__index 键。如果__index 包含一个表格，Lua 会在表格中查找相应的键。
如果__index 包含一个函数的话，Lua 就会调用那个函数，table 和键会作为参数传递给函数。
__index 元方法查看表中元素是否存在，如果不存在，返回结果为 nil；如果存在则由 __index 返回结果。

```lua
mytable = setmetatable({key1 = "value1"}, {
  __index = function(mytable, key)
    if key == "key2" then
      return "metatablevalue"
    else
      return nil
    end
  end
})

print(mytable.key1,mytable.key2)
```

实例解析：

+ mytable 表赋值为 {key1 = "value1"}。

+ mytable 设置了元表，元方法为 __index。

+ 在 mytable 表中查找 key1，如果找到，返回该元素，找不到则继续。

+ 在 mytable 表中查找 key2，如果找到，返回 metatablevalue，找不到则继续。

+ 判断元表有没有__index 方法，如果__index 方法是一个函数，则调用该函数。

+ 元方法中查看是否传入 "key2" 键的参数（mytable.key2 已设置），如果传入 "key2" 参数返回 "metatablevalue"，否则返回 mytable 对应的键值。
我们可以将以上代码简单写成：

```lua
mytable = setmetatable({key1 = "value1"}, { __index = { key2 = "metatablevalue" } })
print(mytable.key1,mytable.key2)
```

#### 总结

Lua 查找一个表元素时的规则，其实就是如下 3 个步骤:

+ 1.在表中查找，如果找到，返回该元素，找不到则继续
+ 2.判断该表是否有元表，如果没有元表，返回 nil，有元表则继续。
+ 3.判断元表有没有 __index 方法，如果__index 方法为 nil，则返回 nil；如果 __index 方法是一个表，则重复 1、2、3；如果__index 方法是一个函数，则返回该函数的返回值。
该部分内容来自作者寰子：<https://blog.csdn.net/xocoder/article/details/9028347>

## __newindex 元方法

__newindex 元方法用来对表更新，__index 则用来对表访问 。

当你给表的一个缺少的索引赋值，解释器就会查找__newindex 元方法：如果存在则调用这个函数而不进行赋值操作。

以下实例演示了 __newindex 元方法的应用：

```lua
mymetatable = {}
mytable = setmetatable({key1 = "value1"}, { __newindex = mymetatable })

print(mytable.key1)

mytable.newkey = "新值2"
print(mytable.newkey,mymetatable.newkey)

mytable.key1 = "新值1"
print(mytable.key1,mymetatable.key1)
```

以上实例中表设置了元方法 __newindex，在对新索引键（newkey）赋值时（mytable.newkey = "新值 2"），会调用元方法，而不进行赋值。而如果对已存在的索引键（key1），则会进行赋值，而不调用元方法__newindex。

以下实例使用了 rawset 函数来更新表：

```lua
mytable = setmetatable({key1 = "value1"}, {
  __newindex = function(mytable, key, value)
                rawset(mytable, key, "\""..value.."\"")

  end
})

mytable.key1 = "new value"
mytable.key2 = 4

print(mytable.key1,mytable.key2)
```

## 为表添加操作符

以下实例演示了两表相加操作：

```lua
-- 计算表中最大值，table.maxn在Lua5.2以上版本中已无法使用
-- 自定义计算表中最大键值函数 table_maxn，即计算表的元素个数
function table_maxn(t)
    local mn = 0
    for k, v in pairs(t) do
        if mn < k then
            mn = k
        end
    end
    return mn
end

-- 两表相加操作
mytable = setmetatable({ 1, 2, 3 }, {
  __add = function(mytable, newtable)
    for i = 1, table_maxn(newtable) do
      table.insert(mytable, table_maxn(mytable)+1,newtable[i])
    end
    return mytable
  end
})

secondtable = {4,5,6}

mytable = mytable + secondtable
        for k,v in ipairs(mytable) do
print(k,v)
end
```

__add 键包含在元表中，并进行相加操作。 表中对应的操作列表如下：(注意：__是两个下划线)

## Lua 类的建立

```lua
--定义一个类初始化两个属性
Person = {
  name = '',
  age = 0
}
function Person.setValue(self, _name, _age) --类包含的方法
  self.name = _name
  self.age = _age
end
function Person.getValue(self)
  return self.name, self.age
end
--局部变量
local t = Person --实例化对象
t.setValue(t, '张三', 18) --调用对象的方法

local n, a = t.getValue(t)
print(n, a)
```

## ":"与"."的区别

```lua
tt = {name = '张三'}
function tt.showValue(self)
  print(self.name)
end
tt.showValue(tt) -->张三

function tt:getValue()
  print(self.name)
end
tt:getValue() -->张三

```

**"."属于对象方法,需要传入自己本身**
**":"属于类的静态方法默认传入自己本身**

## 类的继承与扩展

## 第一种

```lua
fruits = {price = 10} --父类
function fruits:new(o)
  o = o or {}
  setmetatable(o, self) --o有个元表是self
  self.__index = self
  return o
end
function fruits:addPrice(_price)
  self.price = self.price + _price
end
apple = fruits:new({}) --apple继承fruits
print(fruits, apple) -->table: 000002C86DC7C950 table: 000002C86DC7D350
--apple和fruits是不同表,apple指向空表,fruits是上面定义的frutis表
print(apple.price) -->10
apple = fruits.new(apple, {})
print(apple.price) -->10
apple:addPrice(33)
print(apple.price) -->43

--子类建立自己的方法(类的扩展)
function apple.buy(_price)
  print('this is buy', _price)
end
apple.buy(99) -->this is buy 99

```

## 第二种

```lua
fruits = {price = 10} --父类
function fruits.new(self, o)
  o = o or {}
  setmetatable(o, self) --o有个元表是self
  self.__index = self
  return o
end
function fruits:addPrice(_price)
  self.price = _price + _price
end
apple = fruits:new({}) --apple继承fruits
print(fruits, apple) -->table: 000002C86DC7C950 table: 000002C86DC7D350
--apple和fruits是不同表,apple指向空表,fruits是上面定义的frutis表
print(apple.price) -->10
apple = fruits.new(apple, {})
print(apple.price) -->10
apple:addPrice(33)
print(apple.price) -->43

--子类建立自己的方法(类的扩展)
function apple.buy(_price)
  print('this is buy', _price)
end
apple.buy(99) -->this is buy 99
```
