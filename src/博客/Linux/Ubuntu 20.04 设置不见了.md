---
title: ubuntu 20.04 设置不见了
category: Linux
tags:
  - Ubuntu
  - Linux
cover: https://images.unsplash.com/photo-1470290449668-02dd93d9420a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

ubuntu20.04 用着用着突然发现设置不见了，即使重启电脑还是找不到设置，后来通过扒帖子发现是一个包丢失了，gnome-control-center，重新安装一个这个包就好了

```bash
sudo apt install gnome-control-center
```

附上前面扒到的帖子：
><https://forum.ubuntu.com.cn/viewtopic.php?t=491114>
