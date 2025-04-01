<template>
  <h3>nothings here right now ~</h3>
  <nav>
    <router-link to="/test/advanced/componentRegistration"
      >组件注册
    </router-link>
    <router-link to="/test/advanced/props">props细节 </router-link>
    <router-link to="/test/advanced/functions">function细节 </router-link>
    <br />
    <router-link to="/test/advanced/slots">slots 细节 </router-link>
  </nav>
  <main><router-view /></main>
</template>
<script setup lang="ts"></script>
