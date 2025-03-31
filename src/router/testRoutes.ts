import type { RouteRecordRaw } from "vue-router";

export const testBasicRoutes: Array<RouteRecordRaw> = [
  {
    path: "computedFunc",
    component: () => import("@testBasic/ComputedFunc.vue"),
  },
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
    component: () => import("@testBasic/WatchFunc.vue"),
  },
  {
    path: "watchCleanup",
    component: () => import("@testBasic/WatchCleanup.vue"),
  },
  {
    path: "templateRef",
    component: () => import("@testBasic/TemplateRef.vue"),
  },
  {
    path: "templateBasic",
    component: () => import("@testBasic/TemplateBasic.vue"),
  },
  {
    path: "dynamicComp",
    component: () => import("@testBasic/DynamicComp.vue"),
  },
];

export const testAdvancedRoutes: Array<RouteRecordRaw> = [];
