import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/form",
    name: "form",
    component: () => import("../views/FormView.vue"),
  },
  {
    path: "/table",
    name: "table",
    component: () => import("../views/TableView.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/DetailView.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
