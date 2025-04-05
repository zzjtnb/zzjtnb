---
title: 开启SSH权限
category: Linux
tags:
  - SSH
cover: https://images.unsplash.com/photo-1489447068241-b3490214e879?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

一、设置 root 密码
1.先选择从浏览器打开 ssh 连接服务器
2.切换到 root 账号
`sudo -i`
3.设置 root 密码
`passwd`
然后会要求输入新密码，然后再重复一次密码，输入密码的时候不会显示出来，所以直接输入密码，然后回车，再然后重复输入密码回车
二、开启 SSH 权限
1.修改 SSH 配置文件/etc/ssh/sshd_config
`vim /etc/ssh/sshd_config`
2.然后再输”i”进入编辑模式
i
3.找到以下内容并修改

``` bash
PermitRootLogin yes           //默认为no，需要开启root用户访问改为

PasswordAuthentication yes    //默认为no，改为yes开启密码登陆
```

4.修改完成后，再下按 esc 键，然后再输入
`:wq`
5.重启服务器
`reboot`
