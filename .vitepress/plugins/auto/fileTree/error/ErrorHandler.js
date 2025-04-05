import {FileTreeError} from './FileTreeError.js'

/**
 * @typedef {import('../types/index.js').TreeNode} TreeNode
 */

/**
 * 错误处理器类
 * 用于处理和格式化错误信息
 *
 * @class ErrorHandler
 */
export class ErrorHandler {
  /** @type {boolean} */
  #debug
  /** @type {Map<string, number>} */
  #errorCounts
  /** @type {Map<string, Error[]>} */
  #errorHistory
  /** @type {number} */
  #maxHistorySize = 100

  /**
   * 创建错误处理器实例
   * @param {boolean} [debug=false] - 是否启用调试模式
   */
  constructor(debug = false) {
    this.#debug = debug
    this.#errorCounts = new Map()
    this.#errorHistory = new Map()
  }

  /**
   * 创建错误
   * @param {string} message - 错误信息
   * @param {string} code - 错误代码
   * @param {Object} [details] - 错误详情
   * @returns {FileTreeError} 错误对象
   */
  createError(message, code, details = {}) {
    const error = new FileTreeError(message, code, details)
    this.#trackError(error)
    return error
  }

  /**
   * 处理错误
   * @param {Error} error - 错误对象
   * @param {string} context - 错误上下文
   */
  handleError(error, context) {
    if (this.#debug) {
      console.error(`[${context}] ${error.message}`)
      if (error.stack) {
        console.error(error.stack)
      }
    }

    // 更新错误计数
    const count = this.#errorCounts.get(error.code) || 0
    this.#errorCounts.set(error.code, count + 1)

    // 记录错误历史
    if (!this.#errorHistory.has(error.code)) {
      this.#errorHistory.set(error.code, [])
    }
    const history = this.#errorHistory.get(error.code)
    history.push(error)
    if (history.length > this.#maxHistorySize) {
      history.shift()
    }
  }

  /**
   * 跟踪错误
   * @param {FileTreeError} error - 错误对象
   * @private
   */
  #trackError(error) {
    const count = this.#errorCounts.get(error.code) || 0
    this.#errorCounts.set(error.code, count + 1)

    if (!this.#errorHistory.has(error.code)) {
      this.#errorHistory.set(error.code, [])
    }
    const history = this.#errorHistory.get(error.code)
    history.push(error)
    if (history.length > this.#maxHistorySize) {
      history.shift()
    }
  }

  /**
   * 获取错误统计
   * @returns {Object} 错误统计信息
   */
  getErrorStats() {
    return {
      counts: Object.fromEntries(this.#errorCounts),
      history: Object.fromEntries(this.#errorHistory),
    }
  }

  /**
   * 验证配置
   * @param {Object} config - 配置对象
   * @throws {FileTreeError} 如果配置无效
   */
  validateConfig(config) {
    if (!config) {
      throw this.createError('配置对象不能为空', 'INVALID_CONFIG')
    }

    if (!config.srcDir) {
      throw this.createError('源目录不能为空', 'INVALID_CONFIG')
    }
  }

  /**
   * 验证路径
   * @param {string} path - 路径
   * @throws {FileTreeError} 如果路径无效
   */
  validatePath(path) {
    if (!path) {
      throw this.createError('路径不能为空', 'INVALID_PATH')
    }

    if (typeof path !== 'string') {
      throw this.createError('路径必须是字符串', 'INVALID_PATH')
    }
  }

  /**
   * 验证排除规则
   * @param {Array<string|RegExp>} rules - 排除规则
   * @throws {FileTreeError} 如果规则无效
   */
  validateExclude(rules) {
    if (!Array.isArray(rules)) {
      throw this.createError('排除规则必须是数组', 'INVALID_RULES')
    }

    rules.forEach((rule, index) => {
      if (typeof rule !== 'string' && !(rule instanceof RegExp)) {
        throw this.createError(`排除规则必须是字符串或正则表达式: ${index}`, 'INVALID_RULE')
      }
    })
  }

  /**
   * 重置错误处理器
   */
  reset() {
    this.#errorCounts.clear()
    this.#errorHistory.clear()
  }
}
