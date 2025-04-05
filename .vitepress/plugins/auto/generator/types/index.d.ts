/**
 * VitePress配置生成器类型定义
 * 为整个生成器提供完整的类型支持和文档
 *
 * 本文件定义了生成器中使用的所有类型，包括配置选项、结果结构和工具函数
 * 的参数与返回值类型，确保代码的类型安全和IDE的智能提示支持。
 *
 * @module types
 */

// ----------------------------- 基础类型 -----------------------------

/**
 * 节点类型
 * 表示文件树中节点的类型，可以是文件或目录
 *
 * @typedef {('directory'|'file')} NodeType
 * @see {@link TreeNode} - 使用此类型的节点接口
 * @see {@link CONSTANTS.NODE_TYPES} - 节点类型常量定义
 */
export type NodeType = 'directory' | 'file'

/**
 * 文件树节点
 * 表示文件系统中的文件或目录，包含必要的元数据
 *
 * @interface TreeNode
 * @example
 * ```ts
 * // 文件节点示例
 * const fileNode: TreeNode = {
 *   name: 'index.md',
 *   type: 'file',
 *   frontmatter: {
 *     title: '首页',
 *     order: 1
 *   }
 * };
 *
 * // 目录节点示例
 * const dirNode: TreeNode = {
 *   name: 'guide',
 *   type: 'directory',
 *   children: [
 *     { name: 'index.md', type: 'file' },
 *     { name: 'getting-started.md', type: 'file' }
 *   ]
 * };
 * ```
 * @see {@link sortNodes} - 用于对TreeNode数组排序的函数
 * @see {@link Generator} - 使用TreeNode的生成器基类
 * @see {@link VitePressGenerator} - 处理TreeNode的VitePress生成器
 */
export interface TreeNode {
  /** 节点名称 (文件名或目录名) */
  name: string
  /** 节点类型 (directory或file) */
  type: NodeType
  /** 子节点数组，仅对目录类型有效 */
  children?: TreeNode[]
  /** 从Markdown文件中提取的Frontmatter数据 */
  frontmatter?: Record<string, any>
  /** 文件的相对路径 */
  path?: string
}

// ----------------------------- VitePress配置类型 -----------------------------

/**
 * 导航栏项配置
 * 用于生成VitePress导航栏中的单个项目
 *
 * @interface NavItem
 * @example
 * ```ts
 * // 简单导航项
 * const simpleNav: NavItem = {
 *   text: '指南',
 *   link: '/guide/'
 * };
 *
 * // 带下拉菜单的导航项
 * const dropdownNav: NavItem = {
 *   text: '参考',
 *   items: [
 *     { text: 'API', link: '/api/' },
 *     { text: '配置', link: '/config/' }
 *   ]
 * };
 * ```
 * @see {@link VitePressGenerator#buildNav} - 构建导航项的方法
 * @see {@link NavConfig} - 导航栏全局配置
 */
export interface NavItem {
  /** 显示文本 */
  text: string
  /** 链接地址，点击导航项时跳转的路径 */
  link?: string
  /** 子项数组，用于构建下拉菜单 */
  items?: NavItem[]
  /** 激活匹配模式，用于高亮当前导航项 */
  activeMatch?: string
}

/**
 * 侧边栏项配置
 * 用于生成VitePress侧边栏中的单个项目
 *
 * @interface SidebarItem
 * @example
 * ```ts
 * // 简单链接侧边栏项
 * const simpleSidebarItem: SidebarItem = {
 *   text: '介绍',
 *   link: '/guide/'
 * };
 *
 * // 带子项的侧边栏分组
 * const groupSidebarItem: SidebarItem = {
 *   text: '高级',
 *   collapsed: true,
 *   items: [
 *     { text: '插件', link: '/guide/plugins' },
 *     { text: '主题', link: '/guide/themes' }
 *   ]
 * };
 * ```
 */
