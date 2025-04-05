---
title: 谷歌云开启SSH及设置root密码
category: Linux
tags:
  - SSH
cover: https://cdn.pixabay.com/photo/2021/11/21/21/14/mountain-6815304_960_720.jpg
---

### 1. 先选择从浏览器打开 ssh 连接服务器

![OYUux5BsZpWGEfI](https://i.loli.net/2021/11/24/OYUux5BsZpWGEfI.png)

### 2. 切换到 root 账号

```bash
sudo -i
```

### 3. 设置 root 密码

```bash
passwd
```

#### 然后会要求输入新密码，然后再重复一次密码，输入密码的时候不会显示出来，所以直接输入密码，然后回车，再然后重复输入密码回车

![7rYy93uAos5SGJL](https://i.loli.net/2021/11/24/7rYy93uAos5SGJL.png)

## ①方法一

### 1. 修改 SSH 配置文件 / etc/ssh/sshd_config

```bash
vi /etc/ssh/sshd_config
```

### 2. 然后再输”i” 进入编辑模式

```bash
i
```

### 3. 找到以下内容并修改

```bash
PermitRootLogin yes           //默认为no，需要开启root用户访问改为yes
PasswordAuthentication yes    //默认为no，改为yes开启密码登陆
```

![hCTqQ6Pb97tXxHg](https://i.loli.net/2021/11/24/hCTqQ6Pb97tXxHg.png)

### 4. 修改完成后，再下按 esc 键，然后再输入

```bash
:wq
```

![P3Y5viIaVJSZDtw](https://i.loli.net/2021/11/24/P3Y5viIaVJSZDtw.png)

### 5. 重启 SSH 服务

```bash
service sshd restart
```

## ②方法二

### CentOS 和 Debian 通用，输入以下两条命令

```bash
sed -i 's/PermitRootLogin no/PermitRootLogin yes/g' /etc/ssh/sshd_config
```

```bash
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
```

### Ubuntu 系统，输入以下两条命令

```bash
sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/g' /etc/ssh/sshd_config
```

```bash
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
```

### 重启服务器

```bash
reboot
```
