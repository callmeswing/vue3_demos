import type { RouteRecordRaw } from "vue-router";
import {
  testBasicRoutes,
  testAdvancedRoutes,
  testLogicalReuseRoutes,
} from "./testRoutes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@views/Home.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@views/Test.vue"),
    children: [
      {
        path: "basic",
        component: () => import("@views/TestBasic.vue"),
        children: testBasicRoutes,
      },
      {
        path: "advanced",
        component: () => import("@views/TestAdvanced.vue"),
        children: testAdvancedRoutes,
      },
      {
        path: "logical-reuse",
        component: () => import("@views/TestLogicalReuse.vue"),
        children: testLogicalReuseRoutes,
      },
    ],
  },
];

export default routes;
