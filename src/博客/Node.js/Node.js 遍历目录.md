---
title: node.js遍历目录
category: Node.js
tags:
  - fs
cover: https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1271&q=80
---

## 同步遍历

```JavaScript
const fs = require('fs');
const path=require('path');
function travel(dir,callback){
    fs.readdirSync(dir).forEach((file)=>{
        var pathname=path.join(dir,file)
        if(fs.statSync(pathname).isDirectory()){
            travel(pathname,callback)
        }else{
            callback(pathname)
        }
    })
}
travel('F:/HTML/Node/test',function(pathname){
    console.log(pathname)
})
```

## 异步遍历

```JavaScript
const fs = require('fs');
const path=require('path');
function travel(dir,callback){
    fs.readdir(dir,(err,files)=>{
        if(err){
            console.log(err)
        }else{
            files.forEach((file)=>{
                var pathname=path.join(dir,file)
                fs.stat(pathname,(err,stats)=>{
                    if(err){
                        console.log(err)
                    }else if(stats.isDirectory()){
                        travel(pathname,callback)
                    }else{
                        callback(pathname)
                    }
                })
            })
        }
    })
}
travel('F:/HTML/Node/test',function(pathname){
    console.log(pathname)
})
```
