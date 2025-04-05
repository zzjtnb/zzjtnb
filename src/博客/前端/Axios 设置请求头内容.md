---
title: axios设置请求头内容
category: 前端
tags:
  - axios
cover: https://cdn.pixabay.com/photo/2020/06/08/19/31/jellyfish-5275858_960_720.jpg
---

## axios 设置请求头中的 Authorization 和 cookie 信息

## GET 请求

**

```JavaScript
axios.get(urlString, 
    {
        headers: {
            'Authorization': 'Bearer ' + token,
            "Cookie" : 'sessionId=' + sessionId + '; recId=' + recId,
            ...
        },
        params: {
            param1: string,
            param2: string
        },
        ...
    }
)
.then(res => fn)
.catch(e => fn)
```

## POST 请求

**

```JavaScript
axios.post(urlString, 
    {
        data: data,
        ...
    },
    {
        headers: {
            'Authorization': 'Bearer ' + token,
            "Cookie" : 'sessionId=' + sessionId + '; recId=' + recId,
            ...
        }
    }
)
.then(res => fn)
.catch(e => fn)
```
