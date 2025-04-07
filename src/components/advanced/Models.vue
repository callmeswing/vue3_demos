<template>
  <ModelChild
    v-model="childModel"
    v-model:fiest-name="firstNameP"
    v-model:last-name="lastNameP"
  ></ModelChild>
  <hr />
  <!-- <ModelChild2 v-model="text"></ModelChild2> -->
  <!-- 👆等价👇 不过这里带了一个自定义的修饰符 .capitalize  ❗不过实测下面这样拿不到modelValue的修饰符-->
  <!-- <ModelChild2 v-model:model-value.capitalize="text"></ModelChild2> -->
  <!-- 👇 默认modelValue 带修饰符 以及 自定义的prop(model) 带修饰符 -->
  <ModelChild2
    v-model.capitalize="text"
    v-model:my-value.capitalize="text2"
  ></ModelChild2>
</template>
<script setup lang="ts">
// v-model 实现组件数据的双向绑定，这个先前已经使用到
// vue 3.4版本提供并推荐使用defineModel的宏，用于组件之间交互的时候！(如果只是绑定组件本身的变量与input等标签不必使用)
import { ref } from "vue";
import ModelChild from "./ModelChild.vue";
import ModelChild2 from "./ModelChild2.vue";
// 当然，父组件的中绑定的变量/常量需要具备响应性
// 这里赋初始值2，子组件中define的默认值0 (按照父组件的值呈现，符合define逻辑)
const childModel = ref(2);
/**
 *  💡 defineModel(此处好像应该是v-model)底层做了什么：
 *            1. 一个名为modelValue的prop(❗这很重要，尤其是名称modelValue)，本地ref的值与其同步
 *            2. 一个名为update: modelValue的事件，本地ref的值发生变更时触发
 *        总结：传递 一个modelValue(prop) 和一个update: modelValue(emit)
 */

const firstNameP = ref("qin");
const lastNameP = ref("sha");
const text = ref("fuck ccp");
const text2 = ref("hello world");
</script>

<!-- 在此之前的实现方式： 👇 -->

<!-- Child.vue -->
<!-- <script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script> -->
<!-- <template>
  <input
   : value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template> -->

<!-- Parent.vue -->
<!-- <Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/> -->
