---
title: 自定义规则
---

除了内置规则外，`markdownlint` 允许通过 [`options.customRules` 属性][options-custom-rules]传递自定义规则数组来增强 linting 体验。自定义规则可以实现内置规则的所有功能，可以内联定义或从其他包导入（在 npm 上使用关键字 `markdownlint-rule`）。当通过文件或包定义时，导出可以是一个规则对象（见下文）或它们的数组。自定义规则可以使用与内置规则相同的语法禁用、启用和自定义。

## 实现简单规则

对于简单的需求，如禁止某些字符或模式，可以使用社区开发的 [markdownlint-rule-search-replace][markdownlint-rule-search-replace] 插件。该插件允许任何人创建一组简单的文本替换规则，而无需编写代码。

[markdownlint-rule-search-replace]: https://www.npmjs.com/package/markdownlint-rule-search-replace

## 编写规则

规则通过名称（或多个名称）、描述、可选的信息链接、一个或多个标签以及实现规则行为的函数来定义。该函数对每个文件/字符串输入调用一次，并接收解析后的输入和一个用于记录任何违规的函数。

自定义规则应（最好）基于 [`micromark`][micromark] `parser` 的结构化令牌集进行操作（这是推荐的方式）。或者，自定义规则可以基于 [`markdown-it`][markdown-it] `parser` 的结构化令牌集进行操作（传统支持）。最后，自定义规则可以直接基于文本使用 `none` `parser` 进行操作。

以下是一个使用 `micromark` 解析器实现的简单规则示例，该规则报告任何使用块引用的违规：

```javascript
/** @type {import("markdownlint").Rule} */
module.exports = {
  names: ['any-blockquote-micromark'],
  description: '报告任何块引用错误的规则',
  information: new URL('https://example.com/rules/any-blockquote'),
  tags: ['test'],
  parser: 'micromark',
  function: (params, onError) => {
    const blockquotes = params.parsers.micromark.tokens
      .filter(token => token.type === 'blockQuote')
    for (const blockquote of blockquotes) {
      const lines = blockquote.endLine - blockquote.startLine + 1
      onError({
        lineNumber: blockquote.startLine,
        detail: `块引用跨越 ${lines} 行。`,
        context: params.lines[blockquote.startLine - 1]
      })
    }
  }
}
```

同样的规则使用 `markdown-it` 解析器实现可能如下：

```javascript
/** @type {import("markdownlint").Rule} */
module.exports = {
  names: ['any-blockquote-markdown-it'],
  description: '报告任何块引用错误的规则',
  information: new URL('https://example.com/rules/any-blockquote'),
  tags: ['test'],
  parser: 'markdownit',
  function: (params, onError) => {
    const blockquotes = params.parsers.markdownit.tokens
      .filter(token => token.type === 'blockquote_open')
    for (const blockquote of blockquotes) {
      const [startIndex, endIndex] = blockquote.map
      const lines = endIndex - startIndex
      onError({
        lineNumber: blockquote.lineNumber,
        detail: `块引用跨越 ${lines} 行。`,
        context: blockquote.line
      })
    }
  }
}
```

规则实现为一个 `Object`：

