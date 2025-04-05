---
title: Lua string用法大全
category: Lua
tags:
  - Lua
cover: https://cdn.pixabay.com/photo/2020/10/17/10/51/mountains-5661718_960_720.jpg
---

## 一 、基础字符串函数
>
> string.len(str)  -- 获得字符串的长度
> string.rep(str, n) -- 返回字符串重复 n 次的结果
> string.lower(str) -- 小写
> string.upper(str) -- 大写
> string.char(i, i + 1, i + 2) — 整数转换字符,返回一个由这些字符连接而成的字符串
> string.byte(s, i) --  返回字符串 s 中第 i 个字符的内部数值表示
  >string.reverse(str) --   返回一个字符串的倒序排列
  >string.sub(s, i, j)  --  从字符串 s 中提取第 i 个到第 j 个字符
> (索引 1 开始,负数表示从尾部开始计数,第三个参数缺省 - 1 代表字符串的最后一个字符)
> (重点:在 Lua 中,字符串和其它语言的一样,是不可变的,以上的操作,都会返回一个新的值,但并不会修改原来的字符串.)

``` lua
print(string.char(97)) -- a
local i = 98
print(string.char(i, i + 1, i + 2)) -- bcd
print(string.byte("abc")) -- 97  第二个参数缺省,返回第一个字符的内部数值表示
print(string.byte("abc", 2, 3)) -- 98 99
print(string.byte("abc", -1)) -- 99
--要想重新转换成字符串的话
t = {s.byte(1, -1}
string.char(unpack(t))
```

## string.format()

我们知道 lua 中可以用 ".." 连接字符串,可以起到一部分格式化字符串的作用,但是如果字符串较长或者有特殊的格式转换操作 (如十六进制转换),用 ".." 就会很繁琐且可读性差.用 string.format() 就是一个很好的解决方案.

函数定义 string.format() 第一个参数为字符串格式,后面的参数可以任意多个,用于填充第一个参数中的格式控制符,最后返回完整的格式化后的字符串.

 **格式控制符**以 % 开头,常用的有以下几种

> %s    -  接受一个字符串并按照给定的参数格式化该字符串
> %d    - 接受一个数字并将其转化为有符号的整数格式
> %f    -  接受一个数字并将其转化为浮点数格式 (小数),默认保留 6 位小数,不足位用 0 填充
> %x    - 接受一个数字并将其转化为小写的十六进制格式
> %X    - 接受一个数字并将其转化为大写的十六进制格式

``` lua
str = string.format("字符串:%s\n整数:%d\n小数:%f\n十六进制数:%X","qweqwe",1,0.13,348)
print(str)

-- 输出结果:
字符串:qweqwe
整数:1
小数:0.130000
十六进制数:15C
```

## %X 的特殊用法

**

%08X       中间的第 2 个数字格式化成多少位,第 1 个数字表示不足位数时的填充数,通常用 0 填充.

``` lua
str = string.format("0x%08X",348)
print(str)
-- 0x0000015C
-- 前面的0x只是个普通的字符串,可有可无,因为我们一般在十六进制数前面加上0x来表明这是一个十六进制数,所以这里才加了个0x,没有其他特殊意义.
```

%x 的特殊用法与 %X 一样

**%f 的特殊用法**
%0.3f      中的小数点右边的数字表示小数点后面保留多少位,小数点前面的数字表示位数不足时的填充数,通用用 0 填充.
格式化一个小数,保留 2 位小数

``` lua
print(string.format("%0.2f", 34.2344))
--34.23  
```

## 更多用法

**

> %c - 接受一个数字, 并将其转化为 ASCII 码表中对应的字符
> %d, %i - 接受一个数字并将其转化为有符号的整数格式
> %o - 接受一个数字并将其转化为八进制数格式
> %u - 接受一个数字并将其转化为无符号整数格式
> %x - 接受一个数字并将其转化为十六进制数格式, 使用小写字母
> %X - 接受一个数字并将其转化为十六进制数格式, 使用大写字母
> %e - 接受一个数字并将其转化为科学记数法格式, 使用小写字母 e
> %E - 接受一个数字并将其转化为科学记数法格式, 使用大写字母 E
> %f - 接受一个数字并将其转化为浮点数格式
> %g(%G) - 接受一个数字并将其转化为 %e(%E, 对应 %G) 及 %f 中较短的一种格式
> %q - 接受一个字符串并将其转化为可安全被 Lua 编译器读入的格式
> %s - 接受一个字符串并按照给定的参数格式化该字符串

为进一步细化格式, 可以在 % 号后添加参数. 参数将以如下的顺序读入:

