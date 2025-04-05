---
title: nuxt按需引入 element-UI、自定义主题色（终极按需引入）
category: 前端
tags:
  - Nuxt.js
cover: https://images.unsplash.com/photo-1508717272800-9fff97da7e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80
---


首先你要知道 [nuxt.js 怎么引入第三方插件](https://zh.nuxtjs.org/guide/plugins) ；

## 一、按需引入 element-UI

**

第一步：安装 babel-plugin-component：

``` bash
npm install babel-plugin-component -D
```

第二步：修改 plugins/element.js 文件（plugins/element.js 不知道怎么来的？出门左拐不送 [nuxt.js 怎么引入第三方插件](https://zh.nuxtjs.org/guide/plugins)  ）：

```js
import Vue from 'vue'

import { Button, Input } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
```

按照这个格式引入自己需要的组件就是了。

第三步：添加 nuxt.config.js 中的 build 配置：  

```js
export default {
  build: {
　　// 按需引入element-ui
    babel: {
      plugins: [
        [ "component", {"libraryName": "element-ui",  "styleLibraryName": "theme-chalk"}] 
      ] 
    },
     
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }  
}
```

## 二、自定义主题色

**

引入 element-UI 之后，在 /assets/scss 下新建一个 element-variables.scss 文件，文件名应该是可以自己随便取

## element-variables.scss

**

```js
/* 改变主题色变量aaa */
$--color-primary: green;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index"; // 这个地方后面要 改成 样式按需引入，请继续看下文
```

然后就可以了，终于看到期待已久的绿色：

绿意盎然，心花怒放。

想了解更多请移步 [element-UI 官方文档](https://element.eleme.cn/2.9/#/zh-CN/component/custom-theme)

 --------------------- 分割线 -------------------

## 三、element-UI 样式按需引入（终极按需引入）

**

刚才研究了一下，以上按需引入只是按需引入组件，但是 element 的样式还是全部引入了，没有做好按需引入样式，所以样式也按需引入一下：

## 在 element-variables.scss 里面按需引入样式

**

```js
/* 改变主题色变量aaa */
$--color-primary: green;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

// @import "~element-ui/packages/theme-chalk/src/index";

// 样式也按需引入，嘿嘿嘿
@import "~element-ui/packages/theme-chalk/src/button";
@import "~element-ui/packages/theme-chalk/src/input";
```

打包体积又可以减小几十 k 啦