export interface SidebarItem {
  /** 显示文本 */
  text: string
  /** 链接地址，点击侧边栏项时跳转的路径 */
  link?: string
  /** 是否折叠子项，true=默认折叠 */
  collapsed?: boolean
  /** 子项数组，用于构建嵌套侧边栏 */
  items?: SidebarItem[]
}

/**
 * 侧边栏配置映射
 * 键为路径前缀，值为该路径下的侧边栏项数组
 *
 * @typedef {Record<string, SidebarItem[]>} Sidebar
 * @example
 * ```ts
 * const sidebar: Sidebar = {
 *   '/guide/': [
 *     {
 *       text: '指南',
 *       items: [
 *         { text: '介绍', link: '/guide/' },
 *         { text: '快速开始', link: '/guide/getting-started' }
 *       ]
 *     }
 *   ],
 *   '/api/': [
 *     {
 *       text: 'API参考',
 *       items: [
 *         { text: '概述', link: '/api/' },
 *         { text: '配置', link: '/api/config' }
 *       ]
 *     }
 *   ]
 * };
 * ```
 * @see {@link VitePressGenerator#buildSidebar} - 构建此结构的方法
 * @see {@link SidebarItem} - 侧边栏项类型
 */
export type Sidebar = Record<string, SidebarItem[]>

// ----------------------------- 生成器配置类型 -----------------------------

/**
 * 排序配置选项
 * 控制生成器的排序行为，定义多阶段排序算法的各个阶段权重
 *
 * @interface SortingConfig
 * @example
 * ```ts
 * // 默认排序配置
 * const defaultSorting: SortingConfig = {
 *   order: {
 *     index: 0,      // index.md最高优先级
 *     guide: 1,      // guide.md次高优先级
 *     custom: 2,     // 自定义规则(优先级数组等)
 *     directory: 3,  // 目录(优先于普通文件)
 *     file: 4        // 普通文件(最低优先级)
 *   },
 *   priority: ['README.md', 'getting-started.md', 'advanced.md']
 * };
 *
 * // 多阶段排序流程示意:
 * // 1. 特殊文件优先级: index.md > guide.md > 其他文件
 * // 2. 优先级数组: priority数组中的文件按索引顺序排序
 * // 3. 节点类型: 目录 > 文件
 * // 4. Frontmatter顺序: 根据frontmatter.order属性排序
 * // 5. 自然排序: 按文件名自然排序(支持中文和数字)
 * ```
 * @see {@link sortNodes} - 使用该配置的排序函数
 * @see {@link CONSTANTS.DEFAULT_CONFIG.sorting} - 默认排序配置
 */
export interface SortingConfig {
  /**
   * 排序顺序配置
   * 定义不同类型节点的排序权重，数字越小优先级越高
   * 按以下顺序执行:
   * 1. 特殊文件(index, guide)
   * 2. 自定义排序规则(custom)
   *    • 包含priority数组优先级排序
   * 3. 节点类型(directory, file)
   * 4. Frontmatter中的order字段
   * 5. 文件名自然排序
   */
  order: {
    /** index.md文件的排序权重(最高优先级) */
    index: number
    /** guide.md文件的排序权重(次高优先级) */
    guide: number
    /** 自定义排序规则的权重(包含priority数组的应用等) */
    custom: number
    /** 目录的排序权重(优先于普通文件) */
    directory: number
    /** 普通文件的排序权重(最低优先级) */
    file: number
    /** 其他自定义排序规则 */
    [key: string]: number
  }
  /**
   * 优先级列表
   * 作为自定义排序规则(custom)的一部分，控制特定文件的排序顺序
   * 列表中的文件按数组索引顺序进行排序(索引小的排在前面)
   * 不在列表中的文件按照后续排序规则处理
   *
   * @example ['README.md', 'getting-started.md', 'CHANGELOG.md']
   */
  priority: string[]
}

