/**
 * 性能监控工具模块
 * 用于精确测量代码执行时间，帮助识别性能瓶颈
 *
 * 本模块提供了一套完整的性能监控工具，用于测量应用中不同代码块
 * 和函数的执行时间，支持同步和异步操作，帮助开发者找出性能瓶颈。
 *
 * @module performance
 * @see {@link ../types/index.d.ts|performanceMonitor} - 查看完整的类型定义
 * @see {@link ../index.js|Generator} - 使用此监控工具的函数
 * @see {@link ../core/VitePressGenerator.js|generate} - 使用此工具测量生成过程性能
 */

/**
 * @typedef {import('../types/index').PerformanceEntry} PerformanceEntry
 */

/**
 * 性能监控器类
 * 提供对代码块和函数执行时间的精细监控，支持同步和异步操作
 *
 * 主要功能:
 * - 记录操作的执行时间
 * - 收集性能数据用于分析
 * - 生成格式化的性能报告
 * - 支持同步和异步函数计时
 *
 * @class
 * @see {@link ../types/index.d.ts|PerformanceEntry} - 性能记录项类型定义
 * @see {@link ../index.js|Generator} - 使用该监控器的主函数
 * @example
 * ```js
 * // 简单使用示例
 * const monitor = new PerformanceMonitor(true); // 启用监控
 *
 * // 监控代码块
 * const end = monitor.start('操作A');
 * // ... 执行某些操作
 * const duration = end(); // 结束计时并获取耗时
 *
 * // 监控函数
 * const result = await monitor.time('操作B', async () => {
 *   // ... 执行异步操作
 *   return someResult;
 * });
 *
 * // 获取性能报告
 * console.log(monitor.getFormattedReport());
 * ```
 */
class PerformanceMonitor {
  /**
   * 性能记录映射表，键为操作名称，值为性能记录对象
   * 使用Map而非对象以获得更好的性能和功能
   * @private
   */
  #entries = new Map()

  /**
   * 是否启用监控功能的标志
   * 禁用时不会收集性能数据，降低运行开销
   * @private
   */
  #enabled = false

  /**
   * 监控器启动时间
   * 用于计算总体执行时长
   * @private
   */
  #startTime = 0

  /**
   * 创建性能监控器实例
   *
   * @constructor
   * @param {boolean} enabled - 是否默认启用
   * @see {@link enable} - 启用监控的方法
   * @see {@link disable} - 禁用监控的方法
   * @example
   * ```js
   * // 创建默认禁用的监控器
   * const monitor = new PerformanceMonitor();
   *
   * // 创建默认启用的监控器
   * const activeMonitor = new PerformanceMonitor(true);
   * ```
   */
  constructor(enabled = false) {
    this.#enabled = enabled
    this.#startTime = performance.now()
  }

  /**
   * 获取监控器启用状态
   *
   * @returns {boolean} 当前是否启用监控
   * @see {@link enable} - 启用监控的方法
   * @see {@link disable} - 禁用监控的方法
   * @example
   * ```js
   * if (performanceMonitor.isEnabled()) {
   *   console.log('性能监控已启用');
   * }
   * ```
   */
  isEnabled() {
    return this.#enabled
  }

  /**
   * 启用监控器
   * 开始收集性能数据并重置开始时间
   *
   * @see {@link disable} - 禁用监控的方法
   * @see {@link isEnabled} - 检查启用状态的方法
   * @example
   * ```js
   * // 启用性能监控
   * performanceMonitor.enable();
   *
   * // 执行需要监控的代码...
   * ```
   */
  enable() {
    this.#enabled = true
    // 重置启动时间以保证准确性
    this.#startTime = performance.now()
  }

  /**
   * 禁用监控器
   * 停止收集新的性能数据，但保留已有数据
   *
   * @see {@link enable} - 启用监控的方法
   * @see {@link isEnabled} - 检查启用状态的方法
   * @example
   * ```js
   * // 禁用性能监控
   * performanceMonitor.disable();
   *
   * // 此后的代码执行不会被记录...
   * ```
   */
  disable() {
    this.#enabled = false
  }

