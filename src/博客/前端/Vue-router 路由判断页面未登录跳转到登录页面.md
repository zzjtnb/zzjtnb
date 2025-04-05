---
title: Vue-router路由判断页面未登录跳转到登录页面
category: 前端
tags:
  - Vue
cover: https://images.unsplash.com/photo-1520901157462-0ea3fb2f9024?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=1350&q=80
---

router.js

```JavaScript
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    if (token) {  // 判断当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
```

在这之前是给路由加一个 meta 属性：

```JavaScript
{
    path: '/index',
    meta: {
      title: '',
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
}
```

注意:但是事实是登录的时候大多数时候并不进行跳转，所以这里需要在 login 跳转的路径中再加一段：

```JavaScript
if(this.$route.query.redirect){
//     let redirect = decodeURIComponent(this.$route.query.redirect);
       let redirect = this.$route.query.redirect;
       this.$router.push(redirect);
}else{
       this.$router.push('/');
 }
```
