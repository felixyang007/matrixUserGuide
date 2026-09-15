import { UserConfig } from 'vitepress'
import anchor from 'markdown-it-anchor'
import { jumpToNewURL } from './theme/helper'
import initCNThemeConfig from './config.cn'
import initENThemeConfig from './config.en'
import { LOCALE } from './theme/config/locale'

// 社交链接配置（导航栏右侧）
const socialLinks = [
  { icon: 'github', link: 'https://github.com/felixyang007' }
]

enum LocalePathMap {
  CN = '/',
  EN = '/en/'
}

export default {
  locales: {
    [LocalePathMap.CN]: {
      lang: LOCALE.ZH_CN,
      title: 'Matrix',
      titleTemplate: '云真机测试平台',
      description:
        '基于 Sonic 二次开发的云真机测试平台，用心打造更好的使用体验。 Made with 🧡 by Plaud Matrix团队.'
    },
    [LocalePathMap.EN]: {
      lang: LOCALE.EN_US,
      title: 'Matrix',
      titleTemplate: 'Cloud device testing platform',
      description:
        'A cloud device testing platform built on top of Sonic. Made with 🧡 by Plaud Matrix team.'
    }
  },
  srcDir: 'src',
  scrollOffset: 'header',
  lastUpdated: true, // 是否显示最后修改时间
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/felixyang007/matrixUserGuide/main/.vitepress/theme/assets/public/favicon.ico' }],
    ['meta', { name: 'baidu-site-verification', content: 'code-tUj7cN37g6' }],
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'HwNpVEj6BjJmFVXELaQntnPP3OLpAfvnt_fyVmi3dUo'
      }
    ],
    [
      'meta',
      {
        'http-equiv': 'pragma',
        content: 'no-cache'
      }
    ],
    [
      'meta',
      {
        'http-equiv': 'cache-control',
        content: 'no-cache, no-store, must-revalidate'
      }
    ],
    [
      'meta',
      {
        'http-equiv': 'expires',
        content: '0'
      }
    ],
    [
      'meta',
      {
        name: 'keywords',
        content: 'Matrix,云真机,Matrix云真机,Matrix云测,Matrix平台,Matrix测试'
      }
    ],
    [
      'script',
      {},
      `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2962395,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
    ],
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?1e96d2d989cfa5aae34ddc9c5d4a7bdf";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();`
    ],
    ['script', {}, jumpToNewURL()]
  ],

  themeConfig: {
    // 社交链接
    socialLinks,
    // 国际化配置
    localeLinks: {
      items: [
        { text: '简体中文', link: LocalePathMap.CN },
        { text: 'English', link: LocalePathMap.EN }
      ]
    },
    locales: {
      [LocalePathMap.CN]: initCNThemeConfig,
      [LocalePathMap.EN]: initENThemeConfig
    },

    // 网站 logo & title
    logo: 'https://raw.githubusercontent.com/felixyang007/matrixUserGuide/main/.vitepress/theme/assets/logo-full.png',
    // 是否显示副标题
    siteTitle: false
  },

  // vite config
  vite: {
    server: {
      host: true
    }
  },

  // @TBD 未生效
  // markdown render config
  markdown: {
    // options for markdown-it-anchor
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    // anchor: {
    //   permalink: anchor.permalink.headerLink()
    // },

    // options for @mdit-vue/plugin-toc
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    // toc: { level: [1, 2, 3] },

    config: (md) => {
      // use more markdown-it plugins!
      md.use(anchor, {
        level: 6
      })
    }
  }
} as UserConfig
