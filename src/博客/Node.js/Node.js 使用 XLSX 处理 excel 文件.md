---
title: Node.js 使用XLSX处理excel文件
category: Node.js
tags:
  - xlsx
  - excel
cover: https://cdn.pixabay.com/photo/2020/04/19/16/19/tree-5064341_960_720.jpg
---

```js
const XLSX = require('xlsx');
const { resources, domain } = require('../config/settings');
/**
 * 导出数据并生成文件
 * @param {*} data  -需要导出的JSON数据
 * @param {*} filename -需要导出的excel文件名,默认已.xlsx结尾
 */
function make_excel(data = [], filename = 'export') {
  const filePath = resources.downloads + filename + '.xlsx'
  const ws_name = "Sheet1";
  const ws = XLSX.utils.json_to_sheet(data);  //生成工作表
  const wb = XLSX.utils.book_new();  // 生成工作簿并添加工作表
  XLSX.utils.book_append_sheet(wb, ws, ws_name);
  try {
    XLSX.writeFile(wb, filePath);
    return { code: 200, message: 'success', data: domain+ filePath.replace('public', '') }
  } catch (error) {
    return { code: -1, message: '导出失败,文件导出路径不存在或没有权限' }
  }
}

function load_data(file) {
  const sheet2JSONOpts = { defval: null };//给defval赋值为null
  var wb = XLSX.readFile(file);//读取excel文件内容
  data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], sheet2JSONOpts);
  return data;//返回数据
}

module.exports = {
  make_excel,
  load_data,
};
```

使用

```js
const xlsx = require('../../utils/xlsx');
batchImport(req, res, next) {
  const keys = Object.keys(req.files), k = keys[0];
  const data = xlsx.load_data(req.files[k].path)
}

batchExport(req, res, next) {
  const result = await testModel.findAll({ raw: true })
  if (!result) return res.json({ code: -1, message: '导出失败请稍后再试' })
  const wb = xlsx.make_excel(result, '测试文件');
  res.json(wb)
}
```
