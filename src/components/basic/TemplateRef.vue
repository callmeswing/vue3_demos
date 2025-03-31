<template>
  <div>
    <p>model: {{ inputValue }}</p>
    <input
      type="text"
      ref="myInput"
      placeholder="input here"
      v-model="inputValue"
    />
  </div>
  <div>
    <ul>
      <li v-for="item in list" ref="listRefs">{{ item }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

// 以下案例使用的是3.5版本之前的方法，3.5引入的useTemplateRef()可以简化
// 实测：3.5之后也可以使用之前的古早方法

const myInput = ref<HTMLInputElement | null>(null);
const inputValue = ref("");

onMounted(() => {
  // JS/TS 可选链（Optional Chaining) 方式	替代if，如果value不是null、undefined则调用focus
  if (myInput.value) {
    myInput.value.focus();
    console.log("聚焦成功");
  } else {
    console.log("聚焦失败");
  }
});

const list = ref(["Y.M.C.A", "Vienna", "Escapist"]);
const listRefs = ref([]);
onMounted(() => {
  console.log(list.value);
  console.log(listRefs.value);
});

// 💡 组件上的Ref 以及对象的defineExpose()这里未做demo
</script>
