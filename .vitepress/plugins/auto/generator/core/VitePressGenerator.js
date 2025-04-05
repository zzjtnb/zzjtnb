import {CONSTANTS} from '../config/constants.js'
import {pathUtils} from '../utils/path.js'
import {performanceMonitor} from '../utils/performance.js'
import {sortNodes} from '../utils/sort.js'

/**
 * @typedef {import('../types/index').GeneratorConfig} GeneratorConfig
 * @typedef {import('../types/index').GeneratorResult} GeneratorResult
 * @typedef {import('../types/index').FileTreeBuilder} FileTreeBuilder
 */

/**
 * VitePress配置生成器核心类
 *
 * 基于文件系统结构自动生成VitePress的导航栏和侧边栏配置。
 * 该类提供了所有生成逻辑的核心实现，支持多层级目录结构、
 * Frontmatter定制、智能排序和自动索引识别等高级功能。
 *
 * 工作流程:
 * 1. 通过fileTreeBuilder扫描文件系统，构建初始文件树
 * 2. 对文件树进行预处理，包括递归排序和结构标准化
 * 3. 并行生成导航栏和侧边栏配置
 * 4. 返回可直接用于VitePress的配置对象
 *
 * @see {@link Generator} - 基础生成器类
 * @see {@link ../types/index.d.ts} - 查看完整的类型定义和示例
 */
export class VitePressGenerator {
  /**
   * 当前配置实例
   * 合并了默认配置和用户自定义配置
   * @type {object}
   * @private
   */
  #config

  /**
   * 预处理后的文件树结构
   * 经过排序和标准化处理的目录和文件节点树
   * @type {Array<{name: string, type: string, children: Array}>}
   * @private
   */
  #fileTree = []

  /**
   * 文件树构建器实例
   * 负责扫描文件系统并生成原始文件树结构
   * @type {object}
   * @private
   */
  #fileTreeBuilder

  /**
   * 创建VitePress配置生成器实例
   *
   * @param {Partial<GeneratorConfig>} options - 配置选项
   * @param {FileTreeBuilder} fileTreeBuilder - 文件树构建器实例
   * @throws {Error} 如果未提供fileTreeBuilder参数
   */
  constructor(options = {}, fileTreeBuilder) {
    if (!fileTreeBuilder) throw new Error('fileTreeBuilder参数是必需的')

    this.#config = {...CONSTANTS.DEFAULT_CONFIG, ...options}
    this.#fileTreeBuilder = fileTreeBuilder

    // 验证并填充默认配置
    this.#config.sorting ??= CONSTANTS.DEFAULT_CONFIG.sorting
    this.#config.nav ??= CONSTANTS.DEFAULT_CONFIG.nav
    this.#config.sidebar ??= CONSTANTS.DEFAULT_CONFIG.sidebar
  }

