---
title: Node.js 定时模块node-schedule实现定时任务
category: Node.js
tags:
  - Node.js
cover: https://cdn.pixabay.com/photo/2021/02/08/15/02/mountains-5995081_960_720.jpg
---

## 1. 安装

```bash
npm install node-schedule
```

github 地址：[https://github.com/mattpat/node-schedule](https://github.com/mattpat/node-schedule)

## 2.API 应用

## 2.1 确定实际时间

```js
  // 定时爬虫
  const scheduleRecurrenceRule = () => {
    var date = new Date(2012, 11, 21, 5, 30, 0);
    schedule.scheduleJob(rule, function(){
      console.log('scheduleRecurrenceRule:' + new Date());
    });
  }
  scheduleRecurrenceRule()
```

> new Date() 的时候月份要减 1.

## 2.2 每小时、每分钟、每秒执行

RecurrenceRule properties

* second (0-59)
* minute (0-59)
* hour (0-23)
* date (1-31)
* month (0-11)
* year
* dayOfWeek (0-6) Starting with Sunday

```js
const scheduleRecurrenceRule = () => {
    let rule = new schedule.RecurrenceRule();
    /*
    * 需要注意的是每几小时运行一次传一个数组即可，但是必须要将分钟设置为0，否则它的定时任务将会是5:00pm, 5:01pm, 5:02pm, ..., 5:59pm,这并不是我们想要的
    * */
    rule.hour = [1, 3, 5, 7, 9]
    rule.minute = [0]
    /*
    * 每 30min 执行一次
    */
    rule.minute = 30
    /*
    * 每 30s 执行一次
    */
    rule.second = 30
    schedule.scheduleJob(rule, function(){
      nodemailer()
      console.log('scheduleRecurrenceRule:' + new Date());
      crawler()
    });

  }
  scheduleRecurrenceRule()
```

## 2.3 Cron 风格

```bash
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

```js
 // 定时爬虫
  const scheduleRecurrenceRule = () => {

    // 每 30s
    const rule = '30 * * * * '
    // 每 30min
    const rule = '* 30 * * * '
    // 每 3小时执行一次
    const rule = '* * /3 * * '
    schedule.scheduleJob(rule, function(){
      nodemailer()
      console.log('scheduleRecurrenceRule:' + new Date());
      crawler()
    });
  }
  scheduleRecurrenceRule()
```

## 3. 一个星期中的某些天的某个时刻

```js
   // 定时爬虫
  const scheduleRecurrenceRule = () => {
    // 每周四，周五，周六，周天的17点
    var rule = new schedule.RecurrenceRule()
    rule.dayOfWeek = [0, new schedule.Range(4, 6)]
    rule.hour = 17
    rule.minute = 0
    schedule.scheduleJob(rule, function(){
      nodemailer()
      console.log('scheduleRecurrenceRule:' + new Date());
      crawler()
    });
  }
  scheduleRecurrenceRule()
```

## 4. 取消

```js
let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
  console.log('Time for tea!');
});

j.cancel();
```

## 5. 参考

* [https://github.com/node-schedule/node-schedule](https://github.com/node-schedule/node-schedule)
* [Nodejs 学习笔记（十二）--- 定时任务（node-schedule)](https://www.cnblogs.com/zhongweiv/p/node_schedule.html)
