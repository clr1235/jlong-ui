import { componentSizeMap } from '@jlong-ui/constants'

import type { ComponentSize } from '@jlong-ui/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
