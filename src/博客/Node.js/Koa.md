---
title: Koa
category: Node.js
tags:
  - koa
cover: https://cdn.pixabay.com/photo/2019/06/24/10/49/yellow-poppy-4295713_960_720.jpg
---

### 一.koa2 快速开始

#### 1.环境准备

因为 node.js v7.6.0 开始完全支持 async/await,不需要加 flag,所以 node.js 环境都要 7.6.0 以上 node.js 环境 版本 v7.6 以上 npm 版本 3.x 以上

#### 2.快速开始

##### 2.1 安装 koa2

```bash
# 初始化package.json
npm init

# 安装koa2
npm install koa
```

##### 2.2 hello world 代码

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
```

##### 2.3 启动 demo

由于 koa2 是基于 async/await 操作中间件,目前 node.js 7.x 的 harmony 模式下才能使用,所以启动的时的脚本如下:

```bash
node index.js
```

### 二.async/await 使用

#### 1.快速上手理解

先复制以下这段代码,在粘贴在 chrome 的控制台 console 中,按回车键执行

```js
function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      let startTime = new Date().getTime()
      setTimeout(() => {
        let endTime = new Date().getTime()
        let data = endTime - startTime
        resolve( data )
      }, 500)
    } catch ( err ) {
      reject( err )
    }
  })
}

async function getSyncData() {
  let time = await getSyncTime()
  let data = `endTime - startTime = ${time}`
  return data
}

async function getData() {
  let data = await getSyncData()
  console.log( data )
}

getData()
```

#### 2.从上述例子可以看出 async/await 的特点

* 可以让异步逻辑用同步写法实现
* 最底层的 await 返回需要是 Promise 对象
* 可以通过多层 async function 的同步写法代替传统的 callback 嵌套

### 三.koa2 简析结构

#### 1.源码文件

```bash
├── lib │
├── application.js │
├── context.js │
├── request.js │
└── response.js
└── package.json
```

这个就是 GitHub [https://github.com/koajs/koa](https://github.com/koajs/koa) 上开源的 koa2 源码的源文件结构,核心代码就是 lib 目录下的四个文件

* application.js 是整个 koa2 的入口文件,封装了 context,request,response,以及最核心的中间件处理流程.
* context.js 处理应用上下文,里面直接封装部分 request.js 和 response.js 的方法
* request.js 处理 http 请求
* response.js 处理 http 响应

#### 2.koa2 特性

* 只提供封装好 http 上下文.请求.响应,以及基于 async/await 的中间件容器.
* 利用 ES7 的 async/await 的来处理传统回调嵌套问题和代替 koa@1 的 generator,但是需要在 node.js 7.x 的 harmony 模式下才能支持 async/await.
* 中间件只支持 async/await 封装的,如果要使用 koa@1 基于 generator 中间件,需要通过中间件 koa-convert 封装一下才能使用.

### 四.koa 中间件开发和使用

* koa v1 和 v2 中使用到的中间件的开发和使用
* generator 中间件开发在 koa v1 和 v2 中使用
* async await 中间件开发和只能在 koa v2 中使用

#### 1.generator 中间件开发

##### 1.1 generator 中间件开发

> generator 中间件返回的应该是 function * () 函数

```js
/* ./middleware/logger-generator.js */
function log( ctx ) {
  console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
  return function * ( next ) {

    // 执行中间件的操作
    log( this )

    if ( next ) {
      yield next
    }
  }
}
```

##### 1.2 generator 中间件在 koa@1 中的使用

> generator 中间件在 koa v1 中可以直接 use 使用

```js
const koa = require('koa')  // koa v1
const loggerGenerator  = require('./middleware/logger-generator')
const app = koa()

app.use(loggerGenerator())

