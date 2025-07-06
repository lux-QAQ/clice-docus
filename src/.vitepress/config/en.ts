import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
    lang: 'en-US',
    description: 'A modern bot framework based on the NTQQ protocol.',

    themeConfig: {
        nav: nav(),
        sidebar: sidebarGuide(),

        editLink: {
            pattern: 'https://github.com/your-repo/edit/main/src/:path', // 替换为文档仓库的地址
            text: 'Edit this page on GitHub'
        },

        docFooter: {
            prev: 'Previous Page',
            next: 'Next Page'
        },

        outline: {
            label: 'On this page'
        },

        lastUpdated: {
            text: 'Last Updated',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: 'Languages',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'Quick Start',
            link: '/guide/start-install',
            activeMatch: '/guide/'
        },
        {
            text: 'About',
            link: '/other/about',
            activeMatch: '/other/about'
        }
    ]
}

function sidebarGuide(): DefaultTheme.Sidebar {
    return [
        {
            text: 'Quick Start',
            base: '/guide',
            collapsed: true,
            items: [
                { text: 'Menu', link: '/start' },
                { text: 'What is clice', link: '/clice' },
                {
                    text: 'Install',
                    base: '/guide/boot',
                    collapsed: false,
                    items: [
                        { text: 'Build', link: '/build' },
                        { text: 'Install', link: '/install' }
                    ]
                }
            ]
        },
        {
            text: 'Config',
            base: '/config',
            collapsed: true,
            items: [
                { text: 'Config', link: '/configuration' },
                { text: 'Advanced Config', link: '/advanced' }
            ]
        },
        {
            text: 'Usage',
            base: '/use',
            collapsed: true,
            items: [
                { text: 'VScode', link: '/vscode' },
                //{ text: 'Community Resources', link: '/community' }
            ]
        },
        {
            text: 'Design',
            base: '/design',
            collapsed: true,
            items: [
                { text: 'Architecture', link: '/architecture' },
                { text: 'Clangd', link: '/clangd' },
                { text: 'Dependent name', link: '/dependent-name' },
                { text: 'Design', link: '/design' },
                { text: 'Index', link: '/index' },
                { text: 'Protocol', link: '/protocol' },
            ]
        },
        {
            text: 'Feature',
            base: '/feature',
            collapsed: true,
            items: [
                { text: 'Document Symbol', link: '/document-symbol' },
                { text: 'Folding Range', link: '/folding-range' },
                { text: 'Inlay Hint', link: '/inlay-hint' },
                { text: 'Semantic Tokens', link: '/semantic-tokens' },

            ]
        },
        {
            text: 'Development',
            base: '/develop',
            collapsed: true,
            items: [
                { text: 'Contribution', link: '/contribution' },
                /*            { text: 'Reported Events', link: '/event' },
                           { text: 'Message Types', link: '/msg' },
                           { text: 'Plugin Development', link: '/plugin' },
                           { text: 'File Handling', link: '/file' },
                           {
                               text: 'Full API Definition',
                               base: '/develop/api',
                               collapsed: false,
                               items: [
                                   { text: 'API', link: '/doc' },
                                   { text: 'Types', link: '/type' }
                               ]
                           } */
            ]
        },
        /*        {
                   text: 'Protocol',
                   base: '/onebot',
                   collapsed: true,
                   items: [
                       { text: 'Protocol Overview', link: '/index' },
                       { text: 'Network Communication', link: '/network' },
                       { text: 'Basic Event Structure', link: '/basic_event' },
                       { text: 'Event Field Details', link: '/event' },
                       { text: 'Basic API Interface', link: '/api' },
                       { text: 'Message Element Definition', link: '/sement' }
                   ]
               },
               {
                   text: 'Others',
                   base: '/other',
                   collapsed: true,
                   items: [
                       { text: 'Security', link: '/security' },
                       { text: 'Contact', link: '/about' }
                   ]
               }, */
    ]
}