---
title: JavaScript随机变化文字颜色
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2017/02/07/09/45/city-2045453_960_720.jpg
---

```html
<html>

<head>
  <title>A VERY VERY VERY HAPPY NEW YEAR TO ALL OF YOU</title>
  <style>
    #hd {
      text-align: center;
      font-size: 100px;
      font-family: arial;
      text-transform: capitalize;
    }

    body {
      background-color: black;
      color: green;
    }
  </style>

</head>

<body onload="setInterval(changeColor,3000)">
  <div id="hd" style="color:green;">wishing everyone<br> a happy and prosperous<br>new year</div>
  <p id="hi">woooo i am back</p>
  <button onclick="document.getElementById('hi').innerHTML='woooo i am back';">hii button</button>
  <a></a>


</body>
<script language="JavaScript">
  document.getElementById('hi').innerHTML = "woooo i am back";
  function changeColor() {
    var red = Math.ceil(Math.random() * 255);
    var green = Math.ceil(Math.random() * 255);
    var blue = Math.ceil(Math.random() * 255);
    var color = "#" + red.toString(16) + green.toString(16) + blue.toString(16);
    document.getElementById("hd").style.color = color;
    document.getElementById("hd").style.fontWeight = "bold";
  }
</script>

</html>
```

效果展示：

```html
<html>

<head>
  <title>A VERY VERY VERY HAPPY NEW YEAR TO ALL OF YOU</title>
  <style>
    #hd {
      text-align: center;
      font-size: 100px;
      font-family: arial;
      text-transform: capitalize;
    }

    body {
      background-color: black;
      color: green;
    }
  </style>

</head>

<body onload="setInterval(changeColor,3000)">
  <div id="hd" style="color:green;">wishing everyone<br> a happy and prosperous<br>new year</div>
  <p id="hi">woooo i am back</p>
  <button onclick="document.getElementById('hi').innerHTML='woooo i am back';">hii button</button>
  <a></a>

</body>
<script language="JavaScript">
  document.getElementById('hi').innerHTML = "woooo i am back";
  function changeColor() {
    var red = Math.ceil(Math.random() * 255);
    var green = Math.ceil(Math.random() * 255);
    var blue = Math.ceil(Math.random() * 255);
    var color = "#" + red.toString(16) + green.toString(16) + blue.toString(16);
    document.getElementById("hd").style.color = color;
    document.getElementById("hd").style.fontWeight = "bold";
  }
</script>

</html>
```
