import provideGlobalConfig from '@element-plus/components/config-provider'
import { INSTALLED_KEY } from '@jlong-ui/constants'
import { version } from './version'

import type { App, Plugin } from '@vue/runtime-core'
import type { ConfigProviderContext } from '@element-plus/components'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: ConfigProviderContext) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))

    if (options) new provideGlobalConfig(options, app, true)
  }

  return {
    version,
    install,
  }
}
