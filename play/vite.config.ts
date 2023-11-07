import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import esbuild from 'rollup-plugin-esbuild'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
// 此插件可能需要手动修改
import { JlongResolver } from './plugins/index'
import Inspect from 'vite-plugin-inspect'
import mkcert from 'vite-plugin-mkcert'
import glob from 'fast-glob'

// 不知道为啥会报错 SyntaxError: Named export 'epRoot' not found. The requested module 'file:///Users/rong/Code/jlong-ui/internal/build/dist/index.cjs' is a CommonJS module, which may not support all module.exports as named exports.
// CommonJS modules can always be imported via the default export, for example using:
// import {epRoot} from '@jlong-ui/build'
// 换成如下写法可不报错
// import * as pkg from '@jlong-ui/build'
// console.log(pkg.default.epRoot, 'sjsjsj======', typeof pkg)

const projRoot = path.resolve(__dirname, '..')
const pkgRoot = path.resolve(projRoot, 'packages')
const epRoot = path.resolve(pkgRoot, 'jlong-ui')
const epPackage = path.resolve(epRoot, 'package.json')

const esbuildPlugin = (): any => ({
	...esbuild({
		target: 'chrome64',
		loaders: {
			'.vue': 'js',
		},
	}),
	enforce: 'post',
})

export default defineConfig(async ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	// let { dependencies } = pkg.getPackageDependencies(epPackage)
	// dependencies = dependencies.filter((dep) => !dep.startsWith('@types/')) // exclude dts deps
	const optimizeDeps = (
		await glob(['dayjs/(locale|plugin)/*.js'], {
			cwd: path.resolve(projRoot, 'node_modules'),
		})
	).map((dep) => dep.replace(/\.js$/, ''))
	console.log(`${__dirname}/**`, 'ssjsksksksksksks')
	return {
		resolve: {
			alias: [
				{
					find: /^jlong-ui(\/(es|lib))?$/,
					replacement: path.resolve(epRoot, 'index.ts'),
				},
				{
					find: /^jlong-ui\/(es|lib)\/(.*)$/,
					replacement: `${pkgRoot}/$2`,
				},
			],
		},
		server: {
			host: true,
			https: !!env.HTTPS,
			port: '8888',
		},
		plugins: [
			VueMacros({
				setupComponent: false,
				setupSFC: false,
				plugins: {
					vue: vue(),
					vueJsx: vueJsx(),
				},
			}),
			DefineOptions(),
			esbuildPlugin(),
			// 实现按需自动引入
			Components({
				include: `${__dirname}/**`,
				resolvers: JlongResolver({ importStyle: 'sass' }),
				dts: false,
			}),
			mkcert(),
			Inspect(),
		],
		optimizeDeps: {
			// include: ['vue', '@vue/shared', ...dependencies, ...optimizeDeps],
			include: ['vue', '@vue/shared', ...optimizeDeps],
		},
		esbuild: {
			target: 'chrome64',
		},
	}
})
