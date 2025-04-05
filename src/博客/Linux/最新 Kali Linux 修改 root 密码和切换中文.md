---
title: 最新 kali linux 修改 root 密码和切换中文
category: Linux
tags:
  - Kali Linux
cover: https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/kali-dragon-icon.svg
---


## 更改密码

新版本的 kali linux 不再是 root/root 的默认账户和密码,而是变成了 kali/kali.但是有些时候需要使用 root 进行操作,可以使用以下方法修改 root 账户的密码
打开终端,然后输入

```bash
sudo passwd root
```

回车后输入原来 kali 账户的密码(登录是什么账户就输入什么账户的密码),再输入需要设定的 root 的密码(linux 默认密码输入是不显示的)
![Linux%20change%20root%20pass](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20change%20root%20pass.png)

>输入完最后显示:passwd: password updated successfully 意为设置成功

登录试试

```bash
su root
```

![Linux%20switch%20root](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20switch%20root.png)
>用户名变成 root,切换成功

切换 root 用户
![Kali%20Linux%20switch%20user](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Kali%20Linux%20switch%20user.png)
![Kali%20Linux%20login](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Kali%20Linux%20login.png)

在终端输入`su root`每次需要输入密码,可以通过下面的方式解决

```bash
# 切换到root用户
su root
# 打开sudoers文件
mousepad /etc/sudoers
```

把其中的

```bash
# Allow members of group sudo to execute any command
%sudo ALL=(ALL:ALL) ALL
```

修改为

```bash
# Allow members of group sudo to execute any command
%sudo ALL=(ALL:ALL) NOPASSWD:ALL
```

![Linux%20sudo%20nopasswd](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20sudo%20nopasswd.png)

保存后关闭文件和重启终端

然后输入`sudo su`就可以不用密码切换 root 用户了
![Linux%20sudo%20su](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20sudo%20su.png)

## 更改语言

在 Terminal Emulator 中执行`dpkg-reconfigure locales`命令
 > 注意：如果是 root 用户可直接执行 dpkg-reconfigure locales 命令,如果是 kali 用户则需先切换成 root 用户登陆再进行执行

```bash
# 切换root用户
su root
# dpkg-重新配置语言环境
dpkg-reconfigure locales
```

![Linux%20locales](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20locales.png)

英文默认是`en_US.UTF-8 UTF-8`,往下翻(最后面)找到`[ ] zh-CN.UTF-8.UTF-8`选项,使用空格将`[ ] zh-CN.UTF-8.UTF-8`项勾选上,勾选完毕以后按`tab`键,在`<0k>`处按下空格,进行下一步
![Linux%20config%20chinese](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20config%20chinese.png)

在此处小键盘上下键选择`zh_CN.UTF-8`字符编码,选择完毕以后按`tab`键,在<0k> 处按空格键进行确认 ,并完成相关配置操作
![Linux%20locales%20finish](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20locales%20finish.png)
配置完毕
![Linux%20locales%20finish%20info](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20locales%20finish%20info.png)
配置完毕以后,使用`reboot`命令重启系统使其生效

![Linux%20reboot](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20reboot.png)
重启完毕以后，可以看到相关登陆登陆页面已经是中文显示了，至此配置完毕
![Kali%20Linux%20login%20chinese](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Kali%20Linux%20login%20chinese.png)
![Linux%20change%20directory%20name](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Linux%20change%20directory%20name.png)
![Kali%20Linux%20chinese](https://raw.githubusercontent.com/zzjtnb/static/master/images/zzjtnb/Kali%20Linux%20chinese.png)
