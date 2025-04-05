/**
 * 自定义排序示例
 * 展示如何使用排序配置和自定义规则
 *
 * 本示例演示:
 * 1. 多阶段排序算法 - 5级优先级排序机制的工作原理
 * 2. 自定义优先级列表 - 通过priority数组控制文件排序
 * 3. 排序结果可视化 - 比较不同排序配置的效果
 * 4. 实际应用场景 - 在生成器中集成排序功能
 *
 * 排序算法介绍:
 * 排序按照5个优先级阶段依次执行，一旦在某阶段确定了顺序，就不再进行后续比较
 * 1. 特殊文件优先: index.md, guide.md等特殊文件排在最前面
 * 2. 自定义优先级: 使用priority数组指定文件的排序顺序
 * 3. 节点类型: 目录排在文件前面
 * 4. Frontmatter排序: 根据文档中的order字段排序
 * 5. 文件名排序: 使用本地化比较支持中文拼音和数字自然排序
 *
 * 使用方法:
 * 1. 将此文件放在您的项目中
 * 2. 执行 `node custom-sort.js`
 * 3. 查看不同排序配置的效果比较
 * 4. 在浏览器中打开生成的HTML文件查看可视化结果
 *
 * 应用场景:
 * - 文档首页排序: 确保index.md和README.md总是显示在最前面
 * - 学习路径排序: 按照学习顺序排列教程文件(入门→基础→进阶)
 * - 版本文档排序: 确保版本更新日志按特定顺序显示
 * - 目录优先显示: 将所有目录显示在文件前面，便于导航
 */
import fs from 'node:fs'
import {Generator, sortNodes} from '../index.js'

/**
 * 示例主函数
 * 演示sortNodes函数的不同排序配置效果
 */
