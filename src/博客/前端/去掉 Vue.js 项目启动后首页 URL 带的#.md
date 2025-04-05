---
title: 去掉Vue项目启动后首页URL带的#
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg
---

对于 vue 开发的单页面应用，我们在切换不同的页面的时候，可以发现 html 永远只有一个，这也真是称之为单页面的原因，而 vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。因为对于正常的页面来说，更换 url 一定是会导致页面的更换的， 而只有更换 url 中的查询字符串和 hash 值得时候才不会重新加载页面。 这里也就是这个道理。

　但是#这种形式真的很丑！  所以，如果不想要，可以使用路由的 history 模式！！！ 这种模式充分利用了 history.pushState API 来完成 URL 的跳转而不需要重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})

```

　使用这种模式之后，就没有#了，而是可以像使用正常的 url 进行访问了。

　　不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 <http://oursite.com/user/id> 就会返回 404，这就不好看了。

　　所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

　　注意：目前我所做的项目的后端没有支持此种方式，所以还是先使用#的方式进行开发。

警告
给个警告，因为这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})

```

或者，如果你是用 Node.js 作后台，可以使用服务端的路由来匹配 URL，当没有匹配到路由的时候返回 404，从而实现 fallback。
