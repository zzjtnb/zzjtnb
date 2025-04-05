---
title: sequelize对应的mysql操作(指定日期、求和、批量创建，批量更新)
category: Node.js
tags:
  - sequelize
  - mysql
cover: https://cdn.pixabay.com/photo/2021/01/08/07/52/trees-5899195_960_720.jpg
---

查询指定日期某列相同字段之和大于某值

```js
const depbetlog = await depositbetlogModel.findAll({
  raw: true,
  group: ['username'],
  where: { createdAt: { [Op.lte]: times.monthEndTime, [Op.gte]: times.monthStartTime, }, },
  attributes: ['username', [sequelize.fn('sum', sequelize.col('totaldeposit')), 'totaldeposit']],
  having: sequelize.where(sequelize.fn('sum', sequelize.col('totaldeposit')), { [Op.gte]: 50 }),
});
```

对应 sql

```sql
SELECT `username`, sum(`totaldeposit`) AS `totaldeposit` FROM `depositbetlog` AS `depositbetlogModel` WHERE (`depositbetlogModel`.`createdAt` <= '2020-12-31 23:59:59' AND `depositbetlogModel`.`createdAt` >= '2020-12-01 00:00:00') GROUP BY `username` HAVING sum(`totaldeposit`) >= 50;
```

查询指定日期某列相同字段某个字段之和

```js
const depbetlog = await depositbetlogModel.findAll({
  raw: true,
  where: { createdAt: { [Op.lte]: times.monthEndTime, [Op.gte]: times.monthStartTime } },
  attributes: ['username', [sequelize.fn('sum', sequelize.col('totaldeposit')), 'totaldeposit'], [sequelize.fn('sum', sequelize.col('totalbet')), 'totalbet']],
  group: ['username'],
});
```

对应 sql

```sql
SELECT `username`, sum(`totaldeposit`) AS `totaldeposit`, sum(`totalbet`) AS `totalbet` FROM `depositbetlog` AS `depositbetlogModel` WHERE (`depositbetlogModel`.`createdAt` <= '2020-12-31 23:59:59' AND `depositbetlogModel`.`createdAt` >= '2020-12-01 00:00:00') GROUP BY `username`;
```

批量更新,重复则替换

```js
await memberModel.bulkCreate(data, { updateOnDuplicate: ['username', 'totaldeposit', 'totalbet', 'vipGrade', 'deadline', 'updatedAt'] })
```

批量创建,重复则失败

```js
memberModel.bulkCreate(data).then((result) => {
  upgradelogModel.bulkCreate(upgradelog, { silent: false }).catch((err) => { })//silent:如果为true则不会更新updateAt时间戳
  res.json({ code: 200, message: "导入成功", data: data })
}).catch((err) => {
  res.json({ code: -1, message: "有重复数据,导入失败", data: err.errors[0].message })
})
```

mysql 禁止指定字段相关的重复解决方案-->设置相关字段的索引,字段填写不允许重复的字段,索引类型选择 UNIQUE,索引方法选择 BTREE
