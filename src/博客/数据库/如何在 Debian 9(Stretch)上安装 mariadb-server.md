---
title: 如何在 Debian 9（Stretch）上安装 mariadb-server
category: 数据库
tags:
  - mariadb
cover: https://cdn.pixabay.com/photo/2018/07/26/07/45/valais-3562988_960_720.jpg
---

## 安装 mariadb-server

----------------

在 Debian 9（Stretch）上安装 mariadb-server 软件包就像在终端上运行以下命令一样容易：

```bash
sudo apt-get update
sudo apt-get install mariadb-server
```

MariaDB 服务将自动启动。您可以输入以下内容进行验证：

```bash
sudo systemctl status mariadb
```

## 设置开机启动

```bash
sudo systemctl enable mariadb
```

## 执行初始化命令(保护 MariaDB)

为提高 MariaDB 安装的安全性，请运行 mysql_secure_installation 脚本：

```bash
mysql_secure_installation
```

初始化过程中会提示进行如下配置

```bash
# 输入原来的root密码，这里没有密码，直接回车就可以了
Enter current password for root (enter for none):

# 更改root密码？
Change the root password?

# 删除匿名用户？
Remove anonymous users?

# 禁用root远程登录？ 注：我选了否，最后还是要自己配置
Disallow root login remotely?

# 是否删除test测试数据库？
Remove test database and access to it?

# 重新加载权限数据表
Reload privilege tables now?
```

配置完成后可以考虑重新启动一下 MariaDB

```bash
systemctl restart mariadb
```

## 为 MariaDB 配置远程访问权限

MariaDB 与普通的 MySQL 数据库的一个不同在于它的配置文件不止一个，它将不同的数据放入到不同的配置文件中，之前的/etc/mysql/my.cnf 内容如下：
从文件中的注释上来看，它主要有这么几个配置文件

1. `/etc/mysql/mariadb.cnf` 默认配置文件,
2. `/etc/mysql/conf.d/*.cnf` 设置全局项的文件
3. `/etc/mysql/mariadb.conf.d/*.cnf` 设置与 MariaDB 相关的信息
4. `~/.my.cnf` 设置该账户对应的信息

这也就是为什么我们在`my.cnf`做相关设置有的时候不起作用（可能在其他配置文件中有相同的项，MySQL 最终采用的是另外一个文件中的设置）。
根据官方的说法， MariaDB 为了提高安全性，默认只监听 127.0.0.1 中的 3306 端口并且禁止了远程的 TCP 链接，我们可以通过下面两步来开启 MySQL 的远程服务

* 注释掉`skip-networking`选项来开启远程访问.
* 注释`bind-address`项，该项表示运行哪些 IP 地址的机器连接，允许所有远程的机器连接
但是配置文件这么多，这两选项究竟在哪呢？这个时候使用 grep 在/etc/mysql/目录中的所有文件中递归查找，看哪个文件中含有这个字符串
我们输入：

```bash
grep -rn "skip-networking" *
```

1. 修改地址绑定

编辑`/etc/mysql/mariadb.conf.d/50-server.cnf`文件将其中的

```bash
bind-address = 127.0.0.1
```

更改为需要放行的地址，如更改为 0.0.0.0 则接受所有 IP 地址的连接请求

```bash
bind-address = 0.0.0.0
```

## 调整用户身份验证和权限

在运行 MariaDB 10.1 的 Debian 系统中，使用 unix_socket 插件(默认情况下，而不是密码)将 root MariaDB 用户设置为，这允许在许多情况下更大的安全性和可用性，但是在需要外部程序(比如 phpMyAdmin )管理权限时也会复杂。
为此，我们创建一个名为 admin 的新帐户，具有与 root 帐户相同的功能，但是配置为密码，为此，请从终端打开 MariaDB 提示符：

### 登录

```bash
mysql -u root -p
```

### 修改 root 登陆密码

```bash
格式：mysql> set password for 用户名@localhost = password('新密码');
例子：mysql> set password for root@localhost = password('root');
```

### 查看用户

```sql
select User, host from mysql.user;
```

在我安装之后，只能看到一个本地 root 用户
<table><thead><tr><th>host</th><th>user</th></tr></thead><tbody><tr><td>localhost</td><td>root</td></tr></tbody></table>

所以要添加一个远程登录的用户，因为是自己用，我就直接添加了一个授予所有权限的用户，如果是生产环境，慎重！！！

### 创建用户并授权

```bash
-- 创建用户
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
--示例1，允许所有从任意地址登录的用户： create user 'ActionNet'@'%' identified by 'zxc123';
--示例2，允许从192.168.199.100登录的用户： create user 'ActionNet'@'192.168.199.100' identified by 'zxc123';

-- 授予权限
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名';
-- 示例：授予任意地址登录ActionNet用户所有数据库所有权限
GRANT ALL ON *.* TO 'ActionNet'@'%';

```

## 也可以单独以下设置

#### 创建用户

```sql
create user admin;
```

#### 授权

```sql
/**GRANT ALL PRIVILEGES ON *.* TO 用户@"%" IDENTIFIED BY '密码' WITH GRANT OPTIO*/
GRANT ALL PRIVILEGES ON *.* TO admin@"%" IDENTIFIED BY 'admin' WITH GRANT OPTION;
```

## 最后要刷新权限生效

```sql
flush privileges;
```

* 启动 MariaDB 命令：`systemctl start mariadb.service`
* 停止 MariaDB 命令：`systemctl stop mariadb.service`
* 重启 MariaDB 命令：`systemctl restart mariadb.service`

## Mariadb 数据库导入命令

## 方法 1：进入数据库先建数据库，再导入数据

MariaDB [(none)]> create database XXX; //建立空数据库 XXX
MariaDB [(none)]> use XXX; //选择数据库 XXX
MariaDB [(none)]> set names utf8; //设置数据库导入编码
MariaDB [(none)]> source /home/renwole.sql; //导入数据（注意 sql 文件的路径）
方法 2：直接导入

## 方法 2 直接导入

``` bash
mysql -uroot -p 数据库名 < 路径
```

## 错误

## Error: Access denied for user 'root'@'localhost'

```bash
mysql -u root -p

GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'root';
```

有关 apt-get install 的更多信息

Advanced Package Tool 或 APT 是一个免费软件用户界面，可与核心库配合使用，以处理 Debian，Ubuntu 和其他 Linux 发行版上的软件安装和删除。APT 通过自动化从预编译文件或通过编译源代码进行的软件包的检索，配置和安装，简化了类 Unix 计算机系统上软件的管理过程。

apt-get 是用于处理软件包的命令行工具，对于使用 APT 库的其他工具，可以将其视为用户的“后端”。

apt-get install 之后是安装或升级所需的一个或多个软件包。每个软件包都是一个软件包名称，而不是完全限定的文件名。指定安装的软件包所需的所有软件包也将被检索并安装。/etc/apt/sources.list 文件用于找到所需的软件包。如果在软件包名称后附加了连字符（中间没有空格），则已标识的软件包将被删除（如果已安装）。类似地，可以使用加号指定要安装的软件包。后面的这些功能可用于替代 apt-get 的冲突解决系统做出的决策。

## 也可以看看

[如何从 Debian 9（Stretch）删除 mariadb-server 软件包](https://zzjtnb.com/blog/details/rhcdebian9stretchscmariadbserver)
