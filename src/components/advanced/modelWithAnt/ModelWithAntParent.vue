<template>
  <p>default modelValue bind with pText: {{ pText }}</p>
  <p>naming prop my-value bind with pText2: {{ pText2 }}</p>
  <ModelWithAnt
    v-model.capitalize="pText"
    v-model:my-value.capitalize="pText2"
  ></ModelWithAnt>
</template>
<script setup lang="ts">
import ModelWithAnt from "./ModelWithAnt.vue";
import { ref } from "vue";

const pText = ref("default text one");
const pText2 = ref("default text two");
</script>