  /**
   * 开始记录某个操作的性能
   * 返回一个函数，调用该函数会结束计时并记录性能数据
   *
   * @param {string} name - 操作名称
   * @param {object} [metadata] - 额外元数据，可用于记录操作的上下文信息
   * @returns {Function} 结束记录的函数，调用时返回操作持续时间(毫秒)
   * @see {@link time} - 用于包装函数的性能监控方法
   * @see {@link ../index.js|Generator} - 使用该方法的函数示例
   * @example
   * ```js
   * // 监控代码块执行时间
   * const end = performanceMonitor.start('加载数据');
   *
   * // 执行一些操作...
   * await loadData();
   *
   * // 结束计时并获取持续时间
   * const duration = end();
   * console.log(`加载数据耗时: ${duration}ms`);
   *
   * // 带元数据的使用方式
   * const end2 = performanceMonitor.start('处理数据', {
   *   dataSize: '10MB',
   *   source: 'database'
   * });
   *
   * // ... 执行处理
   * end2(); // 结束并记录
   * ```
   */
  start(name, metadata = {}) {
    // 如果监控器被禁用，返回空函数以降低性能影响
    if (!this.#enabled) return () => 0

    const startTime = performance.now()
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      this.#entries.set(name, {name, startTime, endTime, duration, metadata})
      return duration
    }
  }

