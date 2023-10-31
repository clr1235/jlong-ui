import type { TaskFunction } from 'gulp'
import { run } from './process'

import { buildRoot } from './paths'

// 该方法只是添加一个displayName属性，用于gulp执行任务的过程中信息打印
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => {
    return Object.assign(fn, { displayName: name })
}
// gulp任务
export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot)
)