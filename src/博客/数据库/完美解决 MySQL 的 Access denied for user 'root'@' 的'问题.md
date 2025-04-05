---
title: 完美解决 Mysql 的 Access denied for user 'root'@'% 的'问题
category: 数据库
tags:
  - mysql
cover: https://cdn.pixabay.com/photo/2021/01/05/19/55/winter-5892335_960_720.jpg
---

完美解决 Mysql 的 Access denied for user 'root'@'% 的'问题

>最近在分配 mysql 权限时出错, mysql 版本 5.6, 造成 mysql 在重新分配权限提示 "Access denied for user'root'@'%"，出错原因 reload 权限被收回，造成无法重新分配权限，其他类似权限问题也可以参照此方法。

解决办法

## 第一步：停服务

```bash
/etc/init.d/mysql stop
```

如果不行，就执行下一行：

```bash
service mysqld stop
```

报：

```bash
Stopping mysqld:  [OK]
```

## 第二步：跳过密码验证

```bash
/usr/bin/mysqld_safe --skip-grant-tables
```

报：

```bash
151104 09:07:56 mysqld_safe Logging to '/var/lib/mysql/iZ23dq2wm0jZ.err'.
151104 09:07:56 mysqld_safe Starting mysqld daemon with databases from /var/lib/mysql
```

## 第三步：无密码登录

执行命令行：

```bash
mysql -u root
```

## 第四步：授权

```sql
grant all privileges on *.* to 'root'@'localhost' identified by 'root' with grant option;
```

关键词解释：
**root'@'localhost: 是用户**
**root：是密码**

## 问题一：发现无密码条件下，没有授权的写权限

The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement

### 解决方法

```sql
set global read_only=0;#关掉新主库的只读属性
flush privileges; #刷新权限
grant all privileges on *.* to 'root'@'localhost' identified by 'root' with grant option; #再次重新授权
set global read_only=1; #读写属性
flush privileges; #刷新权限(注意刷新是必须项)   
exit;
```

## 第五步：重启数据库

## 关闭数据库

```bash
service mysqld stop
```

报：

```bash
Stopping mysqld:  [OK]
```

## 开启数据库

```bash
service mysqld start
```

报：

```bash
Starting mysqld:  [OK]
```

或者

```bash
service mysqld restart
```

通过以上步骤即可完美解决这个问题
