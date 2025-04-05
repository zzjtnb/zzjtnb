---
title: mysql合并两张字段相同的表
category: 数据库
tags:
  - mysql
cover: https://cdn.pixabay.com/photo/2022/06/06/17/56/flowers-7246619_960_720.jpg
---

```sql
--查询 A 库中总共有多少条记录
SELECT
 COUNT(*)
FROM
 A.users

--查询 A 库中 users 总共有多少条记录
SELECT
 COUNT(A.users.username)
FROM
 A.users

--查询 A 库中 users 表中的 username 和 B 库中 users 表中的 username相同的数据
SELECT
 A.users.*,
 B.users.*
FROM
 A.users,
 B.users
WHERE
 A.users.username = B.users.username
 -- 限制15条记录
 -- LIMIT 15

-- 查询两个表中相同字段的字段总共有多少条
SELECT
 COUNT(*)
FROM
 A.users,
 B.users
WHERE
 A.users.username = B.users.username

-- 合并两张字段相同的表,主键id自增,如果某个字段的值相同则不合并
-- 下面的示例是将B库的 users 表插入到A库的 users 表,
-- A库的 users 表和B库的 users 表字段结构相同,id 为自增主键,
-- 如果A库的 users 表的username和B库的 users 表的username相等则忽略该条记录
INSERT INTO A.users
SELECT
 ( CASE B.users.id WHEN NOT NULL THEN NULL  END ) id ,
 B.users.username,
 B.users.age,
FROM
 B.users
WHERE
 B.users.username NOT IN (
  SELECT
   A.users.username
  FROM
   A.users
  )
 --限制10条记录
 -- LIMIT 10

-- 合并两张字段相同的表,主键id自增,如果某个字段的值相同则不合并
-- 下面的示例是将B库的 users 表插入到A库的 users 表,
-- A库的user表和B库的 users 表字段结构相同,id为自增主键,
-- 如果A库的user表的username,createdAt和B库的user表的username,createdAt相等则忽略该条记录
INSERT INTO A.users
SELECT
 ( CASE B.users.id WHEN not NULL THEN NULL  END ) id ,
 B.users.username,
 B.users.age,
FROM
 B.users
WHERE
 B.users.username NOT IN (
 SELECT
  A.users.username
 FROM
  A.users
 )
 OR
 B.users.createdAt NOT IN (
 SELECT
  A.users.createdAt
 FROM
  A.users
 )
 --限制10条记录
 -- LIMIT 10


下面是将两个库 A 和 B 中根据users表的username字段相同的数据
根据 B 库中 users_bak 中 username 合并 B 库的 subject 表到 A 库的 subject 表,

--第一步:
-- 在 B 库复制 users 表结构到新表users_bak
-- 查询 A 库中的 users 表中的 username 和 B 库中的 users 表中的 username 不相同的数据
-- 将不相同的数据插入到 B 库 users_bak 表中
INSERT INTO B.users_bak
SELECT
( CASE A.users.id WHEN NOT NULL THEN NULL END ) id,
 A.users.username,
 A.users.age,
FROM
 A.users
WHERE
 A.users.username NOT IN (
  SELECT
   B.users.username
  FROM
   B.users
  )

-- 第二步:
-- 查询 B 库中 subject 表中的 username 和 B 库中 users_bak 表中的 username 相同的数据
-- 将相同的数据中的 username 加后缀 '_test' 插入到 A 库 users 表中
INSERT INTO A.subject
SELECT
 ( CASE B.subject.id WHEN NOT NULL THEN NULL END ) id,
 ( CASE B.subject.username WHEN B.subject.username THEN CONCAT( B.subject.username, '_test' ) END ) username,
  B.subject.age,
FROM
 B.subject
WHERE
 B.subject.username IN ( SELECT B.users_bak.username FROM B.users_bak )

```
