import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  description: '基于NTQQ现代化协议端Bot框架',

  themeConfig: {
    nav: nav(),

    sidebar: sidebarGuide(),

    editLink: {
      pattern: 'https://仓库/edit/main/src/:path',
      text: '在 GitHub 上编辑此页面'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'quick start',
      link: '/guide/start-install',
      activeMatch: '/guide/'
    },
    {
      text: '关于',
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
        { text: 'Menu', link: '/start' },// 可以考虑做一个导航页
        { text: 'What is clice', link: '/clice' },
        {
          text: 'Install',
          base: '/guide/boot',
          collapsed: false,
          items: [
            { text: 'build', link: '/build' },
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
        { text: '基础配置', link: '/basic' },
        { text: '高级配置', link: '/advanced' }
      ]
    },
    {
      text: '使用',
      base: '/use',
      collapsed: true,
      items: [
        { text: '接入框架', link: '/integration' },
        { text: '社区资源', link: '/community' }
      ]
    },
    {
      text: '开发',
      base: '/develop',
      collapsed: true,
      items: [
        { text: '请求接口', link: '/api' },
        { text: '上报事件', link: '/event' },
        { text: '消息类型', link: '/msg' },
        { text: '本体开发', link: '/plugin' },
        { text: '处理文件', link: '/file' },
        {
          text: '完整接口定义',
          base: '/develop/api',
          collapsed: false,
          items: [
            { text: '接口', link: '/doc' },
            { text: '类型', link: '/type' }
          ]
        }
      ]
    },
    {
      text: '协议',
      base: '/onebot',
      collapsed: true,
      items: [
        {
          text: '协议概述',
          link: '/index'
        },
        {
          text: '网络通讯',
          link: '/network'
        },
        {
          text: '事件基础结构',
          link: '/basic_event'
        },
        {
          text: '事件字段详情',
          link: '/event'
        },
        {
          text: '接口基础接口',
          link: '/api'
        },
        {
          text: '消息元素定义',
          link: '/sement'
        }

      ]
    },
    {
      text: '其余',
      base: '/other',
      collapsed: true,
      items: [
        {
          text: '安全',
          link: '/security'
        },
        {
          text: '联系',
          link: '/about'
        }
      ]
    },
  ]
}
