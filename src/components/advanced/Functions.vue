<template>
  <a-form @submit.prevent="submitForm" layout="vertical">
    <a-form-item label="Email">
      <a-input v-model:value="email" placeholder="Input your email" />
    </a-form-item>

    <a-form-item label="Password">
      <a-input
        v-model:value="password"
        type="password"
        placeholder="Enter password"
      />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { ref } from "vue";

const email = ref<string>("");
const password = ref<string>("");

const emit = defineEmits<{
  (e: "submit", payload: { email: string; password: string }): void;
}>();

function submitForm() {
  if (!email.value || !password.value) {
    console.log("校验失败：", email.value, password.value);
    return;
  }
  console.log("成功", email.value, password.value);
  emit("submit", {
    email: email.value,
    password: password.value,
  });
}
</script>
