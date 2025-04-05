---
title: 在Debian或者Ubuntu上部署Nuxt项目
category: 前端
tags:
  - Nuxt.js
cover: ' https://cdn.pixabay.com/photo/2020/08/31/09/33/beach-5531919_960_720.jpg'
---

常用

```bash
service nginx restart
mysql -uroot -p zzjtnb < zzjtnb.sql
pm2 restart all
```

[压缩图片](https://www.onlineimagetool.com/zh/)

## 后端

## pm2 安装

```bash
npm install pm2 -g
```

## 启动后端

```bash
pm2 start app.js
```

## 查看 node 和 Pm2 安装路径

```bash
which node # /usr/bin/node

which pm2 # /usr/bin/pm2
```

## 软连接指向

```bash
ln -s /usr/bin/node/pm2  /usr/local/bin/pm2
```

## Nginx 配置代理服务

## 新建一个 nuxtserver 服务

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

## 重新启动 Nginx

```bash
service nginx restart
```

## 前端

## 打包

```bash
npm run build
```

## 打包完成后需要将以下四个文件夹复制到服务器相关目录下

```bash
.nuxt  static  package.json  nuxt.config.js
```

## 启动

```bash
pm2 start npm --name "zzjtnb" -- run start --watch
```

+ 注意：这里的 name 对应的是 package.json 中的项目名称
+ 查看进程：pm2 list
+ pm2 进程管理: pm2 show/stop/delete/start id 或者进程名称

## PM2 常用命令

```bash
$ pm2 start app.js # 启动app.js应用程序
$ pm2 start app.js -i 4 # cluster mode 模式启动4个app.js的应用实例
# 4个应用程序会自动进行负载均衡
$ pm2 start app.js --name="api" # 启动应用程序并命名为 "api"
$ pm2 start app.js --watch # 当文件变化时自动重启应用
$ pm2 start script.sh # 启动 bash 脚本

$ pm2 list # 列表 PM2 启动的所有的应用程序
$ pm2 monit # 显示每个应用程序的CPU和内存占用情况
$ pm2 show [app-name] # 显示应用程序的所有信息

$ pm2 logs # 显示所有应用程序的日志
$ pm2 logs [app-name] # 显示指定应用程序的日志
pm2 flush

$ pm2 stop all # 停止所有的应用程序
$ pm2 stop 0 # 停止 id为 0的指定应用程序
$ pm2 restart all # 重启所有应用
$ pm2 reload all # 重启 cluster mode下的所有应用
$ pm2 gracefulReload all # Graceful reload all apps in cluster mode
$ pm2 delete all # 关闭并删除所有应用
$ pm2 delete 0 # 删除指定应用 id 0
$ pm2 scale api 10 # 把名字叫api的应用扩展到10个实例
$ pm2 reset [app-name] # 重置重启数量

$ pm2 startup # 创建开机自启动命令
$ pm2 save # 保存当前应用列表
$ pm2 resurrect # 重新加载保存的应用列表
$ pm2 update # Save processes, kill PM2 and restore processes
$ pm2 generate # Generate a sample json configuration file
pm2 start app.js --node-args="--max-old-space-size=1024"

```

```bash
service mysql stop
service mysql start
service mysql restart
```
