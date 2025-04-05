---
title: Vue通过JavaScript生成验证码
category: 前端
tags:
  - Vue
cover: https://cdn.pixabay.com/photo/2019/09/15/07/48/jellyfish-4477548_960_720.jpg
---

```html
<!-- Vue通过JavaScript生成验证码 -->
<template>
    <div>
 <span class="checkCode" @click="createCode">{{ checkCode}} 
        </span>
    </div>
</template>

<script>
export default {
  data () {
    return {
      checkCode: '',
    }
  },
  mounted () {
    this.createCode();
  },
  methods: {
    createCode () {
      let code = "";
      const codeLength = 4; //验证码的长度  
      const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
      for (let i = 0; i < codeLength; i++) { //循环操作  
        let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
        code += random[index]; //根据索引取得随机数加到code上  
      }
      this.checkCode = code; //把code值赋给验证码  
    },
  },
  components: {

  },
}
</script>

<style scoped>
.checkCode {
 border-radius: 5px;
 border: 2px solid #eaeaea;
 font-size: 20px;
 padding: 5px 15px 5px 15px;
 background-color: #cac6c6;
}
</style>
```
