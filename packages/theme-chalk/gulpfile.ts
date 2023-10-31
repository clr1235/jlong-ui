import path from 'path'
import chalk from 'chalk'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import consola from 'consola'
import { epOutput } from '../../internal/build/src/index'
// import { epOutput } from '@jlong-ui/build'  用此方式引入的话，在发布到npm之后，第三方安装时报错如下：
// "@jlong-ui/build@workspace:*" is in the dependencies but no package named "@jlong-ui/build" is present in the workspace
// 暂时没搞清楚这个build子包是如何给外部用的

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(epOutput, 'theme-chalk')

console.log(epOutput, '打包css的输出路径》〉》〉')

/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
function buildThemeChalk() {
  const sass = gulpSass(dartSass)
  const noElPrefixFile = /(index|base|display)/
  return src(path.resolve(__dirname, 'src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
        // 压缩
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000 // 原始css文件大小
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB` // 压缩后css文件大小
        )
      })
    )
    .pipe(
      rename((path) => {
        // 不是/(index|base|display)/的文件名 + 前缀 jlong
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `jlong-${path.basename}`
        }
      })
    )
    .pipe(dest(distFolder))
}

/**
 * Build dark Css Vars
 * @returns
 */
function buildDarkCssVars() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(__dirname, 'src/dark/css-vars.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
        )
      })
    )
    .pipe(dest(`${distFolder}/dark`))
}

/**
 * copy from packages/theme-chalk/dist to dist/element-plus/theme-chalk
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

/**
 * copy source file to packages
 */

export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  )
}

export const build = parallel(
  copyThemeChalkSource,
//   series(buildThemeChalk, buildDarkCssVars, copyThemeChalkBundle)
  series(buildThemeChalk, copyThemeChalkBundle)
)

export default build