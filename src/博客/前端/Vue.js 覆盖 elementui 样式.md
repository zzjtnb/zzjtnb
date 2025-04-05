---
title: vue覆盖elementui样式
category: 前端
tags:
  - element
cover: https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

```html
<el-dialog title="人员列表" class="ebvdia" :visible.sync="ToastView"  width="80%">
      <el-form :model="EnterpriseDetails"  class="table" label-width="120px">
      </el-form>
 </el-dialog>

// 使用了scss 或者 less 

.ebvdia /deep/ {
  margin-top: -5vh;
  .el-dialog__body {
    height: 600px !important;
  }
}

//未使用scss less
.ebvdia >>> .el-dialog__body  {
  margin-top: -5vh;
  height: 600px !important;
}
```
