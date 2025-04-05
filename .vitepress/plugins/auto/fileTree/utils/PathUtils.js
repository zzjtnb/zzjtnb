import path from 'node:path'

/**
 * 路径工具类
 * 用于处理文件路径相关的操作
 *
 * @class PathUtils
 */
export class PathUtils {
  /**
   * 获取相对路径
   *
   * @param {string} targetPath - 目标路径
   * @param {string} basePath - 基准路径
   * @returns {string} 相对路径
   */
  static getRelativePath(targetPath, basePath) {
    return path.relative(basePath, targetPath)
  }

  /**
   * 规范化路径
   *
   * @param {string} filePath - 文件路径
   * @returns {string} 规范化后的路径
   */
  static normalizePath(filePath) {
    return path.normalize(filePath).replace(/\\/g, '/')
  }

  /**
   * 检查路径是否在指定目录下
   *
   * @param {string} filePath - 文件路径
   * @param {string} baseDir - 基准目录
   * @returns {boolean} 是否在目录下
   */
  static isUnderDir(filePath, baseDir) {
    const normalizedPath = this.normalizePath(path.resolve(filePath))
    const normalizedBase = this.normalizePath(path.resolve(baseDir))
    return normalizedPath.startsWith(normalizedBase)
  }

  /**
   * 获取文件扩展名
   *
   * @param {string} filePath - 文件路径
   * @returns {string} 文件扩展名
   */
  static getExtname(filePath) {
    return path.extname(filePath).toLowerCase()
  }

  /**
   * 获取文件名(不含扩展名)
   *
   * @param {string} filePath - 文件路径
   * @returns {string} 文件名
   */
  static getBasename(filePath) {
    return path.basename(filePath, path.extname(filePath))
  }

  /**
   * 获取父目录路径
   *
   * @param {string} filePath - 文件路径
   * @returns {string} 父目录路径
   */
  static getDirname(filePath) {
    return path.dirname(filePath)
  }

  /**
   * 合并路径
   *
   * @param {...string} paths - 路径片段
   * @returns {string} 合并后的路径
   */
  static join(...paths) {
    return path.join(...paths)
  }

  /**
   * 解析路径
   *
   * @param {string} filePath - 文件路径
   * @returns {object} 路径对象
   */
  static parse(filePath) {
    return path.parse(filePath)
  }
}
