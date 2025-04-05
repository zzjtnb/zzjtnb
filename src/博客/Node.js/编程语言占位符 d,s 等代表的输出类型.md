---
title: 编程语言占位符%d,%s等代表的输出类型
category: Node.js
tags:
  - 占位符
cover: https://images.unsplash.com/photo-1540200882611-31297ad57e00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQwMzA0fQ&auto=format&fit=crop&w=1267&q=80
---

### 举例

```JavaScript
let userInfo={"name":"zhangsasn","age":20};
// console.log(`姓名:${userInfo.name},年龄:${userInfo.age}`);
console.log("姓名: %s, 年龄: %s", userInfo.name, userInfo.age);
```

* `format` [&lt;string&gt;](http://nodejs.cn/s/9Tw2bK) 一个类似 `printf` 的格式字符串。

`util.format()` 方法返回一个格式化后的字符串，使用第一个参数作为一个类似 `printf` 的格式的字符串，该字符串可以包含零个或多个格式占位符。 每个占位符会被对应参数转换后的值所替换。 支持的占位符有：

* `%s` - `String` 将用于转换除 `BigInt`、 `Object` 和 `-0` 外的所有值。`BigInt` 值将用 `n` 表示，而没有用户定义 `toString` 函数的对象使用带有选项 `{ depth: 0, colors: false, compact: 3 }` 的 `util.inspect()` 进行检查。
* `%d` - `Number` 将用于转换除 `BigInt` 和 `Symbol` 之外的所有值。
* `%i` - `parseInt(value, 10)` 用于除 `BigInt` 和 `Symbol` 之外的所有值。
* `%f` - `parseFloat(value)` 用于除 `BigInt` 和 `Symbol` 之外的所有值。
* `%j` - JSON。如果参数包含循环引用，则替换为字符串 `'[Circular]'`。
* `%o` - `Object`。具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于带有选项 `{ showHidden: true, showProxy: true }` 的 `util.inspect()`。 这将显示完整对象，包括非可枚举属性和代理。
* `%O` - `Object`。具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于 `util.inspect()` 但没有选项。 这将显示完整对象，不包括非可枚举属性和代理。
* `%c` - `CSS`。该说明符当前会被忽略，将会跳过任何传入的 CSS。
* `%%` - 单个百分号（`'%'`）。这不会消耗参数。
* 返回: [&lt;string&gt;](http://nodejs.cn/s/9Tw2bK) 格式化的字符串。

如果占位符没有对应的参数，则占位符不被替换。

```JavaScript
util.format('%s:%s', 'foo');
// 返回: 'foo:%s'
```

如果类型不是 `string`，则使用 `util.inspect()` 格式化不属于格式字符串的值。

如果传入 `util.format()` 方法的参数比占位符的数量多，则多出的参数会被强制转换为字符串，然后拼接到返回的字符串，参数之间用一个空格分隔。

```JavaScript
util.format('%s:%s', 'foo', 'bar', 'baz');
// 返回: 'foo:bar baz'
```

如果第一个参数不是一个字符串，则 `util.format()` 返回一个所有参数用空格分隔并连在一起的字符串。

```JavaScript
util.format(1, 2, 3);
// 返回: '1 2 3'

```

如果只有一个参数传给 `util.format()`，它将按原样返回，不带任何格式：

```JavaScript
util.format('%% %s');
// 返回: '%% %s'
```

`util.format()` 是一种用作调试工具的同步方法。 某些输入值可能会产生严重的性能开销，从而阻止事件循环。 请谨慎使用此功能，切勿在热代码路径中使用。
