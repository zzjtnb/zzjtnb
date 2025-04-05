---
title: 使用 acme.sh 撸一个免费且自动更新的 HTTPS 证书
category: Linux
tags:
  - acme.sh
cover: https://images.unsplash.com/photo-1518627845667-0362e869f233?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80
---

[Mozilla SSL 配置生成器](https://ssl-config.mozilla.org/#server=nginx&config=modern)
`https://ssl-config.mozilla.org/#server=nginx&config=modern`

## 前言

一直想撸一下 https，最近刚好有点空，就实现了一下。之前看过一篇[教你快速撸一个免费 HTTPS 证书](https://juejin.im/post/5b57e1c05188251afe7b922a)的文章，通过`Certbot`来管理`Let's Encrypt`的证书，使用前需要安装一堆库，觉得不太友好。所谓条条大路通罗马，肯定还有其他方法可以做这个事情。

经过一番研究，发现了 [acme.sh](https://github.com/Neilpang/acme.sh) 这个库，这个是用 Shell 脚本编写的，不需要安装其他东西，比较纯净，觉得比较适合自己，记录一下过程。

## 准备工作

1. 一个已解析好的域名（可以用 http 来访问）。
2. 开启服务器的 443 端口防火墙。

## 步骤

### 一、安装 acme.sh

```sh
curl https://get.acme.sh | sh -s email=ca@zzjtnb.com
```

这个命令后会将 acme.sh 安装到`~/.acme.sh/`目录下
重新载入`~/.bashrc`

```sh
source ~/.bashrc
```

### 二、生成证书

首先保证网站能够正常打开 nginx 的网站配置, listen 端口是 80 而不是 443

```bash
# 新建一个nuxtserver服务
upstream zzjtnb_nuxt_SSR {
  server 127.0.0.1:4000;
  keepalive 64;
}
server {
  # 侦听80端口
  listen 80 ;
  listen [::]:80;

  # 定义使用 访问域名
  server_name zzjtnb.com www.zzjtnb.com;
  # 定义首页索引文件的名称
  index index.html;
  # 定义服务器的默认网站根目录位置
  root /home/zzjtnb/wwwroot/client;
  # 默认请求
  location / {
    proxy_pass http://zzjtnb_nuxt_SSR; # 这里对应上面upstream中新建的服务名
  }
  # 反向代理
  location /api {
    proxy_pass http://127.0.0.1:5000; # 后台 API 地址
  }
  access_log logs/zzjtnb/access.log json; # 默认/etc/nginx/logs
  error_log logs/zzjtnb/error.log; # 默认/etc/nginx/logs
}

```

假如 nginx 配置正确网站访问的是正确的路径

```sh
# 注意这里的-d顺序要和上面nginx config server_name的顺序要一样
acme.sh  --issue -d zzjtnb.com -d www.zzjtnb.com  --webroot /home/zzjtnb/wwwroot/client
```

或者如果你用的 nginx 服务器, 或者反代, acme.sh 还可以智能的从 nginx 的配置中自动完成验证, 你不需要指定网站根目录:

```sh
# 注意这里的-d顺序要和上面nginx config server_name的顺序要一样
acme.sh  --issue  -d zzjtnb.com -d www.zzjtnb.com  --nginx
```

这个命令的意思是用 http 方式将 zzjtnb.com 生成一个证书，`/home/zzjtnb/wwwroot/client`是你的网站根目录.(这个过程中`acme.sh` 会全自动的生成验证文件, 并放到网站的根目录, 然后自动完成验证. 最后又自动删除验证文件.)

最后 bash 显示

```bash
Your cert is in  /root/.acme.sh/zzjtnb.com/zzjtnb.com.cer
Your cert key is in  /root/.acme.sh/zzjtnb.com/zzjtnb.com.key
The intermediate CA cert is in  /root/.acme.sh/zzjtnb.com/ca.cer
And the full chain certs is there:  /root/.acme.sh/zzjtnb.com/fullchain.cer
```

### 三、安装或 copy 证书到 nginx 目录

默认生成的证书都放在安装目录下: ~/.acme.sh/，这个目录一般来说不能让 nginx 或 Apache 直接使用。所以我们需要将证书放到一个指定的目录，习惯是放在`/etc/nginx/ssl/`目录下。acme 提供了 --install-cert 来安装证书，只需指定目标位置, 然后证书文件会被 copy 到相应的位置。
先确保存在`/etc/nginx/ssl/zzjtnb`目录

```sh
mkdir /etc/nginx/ssl
mkdir /etc/nginx/ssl/zzjtnb
```

copy 证书并指定 nginx reload 命令

```bash
acme.sh --install-cert -d zzjtnb.com \
--key-file       /etc/nginx/ssl/zzjtnb/zzjtnb.key  \
--fullchain-file /etc/nginx/ssl/zzjtnb/zzjtnb.cer \
--reloadcmd     "service nginx force-reload"
```

service nginx force-reload 是为了在让 acme 自动更新时候能够重启 nginx 使得证书生效。执行完命令可以在`/etc/nginx/ssl/zzjtnb`看到多了`zzjtnb.key`和`zzjtnb.cer`的文件。

### 四、生成 dhparam.pem 文件

```sh
openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048
```

这一步不是必须，但最好加上，后面配置好后会通过 ssllabs.com 来验证一下，如果这一步 ssl_dhparam 未配置，将导致 ssllabs.com 的评分降到 B。A + 是最好。

### 五、配置 nginx

证书已安装完毕，接下来就是让 nginx 来使用这个证书了。由于我这个服务器有几个站点，而目前只是一个站点配置了证书，因此只修改当前站点的 conf 即可

```sh
# 新建一个nuxtserver服务
upstream zzjtnb_nuxt_SSR {
  server 127.0.0.1:4000;
  keepalive 64;
}
server {
  # 侦听80端口
  listen 80 ;
  listen [::]:80;
  # 侦听443端口,这个是ssl访问端口
  listen 443 ssl http2;
  listen [::]:443 ssl http2;

  # 定义使用 访问域名
  server_name zzjtnb.com www.zzjtnb.com;
  # 定义首页索引文件的名称
  index index.html;
  # 定义服务器的默认网站根目录位置
  root /home/zzjtnb/wwwroot/client;

  #SSL_START
  ssl_dhparam /etc/nginx/ssl/dhparam.pem; # 这个配置能提高证书的评分,这个文件是`openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048`生成的,若没有做则不需要写这句
  ssl_certificate /etc/nginx/ssl/zzjtnb/zzjtnb.cer; # SSL证书
  ssl_certificate_key /etc/nginx/ssl/zzjtnb/zzjtnb.key;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; #首选加密套件
  ssl_protocols TLSv1.3; # 现代兼容性 安全链接可选的加密协议
  ssl_prefer_server_ciphers on; #使用服务器端的首选算法
  ssl_session_cache shared:SSL:10m; #设置ssl/tls会话缓存的类型和大小
  ssl_session_timeout 10m; #缓存有效期
  # Let's Encrypt 配置 OCSP Stapling
  ssl_stapling on; #开启OCSP
  ssl_stapling_verify on; #开启OCSP验证
  ssl_trusted_certificate /root/.acme.sh/zzjtnb.com/fullchain.cer; #证书链路径
  resolver 8.8.8.8 223.5.5.5 valid=300s ipv6=off; #不加这个可能就会开启失败
  resolver_timeout 5s;
  #SSL_END

  # 开启 HSTS,这么写是为了提交到 https://hstspreload.org
  add_header Strict-Transport-Security "max-age=31536000; includeSubdomains;preload";

  # 网页不允许被 iframe 嵌套。
  add_header X-Frame-Options DENY;

  # 不允许浏览器对未指定或错误指定的 Content-Type 资源真正类型的猜测行为
  add_header X-Content-Type-Options nosniff;

  # 启用 XSS 保护,检查到 XSS 攻击时,停止渲染页面
  add_header X-XSS-Protection "1; mode=block";

  # HTTP TO HTTPS
  # if ($scheme != https) {
  #   return 301 https://$host$request_uri;
  # }

  # 默认请求
  location / {
    proxy_pass http://zzjtnb_nuxt_SSR; # 这里对应上面upstream中新建的服务名
  }
  # 反向代理
  location /api {
    proxy_pass http://127.0.0.1:5000; # 后台 API 地址
  }
  access_log logs/zzjtnb/access.log json; # 默认/etc/nginx/logs
  error_log logs/zzjtnb/error.log; # 默认/etc/nginx/logs
}

```

`ssl_prefer_server_ciphers on;` 这个配置能提高证书的评分。
`ssl_dhparam /etc/nginx/ssl/dhparam.pem;` 这个文件是在第四步时生成的，若没有做则不需要写这句。
`nginx -t`验证一下 nginx 配置是否正确
== 这里需要注意下，导入新的证书后需要重启而不是重载，nginx -s reload 是普通修改配置重载。==

```sh
# 启动
systemctl start nginx
# 停止
systemctl stop nginx
```

或者`systemctl restart nginx`重启一下 nginx，就可以用 [https://zzjtnb.com](https://zzjtnb.com) 测试一下你的站点啦。

### 六、证书更新

Let's Encrypt 的证书有效期是 90 天的，需要定期重新申请，不过 acme 在安装的时候就已经设置了自动更新，所以这一步不用关心，很省心。
这里了解一下 acme.sh 的自动更新：安装 acme 时会自动为你创建 cronjob, 每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书.
查看任务

```sh
crontab -l
```

显示:

```sh
47 0 * * * "/root/.acme.sh"/acme.sh --cron --home "/root/.acme.sh" > /dev/null
```

手动 renew 一下证书可以通过这个命令

```sh
acme.sh --cron -f
```

### 七、设置软件自动更新

目前由于 acme 协议和 letsencrypt CA 都在频繁的更新, 因此 acme.sh 也经常更新以保持同步. 所以为了省心省力，最好还是设置一下软件的自动更新，执行下面的命令就可以了。

```sh
acme.sh  --upgrade  --auto-upgrade
```

之后, acme.sh 就会自动保持更新了.

你也可以随时关闭自动更新:

```sh
acme.sh --upgrade  --auto-upgrade  0
```

## 其他

### 八、 出错怎么办

如果出错, 请添加 debug log：

```sh
acme.sh  --issue  .....  --debug
```

或者：

```sh
acme.sh  --issue  .....  --debug  2
```

请参考： <https://github.com/Neilpang/acme.sh/wiki/How-to-debug-acme.sh>

最后, 本文并非完全的使用说明, 还有很多高级的功能, 更高级的用法请参看其他 wiki 页面.

<https://github.com/Neilpang/acme.sh/wiki>

在这个网站可以验证一下你的证书级别，根据我上面的配置可以评级为 A。
[https://www.ssllabs.com/sslte...](https://www.ssllabs.com/ssltest/analyze.html?d=zzjtnb.com)

## 参考文章

* [acme.sh 说明](https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E)
* [使用 acme.sh 给 Nginx 安装 Let’ s Encrypt 提供的免费 SSL 证书](https://ruby-china.org/topics/31983)
* [让你的网站免费开启 Https 访问，绿色健康小清新](https://rekkles.xyz/2017/07/05/create-a-https-website/)
