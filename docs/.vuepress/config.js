module.exports = {
  theme: "",
  title: "Relax UI",
  description: "基于Element库二次封装的组件库",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "组件", link: "/component/" },
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
          title: "列表页组件",
          collapsable: false,
          sidebarDepth: 2,
          children: ["/component/searcher", "/component/converter"],
        },
      ],
    },
  },
  head: [],
  plugins: ['demo-container'],
  markdown: {},
  // configureWebpack: config => {
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: [
  //       'vue-style-loader',
  //       'css-loader',
  //       {
  //         loader: 'sass-loader',
  //         // 可以在这里添加更多关于 sass-loader 的选项
  //         options: {
  //           implementation: require('sass'), // 使用 dart-sass 实现
  //           // indentedSyntax: true, // 如果你想用 .scss 而不是 .sass
  //         },
  //       },
  //     ],
  //   });
  // },
};
