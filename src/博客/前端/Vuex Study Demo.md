---
title: Vuex Study Demo
category: 前端
tags:
  - Vuex
cover: https://cdn.pixabay.com/photo/2018/01/05/19/20/tree-3063715_960_720.jpg
---

## HTML 代码

```html
<!-- 
Vuex
  state:访问状态对象
  mutations:修改状态
 -->
<template>
  <div>
    <h1>{{msg}}</h1>
    <div style="color: red;">
      <hr>
    </div>
    <div style="color: red;">
      <!-- 第一种写法-->
      <!-- <p>{{$store.state.h}}</p> -->
      <!-- 第二种写法 -->
      <!-- <p>{{h}}</p> -->
      <p>{{a}}</p>
      <!-- 第三种写法 -->
      <input type="text" value="">
      <!-- $store.commit()固定写法,需要提交 -->
      <!--
       <button @click="$store.commit('add',10)">++</button>
       <button @click="$store.commit('reduce',20)">--</button>
      -->
      <!-- 第五种写法 -->
      <!-- <button @click="add(1)">++</button>
      <button @click="reduce(1)">--</button> -->
      <!-- 第六种写法 -->
      <button @click="add(20)">++</button>
      <button @click="reduce(10)">--</button>
      <!-- 第七种写法 -->
      <button @click="addAction()">++</button>
      <button @click="reduceAction()">--</button>
    </div>
  </div>
</template>

<script>
import store from "../../vuex/store";
import { mapState, mapMutations,mapGetters, mapActions } from "vuex";
export default {
  data () {
    return {
      msg: 'Hello Vuex',
    }
  },
  created () {
    console.log(this.$store.state.h);
  },
  /*   
  // 第二种写法
    // computed: {
    //   h () {
    //     return this.$store.state.h
    //   }
    // },
  */

  /*  
   // 第三种写法
    // computed: mapState({
    //   //hjhj相当于一个变量,名字随便写
    //   hjhj: state => state.h
    //   hjhj:function (state) {
    //   return state.h
    // }
    // }),
  */
  // 第四种写法
  // computed: mapState(['h']),
  //第五种写法
  //methods: mapMutations(['add', 'reduce']),
  //第七种写法
  methods: {
     ...mapMutations(['add', 'reduce']),
     ...mapActions(['addAction','reduceAction'])
  },
  //第六种写法
  computed:{
    // 这三个都是映射,(['h']),h是自定义的方法名
    // ...mapState(['h']),
    ...mapState({
      'a':state=>state.h
    }),

    // h1(){
    //   this.$store.getters.h
    // }
    ...mapGetters(['h'])
  }

}
</script>

<style scoped>
</style>
```

## JavaScript 部分

```JavaScript
//vuex相当于一个全局变量,在任何地方都可以调用
import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)
//vuex是一个数据仓库,同时也是一个状态管理器
//state就相当于状态对象
const state = {
  // h就是状态共用的数据,h就是状态
  h: 0
}
//要改變狀態裏面（state）裏面的值必須通過mutations寫一些方法.修改状态
const mutations = {
  /*   // 第一种写法
  add(state) {
    state.h++;
  },
  reduce(state) {
    state.h--;
  } */
  //第二种写法
  add(state, n) {
    state.h += n
  },
  // 第一个参数state是默认的(const state = { h: 0})
  // 触发修改的时候是commit,第一个参数是mutations里面定义的方法名,第二个是自定义的参数
  reduce(state, n) {
    // state.h -= n
    state.h = state.h - n
  }
}

//在现在的代码当中getters的作用就是先通过getters里面的函数操作
const getters = {
  h: function(state) {
    // return (state.h += 1)
    return (state.h = state.h + 1)
  }
}

//actions 异步修改state状态 actions可以调用mutation里面的方法
const actions = {
  addAction(context) {
    context.commit('add', 10)
    setTimeout(() => {
      context.commit('reduce', 20)
    }, 3000)
    console.log('我比reduce先执行了')
  },
  reduceAction({ commit }) {
    commit('reduce', 5)
  }
}

export default new Vuex.Store({
  //把状态暴露出去
  state,
  mutations,
  getters,
  actions
})
```

## 学习地址

 <http://jspang.com/post/vuex.html#L1>
