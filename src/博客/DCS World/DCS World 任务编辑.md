---
title: DCS World任务编辑
category: DCS World
tags:
  - DCS World
  - Lua
cover: https://cdn.pixabay.com/photo/2020/10/09/13/12/man-5640540_960_720.jpg
---

## 护航

距离:距离预警机前后的宽度,正数为在预警机机头前面,负数在预警机机头后面,不要小于 50 米,一般为:-50 米
间隔:正数为距离预警机右边的宽度,负数为距离预警机左边的宽度,不要小于 150 米,左梯形为-150 米,右梯形为 150 米

## 直升机悬停

1.设置起点速度为 0
2.添加一个航路点,距离近点,重点速度也设置成 0

## 船只编队

如果发生船只不按设定的编队行驶,距离设置不要小于 750 米

## 模板

输入下面命令进入保存的游戏目录

```bash
%HOMEPATH%\Saved Games
```

找到 DCS 或者 DCS.openbeta
打开`\MissionEditor\templates.lua`

```lua
templates =
{
   ["US-航母舰队"] =
    {
        ["type"] = "ship",
        ["name"] = "US-航母舰队",
        ["country"] = 2,
        ["units"] =
        {
            [1] =
            {
                ["dx"] = 0,
                ["dy"] = 0,
                ["name"] = "Stennis",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [1]
            [2] =
            {
                ["dx"] = 20.838170862,
                ["dy"] = 1071.6312917177,
                ["name"] = "LST_Mk2",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [2]
            [3] =
            {
                ["dx"] = 44.912217198231,
                ["dy"] = -1101.8705692809,
                ["name"] = "LST_Mk2",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [3]
            [4] =
            {
                ["dx"] = 54.600877760269,
                ["dy"] = 1981.3621277437,
                ["name"] = "PERRY",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [4]
            [5] =
            {
                ["dx"] = 47.942266785831,
                ["dy"] = 2804.6193564127,
                ["name"] = "PERRY",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [5]
            [6] =
            {
                ["dx"] = -3.5015928573557,
                ["dy"] = -1750.7679885845,
                ["name"] = "PERRY",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [6]
            [7] =
            {
                ["dx"] = 12.848581000871,
                ["dy"] = -2391.5967116189,
                ["name"] = "PERRY",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [7]
            [8] =
            {
                ["dx"] = 1732.4719471928,
                ["dy"] = 1109.7976909148,
                ["name"] = "USS_Arleigh_Burke_IIa",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [8]
            [9] =
            {
                ["dx"] = 1755.1543897206,
                ["dy"] = -1121.0074289715,
                ["name"] = "USS_Arleigh_Burke_IIa",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [9]
            [10] =
            {
                ["dx"] = -1984.2334049791,
                ["dy"] = 1117.3852672912,
                ["name"] = "USS_Arleigh_Burke_IIa",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [10]
            [11] =
            {
                ["dx"] = -1961.5509624513,
                ["dy"] = -1113.4198525951,
                ["name"] = "USS_Arleigh_Burke_IIa",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [11]
            [12] =
            {
                ["dx"] = 3380.0789578513,
                ["dy"] = 7.9977486708085,
                ["name"] = "TICONDEROG",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [12]
            [13] =
            {
                ["dx"] = 2301.5806110277,
                ["dy"] = 3.4705174456467,
                ["name"] = "TICONDEROG",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [13]
            [14] =
            {
                ["dx"] = 1345.9898086036,
                ["dy"] = 0.87473944056546,
                ["name"] = "TICONDEROG",
                ["skill"] = "Excellent",
                ["heading"] = 0,
            }, -- end of [14]
        }, -- end of ["units"]
    }, -- end of ["US-航母舰队"]
    ["CN-航母舰队"] =
    {
        ["type"] = "ship",
        ["name"] = "CN-航母舰队",
        ["country"] = 27,
        ["units"] =
        {
            [1] =
            {
                ["dx"] = 0,
                ["dy"] = 0,
                ["name"] = "辽宁号航空母舰",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [1]
            [2] =
            {
                ["dx"] = 329.41841056,
                ["dy"] = -737.09299229999,
                ["name"] = "Type_071",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [2]
            [3] =
            {
                ["dx"] = -239.09192119,
                ["dy"] = 786.57752272001,
                ["name"] = "Type_071",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [3]
            [4] =
            {
                ["dx"] = 532.63689108999,
                ["dy"] = -1339.31312247,
                ["name"] = "Type_054A",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [4]
            [5] =
            {
                ["dx"] = 766.27866176001,
                ["dy"] = -1965.77488433,
                ["name"] = "Type_054A",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [5]
            [6] =
            {
                ["dx"] = -475.90433215999,
                ["dy"] = 1359.73529405,
                ["name"] = "Type_054A",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [6]
            [7] =
            {
                ["dx"] = -686.41765342001,
                ["dy"] = 1912.21964246,
                ["name"] = "Type_054A",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [7]
            [8] =
            {
                ["dx"] = -553.29822922999,
                ["dy"] = -1075.80895769,
                ["name"] = "Type_052C",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [8]
            [9] =
            {
                ["dx"] = -1138.52656604,
                ["dy"] = 466.18484295,
                ["name"] = "Type_052C",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [9]
            [10] =
            {
                ["dx"] = 1230.54086961,
                ["dy"] = -373.78426650001,
                ["name"] = "Type_052B",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [10]
            [11] =
            {
                ["dx"] = 639.22770575,
                ["dy"] = 1139.53942321,
                ["name"] = "Type_052B",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [11]
            [12] =
            {
                ["dx"] = -2300.96990889,
                ["dy"] = -797.0712951,
                ["name"] = "Type_093",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [12]
            [13] =
            {
                ["dx"] = -1566.16191382,
                ["dy"] = -532.27562120001,
                ["name"] = "Type_093",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [13]
            [14] =
            {
                ["dx"] = -890.93294537,
                ["dy"] = -300.57940654,
                ["name"] = "Type_093",
                ["skill"] = "Excellent",
                ["heading"] = 3.5255650890285,
            }, -- end of [14]
        }, -- end of ["units"]
    }, -- end of ["CN-航母舰队"]
} -- end of templates

```
