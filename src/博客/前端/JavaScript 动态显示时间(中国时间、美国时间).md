---
title: js动态显示时间(中国时间、美国时间)
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2020/07/26/11/35/lighthouse-5439227_960_720.jpg
---

## 同时显示美东时间和北京时间

```html
<!DOCTYPE html>
<html>

<head>
  <style>
    .markdown-body pre code {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  </style>
  <title>js动态显示时间(中国时间、美国时间)</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
  <div id="ddate"></div>
  <div id="ddate2"></div>
  <script language="javascript">
    //var ddate=document.getElementByIdx_x_x("ddate");
    //var ddate2=document.getElementByIdx_x_x("ddate2");

    //网上给出的是上面的代码，怎么会多出个x_x_x呢，下面才是正确的
    var ddate = document.getElementById("ddate");
    var ddate2 = document.getElementById("ddate2");

    function updatedate() {
      var dd1 = new Date();
      dd1.setMinutes(dd1.getMinutes() + dd1.getTimezoneOffset() - 300); //取当地时间加上和格林威治的时差减要求地区和格林的时差分钟，这里是-300，代表美国东部纽约和格林的时差
      //先设置setMinutes再取getHours才有效
      var tmin = dd1.getHours();
      if (tmin >= 0 && tmin < 6) {
        tmin = '凌晨' + tmin;
      }
      if (tmin >= 6 && tmin <= 12) {
        tmin = '早上' + tmin;
      }
      if (tmin > 12 && tmin <= 18) {
        tmin = '下午' + tmin;
      }
      if (tmin > 18 && tmin <= 24) {
        tmin = '晚上' + tmin;
      }

      ddate.innerHTML = '美国东部时间:' + dd1.getFullYear() + "年" + (dd1.getMonth() + 1) + "月" + dd1.getDate() + "日" + tmin + "点" + dd1.getMinutes() + "分" + dd1.getSeconds() + "秒";
      var dd2 = new Date();
      dd2.setMinutes(dd2.getMinutes() + dd2.getTimezoneOffset() + 13 * 60 - 300);//纽约和中国相差13个小时，夏天是12个小时所以这里加上13*60 夏天改为12*60 
      ddate2.innerHTML = '北京时间' + dd2.getFullYear() + "年" + (dd2.getMonth() + 1) + "月" + dd2.getDate() + "日" + dd2.getHours() + "点" + dd2.getMinutes() + "分" + dd2.getSeconds() + "秒";
      var t = setTimeout("updatedate()", 1000);
    }
    updatedate();
  </script>
</body>

</html>
```

## 美东时间标准代码

```html
<!DOCTYPE html>
<html>

<head>
  <style>
    .markdown-body pre code {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  </style>
  <title>美东时间标准代码</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
  <a class="nLink" id="t_2_1" style="float:left;"></a>

  <script type="text/javascript">
    //Global variable for calculating page generation time
    var PageInitTime = new Date();
    var GameType = '';
    function i(ur, w, h) {
      document.write(
        '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="' +
        w + '" height="' + h + '"> ');
      document.write('<param name="movie" value="' + ur + '">');
      document.write('<param name="quality" value="high"> ');
      document.write('<param name="wmode" value="transparent"> ');
      document.write('<param name="menu" value="false"> ');
      document.write('<embed src="' + ur +
        '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' +
        w + '" height="' + h + '" wmode="transparent"></embed> ');
      document.write('</object> ');
    }

    function _getYear(d) {
      var yr = d.getYear();
      if (yr < 1000) yr += 1900;
      return yr;
    }

    function dateAdd(dateObj, days) {
      var tempDate = dateObj.valueOf();
      tempDate = tempDate - days * 24 * 60 * 60 * 1000;
      tempDate = new Date(tempDate);
      return tempDate;
    }

    function tick() {
      function initArray() {
        for (i = 0; i < initArray.arguments.length; i++) this[i] = initArray.arguments[i];
      }

      var isnDays = new initArray("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日");
      var todayy = new Date();
      var today = dateAdd(todayy, 0.5);
      var hrs = today.getHours();
      var _min = today.getMinutes();
      var sec = today.getSeconds();
      var clckh = "" + ((hrs > 12) ? hrs - 12 : hrs);
      var clckm = ((_min < 10) ? "0" : "") + _min;
      clcks = ((sec < 10) ? "0" : "") + sec;
      var clck = (hrs >= 12) ? "下午" : "上午";

      //document.getElementById("t_2_1").innerHTML = _getYear(today)+"/"+(today.getMonth()+1)+"/"+today.getDate()+"&nbsp;"+clckh+":"+clckm+":"+clcks+"&nbsp;"+clck+"&nbsp;"+isnDays[today.getDay()];
      document.getElementById("t_2_1").innerHTML = "美东时间:" + _getYear(today) + "/" + (today.getMonth() + 1) + "/" +
        today.getDate() + "&nbsp;" + clck + clckh + ":" + clckm + ":" + clcks;

      window.setTimeout("tick()", 100);
    }
    tick()
  </script>
</body>


</html>
```
