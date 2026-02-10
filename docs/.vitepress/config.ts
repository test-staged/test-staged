import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "test-staged",
  description: "Run tests for your staged files. Zero config.",
  base: "/test-staged/",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/test-staged/test-staged' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Why test-staged?', link: '/guide/why' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Supported Runners', link: '/guide/runners' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/test-staged/test-staged' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present'
    }
  }
})
