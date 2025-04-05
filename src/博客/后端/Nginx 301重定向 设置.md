---
title: nginx 301重定向 设置
category: 后端
tags:
  - nginx
cover: https://images.unsplash.com/photo-1464925257126-6450e871c667?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80
---

在 nginx 中配置，使得访问不带 www 的网址自动重定向到带 www 的域名。

## http 协议的重定向

在 [nginx 官方文档](https://link.jianshu.com/?t=http://nginx.org/en/docs/http/converting_rewrite_rules.html)中有如下示例代码：

``` bash
server {
    listen       80;
    server_name  example.com;
    return       301 http://www.example.com$request_uri;
}

server {
    listen       80;
    server_name  www.example.com;
    ...
}
```

对于`return`字段，有两点需要特别注意：

* 必须带上协议头，即`http://`
* 必须带上`$request_uri`参数

### 踩坑：`return`字段必须带上协议头

经踩坑，不带上协议头，访问`example.com`会重定向到`example.com/www.example.com/www.example.com/www.example.com/www.example.com...`(url 的长度达到 8k+)，最终出现`414 Request-URI Too Large`错误。

我在进行测试时发现 chrome 会自动缓存 301 跳转，因此就算还原了 nginx 的配置文件，访问`example.com`仍然会重定向到刚才的超长网址上，一直都是 414 错误。有两种方法可以解决 301 缓存的问题：

* 在浏览器的设置中清除缓存数据
* 使用隐私窗口进行测试 (正确的打开方式✅)

### 踩坑：必须带上`$request_uri`参数

> full original request URI (with arguments)

[nginx 文档](https://link.jianshu.com/?t=https://nginx.org/en/docs/http/ngx_http_core_module.html#var_request_uri)中对该变量的描述比较简单，通过搜索可以找到历史版本的说明，([stackoverflow](https://link.jianshu.com/?t=https://stackoverflow.com/questions/9084969/nginx-request-uri-without-args), [博客园](https://link.jianshu.com/?t=http://www.cnblogs.com/princessd8251/articles/6250641.html), [新浪博客](https://link.jianshu.com/?t=http://blog.sina.com.cn/s/blog_4ff12f66010158lk.html))：

> This variable is equal to the original request URI as received from the client including the args. It cannot be modified. Look at $uri for the post-rewrite/altered URI. Does not include host name. Example: "/foo/bar.php?arg=baz"

通过这个详细的描述，可以了解`$request_uri`参数表示**从客户端发送来的原生请求 URI，包括参数**。

经踩坑，不带上`$request_uri`参数，访问`example.com/abcd?123`会重定向到`www.example.com`，即无论访问任何子路径，都会自动重定向到首页。

参考 http 协议的重定向，我们添加了如下的配置：

``` bash
server {
    listen       443 ssl;
    server_name  example.com;
    return       301 https://www.example.com$request_uri;
}

server {
    listen       443 ssl;
    server_name  www.example.com;
    ...
}
```

重新加载 nginx 配置后，我们发现 [https://example.com](https://link.jianshu.com/?t=https://example.com) 无法访问，通过 curl 测试，返回下述错误信息：`curl: (35) Server aborted the SSL handshake`，很明显是 ssl 方面的问题。

而在配置前，[https://example.com](https://link.jianshu.com/?t=https://example.com) 和 [https://www.example.com](https://link.jianshu.com/?t=https://www.example.com) 都是可以正常访问的，原始配置如下：

``` bash
server {
    listen          443 ssl;
    server_name     www.example.com;
    server_name     example.com;
    ssl_certificate      ssl/www.example.com.crt;
    ssl_certificate_key  ssl/www.example.com.key;
    ...
}
```

因此，我尝试在重定向的配置中也添加 ssl_certificate 的配置信息：

``` bash
server {
    listen       443 ssl;
    server_name  example.com;
    ssl_certificate      ssl/www.example.com.crt;
    ssl_certificate_key  ssl/www.example.com.key;
    return       301 https://www.example.com$request_uri;
}
```

再次加载 nginx 配置后，发现 [https://example.com](https://link.jianshu.com/?t=https://example.com) 正常访问，并且可以自动重定向到 [https://www.example.com](https://link.jianshu.com/?t=https://www.example.com) 。

## 301 还是 302

* 301: 永久性转移 (Permanently Moved)
* 302: 暂时性转移 (Temporarily Moved)

共同点：二者都表示重定向，浏览器在获取服务器的返回码后会自动根据头部的 Location 值跳转到新的 URL 地址；

不同点：301 表示旧地址被永久地移除了，已经不可访问；302 表示旧地址还在，只是临时进行跳转，后续还是访问旧地址。

## 问题来了：什么情况下用 301 跳转？什么情况下用 302 跳转？

**

实际案例 1，知乎：

* [http://www.zhihu.com](https://link.jianshu.com/?t=http://www.zhihu.com) 跳转到 [https://www.zhihu.com](https://link.jianshu.com/?t=https://www.zhihu.com) 用的是 301 跳转
* /za-js-sdk@latest/dist/zap.js 跳转到 /za-js-sdk@2.4.5/dist/zap.js 用的是 302 跳转

实际案例 2，小米：

* [http://mi.com/](https://link.jianshu.com/?t=http://mi.com/) 跳转到 [http://www.mi.com/](https://link.jianshu.com/?t=http://www.mi.com/) 用的是 301 跳转
* [http://www.mi.com/](https://link.jianshu.com/?t=http://www.mi.com/) 跳转到 [https://www.mi.com/](https://link.jianshu.com/?t=https://www.mi.com/) 用的是 302 跳转

实际案例 3，百度：

* [http://tieba.baidu.com/](https://link.jianshu.com/?t=http://tieba.baidu.com/) 跳转到 [https://tieba.baidu.com/index.html](https://link.jianshu.com/?t=https://tieba.baidu.com/index.html) 用的是 301 跳转
* [http://baidu.com/](https://link.jianshu.com/?t=http://baidu.com/) 跳转到 [https://www.baidu.com/](https://link.jianshu.com/?t=https://www.baidu.com/) 用的是 302 跳转

个人感觉，知乎的使用比较有代表性，从 http 到 https 做 301 永久跳转，表示知乎采用的是 https 的方式访问，不会在回退到 http 的方式；而在获取 zap.js 的时候，使用了 302 临时跳转，跳转到当前的版本，后续 zap.js 有更新的时候，也会 302 跳转到更新后的地址。

## 注：文章中使用到的域名 example.com 为示例代码，请根据项目需要自行修改

**
