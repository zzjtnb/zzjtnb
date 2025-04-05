---
title: Lua中loadfile、dofile、require三者的区别
category: Lua
tags:
  - Lua
cover: https://cdn.pixabay.com/photo/2019/02/03/18/23/lighthouse-3973197_960_720.jpg
---


## 1.loadfile——只编译，不运行

loadfile 故名思议，它只会加载文件，编译代码，不会运行文件里的代码。

比如，我们有一个 hellofile.lua 文件：

```lua
print(''hello);
function hehe()
print('hello');
end
```

这个文件里有一句代码，和一个函数。试试用 loadfile 加载这个文件，如下代码：

```lua
loadfile("hellofile.lua");
print("end");
```

输出结果如下：

```bash
[LUA-print] end
```

如果说 loadfile 会执行文件里的代码的话，那么，应该会输出 hello 字符串的。

结果表明，它是不会执行代码的。

## 2.dofile——执行

很明显，dofile 就是会执行代码的家伙了，如下代码：

```lua
dofile("E:/hellofile.lua");
print("end");
```

输出结果如下：

```lua
[LUA-print] hello
[LUA-print] end
```

## 3.require——我只执行一次

require 和 dofile 有点像，不过又很不一样，require 在第一次加载文件的时候，会执行里面的代码。

但是，第二次之后，再次加载文件，则不会重复执行了。换句话说，它会保存已经加载过的文件，不会重复加载。

测试代码如下：

```lua
for i = 1, 2, 1 do
    require("hellofile.lua");
end
print("end");
```

为了说明这种情况，我刻意调用了两次 require，输出结果如下：

```lua
[LUA-print] hello
[LUA-print] end
```

和我们说的一样，调用了两次，但是代码只执行了一次。

如果这里换成 dofile，则会输出两次 hello 字符串。
