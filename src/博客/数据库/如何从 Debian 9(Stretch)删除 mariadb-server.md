---
title: 如何从 Debian 9（Stretch）删除 mariadb-server
category: 数据库
tags:
  - mariadb
cover: https://cdn.pixabay.com/photo/2020/09/04/16/18/mountains-5544365_960_720.jpg
---

卸载 mariadb-server

要从 Debian 9（Stretch）中仅删除 mariadb-server 软件包本身，请在终端上执行：

```bash
sudo apt-get remove mariadb-server
```

卸载 mariadb-server 及其附属程序包

要从 Debian Stretch 中删除不再需要的 mariadb-server 软件包和任何其他从属软件包。

```bash
sudo apt-get autoremove mariadb-server
```

清除 mariadb 服务器

如果您还想从 Debian Stretch 删除 mariadb-server 的配置和/或数据文件，那么它将起作用：

```bash
sudo apt-get purge mariadb-server
```

要从 Debian Stretch 删除 mariadb-server 及其依赖项的配置和/或数据文件，然后执行：

```bash
sudo apt-get autoremove --purge mariadb-server
```

有关 apt-get remove 的更多信息

Advanced Package Tool 或 APT 是一个免费软件用户界面，可与核心库配合使用，以处理 Debian，Ubuntu 和其他 Linux 发行版上的软件安装和删除。APT 通过自动化从预编译文件或通过编译源代码进行的软件包的检索，配置和安装，简化了类 Unix 计算机系统上软件的管理过程。

apt-get 是用于处理软件包的命令行工具，对于使用 APT 库的其他工具，可以将其视为用户的“后端”。

apt-get remove 与 install 相同，只不过软件包是删除而不是安装的。请注意，删除软件包会将其配置文件保留在系统上。如果软件包名称后加了一个加号（没有空格），则将安装而不是删除已标识的软件包。

## 也可以看看

[如何从 Debian 9（Stretch）删除 mariadb-server 软件包](https://zzjtnb.com/blog/details/rhzdebian9stretchsazmariadbserver)