  /**
   * 计时器包装器，用于包装函数并记录其执行时间
   * 自动检测同步和异步函数，并适当处理Promise
   *
   * @param {string} name - 操作名称
   * @param {Function} fn - 要执行的函数(同步或异步)
   * @param {object} [metadata] - 额外元数据
   * @returns {Promise<any>|any} 函数的执行结果
   * @see {@link start} - 开始计时的基础方法
   * @see {@link getEntries} - 获取记录的性能数据的方法
   * @example
   * ```js
   * // 监控同步函数
   * const result = performanceMonitor.time('计算总和', () => {
   *   let sum = 0;
   *   for (let i = 0; i < 1000000; i++) {
   *     sum += i;
   *   }
   *   return sum;
   * });
   *
   * // 监控异步函数
   * const data = await performanceMonitor.time('异步获取数据', async () => {
   *   const response = await fetch('/api/data');
   *   return response.json();
   * }, { endpoint: '/api/data' }); // 添加元数据
   * ```
   */
  async time(name, fn, metadata = {}) {
    // 如果监控器禁用，直接执行函数而不记录性能
    if (!this.#enabled) return fn()

    const startTime = performance.now()
    // 检测函数是否为异步函数
    const isAsync = fn.constructor.name === 'AsyncFunction' || fn.toString().includes('Promise') || fn.toString().includes('async')

    try {
      // 根据函数类型执行并获取结果
      const result = isAsync ? await fn() : fn()
      const endTime = performance.now()

      // 记录性能数据
      this.#entries.set(name, {
        name,
        startTime,
        endTime,
        duration: endTime - startTime,
        metadata,
      })

      return result
    } catch (error) {
      // 记录错误信息和性能数据
      const endTime = performance.now()

      this.#entries.set(name, {
        name,
        startTime,
        endTime,
        duration: endTime - startTime,
        error: error.message || String(error),
        metadata,
      })

      // 重新抛出错误，确保调用者能捕获到
      throw error
    }
  }

  /**
   * 获取所有性能记录
   * 返回所有已记录的性能数据
   *
   * @returns {Array<PerformanceEntry>} 性能记录数组
   * @see {@link getEntry} - 获取单个性能记录的方法
   * @see {@link getFormattedReport} - 获取格式化报告的方法
   * @example
   * ```js
   * // 获取所有性能记录
   * const entries = performanceMonitor.getEntries();
   *
   * // 处理记录数据
   * entries.forEach(entry => {
   *   console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
   * });
   * ```
   */
  getEntries() {
    return Array.from(this.#entries.values())
  }

  /**
   * 获取特定操作的性能记录
   * 通过操作名称查找对应的性能数据
   *
   * @param {string} name - 操作名称
   * @returns {PerformanceEntry|undefined} 性能记录或undefined(如果不存在)
   * @see {@link getEntries} - 获取所有性能记录的方法
   * @example
   * ```js
   * // 获取特定操作的性能数据
   * const entry = performanceMonitor.getEntry('加载数据');
   *
   * if (entry) {
   *   console.log(`加载数据耗时: ${entry.duration.toFixed(2)}ms`);
   *   console.log('元数据:', entry.metadata);
   * }
   * ```
   */
  getEntry(name) {
    return this.#entries.get(name)
  }

  /**
   * 获取总执行时间
   * 从监控器创建(或上次调用clear)到现在的总时间
   *
   * @returns {number} 总执行时间(毫秒)
   * @see {@link getFormattedReport} - 获取完整报告的方法
   * @example
   * ```js
   * // 获取自监控启动以来的总时间
   * const totalTime = performanceMonitor.getTotalDuration();
   * console.log(`总运行时间: ${totalTime.toFixed(2)}ms`);
   * ```
   */
  getTotalDuration() {
    return performance.now() - this.#startTime
  }

  /**
   * 获取格式化的性能报告
   * 生成一份包含所有操作耗时的详细报告
   *
   * @param {boolean} [includeErrors] - 是否在报告中包含错误信息
   * @returns {string} 格式化的性能报告文本
   * @see {@link getEntries} - 获取原始性能数据的方法
   * @see {@link ../index.js|Generator} - 使用该方法生成报告的示例
   * @example
   * ```js
   * // 获取并打印完整的性能报告
   * const report = performanceMonitor.getFormattedReport();
   * console.log(report);
   *
   * // 获取不含错误信息的报告
   * const cleanReport = performanceMonitor.getFormattedReport(false);
   * ```
   */
  getFormattedReport(includeErrors = true) {
    if (!this.#enabled) return '性能监控器已禁用'

    const entries = this.getEntries()
    if (!entries.length) return '暂无性能数据'

    // 对条目按耗时降序排序
    entries.sort((a, b) => b.duration - a.duration)

    // 计算总时间和汇总信息
    const totalDuration = this.getTotalDuration()
    const totalOperations = entries.length
    const errorCount = entries.filter((entry) => entry.error).length

    // 生成报告头部
    let report = `
======== 性能监控报告 ========
总执行时间: ${totalDuration.toFixed(2)}ms
操作数量: ${totalOperations}
错误数量: ${errorCount}
==============================

`

    // 生成条目详情
    report += entries
      .map((entry) => {
        // 基本信息：名称和耗时
        let entryText = `[${entry.name}] ${entry.duration.toFixed(2)}ms (${((entry.duration / totalDuration) * 100).toFixed(1)}%)`

        // 添加元数据信息
        if (Object.keys(entry.metadata).length > 0) {
          entryText += `\n  元数据: ${JSON.stringify(entry.metadata)}`
        }

        // 添加错误信息（如果有且需要包含）
        if (includeErrors && entry.error) {
          entryText += `\n  错误: ${entry.error}`
        }

        return entryText
      })
      .join('\n\n')

    return report
  }

  /**
   * 清除所有性能记录
   * 重置监控器状态，但保持启用/禁用状态不变
   *
   * @see {@link getEntries} - 获取性能记录的方法
   * @see {@link enable} - 启用监控的方法
   * @example
   * ```js
   * // 清除所有已收集的性能数据
   * performanceMonitor.clear();
   *
   * // 开始新一轮性能监控
   * // ...执行需要监控的代码
   * ```
   */
  clear() {
    this.#entries.clear()
    this.#startTime = performance.now()
  }
}

/**
 * 导出单例实例
 * 应用内共享同一个性能监控器实例，确保监控数据的一致性
 *
 * @const {PerformanceMonitor}
 * @see {@link ../types/index.d.ts|performanceMonitor} - 类型定义
 * @see {@link ../index.js|Generator} - 使用该实例的函数
 * @example
 * ```js
 * // 在入口文件中启用性能监控
 * import { performanceMonitor } from './utils/performance.js';
 *
 * if (process.env.NODE_ENV === 'development') {
 *   performanceMonitor.enable();
 * }
 *
 * // 在其它模块中使用
 * const end = performanceMonitor.start('moduleInitialization');
 * // ... 模块初始化代码
 * end(); // 完成计时
 * ```
 */
export const performanceMonitor = new PerformanceMonitor()
