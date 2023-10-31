import { spawn } from 'child_process'
// 颜色插件 用来润色gulp的流程
import chalk from 'chalk'
// 美化terminal控制台
import consola from 'consola'

import { projRoot } from './paths'

// 封装run函数
export const run = async (command: string, cwd: string = projRoot) =>
    new Promise<void>((resolve, reject) => {
        // 切割命令
        const [cmd, ...args] = command.split(' ')
        // 润色
        consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`)
        // 用给定的命令衍生一个新的进程
        console.log(cmd, 'cmd====', cwd)
        const app = spawn(cmd, args, {
            cwd, // 衍生的进程的工作目录
            stdio: 'inherit', // 配置子进程与父进程之前建立的管道
            // shell: process.platform === 'win32',
        })
        // 实例化的进程app.kill()方法向子进程发送一个信号。 如果没有给定参数，则进程会发送 'SIGTERM' 信号
        const onProcessExit = () => app.kill('SIGHUP')
        // 坚挺close事件
        app.on('close', (code) => {
            // 退出事件
            process.removeListener('exit', onProcessExit)
            if (code === 0) resolve()
            else reject(
                new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
            )
        })
        process.on('exit', onProcessExit)
})