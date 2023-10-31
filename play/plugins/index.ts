import { compare } from 'compare-versions'
import { getPkgVersion, kebabCase } from './utils'

export interface ElementPlusResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * use commonjs lib & source css or scss for ssr
   */
  ssr?: boolean

  /**
   * specify jlong-ui version to load style
   *
   * @default installed version
   */
  version?: string

  /**
   * auto import for directives
   *
   * @default true
   */
  directives?: boolean

  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[]

  /**
   * nightly version
   */
  nightly?: boolean
}

type ElementPlusResolverOptionsResolved = Required<Omit<ElementPlusResolverOptions, 'exclude'>> &
Pick<ElementPlusResolverOptions, 'exclude'>

/**
 * @deprecated
 * @param partialName
 * @param options
 */
function getSideEffectsLegacy(
  partialName: string,
  options: ElementPlusResolverOptionsResolved,
): any {
  const { importStyle } = options
  if (!importStyle)
    return

  if (importStyle === 'sass') {
    return [
      'jlong-ui/packages/theme-chalk/src/base.scss',
      `jlong-ui/packages/theme-chalk/src/${partialName}.scss`,
    ]
  }
  else if (importStyle === true || importStyle === 'css') {
    return [
      'jlong-ui/lib/theme-chalk/base.css',
      `jlong-ui/lib/theme-chalk/el-${partialName}.css`,
    ]
  }
}

function getSideEffects(dirName: string, options: ElementPlusResolverOptionsResolved): any {
    const { importStyle, ssr, nightly } = options
    console.log(dirName, 'lslslslsl=====')
    const themeFolder = nightly ? '@jlong-ui/nightly/theme-chalk' : 'jlong-ui/theme-chalk'
    const esComponentsFolder = nightly ? '@jlong-ui/nightly/es/components' : 'jlong-ui/es/components'

    if (importStyle === 'sass') {
        return ssr
        ? [`${themeFolder}/src/base.scss`, `${themeFolder}/src/${dirName}.scss`]
        : [`${esComponentsFolder}/base/style/index`, `${esComponentsFolder}/${dirName}/style/index`]
    } else if (importStyle === true || importStyle === 'css') {
        return ssr
        ? [`${themeFolder}/base.css`, `${themeFolder}/el-${dirName}.css`]
        : [`${esComponentsFolder}/base/style/css`, `${esComponentsFolder}/${dirName}/style/css`]
    }
}

function resolveComponent(name: string, options: ElementPlusResolverOptionsResolved): any | undefined {
    if (options.exclude && name.match(options.exclude))
        return

    if (!name.match(/^Jl[A-Z]/))
        return

    if (name.match(/^ElIcon.+/)) {
        return {
        name: name.replace(/^ElIcon/, ''),
            from: '@element-plus/icons-vue',
        }
    }

    const partialName = kebabCase(name.slice(2))// ElTableColumn -> table-column
    console.log(partialName, 'partialName-=-=-=-=-=', name)
    const { ssr, nightly } = options

    return {
        name,
        from: `${nightly ? '@jlong-ui/nightly' : 'jlong-ui'}/${ssr ? 'lib' : 'es'}`,
        sideEffects: getSideEffects(partialName, options),
    }
}

function resolveDirective(name: string, options: ElementPlusResolverOptionsResolved): any | undefined {
    if (!options.directives)
        return

    const directives: Record<string, { importName: string; styleName: string }> = {
        Loading: { importName: 'ElLoadingDirective', styleName: 'loading' },
        Popover: { importName: 'ElPopoverDirective', styleName: 'popover' },
        InfiniteScroll: { importName: 'ElInfiniteScroll', styleName: 'infinite-scroll' },
    }

    const directive = directives[name]
    if (!directive)
        return

    const { ssr, nightly } = options

    return {
        name: directive.importName,
        from: `${nightly ? '@jlong-ui/nightly' : 'jlong-ui'}/${ssr ? 'lib' : 'es'}`,
        sideEffects: getSideEffects(directive.styleName, options),
    }
}

const noStylesComponents = ['ElAutoResizer']

/**
 * Resolver for jlong ui
 */
export function JlongResolver(options: any,): any[] {
    let optionsResolved: ElementPlusResolverOptionsResolved

    async function resolveOptions() {
        if (optionsResolved)
        return optionsResolved
        optionsResolved = {
            ssr: false,
            importStyle: 'css',
            directives: true,
            exclude: undefined,
            noStylesComponents: options.noStylesComponents || [],
            nightly: false,
            ...options,
        }
        return optionsResolved
    }

    return [
        {
        type: 'component',
        resolve: async (name: string) => {
            const options = await resolveOptions()
            if ([...options.noStylesComponents, ...noStylesComponents].includes(name))
            return resolveComponent(name, { ...options, importStyle: false })
            else return resolveComponent(name, options)
        },
        },
        {
        type: 'directive',
        resolve: async (name: string) => {
            return resolveDirective(name, await resolveOptions())
        },
        },
    ]
}