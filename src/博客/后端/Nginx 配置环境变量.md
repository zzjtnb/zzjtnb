---
title: nginx配置环境变量
category: 后端
tags:
  - nginx
cover: https://images.unsplash.com/photo-1539994812137-f96a90e51126?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1350&q=80
---

### 一、先找到 nginx 的安装地址

```sh
whereis nginx
```

### 二、在/etc/profile 中加入配置

打开配置文件

```bash
vi /etc/profile
```

在配置文件末尾加入

```bash
#nginx configure
export NGINX_HOME=/usr/local/nginx-1.10.2
export PATH=$PATH:$NGINX_HOME/sbin
```

==`/usr/local/nginx-1.10.2`是你输入`whereis nginx`后系统输出的路径,按照实际情况填写==

编辑完保存退出并执行

```bash
source /etc/profile
```

### 三、查看 nginx 版本

```bash
nginx -v
```
