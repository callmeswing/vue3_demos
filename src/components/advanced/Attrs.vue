<template>
  <div>
    <p>attrs.vue</p>
    <AttrsDemo style="border: solid black" @click="greet"></AttrsDemo>
  </div>
</template>
<script setup lang="ts">
import AttrsDemo from "./AttrsDemo.vue";

function greet() {
  alert("Take down ccp");
}

/**
 *  💡'透传Attributes' 指的是'传递给一个组件，却没有被组件以声明props或emits的型式接收的attribute
 *  ❓组件接收的attribute挂载在哪里：如果组件只有1个根标签，则放置于根节点上  ❗如果声明了对应prop，当然就被prop接收了
 *  ❗style、class 会与原本根节点的style、class合并
 *  ❗v-on 监听器 也会被继承到根节点上！根节点被点击(@click为例)也会触发父组件事件，如果根节点自己也有绑定的事件，都会触发！
 *
 *  💡atrtribute 的 深层继承：
 *       如果一个被传递attrs的组件根节点是另一个组件，attrs会直接传递给这个组件
 *       需要注意：透传的attrs如果符合声明的props或emits在这 两个层次传递中 遇到即被消费掉！
 *  ❓如何禁用继承：
 *       在组件内部设置defineOptions的选项 👇下面有示例
 *       什么场景会有需求：只有一个根节点，但是attrs需要用到别的元素上而非根节点
 *       如何访问：模板表达式中使用 $attrs，通常是：{{ $attrs }}
 *      ❗两处细节需要注意：
 *            1. 不同于props，透传的attribute保留原始大小写 所以如果传递的是 foo-bar ，访问就是$attrs['foo-bar']
 *            2. v-on事件会暴露为一个函数 所以如果是@click ， 访问就是$attrs.onClick
 *
 */

// 禁用继承
// defineOptions({
//   inheritAttrs: false,
// });

// 需要将所有透传的attrs都应用在一个内部标签而非根标签
// Tips：没有参数的v-bind会将对象的所有属性作为attrs挂载到标签上
// <div class="btn-wrapper">
//   <button class="btn" v-bind="$attrs">Click Me</button>
// </div>

/**
 * 💡所以多个根节点的时候呢？多根节点的组件没有自动透传attributes的行为
 *      如果在子组件中没有显式绑定$attrs，会出现运行时警告
 */

// 多根节点显式绑定$attrs，将attrs绑定到main标签中
// <header>...</header>
// <main v-bind="$attrs">...</main>
// <footer>...</footer>

/**
 *  💡JS中访问透传attributes，分2种情况
 *        1.使用script setup，通过useAttrs() API
 *        2.不使用script setup，通过setup的第二个参数context
 */

// 情况1：
// import { useAttrs } from 'vue'
// const attrs = useAttrs()

// 情况2：
// export default {
//   setup(props, ctx) {
//     // 透传 attribute 被暴露为 ctx.attrs
//     console.log(ctx.attrs)
//   }
// }

// ❗注意：
//      虽然这里的 attrs 对象总是反映为最新的透传 attribute，但它并不是响应式的 (考虑到性能因素)。所以你不能通过侦听器去监听它的变化。
//      如果你需要响应性，可以使用 prop。或者你也可以使用 onUpdated() 使得在每次更新时结合最新的 attrs 执行副作用
</script>
