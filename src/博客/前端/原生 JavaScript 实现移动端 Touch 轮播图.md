---
title: 原生 js 实现移动端 Touch 轮播图
category: 前端
tags:
  - 轮播图
cover: https://cdn.pixabay.com/photo/2020/06/19/19/09/switzerland-5318548_960_720.jpg
---

## Touch 轮播图

> `touch` 轮播图其实就是通过手指的滑动, 来左右切换轮播图, 下面我们通过一个案例, 来实现下.

### 1. html 结构

> 结构上, 还是用 `ul` 、 `li` 来存放轮播图片, `ol` 、 `li` 来存放轮播小圆点:

![1460000017719409](https://segmentfault.com/img/remote/1460000017719409?w=1135&h=789)

### 2. 样式初始化

> `html` 的一些标签, 都会有一些默认样式, 比如 `body` 标签默认是有一个边距的, 为了不影响美观, 我们需要清除掉.

```css
/* 清除标签默认边距 */
body,ul,li,ol,img {
    margin: 0;
    padding: 0;
}

/* 清除 ul 等标签前面的“小圆点” */
ul,li,ol {
    list-style-type: none;
}

/* 图片自适应 */
img {
    width: 100%;
    height: auto;
    border: none;
    /* ie8 */
    display: block;
    -ms-interpolation-mode: bicubic; /*为了照顾ie图片缩放失真*/
}
```

![1460000017719410](https://segmentfault.com/img/remote/1460000017719410?w=1092&h=751)

### 3. 添加样式

> 在前面讲特效的时候, 我们说过如何使用原生 `js` 实现移一个轮播图的概念, 但是当时的方式是通过 `li` 浮动, 这里给大家介绍一种新的方——定位.

**思路:**

* 给 `ul` 外层的盒子一个相对定位;
* 这里的 `ul` 高度不能写死, 它应该是 `li` 撑开的高度, 但是由于 `li` 绝对定位, 没办法撑开这个高度, 所以这里的 `ul` 需要在 `js` 里面动态设置高度;
* 给 `li` 设置相对定位, 并且 `left` 、 `top` 都为 `0` , 再给 `li` 添加一个 `transform:translateX(300%)` 属性, 目的是初始化显示的图片为空, 然后在 `js` 里只需要动态设置每个 `li` 的 `translateX` 值, 即可实现轮播;
* 设置小圆点区域, 因为小圆点个数未知, 所以 `ol` 的宽度也未知, 想要让一个未知宽度的盒子水平居中, 可以使用 `absolute` 定位结合 `left` 百分比的方式实现;
* 给 `ol` 下面的 `li` 设置一个宽高添加圆角边框属性, 并且左浮动, 这样就能显示一排空心的小圆点了;
* 最后, 添加一个样式类, 里面设置一个背景属性, 用来显示当前展示图片对应的小圆点.

```css
/* 轮播图最外层盒子 */
.carousel {
    position: relative;
    overflow: hidden;
}

.carousel ul {
    /* 这个高度需要在JS里面动态添加 */
}

.carousel ul li {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    /* 使用 transform:translaX(300%) 暂时将 li 移动到屏幕外面去*/
    -webkit-transform: translateX(300%);
    transform: translateX(300%);
}

/* 小圆点盒子 */
.carousel .points {
    /* 未知宽度的盒子，使用 absolute 定位，结合 transform 的方式进行居中 */
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
}

/* 小圆点 */
.carousel .points li {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: 1px solid #fff;
    float: left;
    margin: 0 2px;
}

/* 选中小圆点的样式类 */
.carousel .points li.active {
    background-color: #fff;
}
```

![1460000017719411](https://segmentfault.com/img/remote/1460000017719411?w=426&h=773)

### 4. js 准备工作

> 先不考虑别的, `js` 在初始化的时候, 首先要做的就是给 `ul` 添加上一个高度, 不然图片是不显示的.

* 给 `UL` 动态设置高度
* 动态生成小圆点 (根据图片的张数创建小圆点个数, `i=0` 添加 `active` )
* 初始化三个 `li` 的基本位置

  * 定义三个变量，分别用来存储三个 `li` 的下（ `left` 存储最后一张图片的下标， `center` 和 `right` 分别存储第一张和第二张的下标）
  * 通过 `数组[下标]` 的方式给三个 `li` 设置定位后 `left` 方向的位置

```html  
var carousel = document.querySelector('.carousel');
var carouselUl = carousel.querySelector('ul');
var carouselLis = carouselUl.querySelectorAll('li');
var points = carousel.querySelector('ol');
// 屏幕的宽度（轮播图显示区域的宽度）
var screenWidth = document.documentElement.offsetWidth;

// 1- ul设置高度
carouselUl.style.height = carouselLis[0].offsetHeight + 'px';

// 2- 生成小圆点
for(var i = 0; i < carouselLis.length; i++){
    var li = document.createElement('li');
    if(i == 0){
        li.classList.add('active');
    }//
    points.appendChild(li);
}

// 3- 初始三个 li 固定的位置
var left = carouselLis.length - 1;
var center = 0;
var right = 1;

// 归位
carouselLis[left].style.transform = 'translateX('+ (-screenWidth) +'px)';
carouselLis[center].style.transform = 'translateX(0px)';
carouselLis[right].style.transform = 'translateX('+ screenWidth +'px)';
```

![1460000017719412](https://segmentfault.com/img/remote/1460000017719412?w=1173&h=747)

**效果图:**

![1460000017719413](https://segmentfault.com/img/remote/1460000017719413?w=356&h=673)

### 5. 添加定时器, 让图片动起来

> 轮播图都会自己轮播, 所以需要用到定时器, 每隔一段时间执行一次轮转函数.

* 添加定时器, 定时器里面轮转下标
* 极值判断
* 设置过渡(替补的那张不需要过渡)
* 归位
* 小圆点焦点联动

```html  
var timer = null;
// 调用定时器
timer = setInterval(showNext, 2000);

// 轮播图片切换
function showNext(){
    // 轮转下标
    left = center;
    center = right;
    right++;
    // 极值判断
    if(right > carouselLis.length - 1){
        right = 0;
    }

    //添加过渡
    carouselLis[left].style.transition = 'transform 1s';
    carouselLis[center].style.transition = 'transform 1s';
    // 右边的图片永远是替补的，不能添加过渡
    carouselLis[right].style.transition = 'none';
    // 归位
    carouselLis[left].style.transform = 'translateX('+ (-screenWidth) +'px)';
    carouselLis[center].style.transform = 'translateX(0px)';
    carouselLis[right].style.transform = 'translateX('+ screenWidth +'px)';
    // 自动设置小圆点
    setPoint();
}

// 动态设置小圆点的active类
var pointsLis = points.querySelectorAll('li');
function setPoint(){
    for(var i = 0; i < pointsLis.length; i++){
        pointsLis[i].classList.remove('active');
    }
    pointsLis[center].classList.add('active');
}
```

![1460000017719414](https://segmentfault.com/img/remote/1460000017719414?w=1343&h=843)

**效果图:**

![1460000017719415](https://segmentfault.com/img/remote/1460000017719415?w=363&h=674)

### 6. touch 滑动

> 移动端的轮播图, 配合 `touch` 滑动事件, 效果更加友好.

* 分别绑定三个 `touch` 事件

  * `touchstart` 里面记录手指的位置，清除定时器，记录时间
  * `touchmove` 里面获取差值，同时清除过渡，累加上差值的值
  * `touchend` 里面判断是否滑动成功，滑动的依据是滑动的距离（绝对值）
* 超过屏幕的三分之一或者滑动的时间小于 `300` 毫秒同时距离大于 `30` (防止点击就跑)的时候都认为是滑动成功
* 在滑动成功的条件分支里面在判断滑动的方向, 根据方向选择调用上一张还是下一张的逻辑
* 在滑动失败的条件分支里面添加上过渡, 重新进行归位
* 重启定时器

```html  
var carousel = document.querySelector('.carousel');
var carouselUl = carousel.querySelector('ul');
var carouselLis = carouselUl.querySelectorAll('li');
var points = carousel.querySelector('ol');
// 屏幕的宽度
var screenWidth = document.documentElement.offsetWidth;
var timer = null;

// 设置 ul 的高度
carouselUl.style.height = carouselLis[0].offsetHeight + 'px';

// 动态生成小圆点
for (var i = 0; i < carouselLis.length; i++) {
    var li = document.createElement('li');
    if (i == 0) {
        li.classList.add('active');
    }
    points.appendChild(li);
}

// 初始三个固定的位置
var left = carouselLis.length - 1;
var center = 0;
var right = 1;

// 归位（多次使用，封装成函数）
setTransform();

// 调用定时器
timer = setInterval(showNext, 2000);

// 分别绑定touch事件
var startX = 0;  // 手指落点
var startTime = null; // 开始触摸时间
carouselUl.addEventListener('touchstart', touchstartHandler); // 滑动开始绑定的函数 touchstartHandler
carouselUl.addEventListener('touchmove', touchmoveHandler);   // 持续滑动绑定的函数 touchmoveHandler
carouselUl.addEventListener('touchend', touchendHandeler);    // 滑动结束绑定的函数 touchendHandeler

// 轮播图片切换下一张
function showNext() {
    // 轮转下标
    left = center;
    center = right;
    right++;
    //　极值判断
    if (right > carouselLis.length - 1) {
        right = 0;
    }
    //添加过渡（多次使用，封装成函数）
    setTransition(1, 1, 0);
    // 归位
    setTransform();
    // 自动设置小圆点
    setPoint();
}

// 轮播图片切换上一张
function showPrev() {
    // 轮转下标
    right = center;
    center = left;
    left--;
    //　极值判断
    if (left < 0) {
        left = carouselLis.length - 1;
    }
    //添加过渡
    setTransition(0, 1, 1);
    // 归位
    setTransform();
    // 自动设置小圆点
    setPoint();
}

// 滑动开始
function touchstartHandler(e) {
    // 清除定时器
    clearInterval(timer);
    // 记录滑动开始的时间
    startTime = Date.now();
    // 记录手指最开始的落点
    startX = e.changedTouches[0].clientX;
}
// 滑动持续中
function touchmoveHandler(e) {
    // 获取差值 自带正负
    var dx = e.changedTouches[0].clientX - startX;
    // 干掉过渡
    setTransition(0, 0, 0);
    // 归位
    setTransform(dx);
}
//　滑动结束
function touchendHandeler(e) {
    // 在手指松开的时候，要判断当前是否滑动成功
    var dx = e.changedTouches[0].clientX - startX;
    // 获取时间差
    var dTime = Date.now() - startTime;
    // 滑动成功的依据是滑动的距离（绝对值）超过屏幕的三分之一 或者滑动的时间小于300毫秒同时滑动的距离大于30
    if (Math.abs(dx) > screenWidth / 3 || (dTime < 300 && Math.abs(dx) > 30)) {
        // 滑动成功了
        // 判断用户是往哪个方向滑
        if (dx > 0) {
            // 往右滑 看到上一张
            showPrev();
        } else {
            // 往左滑 看到下一张
            showNext();
        }
    } else {
        // 添加上过渡
        setTransition(1, 1, 1);
        // 滑动失败了
        setTransform();
    }

    // 重新启动定时器
    clearInterval(timer);
    // 调用定时器
    timer = setInterval(showNext, 2000);
}
// 设置过渡
function setTransition(a, b, c) {
    if (a) {
        carouselLis[left].style.transition = 'transform 1s';
    } else {
        carouselLis[left].style.transition = 'none';
    }
    if (b) {
        carouselLis[center].style.transition = 'transform 1s';
    } else {
        carouselLis[center].style.transition = 'none';
    }
    if (c) {
        carouselLis[right].style.transition = 'transform 1s';
    } else {
        carouselLis[right].style.transition = 'none';
    }
}

//　封装归位
function setTransform(dx) {
    dx = dx || 0;
    carouselLis[left].style.transform = 'translateX(' + (-screenWidth + dx) + 'px)';
    carouselLis[center].style.transform = 'translateX(' + dx + 'px)';
    carouselLis[right].style.transform = 'translateX(' + (screenWidth + dx) + 'px)';
}
// 动态设置小圆点的active类
var pointsLis = points.querySelectorAll('li');

function setPoint() {
    for (var i = 0; i < pointsLis.length; i++) {
        pointsLis[i].classList.remove('active');
    }
    pointsLis[center].classList.add('active');
}
```

![1460000017719416](https://segmentfault.com/img/remote/1460000017719416?w=1356&h=863)

### 7. 完整代码

> 一定要注意, 碰到在 `js` 里面动态设定高度的时候, 如果页面一加载就需要设置, 那么就要用 `window.onload` 事件.

**示例代码:**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <!-- 添加视口 -->
  <meta >
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>原生 js 实现 Touch 轮播图</title>
  <style>
    /* 清除标签默认边距 */
    body,
    ul,
    li,
    ol,
    img {
      margin: 0;
      padding: 0;
    }

    /* 清除 ul 等标签前面的“小圆点” */
    ul,
    li,
    ol {
      list-style-type: none;
    }

    /* 图片自适应 */
    img {
      width: 100%;
      height: auto;
      border: none;
      /* ie8 */
      display: block;
      -ms-interpolation-mode: bicubic;
      /*为了照顾ie图片缩放失真*/
    }

    /* 轮播图最外层盒子 */
    .carousel {
      position: relative;
      overflow: hidden;
    }

    .carousel ul {
      /* 这个高度需要在JS里面动态添加 */
    }

    .carousel ul li {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      /* 使用 transform:translaX(300%) 暂时将 li 移动到屏幕外面去*/
      -webkit-transform: translateX(300%);
      transform: translateX(300%);
    }

    /* 小圆点盒子 */
    .carousel .points {
      /* 未知宽度的盒子，使用 absolute 定位，结合 transform 的方式进行居中 */
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
    }

    /* 小圆点 */
    .carousel .points li {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      border: 1px solid #fff;
      float: left;
      margin: 0 2px;
    }

    /* 选中小圆点的样式类 */
    .carousel .points li.active {
      background-color: #fff;
    }
  </style>
</head>

<body>
  <section class="carousel">
    <ul>
      <li><a href="#"><img src="images/imgs/banner01.jpg" alt=""></a></li>
      <li><a href="#"><img src="images/imgs/banner02.jpg" alt=""></a></li>
      <li><a href="#"><img src="images/imgs/banner03.jpg" alt=""></a></li>
      <li><a href="#"><img src="images/imgs/banner04.jpg" alt=""></a></li>
      <li><a href="#"><img src="images/imgs/banner05.jpg" alt=""></a></li>
    </ul>
    <ol class="points"></ol>
  </section>
</body>

<script>
  window.onload = function () {
    var carousel = document.querySelector('.carousel');
    var carouselUl = carousel.querySelector('ul');
    var carouselLis = carouselUl.querySelectorAll('li');
    var points = carousel.querySelector('ol');
    // 屏幕的宽度
    var screenWidth = document.documentElement.offsetWidth;
    var timer = null;

    // 设置 ul 的高度
    carouselUl.style.height = carouselLis[0].offsetHeight + 'px';

    // 动态生成小圆点
    for (var i = 0; i < carouselLis.length; i++) {
      var li = document.createElement('li');
      if (i == 0) {
        li.classList.add('active');
      }
      points.appendChild(li);
    }

    // 初始三个固定的位置
    var left = carouselLis.length - 1;
    var center = 0;
    var right = 1;

    // 归位（多次使用，封装成函数）
    setTransform();

    // 调用定时器
    timer = setInterval(showNext, 2000);

    // 分别绑定touch事件
    var startX = 0; // 手指落点
    var startTime = null; // 开始触摸时间
    carouselUl.addEventListener('touchstart', touchstartHandler); // 滑动开始绑定的函数 touchstartHandler
    carouselUl.addEventListener('touchmove', touchmoveHandler); // 持续滑动绑定的函数 touchmoveHandler
    carouselUl.addEventListener('touchend', touchendHandeler); // 滑动结束绑定的函数 touchendHandeler

    // 轮播图片切换下一张
    function showNext() {
      // 轮转下标
      left = center;
      center = right;
      right++;
      //　极值判断
      if (right > carouselLis.length - 1) {
        right = 0;
      }
      //添加过渡（多次使用，封装成函数）
      setTransition(1, 1, 0);
      // 归位
      setTransform();
      // 自动设置小圆点
      setPoint();
    }

    // 轮播图片切换上一张
    function showPrev() {
      // 轮转下标
      right = center;
      center = left;
      left--;
      //　极值判断
      if (left < 0) {
        left = carouselLis.length - 1;
      }
      //添加过渡
      setTransition(0, 1, 1);
      // 归位
      setTransform();
      // 自动设置小圆点
      setPoint();
    }

    // 滑动开始
    function touchstartHandler(e) {
      // 清除定时器
      clearInterval(timer);
      // 记录滑动开始的时间
      startTime = Date.now();
      // 记录手指最开始的落点
      startX = e.changedTouches[0].clientX;
    }
    // 滑动持续中
    function touchmoveHandler(e) {
      // 获取差值 自带正负
      var dx = e.changedTouches[0].clientX - startX;
      // 干掉过渡
      setTransition(0, 0, 0);
      // 归位
      setTransform(dx);
    }
    //　滑动结束
    function touchendHandeler(e) {
      // 在手指松开的时候，要判断当前是否滑动成功
      var dx = e.changedTouches[0].clientX - startX;
      // 获取时间差
      var dTime = Date.now() - startTime;
      // 滑动成功的依据是滑动的距离（绝对值）超过屏幕的三分之一 或者滑动的时间小于300毫秒同时滑动的距离大于30
      if (Math.abs(dx) > screenWidth / 3 || (dTime < 300 && Math.abs(dx) > 30)) {
        // 滑动成功了
        // 判断用户是往哪个方向滑
        if (dx > 0) {
          // 往右滑 看到上一张
          showPrev();
        } else {
          // 往左滑 看到下一张
          showNext();
        }
      } else {
        // 添加上过渡
        setTransition(1, 1, 1);
        // 滑动失败了
        setTransform();
      }

      // 重新启动定时器
      clearInterval(timer);
      // 调用定时器
      timer = setInterval(showNext, 2000);
    }
    // 设置过渡
    function setTransition(a, b, c) {
      if (a) {
        carouselLis[left].style.transition = 'transform 1s';
      } else {
        carouselLis[left].style.transition = 'none';
      }
      if (b) {
        carouselLis[center].style.transition = 'transform 1s';
      } else {
        carouselLis[center].style.transition = 'none';
      }
      if (c) {
        carouselLis[right].style.transition = 'transform 1s';
      } else {
        carouselLis[right].style.transition = 'none';
      }
    }

    //　封装归位
    function setTransform(dx) {
      dx = dx || 0;
      carouselLis[left].style.transform = 'translateX(' + (-screenWidth + dx) + 'px)';
      carouselLis[center].style.transform = 'translateX(' + dx + 'px)';
      carouselLis[right].style.transform = 'translateX(' + (screenWidth + dx) + 'px)';
    }
    // 动态设置小圆点的active类
    var pointsLis = points.querySelectorAll('li');

    function setPoint() {
      for (var i = 0; i < pointsLis.length; i++) {
        pointsLis[i].classList.remove('active');
      }
      pointsLis[center].classList.add('active');
    }
  }
</script>

</html>
```

**效果图:**

![1460000017719417](https://segmentfault.com/img/remote/1460000017719417?w=363&h=674)
