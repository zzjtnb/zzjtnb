---
title: Vant 下拉刷新上拉加载组件
category: 前端
tags:
  - Vue
cover: https://images.unsplash.com/photo-1539960953829-ce92f56abb62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80
---

```html
<template>
  <div>
    <div class="tabs">
      tabs名字
    </div>
    <div class="wrapper">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="offset"
          class="content"
        >
          <van-cell
            v-for="(item,index) in saleDataList"
            :key="item+index"
            class="list-item"
            :title="index"
          >
            {{item.normNumber}}
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { PullRefresh, Toast, List, Cell } from 'vant'
Vue.use(PullRefresh).use(Toast).use(List).use(Cell)
export default {
  data () {
    return {
      saleDataList: [],
      list: [],
      isLoading: false,
      loading: false,
      finished: false,
      offset: 15
    }
  },
  methods: {
    /**
    *  下拉刷新方法
     */
    onRefresh () {
      // 调用请求数据方法
      this.getList()
    },
    /**
    *  上拉加载方法
    *  页面打开时初始化会调用onLoad方法 如果想去掉初始化调用使用,给List添加属性immediate-check=false
     */
    onLoad () {
      // 调用请求数据方法
      this.getList()
    },
    /**
    *  请求数据方法
     */
    getList () {
      axios.post('http://120.27.243.49:7300/mock/5da12f308c14ee0f50d37e46/cmeb/list', {}).then((res) => {
        console.log(res.data)
        this.list = res.data.bean.orders
        this.saleDataList = this.saleDataList.concat(this.list)
        // 加载状态结束
        this.loading = false
        this.isLoading = false
        // 数据全部加载完成
        if (this.saleDataList.length >= 40) {
          this.finished = true
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .tabs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #7e8c8d;
  }
  .wrapper {
    margin-top: 20px;
    .content{
      .text{
        font-size: 14px;
        color: rgba(69,90,100,.6);
      }
      .list-item {
        padding: 30px;
        text-align: center;
        background: #0088cc;
        border-bottom: 1px solid red;
      }
    }
  }
</style>

```