/**
 * 导航栏配置选项
 * 控制导航栏的显示样式和行为
 *
 * @interface NavConfig
 * @example
 * ```ts
 * // 默认导航栏配置
 * const defaultNavConfig: NavConfig = {
 *   dropdown: true,    // 使用下拉菜单
 *   showIcon: true,    // 显示图标
 *   filePrefix: '',    // 文件前缀
 *   dirPrefix: '📂'     // 目录前缀
 * };
 *
 * // 简单链接导航配置
 * const simpleNavConfig: NavConfig = {
 *   dropdown: false,   // 不使用下拉菜单，所有目录都显示为简单链接
 *   showIcon: true,
 *   filePrefix: '📄',
 *   dirPrefix: '📁'
 * };
 * ```
 */
export interface NavConfig {
  /** 是否使用下拉菜单形式 - true=复杂目录使用下拉菜单，false=全部使用简单链接 */
  dropdown: boolean
  /** 是否显示导航栏图标修饰 - true=在文本前显示图标 */
  showIcon: boolean
  /** 文件前缀修饰符 - 在文件名前显示的图标或文本，如'📄' */
  filePrefix: string
  /** 目录前缀修饰符 - 在目录名前显示的图标或文本，如'📂' */
  dirPrefix: string
}

/**
 * 侧边栏配置选项
 * 控制侧边栏的显示样式和行为
 *
 * @interface SidebarConfig
 * @example
 * ```ts
 * // 默认侧边栏配置 - 子目录默认折叠
 * const defaultSidebarConfig: SidebarConfig = {
 *   collapsed: true,   // 子目录默认折叠
 *   showIcon: true,    // 显示图标
 *   filePrefix: '',    // 文件前缀
 *   dirPrefix: '📂'     // 目录前缀
 * };
 *
 * // 展开式侧边栏配置
 * const expandedSidebarConfig: SidebarConfig = {
 *   collapsed: false,  // 子目录默认展开
 *   showIcon: true,
 *   filePrefix: '📄',
 *   dirPrefix: '📁'
 * };
 * ```
 */
export interface SidebarConfig {
  /** 侧边栏是否默认折叠 - true=子目录默认折叠，false=默认展开 */
  collapsed: boolean
  /** 是否显示侧边栏图标修饰 - true=在文本前显示图标 */
  showIcon: boolean
  /** 侧边栏文件前缀 - 在文件名前显示的图标或文本，如'📄' */
  filePrefix: string
  /** 侧边栏目录前缀 - 在目录名前显示的图标或文本，如'📂' */
  dirPrefix: string
}

/**
 * 生成器配置选项
 * 控制整个生成器的行为，是传递给Generator函数的主要参数
 *
 * 配置项详解:
 * - debug: 是否输出性能报告和调试信息
 * - nav: 导航栏显示相关配置
 *   - dropdown: 是否使用下拉菜单(适合复杂目录结构)
 *   - showIcon: 是否在文本前显示图标
 *   - filePrefix/dirPrefix: 文件和目录的前缀字符(如📄/📂)
 * - sidebar: 侧边栏显示相关配置
 *   - collapsed: 子菜单默认是否折叠
 *   - showIcon: 是否显示图标
 *   - filePrefix/dirPrefix: 文件和目录的前缀字符
 * - sorting: 排序规则配置
 *   - order: 不同节点类型的优先级权重
 *   - priority: 特定文件的优先级列表
 *
 * @interface GeneratorConfig
 * @example
 * ```ts
 * // 基础配置
 * const basicConfig: Partial<GeneratorConfig> = {
 *   debug: true, // 启用调试模式
 *   sidebar: {
 *     collapsed: false // 侧边栏默认展开
 *   }
 * };
 *
 * // 完整配置
 * const fullConfig: GeneratorConfig = {
 *   debug: true,
 *   nav: {
 *     dropdown: true,
 *     showIcon: true,
 *     filePrefix: '📄',
 *     dirPrefix: '📂'
 *   },
 *   sidebar: {
 *     collapsed: false,
 *     showIcon: true,
 *     filePrefix: '📄',
 *     dirPrefix: '📂'
 *   },
 *   sorting: {
 *     order: {
 *       index: 0,
 *       guide: 1,
 *       custom: 2,
 *       directory: 3,
 *       file: 4
 *     },
 *     priority: ['README.md', 'getting-started.md']
 *   },
 *   fileTree: {
 *     srcDir: './docs',
 *     exclude: ['node_modules', '.git']
 *   }
 * };
 * ```
 * @see {@link Generator} - 使用此配置的生成器函数
 * @see {@link VitePressGenerator} - 使用此配置的生成器类
 * @see {@link SortingConfig} - 排序配置详情
 * @see {@link NavConfig} - 导航栏配置详情
 * @see {@link SidebarConfig} - 侧边栏配置详情
 */
