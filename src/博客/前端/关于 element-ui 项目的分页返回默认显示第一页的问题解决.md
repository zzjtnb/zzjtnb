---
title: 关于element-ui项目的分页返回默认显示第一页的问题解决
category: 前端
tags:
  - element
cover: https://cdn.pixabay.com/photo/2020/07/05/05/12/sunset-5371719_960_720.jpg
---

## 关于 vue+element-ui 项目的分页，返回默认显示第一页的问题解决

## 示例代码

```html
<template>
  <div style="text-align: center">
    <el-pagination @current-change="list" background layout="prev, pager, next" :current-page.sync="query.page" :page-size="query.pageSize" :total="query.pageNumber*query.pageSize" v-if="query.pageNumber*query.pageSize!=0">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      query: {
        page: 1,
        pageSize: 5,
        pageNumber: 1
      },
    }
  },
  created () {
    this.query.page = this.getContextData("page") || 1
  },
  methods: {
    list () {
      this.setContextData("page", this.query.page)
    },
    //给sessionStorage存值
    setContextData: function (key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    // 从sessionStorage取值
    getContextData: function (key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
    }
  },
}
</script>
```

## 参考

问题描述
当前页面如下
![hl7BaH0](https://i.imgur.com/hl7BaH0.png)
然后点击页码跳到第 3 页，然后在第三页点击页面链接跳转到新的页面
![JfyoKEl](https://i.imgur.com/JfyoKEl.png)
然后在新页面点击返回按钮，返回到当前页，结果页面分页显示第一页，对应页面内容也是第一页
![yDHbiFv](https://i.imgur.com/yDHbiFv.png)
期望效果
从新页面返回的时候，页码和页面内容仍旧保持在跳转离开前的样子。

解决办法
利用 localStorage 或者 sessionStorage 将跳转页面前的 currentPage 存储起来，然后，再次返回当前页的时候，在 created 生命周期里，获取到存储的 currentPage，再进行加载
代码解释 我这里用的是 sessionStorage，关于 sessionStorage 的使用，我这边先做下解释，以免后面看不懂。之前开发的时候我是先在全局定义了两个 sessionStorage 的方法，用于存取值

```JavaScript
//给sessionStorage存值
setContextData: function(key, value) { 
    if(typeof value == "string"){
        sessionStorage.setItem(key, value);
    }else{
        sessionStorage.setItem(key, JSON.stringify(value));
    }
},
// 从sessionStorage取值
getContextData: function(key){
    const str = sessionStorage.getItem(key);
    if( typeof str == "string" ){
        try{
            return JSON.parse(str);
        }catch(e) {
            return str;
        }
    }
    return;
}
```

分页代码
![z2EtMoF](https://i.imgur.com/z2EtMoF.png)
然后将 currentPage 在每次点击页码的时候存到 sessionStorage 里
![e0SqjGC](https://i.imgur.com/e0SqjGC.png)
这里解释下，qryTableData()是我定义的请求接口交易，刷新页面内容的方法。

然后在当前页的 created 生命周期里从 sessionStorage 里面取 currentPage。![2OaEWze](https://i.imgur.com/2OaEWze.png)

这样，我们再返回当前页的时候，页面内容将会是跳转离开前的样子。

但是至此工作仅仅完成一半，因为我们发现这个 bug 并没有完全解决
![vs0gft3](https://i.imgur.com/vs0gft3.png)
问题造成原因
我们返回当前页面取得总条数 totalNum 的之前，element-ui 的分页组件已经在页面加载完毕，当时的 totalNum 绑定的是 data 里面初始化的数据 0，所以当总条数为 0 的时候，分页组件的页码默认为 1。并且当 totalNum 在 created 生命周期里取得数据后，分页组件也不会刷新。所以这就导致， 页面内容正确，但是页码高亮依旧是第一页

解决办法
我们需要在 created 之后刷新这个分页组件或者让分页组件的 html 后于 created 之后加载到页面。
再次刷新这个分页组件是不现实的，我们选择在 created 之后加载分页组件。具体办法就是使用 v-if。在 totalNum 不为 data 里面给的初始值 0 的时候，才让这段 html 加载到页面。
![tZNxMuI](https://i.imgur.com/tZNxMuI.png)
然后再次测试，发现完美解决问题。
![9MxuQED](https://i.imgur.com/9MxuQED.png)
后续：
这里为什么用的是 v-if 而不是 v-show。这就是每个 vue 初学者需要明白的事情了，就是 v-if 和 v-show 的区别。嘿嘿
