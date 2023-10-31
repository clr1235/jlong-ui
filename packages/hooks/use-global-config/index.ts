import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue'
import { debugWarn, keysOf } from '@jlong-ui/utils'

import {SIZE_INJECTION_KEY} from '../use-size'
import {defaultNamespace, namespaceContextKey, useNamespace} from '../use-namespace'
import {localeContextKey, useLocale} from '../use-locale'
import {useZIndex, zIndexContextKey} from '../use-z-index'


import type { MaybeRef } from '@vueuse/core'
import type { App, Ref } from 'vue'

// this is meant to fix global methods like `ElMessage(opts)`, this way we can inject current locale
// into the component as default injection value.
// refer to: https://github.com/element-plus/element-plus/issues/2610#issuecomment-887965266
const globalConfig = ref<any>()
const configProviderContextKey = Symbol()

export function useGlobalConfig<
  K extends keyof any,
  D extends any[K]
>(
  key: K,
  defaultValue?: D
): Ref<Exclude<any[K], undefined> | D>
export function useGlobalConfig(): Ref<any>
export function useGlobalConfig(
  key?: keyof any,
  defaultValue = undefined
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  } else {
    return config
  }
}

// for components like `ElMessage` `ElNotification` `ElMessageBox`.
export function useGlobalComponentSettings(
  block: string,
  sizeFallback?: MaybeRef<any['size']>
) {
  const config = useGlobalConfig()

  const ns = useNamespace(
    block,
    computed(() => config.value?.namespace || defaultNamespace)
  )

  const locale = useLocale(computed(() => config.value?.locale))
  const zIndex = useZIndex(
    computed(() => config.value?.zIndex || defaultInitialZIndex)
  )
  const size = computed(() => unref(sizeFallback) || config.value?.size || '')
  provideGlobalConfig(computed(() => unref(config) || {}))

  return {
    ns,
    locale,
    zIndex,
    size,
  }
}

export const provideGlobalConfig = (
  config: MaybeRef<any>,
  app?: App,
  global = false
) => {
  const inSetup = !!getCurrentInstance()
  const oldConfig = inSetup ? useGlobalConfig() : undefined

  const provideFn = app?.provide ?? (inSetup ? provide : undefined)
  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup().'
    )
    return
  }

  const context = computed(() => {
    const cfg = unref(config)
    if (!oldConfig?.value) return cfg
    return mergeConfig(oldConfig.value, cfg)
  })
  provideFn(configProviderContextKey, context)
  provideFn(
    localeContextKey,
    computed(() => context.value.locale)
  )
  provideFn(
    namespaceContextKey,
    computed(() => context.value.namespace)
  )
  provideFn(
    zIndexContextKey,
    computed(() => context.value.zIndex)
  )

  provideFn(SIZE_INJECTION_KEY, {
    size: computed(() => context.value.size || ''),
  })

  if (global || !globalConfig.value) {
    globalConfig.value = context.value
  }
  return context
}

const mergeConfig = (
  a: any,
  b: any
): any => {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])]
  const obj: Record<string, any> = {}
  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }
  return obj
}
