---
title: markdownlint
---

> 一个用于 Markdown/CommonMark 文件的 Node.js 样式检查器和 lint 工具。

[![npm 版本][npm-image]][npm-url]
[![许可证][license-image]][license-url]

## 安装

```bash
npm install markdownlint --save-dev
```

## 概述

[Markdown][markdown] 标记语言设计初衷是易于阅读、编写和理解。它确实做到了这一点，但其灵活性既是优点也是缺点。多种样式可能导致格式不一致；某些结构在所有解析器中表现不佳，应避免使用。

`markdownlint` 是一个针对 [Node.js][nodejs] 的[静态分析][static-analysis]工具，包含一系列规则，用于强制执行 Markdown 文件的标准和一致性。它受到 Mark Harrison 的 Ruby 版 [markdownlint][markdownlint-ruby] 的启发和影响。初始规则、规则文档和测试用例均来自该项目。

`markdownlint` 使用 [`micromark`][micromark] 解析器，并遵循 Markdown 的 [CommonMark][commonmark] 规范。此外，它还支持流行的 [GitHub Flavored Markdown (GFM)][gfm] 语法（如自动链接和表格），以及指令、脚注和数学语法——这些功能均由 [`micromark` 扩展][micromark-extensions]实现。

[commonmark]: https://commonmark.org/
[gfm]: https://github.github.com/gfm/
[markdown]: https://en.wikipedia.org/wiki/Markdown
[markdownlint-ruby]: https://github.com/markdownlint/markdownlint
[micromark]: https://github.com/micromark/micromark
[micromark-extensions]: https://github.com/micromark/micromark?tab=readme-ov-file#list-of-extensions
[nodejs]: https://nodejs.org/
[static-analysis]: https://en.wikipedia.org/wiki/Static_program_analysis

### 相关工具

- CLI
  - [markdownlint-cli][markdownlint-cli] Node.js 命令行工具（[支持 pre-commit][markdownlint-cli-precommit]）
  - [markdownlint-cli2][markdownlint-cli2] Node.js 命令行工具（[支持 pre-commit][markdownlint-cli2-precommit]）
- GitHub
  - [markdownlint-cli2 的 GitHub Action][markdownlint-cli2-action]
  - [GitHub Super-Linter Action][super-linter]
  - [markdownlint-cli 的 GitHub Actions 问题匹配器][markdownlint-problem-matcher]
- 编辑器
  - [VS Code 的 vscode-markdownlint 扩展][vscode-markdownlint]
  - [Sublime Text 的 SublimeLinter 插件][sublimelinter]
  - [Vim/Neovim 的 coc-markdownlint 扩展][coc]
- 工具链
  - [ESLint 分析器的 eslint-plugin-markdownlint 插件][eslint-plugin]
  - [Grunt 任务运行器的 grunt-markdownlint 插件][grunt-markdownlint]
  - [Cake 构建自动化系统的 Cake.Markdownlint 插件][cake]
  - [MSBuild (.NET 构建) 的 Lombiq Node.js 扩展][nodejs-extensions]
- Ruby
  - [Ruby 的 markdownlint/mdl gem][rubygems-mdl]

[cake]: https://github.com/cake-contrib/Cake.Markdownlint
[coc]: https://github.com/fannheyward/coc-markdownlint
[eslint-plugin]: https://github.com/paweldrozd/eslint-plugin-markdownlint
[grunt-markdownlint]: https://github.com/sagiegurari/grunt-markdownlint
[markdownlint-cli]: https://github.com/igorshubovych/markdownlint-cli
[markdownlint-cli-precommit]: https://github.com/igorshubovych/markdownlint-cli#use-with-pre-commit
[markdownlint-cli2]: https://github.com/DavidAnson/markdownlint-cli2
[markdownlint-cli2-action]: https://github.com/marketplace/actions/markdownlint-cli2-action
[markdownlint-cli2-precommit]: https://github.com/DavidAnson/markdownlint-cli2#pre-commit
[markdownlint-problem-matcher]: https://github.com/xt0rted/markdownlint-problem-matcher
[nodejs-extensions]: https://github.com/Lombiq/NodeJs-Extensions
[rubygems-mdl]: https://rubygems.org/gems/mdl
[sublimelinter]: https://github.com/jonlabelle/SublimeLinter-contrib-markdownlint
[super-linter]: https://github.com/super-linter/super-linter
[vscode-markdownlint]: https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint

### 参考规范

以下规范在歧义情况下被视为权威：

