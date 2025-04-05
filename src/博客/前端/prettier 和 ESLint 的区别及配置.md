---
title: prettier和ESLint的区别及配置
category: 前端
tags:
  - prettier
  - ESLint
cover: https://cdn.pixabay.com/photo/2021/06/20/17/48/horse-6351668_960_720.jpg
---

![1752865132-5fa8aaadf40c0-fix732](https://i.ibb.co/983Ffq3/1752865132-5fa8aaadf40c0-fix732.png)

> 整洁的代码如同优美的散文。—— Grady Booch

前言： 在繁杂的业务迭代时，接手其他项目，如果没有一个统一的代码风格，阅读起来是相当困难的，毕竟团队里的每个人习惯不一样。团队协作，意味着需要牺牲一些个性，减少一些没必要的争吵。

## 1.Prettier 是什么？

顾名思义 prettier（更漂亮的），让你的代码更漂亮。[官网](https://prettier.io)说的很清楚了

- An opinionated code formatter
- Supports many languages
- Integrates with most editors
- Has few options

很少的配置，意味着强约制，也遵循了第一条 opinionated。[what-is-opinionated-software](https://stackoverflow.com/questions/802050/what-is-opinionated-software)，简单来说就是强约制，给你选择的机会少。这种设计理念用在 代码风格统一 的工具上是极其正确的，目的就是统一，少量的配置，让团队停止争吵。

## 2.ESlint 是什么

> ESLint 是一个开源的 JavaScript 代码检查工具，由 Nicholas C. Zakas 于 2013 年 6 月创建。代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。

ESLint 是一个代码检查工具，它能够被开发者灵活的配置 option，使其能够满足制定好的代码规范的要求。

## tip：前端代码不管 TS 还是 ES，都用 ESLint， TSLint 已经不在维护了

**

## 3.Prettier 和 ESLint 的区别

我开始的时候也认为这两个东西好像有点重复，确实有交集，不过 Prettier 只会做代码风格的统一，并不会检查代码规范，关于代码规范的检查应该交给 ESLint。

ESLint 主要解决的是代码规范，虽然 ESLint 也可以解决一些代码风格问题，但做的不够好， 而 prettier 就是为了 format 而生的工具。

## 总结：ESLint 专注于全方位的 Lint 检查，Prettier 专注于代码格式化相关

**

## 4. 实践

#### 4.1 配置 eslint

```bash
npm i -D eslint
```

```js
//.eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //强制使用单引号
    quotes: ['error', 'single'], // 看这里，是不是和prettier做了重复的事情，可删哦～
    //强制不使用分号结尾
    semi: ['error', 'never'],
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6, // 支持es6
  },
};
```

#### 4.2 配置 prettier

```bash
npm i -D prettier
```

```js
// .prettierrc.js
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 4 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 换行符使用 lf
  endOfLine: 'lf',
};
```

#### 4.3 ESLint 与 Prettier 配合使用

```bash
npm i -D eslint-plugin-prettier
```

```js
//.eslintrc.js
module.exports = {
  rules: {
    'prettier/prettier': 'error', // 标记
  },
  extends: ['plugin:prettier/recommended'], // 插件
};
```

如果是 vue 的项目记得加上, "plugin:vue/essential" 也要安装哦～

`npm i -D eslint-plugin-vue`

eslint-plugin-prettier 插件会调用 prettier 对你的代码风格进行检查，其原理是先使用 prettier 对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被 prettier 进行标记。

## 当执行 ESLint fix 的时候 prettier 的 lint 冲突会被 ESLint 当做错误处理

**

#### 4.4 解决 eslint 和 prettier 的冲突

上文提到，ESLint 与格式化相关的 rule 和 prettier 的 rule 有些重叠，如果想把格式化相关的事情都交给 prettier 去做，使用这个工具可以屏蔽掉 ESLint 与格式化相关的 rule。

安装 eslint-config-prettier 即可

```bash
npm i -D eslint-config-prettier
```

#### 4.5 安装 lint-staged husky

```bash
npm install husky lint-staged
```

```json
// package.json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.{js, css, md}": "eslint --fix"
},
```

#### 4.6 最后 vscode 配置

打开配置文件 setting.json

```json
//setting.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // 保存时自动执行eslint
  }
}
```
