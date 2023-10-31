import { withInstall, withNoopInstall } from '@jlong-ui/utils'
import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'

export const JlButton = withInstall(Button, {
  ButtonGroup,
})
export const JlButtonGroup = withNoopInstall(ButtonGroup)
export default JlButton

export * from './src/button'
export * from './src/constants'
export type { ButtonInstance, ButtonGroupInstance } from './src/instance'
