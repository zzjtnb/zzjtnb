---
title: VSCode 在多台设备之间同步所有 VSCode 配置
category: VS Code
tags:
  - Syncing
  - VS Code
cover: https://cdn.pixabay.com/photo/2015/03/30/12/35/sunset-698501_960_720.jpg
---

## Syncing 相关资料

## Syncing 官方中文说明

[官方中文说明地址链接](https://github.com/nonoroazoro/vscode-syncing/blob/master/README.zh-CN.md)

## 功能

*Syncing* 可以在`本地和云端之间同步你的所有 VSCode 配置`，包括：

1. **上传 VSCode 配置**:

    * 包括你的 `用户设置`, `快捷键`, `扩展`, `语言设置` 以及所有 `代码片段（Snippets）`；
    * 因为 `Mac` 和`非 Mac` 设备的配置通常会有一些差异，所以 `快捷键` 将会按照设备类型分别上传；
    * 自动帮你创建新的 `Gist` 来保存 VSCode 配置，例如当你第一次使用这个扩展上传配置时；
    * 为了加快同步速度，整个同步过程都是`增量`的；
    * 你可以`排除某些 VSCode 配置项和扩展`，以防它们被上传，具体请参考[这里]。

2. **下载 VSCode 配置**:

    * 请注意，下载配置时会**覆盖**你的本地配置（以云端为准，精确同步）；
    * 自动帮你`安装`、`升级`和`删除`扩展；
    * 你可以从一个`公开的 Gist` 中下载配置。例如，下载你朋友分享的配置，只要问他要一个 `Gist ID` 就行了，具体请参考[这里](#快速开始)；
    * 你可以`排除某些 VSCode 配置项和扩展`，以防它们被下载，具体请参考[这里]。

另外，如果你访问 GitHub 有困难（万恶的墙），你可以[配置一个代理]来加速同步。当然，同步时的`进度条`肯定有的咯！

## 命令

在 `VSCode 的命令面板`中，你可以输入 `upload`、`download`（或者 `syncing`）来快速搜索和执行 `Syncing` 的所有命令。

1. ***`Syncing: Upload Settings`***

    > 上传配置到 GitHub Gist。

2. ***`Syncing: Download Settings`***

    > 从 GitHub Gist 下载配置。

3. ***`Syncing: Open Syncing Settings`***

    > 设置 `GitHub Personal Access Token`、`Gist ID` 或`代理`。

## 快速开始

1. 创建你自己的 `GitHub Personal Access Token`（总共 3 步）：

    1. 登录到你的 **[GitHub Personal Access Tokens 页面](https://github.com/settings/tokens)**，点击 **`Generate new token`**；

        ![generate new token](https://github.com/nonoroazoro/vscode-syncing/raw/master/docs/png/Generate-New-Token.png)

    2. 指定一个 **`name`**，然后勾选 **`gist`**，最后点击 **`Generate token`**；

        ![allow gist](https://github.com/nonoroazoro/vscode-syncing/raw/master/docs/png/Allow-Gist.png)

    3. 点击 **`Copy`** 并且 **`备份`** 你的 Token。

        ![copy and backup token](https://github.com/nonoroazoro/vscode-syncing/raw/master/docs/png/Copy-Token.png)

2. 同步你的 VSCode 配置：

    在第一次使用时，`Syncing` 会向你询问一些必要的信息并保存下来以供后续使用，主要就是前面申请的 `GitHub Personal Access Token` 啦。

    1. **上传配置**

        1. 在 `VSCode 的命令面板` 中输入 `upload`；

            ![upload settings](https://github.com/nonoroazoro/vscode-syncing/raw/master/docs/png/Upload-Settings.png)

        2. 填写刚才申请的 `GitHub Personal Access Token`；

        3. 在下拉框中选择或者手动输入一个 `Gist ID`；

            > 你可以留空，那样的话 `Syncing` 会自动帮你创建一个新的 `Gist`。

        4. 完成！

        5. *在上传完成后，你可以在 [GitHub Gist](https://gist.github.com) 中找到对应的 `Gist` 和 `Gist ID`。当然你也可以通过 `Edit` 和 `make it public` 操作将你的配置共享给其他人。*

    2. **下载配置**

        1. 在 `VSCode 的命令面板` 中输入 `download`；

            ![download settings](https://github.com/nonoroazoro/vscode-syncing/raw/master/docs/png/Download-Settings.png)

        2. 填写你的 `GitHub Personal Access Token`；

            > 你可以留空，那样的话就能从一个`公开的 Gist`（比如你朋友共享给你的 `Gist`）来下载配置了。

        3. 在下拉框中选择或者手动输入一个 `Gist ID`（当然这里也可以输入一个`公开的 Gist ID`）。

        4. 完成！

## 我的 VsCode 所有设置

## 编辑器设置

```json
{
    //------------------------ 编辑器相关 ------------------------
    // 每次保存的时候自动格式化
    "editor.formatOnPaste": true,
    //tab代码缩进修改成2个空格
    "editor.tabSize": 2,
    // 控制编辑器是否自动格式化粘贴的内容。格式化程序必须可用，并且能针对文档中的某一范围进行格式化。
    "editor.formatOnSave": true,
    //图标主题
    "workbench.iconTheme": "material-icon-theme",
    // 编辑器颜色主题
    "workbench.colorTheme": "Atomize",
    // 以像素为单位控制字体大小
    "editor.fontSize": 18,
    // 启用或禁用字体连字。
    "editor.fontLigatures": true,
    // 控制字体粗细
    "editor.fontWeight": "900",
    // 启用/禁用导航路径
    "breadcrumbs.enabled": false,
    //控制编辑器在空白字符上显示符号的方式。
    "editor.renderWhitespace": "boundary",
    //当在 VS Code 中重命名或移动文件时，启用或禁用自动更新导入路径。要求工作区使用高于 2.9 版本的 TypeScript。always: 始终自动更新路径。
    "javascript.updateImportsOnFileMove.enabled": "always",
    // 用户代码片段在建议窗口小部件中的位置
    "editor.snippetSuggestions": "top",
    // 启用后，按下 TAB 键，将展开 Emmet 缩写。
    "emmet.triggerExpansionOnTab": true,
    // 控制是否在编辑器中输入时自动重命名
    "editor.renameOnType": true,
    //透明度
    "winopacity.opacity": 230,
    //------------------------ Vue相关 ------------------------
    //关闭Vetur的模板验证
    "vetur.validation.template": false,
    // 使用tab（制表位）缩进而非空格；
    "vetur.format.options.useTabs": true,
    "vetur.format.defaultFormatterOptions": {
        // prettyhtml:[prettyhtml]默认格式化
        "prettyhtml": {},
        // prettier:[css、postcss、scss、less、stylus、js、ts]默认格式化
        "prettier": {
            "printWidth": 500, // 换行字符串阈值
        },
    },
    //------------------------ HTML相关 ------------------------
    "liveServer.settings.fullReload": true,
    "liveServer.settings.CustomBrowser": "chrome:PrivateMode",
    "htmlPreview.openWith": "vscode",
    //------------------------ koroFileHeader ------------------------
    // 插件配置项
    "fileheader.configObj": {},
    // 函数注释
    "fileheader.cursorMode": {},
    // 头部注释
    "fileheader.customMade": {
        "Description": " ",
        "Author": "zzjt",
        "Date": "Do not edit",
        "LastEditors": "zzjt",
        "LastEditTime": "Do not edit",
        "FilePath": "Do not edit" // 增加此项配置即可
    },
}
```

## 用户代码片段

```json
//打开VSCODE编辑器，依次选择"文件 -> 首选项 -> 用户代码片段"，此时，会弹出一个搜索框，我们输入vue会出现一个vue.json的文件,
//没有的话则点击新建全局代码片段文件,然后输入文件名保存即可(为了方便记忆直接取输入vue吧)
//选择vue或者新建全局代码片段文件之后， VSCODE会自动打开一个名字为vue.json的文件， 复制以下内容到这个文件中.
//保存后关闭这个文件。
//稍稍解释一下：
//$0 表示你希望生成代码后光标的位置;
//prefix 表示生成对应预设代码的命令
//例如： 我们新建一个名为demo.vue的文件， 输入vue按下enter， 就会自动生成内容啦.当然，你也可以为.js、.html等各种文件预设代码片段。
{
  "Print to console": {
    "prefix": "vue",
    "body": [
      "<!-- $0 -->",
      "<template>",
      "  <div>\n",
      "  </div>",
      "</template>\n",
      "<script>",
      "export default {",
      "  data () {",
      "    return {\n",
      "    }",
      "  },",
      "  mounted() {\n",
      "  },",
      "  methods: {\n",
      "  },",
      "   components: {\n",
      "  },",
      "}",
      "</script>\n",
      "<style scoped>\n",
      "</style>"
    ],
    "description": "Log output to console"
  }
}

```

## 我的 syncing.json

```json
{
    "id": "7811bc5fdcabfae2d85b7947ba26fbd3",
    "token": "ab166d8e74c489bd8c4100ed74d7613ccdb39ff2",
    "http_proxy": ""
}
```

## vscode 拓展

```json
[
    {
        "id": "CoenraadS.bracket-pair-colorizer",
        "name": "bracket-pair-colorizer",
        "publisher": "CoenraadS",
        "version": "1.0.61"
    },
    {
        "id": "emroussel.atomize-atom-one-dark-theme",
        "name": "atomize-atom-one-dark-theme",
        "publisher": "emroussel",
        "version": "1.4.5"
    },
    {
        "id": "ionutvmi.path-autocomplete",
        "name": "path-autocomplete",
        "publisher": "ionutvmi",
        "version": "1.13.6"
    },
    {
        "id": "jeff-hykin.polacode-2019",
        "name": "polacode-2019",
        "publisher": "jeff-hykin",
        "version": "0.5.2"
    },
    {
        "id": "MS-CEINTL.vscode-language-pack-zh-hans",
        "name": "vscode-language-pack-zh-hans",
        "publisher": "MS-CEINTL",
        "version": "1.46.0"
    },
    {
        "id": "msjsdiag.debugger-for-chrome",
        "name": "debugger-for-chrome",
        "publisher": "msjsdiag",
        "version": "4.12.8"
    },
    {
        "id": "nonoroazoro.syncing",
        "name": "syncing",
        "publisher": "nonoroazoro",
        "version": "3.0.13"
    },
    {
        "id": "OBKoro1.korofileheader",
        "name": "korofileheader",
        "publisher": "OBKoro1",
        "version": "4.7.0"
    },
    {
        "id": "octref.vetur",
        "name": "vetur",
        "publisher": "octref",
        "version": "0.24.0"
    },
    {
        "id": "PKief.material-icon-theme",
        "name": "material-icon-theme",
        "publisher": "PKief",
        "version": "4.1.0"
    },
    {
        "id": "ritwickdey.LiveServer",
        "name": "LiveServer",
        "publisher": "ritwickdey",
        "version": "5.6.1"
    },
    {
        "id": "SimonSiefke.html-preview",
        "name": "html-preview",
        "publisher": "SimonSiefke",
        "version": "2.0.1"
    },
    {
        "id": "skacekachna.win-opacity",
        "name": "win-opacity",
        "publisher": "skacekachna",
        "version": "1.1.1"
    },
    {
        "id": "vincaslt.highlight-matching-tag",
        "name": "highlight-matching-tag",
        "publisher": "vincaslt",
        "version": "0.9.9"
    },
    {
        "id": "xabikos.JavaScriptSnippets",
        "name": "JavaScriptSnippets",
        "publisher": "xabikos",
        "version": "1.8.0"
    },
    {
        "id": "yzhang.markdown-all-in-one",
        "name": "markdown-all-in-one",
        "publisher": "yzhang",
        "version": "2.8.0"
    }
]
```