export interface GeneratorConfig {
  /** 调试模式 - true=启用性能监控和详细日志 */
  debug?: boolean
  /** 导航栏配置 - 控制导航栏的显示样式 */
  nav?: Partial<NavConfig>
  /** 侧边栏配置 - 控制侧边栏的显示样式 */
  sidebar?: Partial<SidebarConfig>
  /** 排序配置 - 控制节点排序规则 */
  sorting?: Partial<SortingConfig>
  /** 文件树构建器配置 - 传递给FileTreeBuilder的选项 */
  fileTree?: Record<string, any>
}

/**
 * 生成器结果
 * Generator函数的返回值类型
 *
 * @interface GeneratorResult
 * @example
 * ```ts
 * // 获取生成结果并应用于VitePress配置
 * import { defineConfig } from 'vitepress';
 * import { Generator } from 'vitepress-auto-config';
 *
 * export default defineConfig(async () => {
 *   const { nav, sidebar } = await Generator({
 *     debug: true,
 *     sidebar: { collapsed: false }
 *   });
 *
 *   return {
 *     title: '我的文档',
 *     description: '自动生成的VitePress站点',
 *     themeConfig: {
 *       nav,     // 使用自动生成的导航栏
 *       sidebar  // 使用自动生成的侧边栏
 *     }
 *   };
 * });
 * ```
 * @see {@link Generator} - 返回此结果的生成器函数
 * @see {@link VitePressGenerator.generate} - 返回此结果的方法
 * @see {@link NavItem} - 导航项类型
 * @see {@link Sidebar} - 侧边栏类型
 */
export interface GeneratorResult {
  /** 生成的导航栏配置，可直接用于VitePress */
  nav: NavItem[]
  /** 生成的侧边栏配置，可直接用于VitePress */
  sidebar: Sidebar
  /** 处理后的文件树结构，主要用于调试和进一步处理 */
  fileTree: TreeNode[]
}

// ----------------------------- 函数和类定义 -----------------------------

/**
 * 生成器函数
 * 根据配置生成VitePress的导航栏和侧边栏配置
 *
 * @example
 * ```js
 * // .vitepress/config.js
 * import { defineConfig } from 'vitepress'
 * import { Generator } from './plugins/auto/utils/generator'
 *
 * export default defineConfig(async () => {
 *   const { nav, sidebar } = await Generator({
 *     debug: false, // 启用后会输出性能报告
 *
 *     // 导航栏配置
 *     nav: {
 *       dropdown: true, // true=使用下拉菜单形式，false=只使用简单链接形式
 *       showIcon: true, // 是否显示图标
 *       filePrefix: '📄', // 文件前缀图标
 *       dirPrefix: '📁' // 目录前缀图标
 *     },
 *
 *     // 侧边栏配置
 *     sidebar: {
 *       collapsed: true, // 是否默认折叠嵌套项
 *       showIcon: true, // 是否显示图标
 *       filePrefix: '📄', // 文件前缀图标
 *       dirPrefix: '📁' // 目录前缀图标
 *     },
 *
 *     // 排序配置
 *     sorting: {
 *       order: {
 *         index: 0, // index.md 排序权重
 *         guide: 1, // guide.md 排序权重
 *         custom: 2, // 自定义排序规则权重(包含priority数组的处理)
 *         directory: 3, // 目录权重
 *         file: 4 // 普通文件权重
 *       },
 *       priority: [ // 作为custom的一部分，用于指定特定文件的优先级列表
 *         'README.md', // 最高优先级
 *         'CHANGELOG.md' // 次高优先级
 *       ]
 *     }
 *   })
 *
 *   return {
 *     title: '我的文档站点',
 *     themeConfig: {
 *       nav,
 *       sidebar
 *     }
 *   }
 * })
 * ```
 *
 * @param options 生成器配置选项
 * @returns Promise包装的生成结果，包含nav、sidebar和fileTree
 */
