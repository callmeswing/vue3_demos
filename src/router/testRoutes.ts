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

export const testAdvancedRoutes: Array<RouteRecordRaw> = [
  {
    path: "componentRegistration",
    component: () => import("@testAdvanced/CompRegistration.vue"),
  },
  {
    path: "props",
    component: () => import("@testAdvanced/Props.vue"),
  },
  {
    path: "functions",
    component: () => import("@testAdvanced/Functions.vue"),
  },
  {
    path: "slots",
    component: () => import("@testAdvanced/Slots.vue"),
  },
  {
    path: "models",
    component: () => import("@testAdvanced/Models.vue"),
  },
  {
    path: "modelsWithAnt",
    component: () =>
      import("@testAdvanced/modelWithAnt/ModelWithAntParent.vue"),
  },
  {
    path: "attrs",
    component: () => import("@testAdvanced/Attrs.vue"),
  },
  {
    path: "provider",
    component: () => import("@testAdvanced/injection/Provider.vue"),
  },
  {
    path: "asyncComp",
    component: () => import("@testAdvanced/AsyncCompTest.vue"),
  },
];

export const testLogicalReuseRoutes: Array<RouteRecordRaw> = [
  {
    path: "mouse-position",
    component: () => import("@testLogicalReuse/mousePosition.vue"),
  },
  {
    path: "mouse-position-temp",
    component: () => import("@testLogicalReuse/mousePositionTemplate.vue"),
  },
  {
    path: "mouse-position-temp2",
    component: () => import("@testLogicalReuse/mousePositionTemplate2.vue"),
  },
];
