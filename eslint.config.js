// eslint.config.js
// 如果你的项目没有"type":"module"在其package.json文件中指定,那么eslint.config.js必须采用 CommonJS 格式

import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    vue: true,
    // typescript: true,
    // formatters: true,
    ignores: ['**/**/stats.html'],
  },
  {
    files: ['**/*.md'],
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },
  {
    // 没有“文件”，它们是所有文件的通用规则
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off',
      'n/prefer-global/buffer': 'off',
      'n/prefer-global/process': 'off',
      'vue/singleline-html-element-content-newline': 'off', // 关闭单行内容换行检查
      'vue/return-in-computed-property': 'off',
    },
  },
)