async function main() {
  try {
    console.log('自定义排序示例开始...')

    // ---------------------- 创建示例数据 ----------------------
    /**
     * 模拟的文件节点数组(用于演示排序)
     * 包含多种类型的节点:
     * - 特殊文件(index.md, guide.md)
     * - 目录(api, examples)
     * - 带frontmatter.order的文件
     * - 普通markdown文件
     * - 中文命名文件(用于测试中文排序)
     */
    const exampleNodes = [
      {name: 'index.md', type: 'file'},
      {name: 'guide.md', type: 'file'},
      {name: 'README.md', type: 'file'},
      {name: 'getting-started.md', type: 'file'},
      {name: 'api', type: 'directory', children: []},
      {name: 'examples', type: 'directory', children: []},
      {name: 'CHANGELOG.md', type: 'file'},
      {name: 'advanced.md', type: 'file'},
      {name: 'configuration.md', type: 'file', frontmatter: {order: 3}},
      {name: 'plugins.md', type: 'file', frontmatter: {order: 2}},
      {name: 'hooks.md', type: 'file', frontmatter: {order: 1}},
      {name: '入门指南.md', type: 'file'},
      {name: '高级用法.md', type: 'file'},
      {name: '常见问题.md', type: 'file'},
    ]

    console.log('示例节点数组:', exampleNodes.map((n) => n.name).join(', '))

    // ---------------------- 默认排序测试 ----------------------
    /**
     * 默认排序
     * 没有提供任何排序配置时，仍会应用以下默认规则:
     * - 目录排在文件前面
     * - 特殊文件(index.md, guide.md)排在最前面
     * - 其他文件按名称自然排序
     */
    const defaultSorted = sortNodes([...exampleNodes])
    console.log('\n1. 默认排序结果:')
    printSortResult(defaultSorted)

    // ---------------------- 基本排序测试 ----------------------
    /**
     * 基本排序配置
     * 设置各种节点类型的优先级权重:
     * - order.index = 0: index.md文件最高优先级
     * - order.guide = 1: guide.md文件次高优先级
     * - order.custom = 2: 自定义排序规则优先级(此处未使用)
     * - order.directory = 3: 目录优先级(高于普通文件)
     * - order.file = 4: 普通文件优先级(最低)
     */
    const basicSortingConfig = {
      order: {
        index: 0,
        guide: 1,
        custom: 2,
        directory: 3,
        file: 4,
      },
      priority: [], // 空priority数组，未启用自定义优先级排序
    }

    const basicSorted = sortNodes([...exampleNodes], basicSortingConfig)
    console.log('\n2. 基本排序配置结果:')
    printSortResult(basicSorted)

    // ---------------------- 优先级排序测试 ----------------------
    /**
     * 使用priority数组自定义优先级
     * 使用与基本排序相同的order权重，但添加priority数组:
     * - priority数组中的文件按照数组顺序进行排序
     * - 不在priority数组中的文件使用后续排序规则
     *
     * 注意: priority作为custom优先级规则的一部分，只有当
     * order.custom的值小于order.directory和order.file时才会生效
     */
    const prioritySortingConfig = {
      order: {
        index: 0,
        guide: 1,
        custom: 2, // 设置为2，小于directory(3)和file(4)，所以会生效
        directory: 3,
        file: 4,
      },
      priority: ['README.md', 'getting-started.md', 'advanced.md'],
    }

    const prioritySorted = sortNodes([...exampleNodes], prioritySortingConfig)
    console.log('\n3. 使用priority数组的排序结果:')
    printSortResult(prioritySorted)

    // ---------------------- Generator集成排序测试 ----------------------
    /**
     * 在Generator中应用自定义排序
     * 演示如何在实际生成导航和侧边栏时使用自定义排序规则
     */
    console.log('\n4. 使用Generator并配置自定义排序:')
    const result = await Generator({
      sorting: {
        order: {
          index: 0,
          guide: 1,
          custom: 2,
          directory: 3,
          file: 4,
        },
        priority: ['README.md', 'getting-started.md', 'advanced.md'],
      },
      // 可以同时配置其他选项
      // debug: true,
      // nav: { dropdown: true, showIcon: true },
      // sidebar: { collapsed: false, showIcon: true }
    })

    console.log('生成器配置结果:')
    console.log(`导航栏项数: ${result.nav.length}`)
    console.log(`侧边栏区块数: ${Object.keys(result.sidebar).length}`)

    // ---------------------- 可视化结果 ----------------------
    /**
     * 生成排序结果比较页面
     * 创建HTML文件，以表格形式展示不同排序配置的效果比较
     */
    const outputDir = './sorting-examples'
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {recursive: true})
    }

    // 创建比较结果的HTML文件，方便可视化查看
    const html = generateComparisonHtml(exampleNodes, defaultSorted, basicSorted, prioritySorted)
    fs.writeFileSync(`${outputDir}/sort-comparison.html`, html)
    console.log(`\n排序比较结果已保存到 ${outputDir}/sort-comparison.html`)

    // 输出使用指南
    console.log('\n----- 排序功能使用指南 -----')
    console.log('1. 在您的Generator配置中添加sorting选项')
    console.log('2. 设置order权重来控制不同类型节点的优先级')
    console.log('3. 使用priority数组来指定特定文件的排序顺序')
    console.log('4. 在markdown文件的frontmatter中使用order字段进行细粒度排序')
    console.log('示例: { sorting: { order: {...}, priority: [...] } }')
  } catch (error) {
    console.error('自定义排序示例失败:', error)
  }
}

/**
 * 打印排序结果
 * 格式化输出排序后的节点数组
 *
 * @param {Array} nodes 排序后的节点数组
 */
function printSortResult(nodes) {
  nodes.forEach((node, index) => {
    const typeLabel = node.type === 'directory' ? '[目录]' : '[文件]'
    const order = node.frontmatter?.order !== undefined ? `(order: ${node.frontmatter.order})` : ''
    console.log(`${index + 1}. ${typeLabel} ${node.name} ${order}`)
  })
}

/**
 * 生成排序比较的HTML文件
 * 创建包含所有排序结果的可视化比较页面
 *
 * @param {Array} original 原始节点数组
 * @param {Array} defaultSorted 默认排序结果
 * @param {Array} basicSorted 基本排序结果
 * @param {Array} prioritySorted 使用priority数组的排序结果
 * @returns {string} HTML内容
 */
function generateComparisonHtml(original, defaultSorted, basicSorted, prioritySorted) {
  // 生成表格行
  function generateRows(nodes) {
    return nodes
      .map((node, index) => {
        const typeLabel = node.type === 'directory' ? '📁 目录' : '📄 文件'
        const order = node.frontmatter?.order !== undefined ? node.frontmatter.order : '-'

        return `
        <tr>
          <td>${index + 1}</td>
          <td>${node.name}</td>
          <td>${typeLabel}</td>
          <td>${order}</td>
        </tr>
      `
      })
      .join('')
  }

  // HTML模板
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>排序比较结果</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 30px;
    }
    h2 {
      color: #3eaf7c;
      margin-top: 30px;
    }
    .comparison {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
    }
    .sort-table {
      flex: 1;
      min-width: 280px;
      border-collapse: collapse;
      margin-bottom: 20px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .sort-table th {
      background-color: #3eaf7c;
      color: white;
      text-align: left;
      padding: 12px;
    }
    .sort-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #ddd;
    }
    .sort-table tr:nth-child(even) {
      background-color: #f8f8f8;
    }
    .sort-table tr:hover {
      background-color: #f1f1f1;
    }
    .code-section {
      background-color: #f8f8f8;
      border-radius: 6px;
      padding: 15px;
      margin: 30px 0;
    }
    .code-section pre {
      margin: 0;
      white-space: pre-wrap;
    }
    .explanation {
      margin: 30px 0;
      padding: 15px;
      background-color: #f5f7f9;
      border-left: 4px solid #3eaf7c;
    }
  </style>
