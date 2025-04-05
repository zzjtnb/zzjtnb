/**
 * 基本使用示例
 * 展示如何使用 Generator 生成 VitePress 的导航栏和侧边栏配置
 *
 * 本示例演示:
 * 1. 基本配置生成 - 使用默认和自定义配置生成导航与侧边栏
 * 2. 结果输出到文件 - 将生成的配置保存为独立的JavaScript模块
 * 3. VitePress配置整合 - 如何在VitePress配置中应用生成的结果
 *
 * 使用方法:
 * 1. 将此文件放在您的项目中
 * 2. 执行 `node basic.js`
 * 3. 查看生成的配置文件和终端输出
 *
 * 注意事项:
 * - 默认情况下扫描当前目录作为源目录
 * - 配置输出到 ./vitepress-config-output 目录
 * - 该示例使用默认和自定义两种配置进行对比
 */
import fs from 'node:fs'
import {Generator} from '../index.js'

/**
 * 示例主函数
 * 演示Generator的基本用法和配置
 */
async function main() {
  try {
    console.log('开始生成 VitePress 配置...')

    // ---------------------- 默认配置生成 ----------------------
    /**
     * 使用默认配置生成
     * 不指定任何参数时，Generator会:
     * - 默认扫描当前工作目录
     * - 使用默认的排序规则和显示样式
     * - 不启用调试模式
     */
    const defaultResult = await Generator()
    console.log('默认配置生成完成')
    console.log('导航栏项数:', defaultResult.nav.length)
    console.log('侧边栏区块数:', Object.keys(defaultResult.sidebar).length)

    // ---------------------- 自定义配置生成 ----------------------
    /**
     * 使用自定义配置
     * 通过传入配置对象来定制生成器的行为:
     * - debug: 启用性能监控和详细日志
     * - nav: 自定义导航栏显示样式
     * - sidebar: 自定义侧边栏显示样式
     */
    const customResult = await Generator({
      // 启用调试模式，将输出性能报告
      debug: true,

      // 导航栏配置
      nav: {
        dropdown: true, // 使用下拉菜单形式，适合复杂目录结构
        showIcon: true, // 在文本前显示图标，增强可视化效果
        filePrefix: '📄', // 文件前缀，使用emoji或其他字符
        dirPrefix: '📂', // 目录前缀，使用emoji或其他字符
      },

      // 侧边栏配置
      sidebar: {
        collapsed: true, // 默认折叠子菜单，适合大型文档
        showIcon: true, // 显示图标，与导航栏风格统一
        filePrefix: '📄', // 文件前缀
        dirPrefix: '📂', // 目录前缀
      },

      // 可以添加排序配置，这里使用默认排序规则
      // sorting: {
      //   priority: ['README.md', 'getting-started.md']
      // }
    })
    console.log('自定义配置生成完成')

    // ---------------------- 输出结果到文件 ----------------------
    // 创建输出目录
    const outputDir = './vitepress-config-output'
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {recursive: true})
    }

    // 保存导航栏配置为独立的JavaScript模块
    fs.writeFileSync(
      `${outputDir}/nav.js`,
      `/**
 * 自动生成的导航栏配置
 * 由VitePress配置生成器创建
 * 生成时间: ${new Date().toLocaleString()}
 */
export default ${JSON.stringify(customResult.nav, null, 2)}
`
    )

    // 保存侧边栏配置为独立的JavaScript模块
    fs.writeFileSync(
      `${outputDir}/sidebar.js`,
      `/**
 * 自动生成的侧边栏配置
 * 由VitePress配置生成器创建
 * 生成时间: ${new Date().toLocaleString()}
 */
export default ${JSON.stringify(customResult.sidebar, null, 2)}
`
    )

    console.log(`配置已保存到 ${outputDir} 目录`)

    // ---------------------- VitePress配置示例 ----------------------
    /**
     * 创建完整的VitePress配置示例
     * 演示如何在实际项目中整合生成的导航栏和侧边栏
     */
    const vitepressConfig = `/**
 * VitePress配置文件示例
 * 展示如何使用自动生成的导航栏和侧边栏配置
 */
import { defineConfig } from 'vitepress'
import nav from './nav.js'
import sidebar from './sidebar.js'

export default defineConfig({
  // 基础站点配置
  title: '我的文档站点',
  description: '使用自动生成的导航和侧边栏',
  lastUpdated: true,

  // 主题配置
  themeConfig: {
    // 使用生成器创建的导航栏和侧边栏
    nav,
    sidebar,

    // 其他主题配置
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-account/your-repo' }
    ],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © ' + new Date().getFullYear()
    }
  }
})
`

    // 保存完整配置示例
    fs.writeFileSync(`${outputDir}/config.js`, vitepressConfig)
    console.log('VitePress 配置示例已保存')

    // 输出使用指南
    console.log('\n----- 使用指南 -----')
    console.log('1. 复制生成的文件到您的 .vitepress 目录')
    console.log('2. 在您的 config.js 中导入并使用这些配置')
    console.log('3. 根据需要调整配置选项')
  } catch (error) {
    console.error('配置生成失败:', error)
  }
}

// 运行示例
main()