export declare function Generator(options?: Partial<GeneratorConfig>): Promise<GeneratorResult>

/**
 * VitePress生成器类
 * 提供更灵活的配置生成方式，适合高级定制场景
 *
 * @example
 * ```js
 * import { FileTreeBuilder } from '../fileTree/index.js';
 * import { VitePressGenerator } from './core/VitePressGenerator.js';
 *
 * // 创建文件树构建器
 * const fileTreeBuilder = new FileTreeBuilder({
 *   srcDir: './docs',
 *   maxDepth: 5
 * });
 *
 * // 创建生成器实例
 * const generator = new VitePressGenerator({
 *   debug: true,
 *   nav: { dropdown: true },
 *   sidebar: { collapsed: false }
 * }, fileTreeBuilder);
 *
 * // 生成配置
 * const { nav, sidebar, fileTree } = await generator.generate();
 *
 * // 在VitePress配置中使用
 * export default {
 *   themeConfig: {
 *     nav,
 *     sidebar
 *   }
 * }
 * ```
 */
export declare class VitePressGenerator {
  /**
   * 创建VitePress生成器实例
   *
   * @example
   * ```js
   * const generator = new VitePressGenerator({
   *   // 调试模式
   *   debug: true,
   *
   *   // 导航栏配置
   *   nav: {
   *     dropdown: true,        // 使用下拉菜单
   *     showIcon: true,        // 显示图标
   *     filePrefix: '📄',      // 文件前缀
   *     dirPrefix: '📂',       // 目录前缀
   *   },
   *
   *   // 侧边栏配置
   *   sidebar: {
   *     collapsed: false,      // 默认展开
   *     showIcon: true,        // 显示图标
   *     filePrefix: '📄',      // 文件前缀
   *     dirPrefix: '📂',       // 目录前缀
   *   },
   *
   *   // 排序配置
   *   sorting: {
   *     order: {
   *       index: 0,            // index.md最高优先级
   *       guide: 1,            // guide.md次优先级
   *       custom: 2,           // 自定义规则优先级
   *       directory: 3,        // 目录优先级(高于普通文件)
   *       file: 4              // 普通文件优先级
   *     },
   *     priority: ['README.md', 'getting-started.md'] // 特定文件优先级
   *   }
   * }, fileTreeBuilder);
   * ```
   *
   * @param options 生成器配置选项
   * @param fileTreeBuilder 文件树构建器实例，负责扫描文件系统
   */
  constructor(options?: Partial<GeneratorConfig>, fileTreeBuilder: any)

  /**
   * 生成VitePress配置
   * 执行完整的生成流程，包括文件树构建、预处理和导航侧边栏生成
   *
   * 完整的生成流程如下:
   * 1. 构建原始文件树 - 扫描文件系统，创建初始节点结构
   * 2. 预处理文件树 - 递归排序和结构标准化处理
   * 3. 并行构建导航栏和侧边栏 - 提高性能
   * 4. 返回生成结果 - 包含nav, sidebar和fileTree
   *
   * 返回的配置可直接用于VitePress的themeConfig:
   * ```js
   * export default {
   *   themeConfig: {
   *     nav,
   *     sidebar
   *   }
   * }
   * ```
   *
   * 出错处理:
   * - 如果文件树为空，返回最小配置(只有首页导航项)
   * - 如果生成过程发生异常，返回默认配置并记录错误
   *
   * @returns Promise包装的生成结果，包含nav、sidebar和fileTree
   */
  generate(): Promise<GeneratorResult>

