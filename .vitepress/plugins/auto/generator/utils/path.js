/**
 * 路径处理工具模块
 * 提供一系列用于处理文件路径和名称的实用函数
 *
 * 本模块负责文件路径的标准化、拼接和解析，为整个生成器提供
 * 一致的路径处理能力，确保生成的路径符合VitePress的规则。
 *
 * @module pathUtils
 * @see {@link ../types/index.d.ts|pathUtils} - 查看完整的类型定义
 * @see {@link ../core/VitePressGenerator.js} - 使用此工具的主要类
 * @see {@link ../index.js|Generator} - 使用此工具的主入口函数
 */

/**
 * 判断文件是否为Markdown文件
 * 通过检查文件名是否以.md结尾来识别Markdown文件
 *
 * @function isMdFile
 * @param {string} name - 文件名
 * @returns {boolean} 是否为Markdown文件
 * @see {@link ../core/VitePressGenerator.js|#findSpecialFiles} - 使用此函数的方法
 * @see {@link ../core/VitePressGenerator.js|#getValidSidebarItems} - 使用此函数的方法
 * @example
 * ```js
 * // 基本用法
 * pathUtils.isMdFile('guide.md'); // true
 * pathUtils.isMdFile('image.png'); // false
 * pathUtils.isMdFile('README.MD'); // true (不区分大小写)
 *
 * // 错误处理
 * pathUtils.isMdFile(null); // false
 * pathUtils.isMdFile(123); // false
 * ```
 */
function isMdFile(name) {
  if (typeof name !== 'string') return false
  return name.toLowerCase().endsWith('.md')
}

/**
 * 移除Markdown扩展名
 * 将.md扩展名从文件名中移除，用于生成URL和链接
 *
 * @function removeMdExt
 * @param {string} name - 文件名
 * @returns {string} 移除.md后的文件名
 * @see {@link ../core/VitePressGenerator.js|#addDirectoryToDropdown} - 使用此函数的方法
 * @see {@link ../core/VitePressGenerator.js|#buildSidebarFileItem} - 使用此函数的方法
 * @see {@link isMdFile} - 相关函数，用于检查文件是否为Markdown文件
 * @example
 * ```js
 * // 基本用法
 * pathUtils.removeMdExt('guide.md'); // 'guide'
 * pathUtils.removeMdExt('README.MD'); // 'README' (不区分大小写)
 * pathUtils.removeMdExt('intro.guide.md'); // 'intro.guide'
 *
 * // 非MD文件处理
 * pathUtils.removeMdExt('image.png'); // 'image.png' (不改变)
 *
 * // 错误处理
 * pathUtils.removeMdExt(null); // ''
 * pathUtils.removeMdExt(123); // ''
 * ```
 */
function removeMdExt(name) {
  if (typeof name !== 'string') return ''
  return name.replace(/\.md$/i, '')
}

/**
 * 获取路径中的片段
 * 将路径拆分为片段数组，过滤掉空片段
 *
 * @function getPathSegments
 * @param {string} path - 路径
 * @returns {Array<string>} 路径片段数组
 * @see {@link getLastSegment} - 基于此函数实现的方法
 * @see {@link ../core/VitePressGenerator.js|#buildSidebarItems} - 使用此函数的方法
 * @example
 * ```js
 * // 基本用法
 * pathUtils.getPathSegments('/guide/intro/'); // ['guide', 'intro']
 * pathUtils.getPathSegments('api/methods'); // ['api', 'methods']
 *
 * // 处理额外的斜杠
 * pathUtils.getPathSegments('//guide///intro//'); // ['guide', 'intro']
 *
 * // 处理空路径
 * pathUtils.getPathSegments(''); // []
 * pathUtils.getPathSegments('/'); // []
 *
 * // 错误处理
 * pathUtils.getPathSegments(null); // []
 * pathUtils.getPathSegments(undefined); // []
 * ```
 */
function getPathSegments(path) {
  if (typeof path !== 'string') return []
  return path.split('/').filter(Boolean)
}

