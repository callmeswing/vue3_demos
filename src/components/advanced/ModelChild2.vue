<template>
  <div>默认的modelValue</div>
  <input type="text" v-model="myModel" />

  <div>自定义的model</div>
  <input type="text" v-model="myModel2" />
</template>

<script setup lang="ts">
// 💡自定义并处理v-model修饰符
// 解构defineModel中的model和修饰符，这里的myModel只是普通的变量名称，define出来的prop依然是modelValue
/**
 * 💡通过set、get对自定义的修饰符逻辑进行完善  GPT是这样解释的：
 *      get：控制从 prop 读取值（也就是父组件传下来的值要不要加工一下）
 *      set：控制写回 prop 时的值（也就是子组件更新值时是否做一些处理）
 */
// ❗但是如果我们使用的是a-标签，以下逻辑便会失效 这里还稍微有些复杂，单列一个组件出来操作
const [myModel, myModifiers] = defineModel({
  set(value: string) {
    if (myModifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  },
});
console.log(
  "----------------------------- 默认的：-----------------------------"
);
console.log(myModel);
console.log(myModifiers);
const [myModel2, myModifiers2] = defineModel("my-value", {
  get(value: string) {
    if (myModifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  },
});
console.log(
  "----------------------------- 自定义的：-----------------------------"
);
console.log(myModel2);
console.log(myModifiers2);
</script>
