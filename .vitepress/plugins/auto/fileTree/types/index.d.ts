/**
 * 节点类型
 */
export type NodeType = 'file' | 'directory'

/**
 * 文件统计信息
 */
export interface FileStats {
  /** 文件大小 */
  size: number
  /** 修改时间 */
  mtime: Date
  /** 创建时间 */
  ctime: Date
}

/**
 * 树节点结构
 */
export interface TreeNode {
  /** 节点类型 */
  type: NodeType
  /** 文件或目录名 */
  name: string
  /** 父目录路径 */
  parent: string
  /** markdown文件的frontmatter */
  frontmatter?: Record<string, any>
  /** 子节点(仅目录类型) */
  children?: TreeNode[]
  /** 错误信息 */
  error?: string
  /** 文件统计信息 */
  stats?: FileStats
}

/**
 * 文件树配置接口
 */
export interface FileTreeConfig {
  /** 源目录 */
  srcDir: string
  /** 最大递归深度 */
  maxDepth: number
  /** 最大文件大小 */
  maxFileSize: number
  /** 内存限制 */
  memoryLimit: number
  /** 是否启用调试模式 */
  debug: boolean
  /** 是否启用缓存 */
  enableCache: boolean
  /** 缓存过期时间 */
  cacheTTL: number
  /** 排除规则 */
  exclude: Array<string | RegExp>
  /** 包含规则 */
  include: Array<string | RegExp>
  /** 并发数 */
  concurrency: number
  /** 批处理大小 */
  batchSize: number
  /** 是否启用流式处理 */
  enableStreaming: boolean
  /** 是否启用压缩 */
  enableCompression: boolean
  /** 压缩级别 */
  compressionLevel: number
  /** 是否启用增量构建 */
  enableIncremental: boolean
  /** 是否启用并行处理 */
  enableParallel: boolean
  /** 是否启用内存优化 */
  enableMemoryOptimization: boolean
  /** 是否启用错误恢复 */
  enableErrorRecovery: boolean
  /** 重试次数 */
  retryCount: number
  /** 重试延迟 */
  retryDelay: number
  /** 是否启用文件监控 */
  enableWatch: boolean
  /** 文件监控延迟 */
  watchDelay: number
  /** 是否启用性能分析 */
  enableProfiling: boolean
  /** 性能分析采样率 */
  profilingSampleRate: number
}

/**
 * 文件树错误类
 */
export class FileTreeError extends Error {
  /** 错误代码 */
  code: string
  /** 错误详情 */
  details: Record<string, any>
  /** 错误时间戳 */
  timestamp: string

  constructor(message: string, code: string, details?: Record<string, any>)
}

/**
 * 统计信息接口
 */
export interface Stats {
  /** 文件总数 */
  files: number
  /** 目录总数 */
  dirs: number
  /** 已处理目录数 */
  processedDirs: number
  /** 错误数 */
  errors: number
  /** 缓存命中数 */
  cacheHits: number
  /** 缓存未命中数 */
  cacheMisses: number
  /** 缓存大小 */
  cacheSize: number
  /** 总大小 */
  totalSize: number
  /** 最大深度 */
  maxDepth: number
  /** 处理时间 */
  elapsedTime: number
}

/**
 * 统计管理器类
 */
export interface StatsManager {
  /** 设置源目录 */
  setSrcDir(srcDir: string): void
  /** 更新统计信息 */
  update(key: string, value?: number): void
  /** 更新缓存大小 */
  updateCacheSize(size: number): void
  /** 更新深度 */
  updateDepth(depth: number): void
  /** 检查内存使用 */
  checkMemoryUsage(limit?: number): void
  /** 合并统计信息 */
  mergeStats(stats: Partial<Stats>): void
  /** 获取统计信息 */
  getStats(): Stats
  /** 获取格式化的统计信息 */
  getFormattedStats(): string
  /** 重置统计信息 */
  reset(): void
}

/**
 * 进度回调接口
 */
export interface ProgressCallback {
  /** 当前处理的项 */
  currentItem: string
  /** 已处理文件数 */
  processedFiles: number
  /** 已处理目录数 */
  processedDirs: number
  /** 当前深度 */
  currentDepth: number
  /** 总大小 */
  totalSize: number
  /** 耗时 */
  elapsedTime: number
}

/**
 * 文件树构建器类
 */
export declare class FileTreeBuilder {
  constructor(options?: Partial<FileTreeConfig>)

  /** 设置进度回调 */
  onProgress(callback: ProgressCallback): void

  /** 构建文件树 */
  build(): Promise<TreeNode[]>

  /** 取消操作 */
  abort(): void

  /** 更新配置 */
  updateConfig(config: Partial<FileTreeConfig>): void

  /** 获取当前配置 */
  getConfig(): FileTreeConfig

  /** 获取统计信息 */
  getStats(): Stats

  /** 获取统计管理器 */
  getStatsManager(): StatsManager

  /** 销毁构建器 */
  destroy(): void
}
