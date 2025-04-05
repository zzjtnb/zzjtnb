# 文件树构建工具

一个用于构建文件树结构的工具,支持 Markdown 文件的扫描和处理。

## 功能特点

- 📁 支持递归扫描目录
- 📝 支持 Markdown 文件解析
- 🔍 支持文件过滤和排除
- 💾 支持缓存机制
- 📊 提供详细的统计信息
- ⚡ 支持性能优化
- 🔄 支持增量构建
- 👀 支持文件监控
- 📈 支持性能分析

## 安装

```bash
npm install file-tree-builder
```

## 使用方法

### 基本使用

```javascript
import {FileTreeBuilder} from './utils/fileTree/core/FileTreeBuilder.js'

const builder = new FileTreeBuilder({
  srcDir: './docs',
  maxDepth: 10,
  debug: true
})

// 构建文件树
const tree = await builder.build()

// 获取统计信息
const stats = builder.getStats()
```

### 配置选项

```javascript
const config = {
  // 源目录
  srcDir: './docs',

  // 基本配置
  maxDepth: 10,                    // 最大递归深度
  maxFileSize: 10 * 1024 * 1024,  // 最大文件大小(10MB)
  memoryLimit: 1024,              // 内存限制(MB)
  debug: false,                    // 调试模式

  // 缓存配置
  enableCache: true,              // 启用缓存
  cacheTTL: 5 * 60 * 1000,       // 缓存过期时间(5分钟)

  // 过滤规则
  exclude: [                      // 排除规则
    'node_modules',
    '.git',
    '.vscode',
    '.idea',
    '.DS_Store',
    /\.temp\./,
    /\.cache\./,
    /\.log$/,
    /\.tmp$/,
    /\.bak$/
  ],
  include: [],                    // 包含规则

  // 性能优化
  concurrency: 50,                // 并发数
  batchSize: 50,                  // 批处理大小
  enableStreaming: true,          // 启用流式处理
  enableCompression: false,       // 启用压缩
  compressionLevel: 6,            // 压缩级别(1-9)
  enableIncremental: false,       // 启用增量构建
  enableParallel: true,           // 启用并行处理
  enableMemoryOptimization: true, // 启用内存优化

  // 错误处理
  enableErrorRecovery: true,      // 启用错误恢复
  retryCount: 3,                  // 重试次数
  retryDelay: 1000,               // 重试延迟(ms)

  // 文件监控
  enableWatch: false,             // 启用文件监控
  watchDelay: 1000,               // 监控延迟(ms)

  // 性能分析
  enableProfiling: false,         // 启用性能分析
  profilingSampleRate: 0.1        // 采样率(0-1)
}
```

### 进度回调

```javascript
builder.onProgress((info) => {
  console.log(`当前处理: ${info.currentItem}`)
  console.log(`已处理文件: ${info.processedFiles}`)
  console.log(`已处理目录: ${info.processedDirs}`)
  console.log(`当前深度: ${info.currentDepth}`)
  console.log(`总大小: ${info.totalSize}`)
  console.log(`耗时: ${info.elapsedTime}ms`)
})
```

### 错误处理

```javascript
try {
  const tree = await builder.build()
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
```

### 资源清理

```javascript
// 中止构建
builder.abort()

// 销毁构建器
builder.destroy()
```

## 性能优化

### 并发控制

通过设置 `concurrency` 和 `batchSize` 可以控制并发数和批处理大小:

```javascript
const builder = new FileTreeBuilder({
  concurrency: 50,  // 同时处理50个文件
  batchSize: 50     // 每批处理50个文件
})
```

### 内存优化

通过启用内存优化和压缩可以减少内存使用:

```javascript
const builder = new FileTreeBuilder({
  enableMemoryOptimization: true,
  enableCompression: true,
  compressionLevel: 6
})
```

### 增量构建

通过启用增量构建可以只处理变化的文件:

```javascript
const builder = new FileTreeBuilder({
  enableIncremental: true
})
```

### 文件监控

通过启用文件监控可以实现实时更新:

```javascript
const builder = new FileTreeBuilder({
  enableWatch: true,
  watchDelay: 1000
})
```

## 错误处理

### 错误恢复

通过启用错误恢复可以处理部分失败的情况:

```javascript
const builder = new FileTreeBuilder({
  enableErrorRecovery: true,
  retryCount: 3,
  retryDelay: 1000
})
```

### 错误统计

可以获取错误统计信息:

```javascript
const errorStats = builder.getErrorStats()
console.log('错误统计:', errorStats)
```

## 性能分析

通过启用性能分析可以收集性能数据:

```javascript
const builder = new FileTreeBuilder({
  enableProfiling: true,
  profilingSampleRate: 0.1
})
```

## 注意事项

1. 源目录必须是有效的目录路径
2. 排除规则和包含规则不能冲突
3. 内存限制要根据实际情况设置
4. 并发数要根据系统资源设置
5. 文件监控可能会影响性能
6. 性能分析会增加额外开销

## 许可证

MIT
