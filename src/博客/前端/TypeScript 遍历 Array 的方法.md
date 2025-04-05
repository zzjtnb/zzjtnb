---
title: TypeScript 遍历Array的方法：
category: 前端
tags:
  - TypeScript
cover: https://cdn.pixabay.com/photo/2014/10/30/11/59/dune-509241_960_720.jpg
---

Typescript 的官方文档 [Iterators and Geneators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)

一、for..of 方法  
这是最常用的方法, 遍历的值是数组中的 value 值

```js
let someArray = [1, "string", false]; 
for (let entry ofsomeArray){
console.log(entry); // 1, "string", false
}

```

二、for..in 方法  
这个方法要注意和 for..of 的区别, for..in 遍历的值是数组的索引

```js
let list = [4, 5, 6]; 
for (let i in list){
console.log(i); // "0", "1", "2", }
for (let i of list){
console.log(i); // "4", "5", "6" }
```

三、for 循环  
for 循环是标准的 C 风格语法

```js  
var numbers = [1, 2, 3]; 
for (var _i = 0; _i< numbers.length; _i++) {
var num = numbers[_i]; 
console.log(num); // "1", "2", "3" }

```

四、forEach
forEach 其实是 JavaScript 的循环语法, TypeScript 作为 JavaScript 的语法超集, 当然默认也是支持的.

```js
let list = [4, 5, 
6]; 
list.forEach((val, idx, array)=> {
// val: 当前值
// idx: 当前index
// array: Array 
}); 
```

五、every 和 some  
every 和 some 也都是 JavaScript 的循环语法, TypeScript 作为 JavaScript 的语法超集, 当然默认也是支持的. 因为 forEach 在 iteration 中是无法返回的, 所以可以使用 every 和 some 来取代 forEach.

``` js
let list = [4, 5, 6]; 
list.every((val, idx, array) => {
// val: 当前值
// idx: 当前index
// array: Array
return true; // Continues
// Return false will quit the iteration 
}); 

```

### 方法 1:for 循环

for 循环其实是标准的 C 风格语法.

```js
let someArray = [1, "string", false]; 
for (let entry ofsomeArray){
console.log(entry); // 1, "string", false
}
```

### 方法 2:for…of

这个貌似是最常用的方法, angular 2 中 HTML 语法绑定也是要的这种语法.

```js
let list = [4, 5, 6]; 
for (let i in list){
console.log(i); // "0", "1", "2", 
}
for (let i of list){
console.log(i); // "4", "5", "6"
}

```

for…in 和 for…of 的区别 :

```js
var numbers = [1, 2, 3]; 
for (var _i = 0; _i< numbers.length; _i++) {
var num = numbers[_i]; 
console.log(num); // "1", "2", "3"
}
```

### 方法 3:forEach

forEach 其实是 JavaScript 的循环语法, TypeScript 作为 JavaScript 的语法超集, 当然默认也是支持的.

``` js
let list = [4, 5, 6]; 
list.forEach((val, idx, array)=> {
// val: 当前值
// idx: 当前index
// array: Array 
}); 

```

### 方法 4: map()

```js
let list = [4, 5, 6]; 
list.every((val, idx, array) => {
// val: 当前值
// idx: 当前index
// array: Array
return true; // Continues
// Return false will quit the iteration 
}); 
```

### 方法 5: every()

对数组中的每个元素都执行一次指定的函数(callback), 直到此函数返回 false, 如果发现这个元素, every 将返回 false, 如果回调函数对每个元素执行后都返回 true , every 将返回 true. 它只对数组中的非空元素执行指定的函数, 没有赋值或者已经删除的元素将被忽略

```js  
let list = [4, 5, 6]; 
list.every((val, idx, array) => {
  // val: 当前值
  // idx: 当前index
  // array: Array
  return true; // Continues
  // Return false will quit the iteration
}); 

```

```js
//测试是否所有数组元素都大于等于10:
function isBigEnough(element, index, array) {
  return (element >= 10); 
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough); 
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough); 
// passed is true
//结果:
//[12, 5, 8, 130, 44].every(isBigEnough) 返回 : false 
//[12, 54, 18, 130, 44].every(isBigEnough) 返回 : true 
```

### 方法 6: some()

对数组中的每个元素都执行一次指定的函数(callback), 直到此函数返回 true, 如果发现这个元素, some 将返回 true, 如果回调函数对每个元素执行后都返回 false , some 将返回 false. 它只对数组中的非空元素执行指定的函数, 没有赋值或者已经删除的元素将被忽略.

