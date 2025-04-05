---
title: js 逆向常用的方法-HOOK|VM|AST|RPC
category: 前端
tags:
  - JavaScript
  - AST
cover: https://cdn.pixabay.com/photo/2023/06/27/10/51/pier-8091934_1280.jpg
---

## JS 逆向常用 HOOK 代码

### JSON HOOK

```js
!(function () {
  JSON._stringify = JSON.stringify
  JSON.stringify = function (params) {
    console.log('HOOK stringify', params)
    debugger
    return JSON._stringify(params)
  }

  JSON._parse = JSON.parse
  JSON.parse = function (params) {
    console.log('HOOK parse', params)
    debugger
    return JSON._parse(params)
  }
})()
```

### COOKIE HOOK

```js
!(function () {
  document._cookie = document.cookie
  Object.defineProperty(document, 'cookie', {
    get: function () {
      console.log('Get cookie')
      debugger
      return document._cookie
    },
    set: function (val) {
      console.log('Set cookie', val)
      debugger
      var cookie = val.split(';')[0]
      var ncookie = cookie.split('=')
      var flag = false
      var cache = document._cookie.split('; ')
      cache = cache.map(function (a) {
        if (a.split('=')[0] === ncookie[0]) {
          flag = true
          return cookie
        }
        return a
      })
      document._cookie = cache.join('; ')
      if (!flag) {
        document._cookie += cookie + '; '
      }
      this._value = val
      return document._cookie
    },
  })
})()
```

```js
!(function () {
  'use strict'
  Object.defineProperty(document, 'cookie', {
    get: function () {
      //debugger;
      return ''
    },
    set: function (value) {
      debugger
      return value
    },
  })
})()
```

```js
!(function () {
  // 严谨模式 检查所有错误
  'use strict'
  // document 为要hook的对象 这里是hook的cookie
  var cookieTemp = ''
  Object.defineProperty(document, 'cookie', {
    // hook set方法也就是赋值的方法
    set: function (val) {
      // 这样就可以快速给下面这个代码行下断点
      // 从而快速定位设置cookie的代码
      console.log('Hook捕获到cookie设置->', val)
      debugger
      cookieTemp = val
      return val
    },
    // hook get 方法也就是取值的方法
    get: function () {
      return cookieTemp
    },
  })
})()
```

### Search Decode Hook

```js
!(function () {
  for (var p in window) {
    var s = p.toLowerCase()
    if (s.indexOf('encode') != -1 || s.indexOf('encry') != -1) {
      console.log('encode function.\n', window[p])
      debugger
    }
    if (s.indexOf('decode') != -1 || s.indexOf('decry') != -1) {
      console.log('decode function.\n', window[p])
      debugger
    }
  }
})()
```

### Headers Hook

```js
!(() => {
  window.XMLHttpRequest.prototype._setRequestHeader = window.XMLHttpRequest.prototype.setRequestHeader
  window.XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
    if (key == 'Authorization') {
      debugger
    }
    return window.XMLHttpRequest.prototype._setRequestHeader.apply(this, arguments)
  }
})()
```

### Debugger Hook

```js
!(() => {
  Function.prototype.__constructor = Function.prototype.constructor
  Function.prototype.constructor = function () {
    if (arguments && typeof arguments[0] === 'string') {
      if ('debugger' === arguments[0]) {
        return
      }
      return Function.prototype.__constructor.apply(this, arguments)
    }
  }
})()
```

```js
Function.prototype.constructor_ = Function.prototype.constructor
Function.prototype.constructor = function (a) {
  if (a == 'debugger') {
    return function () {}
  }
  return Function.prototype.constructor_(a)
}
```

```js
_setInterval = setInterval
setInterval = function (a, b) {
  if (a.indexOf('debugger') == -1) {
    return _setInterval(a, b)
  }
}
```

```js
// Hook setTimeout
_setTimeout = setTimeout
setTimeout = function (func, time) {
  if (func == 'txsdefwsw') {
    return function () {}
  }
  return _setTimeout(func, time)
}
```

```js
Function.prototype.constructor = function () {}

_eval = eval
eval = function (a) {
  if (a === 'debugger;a=asdasdasdas') return _eval(a)
}
```

### eval Hook

```js
!(function () {
  if (window._eval) return
  window._eval = window.eval
  var myeval = function (src) {
    console.log('==== eval begin: length=' + src.length + ',caller=' + (myeval.caller && myeval.caller.name) + ' ====')
    console.log(src)
    console.log('==== eval end ====')
    return window._eval(src)
  }
  var _myeval = myeval.bind(null)
  _myeval.toString = window._eval.toString
  Object.defineProperty(window, 'eval', {value: _myeval})
  console.log('>>>> eval injected: ' + document.location + ' <<<<')
})()
```

