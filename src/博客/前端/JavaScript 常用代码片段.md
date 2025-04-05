---
title: JavaScript常用代码片段
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2020/01/15/11/08/tree-4767679_960_720.jpg
---

## js 字符串中间隐藏变星

```JavaScript
 // 示例
 plusXing('pianduan',2,2)  // pi****an
 
 /**
   * 字符串隐藏部分变**
   * @param {*} str 需要隐藏的字符串
   * @param {*} frontLen 头部明文长度
   * @param {*} endLen  尾部明文长度
   */
  plusXing(str, frontLen, endLen) {
    var len = str.length - frontLen - endLen
    var xing = ''
    for (var i = 0; i < len; i++) {
      xing += '*'
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
  }
```

## js 生成指定范围内随机值

```JavaScript
randomNumBoth(10, 100)

// 方法一
function randomNumBoth(Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  var num = Min + Math.round(Rand * Range) //四舍五入
  return num
}

// 方法二
function randomNumBoth(Min, Max) {
  Math.floor(Math.random() * (Max- Min) + Min)
}
```

## js 常用正则

```JavaScript
module.exports = {
  /** 数字 */
  number: /^\d+(\.{1}\d+)?$/,
  /** 整数 */
  integer: /^-?\d+$/,
  /** 正整数 */
  positiveInteger: /^[0-9]*[1-9][0-9]*$/,
  /** 负整数 */
  negativeInteger: /^-[0-9]*[1-9][0-9]*$/,
  /** 浮点数 */
  floatingPointNumber: /^(-?\d+)(\.\d+)?$/,
  /** 大小写字母 */
  abc: /^[A-Za-z]+$/,
  /** 仅大写 */
  abcMax: /^[A-Z]+$/,
  /** 仅小写 */
  abcMin: /^[a-z]+$/,
  /** 字母 数字 */
  abcNumber: /^[A-Za-z0-9]+$/,
  /** 字母 数字 下划线 */
  abcNumberUnderline: /^\w+$/,
  /** 邮箱 */
  email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  /** 中文 */
  chinese: /[u4e00-u9fa5]/,
  /** ip 地址 */
  ip: /(d+).(d+).(d+).(d+)/
}
```

## js 向上向下取整

```JavaScript
// 向下取整
Math.floor(1.1)
// 向上取整
Math.ceil(1.2)
```

## js 生成随机长度数字验证码

```JavaScript
// 六位随机数字
Math.floor(Math.random() * (999999 - 100000)) + 100000
// 四位随机数字
Math.floor(Math.random() * (9999 - 1000)) + 1000
```

## CSS 禁止文字选中

```css
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```

## JS 申请浏览器通知权限与发送通知

```JavaScript
/**
 * 发送通知
 * @param {String} title 标题
 * @param {String} message 消息内容
 * @param {String} icon 通知图标
 */
async function sendNotification(title, message, icon = 'https://i.loli.net/2019/03/08/5c81dbb1c0b71.png') {
  if (window.Notification) {
    if (Notification.permission != 'granted') {
      let result = await Notification.requestPermission()
      if (result === 'denied' || result === 'default') {
        throw Error('申请通知权限时被用户拒绝。')
      }
    }

    return new Notification(title, {
      body: message,
      icon: icon
    })
  } else {
    throw Error('当前浏览器不支持发送通知。')
  }
}

;(async () => {
  try {
    let instans = await sendNotification('提示', '操作成功！')
    // 1秒钟后关掉通知
    setTimeout(() => {
      instans.close()
    }, 1000)
  } catch (err) {
    alert(err.message || '发送通知失败')
  }
})()
```

## js 获取当前时间戳

```JavaScript
// 方法一
new Date().getTime()
// 方法二
new Date().valueOf()
// 方法三
Date.parse(new Date())
// 方法四
+new Date()
// 方法五
Date.now()
```

## JS 日期格式化获取

```JavaScript
Date.prototype.format = function(format) {
  var args = {
    'M+': this.getMonth() + 1,
    'D+': this.getDate(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds()
  }
  if (/(Y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var i in args) {
    var n = args[i]
    if (new RegExp('(' + i + ')').test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ('00' + n).substr(('' + n).length))
  }
  return format
}

// 使用方式
// 日期和时间
new Date().format("YYYY-MM-DD HH:mm")    // 2019-03-10 12:03
new Date().format("YYYY-M-D H:m")    // 2019-3-10 12:3
// 日期
new Date().format("YYYY-MM-DD")    // 2019-03-10
new Date().format("YYYY-M-D")    // 2019-3-10
```

## js 根据时间戳计算距离当时时间间隔

```JavaScript
/**
 * 根据时间戳计算距离当时时间间隔
 */
function getDateDiff(dateTimeStamp) {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    if (monthC <= 12) result = '' + parseInt(monthC) + '月前';
    else {
      result = '' + parseInt(monthC / 12) + '年前';
    }
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前';
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前';
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
}
```

## 动态引入 js

```JavaScript
try {
  await loadJs('https://xxxxxx.js')
  console.log(' 加载成功 ')
} catch {
  console.log(' 加载失败 ')
}

function loadJs(path) {
  if (document.head.querySelector(`script[src="${path}"]`) != null) return

  var script = document.createElement('script')
  script.src = path
  script.type = 'text/javascript'
  document.head.appendChild(script)
  
  return new Promise((res, rej) => {
    script.addEventListener('load', res)
    script.addEventListener('error', rej)
  })
}
```

## 动态引入 css

```JavaScript
try {
  await loadCss('https://xxxxxx.css')
  console.log(' 加载成功 ')
} catch {
  console.log(' 加载失败 ')
}


function loadCss(path) {
  if (document.head.querySelector(`link[href="${path}"]`) != null) return

  var link = document.createElement('link')
  link.href = path
  link.rel = 'stylesheet'
  link.type = 'text/css'
  document.head.appendChild(link)

  return new Promise((res, rej) => {
    link.addEventListener('load', res)
    link.addEventListener('error', rej)
  })
}
```
