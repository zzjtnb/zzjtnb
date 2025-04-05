---
title: Lua调用函数时用点号还是用冒号
category: Lua
tags:
  - Lua
cover: https://cdn.pixabay.com/photo/2020/10/26/15/59/maple-leaves-5687724_960_720.jpg
---


本文是面向对象预热篇，讲解函数两种调用方式的区别，初学者比较容易被坑。

1\.## 初学者最易混乱 Top1——调用函数时用点号还是用冒号？

我们来看看下面的两句代码：

```lua
mSprite.setPosition(100, 20);
mSprite:setPosition(100, 20);
```

对于初次接触 Lua 的朋友来说，这简直就是噩梦，为嘛函数的调用有两种形式，是让我们随便挑的意思吗？

这两种形式是有区别的，区别很大，但只有一个。

不过，暂时不解释，后面再介绍。

2\.## 最简单的类

我们先来看看简单的，来创建一个 “类” 试试，如下代码：

```lua
TSprite = {
    x = 0,
    y = 0,
}
function TSprite.setPosition(x, y)
    TSprite.x = x;
    TSprite.y = y;
end
TSprite.setPosition(1, 2);
print("TSprite坐标(" .. TSprite.x .. "," .. TSprite.y .. ")");
```

``` bash
其实就是创建了一个table，给这个table添加一些字段而已。
```

输出结果如下：

```bash
[LUA-print] TSprite坐标(1,2)
```

大家留意一下 setPosition 函数，函数里其实也是通过 TSprite 来调用 x 和 y 字段的。

并且，我们使用 setPosition 的方式是，使用点号，这是正宗的函数调用方式，记住了。

3\.## 不用真实姓名可以吗？——self 的作用

如果大家比较敏感的话，就会发现，刚刚的例子很有问题，如果我们这样调用的话：

```lua
local who = TSprite;
TSprite = nil;

who.setPosition(1, 2);
```

这么做一定会报错，虽然通过 who 确实可以成功调用 setPosition 函数，但函数里需要用到 TSprite，而此时的 TSprite 已经为 nil 了。

于是，聪明的我们可以这么做：

```lua
TSprite = {
  x = 0,
  y = 0,
}
function TSprite.setPosition(self, x, y)
  self.x = x;
  self.y = y;
end

local who = TSprite;
TSprite = nil;
  
who.setPosition(who, 1, 2);
print("TSprite坐标(" .. who.x .. "," .. who.y .. ")");
```

输出结果仍然是：

```bash
[LUA-print] TSprite坐标(1,2)
```

留意 setPosition 的第一个参数，我们强制要求传入一个参数，这个参数就是 TSprite 本身。

于是，在调用 setPosition 函数时，传入 who，who 的内容就是 TSprite 的内容，于是，setPosition 就能正常执行了。

4\.## 发挥偷懒的传统美德——默认的 self 参数，以及默认传递 self 参数

如果你让一个高 (chao) 智(ji)商 (lan) 猿人每次创建函数和调用函数都要这么去处理 self，那他一定会说“你过来一下下，我保证不打死你”。

所以，Lua 提供了一个新的使用方式，没错，那就是**冒号**。

## 看好了，我说的是，用冒号调用函数

**

如下代码：

```lua
TSprite = {
  x = 0,
  y = 0,
}
function TSprite:setPosition(x, y)
  self.x = x;
  self.y = y;
end

local who = TSprite;
TSprite = nil;

who:setPosition(1, 2);
```

第一，留意 setPosition 函数的定义，使用了冒号；

第二，留意 setPosition 函数的调用，使用了冒号。

冒号的作用就是：定义函数时，给函数的添加隐藏的第一个参数 self；调用函数时，默认把当前调用者作为第一个参数传递进去。

使用了冒号之后，就相当于我们刚刚使用点号时一样，只是我们不再需要显式地定义 self 参数以及主动地传递 who 参数。

好了，这就是点号和冒号的区别了，可以说，冒号是为了给我们偷懒而诞生的。

如果是使用 lua 来开发的话，大部分情况下都是使用冒号的。

原因很简单，因为大部分情况下我们都要使用到 self 参数，就像 C++ 的 this 关键字一样。
