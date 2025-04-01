<template>
  <ul>
    <li v-if="!items.length">Loading...</li>
    <li v-for="item in items">
      <!-- 具名插槽多次利用 name的item是字面量 v-bind的item是对向型式的传递props-->
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 没用到
// const props = defineProps(["api-url", "per-page"]);

type Item = {
  body: string;
  username: string;
  likes: number;
};

const items = ref<Item[]>([]);

// mock remote data fetching
setTimeout(() => {
  items.value = [
    { body: "Scoped Slots Guide", username: "Evan You", likes: 20 },
    { body: "Vue Tutorial", username: "Natalia Tepluhina", likes: 10 },
  ];
}, 3000);
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 5px;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
}
li {
  padding: 5px 20px;
  margin: 10px;
  background: #fff;
}
</style>