  /**
   * @private
   * 预处理文件树
   * 对原始文件树进行排序和处理，为生成配置做准备
   *
   * @param {TreeNode} node - 根节点或要处理的节点
   * @returns {TreeNode[]} 处理后的节点数组
   *
   * @example
   * ```ts
   * // 私有方法，类内部使用示例
   * // 初始文件树
   * const rootNode = {
   *   name: 'docs',
   *   type: 'directory',
   *   children: [
   *     { name: 'z-file.md', type: 'file' },
   *     { name: 'a-file.md', type: 'file' },
   *     { name: 'index.md', type: 'file' },
   *     { name: 'subdir', type: 'directory', children: [] }
   *   ]
   * };
   *
   * // 内部调用
   * const processedTree = this.#preprocessFileTree(rootNode);
   *
   * // 处理后的节点包含:
   * // 1. 根据排序配置排序的子节点
   * // 2. 处理后的路径信息
   * // 3. 递归处理的子目录节点
   * ```
   */
  #preprocessFileTree(node: TreeNode): TreeNode[]

  /**
   * @private
   * 构建导航栏配置
   * 根据文件树结构生成顶层导航栏项目
   *
   * @returns {NavItem[]} 导航栏配置项数组
   *
   * @example
   * ```ts
   * // 私有方法，类内部使用示例
   * // 假设文件树已经处理完成
   * this.fileTree = {
   *   name: 'docs',
   *   type: 'directory',
   *   children: [
   *     {
   *       name: 'guide',
   *       type: 'directory',
   *       children: [
   *         { name: 'index.md', type: 'file' }
   *       ]
   *     },
   *     { name: 'index.md', type: 'file' },
   *     { name: 'about.md', type: 'file' }
   *   ]
   * };
   *
   * // 内部调用
   * const navItems = this.#buildNav();
   *
   * // 根据配置，可能生成以下导航项:
   * // [
   * //   { text: '首页', link: '/' },
   * //   {
   * //     text: '指南',
   * //     items: [ // 如果启用了下拉菜单
   * //       { text: '介绍', link: '/guide/' }
   * //     ]
   * //   },
   * //   { text: '关于', link: '/about' }
   * // ]
   * ```
   */
  #buildNav(): NavItem[]

  /**
   * @private
   * 构建侧边栏配置
   * 为每个顶层目录创建独立的侧边栏配置，并映射到对应路径
   *
   * @returns {Sidebar} 映射路径到侧边栏项的配置对象
   *
   * @example
   * ```ts
   * // 私有方法，类内部使用示例
   * // 假设文件树已经处理完成
   * this.fileTree = {
   *   name: 'docs',
   *   type: 'directory',
   *   children: [
   *     {
   *       name: 'guide',
   *       type: 'directory',
   *       children: [
   *         { name: 'index.md', type: 'file' },
   *         { name: 'getting-started.md', type: 'file' },
   *         {
   *           name: 'advanced',
   *           type: 'directory',
   *           children: [
   *             { name: 'index.md', type: 'file' }
   *           ]
   *         }
   *       ]
   *     },
   *     {
   *       name: 'api',
   *       type: 'directory',
   *       children: [
   *         { name: 'index.md', type: 'file' }
   *       ]
   *     }
   *   ]
   * };
   *
   * // 内部调用
   * const sidebarConfig = this.#buildSidebar();
   *
   * // 生成的侧边栏配置示例:
   * // {
   * //   '/guide/': [
   * //     {
   * //       text: '指南',
   * //       items: [
   * //         { text: '介绍', link: '/guide/' },
   * //         { text: '入门', link: '/guide/getting-started' },
   * //         {
   * //           text: '高级',
   * //           items: [
   * //             { text: '高级功能', link: '/guide/advanced/' }
   * //           ]
   * //         }
   * //       ]
   * //     }
   * //   ],
   * //   '/api/': [
   * //     {
   * //       text: 'API',
   * //       items: [
   * //         { text: 'API参考', link: '/api/' }
   * //       ]
   * //     }
   * //   ]
   * // }
   * ```
   */
  #buildSidebar(): Sidebar
}

