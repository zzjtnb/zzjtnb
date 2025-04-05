---
title: 恢复Win10中缺少的电源计划
category: Windows
tags:
  - Win10
cover: https://cdn.pixabay.com/photo/2020/03/26/10/58/norway-4970081_960_720.jpg
---

## 打开 Windows PowerShell 依次输入需要的命令

## 恢复节能

`powercfg -duplicatescheme a1841308-3541-4fab-bc81-f71556f20b4a`

## 恢复平衡

`powercfg -duplicatescheme 381b4222-f694-41f0-9685-ff5bb260df2e`

## 恢复高性能

`powercfg -duplicatescheme  8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c`

## 显示卓越性能

`powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61`
