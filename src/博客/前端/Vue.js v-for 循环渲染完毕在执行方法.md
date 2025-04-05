---
title: vue v-for循环渲染完毕在执行方法
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2021/11/03/12/28/forest-6765636_960_720.jpg
---

### 1. 在项目中用到了一些插件, 比如这次用到的下拉菜单插件

这个插件需要实例化, 而下拉框的数据是通过 ajax 来获取的, 然后使用 `v-for` 渲染数据, 再一次遇到了问题.

就是等插件实例化完毕, 数据却还没渲染完毕, 所以这就出现一个 bug.

### 2. 第一种解决方法:setTimeout[不推荐]

```js
setTimeout(function () {
  //实例初始化
}, 100);
```

使用这种方法有一个缺点, 就是不确定数据什么时候渲染完毕.

第一种情况: 假设 10 毫秒渲染完毕, 但是 setTimeout 需要等 100 毫秒, 浪费了 90 毫秒.

第二种情况: 假设数据需要 200 毫秒, 那么很显然,bug 又出现了.

### 3. 第二种解决方法:watch + vm.nextTick[推荐]

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>

  <body>
    <setion>
      <option value="1" v-for="(item,key) in arr" :key="key">{{ item }}</option>
    </setion>
  </body>
  <script type="text/javascript">
    vm = new Vue({
      el: '.app',
      data: {
        arr: [],
      },
      watch: {
        arr: function () {
          /*DOM还没更新*/
          this.$nextTick(function () {
            /*DOM更新了*/
            /*现在数据已经渲染完毕*/
          });
        },
      },
      mounted: function () {
        var that = this;
        axios
          .get('url', {
            params: {
              link: '',
            },
          })
          .then(function (res) {
            that.arr = res;
          });
      },
    });
  </script>
</html>
```

代码说明:

+ `$nextTick`: 在下次 DOM 更新循环结束之后执行延迟回调; 在修改数据之后立即使用这个方法, 获取更新后的 DOM.

+ `$nextTick` 里面 DOM 更新是指页面上的数据是最新的数据, 而不是 data 中的数据更新了.

+ 在 `axios` 请求数据是 `this.arr` 被赋值了,`watch` 监听到了 `arr` 数据发生变化执行 arr 方法. 到了 `this.$nextTick` 它需要等 DOM 渲染完毕才执行 (也就是等 `arr` 在 DOM 渲染完毕). 这个方法就完美解决了需求, 既不浪费时间又不会出现数据还没渲染完毕就执行实例初始化.
