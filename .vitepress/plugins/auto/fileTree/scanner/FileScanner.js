import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import {StatsManager} from '../stats/StatsManager.js'
import {PathUtils} from '../utils/PathUtils.js'
import {CacheManager} from '../utils/CacheManager.js'
import {formatBytes} from '../utils/FormatUtils.js'
import {ErrorHandler} from '../error/ErrorHandler.js'
import crypto from 'node:crypto'

/**
 * @typedef {import('../types/index.js').FileTreeConfig} FileTreeConfig
 * @typedef {import('../types/index.js').TreeNode} TreeNode
 * @typedef {import('../types/index.js').ProgressCallback} ProgressCallback
 */

const MAX_RETRIES = 3
const RETRY_DELAY = 1000
const DEFAULT_BATCH_SIZE = 50 // 默认批处理大小
const STREAM_CHUNK_SIZE = 1024 * 1024 // 1MB 流式读取块大小

/**
 * 文件扫描器类
 * 负责扫描目录和文件,构建文件树结构
 *
 * @class FileScanner
 */
export class FileScanner {
  /** @type {FileTreeConfig} */
  #config
  /** @type {AbortController} */
  #abortController
  /** @type {CacheManager} */
  #cache
  /** @type {StatsManager} */
  #statsManager
  /** @type {ErrorHandler} */
  #errorHandler
  /** @type {number} */
  #startTime
  /** @type {number} */
  #batchSize = DEFAULT_BATCH_SIZE
  /** @type {ProgressCallback} */
  #onProgress = null

  /**
   * 创建文件扫描器实例
   *
   * @param {FileTreeConfig} config - 配置选项
   * @param {AbortController} abortController - 中止控制器
   * @param {ProgressCallback} [onProgress] - 进度回调
   */
  constructor(config, abortController, onProgress) {
    this.#config = config
    this.#abortController = abortController
    this.#statsManager = new StatsManager()
    this.#cache = new CacheManager()
    this.#errorHandler = new ErrorHandler(config.debug)
    this.#startTime = Date.now()
    this.#statsManager.setSrcDir(path.resolve(config.srcDir))
    this.#onProgress = onProgress
  }

  /**
   * 设置并发数
   * @param {number} concurrency - 并发数
   */
  setConcurrency(concurrency) {
    this.#batchSize = Math.max(1, Math.min(concurrency, 100))
  }

