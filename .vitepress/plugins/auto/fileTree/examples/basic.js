import {FileTreeBuilder} from '../core/FileTreeBuilder.js'

/**
 * 基础使用示例
 * 展示如何使用 FileTreeBuilder 构建文件树
 */
async function main() {
  let builder = null

  try {
    // 创建构建器实例
    builder = new FileTreeBuilder({
      // 基本配置
      srcDir: './docs',
      maxDepth: 10,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      memoryLimit: 1024, // 1GB
      debug: true,

      // 缓存配置
      enableCache: true,
      cacheTTL: 5 * 60 * 1000, // 5分钟

      // 过滤规则
      exclude: ['node_modules', '.git', '.vscode', '.idea', '.DS_Store', /\.temp\./, /\.cache\./, /\.log$/, /\.tmp$/, /\.bak$/],
      include: [],

      // 性能优化
      concurrency: 50,
      batchSize: 50,
      enableStreaming: true,
      enableCompression: false,
      compressionLevel: 6,
      enableIncremental: false,
      enableParallel: true,
      enableMemoryOptimization: true,

      // 错误处理
      enableErrorRecovery: true,
      retryCount: 3,
      retryDelay: 1000,

      // 文件监控
      enableWatch: false,
      watchDelay: 1000,

      // 性能分析
      enableProfiling: false,
      profilingSampleRate: 0.1,
    })

    // 设置进度回调
    builder.onProgress((info) => {
      console.log(`当前处理: ${info.currentItem}`)
      console.log(`已处理文件: ${info.processedFiles}`)
      console.log(`已处理目录: ${info.processedDirs}`)
      console.log(`当前深度: ${info.currentDepth}`)
      console.log(`总大小: ${info.totalSize}`)
      console.log(`耗时: ${info.elapsedTime}ms`)
    })

    // 构建文件树
    const tree = await builder.build()
    console.log('文件树:', tree)

    // 获取统计信息
    const stats = builder.getStats()
    console.log('统计信息:', stats)

    // 获取错误统计
    const errorStats = builder.getErrorStats()
    console.log('错误统计:', errorStats)

    // 演示配置更新
    builder.updateConfig({
      maxDepth: 5,
      exclude: [...builder.getConfig().exclude, 'dist'],
    })

    // 演示中止操作
    const abortExample = async () => {
      const abortBuilder = new FileTreeBuilder({
        srcDir: './large-docs',
        maxDepth: 20,
        // 添加完整的排除规则
        exclude: ['node_modules', '.git', '.vscode', '.idea', '.DS_Store', /\.temp\./, /\.cache\./, /\.log$/, /\.tmp$/, /\.bak$/],
        // 添加其他必要的配置
        maxFileSize: 10 * 1024 * 1024,
        memoryLimit: 1024,
        enableCache: true,
        cacheTTL: 5 * 60 * 1000,
      })

      // 启动构建
      const buildPromise = abortBuilder.build()

      // 3秒后中止
      const timeoutId = setTimeout(() => {
        console.log('正在中止操作...')
        abortBuilder.abort()
      }, 3000)

      try {
        await buildPromise
      } catch (error) {
        if (error.code === 'OPERATION_CANCELLED') {
          console.log('构建已成功中止')
        } else {
          console.error('构建过程中发生错误:', error)
        }
      } finally {
        clearTimeout(timeoutId)
        abortBuilder.destroy()
      }
    }

    // 运行中止示例
    await abortExample()
  } catch (error) {
    if (error.code === 'BUILDER_DESTROYED') {
      console.error('构建器已被销毁')
    } else if (error.code === 'BUILDER_RUNNING') {
      console.error('构建器正在运行中')
    } else if (error.code === 'OPERATION_CANCELLED') {
      console.error('操作已取消')
    } else if (error.code === 'BUILD_ERROR') {
      console.error('构建错误:', error.message)
    }
  } finally {
    // 清理资源
    if (builder) {
      builder.destroy()
    }
  }
}

main()
