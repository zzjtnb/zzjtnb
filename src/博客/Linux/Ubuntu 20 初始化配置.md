---
title: Ubuntu 20 初始化配置
category: Linux
tags:
  - Ubuntu
cover: https://images.unsplash.com/photo-1489379391348-c9f07b42b696?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---


## 一、初始化配置

### 1.更新系统

```bash
# 更新本地报数据库
sudo apt update

# 更新所有已安装的包（也可以使用 full-upgrade）
sudo apt upgrade

# 自动移除不需要的包
sudo apt autoremove
```

这里补充几个常用的清理命令：
<table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>apt autoclean</td><td>将已删除软件包的. deb 安装文件从硬盘中删除</td></tr><tr><td>apt clean</td><td>同上，但会把已安装的软件包的安装包也删除掉</td></tr><tr><td>apt autoremove</td><td>删除为了满足其他软件包的依赖而安装，但现在不再需要的软件包</td></tr><tr><td>apt remove [软件包名]</td><td>删除已安装的软件包（保留配置文件）</td></tr><tr><td>apt --purge remove [软件包名]</td><td>删除已安装包（不保留配置文件）</td></tr></tbody></table>

### 2.问题一：取消登陆密码之后桌面无法进入(Ubuntu 循环登陆)
>
> 这个问题是我在 Ubuntu19.10 版本遇到的，20.04 版本中我没做验证，不确定是否有同样的问题。

在解决问题之前，先补充一个关键知识点：显示管理器（Display Manager），它用来提供图形化登陆，向用户显示图形化登陆界面，并处理用户身份验证。Linux 中常见的显示管理器包括 gdm3、kdm、LightDM 等：

* gdm3: gdm3 是 gdm 的继承者，它是 GNOME 的显示管理器；
* kdm: kdm 是 KDE 的显示管理器；
* LightDM: LightDM 是一个轻量级的显示管理器，他是显示管理器的规范解决方案。

## 原因

**

实操验证，初步断定是因为设置中开启了自动登陆，触发了 dgm3 的某种 bug 导致的。（Ubuntu19.10 默认使用的是 GNOME 桌面系统， 而 gdm3 是 GNOME 的显示管理器）

**解决方案**：使用 LightDM 替换 gdm3

第一步：安装 LightDM（由于你现在无法进入图形化桌面，因此需要你在登陆页面使用 ctl + alt + F2 快捷键进入命令行模式，输入账号密码登陆，然后使用下面的命令安装）

```bash
sudo apt-get install lightdm
```

安装完成后，系统会自动弹框要求你选择当前系统中已安装的显示管理器，选择 lightdm。

第二步：重启

```bash
sudo reboot
```

重启完就能正常登陆了。

这时候你会发现登陆界面变了，如果你想切回之前的登陆界面，在进入系统后把自动登陆关闭，然后实现下面的命令重新选择 gdm3 显示管理器即可（需重启生效）

```bash
sudo dpkg-reconfigure gdm3
```

> 并不是把自动登陆关闭后 gdm3 的 bug 就一定能规避掉，这一点可能只适用于我安装的 Ubuntu19.10；我这里说的原因也不一定适用所有人。但有一点可以肯定的是，如果出现循环登陆的情况，更换显示管理器通常是能解决问题的。

如果你想查看当前系统正在运行的显示管理器，可以使用下面的命令：

```bash
cat /etc/X11/default-display-manager
```

### 3.问题二：NVIDIA 驱动修复

Ubuntu 20.04 自带了 nvidia 显卡驱动，但是被我不小心玩坏了。主要表现在：

1. 前面提到的 xrandr 命令失效，无法实现小数倍缩放；
2. NVIDIA X Server Settings 客户端打开空白；
3. 命令行执行 `nvidia-settings` 命令出错；
4. \*\*Settings>Displays（设置 > 显示）\*\* 中无法设置多种分辨率等等。