1. 符号: 一个 + 号表示其后的数字转义符将让正数显示正号. 默认情况下只有负数显示符号.
2. 占位符: 一个 0, 在后面指定了字串宽度时占位用. 不填时的默认占位符是空格.
3. 对齐标识: 在指定了字串宽度时, 默认为右对齐, 增加 - 号可以改为左对齐.
4. 宽度数值
5. 小数位数 / 字串裁切: 在宽度数值后增加的小数部分 n, 若后接 f(浮点数转义符, 如 %6.3f) 则设定该浮点数的小数只保留 n 位, 若后接 s(字符串转义符, 如 %5.3s) 则设定该字符串只显示前 n 位.

在这些参数的后面则是上述所列的转义码类型 (c, d, i, f, ...).

``` lua
string.format("%%c: %c", 83)            --输出S
string.format("%+d", 17.0)              --输出+17
string.format("%05d", 17)               --输出00017
string.format("%o", 17)                 --输出21
string.format("%u", 3.14)               --输出3
string.format("%x", 13)                 --输出d
string.format("%X", 13)                 --输出D
string.format("%e", 1000)               --输出1.000000e+03
string.format("%E", 1000)               --输出1.000000E+03
string.format("%6.3f", 13)              --输出13.000
string.format("%q", "One\nTwo")         --输出"One    Two"
string.format("%s", "monkey")           --输出monkey
string.format("%10s", "monkey")         --输出    monkey
string.format("%5.3s", "monkey")        --输出  mon
```

## 二、 模式匹配函数

>find:字符串查找,返回起始和结束位置
>match:返回匹配字符串
>gsub:全局字符串替换,将 s 中所有符合 pattern 的字串替换为 reps,返回结果串 + 匹配数
>gfind:全局字符串查找,返回一个迭代器,迭代器每执行一次,返回下一个匹配串
>gmatch:返回查找到字符串的迭代器

### string.find(str, pattern, init, plain)

将查找目标模板在给定字符串中出现的位置,找到返回起始和结束位置,没找到返回 nil.

>str:源字符串
>pattern:待搜索模式串
>init:可选,起始位置
>plain:我没用过

``` lua
--① 子串匹配:
print(string.find("haha", 'ah') )  ----- 输出 2 3

--用一个字符串中所有的新行构造一个表
local t = {}      -- 存放回车符的位置
local i = 0
while true do
    i = string.find(s, "\n", i+1)  -- 查找下一行
    if i == nil then break end
    table.insert(t, i)
end

--② 模式匹配:
s = "Deadline is 30/05/1999, firm"
date = "%d%d/%d%d/%d%d%d%d"
print(string.sub(s, string.find(s, date))) --> 30/05/1999

pair = " name = Anna "
print(string.find(pair, "(%a+)%s*=%s*(%a+)") ---- 输出 2 12 name Anna

```

解释:
  如果 find 的第二个参数使用了某种匹配模式,并且模式串里面带括号. 那么表示会“捕捉”括号括起来的模式匹配到的字符串. 捕捉,当然会把他们作为返回值.这里捕捉了两下,所以 find 多返回了两个值

### string.match(str, pattern, init)

只寻找源字串 str 中的第一个配对. 参数 init 可选, 指定搜寻过程的起点, 默认为 1

在成功配对时, 函数将返回配对表达式中的所有捕获结果; 如果没有设置捕获标记, 则返回整个配对字符串. 当没有成功的配对时, 返回 nil.

``` lua
print(string.match("hello,world","hello")) --> hello
date = "now is 2014/10/6 17:58"
d = string.match(date, "%d+/%d+/%d+")
print(d)   --> 2014/10/6
```

### string.gsub(s, pattern, reps, n)
>
>将 s 中所有符合 pattern 的字串替换为 reps,返回结果串 + 匹配数
>第 1 个参数:源字符串
>第 2 个参数:待替换之模式串
>第 3 个参数:替换为 reps.可以是 string,也可以是函数,用捕获的内容作为参数调用该函数,将返回的内容作为替换字符串,也可以是 table,用捕获的内容为 key 去取 table 的值来作为替换字符串, 如果不存在,就不做替换.
>第 4 个参数:可选,当它被指定时, string.gsub() 函数只对源字符串中的前 n 个成功配对的成员进行操作.

``` lua
print(string.gsub("hello, world", "o", "a"))    -- hella, warld        2

print(string.gsub("all lii", "l", "x", 2))    --  axx lii

_, count = string.gsub(str, " ", " ")  --计算一个字符串中空格出现的次数

print(string.gsub("hello Lua", "(%w+)%s*(%w+)", "%2 %1"))  -- Lua hello 1

string.gsub("hello world", "%w+", print)  -- hello world 2

s, n = string.gsub("hello world", "l+", function(s) return "xxx" end)
print(s, n) -- hexxxo worxxxd 2

lookupTable = {["hello"] = "hola", ["world"] = "mundo"}
print(string.gsub("hello world", "(%w+)", lookupTable))   -- hola mundo 2
```

