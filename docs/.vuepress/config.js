module.exports = {
  theme: "",
  title: "Relax UI",
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
      "/guide/": [""],
      "/component/": [
        {
          title: "组件概览",
          collapsable: false,
          sidebarDepth: 2,
          children: ['/component/']
        },
        {
          title: "列表相关组件",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/component/searcher", "/component/table", "/component/toolbar", "/component/pagintion"],
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
          title: "指令概览",
          collapsable: false,
          sidebarDepth: 2,
          children: ['/directive/']
        },
        {
          title: "所有指令",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/directive/measure", "/directive/emerge", "/directive/readonly", "/directive/disabled"],
        },
      ],
    },
  },
  head: [],
  plugins: ['demo-container'],
  markdown: {},
};
