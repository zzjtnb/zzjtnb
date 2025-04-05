import {FileTreeBuilder} from '../core/FileTreeBuilder.js'
import {formatBytes} from '../utils/FormatUtils.js'

/**
 * 高级使用示例
 * 展示 FileTreeBuilder 的高级功能和配置选项
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
      enableCompression: true, // 启用压缩
      compressionLevel: 6,
      enableIncremental: true, // 启用增量构建
      enableParallel: true,
      enableMemoryOptimization: true,

      // 错误处理
      enableErrorRecovery: true,
      retryCount: 3,
      retryDelay: 1000,

      // 文件监控
      enableWatch: true, // 启用文件监控
      watchDelay: 1000,

      // 性能分析
      enableProfiling: true, // 启用性能分析
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
    try {
      // 第一次构建
      console.log('第一次构建...')
      const tree1 = await builder.build()
      console.log('文件树:', tree1)

      // 获取统计信息
      const stats1 = builder.getStats()
      console.log('统计信息:', stats1)

      // 获取错误统计
      const errorStats1 = builder.getErrorStats()
      console.log('错误统计:', errorStats1)

      // 等待一段时间
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // 更新配置
      builder.updateConfig({
        enableCompression: false,
        enableIncremental: true,
        enableWatch: true,
      })

      // 第二次构建(增量构建)
      console.log('\n第二次构建(增量构建)...')
      const tree2 = await builder.build()
      console.log('文件树:', tree2)

      // 获取统计信息
      const stats2 = builder.getStats()
      console.log('统计信息:', stats2)

      // 获取错误统计
      const errorStats2 = builder.getErrorStats()
      console.log('错误统计:', errorStats2)

      // 等待一段时间
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // 中止构建
      console.log('\n中止构建...')
      builder.abort()

      // 等待一段时间
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // 第三次构建(恢复构建)
      console.log('\n第三次构建(恢复构建)...')
      const tree3 = await builder.build()
      console.log('文件树:', tree3)

      // 获取统计信息
      const stats3 = builder.getStats()
      console.log('统计信息:', stats3)

      // 获取错误统计
      const errorStats3 = builder.getErrorStats()
      console.log('错误统计:', errorStats3)
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
    }
  } catch (error) {
    if (error.code === 'OPERATION_CANCELLED') {
      console.log('操作已取消')
    } else {
      console.error('构建文件树失败:', error)
    }
  } finally {
    // 清理资源
    if (builder) {
      builder.destroy()
    }
  }
}

/**
 * 处理文件树
 * @param {TreeNode} node - 树节点
 * @returns {Promise<void>}
 */
async function processTree(node) {
  try {
    // 输出节点信息
    console.log(`\n处理${node.type === 'directory' ? '目录' : '文件'}: ${node.name}`)
    console.log(`路径: ${node.parent}/${node.name}`)

    // 输出文件统计信息
    if (node.type === 'file' && node.stats) {
      console.log('文件统计:')
      console.log(`  大小: ${formatBytes(node.stats.size)}`)
      console.log(`  修改时间: ${node.stats.mtime.toLocaleString()}`)
      console.log(`  创建时间: ${node.stats.ctime.toLocaleString()}`)
    }

    // 输出 frontmatter
    if (node.frontmatter) {
      console.log('Frontmatter:', JSON.stringify(node.frontmatter, null, 2))
    }

    // 递归处理子节点
    if (node.children?.length) {
      // 使用 Promise.all 并行处理子节点
      await Promise.all(node.children.map((child) => processTree(child)))
    }
  } catch (error) {
    console.error(`处理节点 ${node.name} 时出错:`, error)
    throw error
  }
}

main()
