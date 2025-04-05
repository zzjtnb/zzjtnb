// 方法2: 使用具名导出，可以按需导入特定功能
export * from './fileTree/index.js'
export * from './generator/index.js'

// 同时提供默认导出，以便兼容之前的导入方式
// import * as allExports from './index.js'
// export default allExports
