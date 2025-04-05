import {formatBytes, formatStats} from '../utils/FormatUtils.js'
import path from 'node:path'

/**
 * @typedef {import('../types/index.js').TreeNode} TreeNode
 */

/**
 * 统计管理器类
 * 用于收集和管理文件树构建过程中的各种统计信息
 *
 * @class StatsManager
 */
export class StatsManager {
  /** @type {string} */
  #srcDir
  /** @type {Record<string, number>} */
  #stats
  /** @type {number} */
  #startTime
  /** @type {number} */
  #maxDepth
  /** @type {number} */
  #memoryLimit
  /** @type {number} */
  #lastMemoryCheck
  /** @type {number} */
  #memoryCheckInterval = 1000 // 1秒检查一次内存

  constructor() {
    this.#stats = {
      files: 0,
      dirs: 0,
      errors: 0,
      cacheHits: 0,
      cacheMisses: 0,
      processedDirs: 0,
      totalSize: 0,
      cacheSize: 0,
      maxDepth: 0,
      memoryUsage: 0,
      processingTime: 0,
    }
    this.#startTime = Date.now()
    this.#maxDepth = 0
    this.#memoryLimit = 1024 // 默认1GB
    this.#lastMemoryCheck = 0
  }

  /**
   * 设置源目录
   * @param {string} srcDir - 源目录路径
   */
  setSrcDir(srcDir) {
    this.#srcDir = path.resolve(srcDir)
  }

  /**
   * 更新统计信息
   * @param {string} key - 统计项键名
   * @param {number} [value] - 统计值
   */
  update(key, value = 1) {
    if (key === 'totalSize') {
      // 总大小累加
      this.#stats[key] += value
    } else if (key in this.#stats) {
      this.#stats[key] += value
    }

    // 更新处理时间
    this.#stats.processingTime = Date.now() - this.#startTime
  }

  /**
   * 更新缓存大小
   * @param {number} size - 缓存大小
   */
  updateCacheSize(size) {
    this.#stats.cacheSize = size
  }

  /**
   * 更新深度
   * @param {number} depth - 当前深度
   */
  updateDepth(depth) {
    this.#maxDepth = Math.max(this.#maxDepth, depth)
    this.#stats.maxDepth = this.#maxDepth
  }

  /**
   * 检查内存使用
   * @param {number} [limit] - 内存限制(MB)
   */
  checkMemoryUsage(limit) {
    if (limit) this.#memoryLimit = limit

    const now = Date.now()
    if (now - this.#lastMemoryCheck < this.#memoryCheckInterval) {
      return
    }

    const usage = process.memoryUsage()
    this.#stats.memoryUsage = usage.heapUsed

    if (usage.heapUsed > this.#memoryLimit * 1024 * 1024) {
      throw new Error(`内存使用超过限制 ${this.#memoryLimit}MB`)
    }

    this.#lastMemoryCheck = now
  }

  /**
   * 合并统计信息
   * @param {Record<string, number>} stats - 要合并的统计信息
   */
  mergeStats(stats) {
    Object.entries(stats).forEach(([key, value]) => {
      if (key === 'totalSize') {
        // totalSize 累加
        this.#stats[key] += value
      } else if (key in this.#stats) {
        this.#stats[key] += value
      }
    })
  }

  /**
   * 获取统计信息
   * @returns {Object} 统计信息
   */
  getStats() {
    const duration = Date.now() - this.#startTime
    const cacheHitRate =
      this.#stats.cacheHits + this.#stats.cacheMisses > 0 ? `${((this.#stats.cacheHits / (this.#stats.cacheHits + this.#stats.cacheMisses)) * 100).toFixed(2)}%` : '0%'

    return {
      ...this.#stats,
      duration,
      cacheHitRate,
      memoryUsage: process.memoryUsage(),
      srcDir: this.#srcDir,
    }
  }

  /**
   * 获取格式化的统计信息
   * @returns {string} 格式化的统计信息
   */
  getFormattedStats() {
    return formatStats(this.getStats())
  }

  /**
   * 重置统计信息
   */
  reset() {
    this.#stats = {
      files: 0,
      dirs: 0,
      errors: 0,
      cacheHits: 0,
      cacheMisses: 0,
      processedDirs: 0,
      totalSize: 0,
      cacheSize: 0,
      maxDepth: 0,
      memoryUsage: 0,
      processingTime: 0,
    }
    this.#startTime = Date.now()
    this.#maxDepth = 0
    this.#lastMemoryCheck = 0
  }
}
