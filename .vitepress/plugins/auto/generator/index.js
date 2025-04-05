/**
 * VitePress配置生成器
 *
 * 这是配置生成器的主入口点，提供了根据文件系统自动生成
 * VitePress导航栏和侧边栏配置的功能。支持多层级目录结构，
 * 智能排序和自定义样式配置。
 *
 * @module generator
 * @see {@link ./types/index.d.ts} - 查看完整的类型定义和示例
 * @see {@link ./core/VitePressGenerator.js} - 核心生成器类
 */

/**
 * @typedef {import('./types/index').GeneratorConfig} GeneratorConfig
 * @typedef {import('./types/index').GeneratorResult} GeneratorResult
 */

import {FileTreeBuilder} from '../fileTree/index.js'
import {VitePressGenerator} from './core/VitePressGenerator.js'
import {performanceMonitor} from './utils/performance.js'

/**
 * 自动生成VitePress导航和侧边栏配置
 *
 * 这是最主要的API函数，用于根据文件系统结构和配置选项
 * 自动生成导航栏和侧边栏配置。
 *
 * @param {Partial<GeneratorConfig>} [options] - 配置选项
 * @returns {Promise<GeneratorResult>} 导航栏、侧边栏配置和文件树
 * @see {@link ./types/index.d.ts|GeneratorConfig} - 配置选项详细说明
 * @see {@link ./types/index.d.ts|GeneratorResult} - 返回结果类型定义
 * @see {@link performanceMonitor} - 性能监控工具
 * @see {@link FileTreeBuilder} - 文件树构建器
 * @see {@link VitePressGenerator} - 核心生成器类
 */
export async function Generator(options = {}) {
  try {
    // 判断是否启用性能监控
    if (options.debug) performanceMonitor.enable()

    // 记录整体执行时间
    const end = performanceMonitor.start('Generator总执行')

    // 创建文件树构建器和生成器实例
    const fileTreeBuilder = new FileTreeBuilder(options)
    const generator = new VitePressGenerator(options, fileTreeBuilder)

    // 生成配置
    const result = await generator.generate()

    // 结束性能计时并输出报告
    end()
    if (options.debug) console.log(performanceMonitor.getFormattedReport())

    return result
  } catch (error) {
    console.error('生成配置失败:', error)
    return {nav: [], sidebar: {}, fileTree: []}
  }
}

// 导出其他核心模块和工具函数，以便高级用户直接使用

/**
 * 常量定义
 * 包含节点类型、特殊文件名和默认配置
 * @see {@link ./config/constants.js} - 常量定义源文件
 * @see {@link ./types/index.d.ts|CONSTANTS} - 常量类型定义
 */
export {CONSTANTS} from './config/constants.js'

/**
 * VitePress配置生成器类
 * 提供更灵活的配置生成方式，适用于高级定制场景
 * @see {@link ./core/VitePressGenerator.js} - 生成器类源文件
 * @see {@link ./types/index.d.ts|VitePressGenerator} - 生成器类型定义
 */
export {VitePressGenerator} from './core/VitePressGenerator.js'

/**
 * 路径处理工具
 * 提供丰富的路径操作函数，如路径构建、规范化等
 * @see {@link ./utils/path.js} - 路径工具源文件
 * @see {@link ./types/index.d.ts|pathUtils} - 路径工具类型定义
 */
export {pathUtils} from './utils/path.js'

/**
 * 性能监控工具
 * 提供代码执行性能的精细监控功能
 * @see {@link ./utils/performance.js} - 性能监控源文件
 * @see {@link ./types/index.d.ts|performanceMonitor} - 性能监控类型定义
 */
export {performanceMonitor} from './utils/performance.js'

/**
 * 排序工具函数
 * 多阶段排序算法，用于对文件和目录进行智能排序
 * @see {@link ./utils/sort.js} - 排序工具源文件
 * @see {@link ./types/index.d.ts|sortNodes} - 排序函数类型定义
 * @see {@link ./types/index.d.ts|SortingConfig} - 排序配置类型定义
 */
export {sortNodes} from './utils/sort.js'
