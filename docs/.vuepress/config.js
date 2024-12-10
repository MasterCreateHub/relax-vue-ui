module.exports = {
  theme: "",
  title: "Relax UI",
  description: "基于Element库二次封装的组件库",
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
          title: "工具组件",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/component/searcher", "/component/toolbar", "/component/pagintion", "/component/workbench"],
        },
        {
          title: "展示组件",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/component/converter", "/component/descriptions", "/component/detail", "/component/table"],
        },
        {
          title: "表单组件",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/component/form"],
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
          title: "指令",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/directive/measure"],
        },
        {
          title: "指令",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/directive/print"],
        },
        {
          title: "指令",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/directive/copy"],
        },
      ],
    },
  },
  head: [],
  plugins: ['demo-container'],
  markdown: {},
};
