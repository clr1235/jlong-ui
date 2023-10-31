import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'

// 引入所有的ui组件
import * as basicUiComponents from '@jlong-ui/components'

// import 'element-plus/dist/index.css'
// 引入组件的样式
import '../../../packages/theme-chalk/src/reset.scss'
import '../../../packages/theme-chalk/src/index.scss'
// for dark mode
import '../../../packages/theme-chalk/src/dark/css-vars.scss'
// 引入主题的样式
import './style.css'


export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx)
        // 用于注册一些位于 .vitepress/compoent目录下的公共demo组件，以便在md文件中直接使用
        useComponents(ctx.app)
        // 注册我们自己在packages/components下封装的一些基础ui组件，以便在md文件中直接使用
        Object.entries(basicUiComponents).forEach(([key, comp]) => {
            if (key.startsWith('Jl')) {
                ctx.app.component(key, comp)
            }
        })
    }
}
