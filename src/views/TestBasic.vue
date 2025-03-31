<template>
  <h3>Test basic 👀</h3>
  <nav>
    <router-link to="/test/basic/computedFunc">计算属性 </router-link>
    <router-link to="/test/basic/eventProcess">事件处理 </router-link>
    <router-link to="/test/basic/formInputBind">表单绑定 </router-link>
    <router-link to="/test/basic/watchFunc">侦听器 </router-link>
    <router-link to="/test/basic/watchCleanup">侦听-取消副作用 </router-link
    ><br />
    <router-link to="/test/basic/templateRef">模板引用 </router-link>
    <router-link to="/test/basic/templateBasic">组件基础 </router-link>
    <router-link to="/test/basic/dynamicComp">动态组件 </router-link>
  </nav>
  <main><router-view /></main>
</template>
<script setup lang="ts"></script>
