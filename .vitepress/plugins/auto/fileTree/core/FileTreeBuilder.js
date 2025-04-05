import {ConfigManager} from '../config/ConfigManager.js'
import {ErrorHandler} from '../error/ErrorHandler.js'
import {FileScanner} from '../scanner/FileScanner.js'
import {StatsManager} from '../stats/StatsManager.js'

/**
 * @typedef {import('../types/index.js').FileTreeConfig} FileTreeConfig
 * @typedef {import('../types/index.js').TreeNode} TreeNode
 * @typedef {import('../types/index.js').Stats} Stats
 * @typedef {import('../types/index.js').ProgressCallback} ProgressCallback
 */

/**
 * 文件树构建器类
 * 用于构建文件树结构
 *
 * @class FileTreeBuilder
 */
export class FileTreeBuilder {
  /** @type {ConfigManager} */
  #configManager
  /** @type {FileScanner} */
  #scanner
  /** @type {StatsManager} */
  #statsManager
  /** @type {ErrorHandler} */
  #errorHandler
  /** @type {AbortController} */
  #abortController
  /** @type {boolean} */
  #isDestroyed = false
  /** @type {ProgressCallback} */
  #onProgress = null
  /** @type {number} */
  #startTime
  /** @type {boolean} */
  #isBuilding = false

  /**
   * 创建文件树构建器实例
   *
   * @param {Partial<FileTreeConfig>} [config] - 配置选项
   */
  constructor(config = {}) {
    this.#configManager = new ConfigManager(config)
    this.#statsManager = new StatsManager()
    this.#errorHandler = new ErrorHandler(this.#configManager.getConfig().debug)
    this.#abortController = new AbortController()
    this.#startTime = Date.now()
  }

  /**
   * 设置进度回调
   * @param {ProgressCallback} callback - 进度回调函数
   */
  onProgress(callback) {
    this.#onProgress = callback
  }

  /**
   * 构建文件树
   *
   * @returns {Promise<TreeNode[]>} 文件树根节点
   * @throws {Error} 如果构建器已被销毁或正在构建
   */
  async build() {
    if (this.#isDestroyed) {
      throw this.#errorHandler.createError('构建器已被销毁', 'BUILDER_DESTROYED')
    }

    if (this.#isBuilding) {
      throw this.#errorHandler.createError('构建器正在运行中', 'BUILDER_RUNNING')
    }

    this.#isBuilding = true

    try {
      const config = this.#configManager.getConfig()
      this.#scanner = new FileScanner(config, this.#abortController, this.#onProgress)
      this.#statsManager.setSrcDir(config.srcDir)

      // 启用性能优化
      if (config.concurrency) {
        this.#scanner.setConcurrency(config.concurrency)
      }

      // 检查内存使用
      this.#statsManager.checkMemoryUsage(config.memoryLimit)

      const root = await this.#scanner.scanDirectory(config.srcDir, config.exclude)
      const stats = this.#scanner.getStats()
      this.#statsManager.mergeStats(stats)

      if (config.debug) {
        console.log(this.#statsManager.getFormattedStats())
      }

      return root.children || []
    } catch (error) {
      if (error.name === 'AbortError') {
        throw this.#errorHandler.createError('操作已取消', 'OPERATION_CANCELLED')
      }
      throw this.#errorHandler.createError(error.message, 'BUILD_ERROR', {error})
    } finally {
      this.#isBuilding = false
    }
  }

  /**
   * 中止构建
   */
  abort() {
    this.#abortController.abort()
  }

  /**
   * 更新配置
   *
   * @param {Partial<FileTreeConfig>} config - 新配置
   * @throws {Error} 如果构建器已被销毁或正在构建
   */
  updateConfig(config) {
    if (this.#isDestroyed) {
      throw this.#errorHandler.createError('构建器已被销毁', 'BUILDER_DESTROYED')
    }

    if (this.#isBuilding) {
      throw this.#errorHandler.createError('构建器正在运行中', 'BUILDER_RUNNING')
    }

    this.#configManager.updateConfig(config)
    this.#errorHandler = new ErrorHandler(this.#configManager.getConfig().debug)
  }

  /**
   * 获取当前配置
   *
   * @returns {FileTreeConfig} 当前配置
   * @throws {Error} 如果构建器已被销毁
   */
  getConfig() {
    if (this.#isDestroyed) {
      throw this.#errorHandler.createError('构建器已被销毁', 'BUILDER_DESTROYED')
    }

    return this.#configManager.getConfig()
  }

  /**
   * 获取统计信息
   *
   * @returns {Stats} 统计信息
   * @throws {Error} 如果构建器已被销毁
   */
  getStats() {
    if (this.#isDestroyed) {
      throw this.#errorHandler.createError('构建器已被销毁', 'BUILDER_DESTROYED')
    }

    return this.#statsManager.getStats()
  }

  /**
   * 获取统计管理器
   * @returns {StatsManager} 统计管理器实例
   * @throws {Error} 如果构建器已被销毁
   */
  getStatsManager() {
    if (this.#isDestroyed) {
      throw this.#errorHandler.createError('构建器已被销毁', 'BUILDER_DESTROYED')
    }

    return this.#statsManager
  }

  /**
   * 销毁构建器
   * 清理所有资源
   */
  destroy() {
    if (this.#isDestroyed) return

    this.#abortController.abort()
    if (this.#scanner) {
      this.#scanner.destroy()
    }
    this.#statsManager.reset()
    this.#onProgress = null
    this.#isDestroyed = true
  }
}
