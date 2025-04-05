/**
 * 缓存管理器类
 * 用于统一管理文件树构建过程中的各种缓存
 */
export class CacheManager {
  /** @type {Map<string, any>} */
  #cache = new Map()
  /** @type {Map<string, number>} */
  #expiryTimes = new Map()
  /** @type {number} */
  #defaultTTL = 5 * 60 * 1000 // 默认5分钟过期
  /** @type {number} */
  #maxSize = 100 * 1024 * 1024 // 默认100MB最大缓存
  /** @type {number} */
  #currentSize = 0

  /**
   * 设置缓存
   * @param {string} key - 缓存键
   * @param {any} value - 缓存值
   * @param {number} [ttl] - 过期时间（毫秒）
   */
  set(key, value, ttl = this.#defaultTTL) {
    // 计算新值的大小
    const newSize = this.#calculateSize(key, value)

    // 如果新值太大，直接返回
    if (newSize > this.#maxSize) {
      return
    }

    // 清理过期和超大的缓存
    this.#cleanup(newSize)

    // 设置新值
    this.#cache.set(key, value)
    this.#expiryTimes.set(key, Date.now() + ttl)
    this.#currentSize += newSize
  }

  /**
   * 获取缓存
   * @param {string} key - 缓存键
   * @returns {any|null} 缓存值
   */
  get(key) {
    const value = this.#cache.get(key)
    if (!value) return null

    const expiryTime = this.#expiryTimes.get(key)
    if (Date.now() > expiryTime) {
      this.delete(key)
      return null
    }

    return value
  }

  /**
   * 删除缓存
   * @param {string} key - 缓存键
   */
  delete(key) {
    const value = this.#cache.get(key)
    if (value) {
      this.#currentSize -= this.#calculateSize(key, value)
    }
    this.#cache.delete(key)
    this.#expiryTimes.delete(key)
  }

  /**
   * 清空所有缓存
   */
  clear() {
    this.#cache.clear()
    this.#expiryTimes.clear()
    this.#currentSize = 0
  }

  /**
   * 获取缓存大小
   * @returns {number} 缓存大小（字节）
   */
  size() {
    return this.#currentSize
  }

  /**
   * 计算键值对的大小
   * @param {string} key - 缓存键
   * @param {any} value - 缓存值
   * @returns {number} 大小（字节）
   * @private
   */
  #calculateSize(key, value) {
    let size = 0
    // 计算键的大小
    size += Buffer.byteLength(key, 'utf8')
    // 计算值的大小
    if (typeof value === 'string') {
      size += Buffer.byteLength(value, 'utf8')
    } else {
      size += Buffer.byteLength(JSON.stringify(value), 'utf8')
    }
    return size
  }

  /**
   * 清理过期和超大的缓存
   * @param {number} newSize - 新值的大小
   * @private
   */
  #cleanup(newSize) {
    const now = Date.now()
    const entries = Array.from(this.#cache.entries())

    // 按过期时间排序
    entries.sort((a, b) => this.#expiryTimes.get(a[0]) - this.#expiryTimes.get(b[0]))

    // 清理过期和超大的缓存
    for (const [key, value] of entries) {
      if (now > this.#expiryTimes.get(key) || this.#currentSize + newSize > this.#maxSize) {
        this.delete(key)
      } else {
        break
      }
    }
  }
}
