---
title: JavaScript-按日期对象数组进行排序，然后按时间排序
category: 前端
tags:
  - JavaScript
cover: https://images.unsplash.com/photo-1483354483454-4cd359948304?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

```JavaScript
const arr = [{id: 1, value : "value1", date: "2018-08-08", time: "15:27:17"},
{id: 2, value : "value2", date: "2018-08-09", time: "12:27:17"},
{id: 3, value : "value3", date: "2018-08-10", time: "17:27:17"},
{id: 4, value : "value4", date: "2018-08-10", time: "01:27:17"},
{id: 5, value : "value5", date: "2018-08-10", time: "09:27:17"},
{id: 6, value : "value6", date: "2018-08-10", time: "23:27:17"},
{id: 7, value : "value7", date: "2018-08-10", time: "16:27:17"},
{id: 8, value : "value8", date: "2018-08-11", time: "10:27:17"}
];

arr.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
console.log(arr);

```

若要排序为降序，只需切换 as 和 bs：

```JavaScript
const arr = [{id: 1, value : "value1", date: "2018-08-08", time: "15:27:17"},
{id: 2, value : "value2", date: "2018-08-09", time: "12:27:17"},
{id: 3, value : "value3", date: "2018-08-10", time: "17:27:17"},
{id: 4, value : "value4", date: "2018-08-10", time: "01:27:17"},
{id: 5, value : "value5", date: "2018-08-10", time: "09:27:17"},
{id: 6, value : "value6", date: "2018-08-10", time: "23:27:17"},
{id: 7, value : "value7", date: "2018-08-10", time: "16:27:17"},
{id: 8, value : "value8", date: "2018-08-11", time: "10:27:17"}
];

arr.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
console.log(arr);
```