/**
 * 获取路径中的最后一个片段
 * 通常用于从路径中提取目录名或文件名
 *
 * @function getLastSegment
 * @param {string} path - 路径
 * @returns {string} 最后一个路径片段
 * @see {@link getPathSegments} - 此函数调用的基础方法
 * @see {@link getFilename} - 相似功能的函数
 * @example
 * ```js
 * // 基本用法
 * pathUtils.getLastSegment('/guide/intro/'); // 'intro'
 * pathUtils.getLastSegment('/api/methods/fetch.md'); // 'fetch.md'
 *
 * // 处理根路径
 * pathUtils.getLastSegment('/'); // ''
 *
 * // 错误处理
 * pathUtils.getLastSegment(''); // ''
 * pathUtils.getLastSegment(null); // ''
 * ```
 */
function getLastSegment(path) {
  const segments = getPathSegments(path)
  return segments.length > 0 ? segments[segments.length - 1] : ''
}

/**
 * 构建路径
 * 将多个路径片段组合成一个标准化的路径
 * 1. 以'/'开头
 * 2. 如果最后一个片段是目录名，则以'/'结尾
 * 3. 过滤掉空片段和undefined
 *
 * @function buildPath
 * @param {...string} segments - 路径片段
 * @returns {string} 构建后的路径，以/开头
 * @see {@link normalizePath} - 相关的路径处理函数
 * @see {@link joinPath} - 相关的路径处理函数
 * @example
 * ```js
 * // 基本用法
 * pathUtils.buildPath('guide', 'intro'); // '/guide/intro/'
 * pathUtils.buildPath('api', 'methods', 'fetch.md'); // '/api/methods/fetch.md'
 *
 * // 处理空片段
 * pathUtils.buildPath('guide', '', 'intro'); // '/guide/intro/'
 * pathUtils.buildPath('guide', null, 'intro'); // '/guide/intro/'
 *
 * // 处理无参数
 * pathUtils.buildPath(); // '/'
 *
 * // 自动识别目录和文件
 * pathUtils.buildPath('docs', 'api'); // '/docs/api/' (以斜杠结尾，识别为目录)
 * pathUtils.buildPath('docs', 'README.md'); // '/docs/README.md' (不以斜杠结尾，识别为文件)
 * ```
 */
function buildPath(...segments) {
  // 过滤掉空值和undefined
  const filteredSegments = segments.filter((segment) => segment)

  // 处理特殊情况：没有有效片段时返回根路径
  if (!filteredSegments.length) return '/'

  // 确保路径以/开头，并使用/连接所有片段
  const path = `/${filteredSegments.join('/')}`

  // 如果最后一个片段是目录名(不包含点号)，添加尾部斜杠
  const lastSegment = filteredSegments[filteredSegments.length - 1]
  if (typeof lastSegment === 'string' && !lastSegment.includes('.')) {
    return `${path}/`
  }

  return path
}

/**
 * 规范化路径
 * 确保路径以'/'开头，处理空路径为根路径
 * 同时处理多余的斜杠，将连续的斜杠替换为单个斜杠
 *
 * @function normalizePath
 * @param {string} path - 原始路径
 * @returns {string} 规范化后的路径
 * @see {@link joinPath} - 使用此函数的相关方法
 * @see {@link buildPath} - 相似功能的路径构建方法
 * @example
 * ```js
 * // 基本用法
 * pathUtils.normalizePath('guide/intro'); // '/guide/intro'
 * pathUtils.normalizePath('/api/methods/'); // '/api/methods/'
 *
 * // 处理多余的斜杠
 * pathUtils.normalizePath('//guide///intro//'); // '/guide/intro/'
 *
 * // 处理空路径
 * pathUtils.normalizePath(''); // '/'
 * pathUtils.normalizePath(null); // '/'
 * ```
 */
function normalizePath(path) {
  if (!path) return '/'

  // 处理重复的斜杠并确保路径以/开头
  const normalized = `/${path}`.replace(/\/+/g, '/')
  return normalized
}