  /**
   * 生成导航和侧边栏配置
   *
   * 执行完整的配置生成流程，包括文件树构建、预处理和侧边栏生成
   * 详细流程和错误处理信息请参见类型定义文件
   *
   * @returns {Promise<GeneratorResult>} 导航栏和侧边栏配置
   * @see {@link ../types/index.d.ts|VitePressGenerator.generate} - 查看详细说明和示例
   * @see {@link sortNodes} - 文件排序函数
   * @see {@link performanceMonitor} - 性能监控
   */
  async generate() {
    try {
      // 记录整体执行时间
      const generateEnd = performanceMonitor.start('VitePressGenerator.generate')

      // 获取并预处理文件树 - 此步骤扫描文件系统并构建初始文件树
      const fileTree = await performanceMonitor.time(
        'getFileTree',
        async () => {
          const rawFileTree = await this.#getFileTree()
          return Array.isArray(rawFileTree) && rawFileTree.length > 0 ? rawFileTree : []
        },
        {step: 'file_tree_builder'}
      )

      // 提前返回空结果，避免后续不必要的处理
      if (!fileTree.length) {
        generateEnd()
        return {nav: [], sidebar: {}, fileTree: []}
      }

      // 预处理文件树 - 递归排序和规范化
      this.#fileTree = await performanceMonitor.time('preprocessFileTree', () => this.#preprocessFileTree(fileTree), {step: 'preprocess'})

      // 并行构建导航和侧边栏 - 提高性能
      const [nav, sidebar] = await Promise.all([
        performanceMonitor.time('buildNav', () => this.#buildNav(), {step: 'nav'}),
        performanceMonitor.time('buildSidebar', () => this.#buildSidebar(), {step: 'sidebar'}),
      ])

      // 结束整体计时并输出调试信息
      const duration = generateEnd()

      if (this.#config.debug) {
        console.log(`VitePress配置生成完成，耗时: ${duration.toFixed(2)}ms`)
        console.log(`生成了 ${nav.length} 个导航项和 ${Object.keys(sidebar).length} 个侧边栏区块`)
      }

      return {nav, sidebar, fileTree: this.#fileTree}
    } catch (error) {
      console.error('生成VitePress配置失败:', error)
      // 返回默认最小配置，确保站点可以正常启动
      return {nav: [{text: '首页', link: '/'}], sidebar: {}, fileTree: []}
    }
  }

  /**
   * 预处理文件树 - 递归排序和结构规范化
   * 详细信息请参见类型定义文件
   *
   * @private
   * @param {Array<TreeNode>} tree - 原始文件树
   * @returns {Array<TreeNode>} 处理后的文件树
   * @see {@link ../types/index.d.ts|preprocessFileTree} - 在类型定义中查看详细说明
   * @see {@link sortNodes} - 用于节点排序的函数
   */
  #preprocessFileTree(tree) {
    if (!Array.isArray(tree) || !tree.length) return []

    // 递归处理每个节点及其子节点，然后使用sortNodes进行排序
    return sortNodes(
      tree.map((node) => ({
        ...node,
        children: node.children?.length ? this.#preprocessFileTree(node.children) : node.children,
      })),
      this.#config.sorting
    )
  }

  /**
   * 获取文件树 - 调用文件树构建器获取原始文件树
   *
   * @private
   * @returns {Promise<Array<TreeNode>>} 原始文件树结构
   * @see {@link FileTreeBuilder} - 文件树构建器
   */
  async #getFileTree() {
    try {
      return await this.#fileTreeBuilder.build()
    } catch (error) {
      console.error('构建文件树失败:', error)
      return []
    }
  }

  /**
   * 构建导航栏配置
   * 详细信息请参见类型定义文件
   *
   * @private
   * @returns {Array<NavItem>} 导航栏配置数组
   * @see {@link ../types/index.d.ts|buildNav} - 在类型定义中查看详细说明和示例
   * @see {@link NavItem} - 导航项类型定义
   */
  #buildNav() {
    // 默认添加首页导航项
    const nav = [{text: '首页', link: '/'}]

    // 筛选根目录节点 - 只有顶层目录才会显示在导航栏中
    const rootDirs = this.#fileTree.filter((item) => item.type === CONSTANTS.NODE_TYPES.DIRECTORY)
    if (!rootDirs.length) return nav

    // 根据配置选择合适的导航项构建函数
    const navItemsBuilder = this.#config.nav.dropdown ? this.#buildDropdownNavItem : this.#buildSimpleNavItem

    // 将每个目录转换为导航项，过滤掉空值
    const navItems = rootDirs.map((dir) => navItemsBuilder.call(this, dir)).filter(Boolean)

    return [...nav, ...navItems]
  }

  /**
   * 查找特殊文件 - 索引文件和第一个markdown文件
   *
   * @private
   * @param {Array<object>} children - 子节点数组
   * @returns {{indexFile: object|null, firstMdFile: object|null}} 特殊文件对象
   * @see {@link pathUtils.isMdFile} - 检查Markdown文件的工具函数
   * @see {@link CONSTANTS.FILE_NAMES} - 特殊文件名常量
   */
  #findSpecialFiles(children) {
    if (!Array.isArray(children)) return {indexFile: null, firstMdFile: null}

