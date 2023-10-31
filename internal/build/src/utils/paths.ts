import { resolve } from 'path'
// 根据当前所在目录找到项目根目录      注意：路径一定得写对，否则run函数中的子进程在执行过程中会报错
export const projRoot = resolve(__dirname, '..', '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
// 
export const themeRoot = resolve(pkgRoot, 'theme-chalk')
export const hookRoot = resolve(pkgRoot, 'hooks')
export const localeRoot = resolve(pkgRoot, 'locale')
export const directiveRoot = resolve(pkgRoot, 'directives')
export const epRoot = resolve(pkgRoot, 'jlong-ui')
export const utilRoot = resolve(pkgRoot, 'utils')
console.log(projRoot, 'projRoot=====>>>>', __dirname)
export const buildRoot = resolve(projRoot, 'internal', 'build')

// Docs
export const docsDirName = 'docs'
export const docRoot = resolve(projRoot, docsDirName)
export const vpRoot = resolve(docRoot, '.vitepress')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/jlong-ui` */
export const epOutput = resolve(buildOutput, 'jlong-ui')

export const projPackage = resolve(projRoot, 'package.json')
export const compPackage = resolve(compRoot, 'package.json')
export const themePackage = resolve(themeRoot, 'package.json')
export const hookPackage = resolve(hookRoot, 'package.json')
export const localePackage = resolve(localeRoot, 'package.json')
export const directivePackage = resolve(directiveRoot, 'package.json')
export const epPackage = resolve(epRoot, 'package.json')
export const utilPackage = resolve(utilRoot, 'package.json')
export const docPackage = resolve(docRoot, 'package.json')