- `names` 是一个必需的 `String` 值数组，用于在输出消息和配置中标识规则。
- `description` 是一个必需的 `String` 值，描述规则并在输出消息中显示。
- `information` 是一个可选的（绝对）`URL`，指向关于规则的更多信息链接。
- `tags` 是一个必需的 `String` 值数组，用于分组相关规则以便于自定义。
- `parser` 是一个必需的 `String` 值 `"markdownit" | "micromark" | "none"`，指定通过 `params.parsers` 使用的解析器数据（见下文）。
- `asynchronous` 是一个可选的 `Boolean` 值，指示规则是否返回 `Promise` 并异步运行。
- `function` 是一个必需的 `Function`，实现规则并接收两个参数：
  - `params` 是一个 `Object`，包含描述被分析内容的属性：
    - `name` 是一个 `String`，标识输入文件/字符串。
    - `parsers` 是一个 `Object`，其属性对应于规则定义中的 `parser` 值（见上文）。
      - `markdownit` 是一个 `Object`，提供对 [`markdown-it`][markdown-it] 解析器输出的访问。
        - `tokens` 是一个 [`markdown-it` `Token`s][markdown-it-token] 数组，带有添加的 `line` 和 `lineNumber` 属性。（此属性以前在 `params` 对象上。）
      - `micromark` 是一个 `Object`，提供对 [`micromark`][micromark] 解析器输出的访问。
        - `tokens` 是一个 [`MicromarkToken`][micromark-token] 对象数组。
      - 两种 `tokens` 的示例可通过 [测试快照][tokens] 查看。
    - `lines` 是一个 `String` 值数组，对应于输入文件/字符串的行。
    - `frontMatterLines` 是一个 `String` 值数组，对应于任何 front matter（不在 `lines` 中）。
    - `config` 是一个 `Object`，对应于 `options.config` 中的规则条目（如果存在）。
    - `version` 是一个 `String`，对应于 `markdownlint` 的版本。
  - `onError` 是一个函数，接收一个 `Object` 参数，包含一个必需和四个可选属性：
    - `lineNumber` 是一个必需的 `Number`，指定错误的 1-based 行号。
    - `detail` 是一个可选的 `String`，包含关于错误原因的信息。
    - `context` 是一个可选的 `String`，包含错误位置周围的相关文本。
    - `information` 是一个可选的（绝对）`URL`，覆盖规则定义中提供的同名值。（不常见）
    - `range` 是一个可选的 `Array`，包含两个 `Number` 值，标识错误的 1-based 列和长度。
    - `fixInfo` 是一个可选的 `Object`，包含如何修复错误的信息（所有属性都是可选的，但至少应存在 `deleteCount` 或 `insertText`；应用修复时，应先执行删除再执行插入）：
      - `lineNumber` 是一个可选的 `Number`，指定编辑的 1-based 行号。
      - `editColumn` 是一个可选的 `Number`，指定编辑的 1-based 列号。
      - `deleteCount` 是一个可选的 `Number`，指定要删除的字符数（值 `-1` 用于删除整行）。
      - `insertText` 是一个可选的 `String`，指定要插入的文本。`\n` 是跨平台添加换行符的方式；换行符应添加在行首而不是行尾。

内置规则共享的辅助函数集合可在 [markdownlint-rule-helpers 包][rule-helpers] 中使用。

### 异步规则

如果规则需要执行异步操作（如获取网络资源），可以为其 `asynchronous` 属性指定值 `true`。异步规则应从其 `function` 实现返回一个 `Promise`，该 Promise 在规则完成时解析。（传递给 `resolve(...)` 的值被忽略。）异步规则的 linting 违规通过 `onError` 函数报告，与同步规则相同。

**注意**：异步规则不能在同步调用上下文中引用（即 `import { lint } from "markdownlint/sync"`）。尝试这样做会抛出异常。

## 示例

- [项目测试用例使用的简单规则][test-rules]
- [所有 `markdownlint` 内置规则的代码][lib]
- [包含 npm 配置的完整示例规则][extended-ascii]
- [github/docs 仓库中的自定义规则][github-docs]
- [electron/lint-roller 仓库中的自定义规则][electron]
- [webhintio/hint 仓库中的自定义规则][hint]

## 参考

- [CommonMark 文档和规范][commonmark]
- [`markdown-it` Markdown 解析器项目页面][markdown-it]

[commonmark]: https://commonmark.org/
[electron]: https://github.com/electron/lint-roller/tree/main/markdownlint-rules
[extended-ascii]: https://github.com/DavidAnson/markdownlint-rule-extended-ascii
[github-docs]: https://github.com/github/docs/tree/main/src/content-linter/lib/linting-rules
[hint]: https://github.com/webhintio/hint/blob/main/scripts/lint-markdown.js
[lib]: ../lib
[markdown-it]: https://github.com/markdown-it/markdown-it
[markdown-it-token]: https://markdown-it.github.io/markdown-it/#Token
[micromark]: https://github.com/micromark/micromark
[micromark-token]: ../lib/markdownlint.d.mts
[rule-helpers]: https://www.npmjs.com/package/markdownlint-rule-helpers
[options-custom-rules]: ../README.md#optionscustomrules
[test-rules]: ../test/rules
[tokens]: ../test/snapshots/markdownlint-test-custom-rules.mjs.md
