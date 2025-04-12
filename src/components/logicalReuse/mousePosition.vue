<template>
  <div>
    <p>Mouse position now is : {{ x }} : {{ y }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 这个是个单独的组件，解析来我们用mouse.ts对其进行封装以实现复用

const x = ref(0);
const y = ref(0);

function update(event: MouseEvent) {
  x.value = event.pageX;
  y.value = event.pageY;
}

onMounted(() => {
  window.addEventListener("mousemove", update);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", update);
});

// 接下来进行修改，进一步拆分event.ts 将事件监听逻辑拆分出去
</script>
