---
title: Linux基础指令的操作
category: Linux
tags:
  - Linux
cover: https://cdn.pixabay.com/photo/2015/05/02/08/02/angel-749625_960_720.jpg
---

``` bash
显示日期与时间的指令： date
显示日历的指令： cal
简单好用的计算机： bc

1. 显示日期的指令： date

如果在文字介面中想要知道目前Linux系统的时间，那么就直接在指令列模式输入date即可显示：

[dmtsai@study ~]$ date
Fri May 29 14:32:01 CST 2015
上面显示的是：星期五, 五月二十九日, 14:32 分, 01秒，在2015 年的CST 时区！台湾在CST时区中啦！请赶快动手做做看呦！好了，那么如果我想要让这个程式显示出『2015/05/29』这样的日期显示方式呢？那么就使用date的格式化输出功能吧！

[dmtsai@study ~]$ date +%Y/%m/%d
2015/05/29
[dmtsai@study ~]$ date +%H:%M
14:33
那个『+%Y%m%d』就是date指令的一些参数功能啦！

2. 显示日历的指令： cal

那如果我想要列出目前这个月份的月历呢？呵呵！直接给他下达cal即可！

[dmtsai@study ~]$ cal
      May 2015
Su Mo Tu We Th Fr Sa
                1 2
 3 4 5 6 7 8 9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31
除了本月的日历之外，连同今日所在日期处都会有反白的显示呢！真有趣！cal (calendar)这个指令可以做的事情还很多，例如你可以显示整年的月历情况：

[dmtsai@study ~]$ cal 2015
                               2015

       January February March
Su Mo Tu We Th Fr Sa Su Mo Tu We Th Fr Sa Su Mo Tu We Th Fr Sa
             1 2 3 1 2 3 4 5 6 7 1 2 3 4 5 6 7
 4 5 6 7 8 9 10 8 9 10 11 12 13 14 8 9 10 11 12 13 14
11 12 13 14 15 16 17 15 16 17 18 19 20 21 15 16 17 18 19 20 21
18 19 20 21 22 23 24 22 23 24 25 26 27 28 22 23 24 25 26 27 28
25 26 27 28 29 30 31 29 30 31

        April May June
Su Mo Tu We Th Fr Sa Su Mo Tu We Th Fr Sa Su Mo Tu We Th Fr Sa
          1 2 3 4 1 2 1 2 3 4 5 6
 5 6 7 8 9 10 11 3 4 5 6 7 8 9 7 8 9 10 11 12 13
12 13 14 15 16 17 18 10 11 12 13 14 15 16 14 15 16 17 18 19 20
19 20 21 22 23 24 25 17 18 19 20 21 22 23 21 22 23 24 25 26 27
26 27 28 29 30 24 25 26 27 28 29 30 28 29 30
                       31
....(以下省略)....
基本上cal这个指令可以接的语法为：

[dmtsai@study ~]$ cal [month] [year]
所以，如果我想要知道2015年10月的月历，可以直接下达：

[dmtsai@study ~]$ cal 10 2015
    October 2015
Su Mo Tu We Th Fr Sa
             1 2 3
 4 5 6 7 8 9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31
那请问今年有没有13月啊？来测试一下这个指令的正确性吧！下达下列指令看看：

[dmtsai@study ~]$ cal 13 2015
cal: illegal month value: use 1-12
cal竟然会告诉我们『错误的月份，请使用1-12』这样的资讯呢！所以，未来你可以很轻易的就以cal来取得日历上面的日期啰！简直就是万年历啦！^_^。另外，由这个cal指令的练习我们也可以知道，某些指令有特殊的参数存在，若输入错误的参数，则该指令会有错误讯息的提示，透过这个提示我们可以借以了解指令下达错误之处。 这个练习的结果请牢记在心中喔！

3. 简单好用的计算机： bc

如果在文字模式当中，突然想要作一些简单的加减乘除，偏偏手边又没有计算机！这个时候要笔算吗？不需要啦！我们的Linux有提供一支计算程式，那就是bc喔。你在指令列输入bc后，萤幕会显示出版本资讯， 之后就进入到等待指示的阶段。如下所示：

[dmtsai@study ~]$ bc
bc 1.06.95
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
_ <==这个时候，游标会停留在这里等待你的输入
事实上，我们是『进入到bc这个软体的工作环境当中』了！就好像我们在Windows里面使用『小算盘』一样！所以，我们底下尝试输入的资料，都是在bc程式当中在进行运算的动作。所以啰，你输入的资料当然就得要符合bc的要求才行！在基本的bc计算机操作之前，先告知几个使用的运算子好了：

* 加法
* 减法
* 乘法

/ 除法
^ 指数
% 余数
好！让我们来使用bc计算一些咚咚吧！

[dmtsai@study ~]$ bc
bc 1.06.95
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
1+2+3+4   <==只有加法时
10
7-8+3
2
10*52
520
10%3      <==计算『余数』
1
10^2
100
10/100    <==这个最奇怪！不是应该是0.1吗？
0
quit      <==离开bc这个计算器
在上表当中，粗体字表示输入的资料，而在每个粗体字的底下就是输出的结果。咦！每个计算都还算正确，怎么10/100会变成0呢？这是因为bc预设仅输出整数，如果要输出小数点下位数，那么就必须要执行scale=number ，那个number就是小数点位数，例如：

[dmtsai@study ~]$ bc
bc 1.06.95
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
scale=3      <==没错！就是这里！！
1/3
.333
340/2349
.144
quit
注意啊！要离开bc回到命令提示字元时，务必要输入『quit』来离开bc的软体环境喔！好了！就是这样子啦！简单的很吧！以后你可以轻轻松松的进行加减乘除啦！

```