// ----------------------------- 工具函数类型定义 -----------------------------

/**
 * 路径工具集
 * 提供处理文件路径和文件名的实用函数
 *
 * @namespace pathUtils
 * @example
 * ```ts
 * // 检查文件是否为Markdown文件
 * pathUtils.isMdFile('readme.md'); // true
 * pathUtils.isMdFile('image.png'); // false
 *
 * // 移除.md扩展名
 * pathUtils.removeMdExt('guide.md'); // 'guide'
 *
 * // 获取路径段
 * pathUtils.getPathSegments('/guide/intro/'); // ['guide', 'intro']
 *
 * // 获取最后一个路径段
 * pathUtils.getLastSegment('/guide/intro/'); // 'intro'
 * ```
 * @see {@link sortNodes} - 经常与路径工具一起使用的排序函数
 * @see {@link VitePressGenerator} - 在生成器中使用这些工具
 */
export declare const pathUtils: {
  /**
   * 检查文件名是否为Markdown文件
   *
   * @param {string} name - 要检查的文件名
   * @returns {boolean} 如果文件名以.md结尾则返回true
   * @example
   * ```ts
   * pathUtils.isMdFile('guide.md'); // true
   * pathUtils.isMdFile('image.png'); // false
   * ```
   */
  isMdFile(name: string): boolean

  /**
   * 移除文件名的.md扩展名
   *
   * @param {string} name - 要处理的文件名
   * @returns {string} 没有.md扩展名的文件名
   * @example
   * ```ts
   * pathUtils.removeMdExt('guide.md'); // 'guide'
   * pathUtils.removeMdExt('guide'); // 'guide'
   * ```
   */
  removeMdExt(name: string): string

  /**
   * 将路径分割为段数组
   *
   * @param {string} path - 要分割的路径
   * @returns {string[]} 路径段数组
   * @example
   * ```ts
   * pathUtils.getPathSegments('/guide/intro/');
   * // ['guide', 'intro']
   * ```
   */
  getPathSegments(path: string): string[]

  /**
   * 获取路径的最后一个段
   *
   * @param {string} path - 要处理的路径
   * @returns {string} 路径的最后一个段
   * @example
   * ```ts
   * pathUtils.getLastSegment('/guide/intro/'); // 'intro'
   * ```
   */
  getLastSegment(path: string): string

  /**
   * 使用给定的段构建路径
   *
   * @param {...string} segments - 路径段
   * @returns {string} 构建的路径
   * @example
   * ```ts
   * pathUtils.buildPath('guide', 'intro'); // 'guide/intro'
   * ```
   */
  buildPath(...segments: string[]): string

  /**
   * 规范化路径，确保以'/'开头
   *
   * @param {string} path - 要规范化的路径
   * @returns {string} 规范化的路径
   * @example
   * ```ts
   * pathUtils.normalizePath('guide/intro'); // '/guide/intro'
   * pathUtils.normalizePath('/guide/intro'); // '/guide/intro'
   * ```
   */
  normalizePath(path: string): string

  /**
   * 合并多个路径
   *
   * @param {...string} paths - 要合并的路径
   * @returns {string} 合并后的路径
   * @example
   * ```ts
   * pathUtils.joinPath('/guide', 'intro/'); // '/guide/intro/'
   * ```
   */
  joinPath(...paths: string[]): string

  /**
   * 从路径中获取文件名
   *
   * @param {string} path - 包含文件名的路径
   * @returns {string} 文件名
   * @example
   * ```ts
   * pathUtils.getFilename('/guide/intro.md'); // 'intro.md'
   * ```
   */
  getFilename(path: string): string

  /**
   * 从文件路径中获取目录路径
   *
   * @param {string} path - 文件路径
   * @returns {string} 目录路径
   * @example
   * ```ts
   * pathUtils.getDirPath('/guide/intro.md'); // '/guide'
   * ```
   */
  getDirPath(path: string): string
}

