import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/list",
    name: "list",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ListView.vue"),
  },
  {
    path: "/form",
    name: "form",
    component: () => import("../views/FormView.vue"),
  },
  {
    path: "/tool",
    name: "tool",
    component: () => import("../views/ToolView.vue"),
  },
  {
    path: "/table",
    name: "table",
    component: () => import("../views/TableView.vue"),
  },
  {
    path: "/work",
    name: "work",
    component: () => import("../views/WorkView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