app.use(function *( ) {
    this.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```

##### 1.3 generator 中间件在 koa@2 中的使用

> generator 中间件在 koa v2 中需要用 koa-convert 封装一下才能使用

```js
const Koa = require('koa') // koa v2
const convert = require('koa-convert')
const loggerGenerator  = require('./middleware/logger-generator')
const app = new Koa()

app.use(convert(loggerGenerator()))

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```

#### 2.async 中间件开发

##### 2.1 async 中间件开发

```js
/* ./middleware/logger-async.js */

function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
  return async function ( ctx, next ) {
    log(ctx);
    await next()
  }
}
```

##### 2.2 async 中间件在 koa@2 中使用

> async 中间件只能在 koa v2 中使用

```js
const Koa = require('koa') // koa v2
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
```

### 一.koa2 原生路由实现

#### 1.简单例子

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.request.url
  ctx.body = url
})
app.listen(3000)
```

访问 [http://localhost:3000/hello/world](http://localhost:3000/hello/world) 页面会输出 /hello/world,也就是说上下文的请求 request 对象中 url 之就是当前访问的路径名称,可以根据 ctx.request.url 通过一定的判断或者正则匹配就可以定制出所需要的路由.

#### 2.定制化的路由

demo 源码

[https://github.com/ChenShenhai/koa2-note/tree/master/demo/route-simple](https://github.com/ChenShenhai/koa2-note/tree/master/demo/route-simple)

##### 2.1 源码文件目录

```bash
.
├── index.js
├── package.json
└── view
    ├── 404.html
    ├── index.html
    └── todo.html
```

##### 2.2 demo 源码

```js
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}
 */
function render( page ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url,ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route( url ) {
  let view = '404.html'
  switch ( url ) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
      break
  }
  let html = await render( view )
  return html
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = await route( url )
  ctx.body = html
})

app.listen(3000)
console.log('[demo] route-simple is starting at port 3000')
```

##### 2.3 运行 demo

## 执行运行脚本

**

```bash
node -harmony index.js
```

### 二.koa-router 中间件

如果依靠 ctx.request.url 去手动处理路由,将会写很多处理代码,这时候就需要对应的路由的中间件对路由进行控制,这里介绍一个比较好用的路由中间件 koa-router

#### 1.安装 koa-router 中间件

```bash
# koa2 对应的版本是 7.x
npm install --save koa-router@7
```

#### 2.快速使用 koa-router

```js
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')

let home = new Router()

// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})
```

### 一.GET 请求数据获取

#### 1.使用方法

在 koa 中,获取 GET 请求数据源头是 koa 中 request 对象中的 query 方法或 querystring 方法,query 返回是格式化好的参数对象,querystring 返回的是请求字符串,由于 ctx 对 request 的 API 有直接引用的方式,所以获取 GET 请求数据有两个途径.

* 是从上下文中直接获取 请求对象 ctx.query,返回如 {a:1, b:2} 请求字符串 ctx.querystring,返回如 a=1&b=2

* 是从上下文的 request 对象中获取 请求对象 ctx.request.query,返回如 {a:1, b:2} 请求字符串 ctx.request.querystring,返回如 a=1&b=2

#### 2.举个例子

##### 2.1 例子代码

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }
})

app.listen(3000, () => {
  console.log('[demo] request get is starting at port 3000')
})
```

##### 2.2 执行程序

```bash
node get.js
```

### 二.POST 请求参数获取

#### 1.原理

对于 POST 请求的处理,koa2 没有封装获取参数的方法,需要通过解析上下文 context 中的原生 node.js 请求对象 req,将 POST 表单数据解析成 query string(例如:a=1&b=2&c=3),再将 query string 解析成 JSON 格式(例如:{"a":"1", "b":"2", "c":"3"})

> 注意:ctx.request 是 context 经过封装的请求对象,ctx.req 是 context 提供的 node.js 原生 HTTP 请求对象,同理 ctx.response 是 context 经过封装的响应对象,ctx.res 是 context 提供的 node.js 原生 HTTP 请求对象.

##### 解析出 POST 请求上下文中的表单数据

```js
// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener("end",function(){
        let parseData = parseQueryStr( postdata )
        resolve( parseData )
      })
    } catch ( err ) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log( queryStrList )
  for (  let [ index, queryStr ] of queryStrList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
  }
  return queryData
}
```

#### 2.举个例子

##### 2.1 例子代码

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input  /><br/>
        <p>nickName</p>
        <input  /><br/>
        <p>email</p>
        <input  /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候,解析POST表单里的数据,并显示出来
    let postData = await parsePostData( ctx )
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404!!! o(╯□╰)o</h1>'
  }
})

// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener("end",function(){
        let parseData = parseQueryStr( postdata )
        resolve( parseData )
      })
    } catch ( err ) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log( queryStrList )
  for (  let [ index, queryStr ] of queryStrList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3000, () => {
  console.log('[demo] request post is starting at port 3000')
})
```

##### 2.2 启动例子

```bash
node post.js
```

### 三.koa-bodyparser 中间件

#### 1.原理

对于 POST 请求的处理,koa-bodyparser 中间件可以把 koa2 上下文的 formData 数据解析到 ctx.request.body 中

##### 安装 koa2 版本的 koa-bodyparser@3 中间件

```bash
npm install --save koa-bodyparser@3
```

#### 2.举个例子

##### 2.1 例子代码

```js
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

// 使用ctx.body解析中间件
app.use(bodyParser())

app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input  /><br/>
        <p>nickName</p>
        <input  /><br/>
        <p>email</p>
        <input  /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候,中间件koa-bodyparser解析POST表单里的数据,并显示出来
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404!!! o(╯□╰)o</h1>'
  }
})

app.listen(3000, () => {
  console.log('[demo] request post is starting at port 3000')
})
```

##### 2.2 启动例子

```bash
node post-middleware.js
```

### koa-static 中间件使用

#### 1.使用例子

```js
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))


app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})
```

### koa2 加载模板引擎

#### 1.快速开始

##### 1.1 安装模块

```bash
# 安装koa模板使用中间件
npm install --save koa-views

# 安装ejs模板引擎
npm install --save ejs
```

##### 1.2 使用模板引擎

## 文件目录

**

```bash
├── package.json
├── index.js
└── view
    └── index.ejs
```

## ./index.js 文件

**

```js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000)
```

## ./view/index.ejs 模板

**

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
</body>
</html>
```
