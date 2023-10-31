// 执行gulp打包命令前先运行@esbuild-kit/cjs-loader，使用esbuild打包工具，它会将gulpfile.ts转换为js文件用于执行gulp
import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
// 替代node的fs模块
import { copy } from 'fs-extra'
import { parallel, series } from 'gulp'
import {
  buildOutput,
  epOutput,
  epPackage,
  projRoot,
} from './src/utils'
import { buildConfig, run, runTask, withTaskName } from './src'
import type { TaskFunction } from 'gulp'
import type { Module } from './src'

export const copyFiles = () =>
    Promise.all([
        copyFile(epPackage, path.join(epOutput, 'package.json')),
        // copyFile(
        //     path.resolve(projRoot, 'README.md'),
        //     path.resolve(epOutput, 'README.md')
        // ),
        // copyFile(
        //     path.resolve(projRoot, 'global.d.ts'),
        //     path.resolve(epOutput, 'global.d.ts')
        // ),
    ]
)

export const copyTypesDefinitions: TaskFunction = (done) => {
    const src = path.resolve(buildOutput, 'types', 'packages')
    const copyTypes = (module: Module) =>
        withTaskName(`copyTypes:${module}`, () =>
        copy(src, buildConfig[module].output.path, { recursive: true })
    )

    return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export const copyFullStyle = async () => {
    await mkdir(path.resolve(epOutput, 'dist'), { recursive: true })
    await copyFile(
        path.resolve(epOutput, 'theme-chalk/index.css'),
        path.resolve(epOutput, 'dist/index.css')
    )
}
console.log(epOutput, 'epOutput<><><><><>')
// series串行函数，将任务函数和/或组合操作组合成更大的操作，这些操作将按顺序依次执行
export default series(
    // 执行clean脚本，清理文件
    withTaskName('clean', () => run('pnpm run clean')),
    // 创建输出目录
    withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),
    // parallel并行函数，将任务功能和/或组合操作组合成同时执行的较大操作
    parallel(
        // 打包模块，将开启一个新进程开始执行 ./src/tasks/modules.ts 中的 buildModules 函数。最后将在 /dist/jlong-ui 下生成 es 与 lib 两个文件夹，分别为 ESM 与 CJS 两种格式。
        runTask('buildModules'),
        // 将执行 ./src/tasks/full-bundle.ts 中的 buildFullBundle 函数。另外，用户导入完整包可以不需要使用构建工具 （Vite、Webpack 等），需要我们需要还需要提供压缩版本，以便能够节省加载时间。
        runTask('buildFullBundle'),


        // 生成*.d.ts文件
        // runTask('generateTypesDefinitions'),
        // 生成IDE支持
        // runTask('buildHelper'),


        // 构建并复制样式
        series(
            withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
            copyFullStyle
        )
    ),
    // 复制文件
    // parallel(copyTypesDefinitions, copyFiles)
    parallel(copyFiles)
)


// 公开任务（Public tasks） 导出src下的所有模块，以便于gulp命令直接调用  
export * from './src'