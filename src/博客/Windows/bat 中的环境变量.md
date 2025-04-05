---
title: bat中的环境变量
category: Windows
tags:
  - bat
cover: https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg
---

## 创建一个新的环境变量空间

在批处理脚本中:
 setlocal 这个命令用来创建一个新的环境变量空间, 可以让变量的改变只在此区域内生效, 当遇到 endlocal 命令时, 这个区域就会结束, 之后的命令将在原来的环境变量空间中执行.

这主要用于防止脚本中的变量对全局环境产生影响.

```bash
setlocal
set var=Hello
echo %var% World
endlocal

echo %var%
```

在上面的示例中, 我们使用 setlocal 创建了一个新的环境变量空间, 并在此空间中定义了一个变量 var. 在 echo %var% World 中, 我们可以使用 %var% 来引用在此空间中定义的变量. 然而, 当我们执行 endlocal 后, 这个环境变量空间就会结束,%var% 将不再可用.

因此, 这段代码的输出将是:

```bash
Hello World

%var%
```

## 启用延迟环境变量扩展

> setlocal enabledelayedexpansion 这个命令与 setlocal 类似, 但它启用了延迟变量扩展. 这意味着在 for 或 if 的代码块中, 我们可以获取到在该代码块中改变的变量的值, 而不是代码块执行前的值.

例如, 以下的代码将不会按预期工作, 因为 %var% 在 for 循环开始时就已经被扩展了:

```bash
set var=0
for /l %%i in (1, 1, 5) do (
    set /a var+=1
    echo %var%
)
```

这将始终输出 0, 而不是我们期望的 1,2,3,4,5. 但如果我们使用了 setlocal enabledelayedexpansion, 并且使用!var! 而不是 %var%, 那么它就会按预期工作:

```bash
setlocal enabledelayedexpansion
set var=0
for /l %%i in (1, 1, 5) do (
    set /a var+=1
    echo !var!
)
endlocal
```

```bash
这将会输出1,2,3,4,5.
```

延迟环境变量扩展允许在执行时才解析环境变量, 而不是在脚本解析时.

使用方法如下:

* 在批处理脚本的开头, 添加 setlocal enabledelayedexpansion 命令.
* 启用延迟环境变量扩展后, 你可以在脚本中使用 ! 来引用延迟解析的环境变量.

```bash
@echo off
setlocal enabledelayedexpansion

REM 定义变量
set var=Hello
set index=0

REM 使用延迟环境变量扩展
echo !var! World

REM 在循环中使用延迟环境变量扩展
for /L %%i in (1,1,5) do (
  set /A index+=1
  echo !index!
)

endlocal
```

1. 在上面的示例中,`setlocal enabledelayedexpansion` 命令启用了延迟环境变量扩展. 然后, 我们定义了一个变量 `var` 和一个索引变量 `index`. 在 `echo !var! World` 中, 我们使用了延迟环境变量扩展来引用 `var` 变量. 在循环中, 我们使用 `!index!` 来引用延迟解析的 `index` 变量.

2. 请注意, 使用延迟环境变量扩展时, 变量需要使用 `!` 来包围, 而不是 `%`. 这与普通环境变量扩展 (使用 %) 不同.

## endlocal

1. 在批处理脚本中,`endlocal` 用于结束 `setlocal` 命令的作用域, 并还原到之前的环境状态. 在大多数情况下, 应该在脚本的末尾添加 `endlocal`, 以确保环境变量的作用范围正确.

2. 但是, 如果你不添加 `endlocal` 命令, 脚本也可以正常运行. 在脚本执行完毕后, 系统会自动还原环境变量的状态. 这是因为 `setlocal` 命令创建了一个新的环境变量作用域, 当脚本执行完毕时, 它会自动退出并还原到之前的环境状态.

3. 然而, 如果你在脚本中使用了 `setlocal` 命令, 建议在脚本的末尾添加 `endlocal` 命令, 以确保脚本的可读性和可维护性. 这样可以明确指示脚本的作用域, 并避免潜在的问题.

## 两者区别

>setlocal 命令和 setlocal enabledelayedexpansion 命令之间的区别在于是否启用了延迟变量扩展.

1. setlocal 命令用于创建一个新的环境变量空间, 使得在此空间中的变量改变只在此区域内生效. 这可以防止脚本中的变量对全局环境产生影响.

2. setlocal enabledelayedexpansion 命令不仅创建一个新的环境变量空间, 还启用了延迟变量扩展. 延迟变量扩展允许在代码块中获取变量的最新值, 而不是代码块开始时的值.

例如, 考虑以下示例:

```bash
setlocal enabledelayedexpansion
set var=0
for /l %%i in (1, 1, 5) do (
    set /a var+=1
    echo !var!
)
endlocal
```

在这个示例中, 我们使用 `setlocal enabledelayedexpansion` 启用了延迟变量扩展. 在 `for` 循环的代码块中, 我们使用`!var!`来获取变量 `var` 的值, 而不是使用`%var%`. 这样, 我们可以获取到在代码块中改变的变量的最新值.

如果我们只使用 `setlocal` 而没有启用延迟变量扩展, 那么在代码块中使用 `%var%` 将会获取到代码块开始时的值, 而不是最新的值.

因此,`setlocal enabledelayedexpansion` 命令允许我们在代码块中动态地获取变量的值, 而不受代码块开始时的限制.
