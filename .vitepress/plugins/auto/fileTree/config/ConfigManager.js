import fs from 'node:fs'
import {ErrorHandler} from '../error/ErrorHandler.js'

/**
 * @typedef {import('../types/index.js').FileTreeConfig} FileTreeConfig
 */

/**
 * 配置管理器类
 * 用于管理和验证文件树构建的配置
 */
export class ConfigManager {
  /** @type {FileTreeConfig} */
  #config
  /** @type {ErrorHandler} */
  #errorHandler

  /**
   * 默认配置
   * @type {FileTreeConfig}
   */
  static #defaultConfig = {
    // 源目录，必需字段
    srcDir: '.',
    // 最大递归深度，默认10层，用于防止无限递归
    maxDepth: 10,
    // 最大文件大小，默认10MB，超过此大小的文件将被跳过
    maxFileSize: 10 * 1024 * 1024,
    // 内存限制，默认1GB，超过此限制将抛出错误
    memoryLimit: 1024,
    // 是否启用调试模式，默认关闭，开启后将输出详细日志
    debug: false,
    // 是否启用缓存，默认开启，可提高重复构建的性能
    enableCache: true,
    // 缓存过期时间，默认5分钟，过期后缓存将被清除
    cacheTTL: 5 * 60 * 1000,
    // 排除规则，默认空数组，支持字符串和正则表达式
    exclude: ['node_modules', '.git', '.vscode', '.idea', '.DS_Store', /\.temp\./, /\.cache\./, /\.log$/, /\.tmp$/, /\.bak$/],
    // 包含规则，默认空数组，支持字符串和正则表达式
    include: [],
    // 并发数，默认50，用于控制同时处理的文件数
    concurrency: 50,
    // 批处理大小，默认50，用于控制每次处理的文件数
    batchSize: 50,
    // 是否启用流式处理，默认开启，用于处理大文件
    enableStreaming: true,
    // 是否启用压缩，默认关闭，用于减少内存使用
    enableCompression: false,
    // 压缩级别，默认6，范围1-9
    compressionLevel: 6,
    // 是否启用增量构建，默认关闭，只处理变化的文件
    enableIncremental: false,
    // 是否启用并行处理，默认开启，用于提高性能
    enableParallel: true,
    // 是否启用内存优化，默认开启，用于减少内存使用
    enableMemoryOptimization: true,
    // 是否启用错误恢复，默认开启，用于处理部分失败的情况
    enableErrorRecovery: true,
    // 重试次数，默认3次，用于处理临时错误
    retryCount: 3,
    // 重试延迟，默认1000ms，用于处理临时错误
    retryDelay: 1000,
    // 是否启用文件监控，默认关闭，用于实时更新
    enableWatch: false,
    // 文件监控延迟，默认1000ms，用于减少不必要的更新
    watchDelay: 1000,
    // 是否启用性能分析，默认关闭，用于收集性能数据
    enableProfiling: false,
    // 性能分析采样率，默认0.1，范围0-1
    profilingSampleRate: 0.1,
  }

  /**
   * 创建配置管理器实例
   * @param {Partial<FileTreeConfig>} [config] - 配置选项
   */
  constructor(config = {}) {
    this.#errorHandler = new ErrorHandler(config.debug)
    this.#config = this.#mergeConfig(config)
    this.#validateConfig()
  }

  /**
   * 获取配置
   * @returns {FileTreeConfig} 当前配置
   */
  getConfig() {
    return {...this.#config}
  }

  /**
   * 更新配置
   * @param {Partial<FileTreeConfig>} config - 新配置
   */
  updateConfig(config) {
    this.#config = this.#mergeConfig(config)
    this.#validateConfig()
  }

  /**
   * 合并配置
   * @param {Partial<FileTreeConfig>} config - 用户配置
   * @returns {FileTreeConfig} 合并后的配置
   * @private
   */
  #mergeConfig(config) {
    // 1. 合并基本配置
    const mergedConfig = {
      ...ConfigManager.#defaultConfig,
      ...config,
    }

    // 2. 处理数组类型的配置
    mergedConfig.exclude = this.#normalizeArrayConfig(config.exclude, 'exclude')
    mergedConfig.include = this.#normalizeArrayConfig(config.include, 'include')

    return mergedConfig
  }

  /**
   * 规范化数组配置
   * @param {any} value - 配置值
   * @param {string} key - 配置键名
   * @returns {Array<string|RegExp>} 规范化后的数组
   * @private
   */
  #normalizeArrayConfig(value, key) {
    if (!Array.isArray(value)) {
      return ConfigManager.#defaultConfig[key]
    }

    // 移除重复项
    const uniqueValues = new Set(value)
    return Array.from(uniqueValues)
  }

  /**
   * 验证配置
   * @private
   */
  #validateConfig() {
    // 1. 验证必需字段
    this.#errorHandler.validateConfig(this.#config)

    // 2. 验证源目录
    this.#validateSrcDir(this.#config.srcDir)

    // 3. 验证排除和包含规则
    this.#validateRules(this.#config.exclude, 'exclude')
    this.#validateRules(this.#config.include, 'include')

    // 4. 验证数值范围
    this.#validateNumericRanges()

    // 5. 验证规则冲突
    this.#validateRuleConflicts()
  }

  /**
   * 验证源目录
   * @param {string} srcDir - 源目录路径
   * @private
   */
  #validateSrcDir(srcDir) {
    this.#errorHandler.validatePath(srcDir)

    // 检查目录是否存在
    if (!fs.existsSync(srcDir)) {
      throw this.#errorHandler.createError(`源目录不存在: ${srcDir}`, 'INVALID_SRC_DIR')
    }

    // 检查是否为目录
    if (!fs.statSync(srcDir).isDirectory()) {
      throw this.#errorHandler.createError(`源路径不是目录: ${srcDir}`, 'INVALID_SRC_DIR')
    }

    // 检查目录权限
    try {
      fs.accessSync(srcDir, fs.constants.R_OK)
    } catch (error) {
      throw this.#errorHandler.createError(`源目录无读取权限: ${srcDir}`, 'INVALID_SRC_DIR')
    }
  }

  /**
   * 验证规则
   * @param {Array<string|RegExp>} rules - 规则数组
   * @param {string} type - 规则类型
   * @private
   */
  #validateRules(rules, type) {
    this.#errorHandler.validateExclude(rules)

    // 验证规则格式
    rules.forEach((rule, index) => {
      if (typeof rule === 'string' && rule.includes('**')) {
        throw this.#errorHandler.createError(`不支持的通配符模式: ${rule}`, 'INVALID_RULE', {type, index})
      }
    })
  }

  /**
   * 验证数值范围
   * @private
   */
  #validateNumericRanges() {
    if (this.#config.maxDepth < 1) {
      throw this.#errorHandler.createError('maxDepth 必须大于 0', 'INVALID_CONFIG')
    }

    if (this.#config.maxFileSize < 1024) {
      throw this.#errorHandler.createError('maxFileSize 必须大于 1KB', 'INVALID_CONFIG')
    }

    if (this.#config.memoryLimit < 100) {
      throw this.#errorHandler.createError('memoryLimit 必须大于 100MB', 'INVALID_CONFIG')
    }

    if (this.#config.cacheTTL < 1000) {
      throw this.#errorHandler.createError('cacheTTL 必须大于 1秒', 'INVALID_CONFIG')
    }

    if (this.#config.concurrency < 1) {
      throw this.#errorHandler.createError('concurrency 必须大于 0', 'INVALID_CONFIG')
    }

    if (this.#config.batchSize < 1) {
      throw this.#errorHandler.createError('batchSize 必须大于 0', 'INVALID_CONFIG')
    }

    if (this.#config.compressionLevel < 1 || this.#config.compressionLevel > 9) {
      throw this.#errorHandler.createError('compressionLevel 必须在 1-9 之间', 'INVALID_CONFIG')
    }

    if (this.#config.retryCount < 0) {
      throw this.#errorHandler.createError('retryCount 必须大于等于 0', 'INVALID_CONFIG')
    }

    if (this.#config.retryDelay < 0) {
      throw this.#errorHandler.createError('retryDelay 必须大于等于 0', 'INVALID_CONFIG')
    }

    if (this.#config.watchDelay < 100) {
      throw this.#errorHandler.createError('watchDelay 必须大于等于 100ms', 'INVALID_CONFIG')
    }

    if (this.#config.profilingSampleRate < 0 || this.#config.profilingSampleRate > 1) {
      throw this.#errorHandler.createError('profilingSampleRate 必须在 0-1 之间', 'INVALID_CONFIG')
    }
  }

  /**
   * 验证规则冲突
   * @private
   */
  #validateRuleConflicts() {
    const conflicts = this.#config.exclude.filter((pattern) =>
      this.#config.include.some((include) => (pattern instanceof RegExp ? pattern.test(include) : include.includes(pattern)))
    )

    if (conflicts.length > 0) {
      throw this.#errorHandler.createError('排除规则和包含规则存在冲突', 'INVALID_CONFIG', {conflicts})
    }
  }

  /**
   * 获取默认配置
   * @returns {FileTreeConfig} 默认配置
   */
  static getDefaultConfig() {
    return {...ConfigManager.#defaultConfig}
  }
}
