---
title: JavaScript random方法得到随机整数
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2020/07/02/20/24/flower-5364305_960_720.jpg
---

`Math.random()`可以随机 0~1 之间任意的数
<div id="cnblogs_post_body" class="blogpost-body"><p><strong><span style="font-family: 宋体; font-size: 10pt;">&nbsp;</span></strong></p>
<p><strong><span style="font-family: 宋体; font-size: 10pt;">一、得到 1-3 的随机整数</span></strong></p>
<p><strong><span style="font-family: 宋体; font-size: 10pt;">代码：</span></strong></p>
<p><span style="font-family: 宋体; font-size: 10pt;"><img src="https://i.loli.net/2019/05/24/5ce7b3783d27e94438.png" alt="5ce7b3783d27e94438"/></span></p>
<div><span style="font-family: 宋体; font-size: 10pt;"><strong>总结：</strong>Math.random()方法得到随机小数 *3 将会得到小于 3 的数字，Ceil 方法始终向上舍入。</span></div>
<div>&nbsp;</div>
<div><strong><span style="font-family: 宋体; font-size: 10pt;">二、得到 0-3 的随机整数</span></strong></div>
<div><strong><span style="font-family: 宋体; font-size: 10pt;">代码：</span></strong></div>
<div><span style="font-family: 宋体; font-size: 10pt;"><img src="https://i.loli.net/2019/05/24/5ce7b33cd855383925.png" alt="5ce7b33cd855383925"/></span></div>
<div><span style="font-family: 宋体; font-size: 10pt;"><strong>总结：</strong>Math.random()方法得到随机小数 *4 将会得到小于 4 的数字，floor 方法始终向下舍入。</span></div>
<div><span style="font-family: 宋体; font-size: 10pt;">&nbsp;</span></div>
<div><span style="font-family: 宋体; font-size: 10pt;">&nbsp;</span></div>
<div><strong><span style="font-family: 宋体; font-size: 10pt;"><span style="line-height: 19px;">附：</span></span></strong><span style="font-family: 宋体; font-size: 10pt;"><span style="line-height: 19px;">舍入数字三个方法</span></span></div>
<div><span style="font-family: 宋体; font-size: 10pt;"><span style="line-height: 19px;"><img src="https://i.loli.net/2019/05/24/5ce7b2fb5d57f33770.png" alt="5ce7b2fb5d57f33770"/>
<br></span></span></div>
</div>
