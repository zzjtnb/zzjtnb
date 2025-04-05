/**
 * 排序工具函数模块
 * 提供高级的文件和目录节点排序功能
 *
 * 本模块提供了多阶段排序算法，用于确保文件和目录在生成的
 * VitePress导航和侧边栏中按照合理的顺序展示。
 *
 * @module sort
 * @see {@link ../types/index.d.ts|sortNodes} - 查看完整的类型定义
 * @see {@link ../config/constants.js|CONSTANTS} - 使用的常量定义
 * @see {@link ../core/VitePressGenerator.js} - 使用排序功能的生成器类
 */

/**
 * @typedef {import('../types/index').TreeNode} TreeNode
 * @typedef {import('../types/index').SortingConfig} SortingConfig
 */

/**
 * 多阶段排序算法
 *
 * 排序原理: 按照以下5个优先级阶段依次排序，一旦在某阶段确定了顺序，就不再进行后续比较
 *
 * 1. 特殊文件优先 → index.md, guide.md等特殊文件排在最前面
 * 2. 自定义排序规则 → 使用order.custom字段定义的复杂排序规则
 *    • 包含priority数组优先级排序 → priority数组中的文件按数组顺序排序
 * 3. 目录类型 → 目录排在文件前面
 * 4. Frontmatter → 根据文档中的order字段排序
 * 5. 中文排序 → 使用本地化比较支持中文拼音和数字自然排序
 *
 * @function sortNodes
 * @param {Array<TreeNode>} nodes - 待排序节点数组
 * @param {Partial<SortingConfig>} sortingConfig - 排序配置
 * @returns {Array<TreeNode>} 排序后的新数组(原数组不会被修改)
 * @see {@link ../types/index.d.ts|SortingConfig} - 排序配置详细说明和示例
 * @see {@link ../types/index.d.ts|TreeNode} - 树节点类型定义
 * @see {@link ../core/VitePressGenerator.js|#preprocessFileTree} - 使用此排序函数的方法
 * @example
 * ```js
 * // 基本用法
 * const sortedNodes = sortNodes(fileTreeNodes, {
 *   order: {
 *     index: 0,      // index.md文件排在最前
 *     directory: 1,  // 目录排在第二位
 *     file: 2        // 普通文件排在最后
 *   }
 * });
 *
 * // 自定义优先级
 * const sortedWithPriority = sortNodes(fileTreeNodes, {
 *   priority: ['README.md', 'getting-started.md'],
 *   order: {
 *     custom: 0,     // 优先使用自定义规则(包括priority数组)
 *     index: 1,      // index.md次之
 *     directory: 2,  // 然后是目录
 *     file: 3        // 最后是普通文件
 *   }
 * });
 * ```
 */
export function sortNodes(nodes, sortingConfig) {
  // 处理边界情况
  if (!Array.isArray(nodes) || nodes.length <= 1) return nodes
  if (!sortingConfig || typeof sortingConfig !== 'object') return [...nodes]

  // 解构排序配置，提供默认值
  const {priority = [], order = {}} = sortingConfig

  // 创建优先级映射表，用于快速查找 O(1)
  // 按照priority数组的顺序设置优先级权重
  const priorityMap = new Map(priority.map((p, i) => [typeof p === 'string' ? p.toLowerCase() : p, i]))

  // 特殊文件映射表 - 使用Map而非对象，提高查找性能
  const specialFiles = new Map([
    ['index.md', order.index ?? 0], // 最高优先级
    ['guide.md', order.guide ?? 1], // 次高优先级
  ])

  // 创建新数组并排序，不修改原数组
  return [...nodes].sort((a, b) => {
    // 空值防护 - 确保节点有效
    if (!a || !b || !a.name || !b.name) return 0

    // 预处理文件名小写转换，避免重复计算，提高比较效率
    const aName = String(a.name).toLowerCase()
    const bName = String(b.name).toLowerCase()

    // ------------------- 阶段1: 特殊文件排序 -------------------
    // 特殊文件(index.md, guide.md)总是排在最前面
    // 权重由order.index和order.guide决定
    const aSpecial = specialFiles.get(aName) ?? Infinity
    const bSpecial = specialFiles.get(bName) ?? Infinity
    if (aSpecial !== bSpecial) return aSpecial - bSpecial

    // ------------------- 阶段2: 自定义排序规则 -------------------
    // 通过order.custom进行自定义排序，实现更复杂的规则
    const customWeight = order.custom ?? 2

    // 检查custom的权重是否低于后续阶段
    // 只有当自定义排序权重比后续阶段(directory/file)低时才应用
    if (customWeight !== Infinity && customWeight < Math.min(order.directory ?? Infinity, order.file ?? Infinity)) {
      // 作为custom的主要部分，应用priority数组排序
      // 按照priority数组中的顺序排序，不在列表中的文件权重为Infinity
      const aPriority = priorityMap.get(aName)
      const bPriority = priorityMap.get(bName)

      // 如果任一文件在priority中，应用优先级排序
      if (aPriority !== undefined || bPriority !== undefined) {
        return (aPriority ?? Infinity) - (bPriority ?? Infinity)
      }

      // 这里可以添加其他自定义排序逻辑
      // 例如基于特定文件名模式、内容类型等进行排序
    }

    // ------------------- 阶段3: 目录类型优先 -------------------
    // 根据节点类型排序，目录通常排在文件前面
    if (a.type !== b.type) {
      return (order[a.type] ?? Infinity) - (order[b.type] ?? Infinity)
    }

    // ------------------- 阶段4: Frontmatter排序 -------------------
    // 支持在Markdown文件的frontmatter中设置order值来自定义排序
    const aOrder = a.frontmatter?.order ?? order.file ?? Infinity
    const bOrder = b.frontmatter?.order ?? order.file ?? Infinity
    if (aOrder !== bOrder) return aOrder - bOrder

    // ------------------- 阶段5: 中文文件名自然排序 -------------------
    // 使用localeCompare进行智能排序，支持中文拼音和数字
    try {
      // 使用zh-CN区域设置确保中文字符正确排序
      // numeric选项确保数字按照数值大小而非字符顺序排序
      return String(a.name).localeCompare(String(b.name), 'zh-CN', {numeric: true})
    } catch (e) {
      // 降级排序，处理特殊字符或不支持localeCompare的环境
      return String(a.name) > String(b.name) ? 1 : -1
    }
  })
}
