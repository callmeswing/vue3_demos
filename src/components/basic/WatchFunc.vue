<template>
  <div>
    <p>
      Ask a yes/no question:
      <input v-model="question" :disabled="loading" />
    </p>
    <p>{{ answer }}</p>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from "vue";

// 先前掌握了计算属性：声明式的计算衍生值，可以看作是一种状态变化
/**
 *  侦听器用途：
 *    1.在状态变化时，执行一些副作用，比如修改DOM
 *    2.根据异步操作结果做一些修改
 *
 *  watch函数 组合式API(选项式是选项写法)
 *    用途：在每次响应式状态发生变化时触发回调函数
 **/

const question = ref("");
const answer = ref("Questions usually contain a question mark like ?");
const loading = ref(false);

// watch 监听question
watch(question, async (newQuestion, _oldQuestion) => {
  if (newQuestion.includes("?")) {
    loading.value = true;
    answer.value = "Thinking...";
    try {
      const res = await fetch("https://yesno.wtf/api");
      answer.value = (await res.json()).answer;
    } catch (error) {
      answer.value = "Error...";
    } finally {
      loading.value = false;
    }
  }
});

// 深层侦听
// 侦听响应式对象reactive时(ref是响应式引用) ，隐式创建深层侦听器——所有嵌套属性变更时都会触发回调
const obj = reactive({ count: 0, nested: { value: 10 } });
watch(obj, (_newValue, _oldValue) => {
  // 此时监听obj所有内部属性的变化
  // 此时 newValue与oldValue是相等的 是同一个对象(引用)
});

// getter watch
// 仅侦听对应的属性 且只有返回不同对象时才触发回调
watch(
  () => obj.nested,
  () => {
    // 此时只有nested发生变化的时候才会触发回调
    // 而nestd是一个对象，所以仅当nested被替换时才会触发
  }
);

// 手动指定deep 强制转为深层
// Vue3.5开始deep还可以是一个数字 表示最大深度 ( ⚠ 深度侦听开销大 谨慎使用)
watch(
  () => obj.nested,
  () => {},
  { deep: true }
);

// 即时回调
// 创建侦听器时，立即执行一次回调
// 方式同deep一致：{ immediate: true }

// 一次性侦听
// 仅会触发一次的侦听器
// 同上：{ once: true }

// 侦听器的 回调 使用跟 源 完全相同的 响应式状态
// 即下面的监听todoId 回调中也用到了todoId
const todoId = ref(1);
const data = ref(null);
watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
    data.value = await response.json();
    console.log("date: " + data.value);
  },
  { immediate: true }
);

// watchEffect 简写上面的watch
/**
 *  区别：
 *    1.无需指定 自动收集监听依赖 (主要区别 追踪方式不同)
 *    2.初始化时立即执行一次    为什么这样设计：感觉是基于场景考虑 1.需要收集依赖 2.需要确保副作用逻辑(有这样的需求)
 *
 *    官方描述：
 *        如果你需要侦听一个嵌套数据结构中的几个属性，
 *        watchEffect() 可能会比深度侦听器更有效，
 *        因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。
 *    需要注意：
 *        watchEffect 仅会在其同步执行期间，才追踪依赖。
 *        在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。
 *        (这里就跟vue3新增的onWatherCleanup是比较类似的逻辑了)
 */
const todoId1 = ref(1);
const data1 = ref(null);
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId1.value}`
  );
  data1.value = await response.json();
});

// 副作用清理
// 见组件WatchCleanup
</script>
