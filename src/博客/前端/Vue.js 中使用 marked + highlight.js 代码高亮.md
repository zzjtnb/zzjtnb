---
title: vue 中使用 marked + highlight.js 代码高亮
category: 前端
tags:
  - Vue
cover: https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

## markdown 代码高亮

需要依赖

* `npm install marked --save`
* `npm install highlight.js --save`

这里使用的主题是`monokai-sublime.css`可以自行更换主题。

结果

![watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NyaWJ1ZzgwODA=,size_16,color_FFFFFF,t_70,](https://img-blog.csdnimg.cn/20190322190516714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NyaWJ1ZzgwODA=,size_16,color_FFFFFF,t_70,#pic_center)

```html
<template>
  <div>
    <div class="hljs" ref="hlDiv" v-html="code"></div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js';
import 'highlight.js/styles/agate.css';

export default {
  name: "height",
  data() {
    return {
      code: '```javascript\nfunction(){\n\tconsole.log(123)\n}\n```'
    }
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        if (language && hljs.getLanguage(language)) {
          return '<div class="hljs">' + hljs.highlight(validLanguage, code).value + '</div>';
        }
        return hljs.highlight(validLanguage, code).value;
      },
      // highlight: function (code, language) {
      //   const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
      //   return hljs.highlight(validLanguage, code).value;
      // },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
    this.code = marked(this.code)
  },
}
</script>
```