  /**
   * 更新进度
   * @param {string} currentItem - 当前处理的项
   * @param {number} depth - 当前深度
   * @private
   */
  #updateProgress(currentItem, depth) {
    if (this.#onProgress) {
      const stats = this.#statsManager.getStats()
      this.#onProgress({
        currentItem,
        processedFiles: stats.files,
        processedDirs: stats.processedDirs,
        currentDepth: depth,
        totalSize: stats.totalSize,
        elapsedTime: Date.now() - this.#startTime,
      })
    }
  }

  /**
   * 扫描目录
   * 递归扫描目录及其子目录,构建文件树结构
   *
   * @param {string} currentPath - 当前目录路径
   * @param {string[]} exclude - 排除规则
   * @param {number} depth - 当前递归深度
   * @returns {Promise<TreeNode>} 目录节点
   */
  async scanDirectory(currentPath, exclude, depth = 0) {
    try {
      this.#statsManager.update('dirs')
      this.#statsManager.updateDepth(depth)
      this.#updateProgress(currentPath, depth)

      if (depth > this.#config.maxDepth) {
        throw this.#errorHandler.createError(`目录 ${currentPath} 超过最大递归深度 ${this.#config.maxDepth}`, 'MAX_DEPTH_EXCEEDED', {currentPath, maxDepth: this.#config.maxDepth})
      }

      const entries = await this.#retryOperation(() =>
        fs.readdir(currentPath, {
          withFileTypes: true,
          signal: this.#abortController.signal,
        })
      )

      const filteredEntries = entries.filter((entry) => !this.#shouldExclude(path.join(currentPath, entry.name), exclude))

      const children = await this.#scanInBatches(filteredEntries, (entry) =>
        entry.isDirectory() ? this.scanDirectory(path.join(currentPath, entry.name), exclude, depth + 1) : this.#scanFile(entry, currentPath)
      )

      const node = {
        type: 'directory',
        name: path.basename(currentPath),
        parent: PathUtils.getRelativePath(currentPath, this.#config.srcDir),
        children: children.filter(Boolean),
      }

      this.#statsManager.update('processedDirs')
      return node
    } catch (error) {
      if (error.name === 'AbortError') throw error
      return this.#handleError(`目录 ${currentPath}`, error)
    }
  }

  /**
   * 批量扫描处理
   * @param {fs.Dirent[]} entries - 待处理的条目
   * @param {Function} processor - 处理函数
   * @returns {Promise<TreeNode[]>} 处理结果
   * @private
   */
  async #scanInBatches(entries, processor) {
    const results = []
    const errors = []

    for (let i = 0; i < entries.length; i += this.#batchSize) {
      const batch = entries.slice(i, i + this.#batchSize)

      // 检查内存使用
      this.#statsManager.checkMemoryUsage(this.#config.memoryLimit)

      try {
        const batchResults = await Promise.allSettled(batch.map((entry) => processor(entry)))

        // 处理成功的结果
        const validResults = batchResults
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value)
          .filter(Boolean)

        results.push(...validResults)

        // 收集失败的结果
        const failedResults = batchResults.filter((result) => result.status === 'rejected')
        if (failedResults.length > 0) {
          this.#statsManager.update('errors', failedResults.length)
          failedResults.forEach((result) => {
            errors.push(result.reason)
            const error = this.#errorHandler.createError('批处理失败', 'BATCH_PROCESSING_ERROR', {error: result.reason})
            this.#errorHandler.handleError(error, '批处理')
          })
        }
      } catch (error) {
        this.#statsManager.update('errors')
        errors.push(error)
        const wrappedError = this.#errorHandler.createError('批处理失败', 'BATCH_PROCESSING_ERROR', {error})
        this.#errorHandler.handleError(wrappedError, '批处理')
      }
    }

    // 如果有错误，抛出第一个错误
    if (errors.length > 0) {
      throw errors[0]
    }

    return results
  }

  /**
   * 扫描文件
   * @param {fs.Dirent} entry - 文件入口
   * @param {string} parentPath - 父目录路径
   * @returns {Promise<TreeNode|null>} 文件节点
   * @private
   */
  async #scanFile(entry, parentPath) {
    const fullPath = path.join(parentPath, entry.name)

    if (!this.#isMarkdownFile(entry)) {
      return null
    }

    try {
      // 检查缓存
      const cacheKey = `file:${fullPath}`
      const cachedNode = this.#cache.get(cacheKey)
      if (cachedNode) {
        this.#statsManager.update('cacheHits')
        return cachedNode
      }

      const stats = await this.#retryOperation(() => fs.stat(fullPath))

      if (stats.size > this.#config.maxFileSize) {
        throw new Error(`文件 ${entry.name} 大小 ${formatBytes(stats.size)} 超过限制 ${formatBytes(this.#config.maxFileSize)}`)
      }

      // 使用流式读取大文件
      let content = await this.#readFileContent(fullPath)
      const {data: frontmatter} = this.#parseFrontmatter(content)
      content = null // 释放内存

      // 更新文件数量和总大小
      this.#statsManager.update('files')
      this.#statsManager.update('totalSize', stats.size)

      const node = {
        type: 'file',
        name: entry.name,
        parent: PathUtils.getRelativePath(parentPath, this.#config.srcDir),
        frontmatter,
        stats: {
          size: stats.size,
          mtime: stats.mtime,
          ctime: stats.ctime,
        },
      }

      // 缓存结果
      this.#cache.set(cacheKey, node)
      this.#statsManager.update('cacheMisses')

      return node
    } catch (error) {
      return this.#handleError(`文件 ${entry.name}`, error)
    }
  }

  /**
   * 读取文件内容
   * @param {string} filePath - 文件路径
   * @returns {Promise<string>} 文件内容
   * @private
   */
  async #readFileContent(filePath) {
    const stats = await fs.stat(filePath)
    if (stats.size > STREAM_CHUNK_SIZE) {
      // 大文件使用流式读取
      const chunks = []
      const stream = fs.createReadStream(filePath, {encoding: 'utf8'})
      for await (const chunk of stream) {
        chunks.push(chunk)
        // 检查内存使用
        this.#statsManager.checkMemoryUsage(this.#config.memoryLimit)
      }
      return chunks.join('')
    }
    return fs.readFile(filePath, 'utf-8')
  }

  /**
   * 解析 Frontmatter
   * @param {string} content - 文件内容
   * @returns {any} 解析结果
   * @private
   */
  #parseFrontmatter(content) {
    // 使用内容的哈希作为缓存键
    const hash = crypto.createHash('md5').update(content).digest('hex')
    const cacheKey = `frontmatter:${hash}`
    const cached = this.#cache.get(cacheKey)
    if (cached) return cached

    const result = matter(content)
    this.#cache.set(cacheKey, result)
    return result
  }

  /**
   * 重试操作
   * @param {Function} operation - 要重试的操作
   * @returns {Promise<any>} 操作结果
   * @private
   */
  async #retryOperation(operation) {
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        return await operation()
      } catch (error) {
        if (i === MAX_RETRIES - 1) throw error
        // 使用指数退避策略
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * Math.pow(2, i)))
      }
    }
  }

  /**
   * 处理错误
   * @param {string} context - 错误上下文
   * @param {Error} error - 错误对象
   * @returns {TreeNode} 错误节点
   * @private
   */
  #handleError(context, error) {
    this.#statsManager.update('errors')

    // 创建错误节点
    const errorNode = {
      type: 'file',
      name: context,
      parent: '',
      error: error.message,
      stats: {
        size: 0,
        mtime: new Date(),
        ctime: new Date(),
      },
    }

    // 记录错误
    const wrappedError = this.#errorHandler.createError(`处理 ${context} 时出错`, 'PROCESSING_ERROR', {error, context})
    this.#errorHandler.handleError(wrappedError, context)

    return errorNode
  }

  /**
   * 判断是否为 Markdown 文件
   * @param {fs.Dirent} entry - 文件入口
   * @returns {boolean} 是否为 Markdown 文件
   * @private
   */
  #isMarkdownFile(entry) {
    return entry.isFile() && entry.name.endsWith('.md')
  }

  /**
   * 判断是否应该排除
   * @param {string} path - 文件路径
   * @param {string[]} exclude - 排除规则
   * @returns {boolean} 是否应该排除
   * @private
   */
  #shouldExclude(path, exclude) {
    return exclude.some((pattern) => {
      if (pattern instanceof RegExp) {
        return pattern.test(path)
      }
      return path.includes(pattern)
    })
  }

  /**
   * 获取统计信息
   * @returns {Object} 统计信息
   */
  getStats() {
    // 更新缓存大小
    this.#statsManager.updateCacheSize(this.#cache.size())
    return this.#statsManager.getStats()
  }

  /**
   * 销毁扫描器
   * 清理所有资源
   */
  destroy() {
    // 中止所有操作
    this.#abortController.abort()

    // 清理缓存
    this.#cache.clear()

    // 重置统计信息
    this.#statsManager.reset()

    // 清理进度回调
    this.#onProgress = null

    // 清理配置
    this.#config = null

    // 清理错误处理器
    this.#errorHandler = null
  }
}
