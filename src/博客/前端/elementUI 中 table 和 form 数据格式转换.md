---
title: elementUI中 table和form数据格式转换
category: 前端
tags:
  - element
cover: https://images.unsplash.com/photo-1517080915377-c44ce4921df1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80
---

## 新建 filters.js

```JavaScript
let filters = {
  /*域名状态 */
  status (v) {
    if (v == 'ok') return "正常";
    if (v == 'userlock') return "用户锁定";
  },
  /*域名接管状态 */
  takeOverStatus (val) {
    if (val == 'Untaken over') return "未接管";
    if (val == 'Taken over') return "已接管";
    if (val == 'warn') return "接管异常示";
  },
  /*污染状态 */
  wuran (v) {
    if (v == "yes") return "正常";
    if (v == 'no') return "被污染";
  },
}
export default filters

```

## main.js

```JavaScript
import filters from './filters/filters'
for (let k in filters) {
  Vue.filter(k, filters[k]);
}
```

## test.vue

```html
<template>
  <div> 
   <!--工具条--> 
   <el-col :span="24" class="toolbar" style="padding-bottom: 0px;"> 
    <el-form :inline="true" :model="filters"> 
     <el-form-item> 
      <el-input v-model="filters.ip" placeholder="输入IP查找" clearable=""></el-input> 
     </el-form-item> 
     <el-form-item label="日期范围"> 
      <el-date-picker v-model="filters.dates" type="daterange" align="left" unlink-panels="" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker> 
     </el-form-item> 
     <el-form-item> 
      <el-button type="primary" v-on:click="getAccount">
       查询
      </el-button> 
      <audio id="audio" src="/static/sms.mp3"> 
      </audio>
     </el-form-item> 
     <el-form-item> 
      <el-button type="warning" @click="handleAdd">
       新增
      </el-button> 
     </el-form-item> 
    </el-form> 
   </el-col> 
   <!--列表--> 
   <el-table :data="records" ref="tb" highlight-current-row="" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;"> 
    <el-table-column type="selection" width="55"></el-table-column> 
    <el-table-column prop="domain" label="域名名称"></el-table-column> 
    <el-table-column prop="status" label="域名状态"> 
     <template slot-scope="scope">
      {{scope.row.status | status}}
     </template> 
    </el-table-column> 
    <el-table-column prop="takeOverStatus" label="接管状态"> 
     <template slot-scope="scope">
      {{scope.row.takeOverStatus | takeOverStatus}}
     </template> 
    </el-table-column> 
    <el-table-column prop="platform" label="域名厂商"></el-table-column> 
    <el-table-column prop="wuran" label="污染状态"> 
     <template slot-scope="scope">
      {{scope.row.wuran | wuran}}
     </template> 
    </el-table-column> 
    <el-table-column prop="createTime" label="创建时间"></el-table-column> 
    <el-table-column label="操作"> 
     <template slot-scope="scope"> 
      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
       编辑
      </el-button> 
      <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
       删除
      </el-button> 
     </template> 
    </el-table-column> 
   </el-table> 
   <!--编辑界面--> 
   <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false"> 
    <el-form :model="editForm" label-width="80px" ref="editForm" :rules="addFormRules"> 
     <el-form-item label="域名名称" prop="domain"> 
      <el-input v-model="editForm.domain"></el-input> 
     </el-form-item> 
     <el-form-item label="域名状态" prop="status"> 
      <el-select v-model="editForm.status" placeholder="请选择"> 
       <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> 
      </el-select> 
     </el-form-item> 
     <el-form-item label="接管状态" prop="takeOverStatus"> 
      <el-select v-model="editForm.takeOverStatus" placeholder="请选择"> 
       <el-option v-for="item in takeOverStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> 
      </el-select> 
     </el-form-item> 
     <el-form-item label="域名厂商" prop="platform"> 
      <el-input v-model="editForm.platform"></el-input> 
     </el-form-item> 
    </el-form> 
    <div slot="footer" class="dialog-footer"> 
     <el-button @click.native="editFormVisible = false">
      取消
     </el-button> 
     <el-button type="primary" @click.native="editSubmit">
      提交
     </el-button> 
    </div> 
   </el-dialog> 
   <!--新增界面--> 
   <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false"> 
    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm"> 
     <el-form-item label="域名名称" prop="domain"> 
      <el-input v-model="addForm.domain"></el-input> 
     </el-form-item> 
     <el-form-item label="域名状态" prop="status"> 
      <el-select v-model="addForm.status" placeholder="请选择"> 
       <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> 
      </el-select> 
     </el-form-item> 
     <el-form-item label="接管状态" prop="takeOverStatus"> 
      <el-select v-model="addForm.takeOverStatus" placeholder="请选择"> 
       <el-option v-for="item in takeOverStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> 
      </el-select> 
     </el-form-item> 
     <el-form-item label="域名厂商" prop="platform"> 
      <el-input v-model="addForm.platform"></el-input> 
     </el-form-item> 
    </el-form> 
    <div slot="footer" class="dialog-footer"> 
     <el-button @click.native="addFormVisible = false">
      取消
     </el-button> 
     <el-button type="primary" @click.native="addSubmit" :loading="addLoading">
      提交
     </el-button> 
    </div> 
   </el-dialog> 
   <!--工具条--> 
   <el-col :span="24" class="toolbar"> 
    <el-button type="primary" @click="handleAllSelect">
     全选
    </el-button> 
    <el-button type="danger" @click="batDel" :disabled="this.sels.length===0">
     批量删除
    </el-button> 
    <el-pagination layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total" style="float:right;"></el-pagination> 
   </el-col> 
  </div>
</template>

<script>
import { addDetectDomain, editDetectDomain, batDelDetectDomain, deleteDetectDomain, listDetectDomain } from '../../api/api';
import util from '../../common/js/util'
import axios from 'axios'
export default {
  data () {
    let IP = (rule, value, callback) => {
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

      if (!value) {
        return callback(new Error('IP不能为空'));
      } else if (!reg.test(value)) {
        return callback(new Error('请输入合法的IP'));
      } else {
        return callback() // 一些同学的问题可能就出在这里
      }
    };
    return {
      total: 0,
      page: 1,
      pageSize: 20,
      sels: [],//列表选中列
      records: [],
      listLoading: false,
      value: '',
      addFormRules: {
        domain: [
          { required: true, message: '请输入域名名称', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择域名状态', trigger: 'blur' }
        ],
        takeOverStatus: [
          { required: true, message: '请选择接管状态', trigger: 'blur' }
        ],
        platform: [
          { required: true, message: '请输入域名厂商', trigger: 'blur' }
        ],
        wuran: [
          { required: true, message: '请选择污染状态', trigger: 'blur' }
        ]
      },
      addFormVisible: false,//新增界面是否显示
      //新增界面数据
      addForm: {
      },
      addLoading: false,
      editLoading: false,
      editFormVisible: false,//编辑界面是否显示
      //编辑界面数据
      editForm: {
      },
      filters: {
        ip: '',
        dates: ''
      },
      //时间段
      pickerOptions: {
        shortcuts: [{
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 / 12);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 / 4);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近半年',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 / 2);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一年',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      statusOptions: [{
        value: 'ok',
        label: '正常'
      }, {
        value: 'userlock',
        label: '用户锁定'
      }],
      takeOverStatusOptions: [{
        value: 'Untaken over',
        label: '未接管'
      }, {
        value: 'Taken over',
        label: '已接管'
      }, {
        value: 'warn',
        label: '接管异常示'
      }],

    }
  },
  mounted () {

  },
  created () {
    this.getAccount()
  },
  methods: {
    getAccount () {
      let start, end = '';
      if (this.filters.dates != '' && this.filters.dates != undefined) {
        start = util.formatDate.format(this.filters.dates[0], "yyyy-MM-dd 00:00:00");
        end = util.formatDate.format(this.filters.dates[1], "yyyy-MM-dd 23:59:59");
      }
      let para = {
        domain: '',
        page: this.page,
        size: this.pageSize,
        ip: this.filters.ip,
        startTime: start == undefined ? '' : start,
        endTime: end == undefined ? '' : end
      };
      this.listLoading = true,
        listDetectDomain(para).then((res) => {
          this.listLoading = false
          if (res.data.code == 200) {
            this.total = res.data.data.total
            this.page = res.data.data.pageNum
            this.pageSize = res.data.data.pageSize
            this.records = res.data.data.list
          }
        }).catch((err) => {

        });

    },

    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {};
    },

    //新增后台白名单
    addSubmit: function () {
      this.$refs.addForm.validate((valid1) => {
        if (valid1) {
          this.addLoading = true;
          let para = Object.assign({}, this.addForm);
          addDetectDomain(para).then((res) => {
            let msg = res.data.msg;
            let code = res.data.code;
            if (code == 200) {
              this.addLoading = false;
              this.addFormVisible = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.getAccount()
            } else {
              this.$message({
                message: msg,
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      this.editForm = {
        domain: row.domain,
        status: row.status,
        takeOverStatus: row.takeOverStatus,
        platform: row.platform
      };
      // this.editForm = row
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.editLoading = true;
          let para = Object.assign({}, this.editForm);
          editDetectDomain(para).then((res) => {
            let msg = res.data.msg;
            if (res.data.code == 200) {
              this.editLoading = false;
              this.editFormVisible = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.getAccount()
            } else {
              this.$message({
                message: msg,
                type: 'error'
              });
            }
          }).catch((err) => {

          });
        }
      });
    },
    //删除
    handleDelete: function (index, row) {
      let msg = "确认删除该记录吗?";
      let status = 0;
      this.$confirm(msg, '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        let para = {
          id: row.id,
          status: status
        };
        deleteDetectDomain(para).then((res) => {
          this.listLoading = false;
          let msg = res.data.msg;
          let code = res.data.code;
          if (code !== 200) {
            this.$message({
              message: msg,
              type: 'error'
            });
          } else {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getAccount()
          }
        });
      }).catch(() => {
      });
    },
    //全选
    handleAllSelect: function () {
      if (this.records) {
        this.records.forEach(row => {
          this.$refs.tb.toggleRowSelection(row);
        });
      }
    },
    //页变化
    handleCurrentChange (val) {
      this.page = val;
      this.getAccount();
    },
    //页大小变化
    handleSizeChange (val) {
      this.pageSize = val;
      this.getAccount();
    },
    //选中变化
    selsChange: function (sels) {
      this.sels = sels;
    },
    //批量删除
    batDel: function () {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        let para = { ids: ids };
        batDelDetectDomain(para).then((res) => {
          this.listLoading = false;
          let msg = res.data.msg;
          let code = res.data.code;
          if (code !== 200) {
            this.$message({
              message: msg,
              type: 'error'
            });
          } else {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getAccount()
          }
        });
      }).catch(() => {
      });
    },
  },
  components: {

  },
}
</script>

<style scoped>
</style>
```