    // 查找索引文件 (index.md)
    const indexFile = children.find((child) => child?.type === CONSTANTS.NODE_TYPES.FILE && child?.name === CONSTANTS.FILE_NAMES.INDEX)

    // 仅当没有索引文件时才查找第一个Markdown文件
    const firstMdFile = !indexFile ? children.find((child) => child?.type === CONSTANTS.NODE_TYPES.FILE && pathUtils.isMdFile(child?.name || '')) : null

    return {indexFile, firstMdFile}
  }

  /**
   * 构建下拉菜单形式的导航项
   * 详细信息请参见类型定义文件
   *
   * @private
   * @param {TreeNode} dir - 目录对象
   * @returns {NavItem|null} 下拉菜单配置或简单链接
   * @see {@link ../types/index.d.ts|buildDropdownNavItem} - 在类型定义中查看详细说明
   * @see {@link #findSpecialFiles} - 查找特殊文件的方法
   */
  #buildDropdownNavItem(dir) {
    const {showIcon, dirPrefix} = this.#config.nav
    const sortedChildren = dir.children || []
    const {indexFile, firstMdFile} = this.#findSpecialFiles(sortedChildren)

    // 计算有效的子目录和Markdown文件
    const subDirectories = sortedChildren.filter((child) => child?.type === CONSTANTS.NODE_TYPES.DIRECTORY)

    const mdFiles = sortedChildren.filter(
      (child) => child?.type === CONSTANTS.NODE_TYPES.FILE && pathUtils.isMdFile(child?.name || '') && child?.name !== CONSTANTS.FILE_NAMES.INDEX
    )

    // 情况1: 只有index.md文件 - 使用简单链接
    if (indexFile && !subDirectories.length && !mdFiles.length) {
      return this.#createSimpleNavLink(dir, dirPrefix, showIcon)
    }

    // 情况2: 只有Markdown文件，没有子目录 - 也使用简单链接
    if (!subDirectories.length && (indexFile || mdFiles.length)) {
      if (indexFile) return this.#createSimpleNavLink(dir, dirPrefix, showIcon)

      if (firstMdFile) {
        return {
          text: this.#getItemText({showIcon}, dirPrefix, dir.name, dir.name),
          link: `/${dir.name}/${pathUtils.removeMdExt(firstMdFile.name)}`,
        }
      }
    }

    // 情况3: 包含子目录 - 构建下拉菜单
    const dropdownItem = {
      text: this.#getItemText({showIcon}, dirPrefix, dir.name, dir.name),
      items: [],
    }

    // 添加首页项 - 优先使用index.md，其次使用第一个Markdown文件
    if (indexFile) {
      dropdownItem.items.push({
        text: indexFile.frontmatter?.title || '首页',
        link: `/${dir.name}/`,
      })
    } else if (firstMdFile) {
      dropdownItem.items.push({
        text: this.#getItemText({showIcon}, dirPrefix, dir.name, dir.name),
        link: `/${dir.name}/${pathUtils.removeMdExt(firstMdFile.name)}`,
      })
    }

    // 添加子目录项 (仅添加子目录，不添加子文件)
    subDirectories.forEach((child) => {
      this.#addDirectoryToDropdown(child, dir.name, dropdownItem.items)
    })

    // 仅当下拉菜单有内容时才返回
    return dropdownItem.items.length ? dropdownItem : null
  }

  /**
   * 创建简单导航链接
   *
   * 生成指向目录根路径的导航链接项，可选地添加前缀和图标
   *
   * @private
   * @param {object} dir - 目录对象
   * @param {string} prefix - 前缀文本
   * @param {boolean} showIcon - 是否显示图标
   * @returns {object} 导航链接配置 {text: string, link: string}
   * @see {@link NavItem} - 导航项类型定义
   * @see {@link #getItemText} - 获取显示文本的辅助方法
   */
  #createSimpleNavLink(dir, prefix, showIcon) {
    return {
      text: this.#getItemText({showIcon}, prefix, dir.name, dir.name),
      link: `/${dir.name}/`,
    }
  }

  /**
   * 将目录添加到下拉菜单
   *
   * 将子目录转换为下拉菜单项:
   * 1. 优先链接到子目录的index.md
   * 2. 如无index.md，则链接到第一个Markdown文件
   *
   * @private
   * @param {object} dir - 目录对象
   * @param {string} parentPath - 父级路径
   * @param {Array} items - 下拉菜单项数组
   * @see {@link #findSpecialFiles} - 查找特殊文件的方法
   * @see {@link pathUtils.removeMdExt} - 移除Markdown扩展名的工具函数
   */
  #addDirectoryToDropdown(dir, parentPath, items) {
    const {showIcon, dirPrefix} = this.#config.nav
    const {indexFile, firstMdFile} = this.#findSpecialFiles(dir.children || [])
    const navItemText = this.#getItemText({showIcon}, dirPrefix, dir.name, dir.name)

    if (indexFile) {
      items.push({
        text: navItemText,
        link: `/${parentPath}/${dir.name}/`,
      })
    } else if (firstMdFile) {
      items.push({
        text: navItemText,
        link: `/${parentPath}/${dir.name}/${pathUtils.removeMdExt(firstMdFile.name)}`,
      })
    }
  }

  /**
   * 构建简单形式的导航项
   * 详细信息请参见类型定义文件
   *
   * @private
   * @param {TreeNode} dir - 目录对象
   * @returns {NavItem|null} 导航项配置 {text: string, link: string} 或 null
   * @see {@link ../types/index.d.ts|buildSimpleNavItem} - 在类型定义中查看详细说明
   * @see {@link #createSimpleNavLink} - 创建简单导航链接的方法
   */
  #buildSimpleNavItem(dir) {
    const {showIcon, dirPrefix} = this.#config.nav
    const {indexFile, firstMdFile} = this.#findSpecialFiles(dir.children || [])

    // 优先使用索引文件
    if (indexFile) {
      return this.#createSimpleNavLink(dir, dirPrefix, showIcon)
    }

    // 如果没有任何Markdown文件，则不创建导航项
    if (!firstMdFile) return null

    // 使用第一个Markdown文件
    return {
      text: this.#getItemText({showIcon}, dirPrefix, dir.name, dir.name),
      link: `/${dir.name}/${pathUtils.removeMdExt(firstMdFile.name)}`,
    }
  }

  /**
   * 构建侧边栏配置
   * 详细信息请参见类型定义文件
   *
   * @private
   * @returns {Sidebar} 侧边栏配置对象
   * @see {@link ../types/index.d.ts|buildSidebar} - 在类型定义中查看详细说明和示例
   * @see {@link Sidebar} - 侧边栏类型定义
   * @see {@link #buildSidebarSection} - 构建侧边栏区块的方法
   */
  #buildSidebar() {
    const sidebar = {}

    // 递归遍历所有目录并为每个目录生成侧边栏配置
    this.#fileTree
      .filter((item) => item?.type === CONSTANTS.NODE_TYPES.DIRECTORY)
      .forEach((dir) => {
        // 首先为顶层目录添加侧边栏
        const rootPath = `/${dir.name}/`
        if (dir.children?.length) {
          sidebar[rootPath] = this.#buildSidebarSection(dir, rootPath)
        }

        // 递归添加所有子目录的侧边栏 - 支持多级侧边栏
        this.#addSubdirectorySidebars(sidebar, dir, rootPath)
      })

    return sidebar
  }

  /**
   * 递归添加子目录的侧边栏配置
   *
   * 为每个子目录生成独立的侧边栏配置，形成完整的侧边栏映射
   * 子目录路径格式: /父目录/子目录/
   *
   * @private
   * @param {object} sidebar - 侧边栏配置对象
   * @param {object} dir - 当前目录
   * @param {string} parentPath - 父级路径
   * @see {@link #hasValidContent} - 检查目录是否有有效内容的方法
   * @see {@link #buildSidebarSection} - 构建侧边栏区块的方法
   */
  #addSubdirectorySidebars(sidebar, dir, parentPath) {
    if (!dir.children) return

    // 遍历子目录，只处理有有效内容的目录
    dir.children
      .filter((child) => child?.type === CONSTANTS.NODE_TYPES.DIRECTORY && this.#hasValidContent(child))
      .forEach((subdir) => {
        const subdirPath = `${parentPath}${subdir.name}/`

        // 为子目录添加侧边栏配置
        if (subdir.children?.length) {
          sidebar[subdirPath] = this.#buildSidebarSection(subdir, subdirPath)
        }

        // 递归处理子目录的子目录 - 支持无限层级
        this.#addSubdirectorySidebars(sidebar, subdir, subdirPath)
      })
  }

  /**
   * 检查目录是否有有效内容
   *
   * 判断目录是否包含有效内容的逻辑:
   * 1. 目录本身包含任何Markdown文件，则认为有效
   * 2. 目录的任何子目录包含有效内容，则认为有效
   * 3. 空目录或不包含任何Markdown文件的目录认为无效
   *
   * 该函数用于过滤不应该显示在侧边栏中的空目录
   *
   * @private
   * @param {object} dir - 目录对象
   * @returns {boolean} 是否有有效内容
   * @see {@link pathUtils.isMdFile} - 检查Markdown文件的工具函数
   */
  #hasValidContent(dir) {
    if (!dir?.children?.length) return false

    // 检查是否有Markdown文件
    const hasMdFiles = dir.children.some((child) => child?.type === CONSTANTS.NODE_TYPES.FILE && pathUtils.isMdFile(child?.name || ''))

    if (hasMdFiles) return true

    // 递归检查子目录是否有有效内容
    return dir.children.some((child) => child?.type === CONSTANTS.NODE_TYPES.DIRECTORY && this.#hasValidContent(child))
  }

  /**
   * 检查目录是否只包含一个index.md文件
   *
   * 用于优化侧边栏显示，避免为仅有单个索引文件的目录创建复杂折叠项
   *
   * @private
   * @param {object} dir - 目录对象
   * @returns {boolean} 是否只包含index.md文件
   * @see {@link CONSTANTS.FILE_NAMES.INDEX} - 索引文件名常量
   * @see {@link #hasValidContent} - 检查目录是否有有效内容的方法
   */
  #hasOnlyIndexFile(dir) {
    if (!dir?.children?.length) return false

    // 如果只有一个文件且为index.md，直接返回true
    if (dir.children.length === 1) {
      const onlyChild = dir.children[0]
      return onlyChild?.type === CONSTANTS.NODE_TYPES.FILE && onlyChild?.name === CONSTANTS.FILE_NAMES.INDEX
    }

    // 检查是否有index.md文件
    const indexFile = dir.children.find((child) => child?.type === CONSTANTS.NODE_TYPES.FILE && child?.name === CONSTANTS.FILE_NAMES.INDEX)

    if (!indexFile) return false

    // 检查是否有其他有内容的文件或目录
    const hasOtherContent = dir.children.some((child) => {
      if (child?.type === CONSTANTS.NODE_TYPES.FILE) {
        return child?.name !== CONSTANTS.FILE_NAMES.INDEX && pathUtils.isMdFile(child?.name || '')
      }
      return child?.type === CONSTANTS.NODE_TYPES.DIRECTORY && this.#hasValidContent(child)
    })

    return !hasOtherContent
  }

  /**
   * 构建侧边栏区块
   *
   * 生成目录对应的侧边栏块，包含标题和子项列表
   *
   * 生成的结构如下:
   * ```
   * [{
   *   text: '目录名',   // 显示的标题
   *   collapsed: false, // 是否折叠(仅适用于包含子目录的情况)
   *   items: [...]     // 子项列表
   * }]
   * ```
   *
   * @private
   * @param {object} dir - 目录对象
   * @param {string} path - 当前路径
   * @returns {Array<object>} 侧边栏区块配置数组
   * @see {@link #getValidSidebarItems} - 获取有效侧边栏项的方法
   * @see {@link #buildSidebarItemsFromChildren} - 从子节点构建侧边栏项的方法
   */
  #buildSidebarSection(dir, path) {
    const sortedChildren = dir.children || []
    const {sidebar} = this.#config

    // 检查路径层级和导航模式
    const isTopLevelDir = path.split('/').filter(Boolean).length === 1
    const isDropdownTopLevel = isTopLevelDir && this.#config.nav.dropdown

    // 过滤有效子项
    const validItems = this.#getValidSidebarItems(sortedChildren, isDropdownTopLevel)

    // 检查是否有子目录（用于决定是否添加collapsed属性）
    const hasSubDirectories = validItems.some((child) => child?.type === CONSTANTS.NODE_TYPES.DIRECTORY)

    // 构建侧边栏区块
    const sidebarSection = {
      text: this.#getItemText(sidebar, sidebar.dirPrefix, dir.name, dir.name),
      items: this.#buildSidebarItemsFromChildren(sortedChildren, path, dir, isDropdownTopLevel),
    }

    // 只有顶级目录且有子目录时才添加折叠属性
    if (hasSubDirectories && isTopLevelDir) {
      sidebarSection.collapsed = sidebar.collapsed ?? false
    }

    return [sidebarSection]
  }

  /**
   * 获取有效的侧边栏子项
   *
   * 根据节点类型和内容进行筛选:
   * 1. 对于文件，只保留Markdown文件
   * 2. 对于目录，只保留有效内容的目录
   * 3. 对于顶级下拉菜单模式，子目录不在侧边栏显示
   *
   * @private
   * @param {Array<object>} children - 子节点数组
   * @param {boolean} isDropdownTopLevel - 是否为顶级目录的下拉菜单模式
   * @returns {Array<object>} 有效的侧边栏项数组
   * @see {@link pathUtils.isMdFile} - 检查Markdown文件的工具函数
   * @see {@link #hasValidContent} - 检查目录是否有有效内容的方法
   */
  #getValidSidebarItems(children, isDropdownTopLevel) {
    return children.filter((child) => {
      // 过滤文件 - 只保留Markdown文件
      if (child?.type === CONSTANTS.NODE_TYPES.FILE) {
        return pathUtils.isMdFile(child?.name || '')
      }

      // 顶级下拉菜单模式下，子目录不在侧边栏显示
      if (isDropdownTopLevel && child?.type === CONSTANTS.NODE_TYPES.DIRECTORY) {
        return false
      }

      // 过滤有效目录 - 只保留有内容的目录
      return child?.type === CONSTANTS.NODE_TYPES.DIRECTORY && this.#hasValidContent(child)
    })
  }

  /**
   * 从子节点构建侧边栏项
   *
   * 将文件和目录转换为对应的侧边栏项:
   * 1. 文件节点转换为文件侧边栏项
   * 2. 目录节点转换为目录侧边栏项
   * 3. 过滤掉空值和无效项
   *
   * @private
   * @param {Array<object>} children - 子节点数组
   * @param {string} path - 当前路径
   * @param {object} dir - 当前目录对象
   * @param {boolean} isDropdownTopLevel - 是否为顶级目录的下拉菜单模式
   * @returns {Array<object>} 侧边栏项数组
   * @see {@link #buildSidebarFileItem} - 构建文件侧边栏项的方法
   * @see {@link #buildSidebarDirectoryItem} - 构建目录侧边栏项的方法
   */
  #buildSidebarItemsFromChildren(children, path, dir, isDropdownTopLevel) {
    const {sidebar} = this.#config

    return children
      .map((child) => {
        if (!child) return null

        if (child.type === CONSTANTS.NODE_TYPES.FILE) {
          return this.#buildSidebarFileItem(child, path, dir, sidebar)
        }

        if (child.type === CONSTANTS.NODE_TYPES.DIRECTORY && this.#hasValidContent(child)) {
          return this.#buildSidebarDirectoryItem(child, path, isDropdownTopLevel, sidebar)
        }

        return null
      })
      .filter(Boolean) // 过滤空值
  }

  /**
   * 构建侧边栏文件项
   *
   * 将文件节点转换为侧边栏项:
   * 1. 索引文件(index.md)特殊处理，链接到目录根路径
   * 2. 其他Markdown文件，链接到对应路径
   *
   * 文件标题优先级:
   * 1. frontmatter.title
   * 2. 对于index.md，使用"目录名+首页"
   * 3. 对于其他文件，使用文件名(不含扩展名)
   *
   * @private
   * @param {object} file - 文件对象
   * @param {string} path - 当前路径
   * @param {object} dir - 父目录对象
   * @param {object} sidebarConfig - 侧边栏配置
   * @returns {object|null} 侧边栏文件项配置 {text: string, link: string}
   * @see {@link CONSTANTS.FILE_NAMES.INDEX} - 索引文件名常量
   * @see {@link pathUtils.isMdFile} - 检查Markdown文件的工具函数
   * @see {@link pathUtils.removeMdExt} - 移除Markdown扩展名的工具函数
   */
  #buildSidebarFileItem(file, path, dir, sidebarConfig) {
    // 处理索引文件
    if (file.name === CONSTANTS.FILE_NAMES.INDEX) {
      // 优先使用frontmatter.title，只有在没有设置时才使用"目录名+首页"
      const defaultText = file.frontmatter?.title || `${dir.name}首页`
      return {
        text: this.#getItemText(sidebarConfig, sidebarConfig.filePrefix, file.frontmatter?.title, defaultText),
        link: path,
      }
    }

    // 处理其他Markdown文件
    if (pathUtils.isMdFile(file.name)) {
      return {
        text: this.#getItemText(sidebarConfig, sidebarConfig.filePrefix, file.frontmatter?.title, pathUtils.removeMdExt(file.name)),
        link: `${path}${pathUtils.removeMdExt(file.name)}`,
      }
    }

    return null
  }

  /**
   * 构建侧边栏目录项
   *
   * 将目录节点转换为侧边栏项(带嵌套子项):
   * 1. 创建目录项，包含text和items属性
   * 2. 递归构建子项列表
   * 3. 只有当有子目录时才添加折叠属性
   *
   * 生成结构示例:
   * ```
   * {
   *   text: '目录名',
   *   collapsed: true, // 仅当有子目录时才添加
   *   items: [...]
   * }
   * ```
   *
   * @private
   * @param {object} dir - 目录对象
   * @param {string} parentPath - 父级路径
   * @param {boolean} isDropdownTopLevel - 是否为顶级目录的下拉菜单模式
   * @param {object} sidebarConfig - 侧边栏配置
   * @returns {object|null} 侧边栏目录项配置
   * @see {@link #hasValidContent} - 检查目录是否有有效内容的方法
   * @see {@link #buildSidebarItems} - 构建侧边栏子项的方法
   */
  #buildSidebarDirectoryItem(dir, parentPath, isDropdownTopLevel, sidebarConfig) {
    // 如果是顶级下拉菜单模式，不显示子目录
    if (isDropdownTopLevel) return null

    // 检查是否有实际的子目录(用于决定是否添加collapsed属性)
    const childHasSubDirs = (dir.children || []).some((grandChild) => grandChild?.type === CONSTANTS.NODE_TYPES.DIRECTORY && this.#hasValidContent(grandChild))

    // 创建目录项
    const dirItem = {
      text: this.#getItemText(sidebarConfig, sidebarConfig.dirPrefix, dir.name, dir.name),
      items: this.#buildSidebarItems(dir.children || [], `${parentPath}${dir.name}/`),
    }

    // 只有当有实际子目录时才添加折叠属性 - 避免不必要的UI控件
    if (childHasSubDirs) {
      dirItem.collapsed = sidebarConfig.collapsed ?? true
    }

    return dirItem
  }

  /**
   * 构建侧边栏子项
   *
   * 递归处理子节点，生成完整的侧边栏层次结构
   * 这是一个通用函数，同时处理文件和目录节点
   *
   * @private
   * @param {Array<object>} children - 子节点数组
   * @param {string} path - 当前路径
   * @returns {Array<object>} 侧边栏子项配置数组
   * @see {@link CONSTANTS.FILE_NAMES.INDEX} - 索引文件名常量
   * @see {@link pathUtils.isMdFile} - 检查Markdown文件的工具函数
   * @see {@link pathUtils.removeMdExt} - 移除Markdown扩展名的工具函数
   * @see {@link #hasValidContent} - 检查目录是否有有效内容的方法
   */
  #buildSidebarItems(children, path) {
    const {sidebar} = this.#config
    const dirName = path.split('/').filter(Boolean).pop() || ''

    return children
      .map((child) => {
        if (!child) return null

        if (child.type === CONSTANTS.NODE_TYPES.FILE) {
          if (child.name === CONSTANTS.FILE_NAMES.INDEX) {
            // 优先使用frontmatter.title，只有在没有设置时才使用"目录名+首页"
            const defaultText = child.frontmatter?.title || `${dirName}首页`
            return {
              text: this.#getItemText(sidebar, sidebar.filePrefix, child.frontmatter?.title, defaultText),
              link: path,
            }
          }

          if (pathUtils.isMdFile(child.name)) {
            return {
              text: this.#getItemText(sidebar, sidebar.filePrefix, child.frontmatter?.title, pathUtils.removeMdExt(child.name)),
              link: `${path}${pathUtils.removeMdExt(child.name)}`,
            }
          }
        } else if (child.type === CONSTANTS.NODE_TYPES.DIRECTORY && this.#hasValidContent(child)) {
          // 检查是否有子目录（不只是文件）
          const hasSubDirs = (child.children || []).some((grandChild) => grandChild?.type === CONSTANTS.NODE_TYPES.DIRECTORY && this.#hasValidContent(grandChild))

          const item = {
            text: this.#getItemText(sidebar, sidebar.dirPrefix, child.name, child.name),
            items: this.#buildSidebarItems(child.children || [], `${path}${child.name}/`),
          }

          // 只有当有子目录时才添加collapsed属性
          if (hasSubDirs) {
            item.collapsed = sidebar.collapsed ?? true
          }

          return item
        }
        return null
      })
      .filter(Boolean)
  }

  /**
   * 获取显示文本
   *
   * 根据配置和优先级规则确定最终显示的文本:
   * 1. 优先使用title参数(通常是frontmatter.title)
   * 2. 其次使用defaultText(通常是文件名或目录名)
   * 3. 根据配置可选地添加前缀图标
   *
   * @private
   * @param {object} config - 配置对象
   * @param {string} prefix - 前缀文本
   * @param {string} title - 标题文本(优先级高)
   * @param {string} defaultText - 默认文本(优先级低)
   * @returns {string} 最终显示文本
   */
  #getItemText(config, prefix, title, defaultText) {
    if (!config || typeof config !== 'object') return title || defaultText || ''

    const showIcon = config.showIcon ?? false
    const text = title || defaultText || ''

    return showIcon && prefix ? `${prefix} ${text}` : text
  }
}
