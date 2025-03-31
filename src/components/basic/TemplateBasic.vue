<template>
  <hr />
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="blogName in blogNames"
      :title="blogName.title"
      :key="blogName.id"
    />
    <!-- @enlarge-text="postFontSize += 0.1" -->
    <a-button @click="postFontSize += 0.1">Enlarge text</a-button>
    <a-button @click="postFontSize -= 0.1">Shrink text</a-button>
    <hr />
  </div>
  <div>
    <alter-box>This is not good!</alter-box>
    <hr />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import BlogPost from "./BlogPost.vue";
import AlterBox from "./AlterBox.vue";

const blogNames = ref([
  { id: 1, title: "Voice for voiceles" },
  { id: 2, title: "1959" },
  { id: 3, title: "墓碑" },
]);

const postFontSize = ref(1);
</script>
