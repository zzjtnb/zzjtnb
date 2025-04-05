---
title: Vue创建全局动态引入script组件
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2022/05/05/01/05/nature-7175030_960_720.jpg
---

## 创建组件
>
>src/components/index.js

```js
export default {
  install(Vue) {
    Vue.component("remote-script", {
      render: function (createElement) {
        return createElement("script", {
          attrs: {
            type: "text/javascript",
            src: this.src,
          },
          on: {
            load: function (event) {
              this.$emit("load", event);
            },
            error: function (event) {
              this.$emit("error", event);
            },
            readystatechange: function (event) {
              if (this.readyState == "complete") {
                this.$emit("load", event);
              }
            },
          },
        });
      },
      props: {
        src: {
          type: String,
          required: true,
        },
      },
    });
  },
};
```

## 注册组件
>
>src/main.js

```js
import Vue from "vue";
import remoteScript from "@/components";
Vue.use(remoteScript);
```

## 使用组件
>
>src/index.vue

```html

<template>
  <div>
    <remote-script src="https://xxx.js" @load="load"></remote-script>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted() {},
  methods: {
    load(){
      console.log('xxx.js加载完成')
    }
  },
   components: {},
}
</script>

<style scoped lang='scss'>
</style>
```