/**
 * 合并路径
 * 将多个路径片段合并为一个规范化的路径，处理重复的斜杠
 * 与buildPath的区别是，joinPath不会根据最后一个片段自动添加尾部斜杠
 *
 * @function joinPath
 * @param {...string} paths - 多个路径片段
 * @returns {string} 合并后的规范化路径
 * @see {@link normalizePath} - 此函数调用的规范化方法
 * @see {@link buildPath} - 相关的路径构建方法
 * @example
 * ```js
 * // 基本用法
 * pathUtils.joinPath('guide', 'intro'); // '/guide/intro'
 * pathUtils.joinPath('/api/', '/methods/'); // '/api/methods/'
 *
 * // 处理空片段
 * pathUtils.joinPath('guide', '', 'intro'); // '/guide/intro'
 * pathUtils.joinPath('', null, ''); // '/'
 *
 * // 与buildPath的区别
 * pathUtils.joinPath('docs', 'api'); // '/docs/api' (不自动添加尾部斜杠)
 * pathUtils.buildPath('docs', 'api'); // '/docs/api/' (自动添加尾部斜杠)
 * ```
 */
function joinPath(...paths) {
  // 过滤掉空值和undefined，然后用斜杠连接
  const joined = paths.filter(Boolean).join('/')

  // 使用normalizePath确保路径合法
  return normalizePath(joined)
}

/**
 * 获取文件名
 * 从路径中提取文件名部分
 *
 * @function getFilename
 * @param {string} path - 文件路径
 * @returns {string} 文件名
 * @see {@link getDirPath} - 相关的路径处理函数
 * @see {@link getLastSegment} - 相关的片段处理函数
 * @example
 * ```js
 * // 基本用法
 * pathUtils.getFilename('/guide/intro.md'); // 'intro.md'
 * pathUtils.getFilename('api/methods/fetch.js'); // 'fetch.js'
 *
 * // 处理目录路径
 * pathUtils.getFilename('/guide/'); // ''
 * pathUtils.getFilename('/guide'); // 'guide'
 *
 * // 错误处理
 * pathUtils.getFilename(''); // ''
 * pathUtils.getFilename(null); // ''
 * ```
 */
function getFilename(path) {
  if (typeof path !== 'string') return ''
  return path.split('/').filter(Boolean).pop() || ''
}

/**
 * 获取目录路径
 * 从文件路径中提取目录部分
 *
 * @function getDirPath
 * @param {string} path - 文件路径
 * @returns {string} 目录路径，以/结尾
 * @see {@link getFilename} - 此函数使用的获取文件名方法
 * @see {@link normalizePath} - 相关的路径处理函数
 * @example
 * ```js
 * // 基本用法
 * pathUtils.getDirPath('/guide/intro.md'); // '/guide/'
 * pathUtils.getDirPath('api/methods/fetch.js'); // 'api/methods/'
 *
 * // 处理目录路径
 * pathUtils.getDirPath('/guide/'); // '/guide/'
 * pathUtils.getDirPath('/guide'); // '/'
 *
 * // 处理根路径
 * pathUtils.getDirPath('/'); // '/'
 * pathUtils.getDirPath(''); // '/'
 *
 * // 错误处理
 * pathUtils.getDirPath(null); // '/'
 * ```
 */
function getDirPath(path) {
  if (typeof path !== 'string') return '/'
  const filename = getFilename(path)
  if (!filename) return path.endsWith('/') ? path : `${path}/`
  return path.slice(0, Math.max(0, path.lastIndexOf(filename)))
}

/**
 * 路径工具函数集合
 * 提供一系列用于处理文件路径和名称的实用功能
 *
 * @namespace
 * @see {@link ../types/index.d.ts|pathUtils} - 查看完整的类型定义
 * @example
 * ```js
 * // 导入路径工具
 * import { pathUtils } from './utils/path.js';
 *
 * // 判断是否为Markdown文件
 * if (pathUtils.isMdFile(filename)) {
 *   // 处理Markdown文件
 * }
 *
 * // 构建路径
 * const fullPath = pathUtils.buildPath('docs', 'guide', 'intro.md');
 * console.log(fullPath); // '/docs/guide/intro.md'
 *
 * // 获取目录和文件信息
 * const dirPath = pathUtils.getDirPath(fullPath);
 * const fileName = pathUtils.getFilename(fullPath);
 * ```
 */
export const pathUtils = {
  isMdFile,
  removeMdExt,
  getPathSegments,
  getLastSegment,
  buildPath,
  normalizePath,
  joinPath,
  getFilename,
  getDirPath,
}
