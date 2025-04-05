---
title: Egret在localStorage存储读取JSON对象的方法
category: 前端
tags:
  - Egret
cover: https://cdn.pixabay.com/photo/2020/05/05/16/28/nature-5133834_960_720.jpg
---

## 一、存储数据

## 数据 obj

```json
let data = [
{ usernametext: 'test1', money: 100, PlayerId: 1},
{ usernametext: 'test2', money: 200, PlayerId: 2},
{ usernametext: 'test3', money: 200, PlayerId: 3},
{ usernametext: 'test4', money: 200, PlayerId: 4},
{ usernametext: 'test5', money: 200, PlayerId: 5}
];
```

```JavaScript
//将JSON对象转化成字符串
let data: string = JSON.stringify(obj);
//用localStorage保存转化好的的字符串
egret.localStorage.setItem("userdata", data);
//egret.localStorage.setItem(key, value);
```

通过上面的方法，localStorage 中储存的数据为下面的数据

```json
[
{"usernametext":"test1","money":100,"PlayerId":1},

{"usernametext":"test2","money":200,"PlayerId":2},

{"usernametext":"test3","money":200,"PlayerId":3},

{"usernametext":"test4","money":200,"PlayerId":4},

{"usernametext":"test5","money":200,"PlayerId":5}
]
```

## 二、读取数据

```JavaScript
//重新转换为对象 
let data: string = egret.localStorage.getItem("userdata");
//let data:string = egret.localStorage.getItem(key);
//把字符串转换成JSON对象
data = JSON.parse(data);
```

### 读取对象的某个属性

```JavaScript
this.lNameText[2].text = data[2]['usernametext']
```

## 三、移除数据

```JavaScript
egret.localStorage.removeItem(userdata);
//egret.localStorage.removeItem(key);
```

## 四、清除所有数据

```JavaScript
egret.localStorage.clear();
```
