---
title: 聊聊移动端的REM适配问题
category: 前端
tags:
  - css
cover: https://cdn.pixabay.com/photo/2020/05/12/08/53/fly-5161892_960_720.jpg
---

现在移动端对于前端行业来说特别流行, 废话不多说, 那我们就来聊聊移动端的哪些事?

注意: 写移动端必须在 html 页面 head 标签内加一个 meta 标签 ---viewport 视口

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

1. 来简单说说 rem 原理：rem=root element 根元素  rem 是来获取 html(根元素) 的 fontSize 值的

2. 做移动端常用布局方式：流式布局 (百分比布局)+rem 布局

3. 移动端设计稿的尺寸：

640x1136 的宽度 (单屏的页面)   参照 iphone5 手机分辨率: 320\*2

750x1334 的宽度 (单屏的页面)  参照 iphone6 手机分辨率: 375\*2

1242\*2208 的宽度 (单屏的页面) 参照 iphone6 plus 手机分辨率: 414\*3

单屏页面常用在场景应用的 H5 页面中 (活动页面)

4. 手机分辨率:(iphone 手机的机型)

iphone4 320x480 dpr 2.0

iphone5/5s 320x568 dpr 2.0

iphone6 375x667 dpr 2.0

iphone6 plus 414x736 dpr 3.0

5. 做移动端需要适配哪些机型?

按照 iphone 为例 (原因: 设计图是参照 iphone 手机来做的)

iphone4/4s/5/5s    尺寸:320

iphone6/6s/7       尺寸:375

iphone6plus        尺寸:414

640px              尺寸: 大于等于 640px 的

6. 适配移动端, 来获取 fontSize 值

　　1) 用媒体查询静态获取 fontSize 值

　　    **设计稿尺寸:640   参照 iphone5   分辨率:320\*2   dpr2.0**

　　　 iphone4/4s/5/5s  分辨率 320

　　   　　 html{ font-szie:50px; }

           iphone6/6s 375  

　　　　    @media all and (min-width:375px){ html{ font-size:58.59375px; } }

　　    iphone6p 414

　　　　   @media all and (min-width:414px){ html{ font-size:64.68755px; } }

　　    640 尺寸

　　　　   @media all and (min-width:640px){ html{ font-size:100px; } }

　　   **设计稿尺寸 750** **参照 iphone6  分辨率:375\*2   dpr:2.0**

　  　     iphone6  375

　　　　　　html{ font-szie:50px; }

　　　　iphone4/4s/5/5s 320

　　　　　　@media all and (min-width:320px){ html{ font-size:42.66px; } }

　　　　iphone6plus 414

　　　　　　@media all and (min-width:320px){ html{ font-size:55.2px; } }

　　　　尺寸 640

　　　　　　@media all and (min-width:640px){ html{ font-size:85.33px; } }

　　2) 用 JS 来动态获取 fontSzie 值

　　    引入 JS 方式: 内嵌式 -- 在 html 页面中创建一个 script 元素 (标签), 把 JS 代码放在 script 元素内

　　　第一种方法:

``` JS
//动态设置像素比
var iScale = 1;
iScale = iScale / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + '">')
//动态设置文字大小
function resize() {
  var iWidth = document.documentElement.clientWidth;
  document.getElementsByTagName('html')[0].style.fontSize = iWidth / 16 + 'px';
}
resize();
```

第二种方法:

``` js
function setFontSize() {
  var deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 640) {
    deviceWidth = 640;
  }
  document.documentElement.style.fontSize = deviceWidth / 6.4 + "px";
}
var _t = null;
window.addEventListener("resize", function() {
  clearTimeout(_t);
  _t = setTimeout(setFontSize, 100);
}, false);
setFontSize();
})(window);
```

注意: 为什么把 html 的 fontSize 值设置成 100px 呢?

1. 默认 1rem=16px, 引申出来的计算公式 1rem=100px

2. 利于计算方便

怎么计算成 rem 单位?

比如设计图里面有个按钮, 是 100px\*30px 的, 计算成 rem 单位为 100/100=1rem、30/100=0.3rem 所以计算出的宽高为 1rem\*0.3rem(所有的像素 px 单位都要除以 100, 因为我们把 html 的 fontSize 值设置成了 1rem=100px)
