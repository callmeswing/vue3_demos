<template>
  <p>inject here</p>
  <div>message from the top is: {{ message }}</div>
  <div>messageD is : {{ messageD }}</div>
  <div>
    <p>str in dest is : {{ refStr }}</p>
    <!-- 箭头函数，注册一个回调！事件发生才会执行！ 区别❗如果直接调用函数,会立即执行并把函数结果作为处理函数注册(通常是undefined) -->
    <a-input v-model:value="localStr" @change="() => strChange(localStr)" />
  </div>
</template>
<script setup lang="ts">
import { inject, ref, watch, type Ref } from "vue";

// 同provider 非script setup环境下要在setup()下同步调用
const message = inject("message");
// 默认值，如果继承树上没有组件提供的时候，会采纳默认值
const messageD = inject("messageD", "default by injectTest");

/**
 * 💡 搭配响应式数据的问题：
 *
 *  虽然双方都保持数据响应性的情况下，任何一方都可以变更数据状态！
 *  但是推荐❗任何对数据的更改应该保存在供给方中！可以选择让供给方再提供一个修改的func！
 */

// as 类型断言：手动告知类型
const refStr = inject("refStr") as Ref<string>;
// 也可以建立一个类型并通过as指定 (ts项目应该需要这么做)
type ChangeRefStrFn = (newStr: string) => void;
const strChange = inject("changeRefStr") as ChangeRefStrFn;

// 引入一个local变量而不是v-model直接使用provide提供的refStr
// 因为存在修改Func，避免双向绑定冲突(2套更新机制：1provider中的修改Func，2这里的v-model)❗

// ?. 是可选链式操作，refStr不存在则不继续往下
// ?? 表示如果前面的结果是null或者undefined，则选择后面的值
const localStr = ref(refStr?.value ?? "unknown");

// watch源数据，以防别处修改后本地数据没跟上
// xxx! 非空断言，告知确信xxx存在
watch(refStr!, (newValue) => {
  localStr.value = newValue;
});
</script>
