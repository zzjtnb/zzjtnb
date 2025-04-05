---
title: vue子父组件传值
category: 前端
tags:
  - Vue
cover: https://images.unsplash.com/photo-1539113770102-33c4d22a0c13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1350&q=80
---

```html
<!--vue子父组件传值 -->
<template>
  <div class="filter_content">
    <div class="form-box search-properties">
      <!-- 相关标签 -->
      <div class="filter-item">
        <ul class="filter-tag">
          <span>
            <svg class="icon">
              <use xlink:href="#biaoqian1" /></svg>
            <span>标签</span></span>
          <li v-for="(item, index) in labeles">
            <a :href="item.url" target="_blank" :style="{ background: `#${item.color}` }">{{ item.name }}</a></li>
        </ul>
      </div>
      <!-- <el-row :gutter="24">
      <el-col :xs="20" :lg="24"></el-col>
      </el-row>-->
      <!-- 自定义筛选 -->
      <div class="filter-tab">
        <el-row :gutter="24">
          <el-col :xs="24" :lg="12">
            <!-- 排序 -->
            <ul class="filter-tag">
              <div class="right">
                <li class="rightss">
                  <svg class="icon icos">
                    <use xlink:href="#xiajiantou" /></svg>
                  <a @click="createdTime($event)" class="on">发布日期</a></li>
                <li class="rightss">
                  <svg class="icon icos">
                    <use xlink:href="#xiajiantou" /></svg>
                  <a @click="updatedTime" class>修改时间</a></li>
                <li class="rightss">
                  <svg class="icon icos">
                    <use xlink:href="#xiajiantou" /></svg>
                  <a @click="commentsAmount" class>评论数量</a></li>
                <li class="rightss">
                  <svg class="icon icos">
                    <use xlink:href="#xiajiantou" /></svg>
                  <a href="/code?order=rand" class>随机</a></li>
                <li class="rightss">
                  <svg class="icon icos">
                    <use xlink:href="#xiajiantou" /></svg>
                  <a href="/code?order=hot" class>热度</a></li>
              </div>
            </ul>
          </el-col>
        </el-row>
      </div>
      <!-- .row end --></div>
    <!-- .form-box end --></div>
</template>
<script>import {
    getLabels
  }
  from "@/api/issue";
  export
default {
    props:
    {
      fatherMethod:
      {
        type:
        Function,
      default:
        null
      }
    },
    data() {
      return {
        labeles: []
      };
    },
    created() {
      this.labelesList();
    },
    mounted() {},
    computed: {},
    methods: {
      createdTime(event) {
        let data = {
          sort: "created"
        };
        this.$parent.issueList(data);
        event.target.classList.remove("on");
        console.log(event.target);
      },
      updatedTime() {
        let data = {
          sort: "updated"
        };
        this.fatherMethod(data);
      },
      commentsAmount() {
        let data = {
          sort: "comments"
        };
        this.$emit("callFather", data);
      },
      labelesList() {
        getLabels().then(response = >{
          this.labeles = response.data;
        });
      }
    },
    components: {}
  };</script>
<style scoped>
.icos {
 width: 0.7rem;
 height: 1rem;
}
.entry-meta label {
 float: left;
 background: #00b1ff;
 color: #606266;
 padding: 0px 4px;
 margin-right: 10px;
 font-size: 12px;
 display: inline-block;
 max-width: 100%;
}

.filter_content {
 position: relative;
 z-index: 1;
 display: block;
 margin-top: -90px;
 margin-bottom: 30px;
 padding: 20px;
 border: 1px solid #f3f3f3;
 border-radius: 4px;
 background-color: #fff;
 box-shadow: 0 34px 20px -24px rgba(0, 36, 100, 0.06);
}
.filter_content .form-box {
 padding: 0;
 padding-bottom: 0;
}
.form-box {
 margin-bottom: 30px;
 padding: 40px;
 border-radius: 4px;
 background-color: #fff;
}
.filter_content .filter-item {
 margin-top: 10px;
}
.filter_content .filter-item span {
 margin-right: 10px;
 padding: 2px 6px;
 border: 1px solid transparent;
 border-radius: 4px;
 background-color: #eee;
 color: #7b8695;
}
.filter_content .filter-tag li {
 display: inline-block;
 margin: 0;
 margin-bottom: 5px;
 padding: 0;
 list-style: none;
}
.filter_content .filter-item a {
 position: relative;
 display: inline-block;
 margin-top: 0;
 margin-right: 10px;
 padding: 0 10px;
 border: 1px solid transparent;
 border-bottom: 1px solid transparent;
 border-radius: 0;
 border-radius: 4px;
 color: white;
}
.filter_content .filter-tab {
 margin-top: 10px;
 margin-bottom: -10px;
 padding-top: 13px;
 border-top: 1px solid #e9e9e9;
}
.navbar .menu-item-mega > .sub-menu,
.row {
 display: flex;
 margin-right: -15px;
 margin-left: -15px;
 flex-wrap: wrap;
}
.filter_content .filter-tag {
 position: relative;
 display: inline-block;
 list-style: none;
 margin: 0;
 padding: 0;
}
.filter_content .filter-tab li {
 display: inline-block;
 margin: 0;
 margin-bottom: 5px;
 padding: 0;
 list-style: none;
}
.filter_content .filter-tab li.rightss {
 float: right;
}
.filter_content .filter-tab a {
 position: relative;
 display: inline-block;
 margin-top: 0;
 margin-right: 20px;
 color: grey;
}
.filter_content .filter-tab a.on {
 color: #ff9800;
}
@media (max-width: 767px) {
 .filter_content {
  display: block;

  padding: 10px;
 }

 .site-content {
  padding-top: 30px;
  padding-bottom: 30px;
 }

 .filter_content .filter-item a {
  margin-right: 5px;
  padding: 0 5px;
  font-size: 13px;
  line-height: 20px;
 }

 .filter_content .filter-tab a {
  margin-right: 5px;
  font-size: 13px;
 }

 .filter_content .filter-item span,
 .filter_content .filter-tab span {
  display: flex;
  padding: 0;
  width: 100%;
 }
}
</style>

```
