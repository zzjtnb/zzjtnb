---
title: TypeScript 的简单使用
category: 前端
tags:
  - TypeScript
cover: https://cdn.pixabay.com/photo/2020/04/25/18/45/robinia-5092118_960_720.jpg
---

```js
// 声明三个基本类型的变量：boolean、number、string
// 这些变量只能被赋予相同类型的值
let isDone:boolean = false;
let count:number = 123;
let userName:string = "Mike";
userName += count;

// 声明数组
// 可以声明 N 维数组
const arr:string[] = [];
// 该数组是一个二维数组，子数组的每一项元素的类型都应该是 number，如果是三维数组，同理
// 但是数组没有默认值，需要手动进行初始化，如果不初始化，其值是 undefined
// let birthday:number[][][];
const birthday:number[][] = [];
arr.push("str");
birthday.push([1008611]);
// console.log(birthday)
// 以泛型风格声明一个数组
const students:Array<string> = [];
students.push("Mike");

// 声明元组
// 数组要求各项元素类型一致，元组可以不一致，但也需要事先进行声明
const tuple:[string,number] = ["Mike",123];
// 要求每一项的数据类型都符合元组声明的类型，因此下面的写法会报错
// const tuple:[string,number] = [];

// 声明枚举
// 枚举的声明方式和其他类型不太一样，如下图
// enum Days { First,Second,Third };
// console.log(Days[1]) // Second
// 枚举默认从 0 开始编号，也可以手动指定（手动指定不要求连续，甚至可以使用负数、小数）
enum Days { 'First' = 1,Second = 2,Third = -3,Fourth = -1.20,Fifth = "xxx" };
// 通过下标获取枚举的值：
console.log(Days[1])
// 通过枚举元素获取下标的值（常用）：
console.log(Days.Second)
// 一般我们使用枚举来存放一组值，并通过一个友好或约定的名称来标识它们，获取这些值的时候通过名称来获取

// 声明 any 类型
// 前面介绍的几个类型都是强类型，不能将这类类型的变量赋值为其他类型的值
// 通过 any 类型，就可以赋值其他类型的值了
let anyVar:any;
anyVar = 123;
anyVar = "Mike"
console.log(anyVar)
// 声明一个 any 类型的数组
const anyArr:any[] = [1,"2",false];

// 声明 void 类型
// void 类型常用于函数的返回值声明中，也可以用来声明变量
// 当一个函数没有返回值时，其返回值就是 void 类型
function testVoid():void{}
// 当一个函数定义了返回值类型时，就需要返回此类型的变量
function testNumber():number{
    return 100;
}
// void 类型也可以用来声明变量，但是只能赋值为 undefined 或者 null（因此在声明函数的返回值为 void 时，该函数返回 undefined 或者 null 都有效）
let voidUndefined:void = undefined;
let voidUndefined2:void;
let voidNull:void = null;
console.log("==================")
// console.log(voidUndefined,voidUndefined2,voidNull) // undefined undefined null

// 声明 null 和 undefined 类型
// null 和 undefined 在 TS 中属于两种数据类型
let nullVal:null = null;
let undefinedVal:undefined = undefined;

// 函数的参数类型
function testFn1(name:string,age:number):void{}
// 定义箭头函数
const testFn2 = (name:string,age:number):number => { return 123 }
console.log(testFn2("Mike",20))
console.log("==================")

// 函数参数的限制
// 除了定义默认参数，定义了多少参数，必须要传入多少参数，不能多，不能少，并且类型需要保持一致
function testArgsNumber(first:number,second:string):void{}
// testArgsNumber(1,"",1)
// testArgsNumber()
testArgsNumber(1,"");

// 定义可不传的参数
function testArgs2(name?:string):void{ console.log(name) }
testArgs2(); // undefined
testArgs2("Suffe"); // Suffe
// 当然，传入参数的总数量不能超
// testArgs2("Jerry",1)

console.log("==================")
// 设置默认参数
function testArgs3(first:string,second:number = 123):void{
    console.log(first,second)
}

testArgs3("Charley");
testArgs3("Charley",666);
console.log("==================")

// 可变参数：摆脱参数个数的限制
// 可变参数可以是数组类型的，因此也需要指定参数的类型

function testArgs4(first:string,...args:number[]):void{
    console.log(first)
    console.log(...args)
}
// 声明参数时的类型为数组，调用函数时依次传入即可
testArgs4("Mike",1,2,3,4);
console.log("==================")

// 函数重载
// 定义函数重载时不能直接像 java 那样写不同的方法签名，因此下面的定义是会报错的
// function testReload():void{}
// function testReload(name:string){}
// 这个后面再看吧...

// class 的简单使用
class Person{
    // 在使用属性前必须先声明
    name:string;
    age:number;
    // 定义对象属性
    constructor(name:string,age:number){
        // 在使用属性前必须先声明
        this.name = name;
        this.age = age;
    }

    say():{name:string,age:number}{
        const { name,age } = this;
        return{
            name,
            age
        }
    }
}

const p1 = new Person("Charley",24);
console.log(p1.say())

// 类的继承
class Students extends Person{
    // 定义私有属性
    school:string;
    // 属性声明中定义了属性类型后，方法中可以不写属性类型了
    constructor(name:string,age:number,school:string){
        // 调用父类构造方法
        super(name,age);
        this.school = school;
    }
    say():{name:string,age:number,school:string}{
        const { name,age,school } = this;
        return{
            name,
            age,
            school
        }
    }
}

const stu1 = new Students("Mike",18,"MIT")
console.log(stu1.say())
console.log("==================")

// 访问修饰符
// public private protected
class Car{
    public color:string;
    private id:number;
    protected size:string;
    constructor(color,id,size){
        this.color = color;
        this.id = id;
        this.size = size;
    }
}

class Ford extends Car{
    say():void{
        console.log("color",this.color);
        console.log("size",this.size);
        // private 的属性只能在当前类中访问
        // console.log("id",this.id);
    }
}

const f1 = new Ford("Black",110,"100m * 100m");
f1.say();
console.log(f1.color)
// protected 的属性只能在父类和子类中使用
// console.log(f1.size);

// 访问控制器实现
class Test{
    private _testProp:string;
    constructor(testProp){
        this._testProp = testProp;
    }

    // getter 方法必须要返回值
    get attr():string{
        return this._testProp;
    }

    // setter 方法不能有返回值
    // 注意：getter 方法的返回值和 setter 方法的参数类型必须一致！
    set attr(val:string){
        this._testProp = val;
    }
}

const test1 = new Test("memeda~")
console.log(test1.attr)
test1.attr = "HaHa"
console.log(test1.attr)
console.log("==================");

// 静态属性
// 只能通过类调用
class TestStatic{
    static staticName:string;
    say():void{
        // console.log(this.staticName)
    }
}

TestStatic.staticName = "HaHa"
console.log(TestStatic.staticName)

// 引用数据类型
class Test2{
    public name:string;
    constructor(name){
        this.name = name;
    }
}

let test2:Test2 = new Test2("Charley")
console.log(test2.name)
// TS 中，如果不实现声明属性而直接使用会报错的
// test2.testProp = 123;

// 创建接口
// 接口用来定义数据的类型，前面一直用的函数参数类型实际上就是一种接口：
function testInterface1(name:string,age:number){}
// 也可以使用 interface 关键字定义接口，和传统的面向对象语言更像

interface UserInfo{
    name:string
    age:number
}

function testInterface2(user:UserInfo){
    console.log(user)
}
testInterface2({name:"xx",age:1})
console.log("==================");

// 接口的可选属性
// 和可选参数一样，使用 ? 修饰即可
interface UserInfo2{
    name:string
    // 接口只用来定义值，不能初始化值，因此下面的用法错误
    // name:string = "Mike"
    age?:number
}

// 接口可以用来规范 TS 中的任意数据类型
// 使用接口规范函数声明
interface SearchFunc{
    (source:string,substr:string):boolean
}

let mySearch:SearchFunc = (source:string,substr:string):boolean => {
    const res = source.search(substr);
    if(res === -1){
        return false;
    }
    return true;
};

console.log(mySearch("xxxx","xx"))
console.log(mySearch("xxxx","yx"))
console.log("==================");

// 使用接口规范数组类型
interface ArrayInterface{
    [index:number]:string
}

const myArr:ArrayInterface = [""];

// 使用接口规范 Class
// 通过子类实现接口 implements
// 不可使用访问修饰符
interface TestClassInterface{
    name:string;
    // 不可以使用访问修饰符
    // public name:string;
    age:number;
    say():{name:string,age:number};
}

class Test3 implements TestClassInterface{
    name:string;
    age:number;
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    
    say():{name:string,age:number}{
        return{
            name:this.name,
            age:this.age
        }
    }
}

const test3Obj = new Test3("Charley",12);
console.log(test3Obj.say())
console.log("==================");

// 接口继承
// 接口也可以继承别的接口，也可以多继承，还可以混合
// 这部分内容再看文档吧

// 泛型
// 场景，假如需要定义一个打印各种数据类型的函数
// 你可能会这样写
function printVal0(arg:any):any{
    return arg;
}
// 但上面的写法有个坏处，就是我们在调用函数时再也不能控制参数的类型了
// 可能会导致类型转换
function printVal<T>(arg:T):T{
    return arg;
}

const printValRes = printVal<string>("xxx");
console.log(printValRes)
console.log("==================");

// 泛型的应用
// 泛型是根据传入参数的类型来决定拥有哪些属性的
// function testGeneric1<T>(str:T){
//     // 这里编译不通过，因为无法预知 str 的类型，不能确定是否有 length 属性
//     console.log(str.length);
// }

function testGeneric2<T>(arr:T[]){
    // 这里编译通过了，因为这里确定 arr 是一个数组
    console.log(arr.length);
}

// 这里由于使用了 string 类型约束，因此数组的每一项都必须是 string
testGeneric2<string>(["a","b"])
console.log("==================");

// 泛型类
class GenericClass<T>{
    num:T;
    // 声明属性方法需要使用 =>
    add:(x:T,y:T) => T;
}
// 创建实例时可以指定泛型类型
const myGenericClassObj = new GenericClass<number>();
myGenericClassObj.num = 123;
myGenericClassObj.add = (x,y) => x+y;
console.log(myGenericClassObj.add(123,321));
console.log("==================");

// 装饰器
function decoHello(target:any){
    console.log("DecoHello")
}

// 使用装饰器装饰这个类后，会自动执行装饰器
@decoHello
class DecoHelloTest{}
```
