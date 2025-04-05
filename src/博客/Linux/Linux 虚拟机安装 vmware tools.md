---
title: Linux虚拟机安装vmware tools
category: Linux
tags:
  - Linux
cover: https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
---

一、安装 vmware tools
 在虚拟机的设置→显示器里面开启 3D 加速
 Ctrl+alt+T：打开终端

 方式一
  1.移除自带的
   sudo apt-get remove open-vm-tools  
   然后重启
  2. 安装 open-vm-tools
   sudo apt-get install open-vm-tools open-vm-tools-desktop  
   然后重启
  一步到位
 方式二、
 1.更新下系统源
  sudo apt update
 2.安装 open-vm-tools
  sudo apt install open-vm-tools
 3.实现文件夹共享
  安装 open-vm-tools-dkms
  sudo apt install open-vm-tools-dkms
 4.桌面环境还需要安装 open-vm-tools-desktop 以支持双向拖放文件
  sudo apt install open-vm-tools-desktop

二、VM 中解决 Ubuntu 不能全屏的问题
 sudo apt install open-vm*
 有几个注意的点：
  如果要实现文件夹共享，需要安装 open-vm-tools-dkms
  桌面环境还需要安装 open-vm-tools-desktop 以支持双向拖放文件
  Arch Linux 用户如果需要双向拖放文件，还需要安装 gtkmm 和 gtkmm3
  
三、在虚拟机设置里设置好共享文件夹，启动虚拟机后，如果 Ubuntu 中没有设置的共享文件。可以通过下面的两种方法解决：
 1.可以使用 vmhgfs-fuse 命令，比如在虚拟机里有个目录 ~/share,终端中切换到家目录，然后：
  vmhgfs-fuse share
 此方法适合不是每次都使用共享文件的状况，可以编写一个脚本 share.sh 放到家目录
  #!/bin/bash
  vmhgfs-fuse share
 2.如果要在开机是自动挂载共享文件夹，则需更改/etc/fstab 文件。打开文件后在最后添加：
  .host:/         /mnt/hgfs               fuse.vmhgfs-fuse allow_other,defaults   0       0

四、如何查看是否安装成功 open-vm-tools

 1. /etc/init.d
 2. ls
 3.可以看到 open-vm-tools
 4.然后在系统设置中调节显示屏大小,通过设置 Ubuntu 的分辨率解决
 5.之后通过 Ctrl+Alt+Enter 即可进入全屏。
