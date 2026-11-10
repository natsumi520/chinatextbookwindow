import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'

export default defineUserConfig({
    bundler: viteBundler(),
    lang: 'zh-CN',
    title: '教材之窗',
    description: '教材之窗-新旧课本集散地',
    base: '/',
    // 全局Favicon配置
    head: [
        ['link', { rel: 'icon', href: '/logo.png', type: 'image/x-icon' }],
        ['link', { rel: 'apple-touch-icon', href: '/logo.png' }]
    ],

    // 移除全局的slimsearchPlugin注册，避免和主题内置插件冲突
    // 所有搜索配置全部迁移到主题的plugins.slimsearch字段下

    theme: hopeTheme({
        lang: 'zh-CN',
        icon: "/logo.png",
        appleIcon: "/logo.png",
        // 自动侧边栏开启
        autoSidebar: true,
        sidebarIcon: true,

        // 在这里完整迁移所有slimsearch自定义配置
        plugins: {
            slimsearch: {
                indexContent: true,
                customFields: [
                    {
                        getter: (page) => page.title,
                        formatter: 'Title: $content'
                    },
                    {
                        getter: (page) => page.frontmatter.version || '',
                        formatter: '版本: $content'
                    },
                    {
                        getter: (page) => page.frontmatter.stage || '',
                        formatter: '学段: $content'
                    }
                ],
                locales: {
                    '/': {
                        placeholder: '搜索教材、学科、版本...'
                    }
                },
                maxSuggestions: 15
            }
        },

        navbar: [
            { text: "首页", link: "/" },
            {
                text: "学段分类",
                children: [
                    { text: "🎒 小学教材", link: "/primary-school/" },
                    { text: "📘 初中教材", link: "/junior-high/" },
                    { text: "🏛️ 高中教材", link: "/senior-high/" },
                    { text: "⚙️ 中职/职高/中专", link: "/secondary-vocational/" }
                ]
            },
            { text: "📚 教材总库", link: "/library/" },
            { text: "🔬 教材研究", link: "/research/" },
            { text: "⚡ 极速导航", link: "/go.md" }
        ],

        sidebar: {
            '/primary-school/': [
                {
                    text: "小学教材总览",
                    link: "/primary-school/",
                    children: [
                        { text: "语文", link: "/primary-school/chinese/" },
                        { text: "数学", link: "/primary-school/math/" },
                        { text: "英语", link: "/primary-school/english/" },
                        { text: "道德与法治", link: "/primary-school/morality/" },
                        { text: "科学", link: "/primary-school/science/" }
                    ]
                }
            ],
            '/junior-high/': [
                {
                    text: "初中教材总览",
                    link: "/junior-high/",
                    children: [
                        { text: "语文", link: "/junior-high/chinese/" },
                        { text: "数学", link: "/junior-high/math/" },
                        { text: "英语", link: "/junior-high/english/" },
                        { text: "道德与法治", link: "/junior-high/morality/" },
                        { text: "历史", link: "/junior-high/history/" },
                        { text: "地理", link: "/junior-high/geography/" },
                        { text: "物理", link: "/junior-high/physics/" },
                        { text: "化学", link: "/junior-high/chemistry/" },
                        { text: "生物", link: "/junior-high/biology/" }
                    ]
                }
            ],
            '/senior-high/': [
                {
                    text: "高中教材总览",
                    link: "/senior-high/",
                    children: [
                        { text: "语文", link: "/senior-high/chinese/" },
                        { text: "数学", link: "/senior-high/math/" },
                        { text: "英语", link: "/senior-high/english/" },
                        { text: "思想政治", link: "/senior-high/politics/" },
                        { text: "历史", link: "/senior-high/history/" },
                        { text: "地理", link: "/senior-high/geography/" },
                        { text: "物理", link: "/senior-high/physics/" },
                        { text: "化学", link: "/senior-high/chemistry/" },
                        { text: "生物", link: "/senior-high/biology/" }
                    ]
                }
            ],
            '/secondary-vocational/': [
                {
                    text: "中职教材总览",
                    link: "/secondary-vocational/",
                    children: [
                        { text: "公共基础-语文", link: "/secondary-vocational/chinese/" },
                        { text: "公共基础-数学", link: "/secondary-vocational/math/" },
                        { text: "公共基础-英语", link: "/secondary-vocational/english/" },
                        { text: "公共基础-德育", link: "/secondary-vocational/morality/" },
                        { text: "信息技术类", link: "/secondary-vocational/it/" },
                        { text: "电工电子类", link: "/secondary-vocational/electronics/" },
                        { text: "机械制造类", link: "/secondary-vocational/mechanical/" },
                        { text: "医药卫生类", link: "/secondary-vocational/medical/" },
                        { text: "财经商贸类", link: "/secondary-vocational/finance/" },
                        { text: "旅游服务类", link: "/secondary-vocational/tourism/" }
                    ]
                }
            ],
            '/': [
                { text: "🎒 小学教材", link: "/primary-school/" },
                { text: "📘 初中教材", link: "/junior-high/" },
                { text: "🏛️ 高中教材", link: "/senior-high/" },
                { text: "⚙️ 中职/职高/中专教材", link: "/secondary-vocational/" }
            ]
        }
    })
})