## VM

Node.js 的 vm 模块是一个内置模块, 用于创建和管理单独的脚本执行环境. 它提供了一种执行 JavaScript 代码的方式, 可以在一个隔离的环境中运行代码, 从而提供了一定程度的代码隔离和安全性.

vm 模块的主要功能包括:

1. 创建和管理上下文环境: 使用 `vm.createContext` 方法可以创建一个新的上下文环境, 该环境中的代码执行会被限制在这个环境内, 无法访问外部的变量和函数. 可以使用`vm.runInContext` 方法在指定的上下文中执行代码.

2. 在当前上下文中执行代码: 使用 `vm.runInThisContext` 方法可以在当前的上下文环境中执行代码. 这个方法可以用来执行一些动态生成的代码, 或者在特定的上下文中执行一段代码.

3. 在沙箱环境中执行代码:vm 模块提供了一种沙箱环境, 可以在其中执行不受信任的代码, 以避免对主应用程序的影响. 通过创建一个新的上下文环境, 可以限制代码的访问权限, 从而提供一定的安全性.

4. 动态编译和执行代码:vm 模块可以动态地编译和执行代码. 使用 `vm.runInNewContext` 方法可以在一个全新的上下文环境中执行代码, 该方法允许您指定一个自定义的上下文对象, 用于在执行期间提供变量和函数.

需要注意的是, 虽然 vm 模块提供了一些程度的代码隔离和安全性, 但它并不是一个完全安全的沙箱环境. 因此, 在执行不受信任的代码时, 仍然需要谨慎对待, 并采取其他安全措施来保护主应用程序的安全.

### 封装 VM 工具

```js
const vm = require('vm')

/**
 * @class VMTool
 * @description 用于创建和管理虚拟机上下文的工具类
 */
class VMTool {
  /**
   * @constructor
   * @description 构造函数，初始化虚拟机和上下文
   */
  constructor() {
    this.context = {}
    this.vm = vm
    this.vm.createContext(this.context)
  }

  /**
   * @method createContext
   * @description 创建一个新的上下文
   * @param {Object} obj - 用于创建上下文的对象
   * @returns {Object} - 创建的上下文
   */
  createContext(obj) {
    this.vm.createContext(obj)
    this.context = obj
    return this.context
  }

  /**
   * @method createNewContext
   * @description 创建一个新的上下文，但不改变当前的上下文
   * @param {Object} obj - 用于创建上下文的对象
   * @returns {Object} - 创建的上下文
   */
  createNewContext(obj) {
    this.vm.createContext(obj)
    return obj
  }

  /**
   * @method runInContext
   * @description 在指定的上下文中运行代码
   * @param {string} code - 需要运行的代码
   * @param {Object} context - 用于运行代码的上下文，默认为当前上下文
   * @returns {any} - 代码运行的结果
   */
  runInContext(code, context = this.context) {
    return vm.runInContext(code, context)
  }
}
```

### 使用示例

```js
// 导入 VMTool 类
const VMTool = require('./VMTool')

// 创建一个 VMTool 实例
const vmTool = new VMTool()
// 创建一个新的上下文
const newContext = {x: 10}
vmTool.createNewContext(newContext)

// 在新的上下文中执行一段代码
vmTool.runInContext('x += 5;', newContext)
// 打印新的上下文,输出 { x: 15 }
console.log(newContext)
// 打印当前上下文,仍然是空对象 {}
console.log(vmTool.context)

// 在新的上下文中执行一段代码
vmTool.runInContext(`function add(a, b) { return a + b}`)
const result = vmTool.runInContext(`add(1,1)`)
// 打印执行结果,输出 2
console.log(result)
// 打印当前上下文 { add: [Function: add] }
console.log(vmTool.context)
```

## AST 字符串解密代码

