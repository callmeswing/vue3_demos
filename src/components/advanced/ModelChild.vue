<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="updateModel">Increment</button>
  <div>Parent bound v-model (Title) is: {{ title }}</div>
  <div>name: {{ firstName }} {{ lastName }}</div>
</template>
<script setup lang="ts">
// defineModel 返回一个Ref，与普通Ref区别在于可以起到父组件与当前变量的双向绑定
// 		它的.value与父组件的v-model值同步
//		当它被子组件修改时，父组件绑定的值一起更新（同步嘛）

// defineModel 选项：1.赋默认值 2.要求必填
const model = defineModel<number>({ default: 0, required: true });
function updateModel() {
  model.value++;
}

// defineModel默认绑定的是modelValue 如需指定prop 使用第一个参数
// 还需要使用选项，放在命名参数后
// 父组件未传递title的时候，会显示默认值
const title = defineModel<string>("title", { default: "defaultTitle" });

// 多个命名defineModel
const firstName = defineModel<string>("fiestName", { default: "dai" });
const lastName = defineModel<string>("lastName", { default: "swing" });
</script>
