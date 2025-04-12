<template>
  <div>
    <p>Mouse position now is : {{ x }} : {{ y }}</p>
  </div>
</template>
<script setup lang="ts">
import { useMouse } from "./mouse2";

/*
 * 关于这里三个重载的function
 * 实际被引入的，是最后那个“实现函数”。
 * 前面两个是 类型重载签名（仅用于类型推导），它们 不会在运行时代码中存在，只在 编译阶段参与类型推导。
 */

const { x, y } = useMouse();
</script>
