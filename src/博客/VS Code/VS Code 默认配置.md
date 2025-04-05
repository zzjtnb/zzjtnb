---
title: vscode默认配置
category: VS Code
tags:
  - VS Code
cover: https://code.visualstudio.com/assets/home/home-screenshot-win-lg.png
---

```json
{
  // 控制是否在编辑器中显示 CodeLens。
  "diffEditor.codeLens": false,
  // 启用后，差异编辑器将忽略前导空格或尾随空格中的更改。
  "diffEditor.ignoreTrimWhitespace": true,
  // 超时(以毫秒为单位)，之后将取消差异计算。使用0表示没有超时。
  "diffEditor.maxComputationTime": 5000,
  // 要为其计算差异的最大文件大小(MB)。使用 0 表示无限制。
  "diffEditor.maxFileSize": 50,
  // 控制差异编辑器是否为添加/删除的更改显示 +/- 指示符号。
  "diffEditor.renderIndicators": true,
  // 控制差异编辑器的显示方式是并排还是内联。
  "diffEditor.renderSideBySide": true,
  //
  //  - off: 永不换行。
  //  - on: 将在视区宽度处换行。
  //  - inherit: 将根据 `editor.wordWrap` 设置换行。
  "diffEditor.wordWrap": "inherit",
  // 控制是否应在遇到提交字符时接受建议。例如，在 JavaScript 中，半角分号 (`;`) 可以为提交字符，能够在接受建议的同时键入该字符。
  "editor.acceptSuggestionOnCommitCharacter": true,
  // 控制除了 `Tab` 键以外， `Enter` 键是否同样可以接受建议。这能减少“插入新行”和“接受建议”命令之间的歧义。
  //  - on
  //  - smart: 仅当建议包含文本改动时才可使用 `Enter` 键进行接受。
  //  - off
  "editor.acceptSuggestionOnEnter": "on",
  // 控制编辑器中可由屏幕阅读器一次读出的行数。我们检测到屏幕阅读器时，会自动将默认值设置为 500。警告: 如果行数大于默认值，可能会影响性能。
  "editor.accessibilityPageSize": 10,
  // 控制编辑器是否应在对屏幕阅读器进行了优化的模式下运行。设置为“开”将禁用自动换行。
  //  - auto: 编辑器将使用平台 API 以检测是否附加了屏幕阅读器。
  //  - on: 编辑器将针对与屏幕阅读器搭配使用进行永久优化。将禁用自动换行。
  //  - off: 编辑器将不再对屏幕阅读器的使用进行优化。
  "editor.accessibilitySupport": "auto",
  // 控制编辑器是否在左括号后自动插入右括号。
  //  - always
  //  - languageDefined: 使用语言配置确定何时自动闭合括号。
  //  - beforeWhitespace: 仅当光标位于空白字符左侧时，才自动闭合括号。
  //  - never
  "editor.autoClosingBrackets": "languageDefined",
  // 控制在删除时编辑器是否应删除相邻的右引号或右方括号。
  //  - always
  //  - auto: 仅在自动插入时才删除相邻的右引号或右括号。
  //  - never
  "editor.autoClosingDelete": "auto",
  // 控制编辑器是否应改写右引号或右括号。
  //  - always
  //  - auto: 仅在自动插入时才改写右引号或右括号。
  //  - never
  "editor.autoClosingOvertype": "auto",
  // 控制编辑器是否在左引号后自动插入右引号。
  //  - always
  //  - languageDefined: 使用语言配置确定何时自动闭合引号。
  //  - beforeWhitespace: 仅当光标位于空白字符左侧时，才自动闭合引号。
  //  - never
  "editor.autoClosingQuotes": "languageDefined",
  // 控制编辑器是否应在用户键入、粘贴、移动或缩进行时自动调整缩进。
  //  - none: 编辑器不会自动插入缩进。
  //  - keep: 编辑器将保留当前行的缩进。
  //  - brackets: 编辑器将保留当前行的缩进并遵循语言定义的括号。
  //  - advanced: 编辑器将保留当前行的缩进、使用语言定义的括号并调用语言定义的特定 onEnterRules。
  //  - full: 编辑器将保留当前行的缩进，使用语言定义的括号，调用由语言定义的特殊输入规则，并遵循由语言定义的缩进规则。
  "editor.autoIndent": "full",
  // 控制在键入引号或方括号时，编辑器是否应自动将所选内容括起来。
  //  - languageDefined: 使用语言配置确定何时自动包住所选内容。
  //  - quotes: 使用引号而非括号来包住所选内容。
  //  - brackets: 使用括号而非引号来包住所选内容。
  //  - never
  "editor.autoSurround": "languageDefined",
  // 控制是否启用括号对着色。使用 “workbench.colorCustomizations” 替代括号突出显示颜色。
  "editor.bracketPairColorization.enabled": false,
  // 在保存时运行的代码操作类型。
  "editor.codeActionsOnSave": {},
  // 控制是否在编辑器中显示 CodeLens。
  "editor.codeLens": true,
  // 控制 CodeLens 的字体系列。
  "editor.codeLensFontFamily": "",
  // 控制 CodeLens 的字号(以像素为单位)。设置为 `0` 时，将使用 90% 的 `editor.fontSize`。
  "editor.codeLensFontSize": 0,
  // 控制编辑器是否显示内联颜色修饰器和颜色选取器。
  "editor.colorDecorators": true,
  // 启用使用鼠标和键进行列选择。
  "editor.columnSelection": false,
  // 控制在对行注释执行切换、添加或删除操作时，是否应忽略空行。
  "editor.comments.ignoreEmptyLines": true,
  // 控制在注释时是否插入空格字符。
  "editor.comments.insertSpace": true,
  // 控制在复制时是否同时复制语法高亮。
  "editor.copyWithSyntaxHighlighting": true,
  // 控制光标的动画样式。
  "editor.cursorBlinking": "blink",
  // 控制是否启用平滑插入动画。
  "editor.cursorSmoothCaretAnimation": false,
  // 控制光标样式。
  "editor.cursorStyle": "line",
  // 控制光标周围可见的前置行和尾随行的最小数目。在其他一些编辑器中称为 "scrollOff" 或 "scrollOffset"。
  "editor.cursorSurroundingLines": 0,
  // 控制何时应强制执行"光标环绕行"。
  //  - default: 仅当通过键盘或 API 触发时，才会强制执行"光标环绕行"。
  //  - all: 始终强制执行 "cursorSurroundingLines"
  "editor.cursorSurroundingLinesStyle": "default",
  // 当 `editor.cursorStyle` 设置为 `line` 时，控制光标的宽度。
  "editor.cursorWidth": 0,
  // 定义一个默认格式化程序, 该格式化程序优先于所有其他格式化程序设置。必须是提供格式化程序的扩展的标识符。
  //  - null: 没有
  //  - vscode.css-language-features: 为 CSS、LESS 和 SCSS 文件提供丰富的语言支持。
  //  - vscode.html-language-features: 为 HTML 和 Handlebar 文件提供丰富的语言支持
  //  - vscode.json-language-features: 为 JSON 文件提供丰富的语言支持
  //  - vscode.markdown-language-features: 为 Markdown 提供丰富的语言支持。
  //  - vscode.php-language-features: 为 PHP 文件提供丰富的语言支持。
  //  - ms-vscode.references-view: Reference Search results as separate, stable view in the sidebar
  //  - vscode.search-result: 为选项卡搜索结果中提供语法突出显示和语言功能。
  //  - vscode.typescript-language-features: 为 JavaScript 和 TypeScript 提供丰富的语言支持。
  //  - vscode.configuration-editing: 在配置文件 (如设置、启动和扩展推荐文件) 中提供高级 IntelliSense、自动修复等功能
  //  - vscode.debug-auto-launch: 当 node-debug 扩展未启用时提供自动附加的辅助程序。
  //  - vscode.debug-server-ready: 如果正在调试的服务器已准备就绪，在浏览器中打开 URI。
  //  - vscode.emmet: 适用于 VS Code 的 Emmet 支持
  //  - vscode.extension-editing: 在创建扩展时提供 linting 功能。
  //  - vscode.git: Git 源代码管理集成
  //  - vscode.git-base: Git 静态贡献和选取器。
  //  - vscode.github: 适用于 VS Code 的 GitHub 功能
  //  - vscode.github-authentication: GitHub 身份验证提供程序
  //  - vscode.grunt: Extension to add Grunt capabilities to VS Code.
  //  - vscode.gulp: 向 VSCode 提供 Gulp 功能的扩展。
  //  - vscode.image-preview: 提供 VS Code的内置图像预览
  //  - vscode.ipynb: 为打开和读取 Jupyter 的 .ipynb 笔记本文件提供基本支持
  //  - vscode.jake: 向 VS Code 提供 Jake 功能的扩展。
  //  - ms-vscode.js-debug: An extension for debugging Node.js programs and Chrome.
  //  - ms-vscode.js-debug-companion: Companion extension to js-debug that provides capability for remote debugging
  //  - vscode.markdown-math: 在笔记本中向 Markdown 添加数学支持。
  //  - vscode.merge-conflict: 为内联合并冲突提供高亮和命令。
  //  - vscode.microsoft-authentication: Microsoft 身份验证提供程序
  //  - vscode.npm: 为 npm 脚本提供任务支持的扩展。
  //  - ms-vscode-remote.remote-wsl-recommender: Recommends using the Windows Subsystem for Linux (WSL) and the Remote WSL extension.
  //  - vscode.simple-browser: 一个非常基本的内置 Web 视图，用于显示 Web 内容。
  //  - ms-vscode.vscode-js-profile-table: Text visualizer for profiles taken from the JavaScript debugger
  "editor.defaultFormatter": null,
  // 控制"转到定义"鼠标手势是否始终打开预览小部件。
  "editor.definitionLinkOpensInPeek": false,
  // 控制是否在打开文件时，基于文件内容自动检测 `editor.tabSize#` 和 `#editor.insertSpaces`。
  "editor.detectIndentation": true,
  // 控制在编辑器中是否允许通过拖放来移动选中内容。
  "editor.dragAndDrop": true,
  // 控制在没有选择内容时进行复制是否复制当前行。
  "editor.emptySelectionClipboard": true,
  // 按下"Alt"时滚动速度倍增。
  "editor.fastScrollSensitivity": 5,
  // 控制 "查找小部件" 是否应在编辑器顶部添加额外的行。如果为 true, 则可以在 "查找小工具" 可见时滚动到第一行之外。
  "editor.find.addExtraSpaceOnTop": true,
  // 控制自动打开“在选定内容中查找”的条件。
  //  - never: 从不自动打开“在选定内容中查找”(默认)。
  //  - always: 始终自动打开“在选定内容中查找”。
  //  - multiline: 选择多行内容时，自动打开“在选定内容中查找”。
  "editor.find.autoFindInSelection": "never",
  // 控制在键入时光标是否应跳转以查找匹配项。
  "editor.find.cursorMoveOnType": true,
  // 控制在找不到其他匹配项时，是否自动从开头(或结尾)重新开始搜索。
  "editor.find.loop": true,
  // 控制是否将编辑器选中内容作为搜索词填入到查找小组件中。
  //  - never: 切勿为编辑器选择中的搜索字符串设定种子。
  //  - always: 始终为编辑器选择中的搜索字符串设定种子，包括光标位置的字词。
  //  - selection: 仅为编辑器选择中的搜索字符串设定种子。
  "editor.find.seedSearchStringFromSelection": "always",
  // 控制编辑器是否启用了代码折叠。
  "editor.folding": true,
  // 控制编辑器是否应突出显示折叠范围。
  "editor.foldingHighlight": true,
  // 控制编辑器是否自动折叠导入范围。
  "editor.foldingImportsByDefault": false,
  // 可折叠区域的最大数量。如果当前源具有大量可折叠区域，那么增加此值可能会导致编辑器的响应速度变慢。
  "editor.foldingMaximumRegions": 5000,
  // 控制计算折叠范围的策略。
  //  - auto: 使用特定于语言的折叠策略(如果可用)，否则使用基于缩进的策略。
  //  - indentation: 使用基于缩进的折叠策略。
  "editor.foldingStrategy": "auto",
  // 控制字体系列。
  "editor.fontFamily": "Consolas, 'Courier New', monospace",
  // 配置字体连字或字体特性。可以是用于启用/禁用连字的布尔值，或用于设置 CSS "font-feature-settings" 属性值的字符串。
  "editor.fontLigatures": false,
  // 控制字体大小(像素)。
  "editor.fontSize": 14,
  // 控制字体粗细。接受关键字“正常”和“加粗”，或者接受介于 1 至 1000 之间的数字。
  "editor.fontWeight": "normal",
  // 控制编辑器是否自动格式化粘贴的内容。格式化程序必须可用，并且能针对文档中的某一范围进行格式化。
  "editor.formatOnPaste": false,
  // 在保存时格式化文件。格式化程序必须可用，延迟后文件不能保存，并且编辑器不能关闭。
  "editor.formatOnSave": false,
  // 控制在保存时设置格式是设置整个文件格式还是仅设置修改内容的格式。仅当 "#editor.formatOnSave#" 处于启用状态时适用。
  //  - file: 设置整个文件的格式。
  //  - modifications: 格式修改(需要源代码管理)。
  //  - modificationsIfAvailable: 将尝试只对修改进行格式化(需要源代码管理)。如果无法使用源代码管理，则将格式化整个文件。
  "editor.formatOnSaveMode": "file",
  // 控制编辑器在键入一行后是否自动格式化该行。
  "editor.formatOnType": false,
  // 控制编辑器是否应呈现垂直字形边距。字形边距最常用于调试。
  "editor.glyphMargin": true,
  // 当"转到声明"的结果为当前位置时将要执行的替代命令的 ID。
  "editor.gotoLocation.alternativeDeclarationCommand": "editor.action.goToReferences",
  // 当"转到定义"的结果为当前位置时将要执行的替代命令的 ID。
  "editor.gotoLocation.alternativeDefinitionCommand": "editor.action.goToReferences",
  // 当"转到实现"的结果为当前位置时将要执行的替代命令的 ID。
  "editor.gotoLocation.alternativeImplementationCommand": "",
  // 当"转到引用"的结果是当前位置时正在执行的替代命令 ID。
  "editor.gotoLocation.alternativeReferenceCommand": "",
  // 当"转到类型定义"的结果是当前位置时正在执行的备用命令 ID。
  "editor.gotoLocation.alternativeTypeDefinitionCommand": "editor.action.goToReferences",
  // 此设置已弃用，请改用单独的设置，如"editor.editor.gotoLocation.multipleDefinitions"或"editor.editor.gotoLocation.multipleImplementations"。
  //
  "editor.gotoLocation.multiple": null,
  // 控制存在多个目标位置时"转到声明"命令的行为。
  //  - peek: 显示结果的预览视图 (默认值)
  //  - gotoAndPeek: 转到主结果并显示预览视图
  //  - goto: 转到主结果，并对其他人启用防偷窥导航
  "editor.gotoLocation.multipleDeclarations": "peek",
  // 控制存在多个目标位置时"转到定义"命令的行为。
  //  - peek: 显示结果的预览视图 (默认值)
  //  - gotoAndPeek: 转到主结果并显示预览视图
  //  - goto: 转到主结果，并对其他人启用防偷窥导航
  "editor.gotoLocation.multipleDefinitions": "peek",
  // 控制存在多个目标位置时"转到实现"命令的行为。
  //  - peek: 显示结果的预览视图 (默认值)
  //  - gotoAndPeek: 转到主结果并显示预览视图
  //  - goto: 转到主结果，并对其他人启用防偷窥导航
  "editor.gotoLocation.multipleImplementations": "peek",
  // 控制存在多个目标位置时"转到引用"命令的行为。
  //  - peek: 显示结果的预览视图 (默认值)
  //  - gotoAndPeek: 转到主结果并显示预览视图
  //  - goto: 转到主结果，并对其他人启用防偷窥导航
  "editor.gotoLocation.multipleReferences": "peek",
  // 控制存在多个目标位置时"转到类型定义"命令的行为。
  //  - peek: 显示结果的预览视图 (默认值)
  //  - gotoAndPeek: 转到主结果并显示预览视图
  //  - goto: 转到主结果，并对其他人启用防偷窥导航
  "editor.gotoLocation.multipleTypeDefinitions": "peek",
  // 控制是否启用括号对指南。
  //  - true: 启用括号对参考线。
  //  - active: 仅为活动括号对启用括号对参考线。
  //  - false: 禁用括号对参考线。
  "editor.guides.bracketPairs": false,
  // 控制是否启用水平括号对指南。
  //  - true: 启用水平参考线作为垂直括号对参考线的添加项。
  //  - active: 仅为活动括号对启用水平参考线。
  //  - false: 禁用水平括号对参考线。
  "editor.guides.bracketPairsHorizontal": "active",
  // 控制编辑器是否应突出显示活动的括号对。
  "editor.guides.highlightActiveBracketPair": true,
  // 控制是否突出显示编辑器中活动的缩进参考线。
  "editor.guides.highlightActiveIndentation": true,
  // 控制编辑器是否显示缩进参考线。
  "editor.guides.indentation": true,
  // 控制是否在概览标尺中隐藏光标。
  "editor.hideCursorInOverviewRuler": false,
  // 如果有空间，首选在线条上方显示悬停。
  "editor.hover.above": true,
  // 控制显示悬停提示前的等待时间 (毫秒)。
  "editor.hover.delay": 300,
  // 控制是否显示悬停提示。
  "editor.hover.enabled": true,
  // 控制当鼠标移动到悬停提示上时，其是否保持可见。
  "editor.hover.sticky": true,
  // 在编辑器中启用内联提示。
  "editor.inlayHints.enabled": true,
  // 在编辑器中控制内嵌提示的字体系列。设置为空时，使用 `editor.fontFamily`。
  "editor.inlayHints.fontFamily": "",
  // 控制编辑器中内嵌提示的字号。当配置的值小于 `5` 或大于编辑器字号时，默认使用 90% 的 `editor.fontSize`。
  "editor.inlayHints.fontSize": 0,
  // 控制是否在编辑器中自动显示内联建议。
  "editor.inlineSuggest.enabled": true,
  // 按 `Tab` 键时插入空格。该设置在 `editor.detectIndentation` 启用时根据文件内容可能会被覆盖。
  "editor.insertSpaces": true,
  // 定义增加和减少缩进的括号。
  "editor.language.brackets": false,
  // 如果启用方括号对着色，则按照其嵌套级别定义已着色的方括号对。
  "editor.language.colorizedBracketPairs": false,
  // 对大型文件进行特殊处理，禁用某些内存密集型功能。
  "editor.largeFileOptimizations": true,
  // 控制字母间距(像素)。
  "editor.letterSpacing": 0,
  // 在编辑器中启用代码操作小灯泡提示。
  "editor.lightbulb.enabled": true,
  // 控制行高。
  //  - 使用 0 根据字号自动计算行高。
  //  - 介于 0 和 8 之间的值将用作字号的乘数。
  //  - 大于或等于 8 的值将用作有效值。
  "editor.lineHeight": 0,
  // 控制行号的显示。
  //  - off: 不显示行号。
  //  - on: 将行号显示为绝对行数。
  //  - relative: 将行号显示为与光标相隔的行数。
  //  - interval: 每 10 行显示一次行号。
  "editor.lineNumbers": "on",
  // 控制编辑器是否已启用链接编辑。相关符号(如 HTML 标记)在编辑时进行更新，具体由语言而定。
  "editor.linkedEditing": false,
  // 控制是否在编辑器中检测链接并使其可被点击。
  "editor.links": true,
  // 突出显示匹配的括号。
  "editor.matchBrackets": "always",
  // 由于性能原因，超过这个长度的行将不会被标记
  "editor.maxTokenizationLineLength": 20000,
  // 控制是否显示缩略图。
  "editor.minimap.enabled": true,
  // 限制缩略图的宽度，控制其最多显示的列数。
  "editor.minimap.maxColumn": 120,
  // 渲染每行的实际字符，而不是色块。
  "editor.minimap.renderCharacters": true,
  // 在迷你地图中绘制的内容比例: 1、2 或 3。
  "editor.minimap.scale": 1,
  // 控制何时显示迷你地图滑块。
  "editor.minimap.showSlider": "mouseover",
  // 控制在哪一侧显示缩略图。
  "editor.minimap.side": "right",
  // 控制迷你地图的大小。
  //  - proportional: 迷你地图的大小与编辑器内容相同(并且可能滚动)。
  //  - fill: 迷你地图将根据需要拉伸或缩小以填充编辑器的高度(不滚动)。
  //  - fit: 迷你地图将根据需要缩小，永远不会大于编辑器(不滚动)。
  "editor.minimap.size": "proportional",
  // 对鼠标滚轮滚动事件的 `deltaX` 和 `deltaY` 乘上的系数。
  "editor.mouseWheelScrollSensitivity": 1,
  // 按住 `Ctrl` 键并滚动鼠标滚轮时对编辑器字体大小进行缩放。
  "editor.mouseWheelZoom": false,
  // 当多个光标重叠时进行合并。
  "editor.multiCursorMergeOverlapping": true,
  // 在通过鼠标添加多个光标时使用的修改键。“转到定义”和“打开链接”功能所需的鼠标动作将会相应调整，不与多光标修改键冲突。[阅读详细信息](https://code.visualstudio.com/docs/editor/codebasics#_multicursor-modifier)。
  //  - ctrlCmd: 映射为 `Ctrl` (Windows 和 Linux) 或 `Command` (macOS)。
  //  - alt: 映射为 `Alt` (Windows 和 Linux) 或 `Option` (macOS)。
  "editor.multiCursorModifier": "alt",
  // 控制粘贴时粘贴文本的行计数与光标计数相匹配。
  //  - spread: 每个光标粘贴一行文本。
  //  - full: 每个光标粘贴全文。
  "editor.multiCursorPaste": "spread",
  // 控制编辑器是否突出显示语义符号的匹配项。
  "editor.occurrencesHighlight": true,
  // 控制是否在概览标尺周围绘制边框。
  "editor.overviewRulerBorder": true,
  // 控制编辑器的底边和最后一行之间的间距量。
  "editor.padding.bottom": 0,
  // 控制编辑器的顶边和第一行之间的间距量。
  "editor.padding.top": 0,
  // 控制参数提示菜单在到达列表末尾时进行循环还是关闭。
  "editor.parameterHints.cycle": false,
  // 在输入时显示含有参数文档和类型信息的小面板。
  "editor.parameterHints.enabled": true,
  // 控制是将焦点放在内联编辑器上还是放在预览小部件中的树上。
  //  - tree: 打开速览时聚焦树
  //  - editor: 打开预览时将焦点放在编辑器上
  "editor.peekWidgetDefaultFocus": "tree",
  // 控制是否在键入时自动显示建议。
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": false
  },
  // 控制显示快速建议前的等待时间 (毫秒)。
  "editor.quickSuggestionsDelay": 10,
  // 启用/禁用重命名之前预览更改的功能
  "editor.rename.enablePreview": true,
  // 已弃用，请改用 "editor.linkedEditing"。
  // 控制是否在编辑器中输入时自动重命名。
  "editor.renameOnType": false,
  // 控制编辑器是否显示控制字符。
  "editor.renderControlCharacters": true,
  // 当文件以换行符结束时, 呈现最后一行的行号。
  "editor.renderFinalNewline": true,
  // 控制编辑器的当前行进行高亮显示的方式。
  //  - none
  //  - gutter
  //  - line
  //  - all: 同时突出显示导航线和当前行。
  "editor.renderLineHighlight": "line",
  // 控制编辑器是否仅在焦点在编辑器时突出显示当前行。
  "editor.renderLineHighlightOnlyWhenFocus": false,
  // 控制编辑器在空白字符上显示符号的方式。
  //  - none
  //  - boundary: 呈现空格字符(字词之间的单个空格除外)。
  //  - selection: 仅在选定文本上呈现空白字符。
  //  - trailing: 仅呈现尾随空格字符。
  //  - all
  "editor.renderWhitespace": "selection",
  // 控制选区是否有圆角。
  "editor.roundedSelection": true,
  // 在一定数量的等宽字符后显示垂直标尺。输入多个值，显示多个标尺。若数组为空，则不绘制标尺。
  "editor.rulers": [],
  // 控制水平滚动条的可见性。
  //  - auto: 水平滚动条仅在必要时可见。
  //  - visible: 水平滚动条将始终可见。
  //  - hidden: 水平滚动条将始终隐藏。
  "editor.scrollbar.horizontal": "auto",
  // 水平滚动条的高度。
  "editor.scrollbar.horizontalScrollbarSize": 12,
  // 控制单击按页滚动还是跳转到单击位置。
  "editor.scrollbar.scrollByPage": false,
  // 控制垂直滚动条的可见性。
  //  - auto: 垂直滚动条仅在必要时可见。
  //  - visible: 垂直滚动条将始终可见。
  //  - hidden: 垂直滚动条将始终隐藏。
  "editor.scrollbar.vertical": "auto",
  // 垂直滚动条的宽度。
  "editor.scrollbar.verticalScrollbarSize": 14,
  // 控制编辑器水平滚动时可以超过范围的字符数。
  "editor.scrollBeyondLastColumn": 5,
  // 控制编辑器是否可以滚动到最后一行之后。
  "editor.scrollBeyondLastLine": true,
  // 同时垂直和水平滚动时，仅沿主轴滚动。在触控板上垂直滚动时，可防止水平漂移。
  "editor.scrollPredominantAxis": true,
  // 控制编辑器是否应突出显示与所选内容类似的匹配项。
  "editor.selectionHighlight": true,
  // 控制是否为支持它的语言显示语义突出显示。
  //  - true: 对所有颜色主题启用语义突出显示。
  //  - false: 对所有颜色主题禁用语义突出显示。
  //  - configuredByTheme: 语义突出显示是由当前颜色主题的 "semanticHighlighting" 设置配置的。
  "editor.semanticHighlighting.enabled": "configuredByTheme",
  // 从当前所选颜色主题重写编辑器语义标记颜色和样式。
  "editor.semanticTokenColorCustomizations": {},
  // 控制加删除线被弃用的变量。
  "editor.showDeprecated": true,
  // 控制何时显示行号槽上的折叠控件。
  //  - always: 始终显示折叠控件。
  //  - mouseover: 仅在鼠标位于装订线上方时显示折叠控件。
  "editor.showFoldingControls": "mouseover",
  // 控制是否淡化未使用的代码。
  "editor.showUnused": true,
  // 是否应始终选择前导和尾随空格。
  "editor.smartSelect.selectLeadingAndTrailingWhitespace": true,
  // 控制编辑器是否使用动画滚动。
  "editor.smoothScrolling": false,
  // 控制代码片段是否与其他建议一起显示及其排列的位置。
  //  - top: 在其他建议上方显示代码片段建议。
  //  - bottom: 在其他建议下方显示代码片段建议。
  //  - inline: 在其他建议中穿插显示代码片段建议。
  //  - none: 不显示代码片段建议。
  "editor.snippetSuggestions": "inline",
  // 在速览编辑器中，即使双击其中的内容或者按 `Esc` 键，也保持其打开状态。
  "editor.stablePeek": false,
  // 在使用空格进行缩进时模拟制表符的选择行为。所选内容将始终使用制表符停止位。
  "editor.stickyTabStops": false,
  // 此设置已弃用，请改用单独的设置，如"editor.suggest.showKeywords"或"editor.suggest.showSnippets"。
  //
  "editor.suggest.filteredTypes": {},
  // 控制对建议的筛选和排序是否考虑小的拼写错误。
  "editor.suggest.filterGraceful": true,
  // 控制接受补全时是否覆盖单词。请注意，这取决于扩展选择使用此功能。
  //  - insert: 插入建议而不覆盖光标右侧的文本。
  //  - replace: 插入建议并覆盖光标右侧的文本。
  "editor.suggest.insertMode": "insert",
  // 控制排序时是否首选光标附近的字词。
  "editor.suggest.localityBonus": false,
  // 此设置已弃用。现在可以调整建议小组件的大小。
  //
  "editor.suggest.maxVisibleSuggestions": 0,
  // 控制是否在编辑器中预览建议结果。
  "editor.suggest.preview": false,
  // 控制是否在多个工作区和窗口间共享记忆的建议选项(需要 `editor.suggestSelection`)。
  "editor.suggest.shareSuggestSelections": false,
  // 启用后，IntelliSense 将显示“类”建议。
  "editor.suggest.showClasses": true,
  // 启用后，IntelliSense 将显示“颜色”建议。
  "editor.suggest.showColors": true,
  // 启用后，IntelliSense 将显示“常量”建议。
  "editor.suggest.showConstants": true,
  // 启用后，IntelliSense 将显示“构造函数”建议。
  "editor.suggest.showConstructors": true,
  // 启用后，IntelliSense 将显示“自定义颜色”建议。
  "editor.suggest.showCustomcolors": true,
  // 启用后，IntelliSense 将显示“已启用”建议。
  "editor.suggest.showDeprecated": true,
  // 启用后，IntelliSense 将显示 "enumMember" 建议。
  "editor.suggest.showEnumMembers": true,
  // 启用后，IntelliSense 将显示“枚举”建议。
  "editor.suggest.showEnums": true,
  // 启用后，IntelliSense 将显示“事件”建议。
  "editor.suggest.showEvents": true,
  // 启用后，IntelliSense 将显示“字段”建议。
  "editor.suggest.showFields": true,
  // 启用后，IntelliSense 将显示“文件”建议。
  "editor.suggest.showFiles": true,
  // 启用后，IntelliSense 将显示“文件夹”建议。
  "editor.suggest.showFolders": true,
  // 启用后，IntelliSense 将显示“函数”建议。
  "editor.suggest.showFunctions": true,
  // 控制是否在建议中显示或隐藏图标。
  "editor.suggest.showIcons": true,
  // 控制建议详细信息是随标签一起显示还是仅显示在详细信息小组件中
  "editor.suggest.showInlineDetails": true,
  // 启用后，IntelliSense 将显示“接口”建议。
  "editor.suggest.showInterfaces": true,
  // 启用后，IntelliSense 将显示"问题"建议。
  "editor.suggest.showIssues": true,
  // 启用后，IntelliSense 将显示“关键字”建议。
  "editor.suggest.showKeywords": true,
  // 启用后，IntelliSense 将显示“方法”建议。
  "editor.suggest.showMethods": true,
  // 启用后，IntelliSense 将显示“模块”建议。
  "editor.suggest.showModules": true,
  // 启用后，IntelliSense 将显示“操作符”建议。
  "editor.suggest.showOperators": true,
  // 启用后，IntelliSense 将显示“属性”建议。
  "editor.suggest.showProperties": true,
  // 启用后，IntelliSense 将显示“参考”建议。
  "editor.suggest.showReferences": true,
  // 启用后，IntelliSense 将显示“片段”建议。
  "editor.suggest.showSnippets": true,
  // 控制建议小部件底部的状态栏的可见性。
  "editor.suggest.showStatusBar": false,
  // 启用后，IntelliSense 将显示“结构”建议。
  "editor.suggest.showStructs": true,
  // 启用后，IntelliSense 将显示 "typeParameter" 建议。
  "editor.suggest.showTypeParameters": true,
  // 启用后，IntelliSense 将显示“单位”建议。
  "editor.suggest.showUnits": true,
  // 启用后，IntelliSense 将显示"用户"建议。
  "editor.suggest.showUsers": true,
  // 启用后，IntelliSense 将显示“值”建议。
  "editor.suggest.showValues": true,
  // 启用后，IntelliSense 将显示“变量”建议。
  "editor.suggest.showVariables": true,
  // 启用后，IntelliSense 将显示“文本”建议。
  "editor.suggest.showWords": true,
  // 控制活动代码段是否阻止快速建议。
  "editor.suggest.snippetsPreventQuickSuggestions": true,
  // 建议小部件的字号。如果设置为 `0`，则使用 `editor.fontSize` 的值。
  "editor.suggestFontSize": 0,
  // 建议小部件的行高。如果设置为 `0`，则使用 `editor.lineHeight` 的值。最小值为 8。
  "editor.suggestLineHeight": 0,
  // 控制在键入触发字符后是否自动显示建议。
  "editor.suggestOnTriggerCharacters": true,
  // 控制在建议列表中如何预先选择建议。
  //  - first: 始终选择第一个建议。
  //  - recentlyUsed: 选择最近的建议，除非进一步键入选择其他项。例如 `console. -> console.log`，因为最近补全过 `log`。
  //  - recentlyUsedByPrefix: 根据之前补全过的建议的前缀来进行选择。例如，`co -> console`、`con -> const`。
  "editor.suggestSelection": "first",
  // 启用 Tab 补全。
  //  - on: 在按下 Tab 键时进行 Tab 补全，将插入最佳匹配建议。
  //  - off: 禁用 Tab 补全。
  //  - onlySnippets: 在前缀匹配时进行 Tab 补全。在 "quickSuggestions" 未启用时体验最好。
  "editor.tabCompletion": "off",
  // 一个制表符等于的空格数。在 `editor.detectIndentation` 启用时，根据文件内容，该设置可能会被覆盖。
  "editor.tabSize": 4,
  // 替代当前所选颜色主题中的编辑器语法颜色和字形。
  "editor.tokenColorCustomizations": {},
  // 删除自动插入的尾随空白符号。
  "editor.trimAutoWhitespace": true,
  // 控制单击已折叠的行后面的空内容是否会展开该行。
  "editor.unfoldOnClickAfterEndOfLine": false,
  // 定义未突出显示的允许字符。
  "editor.unicodeHighlight.allowedCharacters": {},
  // 未突出显示在允许区域设置中常见的 Unicode 字符。
  "editor.unicodeHighlight.allowedLocales": {
    "_os": true,
    "_vscode": true
  },
  // 控制是否突出显示可能与基本 ASCII 字符混淆的字符，但当前用户区域设置中常见的字符除外。
  "editor.unicodeHighlight.ambiguousCharacters": true,
  // 控制注释中的字符是否也应进行 Unicode 突出显示。
  "editor.unicodeHighlight.includeComments": "inUntrustedWorkspace",
  // 控制字符串中的字符是否也应进行 unicode 突出显示。
  "editor.unicodeHighlight.includeStrings": true,
  // 控制是否突出显示仅保留空格或完全没有宽度的字符。
  "editor.unicodeHighlight.invisibleCharacters": true,
  // 控制是否突出显示所有非基本 ASCII 字符。只有介于 U+0020 到 U+007E 之间的字符、制表符、换行符和回车符才被视为基本 ASCII。
  "editor.unicodeHighlight.nonBasicASCII": "inUntrustedWorkspace",
  // 删除可能导致问题的异常行终止符。
  //  - auto: 自动删除异常的行终止符。
  //  - off: 忽略异常的行终止符。
  //  - prompt: 提示删除异常的行终止符。
  "editor.unusualLineTerminators": "prompt",
  // 根据制表位插入和删除空格。
  "editor.useTabStops": true,
  // 控制是否根据文档中的文字计算自动完成列表。
  "editor.wordBasedSuggestions": true,
  // 控制通过哪些文档计算基于字词的补全。
  //  - currentDocument: 仅建议活动文档中的字词。
  //  - matchingDocuments: 建议使用同一语言的所有打开的文档中的字词。
  //  - allDocuments: 建议所有打开的文档中的字词。
  "editor.wordBasedSuggestionsMode": "matchingDocuments",
  // 执行单词相关的导航或操作时作为单词分隔符的字符。
  "editor.wordSeparators": "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",
  // 控制折行的方式。
  //  - off: 永不换行。
  //  - on: 将在视区宽度处换行。
  //  - wordWrapColumn: 在 `editor.wordWrapColumn` 处折行。
  //  - bounded: 在视区宽度和 `editor.wordWrapColumn` 中的较小值处折行。
  "editor.wordWrap": "off",
  // 在 `editor.wordWrap` 为 `wordWrapColumn` 或 `bounded` 时，控制编辑器的折行列。
  "editor.wordWrapColumn": 80,
  // 控制折行的缩进。
  //  - none: 没有缩进。折行从第 1 列开始。
  //  - same: 折行的缩进量与其父级相同。
  //  - indent: 折行的缩进量比其父级多 1。
  //  - deepIndent: 折行的缩进量比其父级多 2。
  "editor.wrappingIndent": "same",
  // 控制计算包裹点的算法。
  //  - simple: 假定所有字符的宽度相同。这是一种快速算法，适用于等宽字体和某些字形宽度相等的文字(如拉丁字符)。
  //  - advanced: 将包装点计算委托给浏览器。这是一个缓慢算法，可能会导致大型文件被冻结，但它在所有情况下都正常工作。
  "editor.wrappingStrategy": "simple",
  // 控制是否在“源代码管理”视图中始终显示内联操作。
  "scm.alwaysShowActions": false,
  // 控制存储库是否应始终在 SCM 视图中可见。
  "scm.alwaysShowRepositories": false,
  // 控制 SCM 视图在打开文件时是否应自动显示和选择文件。
  "scm.autoReveal": true,
  // 控制活动栏上源代码管理图标上的计数锁屏提醒。
  //  - all: 显示所有源代码管理提供程序计数锁屏提醒的总和。
  //  - focused: 显示焦点源控制提供程序的计数标记。
  //  - off: 禁用源代码管理计数徽章。
  "scm.countBadge": "all",
  // 控制默认的源代码管理存储库视图模式。
  //  - tree: 将存储库更改显示为树。
  //  - list: 将存储库更改显示为列表。
  "scm.defaultViewMode": "list",
  // 控制默认的源代码管理存储库排序模式。
  //  - name: 按文件名对存储库更改进行排序。
  //  - path: 按路径对存储库更改进行排序。
  //  - status: 按 SCM 状态对存储库更改进行排序。
  "scm.defaultViewSortKey": "path",
  // 控制编辑器中差异的显示效果。
  //  - all: 显示所有可用位置中的差异装饰。
  //  - gutter: 仅在编辑器行号槽中显示差异装饰。
  //  - overview: 仅在概览标尺中显示差异装饰。
  //  - minimap: 仅在缩略图中显示差异装饰。
  //  - none: 不要显示差异装饰。
  "scm.diffDecorations": "all",
  // 控制源代码管理差异装订线修饰的行为。
  //  - diff: 单击时显示内联差异一览视图。
  //  - none: 不执行任何操作。
  "scm.diffDecorationsGutterAction": "diff",
  // 控制行号槽中源代码管理差异装饰器的可见性。
  //  - always: 始终显示行号槽中的差异装饰器。
  //  - hover: 仅在悬停时显示行号槽中的差异装饰器。
  "scm.diffDecorationsGutterVisibility": "always",
  // 控制装订线中差异修饰的宽度(px)(已添加或已修改)。
  "scm.diffDecorationsGutterWidth": 3,
  // 控制在源代码管理差异装订线修饰中是否忽略前导空格和尾随空格。
  //  - true: 忽略前导空格和尾随空格。
  //  - false: 不要忽略前导空格和尾随空格。
  //  - inherit: 继承自 `diffEditor.ignoreTrimWhitespace`。
  "scm.diffDecorationsIgnoreTrimWhitespace": "false",
  // 控制输入消息的字体。将 `default` 用于工作台用户界面字体系列，将 `editor` 用于 `editor.fontFamily` 的值，或者使用自定义字体系列。
  "scm.inputFontFamily": "default",
  // 控制输入消息的字号(以像素为单位)。
  "scm.inputFontSize": 13,
  // 控制源代码管理提供程序标头的计数锁屏提醒。仅在有多个提供程序时才显示这些标头。
  //  - hidden: 隐藏源代码管理提供程序计数锁屏提醒。
  //  - auto: 仅显示非零时源代码管理提供程序的计数锁屏提醒。
  //  - visible: 显示源代码管理提供程序计数锁屏提醒。
  "scm.providerCountBadge": "hidden",
  // 控制在“源代码管理存储库”部分中可见的存储库数。设置为 "0", 以便能够手动调整视图的大小。
  "scm.repositories.visible": 10,
  // 控制是否可以在 SCM 视图中显示操作按钮。
  "scm.showActionButton": true,
  // 控制何时显示受限模式横幅。
  //  - always: 每次打开不受信任的工作区时显示横幅。
  //  - untilDismissed: 打开不受信任的工作区时显示横幅，直到关闭为止。
  //  - never: 打开不受信任的工作区时，不要显示横幅。
  "security.workspace.trust.banner": "untilDismissed",
  // 控制空窗口在 VS Code 中是否默认受信任。当与 `security.workspace.trust.untrustedFiles` 一起使用时，可以启用 VS Code 的完整功能，而无需在空窗口中进行提示。
  "security.workspace.trust.emptyWindow": true,
  // 控制是否在 VS Code 内启用工作区信任。
  "security.workspace.trust.enabled": true,
  // 控制何时显示信任工作区的启动提示。
  //  - always: 每次打开不受信任的工作区时请求信任。
  //  - once: 首次打开不受信任的工作区时请求信任。
  //  - never: 每次打开不受信任的工作区时不请求信任。
  "security.workspace.trust.startupPrompt": "once",
  // 控制如何处理在受信任的工作区中打开不受信任的文件。此设置也适用于通过 `#security.workspace.trust.emptyWindow#" 打开的空窗口中的文件。
  //  - prompt: 询问每个工作区如何处理不受信任文件。将不受信任的文件引入受信任的工作区后，将不会再次提示你。
  //  - open: 始终允许不受信任的文件引入受信任的工作区，而不显示提示。
  //  - newWindow: 在受限模式下的独立窗口中始终打开不受信任的文件，而不显示提示。
  "security.workspace.trust.untrustedFiles": "prompt",
  // 控制在工作台中单击活动栏图标时出现的行为。
  //  - toggle: 如果单击的项已可见，则隐藏边栏。
  //  - focus: 如果单击的项已可见，则将焦点放在边栏上。
  "workbench.activityBar.iconClickBehavior": "toggle",
  // 控制工作台中活动栏的可见性。
  "workbench.activityBar.visible": true,
  // 覆盖当前所选颜色主题的颜色。
  "workbench.colorCustomizations": {},
  // 指定用在工作台中的颜色主题。
  "workbench.colorTheme": "Default Dark+",
  // 控制命令面板中保留最近使用命令的数量。设置为 0 时禁用命令历史功能。
  "workbench.commandPalette.history": 50,
  // 当再次打开命令面板时，控制是否恢复上一次输入的内容。
  "workbench.commandPalette.preserveInput": false,
  // 如果与列出的其中一个类型匹配的编辑器作为编辑器组中的第一个编辑器打开，且打开了多个组，则该组会自动锁定。锁定的组仅用于在用户手势(例如拖放)显式选择时打开编辑器，默认情况下不使用。因此，锁定的组中的活动编辑器不太可能被意外替换为其他编辑器。
  "workbench.editor.autoLockGroups": {
    "default": false,
    "workbench.input.interactive": false,
    "interactive": false,
    "workbench.editorinputs.searchEditorInput": false,
    "imagePreview.previewEditor": false,
    "vscode.markdown.preview.editor": false,
    "jsProfileVisualizer.cpuprofile.table": false,
    "terminalEditor": true,
    "jupyter-notebook": false,
    "mainThreadWebview-markdown.preview": false
  },
  // 如果在居中布局中打开了超过一组编辑器，控制是否自动将宽度调整为最大宽度值。当回到只打开了一组编辑器的状态，将自动将宽度调整为原始的居中宽度值。
  "workbench.editor.centeredLayoutAutoResize": true,
  // 控制编辑器组中最后一个选项卡关闭时这个空组的行为。若启用，将自动关闭空组。若禁用，空组仍将保留在网格布局中。
  "workbench.editor.closeEmptyGroups": true,
  // 控制在会话期间显示已打开文件的编辑器是否应在被其他进程删除或重命名时自动关闭。禁用此功能将使编辑器在此类事件中保持打开状态。请注意，从应用程序内删除将始终关闭编辑器，且永远不会关闭具有未保存更改的编辑器以保留数据。
  "workbench.editor.closeOnFileDelete": false,
  // 控制编辑器文件修饰是否应使用徽章。
  "workbench.editor.decorations.badges": true,
  // 控制编辑器文件修饰是否应使用颜色。
  "workbench.editor.decorations.colors": true,
  // 控制打开的编辑器是否显示为预览编辑器。预览编辑器不会保持打开状态，在将其显式设置为保持打开(例如通过双击或编辑)前将会重复使用，其文件名显示样式为斜体。
  "workbench.editor.enablePreview": true,
  // 控制当从编辑器开始进行代码导航时，编辑器是否保持为预览状态。预览编辑器不会保持打开状态，在将其显式设置为保持打开(例如通过双击或编辑)前将会重复使用。当 "#workbench.editor.enablePreview#" 处于禁用状态时，将忽略此值。
  "workbench.editor.enablePreviewFromCodeNavigation": false,
  // 控制通过 Quick Open 打开的编辑器是否显示为预览编辑器。预览编辑器不会保持打开状态，在将其显式设置为保持打开(例如通过双击或编辑)前将会重复使用。当 "#workbench.editor.enablePreview#" 处于禁用状态时，将忽略此值。
  "workbench.editor.enablePreviewFromQuickOpen": false,
  // 控制是否按最常使用的顺序或从左到右的顺序关闭选项卡。
  "workbench.editor.focusRecentEditorAfterClose": true,
  // 控制是否在具有未保存更改的编辑器的选项卡上绘制顶部边框。当禁用 `workbench.editor.showTabs` 时，会忽略此值。
  "workbench.editor.highlightModifiedTabs": false,
  // 允许在语言检测中使用编辑器历史记录。这会导致自动语言检测偏向于最近打开的语言，并允许自动语言检测使用较小的输入进行操作。
  "workbench.editor.historyBasedLanguageDetection": false,
  // 控制编辑器标签的格式。
  //  - default: 显示文件名。当启用选项卡且在同一组内有两个相同名称的文件时，将添加每个文件路径中可以用于区分的部分。在选项卡被禁用且编辑器活动时，将显示相对于工作区文件夹的路径。
  //  - short: 在文件的目录名之后显示文件名。
  //  - medium: 在文件相对当前工作区文件夹的路径之后显示文件名。
  //  - long: 在文件的绝对路径之后显示文件名。
  "workbench.editor.labelFormat": "default",
  // 控制是否自动检测文本编辑器中的语言，除非该语言已由语言选择器显式设置。这也可以按语言确定范围，以便你可以指定不希望关闭的语言。这对于像 Markdown 这样的语言很有用，因为它通常包含可能会欺骗语言检测的其他语言，使其认为它是嵌入语言而不是 Markdown。
  "workbench.editor.languageDetection": true,
  // 控制打开的编辑器数是否应受限制。启用后，最近使用较少的编辑器将关闭，以为新打开的编辑器腾出空间。
  "workbench.editor.limit.enabled": false,
  // 控制最大打开的编辑器的限制是否应应用于每个编辑器组或所有编辑器组。
  "workbench.editor.limit.perEditorGroup": false,
  // 控制打开编辑器的最大数量。使用 "#workbench.editor.limit.perEditorGroup#" 设置控制每个编辑器组或跨所有组的限制。
  "workbench.editor.limit.value": 10,
  // 允许使用鼠标按钮四和五执行“返回”和“前进”命令。
  "workbench.editor.mouseBackForwardToNavigate": true,
  // 控制编辑器中“返回”和“前进”等命令的历史导航范围。
  //  - default: 浏览所有打开的编辑器和编辑器组。
  //  - editorGroup: 仅在活动编辑器组的编辑器中导航。
  //  - editor: 仅在活动编辑器中导航。
  "workbench.editor.navigationScope": "default",
  // 控制编辑器打开的位置。选择 `left` 或 `right` 可分别在当前活动编辑器的左侧或右侧打开。选择 `first` (最前) 或 `last` (最后) 打开的位置与当前活动编辑器无关。
  "workbench.editor.openPositioning": "right",
  // 控制编辑器在并排打开时(例如从资源管理器)出现的默认位置。默认在当前活动编辑器右侧打开。若更改为 "down"，则在当前活动编辑器下方打开。
  "workbench.editor.openSideBySideDirection": "right",
  // 控制固定的编辑器选项卡的大小。固定的选项卡排在所有打开的选项卡的开头，并且在取消固定之前，通常不会关闭。当 "#workbench.editor.showTabs#" 处于禁用状态时，将忽略此值。
  //  - normal: 固定的选项卡会继承未固定的选项卡的外观。
  //  - compact: 固定的选项卡将以紧凑形式显示，其中只包含图标或编辑器名称的第一个字母。
  //  - shrink: 固定的选项卡缩小至紧凑的固定大小，显示编辑器名称的各部分。
  "workbench.editor.pinnedTabSizing": "normal",
  // 关闭编辑器后，当重新打开时，还原最后的编辑器视图状态(例如滚动位置)。编辑器视图状态存储在每个编辑器组中，且会在组关闭时被放弃。使用 `workbench.editor.sharedViewState` 设置以跨所有编辑器组使用最后已知的视图状态，以防未找到编辑器组之前的视图状态。
  "workbench.editor.restoreViewState": true,
  // 控制是否在打开的任何可见组中显示编辑器。如果禁用，编辑器将优先在当前活动的编辑器组中打开。如果启用，将会显示在已打开的编辑器，而不是在当前活动的编辑器组中再次打开。请注意，有些情况下会忽略此设置，例如，强制编辑器在特定组中打开或当前活动组的一侧时。
  "workbench.editor.revealIfOpen": false,
  // 控制在滚动到选项卡上方时是否打开这些选项卡。默认情况下，选项卡仅在鼠标滚动时呈现，但不打开。可通过在滚动时按住 Shift 键来更改滚动期间的此行为。当 "#workbench.editor.showTabs#" 处于禁用状态时，将忽略此值。
  "workbench.editor.scrollToSwitchTabs": false,
  // 跨所有编辑器组保留最新的编辑器视图状态(例如滚动位置)，并在未找到编辑器组的特定编辑器视图状态时进行还原。
  "workbench.editor.sharedViewState": false,
  // 控制是否在打开的编辑器中显示图标。这要求同时启用文件图标主题。
  "workbench.editor.showIcons": true,
  // 控制打开的编辑器是否显示在选项卡中。
  "workbench.editor.showTabs": true,
  // 控制在编辑器组中垂直或水平拆分编辑器时的布局。
  //  - vertical: 从上到下定位编辑器。
  //  - horizontal: 从左到右定位编辑器。
  "workbench.editor.splitInGroupLayout": "horizontal",
  // 通过将编辑器或文件放到编辑器区域的边缘，控制是否可以由拖放操作拆分编辑器组。
  "workbench.editor.splitOnDragAndDrop": true,
  // 拆分编辑器组时控制编辑器组大小。
  //  - distribute: 将所有编辑器组拆分为相等的部分。
  //  - split: 将活动编辑器组拆分为相等的部分。
  "workbench.editor.splitSizing": "distribute",
  // 控制编辑器的选项卡关闭按钮的位置，或者在设置为 "off" 时禁用它们。当 "#workbench.editor.showTabs#" 处于禁用状态时，将忽略此值。
  "workbench.editor.tabCloseButton": "right",
  // 控制编辑器选项卡的大小调整。当 "#workbench.editor.showTabs#" 处于禁用状态时，将忽略此值。
  //  - fit: 始终将标签页保持足够大，能够完全显示编辑器标签。
  //  - shrink: 在不能同时显示所有选项卡时，允许选项卡缩小。
  "workbench.editor.tabSizing": "fit",
  // 控制编辑器标题区域中用于选项卡和面包屑的滚动条的高度。
  //  - default: 默认大小。
  //  - large: 增加大小，以便更轻松地通过鼠标抓取。
  "workbench.editor.titleScrollbarSizing": "default",
  // 控制无标题提示应该是编辑器或浮动按钮中的内联文本，还是应该隐藏。
  "workbench.editor.untitled.hint": "text",
  // 控制无标题编辑器的标签格式。
  //  - content: 无标题文件的名称派生自其第一行的内容，除非它有关联的文件路径。如果行为空或不包含单词字符，它将回退到名称。
  //  - name: 无标题文件的名称不是从文件的内容派生的。
  "workbench.editor.untitled.labelFormat": "content",
  // 控制当超出可用空间时，选项卡是否应在多行之间换行，或者是否应显示滚动条。当 "#workbench.editor.showTabs#" 处于禁用状态时，将忽略此值。
  "workbench.editor.wrapTabs": false,
  // 将 glob 模式配置到编辑器(例如 `"*十六进制": "hexEditor.hexEdit"`)。这些优先顺序高于默认行为。
  "workbench.editorAssociations": {},
  // 从 Microsoft 联机服务中获取要进行的实验。
  "workbench.enableExperiments": true,
  // 控制是否通过 `window.titleBarStyle` 启用自定义标题栏中的布局控件。
  "workbench.experimental.layoutControl.enabled": true,
  // 控制自定义标题栏中的布局控件是显示为单个菜单按钮还是多个 UI 切换。
  //  - menu: 显示包含布局选项下拉列表的单个按钮。
  //  - toggles: 显示用于切换面板和侧边栏可见性的多个按钮。
  //  - both: 显示下拉列表和切换按钮。
  "workbench.experimental.layoutControl.type": "menu",
  // 配置开启程序以用于外部 URI (即 http、https)。
  "workbench.externalUriOpeners": {},
  // 控制为工作台项显示悬停之前的延迟时间(以毫秒为单位)(例如，一些扩展提供了树状视图项)。已经可见的项可能需要刷新，然后才会反映出此设置更改。
  "workbench.hover.delay": 500,
  // 指定工作台中使用的文件图标主题；若指定为 "null"，则不显示任何文件图标。
  //  - null: 无文件图标
  //  - vs-minimal
  //  - vs-seti
  "workbench.iconTheme": "vs-seti",
  // 控制列表和树中的键盘导航是否仅通过键入自动触发。如果设置为 `false` ，键盘导航只在执行 `list.toggleKeyboardNavigation` 命令时触发，您可以为该命令指定键盘快捷方式。
  "workbench.list.automaticKeyboardNavigation": true,
  // 按下"Alt"时滚动速度倍增。
  "workbench.list.fastScrollSensitivity": 5,
  // 控制列表和树是否支持工作台中的水平滚动。警告: 打开此设置影响会影响性能。
  "workbench.list.horizontalScrolling": false,
  // 控制工作台中的列表和树的键盘导航样式。它可为“简单”、“突出显示”或“筛选”。
  //  - simple: 简单键盘导航聚焦与键盘输入相匹配的元素。仅对前缀进行匹配。
  //  - highlight: 高亮键盘导航会突出显示与键盘输入相匹配的元素。进一步向上和向下导航将仅遍历突出显示的元素。
  //  - filter: 筛选器键盘导航将筛选出并隐藏与键盘输入不匹配的所有元素。
  "workbench.list.keyboardNavigation": "highlight",
  // 对鼠标滚轮滚动事件的 `deltaX` 和 `deltaY` 乘上的系数。
  "workbench.list.mouseWheelScrollSensitivity": 1,
  // 在通过鼠标多选树和列表条目时使用的修改键 (例如“资源管理器”、“打开的编辑器”和“源代码管理”视图)。“在侧边打开”功能所需的鼠标动作 (若可用) 将会相应调整，不与多选修改键冲突。
  //  - ctrlCmd: 映射为 `Ctrl` (Windows 和 Linux) 或 `Command` (macOS)。
  //  - alt: 映射为 `Alt` (Windows 和 Linux) 或 `Option` (macOS)。
  "workbench.list.multiSelectModifier": "ctrlCmd",
  // 控制如何使用鼠标打开树和列表中的项(若支持)。请注意，如果此设置不适用，某些树和列表可能会选择忽略它。
  "workbench.list.openMode": "singleClick",
  // 控制列表和树是否具有平滑滚动效果。
  "workbench.list.smoothScrolling": false,
  // 控制新工作区中面板(终端、调试控制台、输出、问题)的默认位置。它可以显示在编辑器区域的底部、右侧或左侧。
  "workbench.panel.defaultLocation": "bottom",
  // 控制面板是否以最大化方式打开。它可以始终以最大化方式打开、永不以最大化方式打开或以关闭前的最后一个状态打开。
  //  - always: 始终以最大化方式打开面板。
  //  - never: 永不以最大化方式打开面板。面板将以非最大化方式打开。
  //  - preserve: 以关闭面板前的状态打开面板。
  "workbench.panel.opensMaximized": "preserve",
  // 指定启用了 `window.autoDetectColorScheme` 时深色操作系统外观的首选颜色主题。
  "workbench.preferredDarkColorTheme": "Default Dark+",
  // 指定启用了 `window.autoDetectHighContrast` 时在高对比度模式下使用的首选颜色主题。
  "workbench.preferredHighContrastColorTheme": "Default High Contrast",
  // 指定启用了 `window.autoDetectColorScheme` 时浅色操作系统外观的首选颜色主题。
  "workbench.preferredLightColorTheme": "Default Light+",
  // 指定使用的产品图标主题。
  //  - Default: 默认
  "workbench.productIconTheme": "Default",
  // 控制 Quick Open 是否在其失去焦点时自动关闭。
  "workbench.quickOpen.closeOnFocusLost": true,
  // 在打开 Quick Open 视图时，控制是否自动恢复上一次输入的值。
  "workbench.quickOpen.preserveInput": false,
  // 控制视图/编辑器之间拖动区域的悬停反馈延迟(以毫秒为单位)。
  "workbench.sash.hoverDelay": 300,
  // 控制视图/编辑器之间拖动区域的反馈区域大小(以像素为单位)。如果你认为很难使用鼠标调整视图的大小，请将该值调大。
  "workbench.sash.size": 4,
  // 配置默认使用的设置编辑器。
  //  - ui: 使用设置 ui 编辑器。
  //  - json: 使用 json 文件编辑器。
  "workbench.settings.editor": "ui",
  // 控制是否在设置中启用自然语言搜索。自然语言搜索由 Microsoft 联机服务提供。
  "workbench.settings.enableNaturalLanguageSearch": true,
  // 控制在打开按键绑定设置时是否同时打开显示所有默认按键绑定的编辑器。
  "workbench.settings.openDefaultKeybindings": false,
  // 控制在打开设置时是否同时打开显示所有默认设置的编辑器。
  "workbench.settings.openDefaultSettings": false,
  // 控制设置编辑器的目录在搜索时的行为。
  //  - hide: 在搜索时隐藏目录。
  //  - filter: 筛选目录为仅显示含有匹配设置的类别。单击一个类别将仅显示该类别的结果。
  "workbench.settings.settingsSearchTocBehavior": "filter",
  // 控制在将设置编辑为 json 时是否使用拆分 json 编辑器。
  "workbench.settings.useSplitJSON": false,
  // 控制侧边栏和活动栏的位置。它们可以显示在工作台的左侧或右侧。
  "workbench.sideBar.location": "left",
  // 在没有从上一会话中恢复出信息的情况下，控制启动时显示的编辑器。
  //  - none: 在启动时不打开编辑器。
  //  - welcomePage: 打开包含帮助开始使用 VS Code 和扩展内容的欢迎页面。
  //  - readme: 当打开包含自述文件的文件夹时，请打开自述文件，否则会回退到 'welcomePage'。请注意: 仅在作为全局 配置时才遵守此操作，如果在工作区或文件夹配置中进行设置，则此将被忽略。
  //  - newUntitledFile: 打开一个新的无标题文件(仅在打开一个空窗口时适用)。
  //  - welcomePageInEmptyWorkbench: 在打开空工作区时打开欢迎页面。
  "workbench.startupEditor": "welcomePage",
  // 控制工作台底部状态栏的可见性。
  "workbench.statusBar.visible": true,
  // 启用后，当没有打开编辑器时将显示水印提示。
  "workbench.tips.enabled": true,
  // 控制在单击文件夹名称时如何扩展树文件夹。请注意，如果不适用，某些树和列表可能会选择忽略此设置。
  "workbench.tree.expandMode": "singleClick",
  // 控制树缩进(以像素为单位)。
  "workbench.tree.indent": 8,
  // 控制树是否应呈现缩进参考线。
  "workbench.tree.renderIndentGuides": "onHover",
  // 启用后，在受信任的工作区中打开链接时，将显示受信任的域提示。
  "workbench.trustedDomains.promptInTrustedWorkspace": false,
  // 控制是否显示视图头部的操作项。视图头部操作项可以一直，或是仅当聚焦到和悬停在视图上时显示。
  "workbench.view.alwaysShowHeaderActions": false,
  // 启用后，入门页面将包含指向视频教程的其他链接。
  "workbench.welcomePage.experimental.videoTutorials": "off",
  // 启用后，减少欢迎页中的移动。
  "workbench.welcomePage.preferReducedMotion": false,
  // 启用后，扩展的演练将在安装扩展时打开。
  "workbench.welcomePage.walkthroughs.openOnInstall": true,
  // 如果已设置，则根据 OS 外观自动切换到首选颜色主题。如果 OS 外观为深色，则使用 `workbench.preferredDarkColorTheme#` 处指定的主题。如果外观为浅色，则使用 `#workbench.preferredLightColorTheme` 处指定的主题。
  "window.autoDetectColorScheme": false,
  // 如果已启用，将自动更改为高对比度主题；如果操作系统正在使用高对比度主题。使用高对比度主题是由“#workbench.preferredHighContrastColorTheme#”指定的
  "window.autoDetectHighContrast": true,
  // 控制在关闭最后一个编辑器时是否关闭整个窗口。此设置仅适用于没有显示文件夹的窗口。
  "window.closeWhenEmpty": false,
  // 控制是否通过按 Alt 键聚焦菜单栏。此设置对使用 Alt 键切换菜单栏没有任何影响。
  "window.customMenuBarAltFocus": true,
  // 调整对话框窗口的外观。
  "window.dialogStyle": "native",
  // 如果启用, 双击标题栏中的应用程序图标将关闭窗口, 并且该窗口无法通过图标拖动。此设置仅在 "#window.titleBarStyle#" 设置为 "custom" 时生效。
  "window.doubleClickIconToClose": false,
  // 控制是否可通过 Alt 键快捷键打开主菜单。如果禁用助记符，则可将这些 Alt 键快捷键绑定到编辑器命令。
  "window.enableMenuBarMnemonics": true,
  // 控制菜单栏的可见性。“切换”设置表示隐藏菜单栏，按一次 Alt 键则将显示此菜单栏。“精简”设置会将菜单移入侧边栏。
  //  - classic: 菜单显示在窗口顶部，并且仅在全屏模式下隐藏。
  //  - visible: 即使在全屏模式下，菜单也始终显示在窗口顶部。
  //  - toggle: 菜单处于隐藏状态，但通过按 Alt 键可在窗口顶部显示。
  //  - hidden: 菜单始终隐藏。
  //  - compact: 菜单在侧边栏中显示为一个紧凑的按钮。当 "#window.titleBarStyle#" 为 "native" 时，将忽略此值。
  "window.menuBarVisibility": "classic",
  // 控制在已有窗口时新开窗口的尺寸。请注意，此设置对第一个打开的窗口无效。第一个窗口将始终恢复关闭前的大小和位置。
  //  - default: 在屏幕中心打开新窗口。
  //  - inherit: 以与上一个活动窗口相同的尺寸打开新窗口。
  //  - offset: 打开与上次活动窗口具有相同尺寸的新窗口，并带有偏移位置。
  //  - maximized: 打开最大化的新窗口。
  //  - fullscreen: 在全屏模式下打开新窗口。
  "window.newWindowDimensions": "default",
  // 控制是否在新窗口中打开文件。
  // 注意，此设置可能会被忽略 (例如，在使用 `--new-window` 或 `--reuse-window` 命令行选项时)。
  //  - on: 在新窗口中打开文件。
  //  - off: 在文件所在文件夹的已有窗口中或在上一个活动窗口中打开文件。
  //  - default: 在新窗口中打开文件，除非文件从应用程序内进行选取 (例如，通过“文件”菜单)。
  "window.openFilesInNewWindow": "off",
  // 控制打开文件夹时是在新窗口打开还是替换上一个活动窗口。
  // 注意，此设置可能会被忽略 (例如，在使用 `--new-window` 或 `--reuse-window` 命令行选项时)。
  //  - on: 在新窗口中打开文件夹。
  //  - off: 文件夹将替换上一个活动窗口。
  //  - default: 在新窗口中打开文件夹，除非文件夹从应用程序内进行选取 (例如，通过“文件”菜单)。
  "window.openFoldersInNewWindow": "default",
  // 在另一实例无参启动时，控制是打开新的空窗口或是聚焦到最后运行的实例。
  // 注意，此设置可能会被忽略 (例如，在使用 `--new-window` 或 `--reuse-window` 命令行选项时)。
  //  - on: 打开一个新的空窗口。
  //  - off: 聚焦到上一活动的运行实例。
  "window.openWithoutArgumentsInNewWindow": "on",
  // 若窗口在处于全屏模式时退出，控制其在恢复时是否还原到全屏模式。
  "window.restoreFullscreen": false,
  // 控制在第一次启动后窗口重新打开的方式。如果应用程序已在运行，则此设置不起任何作用。
  //  - preserve: 始终重新打开所有窗口。如果打开文件夹或工作区(例如从命令行打开)，它将作为新窗口打开，除非它之前已打开。如果打开文件，则这些文件将在其中一个已还原的窗口中打开。
  //  - all: 重新打开所有窗口，除非已打开文件夹、工作区或文件(例如从命令行)。
  //  - folders: 重新打开已打开文件夹或工作区的所有窗口，除非已打开文件夹、工作区或文件(例如从命令行)。
  //  - one: 重新打开上一个活动窗口，除非已打开文件夹、工作区或文件(例如从命令行)。
  //  - none: 从不重新打开窗口。如果文件夹或工作区未打开(例如从命令行)，将出现一个空窗口。
  "window.restoreWindows": "all",
  // 根据活动编辑器控制窗口标题。变量是根据上下文替换的:
  // - "${activeEditorShort}": 文件名 (例如 myFile.txt)。
  // - "${activeEditorMedium}": 相对于工作区文件夹的文件路径 (例如, myFolder/myFileFolder/myFile.txt)。
  // - "${activeEditorLong}": 文件的完整路径 (例如 /Users/Development/myFolder/myFileFolder/myFile.txt)。
  // - "${activeFolderShort}": 文件所在的文件夹名称 (例如, myFileFolder)。
  // - "${activeFolderMedium}": 相对于工作区文件夹的、包含文件的文件夹的路径, (例如 myFolder/myFileFolder)。
  // - "${activeFolderLong}": 文件所在文件夹的完整路径 (例如 /Users/Development/myFolder/myFileFolder)。
  // - "${folderName}": 文件所在工作区文件夹的名称 (例如 myFolder)。
  // - "${folderpath}": 文件所在工作区文件夹的路径 (例如 /Users/Development/myFolder)。
  // - "${rootName}": 打开的工作区或文件夹的名称 (例如 myFolder 或 myWorkspace)。
  // - "${rootPath}": 打开的工作区或文件夹的文件路径 (例如 /Users/Development/myWorkspace)。
  // - "${appName}": 例如 VS Code。
  // - “${remoteName}”: 例如 SSH
  // - `${dirty}`: 表明活动编辑器具有未保存更改的时间的指示器。
  // - "${separator}": 一种条件分隔符 ("-"), 仅在被包含值或静态文本的变量包围时显示。
  "window.title": "${dirty}${activeEditorShort}${separator}${rootName}${separator}${appName}",
  // 调整窗口标题栏的外观。在 Linux 和 Windows 上，此设置也会影响应用程序和上下文菜单的外观。更改需要完全重新启动才能应用。
  "window.titleBarStyle": "custom",
  // "window.title" 使用的分隔符。
  "window.titleSeparator": " - ",
  // 调整窗口的缩放级别。原始大小是 0，每次递增(例如 1)或递减(例如 -1)表示放大或缩小 20%。也可以输入小数以便以更精细的粒度调整缩放级别。
  "window.zoomLevel": 0,
  // 控制在打开禅模式时是否启用居中布局。
  "zenMode.centerLayout": true,
  // 控制在打开禅模式时是否将工作台切换到全屏。
  "zenMode.fullScreen": true,
  // 控制在打开禅模式时是否隐藏工作台左侧或右侧的活动栏。
  "zenMode.hideActivityBar": true,
  // 控制在打开禅模式时是否隐藏编辑器行号。
  "zenMode.hideLineNumbers": true,
  // 控制在打开禅模式时是否隐藏工作台底部的状态栏。
  "zenMode.hideStatusBar": true,
  // 控制在打开禅模式时是否隐藏工作台选项卡。
  "zenMode.hideTabs": true,
  // 若窗口在处于禅模式时退出，控制其在恢复时是否还原到禅模式。
  "zenMode.restore": true,
  // 控制在禅宗模式下是否显示通知。如果为 true，则只会弹出错误通知。
  "zenMode.silentNotifications": true,
  // 控制截屏模式键盘的字体大小(以像素为单位)。
  "screencastMode.fontSize": 56,
  // 控制截屏模式下键盘覆盖显示的时长(以毫秒为单位)。
  "screencastMode.keyboardOverlayTimeout": 800,
  // 控制显示快捷方式时键盘覆盖中显示的内容。
  //  - keys: 密钥。
  //  - command: 命令标题。
  //  - commandWithGroup: 以其组为前缀的命令标题。
  //  - commandAndKeys: 命令标题和密钥。
  //  - commandWithGroupAndKeys: 命令标题和密钥，其中命令以其组为前缀。
  "screencastMode.keyboardShortcutsFormat": "commandAndKeys",
  // 控制截屏视频模式下鼠标指示器的十六进制(#RGB、#RGBA、#RRGGBB 或 #RRGGBBAA)的颜色。
  "screencastMode.mouseIndicatorColor": "#FF0000",
  // 控制截屏模式下鼠标光标的大小(以像素为单位)。
  "screencastMode.mouseIndicatorSize": 20,
  // 仅在截屏模式下显示键盘快捷方式。
  "screencastMode.onlyKeyboardShortcuts": false,
  // 控制截屏模式叠加的垂直偏移,从底部作为工作台高度的百分比。
  "screencastMode.verticalOffset": 20,
  // 配置语言的文件关联 (如: `"*.extension": "html"`)。这些关联的优先级高于已安装语言的默认关联。
  "files.associations": {},
  // 启用后，编辑器将尝试在打开文件时猜测字符集编码。此设置也可以按语言配置。请注意，文本搜索不遵守此设置。仅遵守 “#files.encoding#”。
  "files.autoGuessEncoding": false,
  // 控制具有未保存更改的编辑器的 [自动保存](https://code.visualstudio.com/docs/editor/codebasics#_save-auto-save)。
  //  - off: 具有更改的编辑器永远不会自动保存。
  //  - afterDelay: 在配置的 `files.autoSaveDelay` 之后，会自动保存具有更改的编辑器。
  //  - onFocusChange: 当编辑器失去焦点时，会自动保存具有更改的编辑器。
  //  - onWindowChange: 当窗口失去焦点时，会自动保存具有更改的编辑器。
  "files.autoSave": "off",
  // 控制自动保存具有未保存更改的编辑器之前的延迟(以毫秒为单位)。只有当 `files.autoSave` 设置为 `afterDelay` 时才适用。
  "files.autoSaveDelay": 1000,
  // 分配给新文件的默认语言标识符。如果配置为 "${activeEditorLanguage}"，将使用当前活动文本编辑器(如果有)的语言标识符。
  "files.defaultLanguage": "",
  // 在删除文件或文件夹时，将它们移动到操作系统的“废纸篓”中 (Windows 为“回收站”)。禁用此设置将永久删除文件或文件夹。
  "files.enableTrash": true,
  // 在读取和写入文件时使用的默认字符集编码。可以按语言对此项进行配置。
  //  - utf8: UTF-8
  //  - utf8bom: UTF-8 with BOM
  //  - utf16le: UTF-16 LE
  //  - utf16be: UTF-16 BE
  //  - windows1252: Western (Windows 1252)
  //  - iso88591: Western (ISO 8859-1)
  //  - iso88593: Western (ISO 8859-3)
  //  - iso885915: Western (ISO 8859-15)
  //  - macroman: Western (Mac Roman)
  //  - cp437: DOS (CP 437)
  //  - windows1256: Arabic (Windows 1256)
  //  - iso88596: Arabic (ISO 8859-6)
  //  - windows1257: Baltic (Windows 1257)
  //  - iso88594: Baltic (ISO 8859-4)
  //  - iso885914: Celtic (ISO 8859-14)
  //  - windows1250: Central European (Windows 1250)
  //  - iso88592: Central European (ISO 8859-2)
  //  - cp852: Central European (CP 852)
  //  - windows1251: Cyrillic (Windows 1251)
  //  - cp866: Cyrillic (CP 866)
  //  - iso88595: Cyrillic (ISO 8859-5)
  //  - koi8r: Cyrillic (KOI8-R)
  //  - koi8u: Cyrillic (KOI8-U)
  //  - iso885913: Estonian (ISO 8859-13)
  //  - windows1253: Greek (Windows 1253)
  //  - iso88597: Greek (ISO 8859-7)
  //  - windows1255: Hebrew (Windows 1255)
  //  - iso88598: Hebrew (ISO 8859-8)
  //  - iso885910: Nordic (ISO 8859-10)
  //  - iso885916: Romanian (ISO 8859-16)
  //  - windows1254: Turkish (Windows 1254)
  //  - iso88599: Turkish (ISO 8859-9)
  //  - windows1258: Vietnamese (Windows 1258)
  //  - gbk: Simplified Chinese (GBK)
  //  - gb18030: Simplified Chinese (GB18030)
  //  - cp950: Traditional Chinese (Big5)
  //  - big5hkscs: Traditional Chinese (Big5-HKSCS)
  //  - shiftjis: Japanese (Shift JIS)
  //  - eucjp: Japanese (EUC-JP)
  //  - euckr: Korean (EUC-KR)
  //  - windows874: Thai (Windows 874)
  //  - iso885911: Latin/Thai (ISO 8859-11)
  //  - koi8ru: Cyrillic (KOI8-RU)
  //  - koi8t: Tajik (KOI8-T)
  //  - gb2312: Simplified Chinese (GB 2312)
  //  - cp865: Nordic DOS (CP 865)
  //  - cp850: Western European DOS (CP 850)
  "files.encoding": "utf8",
  // 默认行尾字符。
  //  - \n: LF
  //  - \r\n: CRLF
  //  - auto: 使用具体操作系统规定的行末字符。
  "files.eol": "auto",
  // 配置 [glob 模式](https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options)以排除文件和文件夹。例如，文件资源管理器根据此设置决定要显示或隐藏的文件和文件夹。请参阅 "#search.exclude#" 设置以定义特定于搜索的排除。
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/Thumbs.db": true
  },
  // 控制是否在会话间记住未保存的文件，以允许在退出编辑器时跳过保存提示。
  //  - off: 禁用热退出。当尝试关闭具有未保存更改的编辑器的窗口时，将显示提示。
  //  - onExit: 触发 "workbench.action.quit" 命令(命令面板、键绑定、菜单)或在 Windows/Linux 上关闭最后一个窗口时，将触发热退出。所有未打开文件夹的窗口都将在下次启动时恢复。可通过“文件”>“打开最近使用的文件”>“更多…”，访问之前打开的窗口(包含未保存的文件)列表
  //  - onExitAndWindowClose: 触发 "workbench.action.quit" 命令(命令面板、键绑定、菜单)或在 Windows/Linux 上关闭最后一个窗口时将触发热退出，还将对已打开文件夹的所有窗口触发热退出(无论是否是最后一个窗口)。所有未打开文件夹的窗口将在下次启动时恢复。可通过“文件”>“打开最近使用的文件”>“更多…”，访问之前打开的窗口(包含未保存的文件)列表
  "files.hotExit": "onExit",
  // 启用后，保存文件时在文件末尾插入一个最终新行。
  "files.insertFinalNewline": false,
  // 在打开大型文件时，控制 VS Code 可在重启后使用的内存。在命令行中指定 `--max-memory=新的大小` 参数可达到相同效果。
  "files.maxMemoryForLargeFilesMB": 4096,
  // 超时(以毫秒为单位)后，将取消创建、重命名和删除的文件参与者。使用"0"禁用参与者。
  "files.participants.timeout": 60000,
  // 重新打开文件后，还原撤消堆栈。
  "files.restoreUndoStack": true,
  // 当文件保存到磁盘上并被另一个程序更改时，可能会发生保存冲突。 为了防止数据丢失，要求用户将编辑器中的更改与磁盘上的版本进行比较。 仅当经常遇到保存冲突错误时，才应更改此设置；如果不谨慎使用，可能会导致数据丢失。
  //  - askUser: 将拒绝保存并请求手动解决保存冲突。
  //  - overwriteFileOnDisk: 将通过在编辑器中用更改覆盖磁盘上的文件来解决保存冲突。
  "files.saveConflictResolution": "askUser",
  // 启用简单文件对话框。启用时，简单文件对话框将替换系统文件对话框。
  "files.simpleDialog.enable": false,
  // 启用后，保存文件时将删除在最终新行后的所有新行。
  "files.trimFinalNewlines": false,
  // 启用后，将在保存文件时删除行尾的空格。
  "files.trimTrailingWhitespace": false,
  // 配置要从文件观察中排除的路径或 glob 模式。相对路径(例如“build/output”)将使用当前打开的工作区解析为绝对路径。Glob 模式必须在绝对路径(即前缀为 “**/” 或完整路径和后缀为 “/**” 以匹配路径中的文件)上匹配，才能正确匹配(例如 “**/build/output/**” 或 “/Users/name/workspaces/project/build/output/**”)。当遇到文件观察程序进程消耗大量 CPU 时，请确保排除不太相关的大型文件夹(例如生成输出文件夹)。
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true,
    "**/.hg/store/**": true
  },
  // 配置额外路径以监视工作区内的更改。默认情况下，将以递归方式监视所有工作区文件夹，但符号链接的文件夹除外。可以显式添加绝对路径或相对路径，以支持作为符号链接的监视文件夹。将使用当前打开的工作区将相对路径解析为绝对路径。
  "files.watcherInclude": [],
  // 控制资源管理器是否在打开文件时自动显示并选择。
  //  - true: 将显示和选择文件。
  //  - false: 不会显示和选择文件。
  //  - focusNoScroll: 文件不会滚动到视图中，但仍会获得焦点。
  "explorer.autoReveal": true,
  // 控制资源管理器是否应以紧凑形式呈现文件夹。在这种形式中，单个子文件夹将被压缩在组合的树元素中。例如，对 Java 包结构很有用。
  "explorer.compactFolders": true,
  // 控制资源管理器是否在把文件删除到废纸篓时进行确认。
  "explorer.confirmDelete": true,
  // 控制在资源管理器内拖放移动文件或文件夹时是否进行确认。
  "explorer.confirmDragAndDrop": true,
  // 控制资源管理器是否应在撤消时要求确认。
  //  - verbose: 资源管理器将在所有撤消操作之前进行提示。
  //  - default: 资源管理器将在破坏性撤消操作之前进行提示。
  //  - light: 聚焦时，资源管理器将不会在撤消操作之前进行提示。
  "explorer.confirmUndo": "default",
  // 复制相对文件路径时使用的路径分隔字符。
  //  - /: 使用斜杠作为路径分隔字符。
  //  - \: 使用反斜杠作为路径分隔字符。
  //  - auto: 使用操作系统特定路径分隔字符。
  "explorer.copyRelativePathSeparator": "auto",
  // 控制文件修饰是否应使用徽章。
  "explorer.decorations.badges": true,
  // 控制文件修饰是否应使用颜色。
  "explorer.decorations.colors": true,
  // 控制浏览器是否允许通过拖放移动文件和文件夹。此设置仅影响从浏览器内部拖放。
  "explorer.enableDragAndDrop": true,
  // 控制资源管理器是否应支持撤消文件和文件夹操作。
  "explorer.enableUndo": true,
  // 控制资源管理器是否应在初始化过程中展开仅包含一个文件夹的多根工作区
  "explorer.expandSingleFolderWorkspaces": true,
  // 实验性。控制是否已在资源管理器中启用文件嵌套。文件嵌套允许目录中的相关文件在单个父文件下以可视方式组合在一起。
  "explorer.experimental.fileNesting.enabled": false,
  // 实验性。控制是否自动展开文件嵌套。必须设置 "#explorer.experimental.fileNesting.enabled#" 才能使此操作生效。
  "explorer.experimental.fileNesting.expand": true,
  // 实验性。控制资源管理器中文件的嵌套。必须设置 `explorer.experimental.fileNesting.enabled` 才能使此生效。每个键描述一个父文件模式，每个值都应该是将嵌套在父级下的子文件模式列表 (以逗号分隔)。
  //
  // 父模式中的单个 `*` 可用来捕获任何子字符串，然后可以使用子模式中的 `$​(capture)` 来匹配这些子字符串。子模式也可以包含一个 `*` 以匹配任何子字符串。
  //
  // 例如，假定配置 `*.ts => $(capture).js, $(capture).*.ts`，以及包含 `a.ts, a.js, a.d.ts` 和 `b.js` 的目录，嵌套将按如下方式应用:
  // - `*.ts` 与 `a.ts` 相匹配，捕获 `a`。这导致任何与 `a.js` 或 `a.*.ts` 匹配的同辈将嵌套在 `a.ts` 下
  //     - `a.js` 与 `a.js` 完全匹配，因此嵌套在 `a.ts` 下
  //     - `a.d.ts` 与 `a.*.ts` 匹配，因此嵌套在 `a.ts` 下
  //
  // 最终目录将以 `a.ts` 呈现，其中包含 `a.js` 和 `a.d.ts` 作为嵌套子级，而 `b.js` 作为普通文件。
  "explorer.experimental.fileNesting.patterns": {
    "*.ts": "$(capture).js, $(capture).*.ts",
    "*.js": "$(capture).js.map, $(capture).min.js, $(capture).d.ts",
    "*.jsx": "$(capture).js",
    "*.tsx": "$(capture).ts",
    "tsconfig.json": "tsconfig.*.json",
    "package.json": "package-lock.json, .npmrc, yarn.lock, .yarnrc, pnpm-lock.yaml"
  },
  // 选择在粘贴同名文件(夹)时要使用的重命名方式。
  //  - simple: 在重复名称的末尾附加单词“copy”，后面可能跟一个数字
  //  - smart: 在重复名称的末尾添加一个数字。如果某个号码已经是名称的一部分，请尝试增加该号码
  "explorer.incrementalNaming": "simple",
  // 控制编辑器在“打开编辑器”窗格中的排序顺序。
  //  - editorOrder: 编辑器按编辑器标签显示的顺序排列。
  //  - alphabetical: 编辑器在每个编辑器组内按选项卡名称以字母顺序排序。
  //  - fullPath: 编辑器在每个编辑器组内按完整路径以字母顺序排序。
  "explorer.openEditors.sortOrder": "editorOrder",
  // “打开编辑器”窗格中显示的编辑器的数量。将其设置为 0 将隐藏“打开编辑器”窗格。
  "explorer.openEditors.visible": 9,
  // 控制资源管理器中文件和文件夹基于属性的排序。启用 `explorer.experimental.fileNesting.enabled` 后，还控制嵌套文件的排序。
  //  - default: 按名称排列文件和文件夹。文件夹显示在文件前。
  //  - mixed: 按名称排列文件和文件夹。两者穿插显示。
  //  - filesFirst: 按名称排列文件和文件夹。文件显示在文件夹前。
  //  - type: 按拓展类型为文件和文件夹分组，然后按名称排列它们。文件夹显示在文件前。
  //  - modified: 按最后修改日期降序排列文件和文件夹。文件夹显示在文件前。
  //  - foldersNestsFiles: 文件和文件夹按其名称排序。文件夹显示在文件之前。具有嵌套子级的文件将显示在其他文件之前。
  "explorer.sortOrder": "default",
  // 在资源管理器中控制文件和文件夹名称的词典排序。
  //  - default: 将大写和小写名称混合在一起。
  //  - upper: 大写名称组合在一起，位于小写名称之前。
  //  - lower: 小写名称组合在一起，位于大写名称之前。
  //  - unicode: 名称按 unicode 顺序排序。
  "explorer.sortOrderLexicographicOptions": "default",
  // 在搜索视图中控制操作栏的位置。
  //  - auto: 当搜索视图较窄时将操作栏置于右侧，当搜索视图较宽时，将它紧接在内容之后。
  //  - right: 始终将操作栏放置在右侧。
  "search.actionsPosition": "right",
  // 控制是折叠还是展开搜索结果。
  //  - auto: 结果少于10个的文件将被展开。其他的则被折叠。
  //  - alwaysCollapse
  //  - alwaysExpand
  "search.collapseResults": "alwaysExpand",
  // 配置 [glob 模式](https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options)以在全文搜索和快速打开中排除文件和文件夹。从 "#files.exclude#" 设置继承所有 glob 模式。
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/*.code-search": true
  },
  // 控制是否在搜索中跟踪符号链接。
  "search.followSymlinks": true,
  // 此设置已弃用。可以改为将搜索图标拖到新位置。
  // 控制搜索功能是显示在侧边栏，还是显示在水平空间更大的面板区域。
  "search.location": "sidebar",
  // 搜索缓存保留在从不关闭的扩展主机中，因此不再需要此设置。
  // 启用后，搜索服务进程将保持活动状态，而不是在一个小时不活动后关闭。这将使文件搜索缓存保留在内存中。
  "search.maintainFileSearchCache": false,
  // 控制搜索结果的最大数目，可将其设置为 “null”(空)，以返回无限结果。
  "search.maxResults": 20000,
  // 控制新的“搜索: 在文件中查找”和“在文件夹中查找”操作发生的位置: 在边栏的搜索视图中或在搜索编辑器中发生
  //  - view: 在面板或边栏中的“搜索”视图中进行搜索。
  //  - reuseEditor: 在现有搜索编辑器(若有)中搜索，否则在新的搜索编辑器中进行搜索。
  //  - newEditor: 在新的搜索编辑器中搜索。
  "search.mode": "view",
  // 控制在快速打开中筛选时编辑器历史记录的排序顺序。
  //  - default: 历史记录条目按与筛选值的相关性排序。首先显示更相关的条目。
  //  - recency: 历史记录条目按最近时间排序。首先显示最近打开的条目。
  "search.quickOpen.history.filterSortOrder": "default",
  // 是否在 Quick Open 的文件结果中包含最近打开的文件。
  "search.quickOpen.includeHistory": true,
  // 控制 Quick Open 文件结果中是否包括全局符号搜索的结果。
  "search.quickOpen.includeSymbols": false,
  // 创建新的搜索编辑器时要使用的周围上下文行的默认数目。如果使用 "#search.searchEditor.reusePriorSearchConfiguration#"，则可将它设置为 "null" (空)，以使用搜索编辑器之前的配置。
  "search.searchEditor.defaultNumberOfContextLines": 1,
  // 配置在搜索编辑器中双击结果的效果。
  //  - selectWord: 双击选择光标下的单词。
  //  - goToLocation: 双击将在活动编辑器组中打开结果。
  //  - openLocationToSide: 双击将在编辑器组中的结果打开到一边，如果尚不存在，则创建一个结果。
  "search.searchEditor.doubleClickBehaviour": "goToLocation",
  // 启用后，新的搜索编辑器将重用之前打开的搜索编辑器的包含、排除和标志。
  "search.searchEditor.reusePriorSearchConfiguration": false,
  // 在键入时搜索所有文件。
  "search.searchOnType": true,
  // 启用"#search.searchOnType"后，控制键入的字符与开始搜索之间的超时(以毫秒为单位)。禁用"搜索.searchOnType"时无效。
  "search.searchOnTypeDebouncePeriod": 300,
  // 聚焦搜索视图时，将搜索查询更新为编辑器的所选文本。单击时或触发 "workbench.views.search.focus" 命令时会发生此情况。
  "search.seedOnFocus": false,
  // 当活动编辑器没有选定内容时，从离光标最近的字词开始进行种子设定搜索。
  "search.seedWithNearestWord": false,
  // 控制是否显示搜索结果所在的行号。
  "search.showLineNumbers": false,
  // 若搜索词全为小写，则不区分大小写进行搜索，否则区分大小写进行搜索。
  "search.smartCase": false,
  // 控制搜索结果的排序顺序。
  //  - default: 结果按文件夹和文件名按字母顺序排序。
  //  - fileNames: 结果按文件名排序，忽略文件夹顺序，按字母顺序排列。
  //  - type: 结果按文件扩展名的字母顺序排序。
  //  - modified: 结果按文件的最后修改日期按降序排序。
  //  - countDescending: 结果按每个文件的计数降序排序。
  //  - countAscending: 结果按每个文件的计数以升序排序。
  "search.sortOrder": "default",
  // 控制在搜索文件时是否使用全局 “.gitignore” 和 “.ignore” 文件。需要启用 “#search.useIgnoreFiles#”。
  "search.useGlobalIgnoreFiles": false,
  // 控制在搜索文件时是否使用 `.gitignore` 和 `.ignore` 文件。
  "search.useIgnoreFiles": true,
  // 控制在搜索文件时是否在父目录中使用 ".gitignore" 和 ".ignore" 文件。需要启用 "#search.useIgnoreFiles#"。
  "search.useParentIgnoreFiles": false,
  // 弃用。当使用仅 PCRE2 支持的正则表达式功能时，将自动使用 PCRE2。
  // 是否在文本搜索中使用 pcre2 正则表达式引擎。这允许使用一些高级正则表达式功能, 如前瞻和反向引用。但是, 并非所有 pcre2 功能都受支持-仅支持 javascript 也支持的功能。
  "search.usePCRE2": false,
  // 控制在选择或替换匹配项时是否打开“替换预览”视图。
  "search.useReplacePreview": true,
  // 已弃用。请考虑使用 "search.usePCRE2" 获取对高级正则表达式功能的支持。
  // 此设置已被弃用，将回退到 "search.usePCRE2"。
  "search.useRipgrep": true,
  // 此设置已弃用，请改用“update.mode”。
  // 配置是否接收自动更新。更改后需要重新启动。更新是从微软在线服务获取的。
  "update.channel": "default",
  // 启用在 Windows 上后台下载和安装新的 VS Code 版本。
  "update.enableWindowsBackgroundUpdates": true,
  // 配置是否接收自动更新。更改后需要重新启动。更新是从微软在线服务获取的。
  //  - none: 禁用更新。
  //  - manual: 禁用自动后台更新检查。如果手动检查更新，更新将可用。
  //  - start: 仅在启动时检查更新。禁用自动后台更新检查。
  //  - default: 启用自动更新检查。代码将定期自动检查更新。
  "update.mode": "default",
  // 在更新后显示发行说明。发行说明将从 Microsoft 联机服务中获取。
  "update.showReleaseNotes": true,
  // 要使用的代理设置。如果未设置，则将从 "http_proxy" 和 "https_proxy" 环境变量中继承。
  "http.proxy": "",
  // 要作为每个网络请求的 "Proxy-Authorization" 标头发送的值。
  "http.proxyAuthorization": null,
  // 控制是否根据提供的 CA 列表验证代理服务器证书。
  "http.proxyStrictSSL": true,
  // 对扩展使用代理支持。
  //  - off: 禁用对扩展的代理支持。
  //  - on: 为扩展启用代理支持。
  //  - fallback: 在未找到代理的情况下，启用扩展的代理支持，回退到请求选项。
  //  - override: 为扩展启用代理支持，覆盖请求选项。
  "http.proxySupport": "override",
  // 控制是否应从操作系统加载 CA 证书。(在 Windows 和 macOS 上, 关闭此窗口后需要重新加载窗口。)
  "http.systemCertificates": true,
  // 允许在任何文件中设置断点。
  "debug.allowBreakpointsEverywhere": false,
  // 如果存在活动调试会话，控制是否确认窗口关闭时间。
  //  - never: 从不确认。
  //  - always: 始终确认是否存在调试会话。
  "debug.confirmOnExit": "never",
  // 控制是否应在调试控制台中输入时接受建议。enter 还用于评估调试控制台中键入的任何内容。
  "debug.console.acceptSuggestionOnEnter": "off",
  // 控制调试控制台是否应在调试会话结束时自动关闭。
  "debug.console.closeOnEnd": false,
  // 控制调试控制台是否应折叠相同的行，并显示出现次数和徽章。
  "debug.console.collapseIdenticalLines": true,
  // 控制调试控制台中的字体系列。
  "debug.console.fontFamily": "default",
  // 控制调试控制台中的字体大小(以像素为单位)。
  "debug.console.fontSize": 14,
  // 控制调试控制台是否应建议以前键入的输入。
  "debug.console.historySuggestions": true,
  // 设置调试控制台中的行高(以像素为单位)。使用 0 来计算从字体大小开始的行高。
  "debug.console.lineHeight": 0,
  // 控制是否应在调试控制台中换行。
  "debug.console.wordWrap": true,
  // 在反汇编视图中显示源代码。
  "debug.disassemblyView.showSourceCode": true,
  // 控制当调试器中断时，工作台窗口是否应获得焦点。
  "debug.focusWindowOnBreak": true,
  // 当处于调试过程中时，在编辑器中内联显示变量值。
  //  - true: 在调试时，始终在编辑器中内联显示变量值。
  //  - false: 在调试时，绝不在编辑器中内联显示变量值。
  //  - auto: 如果语言支持内联值位置，则在调试时在编辑器中内联显示变量值。
  "debug.inlineValues": "auto",
  // 控制何时打开内部调试控制台。
  "debug.internalConsoleOptions": "openOnFirstSessionStart",
  // 控制在运行预启动任务后遇到错误时应该怎么做。
  //  - debugAnyway: 忽略任务错误并开始调试。
  //  - showErrors: 显示问题视图且不开始调试。
  //  - prompt: 提示用户。
  //  - abort: 取消调试。
  "debug.onTaskErrors": "prompt",
  // 控制何时打开“调试”视图。
  "debug.openDebug": "openOnDebugBreak",
  // 在调试会话结束时自动打开资源管理器视图。
  "debug.openExplorerOnEnd": false,
  // 控制在启动调试会话前要保存哪些编辑器。
  //  - allEditorsInActiveGroup: 在启动调试会话之前，保存活动组中的所有编辑器。
  //  - nonUntitledEditorsInActiveGroup: 在启动调试会话之前，保存活动组中的所有编辑器(无标题的编辑器除外)。
  //  - none: 在启动调试会话之前，不保存任何编辑器。
  "debug.saveBeforeStart": "allEditorsInActiveGroup",
  // 控制断点是否应显示在概览标尺中。
  "debug.showBreakpointsInOverviewRuler": false,
  // 控制调试时是否应在编辑器中显示内联断点候选修饰。
  "debug.showInlineBreakpointCandidates": true,
  // 控制何时显示调试状态栏。
  //  - never: 在状态栏中不再显示调试
  //  - always: 始终在状态栏中显示调试
  //  - onFirstSessionStart: 仅于第一次启动调试后在状态栏中显示调试
  "debug.showInStatusBar": "onFirstSessionStart",
  // 控制调试子会话是否显示在调试工具栏中。当此设置为 false 时, 子会话上的 stop 命令也将停止父会话。
  "debug.showSubSessionsInToolBar": false,
  // 在集成或外部终端中启动新的调试会话之前，请清除终端。
  "debug.terminal.clearBeforeReusing": false,
  // 控制调试工具栏的位置。可在所有视图中“浮动”、在调试视图中“停靠”，也可“隐藏”。
  "debug.toolBarLocation": "floating",
  // 全局调试启动配置。应当作为跨工作区共享的 \"launch.json\" 的替代方法。
  "launch": {
    "configurations": [],
    "compounds": []
  },
  // 控制评论面板应何时打开。
  "comments.openPanel": "openOnSessionStartWithComments",
  // 确定是否在注释时间戳中使用相对时间，(例如"1 天前")。
  "comments.useRelativeTime": true,
  // 启用/禁用 HTML 标记的自动关闭。
  "html.autoClosingTags": true,
  // 启用/禁用自动创建 HTML 属性分配的引号。可通过 #html.completion.attributeDefaultValue#”配置引号类型。
  "html.autoCreateQuotes": true,
  // 控制接受完成时属性的默认值。
  //  - doublequotes: 属性值设置为 ""。
  //  - singlequotes: 属性值设置为 ''。
  //  - empty: 未设置属性值。
  "html.completion.attributeDefaultValue": "doublequotes",
  // 一个相对文件路径列表，这些路径指向采用[自定义数据格式](https://github.com/microsoft/vscode-html-languageservice/blob/master/docs/customData.md)的 JSON 文件。
  //
  // VS Code 在启动时加载自定义数据，从而增强它对你在 JSON 文件中指定的自定义 HTML 标记、属性和属性值的 HTML 支持。
  //
  // 文件路径与工作区相对，且仅考虑工作区文件夹设置。
  "html.customData": [],
  // 标记列表(用逗号隔开)，其中内容不应重新格式化。"null" 默认为 "pre" 标记。
  "html.format.contentUnformatted": "pre,code,textarea",
  // 启用或禁用默认 HTML 格式化程序。
  "html.format.enable": true,
  // 以新行结束。
  "html.format.endWithNewline": false,
  // 以逗号分隔的标记列表，其中的标记之前将有额外新行。若为 `null`，默认包含 `"head, body, /html"`。
  "html.format.extraLiners": "head, body, /html",
  // 对 `{{#foo}}` 和 `{{/foo}}` 进行格式化与缩进。
  "html.format.indentHandlebars": false,
  // 缩进 "<head>" 和 "<body>" 部分。
  "html.format.indentInnerHtml": false,
  // 保留在一个区块中的换行符的最大数量。若为 `null`，则没有限制。
  "html.format.maxPreserveNewLines": null,
  // 控制是否保留元素前已有的换行符。仅适用于元素前，不适用于标记内或文本。
  "html.format.preserveNewLines": true,
  // 接受 django、erb、handlebars 和 php 模板化语言标记。
  "html.format.templating": false,
  // 以逗号分隔的标记列表，其中的内容不会被重新格式化。若为 `null`，默认包含所有列于 https://www.w3.org/TR/html5/dom.html#phrasing-content 的标记。
  "html.format.unformatted": "wbr",
  // 在此字符串之间保留文本内容。
  "html.format.unformattedContentDelimiter": "",
  // 对属性进行换行。
  //  - auto: 仅在超出行长度时才对属性进行换行。
  //  - force: 对除第一个属性外的其他每个属性进行换行。
  //  - force-aligned: 对除第一个属性外的其他每个属性进行换行，并保持对齐。
  //  - force-expand-multiline: 对每个属性进行换行。
  //  - aligned-multiple: 当超出折行长度时，将属性进行垂直对齐。
  //  - preserve: 保留属性的包装。
  //  - preserve-aligned: 保留属性的包装，但对齐。
  "html.format.wrapAttributes": "auto",
  // 将包装的属性缩进到 N 个字符之后。使用 `null` 来使用默认缩进大小。如果将 `html.format.wrapAttributes` 设置为 “aligned”，则忽略此项。
  "html.format.wrapAttributesIndentSize": null,
  // 每行最大字符数(0 = 禁用)。
  "html.format.wrapLineLength": 120,
  // 在悬停时显示标记和属性文档。
  "html.hover.documentation": true,
  // 在悬停时显示 MDN 的引用。
  "html.hover.references": true,
  // 已弃用，请改用 "editor.linkedEditing"
  // 在匹配的 HTML 标记上启用/禁用镜像光标。
  "html.mirrorCursorOnMatchingTag": false,
  // 配置内置 HTML 语言支持是否建议 HTML5 标记、属性和值。
  "html.suggest.html5": true,
  // 跟踪 VS Code 与 HTML 语言服务器之间的通信。
  "html.trace.server": "off",
  // 配置内置的 HTML 语言支持是否对嵌入的脚本进行验证。
  "html.validate.scripts": true,
  // 配置内置 HTML 语言支持是否对嵌入的样式进行验证。
  "html.validate.styles": true,
  // 已弃用设置 "json.colorDecorators.enable"，请改用 "editor.colorDecorators"。
  // 启用或禁用颜色修饰器
  "json.colorDecorators.enable": true,
  // 启用或禁用默认 JSON 格式化程序。
  "json.format.enable": true,
  // 计算的大纲符号和折叠区域的最大数量(因性能原因而受限)。
  "json.maxItemsComputed": 5000,
  // 启用后，可以从 http 和 https 位置提取 JSON 架构。
  "json.schemaDownload.enable": true,
  // 将架构关联到当前项目中的 JSON 文件。
  "json.schemas": [],
  // 跟踪 VS Code 和 JSON 语言服务器之间的通信。
  "json.trace.server": "off",
  // 控制应在哪里打开 Markdown 文件中的链接。
  //  - currentGroup: 打开活动编辑器组中的链接。
  //  - beside: 打开活动编辑器旁边的链接。
  "markdown.links.openLocation": "currentGroup",
  // 设置换行符在 Markdown 预览中的呈现方式。如果将其设置为 "true"，则将为段落内的新行创建一个 <br>。
  "markdown.preview.breaks": false,
  // 在 Markdown 预览中双击切换到编辑器。
  "markdown.preview.doubleClickToSwitchToEditor": true,
  // 控制 Markdown 预览中使用的字体系列。
  "markdown.preview.fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', 'Droid Sans', sans-serif",
  // 控制 Markdown 预览中使用的字号(以像素为单位)。
  "markdown.preview.fontSize": 14,
  // 控制 Markdown 预览中使用的行高。此数值与字号相关。
  "markdown.preview.lineHeight": 1.6,
  // 在 Markdown 预览中启用或禁用将类似 URL 的文本转换为链接的操作。
  "markdown.preview.linkify": true,
  // 在 Markdown 预览中标记当前的编辑器选定内容。
  "markdown.preview.markEditorSelection": true,
  // 控制如何打开 Markdown 预览中其他 Markdown 文件的链接。
  //  - inPreview: 尝试在 Markdown 预览中打开链接。
  //  - inEditor: 尝试在编辑器中打开链接。
  "markdown.preview.openMarkdownLinks": "inPreview",
  // 滚动 Markdown 预览时，更新其编辑器视图。
  "markdown.preview.scrollEditorWithPreview": true,
  // 滚动 Markdown 编辑器时，更新其预览视图。
  "markdown.preview.scrollPreviewWithEditor": true,
  // 在 Markdown 预览中启用或禁用一些与语言无关的替换和引文美化。
  "markdown.preview.typographer": false,
  // 要从 Markdown 预览使用的 CSS 样式表的 URL 或本地路径的列表。相对路径解释为相对于资源管理器中打开的文件夹。如果没有打开的文件夹，则解释为相对于 Markdown 文件的位置。所有 '\' 都需写为 '\\'。
  "markdown.styles": [],
  // 启用/禁用 Markdown 链接的路径建议
  "markdown.suggest.paths.enabled": true,
  // 对 Markdown 扩展启用调试日志记录。
  "markdown.trace": "off",
  // 控制是否启用内置 PHP 语言建议。支持对 PHP 全局变量和变量进行建议。
  "php.suggest.basic": true,
  // 启用/禁用内置的 PHP 验证。
  "php.validate.enable": true,
  // 指向 PHP 可执行文件。
  "php.validate.executablePath": null,
  // 不管 linter 是在 save 还是在 type 上运行。
  "php.validate.run": "onSave",
  // 启用/禁用 JSX 标记的自动关闭。
  "javascript.autoClosingTags": true,
  // 启用/禁用 JavaScript 格式化程序。
  "javascript.format.enable": true,
  // 定义逗号分隔符后面的空格处理。
  "javascript.format.insertSpaceAfterCommaDelimiter": true,
  // 定义构造函数关键字后面的空格处理方式。
  "javascript.format.insertSpaceAfterConstructor": false,
  // 定义匿名函数的函数关键字后面的空格处理。
  "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": true,
  // 定义控制流语句中关键字后面的空格处理。
  "javascript.format.insertSpaceAfterKeywordsInControlFlowStatements": true,
  // 定义空大括号中左括号后和右括号前的空格处理方式。
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingEmptyBraces": true,
  // 定义 JSX 表达式括号中左括号后和右括号前的空格处理方式。
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": false,
  // 定义非空大括号中左括号后和右括号前的空格处理方式。
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true,
  // 定义非空中括号的左括号后和右括号前的空格处理方式。
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": false,
  // 定义非空小括号的左括号后和右括号前的空格处理方式。
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": false,
  // 定义模板字符串括号中左括号后和右括号前的空格处理方式。
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": false,
  // 定义 for 语句中分号之后的空格处理方式。
  "javascript.format.insertSpaceAfterSemicolonInForStatements": true,
  // 定义二进制运算符后面的空格处理
  "javascript.format.insertSpaceBeforeAndAfterBinaryOperators": true,
  // 定义函数参数括号前的空格处理方式。
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
  // 定义控制块的左括号是否放置在新的一行。
  "javascript.format.placeOpenBraceOnNewLineForControlBlocks": false,
  // 定义函数的左大括号是否放置在新的一行。
  "javascript.format.placeOpenBraceOnNewLineForFunctions": false,
  // 定义非必要分号的处理方式。要求在工作区内使用 TypeScript 3.7 或更高版本。
  //  - ignore: 不要插入或删除任何分号。
  //  - insert: 在语句末尾插入分号。
  //  - remove: 删除不必要的分号。
  "javascript.format.semicolons": "ignore",
  // 为支持 `js/ts.implicitProjectConfig.checkJs`，已弃用此设置。
  // 启用或禁用 JavaScript 文件的语义检查。现有 `jsconfig.json` 或 `tsconfig.json` 文件将覆盖此设置。
  "javascript.implicitProjectConfig.checkJs": false,
  // 为支持 `js/ts.implicitProjectConfig.experimentalDecorators`，已弃用此设置。
  // 在不属于任何工程的 JavaScript 文件中启用或禁用 `experimentalDecorators`。现有 `jsconfig.json` 或 `tsconfig.json` 文件将覆盖此设置。
  "javascript.implicitProjectConfig.experimentalDecorators": false,
  // 启用/禁用枚举声明中成员值的嵌入提示:
  // ```typescript
  //
  // enum MyValue {
  //  A /* = 0 */;
  //  B /* = 1 */;
  // }
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  "javascript.inlayHints.enumMemberValues.enabled": false,
  // 启用/禁用函数签名上隐式返回类型的 inlay 提示:
  // ```typescript
  //
  // function foo() /* :number */ {
  //  return Date.now();
  // }
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  "javascript.inlayHints.functionLikeReturnTypes.enabled": false,
  // 启用/禁用参数名的 inlay 提示:
  // ```typescript
  //
  // parseInt(/* str: */ '123', /* radix: */ 8)
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  //  - none: 禁用参数名称提示。
  //  - literals: 仅启用文本参数的参数名称提示。
  //  - all: 启用文本和非文本参数的参数名称提示。
  "javascript.inlayHints.parameterNames.enabled": "none",
  // 对于文本与参数名称完全相同的参数，抑制其参数名称提示。
  "javascript.inlayHints.parameterNames.suppressWhenArgumentMatchesName": true,
  // 启用/禁用隐式参数类型的 inlay 提示:
  // ```typescript
  //
  // el.addEventListener('click', e /* :MouseEvent */ => ...)
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  "javascript.inlayHints.parameterTypes.enabled": false,
  // 在属性声明上启用/禁用隐式类型的内嵌提示:
  // ```typescript
  //
  // class Foo {
  //  prop /* :number */ = Date.now();
  // }
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  "javascript.inlayHints.propertyDeclarationTypes.enabled": false,
  // 启用/禁用隐式变量类型的 inlay 提示:
  // ```typescript
  //
  // const foo /* :number */ = Date.now();
  //
  // ```
  // 要求在工作区中使用 TypeScript 4.4+。
  "javascript.inlayHints.variableTypes.enabled": false,
  // 自动 import 语句中路径的首选样式。
  //  - shortest: 仅当有路径段少于相关导入路径段的不相关导入时，才首选不相关导入。
  //  - relative: 首选导入文件位置的相对路径。
  //  - non-relative: 根据在 `jsconfig.json` / `tsconfig.json` 中配置的 `baseUrl` 或 `paths` 首选不相关导入。
  //  - project-relative: 仅当相关导入路径将离开包或项目目录时，才首选不相关导入。需要在工作区中使用 TypeScript 4.2+。
  "javascript.preferences.importModuleSpecifier": "shortest",
  // 自动导入的首选路径结尾。需要在工作区中使用 TypeScript 4.5+。
  //  - auto: 使用项目设置选择默认值。
  //  - minimal: 将 "./component/index.js" 缩短为 "./component"。
  //  - index: 将 "./component/index.js" 缩短为 "./component/index"。
  //  - js: 不要缩短路径结尾;包括".js"扩展名。
  "javascript.preferences.importModuleSpecifierEnding": "auto",
  // JSX 属性完成的首选样式。
  //  - auto: 根据属性类型，在属性名称后插入 `={}` or `=""`。请参见 `javascript.preferences.quoteStyle`，控制用于字符串属性的引号样式。
  //  - braces: 在属性名称后插入 `={}`。
  //  - none: 仅插入属性名称。
  "javascript.preferences.jsxAttributeCompletionStyle": "auto",
  // 用于快速修复的首选引号样式。
  //  - auto: 从现有代码推断引号类型
  //  - single: 始终使用单引号: `'`
  //  - double: 始终使用双引号: `"`
  "javascript.preferences.quoteStyle": "auto",
  // 设置 "typescript.preferences.renameShorthandProperties" 已被弃用，取而代之的是 "typescript.preferences.useAliasesForRenames"
  // 允许/禁止在重命名期间向对象速记属性引入别名。需要在工作区中使用 TypeScript 3.4 或更高版本。
  "javascript.preferences.renameShorthandProperties": true,
  // 允许/禁止在重命名期间向对象速记属性引入别名。需要在工作区中使用 TypeScript 3.4 或更高版本。
  "javascript.preferences.useAliasesForRenames": true,
  // 启用/禁用在 JavaScript 文件中引用 CodeLens。
  "javascript.referencesCodeLens.enabled": false,
  // 启用/禁用在 JavaScript 文件中对所有函数的 CodeLens 引用。
  "javascript.referencesCodeLens.showOnAllFunctions": false,
  // 启用/禁用自动导入建议。
  "javascript.suggest.autoImports": true,
  // 启用/禁用类成员的代码段完成。需要在工作区中使用 TypeScript 4.5+
  "javascript.suggest.classMemberSnippets.enabled": true,
  // 完成函数的参数签名。
  "javascript.suggest.completeFunctionCalls": false,
  // 启用/禁用对完成 JSDoc 注释的建议。
  "javascript.suggest.completeJSDocs": true,
  // 启用或禁用自动完成建议。
  "javascript.suggest.enabled": true,
  // 启用/禁用显示可能未定义的值的完成情况，这些值会插入可选的链式调用。需要启用 TS 3.7+ 和严格的空检查。
  "javascript.suggest.includeAutomaticOptionalChainCompletions": true,
  // 在部分键入的导入语句上启用/禁用自动导入样式的补全。需要在工作区中使用 TypeScript 4.3+。
  "javascript.suggest.includeCompletionsForImportStatements": true,
  // 启用/禁用生成 JSDoc 模板的 "@return" 批注。需要在工作区中使用 TypeScript 4.2+。
  "javascript.suggest.jsdoc.generateReturns": true,
  // 启用/禁用在 JavaScript 建议中包含文件中的唯一名称。请注意，在使用`@ts-check`或`checkJs`进行语义检查的 JavaScript 代码中，名称建议始终处于禁用状态。
  "javascript.suggest.names": true,
  // 在 import 语句和 require 调用中，启用或禁用路径建议。
  "javascript.suggest.paths": true,
  // 启用或禁用编辑器中 JavaScript 文件的建议诊断。
  "javascript.suggestionActions.enabled": true,
  // 启用或禁用在 VS Code 中重命名或移动文件时自动更新导入路径的功能。
  //  - prompt: 在每次重命名时进行提示。
  //  - always: 始终自动更新路径。
  //  - never: 一律不要重命名路径，也不要提示。
  "javascript.updateImportsOnFileMove.enabled": "prompt",
  // 启用/禁用 JavaScript 验证。
  "javascript.validate.enable": true,
  // 启用或禁用 JavaScript 文件的语义检查。现有 `jsconfig.json` 或 `tsconfig.json` 文件将覆盖此设置。
  "js/ts.implicitProjectConfig.checkJs": false,
  // 在不属于任何工程的 JavaScript 文件中启用或禁用 `experimentalDecorators`。现有 `jsconfig.json` 或 `tsconfig.json` 文件将覆盖此设置。
  "js/ts.implicitProjectConfig.experimentalDecorators": false,
  // 在不属于项目的 JavaScript 和 TypeScript 文件中启用/禁用[严格函数类型](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)。现有 `jsconfig.json` 或 `tsconfig.json` 文件将替代此设置。
  "js/ts.implicitProjectConfig.strictFunctionTypes": true,
  // 在不属于项目的 JavaScript 和 TypeScript 文件中启用/禁用[严格 null 检查](https://www.typescriptlang.org/tsconfig#strictNullChecks)。现有 `jsconfig.json` 或 `tsconfig.json` 文件将替代此设置。
  "js/ts.implicitProjectConfig.strictNullChecks": false,
  // 启用/禁用 JSX 标记的自动关闭。
  "typescript.autoClosingTags": true,
  // 检查是否为 [自动类型获取](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_typings-and-automatic-type-acquisition) 安装了 npm 。
  "typescript.check.npmIsInstalled": true,
  // 禁用 [自动类型获取](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_typings-and-automatic-type-acquisition) 。自动类型获取可以从 npm 提取 `@types` 包来改进外部库的 IntelliSense。
  "typescript.disableAutomaticTypeAcquisition": false,
  // 允许提示用户对 Intellisense 使用在工作区中配置的 TypeScript 版本。
  "typescript.enablePromptUseWorkspaceTsdk": false,
  // 启用/禁用默认 TypeScript 格式化程序。
  "typescript.format.enable": true,
  // 定义逗号分隔符后面的空格处理。
  "typescript.format.insertSpaceAfterCommaDelimiter": true,
  // 定义构造函数关键字后面的空格处理方式。
  "typescript.format.insertSpaceAfterConstructor": false,
  // 定义匿名函数的函数关键字后面的空格处理。
  "typescript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": true,
  // 定义控制流语句中关键字后面的空格处理。
  "typescript.format.insertSpaceAfterKeywordsInControlFlowStatements": true,
  // 定义空大括号中左括号后和右括号前的空格处理方式。
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingEmptyBraces": true,
  // 定义 JSX 表达式括号中左括号后和右括号前的空格处理方式。
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": false,
  // 定义非空大括号中左括号后和右括号前的空格处理方式。
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true,
  // 定义非空中括号的左括号后和右括号前的空格处理方式。
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": false,
  // 定义非空小括号的左括号后和右括号前的空格处理方式。
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": false,
  // 定义模板字符串括号中左括号后和右括号前的空格处理方式。
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": false,
  // 定义 for 语句中分号之后的空格处理方式。
  "typescript.format.insertSpaceAfterSemicolonInForStatements": true,
  // 定义 TypeScript 中类型断言后的空格处理方式。
  "typescript.format.insertSpaceAfterTypeAssertion": false,
  // 定义二进制运算符后面的空格处理
  "typescript.format.insertSpaceBeforeAndAfterBinaryOperators": true,
  // 定义函数参数括号前的空格处理方式。
  "typescript.format.insertSpaceBeforeFunctionParenthesis": false,
  // 定义控制块的左括号是否放置在新的一行。
  "typescript.format.placeOpenBraceOnNewLineForControlBlocks": false,
  // 定义函数的左大括号是否放置在新的一行。
  "typescript.format.placeOpenBraceOnNewLineForFunctions": false,
  // 定义非必要分号的处理方式。要求在工作区内使用 TypeScript 3.7 或更高版本。
  //  - ignore: 不要插入或删除任何分号。
  //  - insert: 在语句末尾插入分号。
  //  - remove: 删除不必要的分号。
  "typescript.format.semicolons": "ignore",
  // 启用或禁用实现 CodeLens。此 CodeLens 显示接口的实现。
  "typescript.implementationsCodeLens.enabled": false,
  // 启用/禁用枚举声明中成员值的嵌入提示:
  // ```typescript
  //
  // enum MyValue {
  //  A /* = 0 */;
  //  B /* = 1 */;
  // }
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  "typescript.inlayHints.enumMemberValues.enabled": false,
  // 启用/禁用函数签名上隐式返回类型的 inlay 提示:
  // ```typescript
  //
  // function foo() /* :number */ {
  //  return Date.now();
  // }
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  "typescript.inlayHints.functionLikeReturnTypes.enabled": false,
  // 启用/禁用参数名的 inlay 提示:
  // ```typescript
  //
  // parseInt(/* str: */ '123', /* radix: */ 8)
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  //  - none: 禁用参数名称提示。
  //  - literals: 仅启用文本参数的参数名称提示。
  //  - all: 启用文本和非文本参数的参数名称提示。
  "typescript.inlayHints.parameterNames.enabled": "none",
  // 对于文本与参数名称完全相同的参数，抑制其参数名称提示。
  "typescript.inlayHints.parameterNames.suppressWhenArgumentMatchesName": true,
  // 启用/禁用隐式参数类型的 inlay 提示:
  // ```typescript
  //
  // el.addEventListener('click', e /* :MouseEvent */ => ...)
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  "typescript.inlayHints.parameterTypes.enabled": false,
  // 在属性声明上启用/禁用隐式类型的内嵌提示:
  // ```typescript
  //
  // class Foo {
  //  prop /* :number */ = Date.now();
  // }
  //
  // ```
  // 需要在工作区中使用 TypeScript 4.4+。
  "typescript.inlayHints.propertyDeclarationTypes.enabled": false,
  // 启用/禁用隐式变量类型的 inlay 提示:
  // ```typescript
  //
  // const foo /* :number */ = Date.now();
  //
  // ```
  // 要求在工作区中使用 TypeScript 4.4+。
  "typescript.inlayHints.variableTypes.enabled": false,
  // 设置在报告 JavaScript 和 TypeScript 错误时使用的区域设置。默认使用 VS Code 的区域设置。
  "typescript.locale": "",
  // Specifies the path to the npm executable used for [Automatic Type Acquisition](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_typings-and-automatic-type-acquisition).
  "typescript.npm": "",
  // 自动 import 语句中路径的首选样式。
  //  - shortest: 仅当有路径段少于相关导入路径段的不相关导入时，才首选不相关导入。
  //  - relative: 首选导入文件位置的相对路径。
  //  - non-relative: 根据在 `jsconfig.json` / `tsconfig.json` 中配置的 `baseUrl` 或 `paths` 首选不相关导入。
  //  - project-relative: 仅当相关导入路径将离开包或项目目录时，才首选不相关导入。需要在工作区中使用 TypeScript 4.2+。
  "typescript.preferences.importModuleSpecifier": "shortest",
  // 自动导入的首选路径结尾。需要在工作区中使用 TypeScript 4.5+。
  //  - auto: 使用项目设置选择默认值。
  //  - minimal: 将 "./component/index.js" 缩短为 "./component"。
  //  - index: 将 "./component/index.js" 缩短为 "./component/index"。
  //  - js: 不要缩短路径结尾;包括".js"扩展名。
  "typescript.preferences.importModuleSpecifierEnding": "auto",
  // 允许/禁止在 "package.json" 依赖项中搜索可用的自动导入。
  //  - auto: 根据预估的性能影响搜索依赖项。
  //  - on: 始终搜索依赖项。
  //  - off: 从不搜索依赖项。
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  // JSX 属性完成的首选样式。
  //  - auto: 根据属性类型，在属性名称后插入 `={}` or `=""`。请参见 `typescript.preferences.quoteStyle`，控制用于字符串属性的引号样式。
  //  - braces: 在属性名称后插入 `={}`。
  //  - none: 仅插入属性名称。
  "typescript.preferences.jsxAttributeCompletionStyle": "auto",
  // 用于快速修复的首选引号样式。
  //  - auto: 从现有代码推断引号类型
  //  - single: 始终使用单引号: `'`
  //  - double: 始终使用双引号: `"`
  "typescript.preferences.quoteStyle": "auto",
  // 设置 "typescript.preferences.renameShorthandProperties" 已被弃用，取而代之的是 "typescript.preferences.useAliasesForRenames"
  // 允许/禁止在重命名期间向对象速记属性引入别名。需要在工作区中使用 TypeScript 3.4 或更高版本。
  "typescript.preferences.renameShorthandProperties": true,
  // 允许/禁止在重命名期间向对象速记属性引入别名。需要在工作区中使用 TypeScript 3.4 或更高版本。
  "typescript.preferences.useAliasesForRenames": true,
  // 在 TypeScript 文件中启用或禁用引用 CodeLens。
  "typescript.referencesCodeLens.enabled": false,
  // 启用/禁用在 TypeScript 文件中的所有函数上引用 CodeLens。
  "typescript.referencesCodeLens.showOnAllFunctions": false,
  // 将风格检查的问题报告为警告。
  "typescript.reportStyleChecksAsWarnings": true,
  // 启用/禁用自动导入建议。
  "typescript.suggest.autoImports": true,
  // 启用/禁用类成员的代码段完成。需要在工作区中使用 TypeScript 4.5+
  "typescript.suggest.classMemberSnippets.enabled": true,
  // 完成函数的参数签名。
  "typescript.suggest.completeFunctionCalls": false,
  // 启用/禁用对完成 JSDoc 注释的建议。
  "typescript.suggest.completeJSDocs": true,
  // 启用或禁用自动完成建议。
  "typescript.suggest.enabled": true,
  // 启用/禁用显示可能未定义的值的完成情况，这些值会插入可选的链式调用。需要启用 TS 3.7+ 和严格的空检查。
  "typescript.suggest.includeAutomaticOptionalChainCompletions": true,
  // 在部分键入的导入语句上启用/禁用自动导入样式的补全。需要在工作区中使用 TypeScript 4.3+。
  "typescript.suggest.includeCompletionsForImportStatements": true,
  // 从 TS 服务器启用/禁用片段补全。需要在工作区中使用 TypeScript 4.3+。
  "typescript.suggest.includeCompletionsWithSnippetText": true,
  // 启用/禁用生成 JSDoc 模板的 "@return" 批注。需要在工作区中使用 TypeScript 4.2+。
  "typescript.suggest.jsdoc.generateReturns": true,
  // 在 import 语句和 require 调用中，启用或禁用路径建议。
  "typescript.suggest.paths": true,
  // 启用或禁用编辑器中 TypeScript 文件的建议诊断。
  "typescript.suggestionActions.enabled": true,
  // 启用或禁用偶尔出现的有关 JavaScript 和 TypeScript 的调查，帮助我们改善 VS Code 对两者的支持。
  "typescript.surveys.enabled": true,
  // 控制对 tsc 任务的自动检测。
  //  - on: 同时创建生成和监视任务。
  //  - off: 禁用此功能。
  //  - build: 仅创建单次运行编译任务。
  //  - watch: 仅创建编译和监视任务。
  "typescript.tsc.autoDetect": "on",
  // 指定 TypeScript 安装下用于 IntelliSense 的 tsserver 和 `lib*.d.ts` 文件的文件夹路径，例如: `./node_modules/typescript/lib`。
  //
  // - 当指定为用户设置时，`typescript.tsdk` 中的 TypeScript 版本会自动替换内置的 TypeScript 版本。
  // - 当指定为工作区设置时，`typescript.tsdk` 允许通过 `TypeScript: Select TypeScript version` 命令切换为对 IntelliSense 使用 TypeScript 的该工作区版本。
  //
  // 有关管理 TypeScript 版本的更多详细信息，请参阅 [TypeScript文档](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions)。
  "typescript.tsdk": "",
  // 允许将 TS 服务器性能跟踪保持到目录。这些跟踪文件可用于诊断 TS 服务器性能问题。日志可能包含你的项目中的文件路径、源代码和其他可能敏感的信息。
  "typescript.tsserver.enableTracing": false,
  // (实验性)启用项目范围的错误报告。
  "typescript.tsserver.experimental.enableProjectDiagnostics": false,
  // 将 TS 服务器的日志保存到一个文件。此日志可用于诊断 TS 服务器问题。日志可能包含你的项目中的文件路径、源代码和其他可能敏感的信息。
  "typescript.tsserver.log": "off",
  // 要分配给 TypeScript 服务器进程的最大内存量(MB)。
  "typescript.tsserver.maxTsServerMemory": 3072,
  // 其他用于搜索 TypeScript 语言服务插件的路径。
  "typescript.tsserver.pluginPaths": [],
  // 对发送到 TS 服务器的消息启用跟踪。此跟踪信息可用于诊断 TS 服务器问题。 跟踪信息可能包含你的项目中的文件路径、源代码和其他可能敏感的信息。
  "typescript.tsserver.trace": "off",
  // 此设置已弃用，取而代之的是“typescript.tsserver.useSyntaxServer”。
  // 允许/禁止生成单独的 TypeScript 服务器，该服务器可更快地响应与语法相关的操作，例如计算折叠或计算文档符号。需要在工作区中使用 TypeScript 3.4.0 或更高版本。
  "typescript.tsserver.useSeparateSyntaxServer": true,
  // 控制 TypeScript 是否启动专用服务器，以便更快地处理与语法相关的运算，如计算代码折叠。
  //  - always: 使用更加轻量级的语法服务器来处理所有 IntelliSense 运算。此语法服务器只能为打开的文件提供 IntelliSense。
  //  - never: 请不要使用专用的语法服务器。使用单个服务器来处理所有 IntelliSense 运算。
  //  - auto: 生成一个完整的服务器和一个专用于语法运算的轻量级服务器。语法服务器用于加快语法运算并在加载项目时提供 IntelliSense。
  "typescript.tsserver.useSyntaxServer": "auto",
  // 配置应使用哪些监视策略来跟踪文件和目录。需要在工作区中使用 TypeScript 3.8+。
  "typescript.tsserver.watchOptions": {},
  // 启用或禁用在 VS Code 中重命名或移动文件时自动更新导入路径的功能。
  //  - prompt: 在每次重命名时进行提示。
  //  - always: 始终自动更新路径。
  //  - never: 一律不要重命名路径，也不要提示。
  "typescript.updateImportsOnFileMove.enabled": "prompt",
  // 启用/禁用 TypeScript 验证。
  "typescript.validate.enable": true,
  // 通过[转到工作区中的符号](https://code.visualstudio.com/docs/editor/editingevolved#_open-symbol-by-name)来控制搜索的具体文件。
  //  - allOpenProjects: 在所有打开的 JavaScript 或 TypeScript 项目中搜索符号。需要在工作区中使用 TypeScript 3.9 或更高版本。
  //  - currentProject: 仅在当前 JavaScript 或 TypeScript 项目中搜索符号。
  "typescript.workspaceSymbols.scope": "allOpenProjects",
  // 配置何时自动打开“错误速览”视图。
  //  - failureAnywhere: 无论故障在何处，都自动打开。
  //  - failureInVisibleDocument: 在可见文档中测试失败时自动打开。
  //  - never: 从不自动打开。
  "testing.automaticallyOpenPeekView": "failureInVisibleDocument",
  // 控制是否在自动运行模式期间自动打开“速览”视图。
  "testing.automaticallyOpenPeekViewDuringAutoRun": false,
  // 将测试标记为过时并启动新运行后等待的时间(以毫秒为单位)。
  "testing.autoRun.delay": 1000,
  // 控制自动运行哪些测试。
  //  - all: 自动运行切换时，自动运行已发现的所有测试。在各个测试发生更改时重新运行它们。
  //  - rerun: 在各个测试发生更改时重新运行它们。不会自动运行尚未执行的任何测试。
  "testing.autoRun.mode": "all",
  // 控制在装订线中左键单击测试修饰时要执行的操作。
  //  - run: 运行测试。
  //  - debug: 调试测试。
  //  - contextMenu: 打开上下文菜单以获取更多选项。
  "testing.defaultGutterClickAction": "run",
  // 控制在测试资源管理器视图中是否应遵循正在运行的测试
  "testing.followRunningTest": true,
  // 控制是否在编辑器装订线中显示测试修饰。
  "testing.gutterEnabled": true,
  // 控制何时打开测试视图。
  //  - neverOpen: 从不自动打开测试视图
  //  - openOnTestStart: 在测试启动时打开测试视图
  //  - openOnTestFailure: 任何测试失败时打开测试视图
  "testing.openTesting": "openOnTestStart",
  // 控制是否在运行测试之前保存所有脏编辑器。
  "testing.saveBeforeTest": true,
  // 补全 CSS 属性时在行尾插入分号。
  "css.completion.completePropertyWithSemicolon": true,
  // 默认情况下，VS Code 在选择 CSS 属性后触发属性值完成。使用此设置可禁用此行为。
  "css.completion.triggerPropertyValueCompletion": true,
  // 一个相对文件路径列表，这些路径指向采用[自定义数据格式](https://github.com/microsoft/vscode-css-languageservice/blob/master/docs/customData.md)的 JSON 文件。
  //
  // VS Code 在启动时加载自定义数据，从而增强它对你在 JSON 文件中指定的自定义 CSS 属性、at 指令、伪类和伪元素的 CSS 支持。
  //
  // 这些文件路径与工作区相对，且只考虑工作区文件夹设置。
  "css.customData": [],
  // 在 CSS 悬停时显示标记和属性文档。
  "css.hover.documentation": true,
  // 在 CSS 悬停时显示 MDN 的引用。
  "css.hover.references": true,
  // 参数数目无效。
  "css.lint.argumentsInColorFunction": "error",
  // 在使用 `padding` 或 `border` 时，不要使用 `width` 或 `height`。
  "css.lint.boxModel": "ignore",
  // 使用厂商特定的前缀时，同时添加所有其他厂商特定的属性。
  "css.lint.compatibleVendorPrefixes": "ignore",
  // 不要使用重复的样式定义。
  "css.lint.duplicateProperties": "ignore",
  // 不要使用空规则集。
  "css.lint.emptyRules": "warning",
  // 避免使用 `float`。浮动会使 CSS 变得脆弱。即使只更改了一部分布局，也很容易造成破坏。
  "css.lint.float": "ignore",
  // `@font-face` 规则必须定义 `src` 和 `font-family` 属性。
  "css.lint.fontFaceProperties": "warning",
  // 十六进制颜色必须由三个或六个十六进制数字组成。
  "css.lint.hexColorLength": "error",
  // 选择器不应包含 ID，因为这些规则与 HTML 的耦合过于紧密。
  "css.lint.idSelector": "ignore",
  // 仅在需要支持 IE7 及更低版本时，才需要 IE hack。
  "css.lint.ieHack": "ignore",
  // 避免使用 `!important`。它表明整个 CSS 的优先级已经失去控制且需要进行重构。
  "css.lint.important": "ignore",
  // import 语句没有并行加载。
  "css.lint.importStatement": "ignore",
  // 由于 `display` 属性值，属性被忽略。例如，使用 `display: inline` 时，`width`、`height`、`margin-top`、`margin-bottom` 和 `float` 属性将不起作用。
  "css.lint.propertyIgnoredDueToDisplay": "warning",
  // 通配选择符 (`*`) 的运行效率低。
  "css.lint.universalSelector": "ignore",
  // 未知的 @ 规则。
  "css.lint.unknownAtRules": "warning",
  // 未知的属性。
  "css.lint.unknownProperties": "warning",
  // 未知的供应商特定属性。
  "css.lint.unknownVendorSpecificProperties": "ignore",
  // 不根据 "unknownProperties" 规则进行验证的属性列表。
  "css.lint.validProperties": [],
  // 使用厂商特定的前缀时，同时添加标准属性。
  "css.lint.vendorPrefix": "warning",
  // 零不需要单位。
  "css.lint.zeroUnits": "ignore",
  // 跟踪 VS Code 与 CSS 语言服务器之间的通信。
  "css.trace.server": "off",
  // 启用或禁用所有验证。
  "css.validate": true,
  // 补全 CSS 属性时在行尾插入分号。
  "less.completion.completePropertyWithSemicolon": true,
  // 默认情况下，VS Code 在选择 CSS 属性后触发属性值完成。使用此设置可禁用此行为。
  "less.completion.triggerPropertyValueCompletion": true,
  // 在 LESS 悬停时显示标记和属性文档。
  "less.hover.documentation": true,
  // 在 LESS 悬停时显示 MDN 的引用。
  "less.hover.references": true,
  // 参数数目无效。
  "less.lint.argumentsInColorFunction": "error",
  // 在使用 `padding` 或 `border` 时，不要使用 `width` 或 `height`。
  "less.lint.boxModel": "ignore",
  // 使用厂商特定的前缀时，同时添加所有其他厂商特定的属性。
  "less.lint.compatibleVendorPrefixes": "ignore",
  // 不要使用重复的样式定义。
  "less.lint.duplicateProperties": "ignore",
  // 不要使用空规则集。
  "less.lint.emptyRules": "warning",
  // 避免使用 `float`。浮动会使 CSS 变得脆弱。即使只更改了一部分布局，也很容易造成破坏。
  "less.lint.float": "ignore",
  // `@font-face` 规则必须定义 `src` 和 `font-family` 属性。
  "less.lint.fontFaceProperties": "warning",
  // 十六进制颜色必须由三个或六个十六进制数字组成。
  "less.lint.hexColorLength": "error",
  // 选择器不应包含 ID，因为这些规则与 HTML 的耦合过于紧密。
  "less.lint.idSelector": "ignore",
  // 仅在需要支持 IE7 及更低版本时，才需要 IE hack。
  "less.lint.ieHack": "ignore",
  // 避免使用 `!important`。它表明整个 CSS 的优先级已经失去控制且需要进行重构。
  "less.lint.important": "ignore",
  // import 语句没有并行加载。
  "less.lint.importStatement": "ignore",
  // 由于 `display` 属性值，属性被忽略。例如，使用 `display: inline` 时，`width`、`height`、`margin-top`、`margin-bottom` 和 `float` 属性将不起作用。
  "less.lint.propertyIgnoredDueToDisplay": "warning",
  // 通配选择符 (`*`) 的运行效率低。
  "less.lint.universalSelector": "ignore",
  // 未知的 @ 规则。
  "less.lint.unknownAtRules": "warning",
  // 未知的属性。
  "less.lint.unknownProperties": "warning",
  // 未知的供应商特定属性。
  "less.lint.unknownVendorSpecificProperties": "ignore",
  // 不根据 "unknownProperties" 规则进行验证的属性列表。
  "less.lint.validProperties": [],
  // 使用厂商特定的前缀时，同时添加标准属性。
  "less.lint.vendorPrefix": "warning",
  // 零不需要单位。
  "less.lint.zeroUnits": "ignore",
  // 启用或禁用所有验证。
  "less.validate": true,
  // 补全 CSS 属性时在行尾插入分号。
  "scss.completion.completePropertyWithSemicolon": true,
  // 默认情况下，VS Code 在选择 CSS 属性后触发属性值完成。使用此设置可禁用此行为。
  "scss.completion.triggerPropertyValueCompletion": true,
  // 在 SCSS 悬停时显示标记和属性文档。
  "scss.hover.documentation": true,
  // 在 SCSS 悬停时显示 MDN 的引用。
  "scss.hover.references": true,
  // 参数数目无效。
  "scss.lint.argumentsInColorFunction": "error",
  // 在使用 `padding` 或 `border` 时，不要使用 `width` 或 `height`。
  "scss.lint.boxModel": "ignore",
  // 使用厂商特定的前缀时，同时添加所有其他厂商特定的属性。
  "scss.lint.compatibleVendorPrefixes": "ignore",
  // 不要使用重复的样式定义。
  "scss.lint.duplicateProperties": "ignore",
  // 不要使用空规则集。
  "scss.lint.emptyRules": "warning",
  // 避免使用 `float`。浮动会使 CSS 变得脆弱。即使只更改了一部分布局，也很容易造成破坏。
  "scss.lint.float": "ignore",
  // `@font-face` 规则必须定义 `src` 和 `font-family` 属性。
  "scss.lint.fontFaceProperties": "warning",
  // 十六进制颜色必须由三个或六个十六进制数字组成。
  "scss.lint.hexColorLength": "error",
  // 选择器不应包含 ID，因为这些规则与 HTML 的耦合过于紧密。
  "scss.lint.idSelector": "ignore",
  // 仅在需要支持 IE7 及更低版本时，才需要 IE hack。
  "scss.lint.ieHack": "ignore",
  // 避免使用 `!important`。它表明整个 CSS 的优先级已经失去控制且需要进行重构。
  "scss.lint.important": "ignore",
  // import 语句没有并行加载。
  "scss.lint.importStatement": "ignore",
  // 由于 `display` 属性值，属性被忽略。例如，使用 `display: inline` 时，`width`、`height`、`margin-top`、`margin-bottom` 和 `float` 属性将不起作用。
  "scss.lint.propertyIgnoredDueToDisplay": "warning",
  // 通配选择符 (`*`) 的运行效率低。
  "scss.lint.universalSelector": "ignore",
  // 未知的 @ 规则。
  "scss.lint.unknownAtRules": "warning",
  // 未知的属性。
  "scss.lint.unknownProperties": "warning",
  // 未知的供应商特定属性。
  "scss.lint.unknownVendorSpecificProperties": "ignore",
  // 不根据 "unknownProperties" 规则进行验证的属性列表。
  "scss.lint.validProperties": [],
  // 使用厂商特定的前缀时，同时添加标准属性。
  "scss.lint.vendorPrefix": "warning",
  // 零不需要单位。
  "scss.lint.zeroUnits": "ignore",
  // 启用或禁用所有验证。
  "scss.validate": true,
  // 启用后，将自动检查扩展更新。若扩展存在更新，将在“扩展”视图中将其标记为过时扩展。更新将从 Microsoft 联机服务中获取。
  "extensions.autoCheckUpdates": true,
  // 控制扩展的自动更新行为。更新是从 Microsoft 联机服务中获取的。
  //  - true: 为所有扩展自动下载并安装更新。
  //  - onlyEnabledExtensions: 仅为已启用的扩展自动下载并安装更新。将不会自动更新已禁用的扩展。
  //  - false: 扩展不会自动更新。
  "extensions.autoUpdate": true,
  // 启用后，将在离开“扩展”视图时，自动关闭扩展详细信息页面。
  "extensions.closeExtensionDetailsOnViewChange": false,
  // 当此处列出扩展名时，该扩展名处理URI时将不会显示确认提示。
  "extensions.confirmedUriHandlerExtensionIds": [],
  // 启用后，将不会显示扩展建议的通知。
  "extensions.ignoreRecommendations": false,
  // 已弃用此设置。使用 extensions.ignoreRecommendations 设置来控制建议通知。默认使用“扩展”视图的可见性操作来隐藏“建议”视图。
  //
  "extensions.showRecommendationsOnlyOnDemand": false,
  // 替代扩展的不受信任的工作区支持。将始终启用使用 “true” 的扩展。将始终启用使用 “limited” 的扩展，并且扩展将隐藏需要信任的功能。仅当工作区受信任时才会启用使用 “false” 的扩展。
  "extensions.supportUntrustedWorkspaces": {},
  // 替代扩展的虚拟工作区支持。
  "extensions.supportVirtualWorkspaces": {
    "pub.name": false
  },
  // 启用 Web Worker 扩展主机。
  //  - true: Web 辅助角色扩展主机将始终启动。
  //  - false: Web 辅助角色扩展主机将永远不会启动。
  //  - auto: Web 辅助角色扩展主机将在 Web 扩展需要时启动。
  "extensions.webWorker": "auto",
  // 同步时要忽略的扩展列表。扩展的标识符始终为 "${publisher}.${name}"。例如: "vscode.csharp"。
  "settingsSync.ignoredExtensions": [],
  // 配置在同步时要忽略的设置。
  "settingsSync.ignoredSettings": [],
  // 为每个平台同步键绑定。
  "settingsSync.keybindingsPerPlatform": true,
  // 在输出视图中启用或禁用「智能滚动」。「智能滚动」会自动在你点击输出视图时锁定滚动，并在你点击最后一行时解锁滚动。
  "output.smartScroll.enabled": true,
  // 控制默认情况下是否折叠交互窗口中的代码单元格。
  "interactiveWindow.collapseCellInputCode": "fromEditor",
  // 启用的笔记本痕迹包含代码单元格时。
  "notebook.breadcrumbs.showCodeCells": true,
  // 控制焦点指示器呈现位置(沿单元格边框或左侧装订线)
  "notebook.cellFocusIndicator": "gutter",
  // 应在何处显示单元格工具栏，或是否隐藏它。
  "notebook.cellToolbarLocation": {
    "default": "right"
  },
  // 是否应在悬停或单击时显示单元格工具栏。
  "notebook.cellToolbarVisibility": "click",
  // 控制是否应以紧凑形式呈现笔记本编辑器。例如在打开时，它将减小左边距宽度。
  "notebook.compactView": true,
  // 控制是否应在输出工具栏中呈现输出操作。
  "notebook.consolidatedOutputButton": true,
  // 控制是否在“运行”按钮旁边的下拉列表中显示额外操作。
  "notebook.consolidatedRunButton": false,
  // 是否对笔记本使用增强的文本差异编辑器。
  "notebook.diff.enablePreview": true,
  // 隐藏元数据差异
  "notebook.diff.ignoreMetadata": false,
  // 隐藏输出差异
  "notebook.diff.ignoreOutputs": false,
  // 输出项 mime 类型的优先级列表
  "notebook.displayOrder": [],
  // 控制笔记本编辑器是否应允许通过拖放移动单元格。
  "notebook.dragAndDropEnabled": true,
  // 用于笔记本中使用的代码编辑器的设置。这可用于自定义大多数编辑器*设置。
  "notebook.editorOptionsCustomizations": {},
  // 控制是否在笔记本编辑器中呈现全局工具栏。
  "notebook.globalToolbar": true,
  // 控制笔记本工具栏上的操作是否应呈现标签。
  "notebook.globalToolbarShowLabel": "always",
  // 控制插入单元格操作应出现的位置。
  //  - betweenCells: 在单元格之间悬停时显示的工具栏。
  //  - notebookToolbar: 位于笔记本编辑器顶部的工具栏。
  //  - both: 两个工具栏。
  //  - hidden: 插入操作不会出现在任何位置。
  "notebook.insertToolbarLocation": "both",
  // 控制单元格编辑器中行号的显示。
  "notebook.lineNumbers": "off",
  // 控制笔记本中呈现的标记的字号(以像素为单位)。设置为 `0` 时，将使用 120% 的 `editor.fontSize`。
  "notebook.markup.fontSize": 0,
  // 启用后，当单元格编辑器中的当前光标位于第/最后一行时，光标可以导航到下/上一个单元格。
  "notebook.navigation.allowNavigateToSurroundingCells": true,
  // 启用笔记本大纲时，显示代码单元格。
  "notebook.outline.showCodeCells": false,
  // 控制文本输出中呈现的文本行数。
  "notebook.output.textLineLimit": 30,
  // 是否应显示单元格状态栏。
  //  - hidden: 单元格状态栏始终隐藏。
  //  - visible: 单元格状态栏始终可见。
  //  - visibleAfterExecute: 在执行单元格之前，单元格状态栏处于隐藏状态。之后，其会变为可见以显示执行状态。
  "notebook.showCellStatusBar": "visible",
  // 控制显示 Markdown 标头文件箭头的时间。
  //  - always: 折叠控件始终可见。
  //  - mouseover: 折叠控件仅在鼠标悬停时可见。
  "notebook.showFoldingControls": "mouseover",
  // 是否为每个单元格使用单独的撤消/重做堆叠。
  "notebook.undoRedoPerCell": true,
  // 是否允许在终端中同时按下键绑定。请注意，如果设置为 true 且击键导致同时按键，则将绕过 `terminal.integrated.commandsToSkipShell`；如果想要按 Ctrl+K 转到 shell (而不是 VS Code)，则将此项设置为 false 尤其有用。
  "terminal.integrated.allowChords": true,
  // 是否允许使用菜单栏助记符(如 Alt+F)来触发“打开菜单栏”。请注意，这将导致在设为 true 时，所有 Alt 击键都跳过 shell。此设置在 macOS 不起作用。
  "terminal.integrated.allowMnemonics": false,
  // 如果启用，则当 `editor.multiCursorModifier` 设置为 `'alt'` (默认值)时，alt/option+单击会将提示光标重置于鼠标下方。此功能的有效性取决于 shell。
  "terminal.integrated.altClickMovesCursor": true,
  // 要在 Linux 上用于自动化相关终端使用(如任务和调试)的终端配置文件。如果设置了 #terminal.integrated.automationShell.linux#，则当前将忽略此设置。
  "terminal.integrated.automationProfile.linux": null,
  // 要在 macOS 上用于自动化相关终端使用(如任务和调试)的终端配置文件。如果设置了 #terminal.integrated.automationShell.osx#，则当前将忽略此设置。
  "terminal.integrated.automationProfile.osx": null,
  // 用于自动化相关终端使用(如任务和调试)的终端配置文件。如果设置了 #terminal.integrated.automationShell.windows#，则当前将忽略此设置。
  "terminal.integrated.automationProfile.windows": null,
  // 已弃用此方法，新的配置自动化 shell 的建议方法是使用 `terminal.integrated.automationProfile.linux` 创建终端自动化配置文件。此方法目前优先于新的自动化配置文件设置，但将来会发生更改。
  // 一个路径，设置后将替代 `terminal.integrated.shell.linux`，并忽略与自动化相关的终端使用情况(例如任务和调试)的 `shellArgs` 个值。
  "terminal.integrated.automationShell.linux": null,
  // 已弃用此方法，新的配置自动化 shell 的建议方法是使用 `terminal.integrated.automationProfile.osx` 创建终端自动化配置文件。此方法目前优先于新的自动化配置文件设置，但将来会发生更改。
  // 一个路径，设置后将替代 `terminal.integrated.shell.osx`，并忽略与自动化相关的终端使用情况(例如任务和调试)的 `shellArgs` 个值。
  "terminal.integrated.automationShell.osx": null,
  // 已弃用此方法，新的配置自动化 shell 的建议方法是使用 `terminal.integrated.automationProfile.windows` 创建终端自动化配置文件。此方法目前优先于新的自动化配置文件设置，但将来会发生更改。
  // 一个路径，设置后将替代 `terminal.integrated.shell.windows`，并忽略与自动化相关的终端使用情况(例如任务和调试)的 `shellArgs` 值。
  "terminal.integrated.automationShell.windows": null,
  // 在终端中遇到一组消息时，将自动响应这组消息。如果消息足够具体，可能有助于自动执行常见响应。
  //
  // 备注:
  //
  // - 使用 `"Terminate batch job (Y/N)": "\r"` 自动响应 Windows 上的终止批处理作业提示。
  // - 消息包括转义序列，因此可能无法使用带样式的文本进行回复。
  // - 每秒只能进行一次回复。
  // - 在回复中使用 `"\r"` 表示输入键。
  // - 要取消设置默认键，请将该值设置为 null。
  // - 如果新的不适用，请重新启动 VS Code。
  "terminal.integrated.autoReplies": {},
  // 触发时在终端选项卡中显示响铃的毫秒数。
  "terminal.integrated.bellDuration": 1000,
  // 一组命令 ID，其键绑定将不发送至 shell，而是始终由 VS Code 进行处理。这样的话，通常由 shell 使用的键绑定的行为可如同焦点未在终端上时的行为一样，例如按 “Ctrl+P” 来启动“快速打开”。
  //
  // &nbsp;
  //
  // 默认跳过多项命令。要替代默认值并转而将相关命令的键绑定传递给 shell，请添加以 “-” 字符为前缀的命令。例如，添加“-workbench.action.quickOpen” 可使 “Ctrl+P”到达 shell。
  //
  // &nbsp;
  //
  // 在设置编辑器中查看时，下面的默认跳过命令列表会被截断。要查看完整列表，请执行 [打开默认设置 JSON](command:workbench.action.openRawDefaultSettings '打开默认设置(JSON)')，然后从下面的列表中搜索第一个命令。
  //
  // &nbsp;
  //
  // 默认跳过的命令:
  //
  // - editor.action.toggleTabFocusMode
  // - notifications.hideList
  // - notifications.hideToasts
  // - workbench.action.debug.continue
  // - workbench.action.debug.pause
  // - workbench.action.debug.restart
  // - workbench.action.debug.run
  // - workbench.action.debug.start
  // - workbench.action.debug.stepInto
  // - workbench.action.debug.stepOut
  // - workbench.action.debug.stepOver
  // - workbench.action.debug.stop
  // - workbench.action.firstEditorInGroup
  // - workbench.action.focusActiveEditorGroup
  // - workbench.action.focusEighthEditorGroup
  // - workbench.action.focusFifthEditorGroup
  // - workbench.action.focusFirstEditorGroup
  // - workbench.action.focusFourthEditorGroup
  // - workbench.action.focusLastEditorGroup
  // - workbench.action.focusNextPart
  // - workbench.action.focusPreviousPart
  // - workbench.action.focusSecondEditorGroup
  // - workbench.action.focusSeventhEditorGroup
  // - workbench.action.focusSixthEditorGroup
  // - workbench.action.focusThirdEditorGroup
  // - workbench.action.lastEditorInGroup
  // - workbench.action.navigateDown
  // - workbench.action.navigateLeft
  // - workbench.action.navigateRight
  // - workbench.action.navigateUp
  // - workbench.action.nextEditor
  // - workbench.action.nextEditorInGroup
  // - workbench.action.nextPanelView
  // - workbench.action.nextSideBarView
  // - workbench.action.openNextRecentlyUsedEditor
  // - workbench.action.openNextRecentlyUsedEditorInGroup
  // - workbench.action.openPreviousRecentlyUsedEditor
  // - workbench.action.openPreviousRecentlyUsedEditorInGroup
  // - workbench.action.previousEditor
  // - workbench.action.previousEditorInGroup
  // - workbench.action.previousPanelView
  // - workbench.action.previousSideBarView
  // - workbench.action.quickOpen
  // - workbench.action.quickOpenLeastRecentlyUsedEditor
  // - workbench.action.quickOpenLeastRecentlyUsedEditorInGroup
  // - workbench.action.quickOpenPreviousEditor
  // - workbench.action.quickOpenPreviousRecentlyUsedEditor
  // - workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup
  // - workbench.action.quickOpenView
  // - workbench.action.showCommands
  // - workbench.action.tasks.build
  // - workbench.action.tasks.reRunTask
  // - workbench.action.tasks.restartTask
  // - workbench.action.tasks.runTask
  // - workbench.action.tasks.showLog
  // - workbench.action.tasks.showTasks
  // - workbench.action.tasks.terminate
  // - workbench.action.tasks.test
  // - workbench.action.terminal.clear
  // - workbench.action.terminal.clearSelection
  // - workbench.action.terminal.copySelection
  // - workbench.action.terminal.deleteToLineStart
  // - workbench.action.terminal.deleteWordLeft
  // - workbench.action.terminal.deleteWordRight
  // - workbench.action.terminal.findNext
  // - workbench.action.terminal.findPrevious
  // - workbench.action.terminal.focus
  // - workbench.action.terminal.focusAtIndex1
  // - workbench.action.terminal.focusAtIndex2
  // - workbench.action.terminal.focusAtIndex3
  // - workbench.action.terminal.focusAtIndex4
  // - workbench.action.terminal.focusAtIndex5
  // - workbench.action.terminal.focusAtIndex6
  // - workbench.action.terminal.focusAtIndex7
  // - workbench.action.terminal.focusAtIndex8
  // - workbench.action.terminal.focusAtIndex9
  // - workbench.action.terminal.focusFind
  // - workbench.action.terminal.focusNext
  // - workbench.action.terminal.focusNextPane
  // - workbench.action.terminal.focusPrevious
  // - workbench.action.terminal.focusPreviousPane
  // - workbench.action.terminal.goToRecentDirectory
  // - workbench.action.terminal.hideFind
  // - workbench.action.terminal.kill
  // - workbench.action.terminal.killEditor
  // - workbench.action.terminal.moveToEditor
  // - workbench.action.terminal.moveToLineEnd
  // - workbench.action.terminal.moveToLineStart
  // - workbench.action.terminal.moveToTerminalPanel
  // - workbench.action.terminal.navigationModeExit
  // - workbench.action.terminal.navigationModeFocusNext
  // - workbench.action.terminal.navigationModeFocusPrevious
  // - workbench.action.terminal.new
  // - workbench.action.terminal.newInActiveWorkspace
  // - workbench.action.terminal.paste
  // - workbench.action.terminal.pasteSelection
  // - workbench.action.terminal.resizePaneDown
  // - workbench.action.terminal.resizePaneLeft
  // - workbench.action.terminal.resizePaneRight
  // - workbench.action.terminal.resizePaneUp
  // - workbench.action.terminal.runActiveFile
  // - workbench.action.terminal.runRecentCommand
  // - workbench.action.terminal.runSelectedText
  // - workbench.action.terminal.scrollDown
  // - workbench.action.terminal.scrollDownPage
  // - workbench.action.terminal.scrollToBottom
  // - workbench.action.terminal.scrollToNextCommand
  // - workbench.action.terminal.scrollToPreviousCommand
  // - workbench.action.terminal.scrollToTop
  // - workbench.action.terminal.scrollUp
  // - workbench.action.terminal.scrollUpPage
  // - workbench.action.terminal.selectAll
  // - workbench.action.terminal.selectToNextCommand
  // - workbench.action.terminal.selectToNextLine
  // - workbench.action.terminal.selectToPreviousCommand
  // - workbench.action.terminal.selectToPreviousLine
  // - workbench.action.terminal.sendSequence
  // - workbench.action.terminal.sizeToContentWidth
  // - workbench.action.terminal.split
  // - workbench.action.terminal.splitInActiveWorkspace
  // - workbench.action.terminal.toggleFindCaseSensitive
  // - workbench.action.terminal.toggleFindRegex
  // - workbench.action.terminal.toggleFindWholeWord
  // - workbench.action.terminal.toggleTerminal
  // - workbench.action.toggleFullScreen
  // - workbench.action.toggleMaximizedPanel
  // - workbench.action.togglePanel
  "terminal.integrated.commandsToSkipShell": [],
  // 如果存在活动终端会话，控制是否确认窗口关闭的时间。
  //  - never: 从不确认。
  //  - always: 始终确认是否存在终端。
  //  - hasChildProcesses: 确认是否存在具有子进程的终端。
  "terminal.integrated.confirmOnExit": "never",
  // 控制是否在终端具有子进程时确认终止终端。当设置为编辑器时，如果编辑器区域中的终端具有子进程，则将标记为已更改。请注意，子进程检测可能不适用于 Git Bash 等 shell，后者不会将其进程作为 shell 的子进程运行。
  //  - never: 从不确认。
  //  - editor: 确认终端是否在编辑器中。
  //  - panel: 确认终端是否在面板中。
  //  - always: 确认终端是在编辑器中还是在面板中。
  "terminal.integrated.confirmOnKill": "editor",
  // 控制是否将在终端中选定的文本复制到剪贴板。
  "terminal.integrated.copyOnSelection": false,
  // 控制终端光标是否闪烁。
  "terminal.integrated.cursorBlinking": false,
  // 控制终端光标的样式。
  "terminal.integrated.cursorStyle": "block",
  // 控制在 "#terminal.integrated.cursorStyle#" 设置为 "line" 时光标的宽度。
  "terminal.integrated.cursorWidth": 1,
  // 是否为块元素和框绘图字符绘制自定义字形，而不是使用字体，这通常会产生更好的连续线条呈现效果。请注意，这不适用于 DOM 呈现器
  "terminal.integrated.customGlyphs": true,
  // 将在其中启动终端的显式起始路径，它用作 shell 进程的当前工作目录(cwd)。如果根目录不是方便的 cwd，此路径在工作区设置中可能十分有用。
  "terminal.integrated.cwd": "",
  // 控制新建终端的显示位置。
  //  - editor: 在编辑器中创建终端
  //  - view: 在终端视图中创建终端
  "terminal.integrated.defaultLocation": "view",
  // 在 Linux 上使用的默认配置文件。如果设置了 `terminal.integrated.shell.linux` 或 `terminal.integrated.shellArgs.linux`，则当前将忽略此设置。
  "terminal.integrated.defaultProfile.linux": null,
  // 在 macOS 上使用的默认配置文件。如果设置了 `terminal.integrated.shell.osx` 或 `terminal.integrated.shellArgs.osx`，则当前将忽略此设置。
  "terminal.integrated.defaultProfile.osx": null,
  // 在 Windows 上使用的默认配置文件。如果设置了 `terminal.integrated.shell.windows` 或 `terminal.integrated.shellArgs.windows`，则当前将忽略此设置。
  //  - PowerShell: $(terminal-powershell) PowerShell
  // - path: C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe
  //  - Windows PowerShell: $(terminal-powershell) Windows PowerShell
  // - path: C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe
  //  - Command Prompt: $(terminal-cmd) Command Prompt
  // - path: C:\WINDOWS\System32\cmd.exe
  // - args: []
  //  - JavaScript Debug Terminal: $($(debug)) JavaScript Debug Terminal
  // - extensionIdenfifier: ms-vscode.js-debug
  "terminal.integrated.defaultProfile.windows": null,
  // 控制是否检测 "$LANG" 环境变量并将其设置为符合 UTF-8 的选项，因为 VS Code 的终端仅支持来自 shell 的 UTF-8 编码数据。
  //  - auto: 如果现有变量不存在或不以 "'.UTF-8'" 结尾，则设置 "$LANG" 环境变量。
  //  - off: 请勿设置 "$LANG" 环境变量。
  //  - on: 始终设置 "$LANG" 环境变量。
  "terminal.integrated.detectLocale": "auto",
  // 控制终端中的加粗文本是否始终使用 "bright" ANSI 颜色变量。
  "terminal.integrated.drawBoldTextInBrightColors": true,
  // 控制是否启用终端铃声，这在终端名称旁边显示为视觉上的铃铛。
  "terminal.integrated.enableBell": false,
  // 是否在终端中启用文件链接。尤其是在处理网络驱动器时，链接会变慢，因为每个文件链接都会根据文件系统进行验证。更改此项将仅在新的终端中生效。
  "terminal.integrated.enableFileLinks": true,
  // 将多行粘贴到终端时显示警告对话框。在以下情况中，该对话框不显示:
  //
  // - 已启用带括号的粘贴模式(shell 支持本机多行粘贴)
  // - 粘贴由 shell 的读取一行数据处理(在 pwsh 的情况下)
  "terminal.integrated.enableMultiLinePasteWarning": true,
  // 跨窗口重新加载保持工作区的终端会话。
  "terminal.integrated.enablePersistentSessions": true,
  // 具有环境变量的对象，这些变量将添加到 Linux 上的终端要使用的 VS Code 进程。如果设置为 "null"，则删除环境变量。
  "terminal.integrated.env.linux": {},
  // 具有环境变量的对象，这些变量将添加到 macOS 中的终端要使用的 VS Code 进程。如果设置为 "null"，则删除环境变量。
  "terminal.integrated.env.osx": {},
  // 具有环境变量的对象，这些变量将添加到将由 Windows 上的终端使用的 VS Code 进程。设置为 "null" 以删除环境变量。
  "terminal.integrated.env.windows": {},
  // 是否在每个终端上显示环境更改指示器，该指示器解释了使是否已进行扩展或想要对终端环境进行更改。
  //  - off: 禁用指示器。
  //  - on: 启用指示器。
  //  - warnonly: 仅当终端环境为“已过时”时，仅显示警告指示器，而不是显示指出终端环境已由扩展修改的信息指示器。
  "terminal.integrated.environmentChangesIndicator": "warnonly",
  // 在扩展想要向终端的环境贡献内容但尚未与之交互时是否自动重启终端。
  "terminal.integrated.environmentChangesRelaunch": true,
  // 按 "Alt" 时的滚动速度加倍。
  "terminal.integrated.fastScrollSensitivity": 5,
  // 控制终端的字体系列，它默认为 "#editor.fontFamily#" 的值。
  "terminal.integrated.fontFamily": "",
  // 控制终端的字号(以像素为单位)。
  "terminal.integrated.fontSize": 14,
  // 要在终端中用于非粗体文本的字体粗细。接受“正常”和“加粗”这两个关键字，或接受 1-1000 之间的数字。
  "terminal.integrated.fontWeight": "normal",
  // 要在终端中用于粗体文本的字体粗细。接受“正常”和“加粗”这两个关键字，或接受 1-1000 之间的数字。
  "terminal.integrated.fontWeightBold": "bold",
  // 控制终端是否将使用 GPU 来进行呈现。
  //  - auto: 让 VS Code 检测哪些呈现器将提供最佳体验。
  //  - on: 在终端内启用 GPU 加速。
  //  - off: 在终端中禁用 GPU 加速。
  //  - canvas: 在终端中使用回退画布呈现器。这使用 2d 上下文而不是 webgl，在某些系统上可能更好。
  "terminal.integrated.gpuAcceleration": "auto",
  // 使用 `terminal.integrated.confirmOnKill` 设置时要忽略的一组流程名称。
  "terminal.integrated.ignoreProcessNames": [
    "starship",
    "oh-my-posh",
    "bash",
    "zsh"
  ],
  // 新 shell 是否应从 VS Code 继承其环境，这可能会生成登录 shell，以确保初始化 $PATH 和其他开发变量。这不会对 Windows 造成影响。
  "terminal.integrated.inheritEnv": true,
  // 控制终端的字母间距，这是一个整数值，表示要在字符之间增加的额外像素量。
  "terminal.integrated.letterSpacing": 0,
  // 控制终端的行高，此数字乘以终端字号等于实际行高(以像素为单位)。
  "terminal.integrated.lineHeight": 1,
  // 何时应启用本地回响。此操作将替代 `terminal.integrated.localEchoLatencyThreshold`
  //  - on: 始终启用
  //  - off: 始终禁用
  //  - auto: 仅对远程工作区启用
  "terminal.integrated.localEchoEnabled": "auto",
  // 当在终端标题中找到其中一个程序名称时，将禁用本地回显。
  "terminal.integrated.localEchoExcludePrograms": [
    "vim",
    "vi",
    "nano",
    "tmux"
  ],
  // 网络延迟的长度(以毫秒为单位)，其中本地编辑将在终端上回显，无需等待服务器承认。如果为 '0'，则本地回显将始终开启，如果为 '-1'，则将禁用。
  "terminal.integrated.localEchoLatencyThreshold": 30,
  // 本地回显文本的终端样式；字体样式或 RGB 颜色。
  "terminal.integrated.localEchoStyle": "dim",
  // 控制在 macOS 上使用 Option+单击时是否强制选择内容。这将强制进行常规(行)选择并禁止使用列选择模式。这样，可使用常规终端选择进行复制粘贴，例如在 tmux 中启用鼠标模式时。
  "terminal.integrated.macOptionClickForcesSelection": false,
  // 控制是否将选项键视为 macOS 中的终端上的元键。
  "terminal.integrated.macOptionIsMeta": false,
  // 设置每个单元格的前景色时，将改为尝试符合指定的对比度比率。示例值:
  //
  // - 1: 默认值，不执行任何操作。
  // - 4.5: [WCAG AA 符合(最低)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)。
  // - 7: [WCAG AAA 符合(增强)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html).
  // - 21: 黑底白字或白底黑字。
  "terminal.integrated.minimumContrastRatio": 1,
  // 要在鼠标滚轮滚动事件的 "deltaY" 上使用的乘数。
  "terminal.integrated.mouseWheelScrollSensitivity": 1,
  // 当必须关闭终端进程(例如当窗口或应用程序关闭时)时，这将确定何时应还原以前的终端会话内容，以及在下次打开工作区时重新创建的进程。
  //
  // 注意事项:
  //
  // - 进程当前工作目录的还原取决于是否受 shell 支持。
  // - 在关闭期间保留会话的时间有限，因此在使用高延迟远程连接时可能会中止相应会话。
  //  - onExit: 在 Windows/Linux 上关闭最后窗口后或当触发 `workbench.action.quit` 命令(命令面板、键绑定、菜单)时，恢复流程。
  //  - onExitAndWindowClose: 在 Windows/Linux 上关闭最后窗口后或当触发 `workbench.action.quit` 命令(命令面板、键绑定、菜单)或关闭窗口时，恢复流程。
  //  - never: 永远不要还原终端缓冲区或重新创建流程。
  "terminal.integrated.persistentSessionReviveProcess": "onExit",
  // 控制重新连接到永久性终端会话时将还原的最大行数。增加此数量将以占用更多内存为代价还原更多的回滚行，并增加在启动时连接到终端所需的时间。此设置需要重启才能生效，并应设置为小于或等于 `terminal.integrated.scrollback` 的值。
  "terminal.integrated.persistentSessionScrollback": 100,
  // 通过终端下拉列表创建新终端时要显示的 Linux 配置文件。请手动设置 `path` 属性(通过可选的 `args` 进行)。
  //
  // 将现有配置文件设置为 `null` 以从列表中隐藏配置文件，例如: `"bash": null`。
  "terminal.integrated.profiles.linux": {
    "bash": {
      "path": "bash",
      "icon": "terminal-bash"
    },
    "zsh": {
      "path": "zsh"
    },
    "fish": {
      "path": "fish"
    },
    "tmux": {
      "path": "tmux",
      "icon": "terminal-tmux"
    },
    "pwsh": {
      "path": "pwsh",
      "icon": "terminal-powershell"
    }
  },
  // 通过终端下拉列表创建新终端时要显示的 macOS 配置文件。请手动设置 `path` 属性(通过可选的 `args` 进行)。
  //
  // 将现有配置文件设置为 `null` 以从列表中隐藏配置文件，例如: `"bash": null`。
  "terminal.integrated.profiles.osx": {
    "bash": {
      "path": "bash",
      "args": [
        "-l"
      ],
      "icon": "terminal-bash"
    },
    "zsh": {
      "path": "zsh",
      "args": [
        "-l"
      ]
    },
    "fish": {
      "path": "fish",
      "args": [
        "-l"
      ]
    },
    "tmux": {
      "path": "tmux",
      "icon": "terminal-tmux"
    },
    "pwsh": {
      "path": "pwsh",
      "icon": "terminal-powershell"
    }
  },
  // 通过终端下拉列表创建新终端时要显示的 Windows 配置文件。使用 `source` 属性自动检测 shell 的位置。或手动设置 `path` 属性(通过可选的 `args` 进行)。
  //
  // 将现有配置文件设置为 `null` 以从列表中隐藏配置文件，例如: `"Ubuntu-20.04 (WSL)": null`。
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    },
    "Command Prompt": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [],
      "icon": "terminal-cmd"
    },
    "Git Bash": {
      "source": "Git Bash"
    }
  },
  // 控制终端如何回应右键单击操作。
  //  - default: 显示上下文菜单。
  //  - copyPaste: 当有选定内容时复制，否则粘贴。
  //  - paste: 右键单击时粘贴。
  //  - selectWord: 选择光标下方的字词并显示上下文菜单。
  "terminal.integrated.rightClickBehavior": "copyPaste",
  // 控制终端在其缓冲区中保留的最大行数。
  "terminal.integrated.scrollback": 1000,
  // 将大部分键绑定调度到终端而不是工作台，重写 "#terminal.integrated.commandsToSkipShell#"，这可选择性地用于进行微调。
  "terminal.integrated.sendKeybindingsToShell": false,
  // 此项已弃用，配置默认 shell 的新推荐方法是在 `terminal.integrated.profiles.linux#` 中创建一个终端配置文件，并将其配置文件名称设置为 `#terminal.integrated.defaultProfile.linux` 中的默认值。此操作当前将优先于新的配置文件设置，但将来会发生更改。
  // 终端在 Linux 上使用的 shell 的路径。[阅读关于配置 shell 的详细信息](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-profiles)。
  "terminal.integrated.shell.linux": null,
  // 此项已弃用，配置默认 shell 的新推荐方法是在 `terminal.integrated.profiles.osx#` 中创建一个终端配置文件，并将其配置文件名称设置为 `#terminal.integrated.defaultProfile.osx` 中的默认值。此操作当前将优先于新的配置文件设置，但将来会发生更改。
  // 终端在 macOS 上使用的 shell 的路径。[阅读关于配置 shell 的详细信息](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-profiles)。
  "terminal.integrated.shell.osx": null,
  // 此项已弃用，配置默认 shell 的新推荐方法是在 `terminal.integrated.profiles.windows#` 中创建一个终端配置文件，并将其配置文件名称设置为 `#terminal.integrated.defaultProfile.windows` 中的默认值。此操作当前将优先于新的配置文件设置，但将来会发生更改。
  // 终端在 Windows 上使用的 shell 的路径。[阅读关于配置 shell 的详细信息](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-profiles)。
  "terminal.integrated.shell.windows": null,
  // 此项已弃用，配置默认 shell 的新推荐方法是在 `terminal.integrated.profiles.linux#` 中创建一个终端配置文件，并将其配置文件名称设置为 `#terminal.integrated.defaultProfile.linux` 中的默认值。此操作当前将优先于新的配置文件设置，但将来会发生更改。
  // 在 Linux 终端上时要使用的命令行参数。[阅读关于配置 shell 的详细信息](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-profiles)。
  "terminal.integrated.shellArgs.linux": [],
  // 此项已弃用，配置默认 shell 的新推荐方法是在 `terminal.integrated.profiles.osx#` 中创建一个终端配置文件，并将其配置文件名称设置为 `#terminal.integrated.defaultProfile.osx` 中的默认值。此操作当前将优先于新的配置文件设置，但将来会发生更改。
  // 在 macOS 终端上时要使用的命令行参数。[阅读关于配置 shell 的详细信息](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-profiles)。
  "terminal.integrated.shellArgs.osx": [
    "-l"
  ],
  // 此项已弃用，配置默认 shell 的新推荐方法是在 `terminal.integrated.profiles.windows#` 中创建一个终端配置文件，并将其配置文件名称设置为 `#terminal.integrated.defaultProfile.windows` 中的默认值。此操作当前将优先于新的配置文件设置，但将来会发生更改。
  // 在 Windows 终端上时要使用的命令行参数。[阅读关于配置 shell 的详细信息](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-profiles)。
  "terminal.integrated.shellArgs.windows": [],
  // 控制将用于已跳过/空命令的图标。设置为 `''` 以隐藏图标或禁用带有 `terminal.integrated.shellIntegration.decorationsEnabled` 的修饰
  "terminal.integrated.shellIntegration.decorationIcon": "circle-outline",
  // 控制将用于已启用 shell 集成且具有关联退出代码的终端中的每个命令的图标。设置为 `''` 以隐藏图标或禁用带有`terminal.integrated.shellIntegration.decorationsEnabled` 的修饰。
  "terminal.integrated.shellIntegration.decorationIconError": "error-small",
  // 控制将用于已启用 shell 集成且不具有关联退出代码的终端中的每个命令的图标。设置为 `''` 以隐藏图标或禁用带有`terminal.integrated.shellIntegration.decorationsEnabled` 的修饰。
  "terminal.integrated.shellIntegration.decorationIconSuccess": "primitive-dot",
  // 启用 shell 集成后，为每个命令添加修饰。
  "terminal.integrated.shellIntegration.decorationsEnabled": true,
  // 启用实验性 shell 集成功能，该功能将启用某些功能，例如增强的命令跟踪和当前工作目录检测。Shell 集成的工作原理是注入在初始化 shell 时运行的脚本，从而允许终端进一步了解终端内发生的情况。如果已在终端配置文件中定义自定义参数，则脚本注入可能不起作用。
  //
  // 受支持的 shell:
  //
  // - Linux/macOS: bash、pwsh、zsh
  //  - Windows: pwsh
  //
  // 此设置仅在创建终端时适用，需要重启终端才能使该设置生效。
  "terminal.integrated.shellIntegration.enabled": false,
  // 控制要保留在终端命令历史记录中的最近使用的命令数。设置为 0 可禁用终端命令历史记录。
  "terminal.integrated.shellIntegration.history": 100,
  // 启用该功能时，是否在终端中显示 shell 集成已激活的欢迎消息。
  "terminal.integrated.shellIntegration.showWelcome": true,
  // 控制在退出代码为非零时是否显示“终端进程已终止且显示退出代码”警报。
  "terminal.integrated.showExitAlert": true,
  // 是否显示终端输出中链接的悬停。
  "terminal.integrated.showLinkHover": true,
  // 控制拆分终端开始时使用的工作目录。
  //  - workspaceRoot: 新的拆分终端将使用工作区根作为工作目录。在多根工作区中，提供了要使用根文件夹的选项。
  //  - initial: 新的拆分终端将使用父终端开始时使用的工作目录。
  //  - inherited: 在 macOS 和 Linux 上，新的拆分终端将使用父终端的工作目录。在 Windows 上，这与初始行为相同。
  "terminal.integrated.splitCwd": "inherited",
  // 控制显示在标题右侧的终端说明。根据上下文替换变量:
  // - `${cwd}`: 终端的当前工作目录
  // - `${cwdFolder}`: 终端的当前工作目录，当值与初始工作目录不同时，显示在多根工作区或单个根工作区中。在 Windows 上，仅当启用 shell 集成时才会显示此内容。
  // - `${workspaceFolder}`: 在其中启动终端的工作区
  // - `${local}`: 指示远程工作区中的本地终端
  // - `${process}`: 终端流程的名称
  // - `${separator}`: 仅在由带有值或静态文本的变量括住时才显示的条件分隔符(" - ")。
  // - `${sequence}`: 流程提供给 xterm.js 的名称
  // - `${task}`: 指示此终端与任务关联
  "terminal.integrated.tabs.description": "${task}${separator}${local}${separator}${cwdFolder}",
  // 控制终端选项卡状态是否支持动画(例如正在进行的任务)。
  "terminal.integrated.tabs.enableAnimation": true,
  // 控制终端选项卡是否以列表的形式显示在终端的一侧。如果禁用此功能，将改为显示下拉列表。
  "terminal.integrated.tabs.enabled": true,
  // 控制是在双击时将焦点放在某个选项卡上还是单击。
  //  - singleClick: 双击终端选项卡时聚焦终端
  //  - doubleClick: 双击终端选项卡时聚焦终端
  "terminal.integrated.tabs.focusMode": "doubleClick",
  // 控制在特定条件下是否将隐藏终端选项卡视图。
  //  - never: 从不隐藏终端选项卡视图
  //  - singleTerminal: 仅打开一个终端时隐藏终端选项卡视图
  //  - singleGroup: 仅打开一个终端组时隐藏终端选项卡视图
  "terminal.integrated.tabs.hideCondition": "singleTerminal",
  // 控制终端选项卡的位置，该位置位于实际终端的左侧或右侧。
  //  - left: 在终端的左侧显示终端选项卡视图
  //  - right: 在终端的右侧显示终端选项卡视图
  "terminal.integrated.tabs.location": "right",
  // `terminal.integrated.tabs.title` 和 `terminal.integrated.tabs.title` 使用的分隔符。
  "terminal.integrated.tabs.separator": " - ",
  // 控制是否在“新建终端”按钮旁边显示“终端拆分”和“终止”按钮。
  //  - always: 始终显示操作
  //  - singleTerminal: 当终端是唯一打开的终端时显示操作
  //  - singleTerminalOrNarrow: 在终端是唯一打开的终端或选项卡视图处于窄而无文本状态时显示活动终端
  //  - never: 从不显示操作
  "terminal.integrated.tabs.showActions": "singleTerminalOrNarrow",
  // 在视图中显示活动的终端信息，当选项卡中的标题不可见时，此功能尤其有用。
  //  - always: 始终显示活动终端
  //  - singleTerminal: 当仅有一个终端打开时显示活动终端
  //  - singleTerminalOrNarrow: 仅当终端已打开或选项卡视图处于窄而无文本状态时显示活动终端
  //  - never: 从不显示活动终端
  "terminal.integrated.tabs.showActiveTerminal": "singleTerminalOrNarrow",
  // 控制终端标题。根据上下文替换变量:
  // - `${cwd}`: 终端的当前工作目录
  // - `${cwdFolder}`: 终端的当前工作目录，当值与初始工作目录不同时，显示在多根工作区或单个根工作区中。在 Windows 上，仅当启用 shell 集成时才会显示此内容。
  // - `${workspaceFolder}`: 在其中启动终端的工作区
  // - `${local}`: 指示远程工作区中的本地终端
  // - `${process}`: 终端流程的名称
  // - `${separator}`: 仅在由带有值或静态文本的变量括住时才显示的条件分隔符(" - ")。
  // - `${sequence}`: 流程提供给 xterm.js 的名称
  // - `${task}`: 指示此终端与任务关联
  "terminal.integrated.tabs.title": "${process}",
  // 控制在计算终端中字符的宽度时要使用的 unicode 版本。如果你遇到表情符号或其他宽字符，而这些宽字符占用的空格或退格量不正确或删除的空间太多或太少，则你可能需要尝试调整此设置。
  //  - 6: unicode 的版本 6，该版本较旧，在较旧的系统中效果更好。
  //  - 11: unicode 的版本 11，版本可在使用新式版本 unicode 的新式系统上提供更好的支持。
  "terminal.integrated.unicodeVersion": "11",
  // 控制是否在终端下拉列表中显示 WSL 发行版
  "terminal.integrated.useWslProfiles": true,
  // 是否使用 ConPTY 进行 Windows 终端进程通信(需要 Windows 10 内部版本号 18309+)。如果此设置为 false，将使用 Winpty。
  "terminal.integrated.windowsEnableConpty": true,
  // 一个字符串，其中包含双击选择 Word 功能而被视为单词分隔符的所有字符。
  "terminal.integrated.wordSeparators": " ()[]{}',\"`─‘’",
  // 控制为所有任务提供程序扩展启用"提供任务"。如果"任务: 运行任务"命令速度较慢，则禁用任务提供程序的自动检测可能会提供帮助。单个扩展还可以提供禁用自动检测的设置。
  "task.autoDetect": "on",
  // 配置在运行任务时是否显示问题匹配器提示。设置为"true"从不提示，或使用任务类型的字典仅关闭特定任务类型的提示。
  "task.problemMatchers.neverPrompt": false,
  // 控制是否显示在“运行任务”等任务快速选取中具有详细信息的任务的详细信息。
  "task.quickOpen.detail": true,
  // 控制任务快速打开对话框中跟踪的最近项目数。
  "task.quickOpen.history": 30,
  // 使 Tasks: Run Task 命令使用速度较慢的“全部显示”行为，而不是使用任务按提供程序进行分组的速度更快的双层选取器。
  "task.quickOpen.showAll": false,
  // 控制当只有一个任务要选取时是否跳过任务快速选取。
  "task.quickOpen.skip": false,
  // 在运行任务前保存所有未保存的编辑器。
  //  - always: 运行前始终保存所有编辑器。
  //  - never: 运行前绝不保存编辑器。
  //  - prompt: 提示在运行前是否保存编辑器。
  "task.saveBeforeRun": "always",
  // 配置当提供程序速度较慢时是否显示警告
  "task.slowProviderWarning": true,
  // 在终端中从资源管理器打开文件时，确定将启动哪种类型的终端
  //  - integrated: 使用 VS Code 的集成终端。
  //  - external: 使用设定的外部终端。
  "terminal.explorerKind": "integrated",
  // 自定义要在 Linux 上运行的终端。
  "terminal.external.linuxExec": "xterm",
  // 定义在 macOS 上运行的终端应用程序。
  "terminal.external.osxExec": "Terminal.app",
  // 自定义要在 Windows 上运行的终端。
  "terminal.external.windowsExec": "C:\\WINDOWS\\System32\\cmd.exe",
  // 在打开文件时，控制是否在“问题”视图中对其进行定位。
  "problems.autoReveal": true,
  // 在文件和文件夹上显示错误和警告。
  "problems.decorations.enabled": true,
  // 启用后，状态栏中将显示当前问题。
  "problems.showCurrentInStatus": false,
  // 控制问题导航的顺序。
  //  - severity: 导航按严重性排序的问题
  //  - position: 导航按位置排序的问题
  "problems.sortOrder": "severity",
  // 启用/禁用导航路径。
  "breadcrumbs.enabled": true,
  // 控制是否及如何在“导航路径”视图中显示文件路径。
  //  - on: 在导航路径视图中显示文件路径。
  //  - off: 不在导航路径视图中显示文件路径。
  //  - last: 在导航路径视图中仅显示文件路径的最后一个元素。
  "breadcrumbs.filePath": "on",
  // 使用图标渲染面包屑导航项。
  "breadcrumbs.icons": true,
  // 启用后，痕迹导航栏将显示“数组”符号。
  "breadcrumbs.showArrays": true,
  // 启用后，痕迹导航栏将显示“布尔”符号。
  "breadcrumbs.showBooleans": true,
  // 启用后，痕迹导航栏显示“类”符号。
  "breadcrumbs.showClasses": true,
  // 启用后，痕迹导航栏将显示“常量”符号。
  "breadcrumbs.showConstants": true,
  // 启用后，痕迹符将显示“构造函数”符号。
  "breadcrumbs.showConstructors": true,
  // 启用后，痕迹导航栏将显示 "enumMember" 符号。
  "breadcrumbs.showEnumMembers": true,
  // 启用后，痕迹导航栏将显示“枚举”符号。
  "breadcrumbs.showEnums": true,
  // 启用后，痕迹导航栏将显示“事件”符号。
  "breadcrumbs.showEvents": true,
  // 启用后，痕迹导航栏将显示“字段”符号。
  "breadcrumbs.showFields": true,
  // 启用后，痕迹导航栏将显示“文件”符号。
  "breadcrumbs.showFiles": true,
  // 启用后，痕迹导航栏将显示“函数”符号。
  "breadcrumbs.showFunctions": true,
  // 启用后，痕迹导航栏将显示“接口”符号。
  "breadcrumbs.showInterfaces": true,
  // 启用后，痕迹导航栏将显示“键”符号。
  "breadcrumbs.showKeys": true,
  // 启用后，痕迹导航栏将显示“方法”符号。
  "breadcrumbs.showMethods": true,
  // 启用后，痕迹导航栏将显示“模块”符号。
  "breadcrumbs.showModules": true,
  // 启用后，痕迹导航栏将显示“命名空间”符号。
  "breadcrumbs.showNamespaces": true,
  // 启用后，痕迹导航栏将显示 "null" 符号。
  "breadcrumbs.showNull": true,
  // 启用后，痕迹导航栏将显示“数字”符号。
  "breadcrumbs.showNumbers": true,
  // 启用后，痕迹导航栏将显示“对象”符号。
  "breadcrumbs.showObjects": true,
  // 启用后，痕迹导航栏将显示“运算符”符号。
  "breadcrumbs.showOperators": true,
  // 启用后，痕迹导航栏将显示“包”符号。
  "breadcrumbs.showPackages": true,
  // 启用后，痕迹导航栏将显示“属性”符号。
  "breadcrumbs.showProperties": true,
  // 启用后，痕迹导航栏将显示“字符串”符号。
  "breadcrumbs.showStrings": true,
  // 启用后，痕迹导航栏将显示“结构”符号。
  "breadcrumbs.showStructs": true,
  // 启用后，痕迹导航栏将显示 "typeParameter" 符号。
  "breadcrumbs.showTypeParameters": true,
  // 启用后，痕迹导航栏将显示“变量”符号。
  "breadcrumbs.showVariables": true,
  // 控制是否及如何在“导航路径”视图中显示符号。
  //  - on: 在“导航路径”视图中显示所有符号。
  //  - off: 不在导航路径视图中显示符号。
  //  - last: 在导航路径视图中仅显示当前符号。
  "breadcrumbs.symbolPath": "on",
  // 控制“导航路径”大纲视图中符号的排序方式。
  //  - position: 以文件位置顺序显示符号大纲。
  //  - name: 以字母顺序显示符号大纲。
  //  - type: 以符号类型顺序显示符号大纲。
  "breadcrumbs.symbolSortOrder": "position",
  // 如果此设置为 false，则无论新设置的值如何，都不会发送遥测数据。由于合并到 `telemetry.telemetryLevel` 设置，目前已弃用。
  // 启用要收集的崩溃报告。这有助于我们提高稳定性。
  // 此选项需重启才可生效。
  "telemetry.enableCrashReporter": true,
  // 如果此设置为 false，则无论新设置的值如何，都不会发送遥测数据。已弃用，推荐使用 `telemetry.telemetryLevel` 设置。
  // 启用要收集的诊断数据。这有助于我们更好地了解 Visual Studio Code 的执行情况以及哪里需要改进。[阅读详细信息](https://go.microsoft.com/fwlink/?LinkId=786907)关于我们收集的内容和隐私声明。
  "telemetry.enableTelemetry": true,
  //
  // 控制所有核心和第一方扩展遥测。这有助于我们更好地了解 Visual Studio Code 的执行情况、需要在何处进行改进以及如何使用功能。 详细了解[我们收集的数据](https://aka.ms/vscode-telemetry)和我们的[隐私声明](https://go.microsoft.com/fwlink/?LinkId=786907)。 若要使崩溃报告更改生效，必须完全重新启动应用程序。
  //
  // &nbsp;
  //
  // 下表概述了每个设置所发送的数据:
  //
  // |       | 崩溃报告 | 错误遥测 | 用法数据 |
  // |:------|:---------------------:|:---------------:|:--------------:|
  // | all   |            ✓          |        ✓        |        ✓       |
  // | error |            ✓          |        ✓        |        -       |
  // | crash |            ✓          |        -        |        -       |
  // | off   |            -          |        -        |        -       |
  //
  //
  // &nbsp;
  //
  // ****注意:*** 如果此设置为“关闭”，则无论其他遥测设置如何，都不会发送遥测数据。如果此设置为“关闭”以外的任何选项，并且使用弃用的设置禁用遥测，则不会发送遥测数据。*
  //
  //  - all: 发送使用情况数据、错误、故障报告。
  //  - error: 发送常规错误遥测和故障报告。
  //  - crash: 发送 OS 级别故障报告。
  //  - off: 禁用所有产品遥测。
  "telemetry.telemetryLevel": "all",
  // 显示大纲元素的图标。
  "outline.icons": true,
  // 对错误和警告使用徽章。
  "outline.problems.badges": true,
  // 对错误和警告添加颜色。
  "outline.problems.colors": true,
  // 显示大纲元素上的错误和警告。
  "outline.problems.enabled": true,
  // 启用后，大纲将显示“数组”符号。
  "outline.showArrays": true,
  // 启用后，大纲将显示“布尔”符号。
  "outline.showBooleans": true,
  // 启用后，大纲将显示“类”符号。
  "outline.showClasses": true,
  // 启用后，大纲将显示“常量”符号。
  "outline.showConstants": true,
  // 启用大纲时，大纲将显示“构造函数”符号。
  "outline.showConstructors": true,
  // 启用后，大纲将显示“枚举成员”符号。
  "outline.showEnumMembers": true,
  // 启用后，大纲将显示“枚举”符号。
  "outline.showEnums": true,
  // 启用后，大纲将显示“事件”符号。
  "outline.showEvents": true,
  // 启用时，大纲将显示“字段”符号。
  "outline.showFields": true,
  // 启用后，大纲将显示“文件”符号。
  "outline.showFiles": true,
  // 启用时，大纲将显示“函数”符号。
  "outline.showFunctions": true,
  // 启用后，大纲将显示“接口”符号。
  "outline.showInterfaces": true,
  // 启用后，大纲将显示“键”符号。
  "outline.showKeys": true,
  // 启用后，大纲将显示“方法”符号。
  "outline.showMethods": true,
  // 启用后，大纲将显示“模块”符号。
  "outline.showModules": true,
  // 启用后，大纲将显示“命名空间”符号。
  "outline.showNamespaces": true,
  // 启用后，大纲将显示 "null" 符号。
  "outline.showNull": true,
  // 启用后，大纲将显示“数字”符号。
  "outline.showNumbers": true,
  // 启用后，大纲将显示“对象”符号。
  "outline.showObjects": true,
  // 启用时，大纲显示“运算符”符号。
  "outline.showOperators": true,
  // 启用后，大纲将显示“包”符号。
  "outline.showPackages": true,
  // 启用后，大纲将显示“属性”符号。
  "outline.showProperties": true,
  // 启用后，大纲将显示“字符串”符号。
  "outline.showStrings": true,
  // 启用后，大纲将显示“结构”符号。
  "outline.showStructs": true,
  // 启用后，大纲将显示 "typeParameter" 符号。
  "outline.showTypeParameters": true,
  // 启用后，大纲将显示“变量”符号。
  "outline.showVariables": true,
  // 应从时间线视图中排除的时间线源数组。
  "timeline.excludeSources": null,
  // 实验性。控制在滚动到列表结尾时，时间线视图是否将加载下一页的项目。
  "timeline.pageOnScroll": false,
  // 默认情况下以及在加载更多项目时在时间线视图中显示的项目数。如果设置为 "null" (默认值)，则将根据时间线视图的可见区域自动选择一个页面大小。
  "timeline.pageSize": null,
  // 配置要为 [css] 语言替代的设置。
  "[css]": {
    "editor.suggest.insertMode": "replace"
  },
  // 配置要为 [dockercompose] 语言替代的设置。
  "[dockercompose]": {
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "editor.autoIndent": "advanced"
  },
  // 配置要为 [dockerfile] 语言替代的设置。
  "[dockerfile]": {
    "editor.quickSuggestions": {
      "strings": true
    }
  },
  // 配置要为 [git-commit] 语言替代的设置。
  "[git-commit]": {
    "editor.rulers": [
      72
    ],
    "workbench.editor.restoreViewState": false
  },
  // 配置要为 [git-rebase] 语言替代的设置。
  "[git-rebase]": {
    "workbench.editor.restoreViewState": false
  },
  // 配置要为 [go] 语言替代的设置。
  "[go]": {
    "editor.insertSpaces": false
  },
  // 配置要为 [handlebars] 语言替代的设置。
  "[handlebars]": {
    "editor.suggest.insertMode": "replace"
  },
  // 配置要为 [html] 语言替代的设置。
  "[html]": {
    "editor.suggest.insertMode": "replace"
  },
  // 配置要为 [javascript] 语言替代的设置。
  "[javascript]": {
    "editor.maxTokenizationLineLength": 2500
  },
  // 配置要为 [json] 语言替代的设置。
  "[json]": {
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.suggest.insertMode": "replace"
  },
  // 配置要为 [jsonc] 语言替代的设置。
  "[jsonc]": {
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.suggest.insertMode": "replace"
  },
  // 配置要为 [less] 语言替代的设置。
  "[less]": {
    "editor.suggest.insertMode": "replace"
  },
  // 配置要为 [makefile] 语言替代的设置。
  "[makefile]": {
    "editor.insertSpaces": false
  },
  // 配置要为 [markdown] 语言替代的设置。
  "[markdown]": {
    "editor.unicodeHighlight.ambiguousCharacters": false,
    "editor.unicodeHighlight.invisibleCharacters": false,
    "editor.wordWrap": "on",
    "editor.quickSuggestions": false
  },
  // 配置要为 [plaintext] 语言替代的设置。
  "[plaintext]": {
    "editor.unicodeHighlight.ambiguousCharacters": false,
    "editor.unicodeHighlight.invisibleCharacters": false
  },
  // 配置要为 [scss] 语言替代的设置。
  "[scss]": {
    "editor.suggest.insertMode": "replace"
  },
  // 配置要为 [search-result] 语言替代的设置。
  "[search-result]": {
    "editor.lineNumbers": "off"
  },
  // 配置要为 [shellscript] 语言替代的设置。
  "[shellscript]": {
    "files.eol": "\n"
  },
  // 配置要为 [yaml] 语言替代的设置。
  "[yaml]": {
    "editor.insertSpaces": true,
    "editor.tabSize": 2,
    "editor.autoIndent": "advanced"
  },
  // Deprecated. Use the specific setting for each audio cue instead (`audioCues.*`).
  //
  "audioCues.enabled": null,
  // 当有效行具有断点时播放声音。
  //  - auto: 附加屏幕阅读器时，启用音频提示。
  //  - on: 启用音频提示。
  //  - off: 禁用音频提示。
  "audioCues.lineHasBreakpoint": "auto",
  // 当有效行出现错误时播放声音。
  //  - auto: 附加屏幕阅读器时，启用音频提示。
  //  - on: 启用音频提示。
  //  - off: 禁用音频提示。
  "audioCues.lineHasError": "auto",
  // 当有效行具有可展开的折叠区域时播放声音。
  //  - auto: 附加屏幕阅读器时，启用音频提示。
  //  - on: 启用音频提示。
  //  - off: 禁用音频提示。
  "audioCues.lineHasFoldedArea": "auto",
  // 当有效行具有内联建议时播放声音。
  //  - auto: 附加屏幕阅读器时，启用音频提示。
  //  - on: 启用音频提示。
  //  - off: 禁用音频提示。
  "audioCues.lineHasInlineSuggestion": "auto",
  // 当有效行出现警告时播放声音。
  //  - auto: 附加屏幕阅读器时，启用音频提示。
  //  - on: 启用音频提示。
  //  - off: 禁用音频提示。
  "audioCues.lineHasWarning": "off",
  // 尝试读取包含无内嵌提示的内嵌提示的行时播放声音。
  //  - auto: 附加屏幕阅读器时，启用音频提示。
  //  - on: 启用音频提示。
  //  - off: 禁用音频提示。
  "audioCues.noInlayHints": "auto",
  // 当调试程序在断点上停止时播放声音。
  //  - auto: 附加屏幕阅读器时，启用音频提示。
  //  - on: 启用音频提示。
  //  - off: 禁用音频提示。
  "audioCues.onDebugBreak": "auto",
  // 启用后，将检测到新的正在运行的进程，并自动转发其侦听的端口。禁用此设置将不会阻止转发所有端口。即使禁用，扩展将仍然能够导致端口被转发，并且打开某些 URL 仍将导致端口被转发。
  "remote.autoForwardPorts": true,
  // 设置当 "remote.autoForwardPorts" 为 true 时自动从其转发端口的源。在 Windows 和 Mac 远程设备上，"process" 选项不起作用，系统将使用 "output"。需要重新加载才能生效。
  //  - process: 通过监视包含端口的已启动进程发现端口时，将自动转发该端口。
  //  - output: 通过读取终端和调试输出发现端口时，将自动转发该端口。并非所有使用端口的进程都将打印到集成终端或调试控制台，因此某些端口将丢失。根据输出转发的端口将不会被“取消转发”，除非重载或用户在“端口”视图中关闭该端口。
  "remote.autoForwardPortsSource": "process",
  // 启用后，扩展将本地下载并安装在远程上。
  "remote.downloadExtensionsLocally": false,
  // 覆盖扩展的类型。"ui" 扩展在本地计算机上安装和运行，而 "workspace" 扩展则在远程计算机上运行。通过使用此设置重写扩展的默认类型，可指定是否应在本地或远程安装和启用该扩展。
  "remote.extensionKind": {
    "pub.name": [
      "ui"
    ]
  },
  // 指定将用于端口转发的本地主机名。
  "remote.localPortHost": "localhost",
  // 对于未从 "remote.portsAttributes" 设置中获得属性的所有端口，设置其上应用的默认属性。例如:
  //
  // ```
  // {
  //   "onAutoForward": "ignore"
  // }
  // ```
  "remote.otherPortsAttributes": {},
  // 设置在转发特定端口号时应用的属性。例如:
  //
  // ```
  // "3000": {
  //   "label": "Application"
  // },
  // "40000-55000": {
  //   "onAutoForward": "ignore"
  // },
  // ".+\\/server.js": {
  //  "onAutoForward": "openPreview"
  // }
  // ```
  "remote.portsAttributes": {
    "443": {
      "protocol": "https"
    },
    "8443": {
      "protocol": "https"
    }
  },
  // 还原您在工作区中转发的端口。
  "remote.restoreForwardedPorts": true,
  // 不应展开 Emmet 缩写的语言数组。
  "emmet.excludeLanguages": [
    "markdown"
  ],
  // 一组路径，其中每个路径都可以包含 Emmet syntaxProfiles 和/或代码片段。
  // 发生冲突时，后面路径的配置文件/代码段将重写以前的路径。
  // 有关详细信息和示例片段文件，请参见 https://code.visualstudio.com/docs/editor/emmet。
  "emmet.extensionsPath": [],
  // 在默认不受支持的语言中启用 Emmet 缩写。在此语言和 Emmet 支持的语言之间添加映射。
  //  例如: `{"vue-html": "html", "javascript": "javascriptreact"}`
  "emmet.includeLanguages": {},
  // 当设置为 `false` 时，将分析整个文件并确定当前位置能否展开 Emmet 缩写。当设置为 `true` 时，将仅在 CSS/SCSS/LESS 文件中分析当前位置周围的内容。
  "emmet.optimizeStylesheetParsing": true,
  // 用于修改 Emmet 某些操作和解析程序的行为的首选项。
  "emmet.preferences": {},
  // 将可能的 Emmet 缩写作为建议进行显示。当在样式表中或 emmet.showExpandedAbbreviation 设置为 `"never"` 时不适用。
  "emmet.showAbbreviationSuggestions": true,
  // 以建议的形式显示展开的 Emmet 缩写。
  // 选项 `"inMarkupAndStylesheetFilesOnly"` 适用于 html、haml、jade、slim、xml、xsl、css、scss、sass、less 和 stylus。
  // 无论 markup/css 如何，选项 `"always"` 都适用于文件的各个部分。
  "emmet.showExpandedAbbreviation": "always",
  // 若为 `true`，Emmet 建议将显示为代码片段。可以在 `editor.snippetSuggestions` 设置中排列其顺序。
  "emmet.showSuggestionsAsSnippets": false,
  // 为指定的语法定义配置文件或使用带有特定规则的配置文件。
  "emmet.syntaxProfiles": {},
  // 启用后，按下 TAB 键，将展开 Emmet 缩写。
  "emmet.triggerExpansionOnTab": false,
  // 用于 Emmet 代码片段的变量。
  "emmet.variables": {},
  // 控制是否在 VS Code 中为 git 命令启用自动 GitHub 身份验证。
  "github.gitAuthentication": true,
  // URI of your GitHub Enterprise Instance
  "github-enterprise.uri": "",
  // Grunt 任务检测的控制启用。Grunt 任务检测可能会导致执行任何打开的工作区中的文件。
  "grunt.autoDetect": "off",
  // Gulp 任务检测的控制启用。Gulp 任务检测可能会导致执行任何打开的工作区中的文件。
  "gulp.autoDetect": "off",
  // Jake 任务检测的控制启用。Jake 任务检测可能会导致执行任何打开的工作区中的文件。
  "jake.autoDetect": "off",
  // 在内置 Markdown 预览中启用/禁用呈现数学。
  "markdown.math.enabled": true,
  // 是否在解决合并冲突后自动转到下一个合并冲突。
  "merge-conflict.autoNavigateNextConflict.enabled": false,
  // 为编辑器中的合并冲突区域创建 CodeLens。
  "merge-conflict.codeLens.enabled": true,
  // 为编辑器中的合并冲突区域创建提示小标。
  "merge-conflict.decorators.enabled": true,
  // 控件在比较合并冲突中的更改时应在何处打开差异视图。
  //  - Current: 在当前的编辑器组中打开差异视图。
  //  - Beside: 在当前编辑器组旁边打开差异视图。
  //  - Below: 在当前编辑器组下方打开差异视图。
  "merge-conflict.diffViewPosition": "Current",
  // Configures which processes to automatically attach and debug when `debug.node.autoAttach` is on. A Node process launched with the `--inspect` flag will always be attached to, regardless of this setting.
  //  - always: Auto attach to every Node.js process launched in the terminal.
  //  - smart: Auto attach when running scripts that aren't in a node_modules folder.
  //  - onlyWithFlag: Only auto attach when the `--inspect` is given.
  //  - disabled: Auto attach is disabled and not shown in status bar.
  "debug.javascript.autoAttachFilter": "disabled",
  // Configures glob patterns for determining when to attach in "smart" `debug.javascript.autoAttachFilter` mode. `$KNOWN_TOOLS$` is replaced with a list of names of common test and code runners. [Read more on the VS Code docs](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_auto-attach-smart-patterns).
  "debug.javascript.autoAttachSmartPattern": [
    "${workspaceFolder}/**",
    "!**/node_modules/**",
    "**/$KNOWN_TOOLS$/**"
  ],
  // When debugging a remote web app, configures whether to automatically tunnel the remote server to your local machine.
  "debug.javascript.automaticallyTunnelRemoteServer": true,
  // Whether to stop when conditional breakpoints throw an error.
  "debug.javascript.breakOnConditionalError": false,
  // Where a "Run" and "Debug" code lens should be shown in your npm scripts. It may be on "all", scripts, on "top" of the script section, or "never".
  "debug.javascript.codelens.npmScripts": "top",
  // Options used when debugging open links clicked from inside the JavaScript Debug Terminal. Can be set to "off" to disable this behavior, or "always" to enable debugging in all terminals.
  "debug.javascript.debugByLinkOptions": "on",
  // The default `runtimeExecutable` used for launch configurations, if unspecified. This can be used to config custom paths to Node.js or browser installations.
  "debug.javascript.defaultRuntimeExecutable": {
    "pwa-node": "node"
  },
  // Default options used when debugging a process through the `Debug: Attach to Node.js Process` command
  "debug.javascript.pickAndAttachOptions": {},
  // Request options to use when loading resources, such as source maps, in the debugger. You may need to configure this if your sourcemaps require authentication or use a self-signed certificate, for instance. Options are used to create a request using the [`got`](https://github.com/sindresorhus/got) library.
  //
  // A common case to disable certificate verification can be done by passing `{ "https": { "rejectUnauthorized": false } }`.
  "debug.javascript.resourceRequestOptions": {},
  // Whether to suggest pretty printing JavaScript code that looks minified when you step into it.
  "debug.javascript.suggestPrettyPrinting": true,
  // Default launch options for the JavaScript debug terminal and npm scripts.
  "debug.javascript.terminalOptions": {},
  // Configures whether sourcemapped file where the original file can't be read will automatically be unmapped. If this is false (default), a prompt is shown.
  "debug.javascript.unmapMissingSources": false,
  // Controls whether 'Peek References' or 'Find References' is invoked when selecting code lens references
  //  - peek: Show references in peek editor.
  //  - view: Show references in separate view.
  "references.preferredLocation": "peek",
  // 控制是否自动检测 npm 脚本。
  "npm.autoDetect": "on",
  // 从资源管理器上下文菜单中启用运行文件夹中包含的 NPM 脚本。
  "npm.enableRunFromFolder": false,
  // The NPM Script Explorer is now available in 'Views' menu in the Explorer in all folders.
  // 在没有顶级 "package.json" 文件时，为 npm 脚本启用资源管理器视图。
  "npm.enableScriptExplorer": false,
  // 配置应从自动脚本检测中排除的文件夹的 glob 模式。
  "npm.exclude": "",
  // 从 https://registry.npmjs.org 和 https://registry.bower.io 获取数据，以提供自动补全和 npm 依赖项上的悬停功能信息。
  "npm.fetchOnlinePackageInfo": true,
  // 用于运行脚本的程序包管理器。
  //  - auto: 根据锁定文件和已安装的包管理器，自动检测用于运行脚本的包管理器。
  //  - npm: 使用 npm 作为运行脚本的包管理器。
  //  - yarn: 使用 yarn 作为运行脚本的包管理器。
  //  - pnpm: 使用 pnpm 作为运行脚本的包管理器。
  "npm.packageManager": "auto",
  // 使用 `--silent` 选项运行 npm 命令。
  "npm.runSilent": false,
  // npm 脚本资源管理器中使用的默认单击操作: "打开"或"运行"，默认值为"打开"。
  "npm.scriptExplorerAction": "open",
  // 正则表达式的数组，指示应从 NPM 脚本视图中排除哪些脚本。
  "npm.scriptExplorerExclude": [],
  // 启用/禁用在简单浏览器中聚焦时显示的浮动指示器。
  "simpleBrowser.focusLockIndicator.enabled": true,
  // 控制是否启用强制推送 (不论 force 还是 force-with-lease)。
  "git.allowForcePush": false,
  // 控制是否允许没有运行 pre-commit 和 commit-msg 挂钩的提交。
  "git.allowNoVerifyCommit": false,
  // 始终显示“暂存的更改”资源组。
  "git.alwaysShowStagedChangesResourceGroup": false,
  // 控制所有提交的 signoff 标志。
  "git.alwaysSignOff": false,
  // 若设置为 true，则自动从当前 Git 存储库的默认远程库提取提交。若设置为“全部”，则从所有远程库进行提取。
  "git.autofetch": false,
  // 在启用“#git.autofetch#”情况下每次自动 git fetch 之间的间隔时间(以秒为单位)。
  "git.autofetchPeriod": 180,
  // 是否启用自动刷新。
  "git.autorefresh": true,
  // 配置何时自动检测存储库。
  //  - true: 扫描当前打开文件夹与当前打开文件所在文件夹的子文件夹。
  //  - false: 禁止自动扫描存储库。
  //  - subFolders: 扫描当前打开文件夹的子文件夹。
  //  - openEditors: 扫描当前打开文件的父文件夹。
  "git.autoRepositoryDetection": true,
  // 在拉取前暂存所有更改，在成功拉取后还原这些更改。
  "git.autoStash": false,
  // 控制分支的排列顺序。
  "git.branchSortOrder": "committerdate",
  // 用于验证新分支名称的正则表达式。
  "git.branchValidationRegex": "",
  // 在新分支名称中替换空白字符的字符。
  "git.branchWhitespaceChar": "-",
  // 控制在运行“签出到…”时列出的 git 参考类型。
  //  - local: 本地分支
  //  - tags: 标记
  //  - remote: 远程分支
  "git.checkoutType": [
    "local",
    "remote",
    "tags"
  ],
  // 控制在储藏、提交、放弃、暂存或取消暂存更改时，是否应自动关闭差异编辑器。
  "git.closeDiffOnOperation": false,
  // GIT 命令列表 (例如: commit、push)，这些命令的 `stdout` 将被记录到 [git 输出](command:git.showOutput)。如果 GIT 命令配置了客户端挂钩，那么客户端挂钩的 `stdout` 也将被记录到 [git 输出](command:git.showOutput)。
  "git.commandsToLog": [],
  // 始终确认为 "Git: Commit Empty" 命令创建空提交。
  "git.confirmEmptyCommits": true,
  // 控制在强制推送前是否进行确认。
  "git.confirmForcePush": true,
  // 控制是否在提交前要求确认而不进行验证。
  "git.confirmNoVerifyCommit": true,
  // 同步 Git 存储库前请先进行确认。
  "git.confirmSync": true,
  // 控制 Git 计数徽章。
  //  - all: 对所有更改计数。
  //  - tracked: 仅对跟踪的更改计数。
  //  - off: 关闭计数器。
  "git.countBadge": "all",
  // 控制 Git 是否在资源管理器和“打开编辑器”视图中添加颜色和小标。
  "git.decorations.enabled": true,
  // 克隆 Git 存储库的默认位置。
  "git.defaultCloneDirectory": null,
  // 控制是否自动检测 Git 子模块。
  "git.detectSubmodules": true,
  // 控制可检测到的 Git 子模块的限制。
  "git.detectSubmodulesLimit": 10,
  // 使用 GPG 或 x.509 启用提交签名。
  "git.enableCommitSigning": false,
  // 是否启用 Git。
  "git.enabled": true,
  // 在没有暂存的更改时提交所有更改。
  "git.enableSmartCommit": false,
  // 控制Git Sync命令是否出现在状态栏中。
  "git.enableStatusBarSync": true,
  // Git 安装流程的实验性改进。
  "git.experimental.installGuide": "default",
  // 启用后，在拉取时获取所有分支。否则，仅获取当前。
  "git.fetchOnPull": false,
  // 遵循“运行同步命令时推送所有标记”。
  "git.followTagsWhenSync": false,
  // This setting is now deprecated, please use `github.gitAuthentication` instead.
  //
  "git.githubAuthentication": null,
  // 要忽略的 Git 存储库列表。
  "git.ignoredRepositories": [],
  // 忽略“旧版 Git”警告。
  "git.ignoreLegacyWarning": false,
  // 忽略“存储库中存在大量更改”的警告。
  "git.ignoreLimitWarning": false,
  // 忽略“缺失 Git”的警告。
  "git.ignoreMissingGitWarning": false,
  // 忽略拉取时发出的分支似乎已变基的警告。
  "git.ignoreRebaseWarning": false,
  // 忽略对文件树中子模块的修改。
  "git.ignoreSubmodules": false,
  // 如果 Windows 上安装了 Git 2.25 - 2.26，则忽略警告。
  "git.ignoreWindowsGit27Warning": false,
  // 控制何时显示提交消息输入验证。
  "git.inputValidation": "warn",
  // 控制显示提交消息长度警告的长度阈值。
  "git.inputValidationLength": 72,
  // 控制显示警告的提交消息主题长度阈值。请取消设置它以继承 "config.inputValidationLength" 的值。
  "git.inputValidationSubjectLength": 50,
  // 控制是否在克隆后自动打开存储库。
  //  - always: 始终在当前窗口中打开。
  //  - alwaysNewWindow: 始终在新窗口中打开。
  //  - whenNoFolderOpen: 只有在没有打开任何文件夹时，才在当前窗口中打开。
  //  - prompt: 始终提示操作。
  "git.openAfterClone": "prompt",
  // 控制单击更改时是否应打开差异编辑器。否则将打开常规编辑器。
  "git.openDiffOnClick": true,
  // Git 可执行文件的路径和文件名，例如 "C:\Program Files\Git\bin\git.exe" (Windows)。这也可以是一个包含多个要查找的路径的字符串值数组。
  "git.path": null,
  // 成功提交后运行 git 命令。
  //  - none: 提交后不要运行任何命令。
  //  - push: 成功提交后运行'Git Push'。
  //  - sync: 成功提交后运行'Git Sync'。
  "git.postCommitCommand": "none",
  // 控制 Git 是否在提交之前检查未保存的文件。
  //  - always: 检查是否有任何未保存的文件。
  //  - staged: 只检查未保存的已暂存文件。
  //  - never: 禁用此检查。
  "git.promptToSaveFilesBeforeCommit": "always",
  // 控制 Git 是否在储藏更改之前检查未保存的文件。
  //  - always: 检查是否有任何未保存的文件。
  //  - staged: 只检查未保存的已暂存文件。
  //  - never: 禁用此检查。
  "git.promptToSaveFilesBeforeStash": "always",
  // 提取时修剪。
  "git.pruneOnFetch": false,
  // 拉取时提取所有标签。
  "git.pullTags": true,
  // 在运行“同步”命令时，强制 Git 使用“变基”。
  "git.rebaseWhenSync": false,
  // 当 `git.autoRepositoryDetection` 设置为 “true” 或 “subFolders” 时扫描 Git 存储库时忽略的文件夹列表。
  "git.repositoryScanIgnoredFolders": [
    "node_modules"
  ],
  // 在将 `git.autoRepositoryDetection` 设置为 `true` 或 `subFolders` 时，控制扫描工作区文件夹以查找 Git 存储库时使用的深度。如果不进行限制，可以设置为 `-1`。
  "git.repositoryScanMaxDepth": 1,
  // 控制在是要求进行显式 Git 用户配置，还是允许 Git 在缺少配置时进行猜测。
  "git.requireGitUserConfig": true,
  // 在其中搜索 Git 存储库的路径的列表。
  "git.scanRepositories": [],
  // 控制是否在 Git 源控制面板中显示提交输入。
  "git.showCommitInput": true,
  // 控制是否在 Git 更改视图中显示内联“打开文件”操作。
  "git.showInlineOpenFileAction": true,
  // 控制 Git 操作是否显示进度提示。
  "git.showProgress": true,
  // 控制在推送成功时是否显示通知。
  "git.showPushSuccessNotification": false,
  // 控制是否显示要同步或发布的操作按钮(如果存在未发布的提交)。
  //  - always: 如果存在未发布的提交，则始终显示操作按钮。
  //  - whenEmpty: 只有当无其他更改且存在未发布的提交时，才显示操作按钮。
  //  - never: 从不显示操作按钮。
  "git.showUnpublishedCommitsButton": "whenEmpty",
  // 控制哪些更改由Smart Commit自动暂存。
  //  - all: 自动暂存所有更改。
  //  - tracked: 仅自动暂存跟踪的更改。
  "git.smartCommitChanges": "all",
  // 控制如何限制可从 Git 状态命令分析的更改数。可以设置为 0 表示无限制。
  "git.statusLimit": 10000,
  // 建议启用智能提交(在无暂存更改时提交所有更改)。
  "git.suggestSmartCommit": true,
  // 控制在运行同步操作时是否出现通知，允许用户取消操作。
  "git.supportCancellation": false,
  // 控制是否使 VS Code 成为集成终端中产生的 git 进程的身份验证处理程序。请注意: 需要重启终端才能选择此设置中的更改。
  "git.terminalAuthentication": true,
  // 控制在日程表视图中项目使用的日期。
  //  - committed: 使用提交日期
  //  - authored: 使用创作日期
  "git.timeline.date": "committed",
  // 控制是否在日程表视图中显示提交作者。
  "git.timeline.showAuthor": true,
  // 控制未跟踪的更改的行为。
  //  - mixed: 所有更改，无论是跟踪的还是未跟踪的，都会一起出现并表现出相同的行为。
  //  - separate: 未跟踪的更改单独显示在“源代码管理”视图中。它们也被排除在几个操作之外。
  //  - hidden: 未跟踪的更改被隐藏，并从多个操作中排除。
  "git.untrackedChanges": "mixed",
  // 控制是否将提交输入框中的消息用作默认储藏消息。
  "git.useCommitInputAsStashMessage": false,
  // 控制是否使用更安全的 force-with-lease 进行强制推送。
  "git.useForcePushWithLease": true,
}
```
