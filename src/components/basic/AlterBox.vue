<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong><br />
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.alert-box {
  color: #666;
  border: 1px solid red;
  border-radius: 4px;
  padding: 20px;
  background-color: #383838;
}

strong {
  color: red;
}
</style>
