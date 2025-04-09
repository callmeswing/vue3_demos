<template>
  <P>AttrsDemo</P>
  <div v-bind="$attrs" @click="greet">test div</div>
</template>
<script setup lang="ts">
import { useAttrs } from "vue";
console.log(useAttrs());

function greet() {
  alert("3,2,1...");
}
</script>
