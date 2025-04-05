---
title: js实现Ajax并发请求控制的几种解决方案
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2017/10/20/01/06/north-star-2869817_960_720.jpg
---

```js
/**
 *Promise.all并发请求限制及async-pool的应用
 *串行:请求时异步的,需要等待上一个请求成功才能执行下一个请求
 *并行:同时发送多个请求[HTTP请求可以同时进行,但是js的操作时一步一步来的,因为js是单线程],等待所有的请求都成功再去做什么
 *并发限制指的是每个时刻并发执行的Promise数量是固定的,最终的执行结果还是保持与原来的
 */
const delay = function delay(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (interval === 1003) reject('请求失败')
      resolve(interval)
    }, interval)
  });
}

let tasks = [() => {
  return delay(1000);
}, () => {
  return delay(1003);
}, () => {
  return delay(1005);
}, () => {
  return delay(1002);
}, () => {
  return delay(1004);
}, () => {
  return delay(1006);
}]
/*
//没有并发限制,6个全部同时执行
Promise.all(tasks.map(task => task())).then(results => {
  console.log('' + results);
}).catch(error => {
  console.log(error);
})
*/


/* const asyncPool = require('./lib/index');//不能保证顺序
let results = []
let current = 0
asyncPool(3, tasks, (task, next) => {
  // console.log(next);
  // console.log('' + task);

  task().then((result) => {
    console.log(object);
    console.log(`事务进度 ${((++current / tasks.length) * 100).toFixed(2)}% `);
    results.push(result)
    next()
  }).catch((err) => {
    // console.log(err);
  });
}, () => {
  // console.log(results);
  console.log('all done.');
})
 */

/*
const asyncPool = require('tiny-async-pool');
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
(async () => {
  const results = await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
  console.log(results);
})()
 */
/**
 * js实现Ajax并发请求控制的两大解决方案
 * 方案一 保证顺序
 * 整体成功才是成功,按顺序储存结果,只要有失败整体失败
 * @param {Array} tasks 数组包含很多方法,每一个方法执行就是发送一个请求(必须基于Promise)
 * @param {Number} pool 每次并发请求的数量
 */

/*
function creatRequest(tasks, pool) {
  pool = pool || 5;//不传并发数量默认为5
  let results = [];//储存执行结果
  together = new Array(pool).fill(null);//有一个长度为pool的数组,每一项都是null
  let index = 0;//标记第几个任务
  together = together.map(() => {
    return new Promise((resolve, reject) => {
      const run = function run() {
        console.log(`事务进度 ${((index / tasks.length) * 100).toFixed(2)}% `);
        if (index >= tasks.length) return resolve();
        let oldIndex = index;
        let task = tasks[index++];
        task().then(result => {
          results[oldIndex] = result;
          run()
        }).catch(error => {
          reject(error)
        })
      }
      run()
    });
  });
  // return Promise.all(together).then(() => results, error => Promise.reject(error))
  return Promise.all(together).then(() => results)
}
creatRequest(tasks, 2).then((result) => {
  //都成功,整体才成功,按顺序储存结果
  console.log('成功-->', result);
}).catch((err) => {
  //只要有一个失败整体就是失败
  console.log('失败-->', err);
});


/**
 * js实现Ajax并发请求控制的两大解决方案
 * 方案二 不保证顺序
 * 成功几个存几个,失败的不存.中间有失败的也不影响其他的请求
 * @param {Array} tasks 数组包含很多方法,每一个方法执行就是发送一个请求(必须基于Promise)
 * @param {Number} pool 每次并发请求的数量
 * @param {Function} callback 所有都请求成功做什么
 */
function creatRequest(tasks, pool, callback) {
  if (typeof pool === 'function') {
    callback = pool;
    pool = 5;
  }
  if (typeof pool !== 'number') pool = 5;
  if (typeof callback !== 'function') callback = function () { };
  class TaskQueue {
    running = 0;//当前运行的有几个
    queue = [];//存放所有任务队列
    results = [];//所有请求成功的结果
    count = 0
    pushTask(task) {
      let self = this;
      self.queue.push(task);
      self.next();
    }
    //限制请求
    next() {
      let self = this;
      //能发请求的数量一定要小于线程的数量并且集合里面必须有任务
      while (self.running < pool && self.queue.length) {
        self.running++;//说明已经占用了发请求的操作
        let task = self.queue.shift();//拿到当前的task,拿到一个任务就从集合当中删一个
        task().then(result => {
          self.results.push(result)
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          self.running--;
          self.next();
        })
        console.log(`事务进度 ${((++this.count / tasks.length) * 100).toFixed(2)}% `);
      }
      if (self.running === 0) callback(self.results)
    }
  }
  let TQ = new TaskQueue;
  tasks.forEach(task => TQ.pushTask(task))
}
creatRequest(tasks, 2, results => {
  console.log(results);
})
```
