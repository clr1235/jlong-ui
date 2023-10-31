import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  // 需要 在 rollup 下显式声明 emitCJS 才会导出 cjs 类型文件
  rollup: {
    emitCJS: true,
  },
})
