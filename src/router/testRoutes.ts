import type { RouteRecordRaw } from "vue-router";

export const testBasicRoutes: Array<RouteRecordRaw> = [
  {
    path: "eventProcess",
    component: () => import("@testBasic/EventProcess.vue"),
  },
  {
    path: "formInputBind",
    component: () => import("@testBasic/FormInputBind.vue"),
  },
  {
    path: "watchFunc",
    component: () => import("@testBasic/watchFunc.vue"),
  },
];

export const testAdvancedRoutes: Array<RouteRecordRaw> = [];
