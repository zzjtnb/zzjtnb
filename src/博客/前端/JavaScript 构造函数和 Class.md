---
title: JavaScript构造函数和Class
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2022/09/28/13/17/pink-rose-7485056_1280.jpg
---

构造函数:

```js
function Animal(name, species, weight) {
  this.name = name;
  this.species = species;
  this.weight = weight;
  this.getWeight = function() {
    return this.weight;
  };
}

const animal1 = new Animal("Buddy", "dog", 25);
console.log(animal1.getWeight()); // 25
```

改造：

```js
class Animal {
  constructor(name, species, weight) {
    this.name = name;
    this.species = species;
    this.weight = weight;
  }

  getWeight() {
    return this.weight;
  }
}

const animal1 = new Animal("Buddy", "dog", 25);
console.log(animal1.getWeight()); // 25
```

封装:

```js
function creat_list(host, defConfig) {
  class Main {
    constructor() {
      this.defConfig = {
        name: 'hello',
        time: 0,
      }
    }
    init(cfg) {
      this.time = cfg.time
      this.clg(this.time, 'init')
    }
    clg(data, msg) {
      console.log(`${this.defConfig.name} ${data}`, msg)
    }

    getTime() {
      return this.time
    }
  }
  Main.defConfig = defConfig
  const main = new Main()
  main.init({
    time: 15,
  })
  console.log(main.defConfig, 'main')
  host.Event.list[defConfig.name] = Main
}
let host = {
  Event: {
    list: {},
  },
}
let defConfig = {name: 'test', time: 10}
creat_list(host, defConfig)
console.log(host.Event.list.test.defConfig, 'host')
let test = new host.Event.list.test()
test.clg('world', 'new test')
// hello 15 init
// {name: 'hello', time: 0} 'main'
// {name: 'test', time: 10} 'host'
// hello world new test
```
