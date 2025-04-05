---
title: Nginx多站点(多主机)配置
category: 后端
tags:
  - Nginx
cover: https://images.unsplash.com/photo-1490544270497-a6044db8db90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMzk2fQ&auto=format&fit=crop&w=1355&q=80
---

在 nginx.conf 中通过

```bash
find / -name nginx.conf
```

假如查找的位置在`/etc/nginx/nginx.conf`就在`nginx.conf`的 http 块下加一句`include conf.d/*.conf;`就可以了
编辑 nginx.conf

```sh
# 包含所有的虚拟主机的配置文件
include conf.d/*.conf;
# 这表示，包含相对目录conf.d下，所有以.conf后缀的配置文件的信息。

#localhost.conf必须写在后面，如果conf.d有localhost，则忽略
include localhost.conf;
```

完整示例

```sh
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main
        '$remote_addr - $remote_user [$time_local] "$request" '
        '$status $body_bytes_sent "$http_referer" '
        '"$http_user_agent" "$http_x_forwarded_for"';

    log_format json
        '{"@timestamp":"$time_iso8601",'
        '"host":"$server_addr",'
        '"request_method": "$request_method", '
        '"clientip":"$remote_addr",'
        '"size":$body_bytes_sent,'
        '"responsetime":$request_time,'
        '"upstreamtime":"$upstream_response_time",'
        '"upstreamhost":"$upstream_addr",'
        '"http_host":"$host",'
        '"url":"$uri",'
        '"xff":"$http_x_forwarded_for",'
        '"referer":"$http_referer",'
        '"agent":"$http_user_agent",'
        '"status":"$status"}';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    #tcp_nopush     on;

    keepalive_timeout 65;

    gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

然后我们只需要在 /etc/nginx/conf.d/ 目录下创建我们特定于某个站点所需要的配置文件就可以了。

>注意： 注意后缀名为.conf，不然按照 include 的规则，无法正确引入相关的配置文件。

我在 conf.d 下面的配置

文件`zzjtnb.conf`

```sh
# log_format json
#   '{"@timestamp":"$time_iso8601",'
#   '"host":"$server_addr",'
#   '"request_method": "$request_method", '
#   '"clientip":"$remote_addr",'
#   '"size":$body_bytes_sent,'
#   '"responsetime":$request_time,'
#   '"upstreamtime":"$upstream_response_time",'
#   '"upstreamhost":"$upstream_addr",'
#   '"http_host":"$host",'
#   '"url":"$uri",'
#   '"xff":"$http_x_forwarded_for",'
#   '"referer":"$http_referer",'
#   '"agent":"$http_user_agent",'
#   '"status":"$status"}';

# 新建一个nuxtserver服务
upstream zzjtnb_nuxt_SSR {
  server 127.0.0.1:4000;
  keepalive 64;
}
server {
  # 侦听80端口
  listen 80;
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
  add_header Strict-Transport-Security
    "max-age=31536000; includeSubdomains;preload";

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
    proxy_set_header X-Real-IP $remote_addr; # 只能获取到与服务器本身直连的上层请求ip
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 获取所有的代理ip 客户ip
    proxy_pass http://127.0.0.1:5000; # 后台 API 地址
  }
  access_log logs/zzjtnb/access.log json; # 默认/etc/nginx/logs
  error_log logs/zzjtnb/error.log; # 默认/etc/nginx/logs
}
```

文件`admin.conf`

```sh
s# log_format json
#   '{"@timestamp":"$time_iso8601",'
#   '"host":"$server_addr",'
#   '"request_method": "$request_method", '
#   '"clientip":"$remote_addr",'
#   '"size":$body_bytes_sent,'
#   '"responsetime":$request_time,'
#   '"upstreamtime":"$upstream_response_time",'
#   '"upstreamhost":"$upstream_addr",'
#   '"http_host":"$host",'
#   '"url":"$uri",'
#   '"xff":"$http_x_forwarded_for",'
#   '"referer":"$http_referer",'
#   '"agent":"$http_user_agent",'
#   '"status":"$status"}';
server {
  # 侦听80端口
  listen 80;
  listen [::]:80;
  # 侦听443端口,这个是ssl访问端口
  # listen 443 ssl http2;
  # listen [::]:443 ssl http2;

  # 定义使用 访问域名
  server_name admin.zzjtnb.com;
  # 定义首页索引文件的名称
  index index.html;
  # 定义服务器的默认网站根目录位置
  root /home/zzjtnb/wwwroot/admin/dist;

  # #SSL_START
  # ssl_dhparam /etc/nginx/ssl/dhparam.pem; # 这个配置能提高证书的评分,这个文件是`openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048`生成的,若没有做则不需要写这句
  # ssl_certificate /etc/nginx/ssl/zzjtnb/zzjtnb.cer; # SSL证书
  # ssl_certificate_key /etc/nginx/ssl/zzjtnb/zzjtnb.key;
  # ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; #首选加密套件
  # ssl_protocols TLSv1.3; # 现代兼容性 安全链接可选的加密协议
  # ssl_prefer_server_ciphers on; #使用服务器端的首选算法
  # ssl_session_cache shared:SSL:10m; #设置ssl/tls会话缓存的类型和大小
  # ssl_session_timeout 10m; #缓存有效期
  # # Let's Encrypt 配置 OCSP Stapling
  # ssl_stapling on; #开启OCSP
  # ssl_stapling_verify on; #开启OCSP验证
  # ssl_trusted_certificate /root/.acme.sh/zzjtnb.com/fullchain.cer; #证书链路径
  # resolver 8.8.8.8 223.5.5.5 valid=300s ipv6=off; #不加这个可能就会开启失败
  # resolver_timeout 5s;
  # #SSL_END

  # # 开启 HSTS,这么写是为了提交到 https://hstspreload.org/
  # add_header Strict-Transport-Security
  #   "max-age=31536000; includeSubdomains;preload";

  # 网页不允许被 iframe 嵌套。
  add_header X-Frame-Options DENY;

  # 不允许浏览器对未指定或错误指定的 Content-Type 资源真正类型的猜测行为。
  add_header X-Content-Type-Options nosniff;

  # 启用 XSS 保护，检查到 XSS 攻击时，停止渲染页面。
  add_header X-XSS-Protection "1; mode=block";

  # HTTP TO HTTPS
  # if ($scheme != https) {
  #   return 301 https://$host$request_uri;
  # }

  # 默认请求
  location / {
    try_files $uri $uri/ /index.html;
  }

  # 反向代理
  location /api {
    proxy_set_header X-Real-IP $remote_addr; # 获取到与服务器本身直连的上层请求ip
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 获取所有的代理ip 客户ip
    proxy_pass http://127.0.0.1:5000; # 后台 API 地址
  }
  access_log logs/admin/access.log json; # 默认/etc/nginx/logs
  error_log logs/admin/error.log; # 默认/etc/nginx/logs
}

```

`admin.conf`是为了生成证书暂时没有配置**https**, 经测试如果 `zzjtnb.com` 已经是**https**, 访问`https://admin.zzjtnb.com`则会显示`zzjtnb.com`的内容, 通过**http**可以正常访问

附: [生成 http ssl 证书](https://zzjtnb.com/blog/details/syacmeshlygmfqzdgxdhttpszs)
