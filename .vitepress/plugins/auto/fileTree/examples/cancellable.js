import {FileTreeBuilder} from '../index.js'

/**
 * 可取消操作示例
 * 展示如何使用 FileTreeBuilder 的可取消功能
 */
async function main() {
  let builder = null
  let timeoutId = null

  try {
    // 创建构建器实例
    builder = new FileTreeBuilder({
      // 调试模式
      debug: true,
      // 源目录
      srcDir: './docs',
      // 排除规则
      exclude: ['node_modules', '.git', '.vscode', '.idea', '.DS_Store', /\.temp\./, /\.cache\./, /\.log$/, /\.tmp$/, /\.bak$/],
      // 最大递归深度
      maxDepth: 10,
      // 最大文件大小
      maxFileSize: 10 * 1024 * 1024, // 10MB
      // 内存限制
      memoryLimit: 1024, // 1GB
      // 启用缓存
      enableCache: true,
      // 缓存过期时间
      cacheTTL: 5 * 60 * 1000, // 5分钟
    })

    // 5秒后取消操作
    timeoutId = setTimeout(() => {
      console.log('正在取消操作...')
      builder.abort()
    }, 5000)

    // 构建文件树
    const tree = await builder.build()

    // 输出结果
    console.log('文件树:', JSON.stringify(tree, null, 2))
  } catch (error) {
    if (error.code === 'OPERATION_CANCELLED') {
      console.log('操作已成功取消')
    } else if (error.code === 'BUILD_ERROR') {
      console.error('构建过程中发生错误:', error.message)
    } else {
      console.error('发生未知错误:', error)
    }
  } finally {
    // 清理资源
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    if (builder) {
      builder.destroy()
    }
  }
}

main()
