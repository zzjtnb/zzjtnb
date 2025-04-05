/**
 * 高级使用示例
 * 展示如何使用 VitePressGenerator 类的高级功能
 *
 * 本示例演示:
 * 1. 自定义文件树构建器 - 配置灵活的文件系统扫描方式
 * 2. 手动创建生成器实例 - 直接使用VitePressGenerator类
 * 3. 性能监控工具 - 跟踪并分析代码执行性能
 * 4. 高级过滤与元数据 - 处理特定文件类型与提取Frontmatter
 * 5. 完整配置选项 - 使用所有可用的自定义选项
 *
 * 使用场景:
 * - 大型文档项目 - 需要精细控制扫描范围和性能
 * - 复杂站点结构 - 需要自定义文件过滤和处理规则
 * - 深度定制需求 - 需要控制生成器的每个细节
 * - 性能优化 - 需要分析和监控生成过程
 *
 * 使用方法:
 * 1. 将此文件放在您的项目中
 * 2. 执行 `node advanced.js`
 * 3. 查看生成的配置和性能报告
 */
import fs from 'node:fs'
import {FileTreeBuilder} from '../../fileTree/index.js'
import {performanceMonitor, VitePressGenerator} from '../index.js'

/**
 * 高级示例主函数
 * 演示生成器的高级功能和配置选项
 */
