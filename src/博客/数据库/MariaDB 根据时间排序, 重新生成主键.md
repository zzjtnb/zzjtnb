---
title: MariaDB 根据时间排序, 重新生成主键
category: 数据库
tags:
  - MariaDB
cover: https://cdn.pixabay.com/photo/2023/07/04/07/25/self-consciousness-8105584_1280.jpg
---


表名:blogs
字段:id,path,title,sort,tags,img,content,hot,pageviews,created,updated

## 步骤如下

1. 复制 `blogs` 结构 到 `blogs_copy` 中 并清空 `blogs_copy` 的数据
2. 从 `blogs` 表插入数据到 `blog_copy` 表中并按 `created` 排序
3. 重置 `blogs_copy` 的 自动递增值 (AUTO_INCREMENT) 是`blogs_copy`表的长度
4. 检查 `blogs_copy` 数据
5. 删除 `blogs`
6. 保存 `blogs_copy` 为 `blogs` 表

## 完整代码

```sql
-- 开始事务
START TRANSACTION;

-- 复制表结构并清空数据
CREATE TABLE blogs_copy LIKE blogs;
TRUNCATE TABLE blogs_copy;

-- 插入数据并按时间排序
INSERT INTO blogs_copy (path, title, sort, tags, img, content, hot, pageviews, created, updated)
SELECT path, title, sort, tags, img, content, hot, pageviews, created, updated
FROM blogs
ORDER BY created;

-- 获取`blogs_copy`表的长度
SET @count = (SELECT COUNT(*) FROM blogs_copy);

-- 构建动态SQL语句
SET @sql = CONCAT('ALTER TABLE blogs_copy AUTO_INCREMENT = ', @count + 1);

-- 执行动态SQL语句
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 检查复制后的数据
SELECT * FROM blogs_copy;

-- 删除原表并重命名复制表为原表名
DROP TABLE blogs;
RENAME TABLE blogs_copy TO blogs;

-- 提交事务
COMMIT;
```

## 查看表结构

```sql
DESCRIBE blogs;
```

或者

```sql
SHOW COLUMNS FROM blogs;
```
