/**
 * 文件树错误类
 * 用于处理文件树相关的错误
 *
 * @class FileTreeError
 * @extends {Error}
 */
export class FileTreeError extends Error {
  /**
   * 创建文件树错误实例
   *
   * @param {string} message - 错误消息
   * @param {string} code - 错误代码
   * @param {object} [details] - 错误详情
   */
  constructor(message, code, details = {}) {
    super(message)
    this.name = 'FileTreeError'
    this.code = code
    this.details = details
    Error.captureStackTrace(this, FileTreeError)
  }

  /**
   * 转换为JSON格式
   *
   * @returns {object} JSON对象
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      stack: this.stack,
    }
  }
}
