---
title: Lua的全局变量与非全局环境
category: Lua
tags:
  - Lua
cover: https://cdn.pixabay.com/photo/2021/01/10/12/00/road-5904909_960_720.jpg
---

**本文转载于：[http://www.benmutou.com/archives/1781](http://www.benmutou.com/archives/1781)**

1\.## 全局变量的原形

在 Lua 中，要声明全局变量很简单，那就是定义变量的时候，前面不要加上 local。
这个神秘的全局变量，其实本质上也是一个 table，它把我们创建的全局变量都保存到一个 table 里了。
而这个 table 的名字是：_G

我们来看看代码：

```lua
-- 定义一个全局变量
gName = "哎哟，很挫哦";
-- 用三种方式输出变量的值
print(gName);
print(_G["gName"]);
print(_G.gName);
```

输出结果如下：

``` bash
[LUA-print] 哎哟，很挫哦
[LUA-print] 哎哟，很挫哦
[LUA-print] 哎哟，很挫哦
```

我们定义了一个全局变量 gName，于是这个 gName 成为了_G 的一个字段。
怎么样，很简单吧。

2\.## 非全局的环境

对于全局变量，不管到了哪个地方，哪种语言，大家总是会告诫说："不要滥用，后果自负".
也许是因为这样，所以 Lua 有了一种比较特殊的机制：非全局环境。
我称它为“不会造成全局影响的全局变量”。

3\.## 改变函数的全局变量环境——setfenv 函数

先看看以下代码：

```lua
-- 定义一个全局变量
gName = "哎哟，很挫哦";
-- 将当前全局环境重新设置为新的table
setfenv(1, {});
-- 输出值
print(gName);
```

如果现在运行代码，输出结果将会是这样的：

``` bash
[LUA-print] LUA ERROR: [string “src/main.lua”]:107: attempt to call global ‘print’ (a nil value)
```

为什么？很出乎意料的脸 print 函数都无法找到了？

这是因为我们已经把当前函数范围内的全局变量环境改变了，全局变量默认是保存在_G 中的，而现在的全局变量是在一个新的 table 里。

目前这个 table 是空的，所以不存在任何全局变量。

setfenv 函数就是用来改变某个函数范围里的全局环境的，通俗地说，就是把某个函数范围内的_G 给弄没了。

setfenv 函数两个参数分别代表：

1). 第一个参数，可以是即将要改变环境的函数，也可以是一个数字。数字 1 代表当前函数，数字 2 代表调用当前函数的函数，后面以此类推。

2).第二个参数，新的全局环境 table。

4\. 保留原来的\_## G

现在连 print 函数都无法使用了，对于测试很不方便，我们可以做个小动作，把原来的_G 保留起来。

如下代码：

```lua
-- 定义一个全局变量
gName = "哎哟，很挫哦";
-- 将当前全局环境重新设置为新的table
setfenv(1, {g = _G});
-- 输出值
g.print(gName);
-- 再次定义一个全局变量
gName = "哎哟，有点错哦";
-- 再次输出值
g.print(gName);
-- 输出原来的值
g.print(g.gName);
```

只要在定义新的环境时，把_G 作为一个字段放到新的 table 里，就可以调用原来的全局变量了。

那么，输出结果如下：

``` bash
[LUA-print] nil
[LUA-print] 哎哟，有点错哦
[LUA-print] 哎哟，很挫哦
```

三次调用 g.print 函数的输出结果都是不一样的：
a.第一次，此时刚刚重新设置了全局环境，这时候当前函数的全局变量只有一个，那就是 g，所以 gName 的值是 nil。
b.第二次，我们再一次对 gName 进行赋值，此时，已经在新的环境中了，所以接下来输出的 gName 值是存在的。
c.第三次，这次输出的是 g.gName 的值，通过 g 调用的 gName 值是原先的全局环境里的值，所以 gName 的值仍然是最初的“哎哟，很挫哦”。
其实，这有什么用呢？倒不如直接用局部变量好了。
确实，从这例子里看不出什么特别的地方。
书里对于知识的介绍都是由浅入深的，所以这里暂时也没有更深入的介绍，看到后面内容的时候，我再继续和大家分享。

5.使用__index 元方法保留原来的_## G

这里还有一个小技巧分享一下，刚刚举例保留_G，但是调用 print 等函数时还需要形如 g.print 的方式，有点碍事。

我们可以利用__index 来解决这个问题，如下代码：

```lua
-- 定义一个全局变量
gName = "哎哟，很挫哦";
-- 一个table，即将成为新的环境
local newG = {};
setmetatable(newG, {__index = _G});
-- 将当前全局环境重新设置为新的table
setfenv(1, newG);
gName = "别再哎哟了，很烦！";
-- 输出值
print(gName);
print(_G.gName);
```

我们给新的 table 设置一个元表，这个元表的__index 元方法就是_G。

于是，当新的环境里找不到 print 字段时，就会去_G 里寻找。

输出结果如下

``` bash
[LUA-print] 别再哎哟了，很烦！
[LUA-print] 哎哟，很挫哦
```

第一次输出的是新环境里的 gName 值，第二次输出的是原来环境里的 gName 值，互不影响。

6\.## 结束

好了，关于全局变量和非全局环境，就暂时说这么多。

虽然暂时还感觉不到有什么作用，没关系，后面还会有关于这部分的内容。

就像__index 一样，是基础，后面可能会经常提到。
