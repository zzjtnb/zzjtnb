/**
 * 格式化字节大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的字符串
 */
export function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`
}

/**
 * 格式化统计信息
 * @param {Object} stats - 统计信息
 * @returns {string} 格式化后的统计信息
 */
export function formatStats(stats) {
  const {files, dirs, errors, cacheHits, cacheMisses, processedDirs, totalSize, maxDepth, duration, cacheSize, cacheHitRate, memoryUsage, srcDir} = stats

  const lines = [
    '\n',
    '📊 文件树构建统计',
    '='.repeat(30),
    '',
    '📂 目录信息',
    `  源目录: ${srcDir}`,
    '',
    '📁 文件统计',
    `  文件总数: ${files}`,
    `  目录总数: ${dirs}`,
    `  处理目录: ${processedDirs}`,
    `  总大小: ${formatBytes(totalSize)}`,
    '',
    '⚡ 性能统计',
    `  最大深度: ${maxDepth}`,
    `  处理时间: ${duration}ms`,
    '',
    '💾 缓存统计',
    `  缓存大小: ${formatBytes(cacheSize)}`,
    `  缓存命中: ${cacheHits}`,
    `  缓存未命中: ${cacheMisses}`,
    `  命中率: ${cacheHitRate}`,
    '',
    '🧠 内存使用',
    `  堆内存: ${formatBytes(memoryUsage.heapUsed)}`,
    `  总内存: ${formatBytes(memoryUsage.heapTotal)}`,
    `  外部内存: ${formatBytes(memoryUsage.external)}`,
    '',
    '⚠️ 错误统计',
    `  错误数: ${errors}`,
    '',
    '='.repeat(50),
  ]

  return lines.join('\n')
}
