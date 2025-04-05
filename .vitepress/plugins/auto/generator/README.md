# VitePress 配置生成器

根据文件结构自动生成 VitePress 的导航栏和侧边栏配置的高性能工具。

## 功能特点

- 🚀 **自动生成** - 根据文件结构自动生成导航和侧边栏
- 🌲 **多级结构** - 支持复杂嵌套目录结构
- 📑 **Frontmatter** - 智能提取文档元数据
- 📊 **高效排序** - 多阶段排序算法
- 🔍 **自动索引** - 智能识别index.md文件
- 🎨 **自定义样式** - 灵活的图标和样式配置
- ⚡ **高性能** - 优化的代码结构和并行处理

## 安装

```bash
npm install vitepress-auto-config
```

## 基本使用

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import { Generator } from './plugins/auto/utils/generator'

export default defineConfig(async () => {
  const { nav, sidebar } = await Generator()

  return {
    title: '我的文档站点',
    themeConfig: {
      nav,
      sidebar
    }
  }
})
```

## 生成逻辑详解

### 文件树结构处理

生成器基于文件系统结构工作，遵循以下步骤：

1. **文件树构建**：扫描指定目录，生成文件树结构
2. **预处理**：对文件树进行排序和标准化处理
3. **并行处理**：同时构建导航栏和侧边栏配置

生成的导航和侧边栏配置与文件结构的对应关系如下：

```
docs/                    -> 不显示在导航栏
├─ guide/                -> 导航栏项 "指南"
│  ├─ index.md           -> 链接到 /guide/
│  ├─ getting-started.md -> 侧边栏项 "快速开始"
│  └─ advanced/          -> 侧边栏嵌套项 "高级"
│     ├─ index.md        -> 链接到 /guide/advanced/
│     └─ plugin.md       -> 侧边栏子项 "插件"
└─ api/                  -> 导航栏项 "API"
   ├─ index.md           -> 链接到 /api/
   └─ options.md         -> 侧边栏项 "配置选项"
```

### 导航栏构建逻辑

导航栏构建根据目录结构特征智能选择显示形式：

1. **根目录扫描**：只处理根目录下的直接子目录作为导航项
2. **形式选择**：根据子目录内容结构决定使用简单链接还是下拉菜单
   - 当目录中只有一个 `index.md` 文件时，使用简单链接
   - 当目录中有多个文件但没有子目录时，使用简单链接
   - 当目录包含子目录时，使用下拉菜单

3. **链接目标选择逻辑**：

   ```javascript
   if (存在index.md) {
     链接到目录根路径 (如 /guide/)
   } else if (存在其他md文件) {
     链接到第一个md文件 (如 /guide/intro)
   }
   ```

### 侧边栏构建逻辑

侧边栏根据每个一级目录单独构建：

1. **目录映射**：为每个一级目录创建独立的侧边栏配置

   ```javascript
   sidebar = {
     '/guide/': [...guide目录内容生成的侧边栏项],
     '/api/': [...api目录内容生成的侧边栏项]
   }
   ```

2. **内容递归处理**：
   - 扫描目录中所有Markdown文件和子目录
   - 对于子目录，递归处理并创建嵌套的侧边栏项
   - 空目录或不含Markdown文件的目录会被自动过滤

3. **内容验证逻辑**：

   ```javascript
   function hasValidContent(dir) {
     return dir包含任何Markdown文件 || dir的任何子目录包含有效内容
   }
   ```

## 标题和显示优先级规则

生成器根据明确的优先级规则确定文件标题：

### 文件标题判定优先级

1. **frontmatter优先**：如果文件中设置了`frontmatter.title`，优先使用该值

   ```
   ---
   title: 自定义标题
   ---
   ```

2. **主页特殊处理**：对于`index.md`文件，如果没有设置frontmatter.title：
   - 显示为"目录名+首页"，例如：`/guide/index.md` → "指南首页"

3. **一般文件处理**：其他md文件移除扩展名作为标题
   - 例如：`getting-started.md` → "getting-started"

### 折叠控制逻辑

侧边栏的折叠属性(`collapsed`)根据子目录内容智能添加：

```javascript
// 仅当目录包含有效子目录时才添加折叠属性
if (hasSubDirectories) {
  sidebarItem.collapsed = config.sidebar.collapsed ?? true
}
```

## 配置选项详解

```javascript
const { nav, sidebar } = await Generator({
  debug: false, // 启用后会输出性能报告

  // 导航栏配置
  nav: {
    dropdown: true, // true=使用下拉菜单形式，false=只使用简单链接形式
    showIcon: true, // 是否显示图标
    filePrefix: '📄', // 文件前缀图标
    dirPrefix: '📁' // 目录前缀图标
  },

  // 侧边栏配置
  sidebar: {
    collapsed: true, // 是否默认折叠嵌套项
    showIcon: true, // 是否显示图标
    filePrefix: '📄', // 文件前缀图标
    dirPrefix: '📁' // 目录前缀图标
  },

  // 排序配置
  sorting: {
    order: {
      index: 0, // index.md 排序权重
      guide: 1, // guide.md 排序权重
      custom: 2, // 自定义排序规则权重(包含priority数组的处理)
      directory: 3, // 目录权重
      file: 4 // 普通文件权重
    },
    priority: [ // 作为custom的一部分，用于指定特定文件的优先级列表
      'README.md', // 最高优先级
      'CHANGELOG.md' // 次高优先级
    ]
  }
})
```

## 排序算法详解

配置生成器使用5阶段排序算法，确保内容以合理顺序显示：

### 1. 特殊文件优先

`index.md` 和 `guide.md` 始终排在最前面：

```javascript
const specialFiles = new Map([
  ['index.md', order.index ?? 0],  // 最高优先级
  ['guide.md', order.guide ?? 1],  // 次高优先级
]);

