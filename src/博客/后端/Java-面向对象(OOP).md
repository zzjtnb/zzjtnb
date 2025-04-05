---
title: Java-面向对象(OOP)
category: 后端
tags:
  - Java
cover: https://cdn.pixabay.com/photo/2020/06/16/20/36/balloon-5307204_960_720.jpg
---

## 面向对象的三大特征

- 封装 (Encapsulation)
- 继承 (Inheritance)
- 多态 (Polymorphism)
OPP:Object Oriented Programming

```java
/*
 * 理解一：人开门
 * 面向过程：人 打开 门
 * 面向对象:
 * 人{
 *    打开(门){
 *   门.开开();
 *   } 
 * }
 * 
 * 门{
 *  开开(){
 *  }
 * }
 * 
 * 理解二：人把大象装进冰箱
 * 面向过程：1）打开冰箱2）把大象放进去 3)关闭冰箱门
 * 面向对象：
 * 人{
 *     打开(冰箱){冰箱.开开()}
 *   操作(大象){大象.进入(冰箱)}
 *   关闭(冰箱){冰箱.合上()}
 * }
 * 
 * 大象{
 *     进入(冰箱){}
 * }
 * 冰箱{
 *  开开(){}
 *  合上(){}
 * }
 * 
 * 
 */
```

## 类的属性

成员变量 vs 局部变量
相同点
不同点:

 成员变量:声明在类里、方法外
 局部变量:声明在方法内,方法的形参部分,代码块内

```java
class Person{
 //属性
 String name;//成员变量
 int age;
//方法
 public void speak(){
  System.out.println("说话")
 }
//下面的String name中的name是形参(形式参数)
 public void setName(String name){
  name=n;//局部变量
 }
}
```
