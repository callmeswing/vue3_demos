<template>
  <div>
    <AsyncCompFancyButton v-if="visible"></AsyncCompFancyButton>
    <!-- 模板会自动解包ref 不要忘记❗ -->
    <button @click="visible = !visible">{{ visible ? "Hide" : "Show" }}</button>
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";

// 💡了解静态导入、动态导入、动态导入懒加载 以及Vite等工具的特殊处理(代码分割等)
// const AsyncCompPromise = defineAsyncComponent(() => {
//   return new Promise((resolve, reject) => {
//     // ... 从服务器获取组件
//     resolve(/* 获取到的组件 */);
//   });
// });
// defineAsyncComponent 方法接收一个返回 Promise 的加载函数。这个 Promise 的 resolve 回调方法应该在从服务器获得组件定义时调用。你也可以调用 reject(reason) 表明加载失败。

// ES模块动态导入也是返回一个Promise，这是更常用的方式❗
const AsyncCompFancyButton = defineAsyncComponent(
  () => import("./FancyButton.vue")
);
const visible = ref(false);

// 💡 同样可以全局注册在main.ts中  app.component('myComp', defineAsyncComponent(()=>import('...')))

// 💡 加载状态、错误状态
// const AsyncComp = defineAsyncComponent({
//   // 加载函数
//   loader: () => import("./FancyButton.vue"),

//   // 加载异步组件时使用的组件
//   loadingComponent: LoadingComponent,
//   // 展示加载组件前的延迟时间，默认为 200ms		这个是为了避免加载太快 组件之间快速切换导致页面闪烁❗
//   delay: 200,

//   // 加载失败后展示的组件
//   errorComponent: ErrorComponent,
//   // 如果提供了一个 timeout 时间限制，并超时了
//   // 也会显示这里配置的报错组件，默认值是：Infinity
//   timeout: 3000,
// });

// 💡惰性激活 需要用到服务器端渲染SSR的时候才适用.. so 暂未查看
</script>
