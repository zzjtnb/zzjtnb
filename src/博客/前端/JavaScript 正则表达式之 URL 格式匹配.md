---
title: js正则表达式之URL格式匹配
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2021/04/17/16/01/book-6186166_960_720.jpg
---

```js
 协议    ://  主机名[:端口]   / 路径  /  [? 查询]/#信息片断
protocol :// hostname[:port] / path / [;parameters][?query]#fragment
```

`[;parameters]`没见过 这里就不做相关匹配了

## 工具 / 原料

```js
'use strict';
{
  // URL地址匹配格式: protocol :// hostname[:port] / path / [;parameters][?query]#fragment
  // [;parameters]:这都没见过这东西,就不匹配了.
  let url = [
    'https://www.baidu.com/',
    'http://192.168.1.1',
    'http://192.168.1.1:8080',
    'https://news.163.com/18/1224/15/E3Q6EJDA0001875N.html#top',
    'https://baidu.com:80/?wd=wq&url=ksks#ddsx2',
    'http://192.168.1.1/p/#name',
    'https://neets.cc/subcriberlist?recommendInventoryId=QNZfMjCRQtS4z8MQrFa7qo'
  ]
    , result = null
    , matcht = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
    , info = ['完整URL', '协议', '地址', '端口', '路径', '查询', '锚点']
  url.forEach((value) => {
    result = matcht.exec(value);
    console.log('---------------------------------------------------------------------------------');
    for (let i = 0; i < result.length; i++) {
        console.log(`${info[i]} = ${result[i]}`);
    }
  })
}
```

## 方法 / 步骤

**代码与执行结果**
![20190728151443181](https://i.ibb.co/9bpFQxX/20190728151443181.png)
![201907281515006](https://i.ibb.co/x8xgkgM/201907281515006.png)
**元字符解释**

```js
脱字符 ^ :一行的第一个字符,

    字符组[-]:表示匹配里面任何一个字符,但是必须要有一个匹配.

    排除字符组 [^-]:表示排除里面所有字符,

    括号(-):表示限定或界定

    0-9.a-z:表示取值范围

    量词 + :表示前面那个字符或组至少匹配一次

    量词 ? : 表示前面那个字符或组匹配0次或1次.

    量词 * :表示前面那个字符或组匹配0次或多次.
```

**协议匹配规则**
常见 URL 协议有 http.https 等等, 所以这里就做针对 http 和 https 的 URL 地址匹配.

匹配规则 :

```js
^(https?:\/\/)
```

**主机名匹配规则**
主机名格式为:xxx.xxx.xxx 或 xxx.xxx 2 种形式 由字母或数字组成.

如:www.baidu.com  baidu.com  127.0.0.1

匹配规则为:

```js
([0-9a-zA-z.]+)
```

**端口匹配**
端口部分是由冒号开头后接数值两部分组成而且 web 默认端口 80 是不显示在后面的, 所以就有 2 种情况存在或不存在.

如:127.0.0.1:8080  127.0.0.0

匹配规则为:

``` bash
(:[0-9]+)?
```

**路径匹配**
路径是由字母. 数字. 斜杠. 点组成. 在访问网站首页时后面没有路径地址, 所以这块如果存在就匹配.

如:/xxx/xxxx/xxx.html . /xxx/xxx

匹配规则为:

```js
([/0-9a-zA-Z.]+)?
```

**查询字符串匹配**
查询字符串的格式为:?xxx=1&ddd=2 或 ?xx=2. 由于这块不是必须项所以在匹配时, 如果存在就匹配, 不存在就算了.

匹配规则为:

```js
(\?[0-9a-zA-Z&=]+)?
```

## 信息片断匹配

**

信息片断是由#. 字母. 数值组成. 由于这块不是必须项所以在匹配时, 如果存在就匹配, 不存在就算了.

匹配规则为:

```js
(#[0-9-a-zA-Z]+)?
```

## 组合匹配规则

**

```js
//采用i不区别大小写模式,来简化一下匹配规则
/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
```