async function main() {
  // 启用性能监控 - 跟踪代码执行时间
  performanceMonitor.enable()

  try {
    console.log('开始高级配置生成...')

    // ---------------------- 自定义文件树构建器 ----------------------
    /**
     * 创建自定义文件树构建器
     * FileTreeBuilder负责扫描文件系统并构建初始文件树
     *
     * 配置详解:
     * - srcDir: 源文件目录，指定文档根目录
     * - maxDepth: 最大扫描深度，防止过深的目录结构
     * - exclude: 排除模式，可使用字符串或正则表达式
     * - include: 包含模式，只处理匹配的文件
     * - concurrency: 并发处理数量，提高性能
     * - enableCache: 启用缓存，加速重复构建
     * - metadataParser: 自定义元数据解析器，提取frontmatter
     */
    const fileTreeBuilder = new FileTreeBuilder({
      // 基本配置
      srcDir: './docs', // 源文件目录
      maxDepth: 5, // 最大深度限制

      // 文件过滤配置
      exclude: [
        // 排除的文件和目录
        'node_modules',
        '.git',
        '.vscode',
        '.DS_Store',
        '.temp',
        '.cache',
        /\.bak$/,
        /\.log$/,
        /\.zip$/,
        /\.tmp$/, // 支持正则表达式
      ],
      include: [/\.md$/, /\.mdx$/], // 仅包含markdown文件

      // 性能相关配置
      concurrency: 10, // 并发处理数量
      enableCache: true, // 启用缓存
      enableParallel: true, // 启用并行处理

      // 自定义元数据处理器 - 从文件内容中提取frontmatter
      metadataParser: (filePath, content) => {
        // 简单的frontmatter解析示例 (仅演示用途)
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
        if (frontmatterMatch && frontmatterMatch[1]) {
          try {
            // 解析YAML格式的frontmatter
            const lines = frontmatterMatch[1].split('\n')
            const metadata = {}

            for (const line of lines) {
              const [key, ...valueParts] = line.split(':')
              if (key && valueParts.length) {
                const value = valueParts.join(':').trim()
                metadata[key.trim()] = value
              }
            }

            return metadata
          } catch (error) {
            console.warn(`解析文件元数据失败: ${filePath}`, error)
            return {}
          }
        }
        return {}
      },
    })

    // ---------------------- 创建VitePress配置生成器 ----------------------
    /**
     * 创建VitePress配置生成器实例
     * 通过直接使用VitePressGenerator类可以获得更多的控制权
     *
     * 完整的配置选项:
     * - debug: 启用调试模式和性能监控
     * - nav: 导航栏显示配置
     * - sidebar: 侧边栏显示配置
     * - sorting: 排序规则配置
     */
    const generator = new VitePressGenerator(
      {
        // 调试模式 - 输出详细日志
        debug: true,

        // 导航栏高级配置
        nav: {
          dropdown: true, // 使用下拉菜单形式
          showIcon: true, // 显示图标
          filePrefix: '📑', // 自定义文件图标
          dirPrefix: '📁', // 自定义目录图标
        },

        // 侧边栏高级配置
        sidebar: {
          collapsed: false, // 默认展开所有节点
          showIcon: true, // 显示图标
          filePrefix: '📄', // 自定义文件图标
          dirPrefix: '📂', // 自定义目录图标
        },

        // 排序配置 - 多阶段排序算法
        sorting: {
          // 排序优先级权重
          order: {
            index: 0, // index.md文件最高优先级
            guide: 1, // guide.md文件次高优先级
            custom: 2, // 自定义规则优先级
            directory: 3, // 目录优先级
            file: 4, // 普通文件优先级
          },
          // 文件优先级列表 - 按数组顺序排序
          priority: [
            'README.md', // 项目说明排在最前
            'getting-started.md', // 入门指南次之
            'installation.md', // 安装说明第三
            'CHANGELOG.md', // 更新日志第四
          ],
        },
      },
      fileTreeBuilder // 传入自定义的文件树构建器
    )

    // ---------------------- 生成配置 ----------------------
    console.log('正在生成配置...')

    // 使用生成器实例执行生成过程
    const {nav, sidebar, fileTree} = await generator.generate()

    console.log('生成完成')

    // ---------------------- 输出结果 ----------------------
    // 创建输出目录
    const outputDir = './vitepress-advanced-output'
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {recursive: true})
    }

    // 保存导航栏配置
    fs.writeFileSync(
      `${outputDir}/nav.js`,
      `/**
 * 高级配置 - 自动生成的导航栏配置
 * 由VitePress配置生成器创建
 * 生成时间: ${new Date().toLocaleString()}
 */
export default ${JSON.stringify(nav, null, 2)}
`
    )

    // 保存侧边栏配置
    fs.writeFileSync(
      `${outputDir}/sidebar.js`,
      `/**
 * 高级配置 - 自动生成的侧边栏配置
 * 由VitePress配置生成器创建
 * 生成时间: ${new Date().toLocaleString()}
 */
export default ${JSON.stringify(sidebar, null, 2)}
`
    )

    // 保存文件树结构(用于调试和分析)
    fs.writeFileSync(`${outputDir}/fileTree.json`, JSON.stringify(fileTree, null, 2))

    // ---------------------- 性能分析 ----------------------
    // 获取性能报告
    const performanceReport = performanceMonitor.getFormattedReport()

    // 保存性能报告
    fs.writeFileSync(
      `${outputDir}/performance-report.txt`,
      `# VitePress配置生成器性能报告
生成时间: ${new Date().toLocaleString()}
配置选项: 高级模式, 自定义文件树构建器

${performanceReport}

## 文件统计
- 导航项数量: ${nav.length}
- 侧边栏区块数: ${Object.keys(sidebar).length}
- 文件树节点数: ${countNodes(fileTree)}
`
    )

    console.log(`配置已保存到 ${outputDir} 目录`)
    console.log(`生成了 ${nav.length} 个导航项和 ${Object.keys(sidebar).length} 个侧边栏区块`)
    console.log(`文件树包含 ${countNodes(fileTree)} 个节点`)

    // 输出性能报告
    console.log('\n性能报告:')
    console.log(performanceReport)

    // ---------------------- 使用指南 ----------------------
    console.log('\n----- 高级功能使用指南 -----')
    console.log('1. 自定义文件树构建: 配置FileTreeBuilder以控制扫描行为')
    console.log('2. 性能优化: 使用concurrency和enableParallel提高处理速度')
    console.log('3. 精细过滤: 使用include/exclude精确控制要处理的文件')
    console.log('4. 自定义元数据: 实现metadataParser提取文件的特定信息')
    console.log('5. 性能监控: 使用performanceMonitor跟踪代码执行时间')
  } catch (error) {
    console.error('高级配置生成失败:', error)
  } finally {
    // 关闭性能监控
    performanceMonitor.disable()
  }
}

/**
 * 计算文件树中的节点数量
 * 递归统计树结构中的所有节点
 *
 * @param {Array} tree 文件树数组
 * @returns {number} 节点总数
 */
function countNodes(tree) {
  if (!Array.isArray(tree)) return 0

  let count = tree.length

  for (const node of tree) {
    if (node.children && Array.isArray(node.children)) {
      count += countNodes(node.children)
    }
  }

  return count
}

// 运行示例
main()
