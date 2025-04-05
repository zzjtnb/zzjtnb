---
title: gulp 压缩清理合并 css
category: 前端
tags:
  - gulpjs
cover: https://cdn.pixabay.com/photo/2017/09/11/15/58/sunset-2739472_960_720.jpg
---


## 方式一、 csso

### 1. 安装依赖

```bash
yarn add gulp
yarn add csso
```

### 2. 处理 CSS

>gulpfile.js

```js
// 获取 gulp
const gulp = require('gulp');
const through = require('through2');
const csso = require('csso');

gulp.task('default', function () {
  return (
    gulp
      .src('css/*.css')
      .pipe(
        through.obj(function (file, encode, cb) {
          console.log('-------------未处理-开始--------------');
          // 显示当前的文本内容
          console.log(file.contents.toString());
          console.log('-------------未处理-结束--------------\n');
          // 文本内容转为字符串
          let result = file.contents.toString();
          // 解析 CSS
          const ast = csso.syntax.parse(result);
          // 压缩 CSS
          const compressedAst = csso.syntax.compress(ast).ast;
          // 生成 CSS
          const minifiedCss = csso.syntax.generate(compressedAst);
          console.log('-------------处理前-开始--------------');
          console.log(minifiedCss);
          console.log('-------------处理后-开始--------------\n');
          // 再次转为Buffer对象，并赋值给文件内容
          file.contents = Buffer.from(minifiedCss);
          cb(null, file);
        }),
      )
      // 把文件写到一个新的文件夹里（不影响原有的），目录是dist
      .pipe(gulp.dest('dist'))
  );
});

```

>输出

```bash
-------------未处理-开始--------------
.input {
  width: 10px;
  color: red;
}
.input {
  color: blue;
}
-------------未处理-结束--------------

-------------处理前-开始--------------
.input{width:10px;color:blue}
-------------处理后-开始--------------
```

### 3. 简化第 2 步

```bash
yarn add gulp
yarn add gulp-csso
```

> 处理前 index.css 内容

```css
.input {
  width: 10px;
  color: red;
}
.input {
  color: blue;
  color: #000;
}
```

>gulpfile.js

```js
// 获取 gulp
const gulp = require('gulp');
const csso = require('gulp-csso');

gulp.task('default', function () {
  return (
    gulp
      .src('css/*.css')
      .pipe(
        csso({
          restructure: true,
          // sourceMap: true,
          // debug: true,
        }),
      )
      // 把文件写到一个新的文件夹里（不影响原有的），目录是dist
      .pipe(gulp.dest('dist'))
  );
});
```

> 处理后 index.css 内容

```css
.input{width:10px;color:#000}
```

## 方式二、clean-css(最完美方案)

### 1. 安装依赖

```bash
yarn add gulp
yarn add gulp-clean-css
# 给背景图添加版本号(非必选)
yarn add gulp-make-css-url-version
```

### 2. 处理 CSS

>gulpfile.js

```js
// 获取 gulp
const gulp = require('gulp');
//const makeUrlVer = require('gulp-make-css-url-version');
const cleanCSS = require('gulp-clean-css');
/**
 * 压缩合并清理 css 文件
 * 在命令行使用 gulp cleanCSS 启动此任务
 */
gulp.task('cleanCSS', function () {
  return (
    gulp
      .src('css/*.css')
      .pipe(
        cleanCSS({
          inline: ['all'], // 启用所有内联，同 ['local', 'remote']
          format: 'beautify', // 以一种非常好的方式格式化输出
          level: {
            2: {
              all: true, // 将所有值设置为 `false`
              removeDuplicateRules: true, // 打开删除重复规则
            },
          },
        }),
      )
      // .pipe(makeUrlVer())
      // 把文件写到一个新的文件夹里（不影响原有的），目录是dist
      .pipe(gulp.dest('dist'))
  );
});
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
  // 监听文件修改，当文件被修改则执行 css 任务
  gulp.watch('css/*.css', gulp.series('cleanCSS'));
});

// 使用 gulp run自动实时压缩合并重复css
// 在命令行使用 gulp 启动 cleanCSS 任务和 auto 任务
gulp.task('run', gulp.series('cleanCSS', 'auto'));
```

### 3. 效果

**处理前:**
>css/index.css

```css
@import url(./new.css);
@import url(./old.css);
```

>css/new.css

```css
.input {
  width: 10px;
  color: red;
}
a {
  color: aqua;
}
.input {
  color: blue;
  color: #000;
}
```

>css/old.css

```css
.input {
  width: 10px;
  color: red;
}
a {
  color: aqua;
}
.input {
  color: blue;
  color: #000;
}
body {
  width: auto;
}
```

**处理后:**

>dist/index.css

```css
.input {
  width: 10px;
  color: #000
}
a {
  color: #0ff
}
body {
  width: auto
}
```

>dist/new.css

```css
.input {
  width: 10px;
  color: #000
}
a {
  color: #0ff
}
```

>dist/old.css

```css
.input {
  width: 10px;
  color: #000
}
a {
  color: #0ff
}
body {
  width: auto
}
```

## 方式三、常用

```js
// 获取 gulp
const gulp = require('gulp');
//const makeUrlVer = require('gulp-make-css-url-version');
const cleanCSS = require('gulp-clean-css');
/**
 * 压缩合并清理 css 文件
 * 在命令行使用 gulp cleanCSS 启动此任务
 */
gulp.task('cleanCSS', function () {
  return (
    gulp
      .src('css/*.css')
      .pipe(
        cleanCSS({
          inline: ['all'], // 启用所有内联，同 ['local', 'remote']
          format: 'beautify', // 以一种非常好的方式格式化输出
          level: {
            1: {
              all: true, // 将所有值设置为 `false`
            },
            2: {
              all: true, // 将所有值设置为 `false`
            },
          },
        }),
      )
      // .pipe(makeUrlVer())
      // 把文件写到一个新的文件夹里（不影响原有的），目录是dist
      .pipe(gulp.dest('dist'))
  );
});
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
  // 监听文件修改，当文件被修改则执行 css 任务
  gulp.watch('css/*.css', gulp.series('cleanCSS'));
});

// 使用 gulp run自动实时压缩合并重复css
// 在命令行使用 gulp 启动 cleanCSS 任务和 auto 任务
gulp.task('run', gulp.series('cleanCSS', 'auto'));
```