</head>
<body>
  <h1>VitePress配置生成器 - 排序比较结果</h1>

  <div class="explanation">
    <h2>排序算法说明</h2>
    <p>VitePress配置生成器使用多阶段排序算法，按照以下5个优先级依次执行:</p>
    <ol>
      <li><strong>特殊文件优先:</strong> index.md, guide.md等特殊文件排在最前面</li>
      <li><strong>自定义优先级:</strong> 通过priority数组指定文件的特定顺序</li>
      <li><strong>节点类型:</strong> 目录排在文件前面</li>
      <li><strong>Frontmatter排序:</strong> 根据文档中的order字段排序</li>
      <li><strong>文件名排序:</strong> 使用本地化比较支持中文拼音和数字自然排序</li>
    </ol>
    <p>排序过程遵循"一旦在某阶段确定了顺序，就不再进行后续比较"的原则，确保高优先级规则先被应用。</p>
  </div>

  <div class="comparison">
    <table class="sort-table">
      <thead>
        <tr>
          <th colspan="4">原始顺序</th>
        </tr>
        <tr>
          <th>#</th>
          <th>名称</th>
          <th>类型</th>
          <th>order</th>
        </tr>
      </thead>
      <tbody>
        ${generateRows(original)}
      </tbody>
    </table>

    <table class="sort-table">
      <thead>
        <tr>
          <th colspan="4">默认排序</th>
        </tr>
        <tr>
          <th>#</th>
          <th>名称</th>
          <th>类型</th>
          <th>order</th>
        </tr>
      </thead>
      <tbody>
        ${generateRows(defaultSorted)}
      </tbody>
    </table>

    <table class="sort-table">
      <thead>
        <tr>
          <th colspan="4">基本排序配置</th>
        </tr>
        <tr>
          <th>#</th>
          <th>名称</th>
          <th>类型</th>
          <th>order</th>
        </tr>
      </thead>
      <tbody>
        ${generateRows(basicSorted)}
      </tbody>
    </table>

    <table class="sort-table">
      <thead>
        <tr>
          <th colspan="4">使用priority数组</th>
        </tr>
        <tr>
          <th>#</th>
          <th>名称</th>
          <th>类型</th>
          <th>order</th>
        </tr>
      </thead>
      <tbody>
        ${generateRows(prioritySorted)}
      </tbody>
    </table>
  </div>

  <div class="code-section">
    <h2>排序配置代码示例</h2>
    <pre>
// 完整的排序配置示例
const sortingConfig = {
  order: {
    index: 0,     // index.md文件最高优先级
    guide: 1,     // guide.md文件次高优先级
    custom: 2,    // 自定义排序规则优先级
    directory: 3, // 目录优先级(高于普通文件)
    file: 4       // 普通文件优先级(最低)
  },
  priority: [     // 特定文件的优先级列表
    'README.md',       // 最高优先级
    'getting-started.md', // 次高优先级
    'advanced.md'      // 第三优先级
  ]
};

// 在Generator中使用
await Generator({ sorting: sortingConfig });

// 或直接使用sortNodes函数
const sorted = sortNodes(nodes, sortingConfig);
    </pre>
  </div>

  <div class="explanation">
    <h2>最佳实践</h2>
    <ul>
      <li>保持<code>index.md</code>和<code>guide.md</code>的优先级高于其他规则</li>
      <li>将重要的文档(如README、入门指南等)放入<code>priority</code>数组</li>
      <li>对于有序内容(如教程系列)，在frontmatter中使用<code>order</code>属性</li>
      <li>中文文件名会自动按拼音排序，无需特殊处理</li>
      <li>保持目录优先级高于文件，有助于维护导航的逻辑结构</li>
    </ul>
  </div>
</body>
</html>
`
}

// 运行示例
main()
