<template>
  <h3>Test basic 👀</h3>
  <nav>
    <router-link to="/test/logical-reuse/mouse-position"
      >鼠标位置1.0
    </router-link>
    <router-link to="/test/logical-reuse/mouse-position-temp"
      >鼠标位置2.0
    </router-link>
    <router-link to="/test/logical-reuse/mouse-position-temp2"
      >鼠标位置3.0
    </router-link>
  </nav>
  <main><router-view /></main>
</template>
<script setup lang="ts"></script>
