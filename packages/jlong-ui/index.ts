import installer from './defaults'
export * from '@jlong-ui/components'
export * from '@jlong-ui/constants'
export * from '@element-plus/directives'
export * from '@jlong-ui/hooks'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