- [CommonMark](https://spec.commonmark.org/current/)
- [GitHub Flavored Markdown 规范](https://github.github.com/gfm/)

## 演示

[`markdownlint` 演示](https://dlaa.me/markdownlint/)，一个交互式的浏览器学习与探索工具。

## 规则 / 别名

<!-- markdownlint-disable line-length -->

- **[MD001](doc/md001.md)** *heading-increment* - 标题级别应逐级递增
- **[MD003](doc/md003.md)** *heading-style* - 标题样式
- **[MD004](doc/md004.md)** *ul-style* - 无序列表样式
- **[MD005](doc/md005.md)** *list-indent* - 同级列表项缩进不一致
- **[MD007](doc/md007.md)** *ul-indent* - 无序列表缩进
- **[MD009](doc/md009.md)** *no-trailing-spaces* - 行尾空格
- **[MD010](doc/md010.md)** *no-hard-tabs* - 硬制表符
- **[MD011](doc/md011.md)** *no-reversed-links* - 反向链接语法
- **[MD012](doc/md012.md)** *no-multiple-blanks* - 多个连续空行
- **[MD013](doc/md013.md)** *line-length* - 行长度
- **[MD014](doc/md014.md)** *commands-show-output* - 命令前使用美元符号但未显示输出
- **[MD018](doc/md018.md)** *no-missing-space-atx* - ATX 风格标题的井号后缺少空格
- **[MD019](doc/md019.md)** *no-multiple-space-atx* - ATX 风格标题的井号后多个空格
- **[MD020](doc/md020.md)** *no-missing-space-closed-atx* - 闭合 ATX 风格标题的井号内缺少空格
- **[MD021](doc/md021.md)** *no-multiple-space-closed-atx* - 闭合 ATX 风格标题的井号内多个空格
- **[MD022](doc/md022.md)** *blanks-around-headings* - 标题周围应有空行
- **[MD023](doc/md023.md)** *heading-start-left* - 标题必须从行首开始
- **[MD024](doc/md024.md)** *no-duplicate-heading* - 多个标题内容重复
- **[MD025](doc/md025.md)** *single-title/single-h1* - 同一文档中多个顶级标题
- **[MD026](doc/md026.md)** *no-trailing-punctuation* - 标题末尾标点符号
- **[MD027](doc/md027.md)** *no-multiple-space-blockquote* - 块引用符号后多个空格
- **[MD028](doc/md028.md)** *no-blanks-blockquote* - 块引用内空行
- **[MD029](doc/md029.md)** *ol-prefix* - 有序列表项前缀
- **[MD030](doc/md030.md)** *list-marker-space* - 列表标记后空格
- **[MD031](doc/md031.md)** *blanks-around-fences* - 围栏代码块周围应有空行
- **[MD032](doc/md032.md)** *blanks-around-lists* - 列表周围应有空行
- **[MD033](doc/md033.md)** *no-inline-html* - 内联 HTML
- **[MD034](doc/md034.md)** *no-bare-urls* - 使用裸 URL
- **[MD035](doc/md035.md)** *hr-style* - 水平线样式
- **[MD036](doc/md036.md)** *no-emphasis-as-heading* - 使用强调代替标题
- **[MD037](doc/md037.md)** *no-space-in-emphasis* - 强调标记内空格
- **[MD038](doc/md038.md)** *no-space-in-code* - 代码跨度元素内空格
- **[MD039](doc/md039.md)** *no-space-in-links* - 链接文本内空格
- **[MD040](doc/md040.md)** *fenced-code-language* - 围栏代码块应指定语言
- **[MD041](doc/md041.md)** *first-line-heading/first-line-h1* - 文件首行应为顶级标题
- **[MD042](doc/md042.md)** *no-empty-links* - 空链接
- **[MD043](doc/md043.md)** *required-headings* - 必需的标题结构
- **[MD044](doc/md044.md)** *proper-names* - 专有名词应正确大写
- **[MD045](doc/md045.md)** *no-alt-text* - 图片应包含替代文本（alt text）
- **[MD046](doc/md046.md)** *code-block-style* - 代码块样式
- **[MD047](doc/md047.md)** *single-trailing-newline* - 文件应以单个换行符结尾
- **[MD048](doc/md048.md)** *code-fence-style* - 围栏代码样式
- **[MD049](doc/md049.md)** *emphasis-style* - 强调样式
- **[MD050](doc/md050.md)** *strong-style* - 粗体样式
- **[MD051](doc/md051.md)** *link-fragments* - 链接片段应有效
- **[MD052](doc/md052.md)** *reference-links-images* - 引用链接和图片应使用已定义的标签
- **[MD053](doc/md053.md)** *link-image-reference-definitions* - 链接和图片引用定义应被需要
- **[MD054](doc/md054.md)** *link-image-style* - 链接和图片样式
- **[MD055](doc/md055.md)** *table-pipe-style* - 表格管道样式
- **[MD056](doc/md056.md)** *table-column-count* - 表格列数
- **[MD058](doc/md058.md)** *blanks-around-tables* - 表格周围应有空行

<!-- markdownlint-restore -->

更多细节请参见 [Rules.md](doc/Rules.md)。

### 自定义规则

除了内置规则，还可以使用自定义规则以满足项目特定需求。要查找社区开发的规则，请在 npm 上使用关键字 `markdownlint-rule`。要自行实现规则，请参考 [CustomRules.md](doc/CustomRules.md)。

## 标签

标签用于分组相关规则，可以一次性启用/禁用多个规则。

- **`accessibility`** - `MD045`
- **`atx`** - `MD018`, `MD019`
- **`atx_closed`** - `MD020`, `MD021`
- **`blank_lines`** - `MD012`, `MD022`, `MD031`, `MD032`, `MD047`
- **`blockquote`** - `MD027`, `MD028`
- **`bullet`** - `MD004`, `MD005`, `MD007`, `MD032`
- **`code`** - `MD014`, `MD031`, `MD038`, `MD040`, `MD046`, `MD048`
- **`emphasis`** - `MD036`, `MD037`, `MD049`, `MD050`
- **`hard_tab`** - `MD010`
- **`headings`** - `MD001`, `MD003`, `MD018`, `MD019`, `MD020`, `MD021`,
  `MD022`, `MD023`, `MD024`, `MD025`, `MD026`, `MD036`, `MD041`, `MD043`
- **`hr`** - `MD035`
- **`html`** - `MD033`
- **`images`** - `MD045`, `MD052`, `MD053`, `MD054`
- **`indentation`** - `MD005`, `MD007`, `MD027`
- **`language`** - `MD040`
- **`line_length`** - `MD013`
- **`links`** - `MD011`, `MD034`, `MD039`, `MD042`, `MD051`, `MD052`, `MD053`,
  `MD054`
- **`ol`** - `MD029`, `MD030`, `MD032`
- **`spaces`** - `MD018`, `MD019`, `MD020`, `MD021`, `MD023`
- **`spelling`** - `MD044`
- **`table`** - `MD055`, `MD056`, `MD058`
- **`ul`** - `MD004`, `MD005`, `MD007`, `MD030`, `MD032`
- **`url`** - `MD034`
- **`whitespace`** - `MD009`, `MD010`, `MD012`, `MD027`, `MD028`, `MD030`,
  `MD037`, `MD038`, `MD039`

## 配置

传递给 `markdownlint` 的文本会被解析为 Markdown，分析后报告任何问题。大多数规则会忽略以下两种文本：

- [HTML 注释](https://www.w3.org/TR/html5/syntax.html#comments)
- [Front matter](https://jekyllrb.com/docs/frontmatter/)（见 `options.frontMatter`）

可以通过 `options.config`（如下所述）启用、禁用和配置规则，以定义一组输入的预期行为。要在文件中的特定位置启用或禁用规则，请在适当位置添加以下标记之一（HTML 注释不会出现在最终标记中）：

- 禁用所有规则：`<!-- markdownlint-disable -->`
- 启用所有规则：`<!-- markdownlint-enable -->`
- 禁用当前行的所有规则：`<!-- markdownlint-disable-line -->`
- 禁用下一行的所有规则：`<!-- markdownlint-disable-next-line -->`
- 按名称禁用一个或多个规则：`<!-- markdownlint-disable MD001 MD005 -->`
- 按名称启用一个或多个规则：`<!-- markdownlint-enable MD001 MD005 -->`
- 按名称禁用当前行的一个或多个规则：`<!-- markdownlint-disable-line MD001 MD005 -->`
- 按名称禁用下一行的一个或多个规则：`<!-- markdownlint-disable-next-line MD001 MD005 -->`
- 捕获当前规则配置：`<!-- markdownlint-capture -->`
- 恢复捕获的规则配置：`<!-- markdownlint-restore -->`

例如：

```markdown
<!-- markdownlint-disable-next-line no-space-in-emphasis -->
space * in * emphasis
```

或：

```markdown
space * in * emphasis <!-- markdownlint-disable-line no-space-in-emphasis -->
```

或：

```markdown
<!-- markdownlint-disable no-space-in-emphasis -->
space * in * emphasis
<!-- markdownlint-enable no-space-in-emphasis -->
```

要临时禁用规则，然后恢复之前的配置：

```markdown
<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
any violations you want
<!-- markdownlint-restore -->
```

默认情况下会捕获初始配置（如同每个文档都以 `<!-- markdownlint-capture -->` 开头），因此上述模式可以简化为：

```markdown
<!-- markdownlint-disable -->
any violations you want
<!-- markdownlint-restore -->
```

更改从注释所在的行开始生效，因此以下代码无效：

```markdown
space * in * emphasis <!-- markdownlint-disable --> <!-- markdownlint-enable -->
```

要应用于整个文件，无论注释位于何处，支持以下语法：

- 禁用所有规则：`<!-- markdownlint-disable-file -->`
- 启用所有规则：`<!-- markdownlint-enable-file -->`
- 按名称禁用一个或多个规则：`<!-- markdownlint-disable-file MD001 -->`
- 按名称启用一个或多个规则：`<!-- markdownlint-enable-file MD001 -->`

这可用于将 `markdownlint` 注释“隐藏”在文件底部。

如果需要为一个文件更改一个或多个规则的配置，支持以下更高级的语法：

- 配置：`<!-- markdownlint-configure-file { options.config JSON } -->`

例如：

```markdown
<!-- markdownlint-configure-file { "hr-style": { "style": "---" } } -->
```

或：

```markdown
<!-- markdownlint-configure-file
{
  "hr-style": {
    "style": "---"
  },
  "no-trailing-spaces": false
}
-->
```

这些更改应用于整个文件，无论注释位于何处。如果存在多个此类注释，则按从上到下的顺序应用。默认情况下，`markdownlint-configure-file` 的内容假定为 JSON，但可以使用 [`options.configParsers`](#optionsconfigparsers) 支持其他格式。

## API

### Linting

异步 API 通过 `import { lint } from "markdownlint/async"`：

```javascript
/**
 * 检查指定的 Markdown 文件。
 *
 * @param {Options | null} options 配置选项。
 * @param {LintCallback} callback 回调函数 (err, result)。
 * @returns {void}
 */
function lint(options, callback) { ... }
```

同步 API 通过 `import { lint } from "markdownlint/sync"`：

```javascript
/**
 * 检查指定的 Markdown 文件。
 *
 * @param {Options | null} options 配置选项。
 * @returns {LintResults} 结果对象。
 */
function lint(options) { ... }
```

Promise API 通过 `import { lint } from "markdownlint/promise"`：

```javascript
/**
 * 检查指定的 Markdown 文件。
 *
 * @param {Options | null} options 配置选项。
 * @returns {Promise<LintResults>} 结果对象。
 */
function lint(options) { ... }
```

#### options

类型：`Object`

配置函数。所有属性都是可选的，但至少应设置 `files` 或 `strings` 之一以提供输入。

##### options.config

类型：`Object` 映射 `String` 到 `Boolean | Object`

配置要使用的规则。

对象键是规则名称/别名；对象值是规则的配置。值 `false` 禁用规则，`true` 启用其默认配置，传递对象值则自定义该规则。将特殊 `default` 规则设置为 `true` 或 `false` 会默认包含/排除所有规则。在没有配置对象的情况下，所有规则均启用。启用或禁用标签名称（如 `whitespace`）会影响所有具有该标签的规则。

`default` 规则首先应用，然后键从上到下处理，后面的值覆盖前面的值。键（包括规则名称、别名、标签和 `default`）不区分大小写。

示例：

```json
{
  "default": true,
  "MD003": { "style": "atx_closed" },
  "MD007": { "indent": 4 },
  "no-hard-tabs": false,
  "whitespace": false
}
```

参见 [.markdownlint.jsonc](schema/.markdownlint.jsonc) 和/或 [.markdownlint.yaml](schema/.markdownlint.yaml) 查看所有属性设置为默认值的示例配置对象。

规则集（称为“样式”）可以单独存储并作为 [JSON](https://en.wikipedia.org/wiki/JSON) 加载。

从 JavaScript 引用内置样式的示例：

```javascript
const options = {
  files: ['...'],
  config: require('style/relaxed.json')
}
```

通过 `.markdownlint.json` 中的 `extends` 实现相同功能的示例（更多信息见下文）：

```json
{
  "extends": "markdownlint/style/relaxed"
}
```

更多示例请参见 [style](style) 目录。

参见 [markdownlint-config-schema.json](schema/markdownlint-config-schema.json) 了解 `options.config` 对象的 [JSON Schema](https://json-schema.org/)。

参见 [ValidatingConfiguration.md](schema/ValidatingConfiguration.md) 了解如何使用 JSON Schema 验证配置。

对于更高级的场景，样式可以引用和扩展其他样式。可以使用 `readConfig` 和 `readConfigSync` 函数读取此类样式。

例如，假设有一个 `base.json` 配置文件：

```json
{
  "default": true
}
```

和一个 `custom.json` 配置文件：

```json
{
  "extends": "base.json",
  "line-length": false
}
```

然后执行以下代码：

```javascript
const options = {
  config: markdownlint.readConfigSync('./custom.json')
}
```

将合并 `custom.json` 和 `base.json`，等效于：

```javascript
const options = {
  config: {
    'default': true,
    'line-length': false
  }
}
```

##### options.configParsers

类型：*可选* `Array` of `Function` 接受 (`String`) 并返回 `Object`

解析 `markdownlint-configure-file` 块内容的函数数组。

如 [配置](#configuration) 部分所示，内联注释可用于自定义文档的 [配置对象](#optionsconfig)。默认使用内置的 `JSON.parse`，但可以指定自定义解析器。内容会传递给每个解析器函数，直到其中一个返回值（而不是抛出异常）。因此，严格的解析器应排在灵活的解析器之前。

例如：

```javascript
[JSON.parse, require('toml').parse, require('js-yaml').load]
```

##### options.customRules

类型：`Array` of `Object`

与默认规则集一起包含的自定义规则列表。

每个数组元素应定义一个规则。规则通常由其他包导出，但也可以本地定义。

示例：

```javascript
const extraRules = require('extraRules')
const options = {
  customRules: [extraRules.one, extraRules.two]
}
```

参见 [CustomRules.md](doc/CustomRules.md) 了解如何编写自定义规则。

##### options.files

类型：`Array` of `String`

要检查的文件列表。

每个数组元素应为单个文件（通过相对或绝对路径）；[通配符](https://en.wikipedia.org/wiki/Glob_%28programming%29) 由调用者负责。

示例：`[ "one.md", "dir/two.md" ]`

##### options.frontMatter

类型：`RegExp`

匹配文件开头找到的任何 [front matter](https://jekyllrb.com/docs/frontmatter/)。

某些 Markdown 内容以元数据开头；此选项的默认 `RegExp` 忽略常见的“front matter”形式。要匹配不同的模式，请指定自定义 `RegExp` 或使用值 `null` 禁用此功能。

默认值：

```javascript
/((^---[^\S\r\n\u2028\u2029]*$[\s\S]+?^---\s*)|(^\+\+\+[^\S\r\n\u2028\u2029]*$[\s\S]+?^(\+\+\+|\.\.\.)\s*)|(^\{[^\S\r\n\u2028\u2029]*$[\s\S]+?^\}\s*))(\r\n|\r|\n|$)/m
```

忽略 [YAML](https://en.wikipedia.org/wiki/YAML)、[TOML](https://en.wikipedia.org/wiki/TOML) 和 [JSON](https://en.wikipedia.org/wiki/JSON) front matter，例如：

```text
---
layout: post
title: Title
---
```

注意：匹配必须从文件开头开始。

##### options.fs

类型：`Object` 实现 [文件系统 API][node-fs-api]

在高级场景中，可能需要绕过默认的文件系统 API。如果提供了自定义文件系统实现，`markdownlint` 将使用该实现而不是 `node:fs`。

注意：唯一调用的方法是 `readFile` 和 `readFileSync`。

[node-fs-api]: https://nodejs.org/api/fs.html

##### options.handleRuleFailures

类型：`Boolean`

捕获规则处理期间抛出的异常，并将问题报告为规则违规。

默认情况下，规则（或库本身）抛出的异常不会被处理，会以常规方式向上冒泡到调用者。通过将 `handleRuleFailures` 设置为 `true`，失败规则抛出的异常将由库处理，并将异常消息记录为规则违规。此设置在存在（自定义）规则遇到意外语法并失败时非常有用。启用此选项后，linting 过程可以继续并报告发现的任何违规。

##### options.markdownItPlugins

类型：`Array` of `Array` of `Function` 和插件参数

指定解析输入时要使用的其他 [`markdown-it` 插件][markdown-it-plugin]。插件可用于支持高级场景的额外语法和功能。*已弃用。*

[markdown-it-plugin]: https://www.npmjs.com/search?q=keywords:markdown-it-plugin

每个顶层 `Array` 的项应为以下形式：

```javascript
[ require("markdown-it-plugin"), plugin_param_0, plugin_param_1, ... ]
```

> 注意，`markdown-it` 插件仅在调用 `markdown-it` 解析器时调用。内置规则均不使用 `markdown-it` 解析器，因此 `markdown-it` 插件仅在存在一个或多个使用 `markdown-it` 解析器的 [自定义规则][custom-rules] 时调用。

[custom-rules]: #custom-rules

##### options.noInlineConfig

类型：`Boolean`

禁用使用 HTML 注释（如 `<!-- markdownlint-enable -->`）在 Markdown 内容正文中切换规则。

默认情况下，格式正确的内联注释可用于为文档的某些部分创建例外。将 `noInlineConfig` 设置为 `true` 会忽略所有此类注释。

##### options.resultVersion

类型：`Number`

指定返回的 `result` 对象的版本（参见下面的“用法”部分以获取示例）。

传递 `resultVersion` 为 `0` 对应于原始的简单格式，其中每个错误由规则名称和行号标识。*已弃用*

传递 `resultVersion` 为 `1` 对应于详细格式，其中每个错误包括行号、规则名称、别名、描述以及任何可用的其他详细信息或上下文。*已弃用*

传递 `resultVersion` 为 `2` 对应于详细格式，其中每个错误包括行号、规则名称、描述以及任何可用的其他详细信息或上下文。*已弃用*

传递 `resultVersion` 为 `3` 对应于详细版本 `2` 格式，并包含有关如何自动修复可自动修复的错误的信息。在此模式下，报告每行发生的所有错误（其他版本仅报告每个规则的第一个错误）。这是默认行为。

##### options.strings

类型：`Object` 映射 `String` 到 `String`

用于检查的标识符到字符串的映射。

当 Markdown 内容不可用为文件时，可以将其作为字符串传递。`strings` 对象的键用于在 `result` 摘要中标识每个输入值。

示例：

```json
{
  "readme": "# README\n...",
  "changelog": "# CHANGELOG\n..."
}
```

#### callback

类型：`Function` 接受 (`Error`, `Object`)

标准完成回调。

#### result

类型：`Object`

调用 `result.toString()` 以方便使用，或参见下面的 `result` 对象结构示例。将 `true` 传递给 `toString()` 会使用规则别名（如 `no-hard-tabs`）而不是名称（如 `MD010`）。

### Config

`options.config` 配置对象简单，可以存储在文件中以提高可读性和易于重用。`readConfig` 和 `readConfigSync` 函数加载配置设置，并支持 `extends` 关键字引用其他文件（见上文）。

默认情况下，配置文件解析为 JSON（并命名为 `.markdownlint.json`）。可以提供自定义解析器来处理其他格式，如 JSONC、YAML 和 TOML。

异步 API 通过 `import { readConfig } from "markdownlint/async"`：

```javascript
/**
 * 读取指定的配置文件。
 *
 * @param {string} file 配置文件名。
 * @param {ConfigurationParser[] | ReadConfigCallback} [parsers] 解析函数。
 * @param {Object} [fs] 文件系统实现。
 * @param {ReadConfigCallback} [callback] 回调函数 (err, result)。
 * @returns {void}
 */
function readConfig(file, parsers, fs, callback) { ... }
```

同步 API 通过 `import { readConfig } from "markdownlint/sync"`：

```javascript
/**
 * 读取指定的配置文件。
 *
 * @param {string} file 配置文件名。
 * @param {ConfigurationParser[]} [parsers] 解析函数。
 * @param {Object} [fs] 文件系统实现。
 * @returns {Configuration} 配置对象。
 */
function readConfig(file, parsers, fs) { ... }
```

Promise API 通过 `import { readConfig } from "markdownlint/promise"`：

```javascript
/**
 * 读取指定的配置文件。
 *
 * @param {string} file 配置文件名。
 * @param {ConfigurationParser[]} [parsers] 解析函数。
 * @param {Object} [fs] 文件系统实现。
 * @returns {Promise<Configuration>} 配置对象。
 */
function readConfig(file, parsers, fs) { ... }
```

#### file

类型：`String`

要读取的配置文件位置。

`file` 相对于当前工作目录解析。如果读取后存在 `extends` 键，其值将作为相对于 `file` 的路径解析并递归加载。由 `extends` 引用的文件的设置首先应用，然后 `file` 的设置在其基础上应用（覆盖引用文件中出现的相同键）。如果 `file` 或 `extends` 路径以 `~` 目录开头，它将作为主目录的占位符。

#### parsers

类型：*可选* `Array` of `Function` 接受 (`String`) 并返回 `Object`

解析配置文件的函数数组。

配置文件的内容传递给每个解析器函数，直到其中一个返回值（而不是抛出异常）。因此，严格的解析器应排在灵活的解析器之前。

例如：

```javascript
[JSON.parse, require('toml').parse, require('js-yaml').load]
```

#### fs

类型：*可选* `Object` 实现 [文件系统 API][file-system-api]

[file-system-api]: https://nodejs.org/api/fs.html

在高级场景中，可能需要绕过默认的文件系统 API。如果提供了自定义文件系统实现，`markdownlint` 将使用该实现而不是调用 `node:fs`。

注意：唯一调用的方法是 `readFile`、`readFileSync`、`access` 和 `accessSync`。

#### callback

类型：`Function` 接受 (`Error`, `Object`)

标准完成回调。

#### result

类型：`Object`

配置对象。

### Fixing

可以自动修复的规则包括一个 `fixInfo` 属性，该属性在 [自定义规则文档](doc/CustomRules.md#authoring) 中概述。要一致地应用修复，可以使用 `applyFix`/`applyFixes` 方法，通过 `import { applyFix, applyFixes } from "markdownlint"`：

```javascript
/**
 * 将指定的修复应用于 Markdown 内容行。
 *
 * @param {string} line Markdown 内容行。
 * @param {RuleOnErrorFixInfo} fixInfo RuleOnErrorFixInfo 实例。
 * @param {string} [lineEnding] 使用的行尾符号。
 * @returns {string | null} 修复后的内容或 null（如果删除）。
 */
function applyFix(line, fixInfo, lineEnding = "\n") { ... }

/**
 * 尽可能将指定的修复应用于 Markdown 内容。
 *
 * @param {string} input Markdown 内容行。
 * @param {RuleOnErrorInfo[]} errors RuleOnErrorInfo 实例。
 * @returns {string} 修复后的内容。
 */
function applyFixes(input, errors) { ... }
```

使用 lint 调用的结果调用 `applyFixes` 可以如下所示：

```javascript
import { applyFixes } from 'markdownlint'
import { lint as lintSync } from 'markdownlint/sync'

const results = lintSync({ strings: { content: original } })
const fixed = applyFixes(original, results.content)
```

### 其他功能

要获取库的 [语义版本][semver]，可以使用 `getVersion` 方法：

```javascript
/**
 * 获取库的（语义）版本。
 *
 * @returns {string} SemVer 字符串。
 */
function getVersion() { ... }
```

调用 `getVersion` 很简单：

```javascript
import { getVersion } from 'markdownlint'

// 显示库版本
console.log(getVersion())
```

[semver]: https://semver.org

## 用法

调用 `lint` 并使用 `result` 对象的 `toString` 方法：

```javascript
import { lint as lintAsync } from 'markdownlint/async'

const options = {
  files: ['good.md', 'bad.md'],
  strings: {
    'good.string': '# good.string\n\nThis string passes all rules.',
    'bad.string': '#bad.string\n\n#This string fails\tsome rules.'
  }
}

lintAsync(options, (error, results) => {
  if (!error && results) {
    console.log(results.toString())
  }
})
```

输出：

```text
bad.string: 3: MD010/no-hard-tabs 硬制表符 [列: 19]
bad.string: 1: MD018/no-missing-space-atx ATX 风格标题的井号后缺少空格 [上下文: "#bad.string"]
bad.string: 3: MD018/no-missing-space-atx ATX 风格标题的井号后缺少空格 [上下文: "#This string fails        some rules."]
bad.string: 1: MD041/first-line-heading/first-line-h1 文件首行应为顶级标题 [上下文: "#bad.string"]
bad.md: 3: MD010/no-hard-tabs 硬制表符 [列: 17]
bad.md: 1: MD018/no-missing-space-atx ATX 风格标题的井号后缺少空格 [上下文: "#bad.md"]
bad.md: 3: MD018/no-missing-space-atx ATX 风格标题的井号后缺少空格 [上下文: "#This file fails      some rules."]
bad.md: 1: MD041/first-line-heading/first-line-h1 文件首行应为顶级标题 [上下文: "#bad.md"]
```

或作为同步调用：

```javascript
import { lint as lintSync } from 'markdownlint/sync'

const results = lintSync(options)
console.log(results.toString())
```

要通过基于 `Promise` 的调用直接检查 `result` 对象：

```javascript
import { lint as lintPromise } from 'markdownlint/promise'

const results = await lintPromise(options)
console.dir(results, { colors: true, depth: null })
```

输出：

```json
{
  "good.md": [],
  "bad.md": [
    {
      "lineNumber": 3,
      "ruleNames": ["MD010", "no-hard-tabs"],
      "ruleDescription": "硬制表符",
      "ruleInformation": "https://github.com/DavidAnson/markdownlint/blob/v0.0.0/doc/md010.md",
      "errorDetail": "列: 17",
      "errorContext": null,
      "errorRange": [17, 1]
    },
    {
      "lineNumber": 1,
      "ruleNames": ["MD018", "no-missing-space-atx"],
      "ruleDescription": "ATX 风格标题的井号后缺少空格",
      "ruleInformation": "https://github.com/DavidAnson/markdownlint/blob/v0.0.0/doc/md018.md",
      "errorDetail": null,
      "errorContext": "#bad.md",
      "errorRange": [1, 2]
    },
    {
      "lineNumber": 3,
      "ruleNames": ["MD018", "no-missing-space-atx"],
      "ruleDescription": "ATX 风格标题的井号后缺少空格",
      "ruleInformation": "https://github.com/DavidAnson/markdownlint/blob/v0.0.0/doc/md018.md",
      "errorDetail": null,
      "errorContext": "#This file fails\tsome rules.",
      "errorRange": [1, 2]
    },
    {
      "lineNumber": 1,
      "ruleNames": ["MD041", "first-line-heading", "first-line-h1"],
      "ruleDescription": "文件首行应为顶级标题",
      "ruleInformation": "https://github.com/DavidAnson/markdownlint/blob/v0.0.0/doc/md041.md",
      "errorDetail": null,
      "errorContext": "#bad.md",
      "errorRange": null
    }
  ]
}
```

与 [gulp](https://gulpjs.com/) 构建系统的集成很简单：[`gulpfile.cjs`](example/gulpfile.cjs)。

与 [Grunt](https://gruntjs.com/) 构建系统的集成类似：[`Gruntfile.cjs`](example/Gruntfile.cjs)。

## 浏览器

`markdownlint` 也可以在浏览器中工作。

生成普通和压缩脚本：

```bash
npm run build-demo
```

然后引用 `markdownlint-browser` 脚本：

```html
<script src="demo/markdownlint-browser.min.js"></script>
```

并按如下方式调用：

```javascript
const options = {
  strings: {
    content: 'Some Markdown to lint.'
  }
}

const results = globalThis.markdownlint.lintSync(options).toString()
```

## 示例

有关如何将 `markdownlint` 集成到工作流中的想法，请参考以下项目或 [相关工具](#related) 中的某个工具：

- [.NET 文档][dot-net-doc] ([搜索仓库][dot-net-doc-search])
- [ally.js][ally-js] ([搜索仓库][ally-js-search])
- [Apache Airflow][airflow] ([搜索仓库][airflow-search])
- [Boostnote][boostnote] ([搜索仓库][boostnote-search])
- [CodiMD][codimd] ([搜索仓库][codimd-search])
- [Electron][electron] ([搜索仓库][electron-search])
- [ESLint][eslint] ([搜索仓库][eslint-search])
- [Garden React 组件][garden] ([搜索仓库][garden-search])
- [MDN Web 文档][mdn] ([搜索仓库][mdn-search])
- [MkDocs][mkdocs] ([搜索仓库][mkdocs-search])
- [Mocha][mocha] ([搜索仓库][mocha-search])
- [Pi-hole 文档][pi-hole] ([搜索仓库][pi-hole-search])
- [Reactable][reactable] ([搜索仓库][reactable-search])
- [V8][v8] ([搜索仓库][v8-search])
- [webhint][webhint] ([搜索仓库][webhint-search])
- [webpack][webpack] ([搜索仓库][webpack-search])
- [WordPress][wordpress] ([搜索仓库][wordpress-search])

更高级的集成场景：

- [GitHub 文档内容 linter][content-linter]
- [GitHub 的 `markdownlint-github` 仓库][markdownlint-github]

[ally-js]: https://allyjs.io/
[ally-js-search]: https://github.com/medialize/ally.js/search?q=markdownlint
[airflow]: https://airflow.apache.org
[airflow-search]: https://github.com/apache/airflow/search?q=markdownlint
[boostnote]: https://boostnote.io/
[boostnote-search]: https://github.com/BoostIO/Boostnote/search?q=markdownlint
[codimd]: https://github.com/hackmdio/codimd
[codimd-search]: https://github.com/hackmdio/codimd/search?q=markdownlint
[content-linter]: https://docs.github.com/en/contributing/collaborating-on-github-docs/using-the-content-linter
[dot-net-doc]: https://docs.microsoft.com/en-us/dotnet/
[dot-net-doc-search]: https://github.com/dotnet/docs/search?q=markdownlint
[electron]: https://www.electronjs.org
[electron-search]: https://github.com/electron/electron/search?q=markdownlint
[eslint]: https://eslint.org/
[eslint-search]: https://github.com/eslint/eslint/search?q=markdownlint
[garden]: https://zendeskgarden.github.io/react-components/
[garden-search]: https://github.com/zendeskgarden/react-components/search?q=markdownlint
[markdownlint-github]: https://github.com/github/markdownlint-github
[mdn]: https://developer.mozilla.org/
[mdn-search]: https://github.com/mdn/content/search?q=markdownlint
[mkdocs]: https://www.mkdocs.org/
[mkdocs-search]: https://github.com/mkdocs/mkdocs/search?q=markdownlint
[mocha]: https://mochajs.org/
[mocha-search]: https://github.com/mochajs/mocha/search?q=markdownlint
[pi-hole]: https://docs.pi-hole.net
[pi-hole-search]: https://github.com/pi-hole/docs/search?q=markdownlint
[reactable]: https://glittershark.github.io/reactable/
[reactable-search]: https://github.com/glittershark/reactable/search?q=markdownlint
[v8]: https://v8.dev/
[v8-search]: https://github.com/v8/v8.dev/search?q=markdownlint
[webhint]: https://webhint.io/
[webhint-search]: https://github.com/webhintio/hint/search?q=markdownlint
[webpack]: https://webpack.js.org/
[webpack-search]: https://github.com/webpack/webpack.js.org/search?q=markdownlint
[wordpress]: https://wordpress.org/gutenberg/
[wordpress-search]: https://github.com/WordPress/gutenberg/search?q=markdownlint

## 贡献

更多信息请参见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 发布

更多信息请参见 [ReleaseProcess.md](doc/ReleaseProcess.md)。

## 历史

参见 [CHANGELOG.md](CHANGELOG.md)。

[npm-image]: https://img.shields.io/npm/v/markdownlint.svg
[npm-url]: https://www.npmjs.com/package/markdownlint
[license-image]: https://img.shields.io/npm/l/markdownlint.svg
[license-url]: https://opensource.org/licenses/MIT
