---
title: Java命名规则和规范
category: 后端
tags:
  - Java
cover: https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

字符型:只能是单个字符（'中'）
字符串:有多个字符也可以是单个字符串("中国") （"中"）

==Info.java==

```java
/**
 * Java命名规则
 * 规则1：标识符只能由数字、字母（包括中文）、下划线和美元符号组成
 * 规则2:标识符不能由数字开头
 * 规则3：标识符不能是关键字
 * 规则4：标识符严格区分大小写
 * 规则5：类名最好是不同的
 * 规则6：类名不能有空格
 * 规则6：关键字全部都是小写
 */
/**
 * Java命名规范 
 * 规范1：见名知意 
 * 规范2：遵循驼峰原则 
 * 规范3：类名、接口有特殊要求 类名和接口名首字母大写，后面每个单词的首字母大写
 * 规范4：变量名、方法名有特殊要求 变量名和方法名首字母小写，后面的每个单词的首字母大写 规范5：常量名全部大写且单词与单词之间用“_”下划线进行衔接
 */

// 带有public calss的类名必须要和文件名相同
public class Info {
  public static void main(String[] args) {
    System.out.println("-----------");
    System.out.println("|手机商品列表|");
    System.out.println("-----------");
  }
}

/**
 * InnerInfo 没有public修饰的类名可以不用和文件名相同
 */
class InnerInfo {

}

```
