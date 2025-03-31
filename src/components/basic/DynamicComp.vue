<template>
  <div class="demo">
    <!-- ES6解构语法 (value，key) in obj  用不到的属性但是需要占位 用_替代 -->
    <!-- 由于这里是组件 所以value是对应组件 key是组件名称 -->
    <a-button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </a-button>
    <!-- 特殊属性is实现动态组件 -->
    <component :is="tabs[currentTab]" class="tab"></component>
  </div>
</template>

<script setup lang="ts">
import AlterBox from "./AlterBox.vue";
import BlogPost from "./BlogPost.vue";
import { ref } from "vue";

const tabs = {
  AlterBox,
  BlogPost,
};

// 解决component的动态is报错
// keyof typeof tabs：获取 tabs 对象的所有键，等效于 "AlterBox" | "BlogPost"
const currentTab = ref<keyof typeof tabs>("AlterBox");
</script>

<style>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
