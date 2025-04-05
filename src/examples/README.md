# VitePress 教程

## 安装

### 1. 创建目录

```sh
mkdir zzjtnb
cd zzjtnb
```

### 2. 初始化项目

运行以下命令初始化 VitePress:

```sh
# 前置准备
pnpm add -D vitepress
# 安装向导
pnpm vitepress init
```

### 3. 初始化配置

以下是包含 **Tips** 的 VitePress 初始化过程中 **英文提示及中文注释** 的完整表格总结:

| 英文提示                                                                                                  | 中文注释                                                      | 默认值/选项     | 解释                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| **Where should VitePress initialize the config?**                                                         | **VitePress 的配置文件应初始化在哪个目录?**                   | `./`            | 指定 VitePress 配置文件的存放目录,通常选择 `./docs` 作为文档根目录.                               |
| **Site title:**                                                                                           | **网站标题:**                                                 | 无              | 设置网站的名称,例如"争逐".                                                                        |
| **Site description:**                                                                                     | **网站描述:**                                                 | 无              | 设置网站的简短描述,例如"争霸世界,逐鹿全球".                                                       |
| **Theme:**                                                                                                | **主题:**                                                     | `Default Theme` | 选择 VitePress 的主题方案,可选 `Default Theme`,`Default Theme + Customization` 或 `Custom Theme`. |
| **Use TypeScript for config and theme files?**                                                            | **是否使用 TypeScript 编写配置和主题文件?**                   | `No`            | 如果选择 `Yes`,配置文件将使用 `.ts` 扩展名,并支持 TypeScript 语法.                                |
| **Add VitePress npm scripts to package.json?**                                                            | **是否将 VitePress 的 npm 脚本添加到 package.json 中?**       | `Yes`           | 如果选择 `Yes`,`package.json` 中将自动添加 `docs:dev`,`docs:build` 和 `docs:preview` 脚本.        |
| **Done! Now run npm run docs:dev and start writing.**                                                     | **完成!现在运行 `npm run docs:dev` 并开始编写文档.**          | 无              | 初始化完成后,运行 `npm run docs:dev` 启动开发服务器,即可开始编写文档.                             |
| **Tips:**                                                                                                 | **提示:**                                                     | 无              | 以下为提示信息.                                                                                   |
| - Since you've chosen to customize the theme, you should also explicitly install vue as a dev dependency. | - 由于您选择了自定义主题,您还需要显式安装 Vue 作为开发依赖项. | 无              | 如果选择了 **Custom Theme**,需要手动安装 Vue,例如运行 `pnpm install vue@latest`.                  |

### 4. 主题方案选择

VitePress 提供了三种主题方案,根据需求选择:

| 主题方案                                             | 适用场景                                      | 特点                                                                     |
| ---------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| **Default Theme(默认主题)**                          | 快速搭建博客网站,对样式和功能要求不高         | 开箱即用,支持基本文档展示,适合初学者或简单场景                           |
| **Default Theme + Customization(默认主题 + 自定义)** | 需要更高程度的自定义,但保留默认主题的基础功能 | 在默认主题的基础上进行样式和布局的扩展,灵活性较高                        |
| **Custom Theme(完全自定义主题)**                     | 需要完全自定义的样式和功能                    | 完全从头开发,适合有特定设计需求或复杂功能的场景,灵活性最高但开发成本较大 |

---

## 文件结构

初始化完成后,生成的文件结构如下:

```bash
├─docs/--------------------- # 项目根目录-VitePress 初始化目录(存放文档和配置)
│ ├─.vitepress/------------- # 配置目录-VitePress 配置文件夹(核心配置目录)
│ │ ├─theme/---------------- # 自定义主题文件夹(选择 Custom Theme 时生成)
│ │ │ ├─index.js------------ # 主题入口文件(如果使用 TypeScript,则为 index.ts)
│ │ │ ├─Layout.vue---------- # 自定义布局组件(用于定义页面整体布局)
│ │ │ └─style.css----------- # 自定义样式文件(用于覆盖或扩展默认样式)
│ │ └─config.mjs------------ # VitePress 配置文件(配置网站的基本信息,如果使用 TypeScript，则为 config.mts)
│ ├─api-examples.md--------- # API 示例文档(展示 API 文档编写方式)
│ ├─index.md---------------- # 网站首页(默认的首页内容)
│ └─markdown-examples.md---- # Markdown 示例文档(展示支持的 Markdown 语法)
└─package.json-------------- # 项目配置文件(包含依赖和脚本命令)
```

---

## 开发环境

初始化后,`package.json` 中会生成以下脚本命令:

| 脚本命令                | 描述                 | 默认运行地址            | 生成的文件夹路径           | 文件夹用途           |
| ----------------------- | -------------------- | ----------------------- | -------------------------- | -------------------- |
| `pnpm run docs:dev`     | 启动开发服务器       | <http://localhost:5173> | `./docs/.vitepress/cache/` | 存储开发服务器缓存   |
| `pnpm run docs:build`   | 构建静态文件         | 无                      | `./docs/.vitepress/dist/`  | 存储生产环境构建文件 |
| `pnpm run docs:preview` | 预览构建后的静态文件 | <http://localhost:4173> | 无                         | 无                   |

### .gitignore

由上面的介绍可知,部分文件夹是不需要提交到仓库的,如 `./docs/.vitepress/cache/`.可以通过 `.gitignore` 文件来忽略这些文件夹:

```bash
# 忽略 node_modules 文件夹
node_modules/

# 忽略 VitePress 临时或缓存文件夹
docs/.vitepress/cache/

# 如果使用 CI/CD 工具(如 GitHub Actions)自动构建和部署项目文件夹应在每次构建时重新生成,因此不需要提交到仓库
# 如果没有使用 CI/CD 工具,而是选择在本地手动构建后部署,那么 ./docs/.vitepress/dist/ 文件夹需要提交到仓库,以便部署时使用.因此,不应将该文件夹添加到 .gitignore 文件中.
docs/.vitepress/dist/
```

---

## 参考文档

- VitePress 官网:[快速开始](https://vitepress.dev/zh/guide/getting-started)
- Vue 3 官网:[Vue 3 文档](https://vuejs.org/)

其他相关源码
默认主题的导航栏 (Navbar.vue)
<https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/Navbar.vue>

默认主题的侧边栏 (Sidebar.vue)
<https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/Sidebar.vue>

默认主题的样式 (style/vars.css)
<https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/style/vars.css>
---

## 注意事项

1. 在 `setup` 阶段,建议填写正确的配置信息(如初始化目录,网站标题和描述),以减少后续修改的麻烦.
2. 如果选择 **Custom Theme**,需要熟悉 Vue 3 和 VitePress 的配置,以便更好地自定义主题.
3. 开发过程中,`docs:dev` 会生成缓存文件夹 `.vitepress/cache/`,构建时会生成生产文件夹 `.vitepress/dist/`.

5. 使用虚拟环境
建议在虚拟环境中安装依赖，以避免与全局 Python 环境冲突。以下是创建和使用虚拟环境的步骤：

Bash

# 创建虚拟环境

python -m venv myenv

# 激活虚拟环境（macOS/Linux）

source myenv/bin/activate

# 激活虚拟环境（Windows）

myenv\Scripts\activate

# 安装依赖

pip install -r requirements.txt
