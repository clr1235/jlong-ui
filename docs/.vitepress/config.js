import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import path from 'path'

import nav from './conf/nav'
import sidebar from './conf/sidebar'

export default defineConfig({
    // lang: 'en-US',
    title: 'JlongUi',
    description: '一个基于 element-plus的组件库。',

    lastUpdated: true,
    cleanUrls: true,

    base: process.env.BASE || '/',
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
    ],

    themeConfig: {
        outlineTitle: '本页目录',
        lastUpdatedText: '上次更新',
        logo: '/logo.svg',
        search: {
        provider: 'local'
        },

        // demoblock locales
        // demoblock: {
        //   'root': {
        //     'view-source': 'View source',
        //     'hide-source': 'Hide source',
        //     'edit-in-editor': 'Edit in Playground',
        //     'edit-on-github': 'Edit on GitHub',
        //     'copy-code': 'Copy code',
        //     'copy-success': 'Copy success',
        //     'copy-error': 'Copy error',
        //   },
        //   'zh': {
        //     'view-source': '查看源代码',
        //     'hide-source': '隐藏源代码',
        //     'edit-in-editor': '在 Playground 中编辑',
        //     'edit-on-github': '在 Github 中编辑',
        //     'copy-code': '复制代码',
        //     'copy-success': '复制成功',
        //     'copy-error': '复制失败'
        //   }
        // },

        nav,
        sidebar,

        // editLink: {
        //     pattern: 'https://github.com/xinlei3166/vitepress-theme-demoblock/edit/main/docs/:path',
        //     text: '在 GitHub 上编辑此页'
        // },

        // socialLinks: [
        //     { icon: 'github', link: 'https://github.com/xinlei3166/vitepress-theme-demoblock' }
        // ],

        // footer: {
        //     message: 'Released under the MIT License.',
        //     copyright: 'Copyright © 2022-present 君惜'
        // }
    },
    markdown: {
        theme: { light: 'github-light', dark: 'github-dark' },

        config: (md) => {
            md.use(demoblockPlugin, {
                customClass: 'demoblock-custom'
            })
        }
    },

    vite: {
        plugins: [demoblockVitePlugin(), vueJsx(), Inspect()],
        resolve: {
            alias: {
                '@alias': path.resolve(__dirname, '../')
            }
        }
    },
})