// 比较逻辑
const aSpecial = specialFiles.get(aName) ?? Infinity;
const bSpecial = specialFiles.get(bName) ?? Infinity;
if (aSpecial !== bSpecial) return aSpecial - bSpecial;
```

### 2. 自定义排序规则

通过`order.custom`定义的排序规则，包含多种子规则：

```javascript
// 获取自定义排序权重
const customWeight = order.custom ?? 2;

// 检查是否应用自定义排序
if (customWeight !== Infinity && customWeight < Math.min(
  order.directory ?? Infinity,
  order.file ?? Infinity
)) {
  // 作为custom的一部分，应用priority数组排序
  const aPriority = priorityMap.get(aName);
  const bPriority = priorityMap.get(bName);

  // 如果任一文件在priority中，按数组顺序排序
  if (aPriority !== undefined || bPriority !== undefined) {
    return (aPriority ?? Infinity) - (bPriority ?? Infinity);
  }

  // 可添加其他自定义排序逻辑
}
```

### 3. 目录类型排序

目录优先于文件显示：

```javascript
if (a.type !== b.type) {
  return (order[a.type] ?? Infinity) - (order[b.type] ?? Infinity);
}
```

### 4. Frontmatter排序

支持在文档中使用`order`字段指定排序权重：

```javascript
const aOrder = a.frontmatter?.order ?? order.file ?? Infinity;
const bOrder = b.frontmatter?.order ?? order.file ?? Infinity;
if (aOrder !== bOrder) return aOrder - bOrder;
```

### 5. 文件名自然排序

中文和数字的智能排序：

```javascript
return String(a.name).localeCompare(String(b.name), 'zh-CN', {numeric: true});
```

## 性能优化策略

最新版本包含多项性能和代码质量改进：

1. **并行处理** - 导航栏和侧边栏并行构建：

   ```javascript
   const [nav, sidebar] = await Promise.all([
     performanceMonitor.time('buildNav', () => this.#buildNav()),
     performanceMonitor.time('buildSidebar', () => this.#buildSidebar()),
   ]);
   ```

2. **提前返回模式** - 减少代码嵌套和不必要的处理：

   ```javascript
   if (!fileTree.length) {
     generateEnd();
     return {nav: [], sidebar: {}, fileTree: []};
   }
   ```

3. **缓存查找结果** - 使用Map结构代替对象，减少重复计算：

   ```javascript
   const priorityMap = new Map(priority.map((p, i) => [p.toLowerCase(), i]))
   ```

4. **按需加载** - 仅在找不到索引文件时才查找第一个md文件：

   ```javascript
   const firstMdFile = !indexFile ? findFirstMarkdownFile(children) : null
   ```

5. **空值合并运算符** - 使用现代ES6+语法简化逻辑：

   ```javascript
   this.#config.sorting ??= CONSTANTS.DEFAULT_CONFIG.sorting;
   ```

## 性能监控工具

```javascript
import { Generator, performanceMonitor } from './plugins/auto/utils/generator'

// 启用监控(或通过options.debug=true自动启用)
performanceMonitor.enable()

// 生成配置并查看性能报告
const result = await Generator({ debug: true })
console.log(performanceMonitor.getFormattedReport())
```

## 高级使用

### 自定义生成器

```javascript
import { FileTreeBuilder } from './plugins/auto/utils/fileTree'
import { VitePressGenerator } from './plugins/auto/utils/generator'

// 自定义文件树构建器
const fileTreeBuilder = new FileTreeBuilder({
  srcDir: './docs',
  maxDepth: 10
})

// 创建生成器实例并生成配置
const generator = new VitePressGenerator({
  // 自定义配置
}, fileTreeBuilder)
const { nav, sidebar, fileTree } = await generator.generate()
```

### 工具函数

```javascript
import { pathUtils, sortNodes } from './plugins/auto/utils/generator'

// 路径处理
const path = pathUtils.buildPath('docs', 'guide') // '/docs/guide/'
const name = pathUtils.removeMdExt('readme.md') // 'readme'

// 节点排序
const sortedItems = sortNodes(items, sortingConfig)
```

## 使用示例

在`examples`目录中提供了多个示例文件，帮助您了解如何在不同场景中使用配置生成器：

### basic.js - 基础使用示例

展示最基本的配置生成功能，包括：

- 使用默认配置生成
- 自定义基本配置选项
- 将生成结果输出到文件

```javascript
import { Generator } from '../index.js'

// 基本用法
const { nav, sidebar } = await Generator({
  debug: true,
  nav: {
    showIcon: true,
    dirPrefix: '📂'
  }
})
```

### advanced.js - 高级用法示例

展示更复杂的配置和功能，包括：

- 自定义文件树构建器
- 手动创建生成器实例
- 使用性能监控工具
- 自定义文件处理和排除模式

```javascript
import { FileTreeBuilder } from '../../fileTree/index.js'
import { performanceMonitor, VitePressGenerator } from '../index.js'

// 启用性能监控
performanceMonitor.enable()

// 自定义文件树构建器
const fileTreeBuilder = new FileTreeBuilder({
  srcDir: './docs',
  maxDepth: 5,
  exclude: ['node_modules', '.git']
})

// 创建生成器并使用
const generator = new VitePressGenerator({/* ... */}, fileTreeBuilder)
const result = await generator.generate()
```

### custom-sort.js - 自定义排序示例

重点展示排序功能和自定义规则：

- 直接使用sortNodes函数
- 测试不同的排序配置
- 优先级数组(priority)的实际效果
- 以可视化方式比较排序结果

```javascript
import { sortNodes } from '../index.js'

// 排序配置示例
const sortingConfig = {
  order: {
    index: 0,
    guide: 1,
    custom: 2,
    directory: 3,
    file: 4
  },
  priority: ['README.md', 'getting-started.md']
}

// 排序节点数组
const sortedItems = sortNodes(items, sortingConfig)
```

运行示例：

```bash
# 运行基本示例
node .vitepress/plugins/auto/utils/generator/examples/basic.js

# 运行高级示例
node .vitepress/plugins/auto/utils/generator/examples/advanced.js

# 运行排序示例
node .vitepress/plugins/auto/utils/generator/examples/custom-sort.js
```

## 类型支持

```typescript
// 导入类型
import type {
  GeneratorConfig,
  GeneratorResult,
  NavItem,
  SidebarItem,
  TreeNode
} from './plugins/auto/utils/generator/types'

// 使用类型
const config: GeneratorConfig = { /* ... */ }
const result: GeneratorResult = await Generator(config)
```

## 示例文件详解

在 `examples` 目录中提供了多个示例文件，演示了不同场景下的使用方法和配置选项：

### 1. 基础示例 (`basic.js`)

演示最基本的配置生成功能，适合初次使用的用户：

- 使用默认和自定义配置生成导航与侧边栏
- 将生成的配置保存为独立JavaScript模块
- 展示如何在VitePress配置中应用生成的结果

运行方法:

```bash
node examples/basic.js
```

### 2. 自定义排序示例 (`custom-sort.js`)

展示多阶段排序算法的工作原理和使用方法：

- 五级优先级排序机制的实际应用
- 使用priority数组自定义文件的显示顺序
- 比较不同排序配置的效果
- 生成可视化HTML页面展示排序结果

运行方法:

```bash
node examples/custom-sort.js
```

### 3. 高级示例 (`advanced.js`)

演示生成器的高级功能和性能监控，适合大型文档项目：

- 自定义文件树构建器配置
- 文件过滤与元数据提取
- 完整的性能监控与分析
- 深度自定义配置选项

运行方法:

```bash
node examples/advanced.js
```

这些示例文件提供了从简单到复杂的完整使用指南，建议按照基础→排序→高级的顺序依次学习和尝试。