```js  
//检查是否有数组元素大于等于10:
function isBigEnough(element, index, array) {
  return (element >= 10); 
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough); 
// passed is false
passed = [12, 5, 8, 1, 4].some(isBigEnough); 
// passed is true
//结果:
//[2, 5, 8, 1, 4].some(isBigEnough) : false 
//[12, 5, 8, 1, 4].some(isBigEnough) : true 

```

### 方法 7: filter()

语法:

参数说明:

callback: 要对每个数组元素执行的回调函数.thisObject : 在执行回调函数时定义的 this 对象.

```js
//过滤掉小于 10 的数组元素:
//代码:
function isBigEnough(element, index, array) {
  return (element >= 10); 
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough); 
// 12, 130, 44
//结果:[12, 5, 8, 130, 44].filter(isBigEnough) : 12, 130, 44 
```

功能说明:

**对数组中的每个元素都执行一次指定的函数(callback), 并且创建一个新的数组, 该数组元素是所有回调函数执行时返回值为 true 的原数组元素. 它只对数组中的非空元素执行指定的函数, 没有赋值或者已经删除的元素将被忽略, 同时, 新创建的数组也不会包含这些元素.**

回调函数可以有三个参数: 当前元素, 当前元素的索引和当前的数组对象.

如参数 **thisObject** 被传递进来, 它将被当做回调函数(callback)内部的 this 对象, 如果没有传递或者为 null, 那么将会使用全局对象.

filter 不会改变原有数组, 记住: 只有在回调函数执行前传入的数组元素才有效, 在回调函数开始执行后才添加的元素将被**忽略**, 而在回调函数开始执行到最后一个元素这一期间, 数组元素被删除或者被更改的, 将以回调函数访问到该元素的时间为准, 被删除的元素将被忽略.

### 方法 8: Concat()

该方法用于连接或者是合并 2 个或多个数组, 并且返回一个新的数组, 它并不改变已经存在的数组, 而是返回一个包含所有数组值的数组. 语法如下:

```js
array.concat(value1, value2, valu3, ....................valuen)

```

array: 所有的其他数组要进行合并的源数组 value: 要添加到源数组中的其他数组元素.
举例:

```js
var fstarry: string[] = ['C', 'Sharp'];
var scndarry: string[] = ['Corner', '.com'];
var result = fstarry.concat(scndarry); 
console.log(result); // ['C', 'Sharp', 'Corner', 'com']
```

### 方法 9: Join() 方法

该方法用于连接一个数组的元素到一个字符串, 并且返回该字符串. join 方法接收一个分隔符作为参数, 指定特定的像空格  逗号或加号等其他的字符来分隔数组中的元素, 如果没有指定任何参数, 这个方法将转换数组中的所有元素为字符串, 并且连接并通过逗号分隔字符串数组元素.

```js  
array.join(separator)

```

示例如下所示:

```js
btnArrayJoinClick(sender: Core. Classes. TComponent){
var fstarry: string[] = ['C', 'Sharp', 'Corner', '.com'];  
var result = fstarry.join(); 
var result1 = fstarry.join('+'); 
var result2 = fstarry.join('*'); 
 this.edit1.text="Join Method n 第1个join示例 -> " + result + "n" + "第2个使用+号的示例 (+) -> " + result1 + "n" +"第3个使用*号的示例(*) -> " + result2 +"n"; 
}
```

结果如下所示:

``` js
Join Method   第1个join示例 -> C, Sharp, Corner, .com
第2个使用+号的示例 (+) ->   C+Sharp+Corner+.com
第3个使用*号的示例(*) ->   C*Sharp*Corner*.com

```

### 方法 10: Push() 方法

Push 方法向数组的最后位置中插入一个或多个元素, 返回新的数组的长度, push 方法视数组为一个堆栈结构, 语法如下所示:

```js
array.push(element1, element 2, .........)
```

示例如下所示:

```js
btnpushdemoClick(sender: Core. Classes. TComponent){
var fstarry: string[] = ['C', 'Sharp', 'Corner'];  
var elemnt ="wis_one"
fstarry.push(elemnt); 
this.edit1.text= "Push Method n 插入了数组元素值之后, Array is -> " + fstarry + "n";   
}

```

输出结果如下所示:

```js
Push Method 插入了数组元素值之后, Array is -> C, Sharp, Corner, wis_one
```

