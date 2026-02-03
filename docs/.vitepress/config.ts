import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "test-staged",
  description: "Run tests for your staged files. Zero config.",
  base: "/test-staged/",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/alan-schio/test-staged' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Supported Runners', link: '/guide/runners' },
          { text: 'Configuration', link: '/guide/configuration' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alan-schio/test-staged' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present'
    }
  }
})
