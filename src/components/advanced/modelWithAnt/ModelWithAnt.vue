<template>
  <div>
    <p>test now is: {{ text }}</p>
    <a-input v-model:value="text" />
  </div>
  <div>
    <!-- 继续试一下先前失败了的自定义修饰符 -->
    <p>model</p>
    <a-input v-model:value="model" />
    <p>model2</p>
    <a-input v-model:value="model2" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
/**
 *  之前掌握到的2种使用情况分类：
 *  1. 单纯的组件内部的v-model 其绑定的是所属标签的value属性
 *  2. 父子组件配合时，子组件使用defineModel+父组件使用v-model，其默认的是一个名为modelValue的prop
 *
 *  情况2容易头晕，故在此分析一波：(老实说之前的笔记似乎思路还是错的❗)
 *    <MyInput v-model="value" />
 *  这样将一个本地的变量value的.value以prop的型式传递给了子组件，等价于👇
 *    <MyInput :modelValue="value" @update:modelValue="val => value = val"/>
 *  可以发现，实际是：1.传递了一个名为modelValue的prop 2.接收并处理一个名为update:modelValue的事件
 *  子组件通过defineModel() 实际上是简化了 1个defineProp+1个defineEmits
 *
 *  ❓ 单列出这一案例的缘由是：之前被上述2种案例搞蒙了，然后又遇到使用ant-design-vue样式时a-标签的问题
 *    误把a-input理解为了普通的input，所以认为可以直接v-model
 *    而实际上a-input属于是第三方自定义的组件，也就是一个component，在组件上使用v-model默认是传递modelValue及其update:modelValue
 *    查看AInput的源码可以发现 https://github.com/vueComponent/ant-design-vue/blob/main/components/input/Input.tsx
 *    源码内部(vue3.5 ant-design-vue4.x)可见：
 *      a-标签 以a-input为例
 *      其内部的维护的prop是value(默认v-model传递的是modelValue) 这就是为什么默认方式使用v-model时 a-input标签数据不会响应的原因❗
 *      因此需要这样使用 v-model:value 手动指定prop名称
 */

const text = ref<string>("123");

const [model, modifiers] = defineModel({
  set(value: string) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  },
});
console.log("------------ 默认prop：modelValue 修改了set ------------");
console.log(model);
console.log(modifiers);

const [model2, modifiers2] = defineModel("my-value", {
  get(value: string) {
    if (modifiers2.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  },
});
console.log("------------ 命名prop：my-value 修改了get ------------");
console.log(model2);
console.log(modifiers2);
</script>
