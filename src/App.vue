<script setup lang="ts"></script>

<template>
  <nav>
    <router-link to="/home">Home </router-link>
    <router-link to="/test">Test </router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
