---
title: 用 gulp 生成一倍和两倍精灵图以及压缩 css
category: 前端
tags:
  - gulpjs
cover: https://cdn.pixabay.com/photo/2021/08/10/10/06/pinwheels-6535595_960_720.jpg
---


## 一、安装依赖

```bash
yarn global add gulp-cli
yarn add gulp
yarn add gulp.spritesmith
yarn add gulp-sort
yarn add gulp-debug
yarn add gulp-clean-css
yarn add gulp-csso
```

## 二、新建 gulpfile.js

>gulpfile.js

```js
// 获取 gulp
const gulp = require('gulp');
const debug = require('gulp-debug');
const sort = require('gulp-sort');
const path = require('path');

// 获取 gulp-clean-css模块(用于压缩 CSS)
const cleanCSS = require('gulp-clean-css');
// 获取 gulp.spritesmith模块(把图片生成精灵图)
const spritesmith = require('gulp.spritesmith');

/**
 * 输出原图
 * gulp sprite
 * icons:存放一倍图
 */
gulp.task('sprite', function () {
  return (
    gulp
      //需要合并的图片地址
      .src('src/static/images/icons/*.png')
      .pipe(sort())
      .pipe(
        spritesmith({
          //保存合并后图片的地址
          imgName: '/static/images/sprite.png',
          //保存合并后对于css样式的地址
          cssName: '/static/css/sprite.css',
          //css background-image: url地址
          imgPath: '/dist/static/images/sprite/sprite.png',
          //合并时两个图片的间距
          padding: 5,
          //排列方式
          algorithm: 'binary-tree',
          cssTemplate: function (data) {
            var arr = [];
            data.sprites.forEach(function (sprite) {
              arr.push(
                '.sprite1-' +
                  sprite.name +
                  '{' +
                  "background-image: url('" +
                  sprite.escaped_image +
                  "');" +
                  'width:' +
                  sprite.px.width +
                  ';' +
                  'height:' +
                  sprite.px.height +
                  ';' +
                  'background-position: ' +
                  sprite.px.offset_x +
                  'px ' +
                  sprite.px.offset_y +
                  'px;' +
                  '}\n',
              );
            });
            return arr.join('');
          },
        }),
      )
      .pipe(gulp.dest('dist/sprite1x'))
  );
});

/**
 * 输出两倍图
 * gulp sprite2x
 * icons@2x:存放二倍图
 */
gulp.task('sprite2x', function () {
  return (
    gulp
      //需要合并的图片地址
      .src('src/static/images/icons/*.png')
      // .pipe(debug())
      // .pipe(sort(customComparator))
      // .pipe(debug())
      .pipe(sort())
      .pipe(
        spritesmith({
          //保存合并后图片的地址
          imgName: 'static/images/sprite@2x.png',
          //保存合并后对于css样式的地址
          cssName: 'static/css/sprite@2x.css',
          //css background-image: url地址
          imgPath: '/gulp/dist/static/images/sprite@2x.png',
          padding: 10, //合并时两个图片的间距
          algorithm: 'top-down', //排列方式
          cssTemplate: function (data) {
            var arr = [];
            data.sprites.forEach(function (sprite) {
              arr.push(
                '.sprite2-' +
                  sprite.name +
                  '{' +
                  "background-image: url('" +
                  sprite.escaped_image +
                  "');" +
                  'background-size:' +
                  parseFloat(sprite.px.total_width) / 2 +
                  'px ' +
                  parseFloat(sprite.px.total_height) / 2 +
                  'px;' +
                  'width:' +
                  parseFloat(sprite.px.width) / 2 +
                  'px;' +
                  'height:' +
                  parseFloat(sprite.px.height) / 2 +
                  'px;' +
                  'background-position: ' +
                  parseFloat(sprite.px.offset_x) / 2 +
                  'px ' +
                  parseFloat(sprite.px.offset_y) / 2 +
                  'px;' +
                  '}\n',
              );
            });
            return arr.join('');
          },
        }),
      )
      .pipe(gulp.dest('dist/sprite2x'))
  );
});
function customComparator(f1, f2) {
  const f1Name = path.basename(f1.path);
  const f2Name = path.basename(f2.path);
  console.log('f1Name:' + f1Name, 'f2Name:' + f2Name);
  return Number(f1Name.split('-')[0]) > Number(f2Name.split('-')[0]) ? 1 : -1;
}
/**
 * 压缩 css 文件
 * 在命令行使用 gulp cleanCSS 启动此任务
 */
gulp.task('cleanCSS', function () {
  return (
    gulp
      // 1. 找到文件
      .src('css/*.css')
      // 2. 压缩文件
      .pipe(cleanCSS())
      // 3. 另存为压缩文件
      .pipe(gulp.dest('dist/css'))
  );
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
  // 监听文件修改，当文件被修改则执行 css 任务
  gulp.watch('css/*.css', gulp.series('cleanCSS'));
});

// 使用 gulp.task('run') 定义默认任务
// 在命令行使用 gulp 启动 cleanCSS 任务和 auto 任务
gulp.task('run', gulp.series('cleanCSS', 'auto'));
```
