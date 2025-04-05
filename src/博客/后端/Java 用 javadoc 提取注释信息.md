---
title: Java用javadoc提取注释信息
category: 后端
tags:
  - Java
cover: https://images.unsplash.com/photo-1539952048355-a18b56589b7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

`javadoc -d javaApi Doc.java`

如果.java 文件是 utf-8 格式的话加参数 -encoding utf-8

`javadoc  -encoding utf-8 -d javaApi Doc.java`

或者输出作者和版本信息

`javadoc -encoding utf-8 -d javaApi -author -version Doc.java`

```java
/**
 * javadoc测试类
 * 
 * @author 争逐
 * @version 1.0
 * @since 1.0
 */
public class Doc {
  /**
   * 这是程序的入口
   * 
   * @param args 是main方法的参数
   */
  public static void mian(String[] args) {
    System.out.println("javacdoc输出文档");
  }
}
```
