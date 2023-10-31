/**
 * Rollup 是不能解析像 TypeScript、Vue SFC 这些非 JavaScript 的代码，所以需要借助各种插件，来帮助 Rollup 将其转换为 JavaScript 代码。
 * Rollup 也不能解析 CommonJS 格式的代码，还需要插件来帮助 Rollup 解决这些问题。
 */
import { rollup } from 'rollup'
// 提供 Vue 3 单文件组件支持。
import vue from '@vitejs/plugin-vue'
// 提供 Vue 3 JSX 支持
import vueJsx from '@vitejs/plugin-vue-jsx'
/**
 * Vue Macros实现了一系列还没有被vue官方实现的提案RFC或者来自社区的主意。
 * 为Vue扩展更多的宏和语法糖。
 * 开箱即用的支持vue2.7和vue3
 * 支持TS和Volar插件
 * 支持多种打包器
 * 同时支持vite3/4、webpack、vue cli、rollup、esbuild等。使用unplugin驱动
 **/ 
import VueMacros from 'unplugin-vue-macros/rollup'
/**
 *  该插件用于解析Node.js模块，它可以让Rollup打包时使用Node.js模块（包括外部依赖），而不仅仅是ES模块。
    该插件将检查模块的package.json文件以确定模块的主文件位置，并解决模块之间的依赖关系。
    此外，它还可以解析模块的绝对路径和相对路径，确保正确地解析和加载模块。
 */
import { nodeResolve } from '@rollup/plugin-node-resolve'
// 该插件允许你使用 Rollup 打包 CommonJS 模块时进行转换
import commonjs from '@rollup/plugin-commonjs'
// 使用esbuild来加快打包速度
import esbuild from 'rollup-plugin-esbuild'
// 查找文件的库
import glob from 'fast-glob'
import { epRoot, excludeFiles, pkgRoot, generateExternal, writeBundles } from '../utils'
import { JlongUiAlias } from '../plugins/jlong-ui-alias'
import { buildConfigEntries, target } from '../build-info'

import type { OutputOptions } from 'rollup'

export const buildModules = async () => {
    const input = excludeFiles(
        await glob('**/*.{js,ts,vue}', {
            cwd: pkgRoot,
            absolute: true,
            onlyFiles: true,
        })
    )
    const aaa = await generateExternal({ full: false })
    // console.log(input, 'input<>////////', epRoot)
    /* 
        rollu函数接收一个输入选项对象作为参数，返回一个Promise，该Promise解析为一个bundle对象，
        rollup将构建模块图并执行tree-shaking优化，但不会生成任何输出。
        rollup()打包之后生成的bundle对象可以多次调用bundle.generate并使用不同的输出选项对象来生成不同的产物到内存中。
        如果想要将生成的产物写入到磁盘中，可以使用bundle.write()
    */
   console.log(aaa, '三方库-s-s-s-s')
    const bundle = await rollup({
        input,
        plugins: [
            JlongUiAlias(),
            VueMacros({
                setupComponent: false,
                setupSFC: false,
                plugins: {
                    vue: vue({
                        isProduction: false,
                    }),
                    vueJsx: vueJsx(),
                },
            }),
            nodeResolve({
                // 指定插件在以下扩展名的文件中运行
                extensions: ['.mjs', '.js', '.json', '.ts'],
            }),
            commonjs(),
            esbuild({
                sourceMap: true,
                target,
                loaders: {
                    '.vue': 'ts',
                },
            }),
        ],
        // 将第三方库从打包文件中移除
        external: await generateExternal({ full: false }),
        treeshake: false,
    })
    // 根据不同的模块配置将打包产物写入到磁盘中
    await writeBundles(
        bundle,
        buildConfigEntries.map(([module, config]): OutputOptions => {
            console.log(module, 'module====/////', config)
            return {
                // 用于指定生成的bundle的格式
                format: config.format,
                // 指定生成的chunk放置在哪个目录，如果生成一个以上的chunk，该选项必需。否则可以用file选项代替
                dir: config.output.path,
                // 慎用选项，用于指定导出模式。named值适用于命名导出的情况；
                // 次选项的值不同将影响用户使用你的bundle产物的方式。具体参考 https://cn.rollupjs.org/configuration-options/#output-exports
                exports: module === 'cjs' ? 'named' : undefined,
                // 该选项将使用原始模块名作为文件名，为所有模块创建单独的chunk，而不是创建尽可能少的chunk。需配合dir选项一起使用
                preserveModules: true,
                preserveModulesRoot: epRoot,
                // 该选项值为true将生成一个独立的sourcemap文件
                sourcemap: true,
                // 用于指定chunks的入口文件模式
                entryFileNames: `[name].${config.ext}`,
            }
        })
    )
}