如果你也和我遇到同样的问题，或者希望手动安装显卡驱动，可以按照下面的方式操作。(需要首先到 [NVIDIA 官网](https://www.nvidia.com)下载你设备对应的显卡驱动)

```bash
# 先安装一些依赖库
sudo apt install build-essential libglvnd-dev pkg-config
# 停止桌面管理器，进入命令行摸索
sudo telinit 3
# 删除已安装的 nvidia 驱动
sudo apt purge "nvidia\*"
# 手动安装显卡驱动
sudo bash NVIDIA-Linux-x86\_64-440.82.run 
# 重启
sudo reboot
```

更多显卡驱动方式可参考：[linuxconfig.org/how-to-inst…](https://linuxconfig.org/how-to-install-the-nvidia-drivers-on-ubuntu-20-04-focal-fossa-linux)

## 二、软件安装

### 1.deb 安装工具

* gdebi 安装工具

```bash
sudo apt install gdebi
```

* 使用

```bash
sudo gdebi <file>.deb
```

或者对于官网已经提供了 Ubuntu 版本 .deb 安装文件的，可在官网下载 .deb 安装文件后，执行下面的命令安装：

``` bash
# 安装
sudo apt install <file>.deb

```

如果你是较早的 Linux 发行版本，需要使用下面的命令安装（下同）：

```bash
sudo dpkg -i <file>.deb
# Install dependencies
sudo apt-get install -f 
```

### 3.Visual Studio

## 不要用 Snap Store 安装，有 BUG，无法输入中文

**

从 Ubuntu Software Apps 安装的是 snap 软件包，也就是非 vscode 官方编译发布的安装包，存在题主所遇到的输入法 bug，按 VSCode 官网下载步骤重新安装即可。

[Linux 上的 Visual Studio 代码](https://code.visualstudio.com/docs/setup/linux)

```bash
sudo apt install ./<file>.deb
# If you're on an older Linux distribution, you will need to run this instead:
# sudo dpkg -i <file>.deb
# sudo apt-get install -f # Install dependencies
```

### 4.其他软件

<table><thead><tr><th>软件</th><th>简要介绍</th></tr></thead><tbody><tr><td><a href="https://www.wps.cn/product/wpslinux" target="_blank" rel="noopener">WPS For Linux</a></td><td>在 Linux 上大概也就只有 WPS 能用了</td></tr><tr><td><a href="https://music.163.com/#/download" target="_blank" rel="noopener">网易云音乐</a></td><td>目前可用的国产 Linux 平台音乐播放器中比较好用的一款</td></tr><tr><td><a href="https://www.vmware.com/go/getWorkstation-linux" target="_blank" rel="noopener">Vmware</a></td><td>一款闭源的虚拟机，但运行效率比 Virtual Box 高了不少</td></tr></tbody></table>

## 安装软件

安装源内的软件

部分软件可以直接使用一条命令安装：

```bash
sudo apt-get install gdebi vim fbterm rar p7zip-full vlc smplayer gnome-tweak-tool curl wget git fbreader viewnior gimp telegram-desktop aptitude syncthing chrome-gnome-shell gpick gnome-shell-pomodoro gcc g++ glances flameshot unar jpegoptim pngquant npm nodejs
```

<table><thead><tr><th>软件</th><th>简要介绍</th></tr></thead><tbody><tr><td>gdebi</td><td>安装. deb 必备工具</td></tr><tr><td>vim</td><td>系统没有自带</td></tr><tr><td>fbterm</td><td>让 tty 显示中文</td></tr><tr><td>p7zip-full</td><td>用于压缩和解压 7z 压缩包</td></tr><tr><td>rar</td><td>用于压缩和解压 rar 压缩包</td></tr><tr><td>vlc</td><td>Linux 上最好用的视频播放器之一，网易云音乐客户端必备依赖</td></tr><tr><td>smplayer</td><td>视频播放器，vlc 打开有问题的视频或字幕可以用 vlc 代替</td></tr><tr><td>curl</td><td>命令行网站开发工具，可以在命令行界面呈现网页结构</td></tr><tr><td>wget</td><td>命令行网络下载工具</td></tr><tr><td>git</td><td>同步 girhub 源码或多人协同开发必备的工具</td></tr><tr><td>gnome-tweak-tool</td><td>gnome 桌面必备的管理软件，换主题、装插件都需要用到</td></tr><tr><td>fbreader</td><td>电子书阅读器，支持 epub、txt 等，目前在 linux 下还没发现更好的阅读器</td></tr><tr><td>viewnior</td><td>图片查看器，自带裁剪功能（虽然有点难用），重要的是界面十分简洁</td></tr><tr><td>gimp</td><td>linux 上的 photoshop，通过设置<code>窗口</code> ⇒ <code>单窗口</code>可以以一个窗口形式显示</td></tr><tr><td>telegram-desktop</td><td>社交通讯软件</td></tr><tr><td>aptitude</td><td>比 apt 更好的软件安装工具</td></tr><tr><td>syncthing</td><td>同步工具</td></tr><tr><td>chrome-gnome-shell</td><td>可通过浏览器安装和管理 gnome 插件的工具</td></tr><tr><td>gpick</td><td>颜色拾取工具</td></tr><tr><td>gnome-shell-pomodoro</td><td>一个为番茄工作法打造的简单计时器</td></tr><tr><td>glances</td><td>替代 top 的任务管理器</td></tr><tr><td>flameshot</td><td>截图工具，可添加文字、箭头等，设置快捷键命令:<code>flameshot gui</code></td></tr><tr><td>unar</td><td>几乎支持所有格式并能自动识别编码的解压工具，对付 unzip 解压后文件名乱码尤为有效</td></tr><tr><td>jpegoptim</td><td>压缩 jpg 的工具，用法：<code>jpegoptim -m70 *.jpg</code></td></tr><tr><td>pngquant</td><td>压缩 png 的工具，用法：<code>pngquant --quality=70 --ext=.png --force *.png</code></td></tr><tr><td>npm、nodejs</td><td>略</td></tr></tbody></table>

npm 和 nodejs 在仓库中的版本较旧，所以安装完后还需要另外升级：

```bash
sudo apt install npm nodejs -y
sudo npm config set registry https://registry.npm.taobao.org
sudo npm install -g n
sudo n stable
```

### V2Ray

一款科学上网工具，相比于 ss(r) 更复杂，而正因为复杂，上手门槛高，所以用的人少，也更安全。

#### 安装

由于配置复杂，不是三言两语就可以说清楚的，所以只说明如何安装：

```bash
sudo su
bash <(curl -L -s https://install.direct/go.sh)
```

## 四. 桌面美化

主要两个网站

[扩展](https://extensions.gnome.org)|[主题](https://www.gnome-look.org)

我使用的主题[McMojave Original GTK3 Themes](https://www.gnome-look.org/p/1275087)

图标[McMojave-circle](https://www.opendesktop.org/p/1305429)

鼠标[Capitaine Cursors](https://www.gnome-look.org/p/1148692)|[OSX El Capitan](https://www.gnome-look.org/p/1084939)

gnome shell 主题[更改 gnome shell 主题](https://www.gnome-look.org/p/1213208)

grub 界面美化[Grub-theme-vimix](https://www.gnome-look.org/p/1009236/)

开机密码框[High Ubunterra](https://www.gnome-look.org/p/1207015/)

模糊效果(Blry)
Blry 有可能报错,输入下面命令

```bash
sudo apt install gir1.2-gtkclutter-1.0
```

### 1. 安装 tweek

```bash
sudo apt install gnome-tweaks
```

### 2. 安装插件扩展支持

```bash
#让 gnome 支持插件扩展
sudo apt install gnome-shell-extensions 
# chrome 浏览器扩展支持，可以使用浏览器安装插件
sudo apt install chrome-gnome-shell
```

### 3. 常用插件清单

<table><thead><tr><th>插件名</th><th>说明</th></tr></thead><tbody><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/307/dash-to-dock/" rel="nofollow noopener noreferrer">Dash to Dock</a></td><td>自定义 dock</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/1112/screenshot-tool/" rel="nofollow noopener noreferrer">Screenshot Tool</a></td><td>截图插件</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/779/clipboard-indicator/" rel="nofollow noopener noreferrer">Clipboard Indicator</a></td><td>扩展粘贴板，可以看到历史粘贴内容</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/97/coverflow-alt-tab/" rel="nofollow noopener noreferrer">Coverflow Alt-Tab</a></td><td>修改 Alt-Tab 应用切换效果</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/6/applications-menu/" rel="nofollow noopener noreferrer">Applications Menu</a></td><td>在顶部状态栏添加应用程序入口</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/750/openweather/" rel="nofollow noopener noreferrer">OpenWeather</a></td><td>顶部状态栏显示天气数据</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/8/places-status-indicator/" rel="nofollow noopener noreferrer">Places Status Indicator</a></td><td>顶部状态栏增加文件目录访问入口</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/59/status-title-bar/" rel="nofollow noopener noreferrer">Status Title Bar</a></td><td>在顶部状态栏中显示当前窗口的标题</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/1732/gtk-title-bar/" rel="nofollow noopener noreferrer">GTK Title Bar</a></td><td>移除非 gtk 应用程序的标题栏</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/545/hide-top-bar" rel="nofollow noopener noreferrer">Hide Top Bar</a></td><td>自动隐藏状态栏</td></tr><tr><td><a target="_blank" href="https://extensions.gnome.org/extension/1708/transparent-top-bar" rel="nofollow noopener noreferrer">Transparent Top Bar</a></td><td>透明状态栏</td></tr><tr><td>...</td><td>...</td></tr></tbody></table>

更多扩展插件大家自行在 [extensions.gnome.org](https://extensions.gnome.org) 上探索吧。

### 4. 主题

可在 [GNOME-LOOK](gnome-look.org) 上下载各种桌面主题、Shell 主题、图标（icon）主题

## 安装桌面或者 shell 主题

**

```bash
# 解压下载的主题文件
tar -xvf FileName.tar //解压

# 将解压后的主题文件拷贝到 /usr/share/themes
sudo cp -r FileName /usr/share/themes
```

## 安装 icon 主题

**

```bash
# 解压下载的主题文件
tar -xvf FileName.tar //解压

# 将解压后的主题文件拷贝到 /usr/share/icons
sudo cp -r FileName /usr/share/icons
```

之后打开 Tweeks(优化) 选择安装的主题即可

## 更改 gnome shell 主题

**

## grub 界面美化

**

对于 grub 的操作稍显复杂，如果出错可能就开不了机，所以若是新手，那么推荐使用软件来进行配置，可以安装`grub-customizer`，有问题的地方软件也有提示，对新手还是很友好的：

```bash
sudo add-apt-repository ppa:danielrichter2007/grub-customizer
sudo apt-get update
sudo apt-get install grub-customizer
```

如果要自己折腾，则可以考虑下面的在 [GRUB Themes - Gnome-look.org](https://www.gnome-look.org/browse/cat/109/order/latest/) 上找一个主题，按照主题下方的设置方法配置即可，下面挑了几个还不错的主题：

* [SleekDragon GRUB Splash](https://www.gnome-look.org/p/1009741/)
* [Grub-theme-stylishdark](https://www.gnome-look.org/p/1009237/)
* [Poly dark](https://www.gnome-look.org/p/1230780/)
* [Grub-theme-vimix](https://www.gnome-look.org/p/1009236/)_（在用）_
* [Blur grub](https://www.gnome-look.org/p/1220920/)

![fVjI3dwUWomGxA4](https://i.loli.net/2020/07/11/fVjI3dwUWomGxA4.jpg)

这些 grub 主题大都有一键安装脚本，没有的话主题下载界面下方也有安装教程

*如果想换掉主题自带的背景图片，则需要转为 32 位色：_

```bash
convert background.jpeg --colors 32 background-32.jpeg
```

[Grub-theme-vimix](https://www.gnome-look.org/p/1009236)

### 5. 壁纸

推荐几个下载 4K 8K 超高清壁纸的网站：

[pixabay.com](https://pixabay.com)

[unsplash.com](https://unsplash.com)

[wallpapersite.com](https://wallpapersite.com)

[wallpapershome.com](https://wallpapershome.com)

## 系统配置

开机自动挂载 win 分区

自动挂载分区可以保证随时可用，还能设定好读写权限。

先在 / mnt 下建立文件夹`C`、`D`、`E`、…，有几个盘就建几个，然后查看分区情况：

```bash
lsblk
```

**盘的名称不要有中文**
如果上面有的没有/media 首先打开文件管理-其它位置-依次把其他盘符都点一遍

找到对应的盘，方法一般是通过大小来判断，之后编辑配置文件：

```bash
sudo vim /etc/fstab
```

在文件最后添加以下内容，其中包括自动挂载 windows 下的磁盘，/dev / 后的内容以刚才查看到的分区情况为准，以及使用 tmpfs 和 Btrfs 优化 SSD 使用寿命：

```bash
# disk C,D,E for Windows
/dev/sda1   /media/zzjtnb/Software       ntfs    defaults,noatime,nosuid,x-gvfs-name=D盘  0 0
/dev/sda2   /media/zzjtnb/Games        ntfs    defaults,noatime,nosuid,x-gvfs-name=E盘  0 0
/dev/sda3   /media/zzjtnb/Backups        ntfs    defaults,noatime,nosuid,x-gvfs-name=F盘  0 0
/dev/sdb4   /media/zzjtnb/Download        ntfs    defaults,noatime,nosuid,x-gvfs-name=G盘  0 0

# choosing the best performance options for Btrfs + SSD while still maximizing SSD lifetime.
rw,noatime,compress=lzo,ssd,discard,space_cache,autodefrag,inode_cache       0 0
tmpfs       /tmp            tmpfs   defaults,noatime,mode=1777,nosuid        0 0
tmpfs       /var/tmp        tmpfs   defaults,noatime,mode=1777,nosuid        0 0
tmpfs       /var/spool      tmpfs   defaults,noatime,mode=1777,nosuid        0 0
tmpfs       /var/log        tmpfs   defaults,noatime,mode=1777,nosuid        0 0
tmpfs       /var/cache/apt  tmpfs   defaults,noatime,mode=1777,nosuid        0 0
```

重启后就会自动挂载上去了，本次生效可以使用以下命令：

```bash
sudo mount -a
```

## 常用命令

1.ubuntu 清除缓存。

```bash
sudo /etc/init.d/dns-clean start
```

2.自动安装驱动

```bash
sudo ubuntu-drivers autoinstall
```
