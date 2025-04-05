---
title: v2ray卸载
category: 软件
tags:
  - v2ray
cover: https://images.unsplash.com/photo-1516540438350-9db0f4e6552f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

使用脚本安装，然而没有卸载选项，那就自己动手吧

## 卸载

其中 systemd 和 sysv 二选一，取决于你的系统。

```bash
#停用并卸载服务（systemd）：
systemctl stop v2ray
systemctl disable v2ray

#停用并卸载服务（sysv）：
service v2ray stop
update-rc.d -f v2ray remove
```

## 删除文件

```bash
rm -rf /etc/v2ray/*  #(配置文件)
rm -rf /usr/bin/v2ray/*  #(程序)
rm -rf /var/log/v2ray/*  #(日志)
rm -rf /lib/systemd/system/v2ray.service  #(systemd 启动项)
rm -rf /etc/init.d/v2ray  #(sysv 启动项)
```

Linux 服务端使用一键安装脚本安装后如何对软件进行完全卸载  
参考：[https://github.com/v2ray/v2ray-core/issues/187](https://github.com/v2ray/v2ray-core/issues/187)
