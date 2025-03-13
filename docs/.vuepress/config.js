const path = require('path');

module.exports = {
  theme: "",
  base: "/relax-vue-ui/",
  title: "Relax Vue UI",
  description: "基于Element库二次封装的组件库",
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "组件", link: "/component/" },
      { text: "指令", link: "/directive/" },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "指南",
          collapsable: false,
          sidebarDepth: 2,
          children: ['/guide/']
        },
      ],
      "/component/": [
        {
          title: "概览",
          collapsable: false,
          sidebarDepth: 2,
          children: ['/component/', "/component/changelog"]
        },
        {
          title: "列表相关组件",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/component/searcher", "/component/table", "/component/toolbar", "/component/pagination"],
        },
        {
          title: "详情相关组件",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/component/converter", "/component/descriptions", "/component/detail",],
        },
        {
          title: "表单相关组件",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/component/form", "/component/workbench"],
        },
      ],
      "/directive/": [
        {
          title: "概览",
          collapsable: false,
          sidebarDepth: 2,
          children: ['/directive/', "/directive/changelog"]
        },
        {
          title: "指令",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/directive/measure", "/directive/readonly", "/directive/disabled"],
        },
      ],
    },
  },
  plugins: ['demo-container'],
  chainWebpack: config => {
    config.plugin('provide').use(require('webpack').ProvidePlugin, [{
      ResizeObserver: ['resize-observer-polyfill', 'default']
    }]);

    config.resolve.alias
      .set('@', path.resolve(__dirname, '../../src'))
      .set('@packages', path.resolve(__dirname, '../../packages'))
  }
};