### 方法 11:pop() 方法

pop 方法是 Array 对象中最流行的方法, 该方法移除数组中的最后一个元素, 减少数组的长度并且返回被移除的元素, 如果数组为空, 则 pop 方法会返回 null.

语法如下所示:

```js  
array.pop()

```

示例如下所示:

```js  
btnpopDemoClick(sender: Core. Classes. TComponent){
var arrayName: string[] = ['C', 'Sharp', 'Corner', 'VB', 'Net', 'Heaven']; 
var index = arrayName.pop().toString(); 
this.edit1.text= "Pop Method n 从数组中移除元素-> " + index; 
}
```

输出结果如下所示:

```js  
Pop Method 从数组中移除元素-> Heaven

```

### 方法 12: reverse()

用于反转数组元素的顺序, reverse 方法没有参数, 返回被反转后的数组, 使得最后一个元素变为第 1 个元素, 第 1 个元素变为最后一个元素. 语法如下所示:

```js  
array.reverse()
```

示例如下所示:

```js  
var fstarry: string[] = ['aa', 'bb', 'cc'];  
fstarry.reverse(); 
this.edit1.text = "Revrese Method n 反转后的数组: -> " + fstarry + "n";     

```

结果如下所示:

```js
Revrese Method 反转后的数组: -> cc, bb, aa
```

### 方法 13: shift()

移除数组中的首个元素, 减少数组的长度并且返回被移除的元素, 如果数组的键为数字型, 那么所有的元素将得到新的键, 从 0 开始依次递增.

```js  
array.shift()

```

示例如下所示:

```js  
var arrayName: string[] = ['C', 'Sharp', 'Corner', 'VB', 'Net', 'Heaven']; 
var index = arrayName.shift().toString(); 
this.edit1.text = "Shift Method n 移除的元素为 -> " + index; 
```

结果如下所示:

```js  
Shift Method 移除的元素为 -> C

```

### 方法 14: slice()

该方法返回指定起始位置的一个新的数组, slice 和 concat 方法让用户可以根据指定的原始数组创建一个新的数组, 并不会修改原始的数组, 如果只想让原始数组被新数组替代, 可以设置旧的数组等于新的数组. 语法如下所示:

```js
array.slice(start, end)
```

示例如下所示:

```js  
var fstarry: string[] = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'hh', 'gg'];  
var sliceArry=fstarry.slice(3, 7); 
this.edit1.text = "Slice Method n 新的数组为 -> " + sliceArry + "n"; 

```

示例运行结果如下:

```js
Slice Method 新的数组为 -> dd, ee, ff, hh
```

### 方法 15:sort()

排序数组, 如果没有指定参数, 那么将会按照字母数字顺序进行排序, 语法如下:

```js  
array.sort(comparison_function)

```

示例如下所示:

``` js
var arrayName: string[] = ['C', 'Sharp', 'Corner', 'VB', 'Net', 'Heaven'];
var sortArry = arrayName.sort();
this.edit1.text = "Sort Method n 排序后的结果为-> " + sortArry + "n";
```

运行效果如下所示:

```js  
Sort Method  排序后的结果为-> C, Corner, Heaven, Net, Sharp, VB

```

### 方法 16: IndexOf()

用来在数组中搜索指定的元素值, 并且返回所发现的第 1 个结果值的下标, 语法如下所示:

```js
array.indexOf(searchvalue, start)
```

searchvalue 是指定要搜索的值, start 指定要搜索的起始索引位置, 如果没有指定, 那么表示从 0 开始进行搜索. 如果找到则返回找到的索引值, 如果没有找到, 则返回 - 1.

``` js
var arrayName: string[] = ['C', 'Sharp', 'Corner', 'Dot', 'Net', 'Heaven']; 
var index = arrayName.indexOf('Dot'); 
//放回index的值为:3

```

### 方法 17: LastIndexOf()

与 IndexOf 相反, 它返回的是最后一次批配的字符串的索引位置, 如下语法所示:

```js
array.lastIndexOf(searchvalue, start)
```

如下示例所示:

```js
button1Click(sender: Core. Classes. TComponent){
var arrayName: string[] = ['aa', 'bb', 'cc', 'dd', 'ee', 'hh', 'cc', 'aa']; 
var index = arrayName.lastIndexOf('cc'); 
this.edit1.text="cc的索引位置是:"+index; 
}

```

输出结果如下:

```js
cc的索引位置是:6
```