AST 有一个在线解析网站:[https://astexplorer.net](https://astexplorer.net) ,顶部可以选择语言,编译器,是否开启转化等

在 JavaScript 中,AST(抽象语法树) 的类型有很多种, 主要取决于你的代码的结构. 下面是一些常见的 AST 节点类型:

- Program: 整个代码文件的根节点
- FunctionDeclaration: 函数声明节点
- VariableDeclaration: 变量声明节点
- Identifier: 标识符节点, 通常用于变量名或函数名
- Literal: 字面量节点, 如字符串, 数字, 布尔值
- BinaryExpression: 二元表达式节点, 如 a + b
- CallExpression: 函数调用节点, 如 console.log("hello world")
- BlockStatement: 代码块节点, 通常包括在{}内的一系列语句
- ReturnStatement: 返回语句节点
- IfStatement: 条件语句节点
- ForStatement: for 循环语句节点
- WhileStatement: while 循环语句节点
  更完整的 AST 类型列表和详细的解释, 你可以查看 [ESTree 的规范文档](https://github.com/estree/estree/blob/master/es5.md).

安装依赖

```bash
pnpm init -y
#pnpm install -D esprima estraverse escodegen iconv-lite
pnpm i -D @babel/parser @babel/traverse @babel/generator @babel/types vm
```

### 立即执行函数 (IIFE)

`generator` 函数默认生成函数声明, 而不是函数表达式.

```js
let code = '!(function (a, b) {return a + b}) (1, 2)'
// 使用@babel/generator将函数表达式转换回源代码
let IIFECode = generator(path.node).code
// 解析后变成了: 'function (a, b) {\n  return a + b;\n}(1, 2)'
```

通过在生成的代码周围添加括号来将其转换为函数表达式, 然后再执行它. 下面是一个完整示例

```js
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const vm = require('vm')

let code = '!(function (a, b) {\n  return a + b\n})(1, 2)\n'
const ast = parser.parse(code)

traverse(ast, {
  CallExpression(path) {
    if (path.node.callee.type === 'FunctionExpression') {
      // 使用@babel/generator将函数表达式转换回源代码
      let IIFECode = generator(path.node).code
      console.log(`发现IIFE,代码如下:\n${IIFECode}`)
      // 解析后变成了: 'function (a, b) {\n  return a + b;\n}(1, 2)'
      // 将函数声明转换为函数表达式
      IIFECode = `(${IIFECode})`
      // 创建一个新的上下文
      let context = vm.createContext()
      // 在新的上下文中执行函数代码
      vm.runInContext(IIFECode, context)
    }
  },
})
generator
```

### 逆向素材

```js
function _0x4547() {
  const _0x2b4dc4 = ['W5tcHdPHnq']
  _0x4547 = function () {
    return _0x2b4dc4
  }
  return _0x4547()
}
!(function (_0xe4df3d, _0x3a31db) {
  const _0x391561 = _0xe4df3d()
  while (!![]) {
    try {
      const _0x3fd233 = -parseInt(_0x264d(8382, 'xaKt')) / 1
      if (_0x3fd233 === _0x3a31db) break
      else _0x391561['push'](_0x391561['shift']())
    } catch (_0x32aa40) {
      _0x391561['push'](_0x391561['shift']())
    }
  }
})(_0x4547, 333287)

function _0x264d(_0xf407bb, _0x10bb29) {
  const _0xe766c0 = _0x4547()
  return (
    (_0x264d = function (_0x6dcd87, _0x52a5a3) {
      let _0x213d94 = _0xe766c0[_0x6dcd87]
      return (_0x213d94 = _0x44efeb), _0x213d94
    }),
    _0x264d(_0xf407bb, _0x10bb29)
  )
}
```

## 传统 RPC

1. 油猴脚本

- @name: 脚本的名称
- @namespace: 脚本的命名空间, 通常是脚本开发者的网站 URL
- @version: 脚本的版本
- @description: 描述这个脚本的功能
- @author: 脚本的作者
- @match: 这个脚本会在符合匹配模式的网页上运行
- @grant: 定义脚本需要的特殊权限, 如果没有特殊权限需求, 可以设为 none

```js
// ==UserScript==
// @name         WebSocket Client
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A WebSocket client implemented in a user script
// @author       争逐
// @match        http://*/*
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

!(function () {
  'use strict'
  // Your code here...
  var ws = new WebSocket('ws://localhost:8080')
  ws.onopen = function (event) {
    ws.send('Hello Server!')
  }
  ws.onmessage = function (event) {
    console.log('Server response:', event.data)
  }
})()
```

2. Node RPC 服务端

```bash
pnpm init -y
pnpm i ws
```

```js
// message = {
//   group: 'test',
//   action: 'makeRequest',
//   data: {user: '13255557777', psw: '8888888567'},
// }
// server.js
const WebSocket = require('ws')
const wss = new WebSocket.Server({port: 8080})
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received:', message)
    // 这里进行你的RPC调试代码
    ws.send('Request received')
  })
  ws.send('Welcome!')
})
```