/**
 * 排序TreeNode数组的函数
 * 使用多阶段排序算法，包括特殊文件、自定义优先级、节点类型和自然排序
 *
 * @function sortNodes
 * @param {TreeNode[]} nodes - 要排序的节点数组
 * @param {Partial<SortingConfig>} [config] - 排序配置
 * @returns {TreeNode[]} 排序后的节点数组
 * @example
 * ```ts
 * // 对文件树节点进行排序
 * const sortedNodes = sortNodes(nodes, {
 *   order: {
 *     index: 0,
 *     directory: 1,
 *     file: 2
 *   },
 *   priority: ['README.md', 'getting-started.md']
 * });
 * ```
 * @see {@link SortingConfig} - 排序配置类型
 * @see {@link TreeNode} - 被排序的节点类型
 * @see {@link VitePressGenerator#preprocessFileTree} - 在预处理文件树中使用此函数
 */
export declare function sortNodes(nodes: TreeNode[], config?: Partial<SortingConfig>): TreeNode[]

/**
 * 全局性能监控器实例
 * 用于监控和记录代码的执行性能
 *
 * @const performanceMonitor
 * @type {PerformanceMonitor}
 * @example
 * ```ts
 * // 开启性能监控
 * performanceMonitor.enable();
 *
 * // 测量函数执行时间
 * const result = await performanceMonitor.time('生成配置', async () => {
 *   // 执行一些操作...
 *   return configResult;
 * });
 *
 * // 获取性能报告
 * console.log(performanceMonitor.getFormattedReport());
 * ```
 * @see {@link PerformanceMonitor} - 性能监控器接口
 * @see {@link PerformanceEntry} - 性能条目类型
 */
export declare const performanceMonitor: PerformanceMonitor

/**
 * 常量配置
 * 定义生成器使用的各种常量值
 *
 * @namespace CONSTANTS
 * @example
 * ```ts
 * // 使用节点类型常量
 * if (node.type === CONSTANTS.NODE_TYPES.DIRECTORY) {
 *   // 处理目录
 * }
 *
 * // 检查是否为索引文件
 * if (file.name === CONSTANTS.FILE_NAMES.INDEX) {
 *   // 处理索引文件
 * }
 * ```
 * @see {@link NodeType} - 节点类型
 * @see {@link GeneratorConfig} - 使用默认配置的接口
 */
export declare const CONSTANTS: {
  /** 节点类型常量 */
  NODE_TYPES: {
    /** 目录节点类型 */
    DIRECTORY: 'directory'
    /** 文件节点类型 */
    FILE: 'file'
  }

  /** 特殊文件名常量 */
  FILE_NAMES: {
    /** 索引文件名 */
    INDEX: 'index.md'
    /** 指南文件名 */
    GUIDE: 'guide.md'
  }

  /** 默认配置常量 */
  DEFAULT_CONFIG: {
    /** 默认导航栏配置 */
    nav: {
      /** 是否使用下拉菜单 */
      dropdown: boolean
      /** 是否显示图标 */
      showIcon: boolean
      /** 文件前缀 */
      filePrefix: string
      /** 目录前缀 */
      dirPrefix: string
    }

    /** 默认侧边栏配置 */
    sidebar: {
      /** 是否默认折叠 */
      collapsed: boolean
      /** 是否显示图标 */
      showIcon: boolean
      /** 文件前缀 */
      filePrefix: string
      /** 目录前缀 */
      dirPrefix: string
    }

    /** 默认排序配置 */
    sorting: {
      /** 排序顺序 */
      order: {
        /** index.md排序权重 */
        index: number
        /** guide.md排序权重 */
        guide: number
        /** 自定义排序权重 */
        custom: number
        /** 目录排序权重 */
        directory: number
        /** 文件排序权重 */
        file: number
      }
      /** 文件优先级列表 */
      priority: string[]
    }
  }
}
