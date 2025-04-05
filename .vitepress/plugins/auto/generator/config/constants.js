/**
 * 常量定义模块
 * 提供整个生成器使用的全局常量和默认配置
 *
 * 本模块集中定义所有在VitePress配置生成器中使用的常量，
 * 包括节点类型、特殊文件名以及默认配置项，确保系统一致性。
 *
 * @module constants
 * @see {@link ../types/index.d.ts|CONSTANTS} - 查看完整的类型定义
 * @see {@link ../core/VitePressGenerator.js} - 使用这些常量的核心类
 */

/**
 * 节点类型常量
 * 用于标识文件树中的节点类型
 *
 * @readonly
 * @constant {object}
 * @property {string} DIRECTORY - 目录类型节点 - 表示文件系统中的目录
 * @property {string} FILE - 文件类型节点 - 表示文件系统中的文件
 * @see {@link ../types/index.d.ts|NodeType} - 节点类型的类型定义
 * @see {@link ../core/VitePressGenerator.js|#preprocessFileTree} - 使用此常量的方法
 */
const NODE_TYPES = Object.freeze({
  /** 目录类型节点 - 表示文件系统中的目录 */
  DIRECTORY: 'directory',
  /** 文件类型节点 - 表示文件系统中的文件 */
  FILE: 'file',
})

/**
 * 特殊文件名常量
 * 用于识别具有特殊处理逻辑的文件
 *
 * @readonly
 * @constant {object}
 * @property {string} INDEX - 索引文件名 - 自动映射为目录的默认页面
 * @property {string} GUIDE - 指南文件名 - 在排序中优先级较高
 * @see {@link ../core/VitePressGenerator.js|#findSpecialFiles} - 使用此常量的方法
 * @see {@link ../utils/sort.js} - 使用此常量的排序算法
 */
const FILE_NAMES = Object.freeze({
  /**
   * 索引文件名 - 自动映射为目录的默认页面
   * 该文件通常作为目录的入口点，访问目录时默认显示此文件
   */
  INDEX: 'index.md',
  /**
   * 指南文件名 - 在排序中优先级较高
   * 通常作为目录的主要文档文件
   */
  GUIDE: 'guide.md',
})

/**
 * 默认排序配置
 * 定义文件和目录的排序规则，影响导航栏和侧边栏中的显示顺序
 *
 * @readonly
 * @constant {object}
 * @see {@link ../types/index.d.ts|SortingConfig} - 排序配置的类型定义
 * @see {@link ../utils/sort.js|sortNodes} - 使用此配置的排序函数
 */
const DEFAULT_SORTING = Object.freeze({
  /**
   * 排序优先级配置
   * 数字越小优先级越高，按以下顺序执行：
   * 1. 特殊文件 (index, guide)
   * 2. 自定义排序规则 (custom)
   *    • 包含priority数组优先级排序
   * 3. 节点类型 (directory, file)
   * 4. Frontmatter中的order字段
   * 5. 文件名自然排序
   */
  order: Object.freeze({
    /** index.md文件的排序权重 (最高优先级) */
    index: 0,
    /** guide.md文件的排序权重 (次高优先级) */
    guide: 1,
    /** 自定义排序规则的权重 (包含priority数组的应用) */
    custom: 2,
    /** 目录的排序权重 (优先于普通文件) */
    directory: 3,
    /** 普通文件的排序权重 (最低优先级) */
    file: 4,
  }),
  /**
   * 用户自定义优先级列表
   * 作为自定义排序规则(custom)的一部分，控制特定文件的排序顺序
   * 列表中的文件按数组中的顺序进行排序
   * 不在列表中的文件按照后续排序规则处理
   */
  priority: [],
})

/**
 * 默认导航栏配置
 * 定义导航栏的显示方式和样式
 *
 * @readonly
 * @constant {object}
 * @see {@link ../types/index.d.ts|NavConfig} - 导航栏配置的类型定义
 * @see {@link ../core/VitePressGenerator.js|#buildNav} - 使用此配置的方法
 */
const DEFAULT_NAV = Object.freeze({
  /** 是否使用下拉菜单形式 - true=复杂目录使用下拉菜单，false=所有目录使用简单链接 */
  dropdown: true,
  /** 是否显示导航栏图标修饰 - true=在文本前显示图标，提升可视化体验 */
  showIcon: true,
  /** 文件前缀修饰符 - 在文件名前显示的图标或文本，为空则不显示 */
  filePrefix: '',
  /** 目录前缀修饰符 - 在目录名前显示的图标或文本，默认为文件夹图标 */
  dirPrefix: '📂',
})

/**
 * 默认侧边栏配置
 * 定义侧边栏的显示方式和样式
 *
 * @readonly
 * @constant {object}
 * @see {@link ../types/index.d.ts|SidebarConfig} - 侧边栏配置的类型定义
 * @see {@link ../core/VitePressGenerator.js|#buildSidebarItems} - 使用此配置的方法
 */
const DEFAULT_SIDEBAR = Object.freeze({
  /** 侧边栏是否默认折叠 - true=子目录默认折叠，false=默认展开所有节点 */
  collapsed: true,
  /** 是否显示侧边栏图标修饰 - true=在文本前显示图标，增强可读性 */
  showIcon: true,
  /** 侧边栏文件前缀 - 在文件名前显示的图标或文本，为空则不显示 */
  filePrefix: '',
  /** 侧边栏目录前缀 - 在目录名前显示的图标或文本，默认为文件夹图标 */
  dirPrefix: '📂',
})

/**
 * 默认配置
 * 汇总所有默认配置选项，作为生成器的基础配置
 *
 * @readonly
 * @constant {object}
 * @see {@link ../types/index.d.ts|GeneratorConfig} - 生成器配置的类型定义
 * @see {@link ../index.js|Generator} - 使用此配置的主函数
 */
const DEFAULT_CONFIG = Object.freeze({
  /** 调试模式 - true=启用性能监控和详细日志输出，方便开发调试 */
  debug: false,
  /** 导航栏配置 - 控制导航栏的显示方式和样式 */
  nav: DEFAULT_NAV,
  /** 侧边栏配置 - 控制侧边栏的显示方式和样式 */
  sidebar: DEFAULT_SIDEBAR,
  /** 排序配置 - 控制导航栏和侧边栏中项目的排序规则 */
  sorting: DEFAULT_SORTING,
})

/**
 * 导出所有常量
 * 使用Object.freeze确保常量不会被修改，保证系统稳定性
 *
 * @constant {object} CONSTANTS
 * @see {@link ../types/index.d.ts|CONSTANTS} - 查看完整的类型定义
 */
export const CONSTANTS = Object.freeze({
  NODE_TYPES,
  FILE_NAMES,
  DEFAULT_SORTING,
  DEFAULT_NAV,
  DEFAULT_SIDEBAR,
  DEFAULT_CONFIG,
})
