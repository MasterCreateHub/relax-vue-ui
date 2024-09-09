module.exports = {
  theme: "",
  title: "Relax UI",
  description: "基于Element库二次封装的组件库",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "组件", link: "/components/" },
    ],
    sidebar: {
      "/guide/": [""],
      "/components/": [
        {
          title: "组件概览",
          collapsable: false,
          sidebarDepth: 2,
          children: ['/components/']
        },
        {
          title: "列表页组件",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/components/searcher", "/components/converter"],
        },
      ],
    },
  },
  head: [],
  markdown: {},
};
