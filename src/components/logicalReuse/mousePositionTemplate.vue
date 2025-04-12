<template>
  <div>
    <p>Mouse position is at: {{ x }}, {{ y }}</p>
  </div>
</template>
<script setup lang="ts">
import { useMouse } from "./mouse";

const { x, y } = useMouse();
</script>