### string.gfind(s, pattern)

返回一个迭代器,迭代器每执行一次,返回下一个匹配串

``` lua
iter = string.gfind("a=b c=d", "[^%s+]=[^%s+]")
print(iter()) -- a=b
print(iter()) -- c=d

-- 通常用于泛性for循环,下面的例子结果同上:
for s in string.gfind("a=b c=d", "[^%s+]=[^%s+]") do
print(s)
end
```

### string.gmatch

函数将返回一个迭代器,用于迭代所有出现在给定字符串中的匹配字符串.

``` lua
local s = "hello world from Lua"
for w in string.gmatch(s,"%a+") do
 print(w)
end

-- 这里是一个捕获并将配对字符分别存到不同变量的例子:
t = {}
s = "from=world, to=Lua"
for k, v in string.gmatch(s, "(%w+)=(%w+)") do
　t[k]=v
end
for k, v in pairs(t) do
　print(k, v)
end
```

## 三、模式匹配

与其他脚本语言不同的是,Lua 并不使用 POSIX 规范的正则表达式(也写作 regexp)来进行模式匹配.

#### **Lua 支持的所有字符类**

> . 任意字符
>%s 空白符
>%p 标点字符
>%c 控制字符, 例如 \ n
>%d 数字
>%x 十六进制数字
>%z 代表 0 的字符
>%a 字母
>%l 小写字母
>%u 大写字母
>%w 字母和数字

上面字符类的大写形式表示小写所代表的集合的补集.例如,'%A'非字母的字符

#### **模式串中的特殊字符:**

>( ) . % + - * ? [ ^ $
>% 用作特殊字符的转义字符
>%. 匹配点
>%% 匹配字符 %.

转义字符 % 不仅可以用来转义特殊字符,还可以用于所有的非字母的字符.当对一个字符有疑问的时候,为安全起见请使用转义字符转义他.

### **用[]创建字符集:**

1. 不同的字符类,和单字符之间用 []

>[%w_] 匹配字母数字和下划线
>[01] 匹配二进制数字
>[%[%]]匹配一对方括号

2. 要想字符集内包含字符区间,起止之间加上 -

>[0-9] ==  %d
>[0-9a-fA-F] ==  %x
>[0-7] ==  [01234567]

3. 如果想得到该字符集的互补, 前面加上 ^

>[^0-7] 匹配任何不是八进制数字的字符；
>[^\n] 匹配任何非换行符户的字符.
>[^%s] == %S

#### 模式修饰符

* 匹配前一字符 1 次或多次

* 匹配前一字符 0 次或多次; 最长匹配

* 匹配前一字符 0 次或多次; 最短匹配

? 匹配前一字符 0 次或 1 次

^ 匹配字符串开头

$ 匹配字符串结尾

#### 捕获:用 () 将要捕获的部分包围起来

``` lua
pair = "name = Anna"
firstidx, lastidx, key, value = string.find(pair, "(%a+)%s*=%s*(%a+)")
print(key, value) <== name Anna
```

我们也可以将捕获用于模式串自身, **([\"'])(.-)%1**, 这里的 **%1**表示匹配第一个捕获的一份拷贝.

#### 拷贝捕获 (%1-%9)

``` lua
s = "abc \"it\'s a cat\""
_,_,_,q = string.find(s, "([\"'])(.-)%1"))
print(q) -- it's a cat 如果%d代表第几个捕获的拷贝.

-- gsub也可以用拷贝捕获技巧
print(string.gsub("hello, world", "(o)", "%1-%1")) <== hello-o, wo-orld    2
print(string.gsub("hello Lua", "(.)(.)", "%2%1")) <== ehll ouLa           4
function trim (s) return (string.gsub(s, "^%s*(.-)%s*$", "%1")) end -- 注意匹配数用括号丢弃
```

#### 例子

检查字符串 **s** 是否以数字开头

```lua
if string.find(s, "^%d") then
print('xxx')
end
```

检查字符串 **s** 是否是一个整数

```lua
if string.find(s, "^[+-]?%d+$") then
print('xxx')
end
```

**%b** 用来匹配对称的字符.常写为 **%bxy** , **x** 和 **y** 是任意两个不同的字符, **x** 作为匹配的开始,**y** 作为匹配的结束.

比如,**%b()** 匹配以 **(' 开始,以 ')** 结束的字符串:

``` lua
print(string.gsub("a (enclosed (in) parentheses) line", "%b()", ""))
-- a line
```

常用的这种模式有:**%b(), %b[], %b%{%} 和 %b<>**.你也可以使用任何字符作为分隔符
