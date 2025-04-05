---
title: Vue开发——实现吸顶效果
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2020/06/28/08/50/eastern-grey-kangaroo-5348449_960_720.jpg
---

```JavaScript
    handleScroll () {
      // 监听dom渲染完成
      this.$nextTick(function () {
        let siteHeader = this.$refs.siteHeader;
        // 这里要得到top的距离
        this.offsetTop = siteHeader.offsetTop;
        //和元素自身的高度
        this.offsetHeight = siteHeader.offsetHeight;
        console.log("offsetTop:" + this.offsetTop + "," + "offsetHeight:" + this.offsetHeight);
      });
      // 得到页面滚动的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // 判断页面滚动的距离是否大于吸顶元素的位置
      // this.headerShow = scrollTop > (this.offsetTop - this.offsetHeight * 2);

      var offsetTop = document.querySelector('.site_header').offsetTop
      if (scrollTop > offsetTop) {
        this.headerShow = false
      } else {
        this.headerShow = true
      }

      console.log(offsetTop)
    },
```
