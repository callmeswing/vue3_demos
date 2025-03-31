<template>
  <h3>blogs here</h3>
  <h4>{{ title }}</h4>
  <!-- 实测，即便没有通过defineEmits声明的事件 可以直接通过模板中$emit触发-->
  <!-- so 为什么要define呢？ 代码可读性更强，支持 TypeScript 类型检查，Vue DevTools 可识别-->
  <!-- <a-button @click="$emit('enlarge-text')">Enlarge text</a-button> -->
</template>
<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
