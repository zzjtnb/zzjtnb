---
title: gulp 读取修改文件教程
category: 前端
tags:
  - gulpjs
cover: https://cdn.pixabay.com/photo/2021/08/17/14/48/sea-6553205_960_720.jpg
---


## 一、安装 gulp

[gulp 官网](http://www.gulpjs.com.cn/)

[gulp 的安装](http://www.gulpjs.com.cn/docs/getting-started/)

核心点是 gulp 文件的文件名一定是:`gulpfile.js`.

task 就是一个任务 (要做的一系列事)

运行通过`gulp`来执行默认的 task 或者通过`gulp task名`来执行指定的 task(因为一个 gulp 文件里可能有多个互相独立的 task

```bash
yarn add gulp
```

## 二、 读取文件

> gulp.src(files[, options])

效果:

读取文件, 产生数据流.

### ①、files 的写法 (字符串或数组)(必填)

1. `js/app.js`: 指定确切的文件名;
2. `js/*.js`: 某个目录所有后缀名为 js 的文件;
3. `js/**/*.js`: 某个目录及其所有子目录中的所有后缀名为 js 的文件;
4. `!js/app.js`: 除了 js/app.js 以外的所有文件.
5. `*.+(js css)`: 匹配项目根目录下, 所有后缀名为 js 或 css 的文件.

### ②、files 的写法 (对象)(选填)

[官方文档](http://www.gulpjs.com.cn/docs/api/)

1. `options.buffer`

默认是 true, 以 buffer 的形式读取 (即一次读取整个文件), 而改为 false 的时候则为 stream(流) 的方式读取.

流模式适合读取大文件, 但是一般的 html.css.js 之类的, 可以用 buffer 读取 (但推荐用流).

假如你需要读取完整个文件, 然后对整个文件正则匹配, 那么只能用 buffer 的形式.

2. `options.read`

默认 true, 设为 false 则 file.contents 返回值为 null(不会读取文件)

还有 `options.base` 以及 `node-glob` 和 `glob-stream` 所支持的参数, 但是这里略过.

示例:

```js
const gulp = require('gulp');
gulp.task('default', function () {
    gulp.src('a.js')
});
```

就是这么简单, 读取了一个文件

## 三、拿来一个流, 做点事, 再把他返回

> stream.pipe(fn)

简单来说, 通过`gulp.src()`, 我们已经读取了一个文件流, 然而我们需要对这个文件流做点事, 那么就是 pipe 的作用了.

1. 获取文件流:pipe 函数用于处理文件流 (来源于上下文), 即调用 pipe 方法的这个对象;

2. 处理文件流:pipe 接受一个参数, 这个参数用于处理这个文件流;

3. 返回文件流: 这个处理文件流的参数, 最后要返回处理后的这个流;

4. 连写 pipe: 因为拿来和最后返回的是同一个东西, 因此是可以连写的 (就像 jQuery 选择器选择到 DOM 后的连写那样);

先给一个简单的示例吧:

```js
gulp.task('default', function () {
  return gulp
    .src('test/a.js')
    .pipe(
      through.obj(function (file, encode, cb) {
        console.log('第一次处理');
        this.push(file);
        cb();
      }),
    )
    .pipe(
      through.obj(function (file, encode, cb) {
        console.log('第二次处理');
        this.push(file);
        cb();
      }),
    );
});
```

> 输出

```bash
第一次处理
第二次处理
```

## 四、对这个文件流做点啥

上面只是简述了 pipe 干嘛用的, 那么现在我们实际用文件流的形式做点什么.

> through2 模块, 用于处理文件流

这个模块干嘛用的,有兴趣的可以看看 [npm 里的 through2 这个模块,知乎的回答](https://www.zhihu.com/question/39391770)

### 用这个模块, 基本套路很简单

1. 引入 `through2` 模块;

2. 调用他的 obj 方法, 并传一个函数作为参数 (这个函数是我们的处理函数);`.pipe(through.obj(callback))`

3. 写这个 callback 处理函数;

4. 这个 callback 有三个参数, 分别是:`file`,`encode`(文件编码, 比如`'utf8'`),`cb`(继续执行, 类似 `express` 里路由的 `next`);

5. 我们先对 `file` 干点啥, 然后通过 `this.push(file)`(这里的 file 是修改后 file) 才能继续下面的 `pipe`, 最后执行 `cb()` 继续下一个 `pipe`.

基本示例 (不对 file 做点什么):

```js
// 获取 gulp
const gulp = require('gulp');
const through = require('through2');

gulp.task('default', function () {
  return gulp.src('test/a.js').pipe(
    through.obj(function (file, encode, cb) {
      console.log(arguments);
      this.push(file);
      cb();
    }),
  );
});

```

> 输出结果

```bash
[Arguments] {
  '0': <File "a.js" <Buffer >>,
  '1': 'utf8',
  '2': [Function: bound afterTransform] }
```

再给一个在原文件内容后拼接了一个字符串的 DEMO:

```js
// 获取 gulp
const gulp = require('gulp');
const through = require('through2');

gulp.task('default', function () {
  return (
    gulp
      .src('test/a.js')
      .pipe(
        through.obj(function (file, encode, cb) {
          // 显示当前的文本内容
          console.log(file.contents.toString());
          // 文本内容转为字符串
          let result = file.contents.toString();
          // 添加了一点东西
          result += '\n// => I add some words here';
          // 再次转为Buffer对象,并赋值给文件内容
          file.contents = Buffer.from(result);
          // 以下是例行公事
          this.push(file);
          cb();
        }),
      )
      .pipe(
        through.obj(function (file, encode, cb) {
          // 显示当前的文本内容(这次显示的是修改后的)
          console.log(file.contents.toString());
          this.push(file);
          cb();
        }),
      )
      // 把文件写到一个新的文件夹里(不影响原有的),目录是dist
      .pipe(gulp.dest('dist'))
  );
});
```

>输出

```bash
//a.js

//a.js

// => I add some words here
```

讲道理说, 懂以上方法, 已经可以解决很多问题了.

无非就是读取文件, 转为字符串, 改改改, 变为 Buffer 对象赋值回去, 写到一个新的文件夹里 (原文件名不变)
