<template>
  <h2>This is vue3 test views O(∩_∩)O</h2>
  <nav>
    <router-link to="/test/basic">basic </router-link>
    <router-link to="/test/advanced">advanced </router-link>
    <router-link to="/test/logical-reuse">logical-reuse </router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>
<script setup lang="ts"></script>
