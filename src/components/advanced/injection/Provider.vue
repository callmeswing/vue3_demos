<template>
  <p>provider</p>
  <p>str in provider is : {{ refStr }}</p>
  <div>
    <MiddleComp></MiddleComp>
  </div>
</template>
<script setup lang="ts">
import { provide, readonly, ref } from "vue";
import MiddleComp from "./MiddleComp.vue";
// 💡依赖注入需求：解决深层组件需要较高层级组件的数据问题，（你总不能逐级传递prop下去把）
// ❗解决方案：provide提供、inject注入

// script setup中直接使用，❗非语法糖场景下 确保在setup()中同步调用
// 第一个参数 除了字符串还可以是Symbol❗
provide(/* name */ "message", /* value */ "make people feel loved today~");

// ❗直接在应用层提供依赖 可以在main.ts中直接app.provide()

// 响应式数据示例：
const refStr = ref("default ref string");
// 响应式数据修改
function changRefStr(newStr: string) {
  if (typeof newStr !== "string" || !newStr.trim()) {
    window.alert("invalid new string");
    refStr.value = "you stupid ";
    return;
  }
  console.log("valid new string : " + newStr);
  refStr.value = newStr;
}

provide("refStr", refStr);
provide("changeRefStr", changRefStr);

// readonly() 包装值，确保不会被注入方修改，如👇
const count = ref(0);
provide("count", readonly(count));

//❗ 大型项目可以使用symbol作为注入key避免潜在冲突
</script>
