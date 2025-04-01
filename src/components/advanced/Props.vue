<template>
  <h3>Props部分没有什么可以演示的</h3>
  <p>所以当作笔记 记录一下名称格式(官方推荐)</p>
  <p>组件名称：PascalCase</p>
  <p>props，attribute：kebab-case</p>
  <p>其他，我一律是：camelCase</p>
</template>
<script setup lang="ts">
// import { watch, watchEffect } from "vue";

// 💡props声明
//	1.setup	使用defineProps宏
// defineProps(["name"]);
// const props = defineProps({
//   title: String,
//   likes: Number,
// });

// 	2.非setup 使用props选项 (setup选项接收props为第一个参数)
// export default {
//   props: ["name"],
//   setup(props) {
//     //...
//   },
// };

//	3.optinal api 略

// 💡响应式Props解构 vue3.5
// 方式1
// const { foo1 } = defineProps(["foo1"]);
// watchEffect(() => {
//   // 在 3.5 之前只运行一次
//   // 在 3.5+ 中在 "foo" prop 变化时重新执行
//   console.log(foo1);
// });

// 方式2 等价方式1
// const props = defineProps(["foo2"]);
// watchEffect(() => {
//   // `foo` 由编译器转换为 `props.foo`
//   console.log(props.foo2);
// });

/**
 * ❗重点区别：
 * 		vue3.4及之前的版本，解构出的props视为普通常量(非响应式数据)，因此不会被追踪
 * 		vue3.5及之后，(❗重要前提：)在同一个<script setup> 代码块中解构出来的props，编译器会自动加上props(使其具备响应性)
 * 		如何理解？ vue3的defineProps宏返回的对象props已经是响应式的了，所以：
 * 			核心问题在解构之后是否还存在响应性！(3.5之前最好是手动加上props. 因为解构出来的对象不具备响应式)
 */
// JS原生 默认值语法 声明Props默认值
// const { foo3 = "hello" } = defineProps<{ foo3?: string }>();

/**
 *  ❗重点区别：watch与watchEffect,	普通传参和getter传参
 * 		首先，watch与watchEffect不同：watch传递明确的侦听对象，effect自动收集侦听依赖对象(但是他们都要求对象是具备响应性的)
 * 		再来，根据上面的内容我们已经知道了defineProps声明的props本身就具备响应性，只是在先前的版本中，解构会使其丢失响应性
 * 		然后，传参不同：在watch中，直接传递props.foo或者foo不行，需要通过getter的型式！
 * 		那么你会疑惑：foo本身已经具备响应性了！至少props.foo你也得行把？为什么还得拐个弯去通过getter才能满足条件？？？
 *
 * 		好，继续！
 * 		首先defineProps底层是通过reactive()实现的响应式包装。只读的(这里跟reactive有小区别)响应式对象，通过Proxy实现响应式追踪
 * 			defineProps() 返回的对象 ≈ readonly(reactive(props)) 	官方术语：响应式的只读代理
 *
 * 		那么回顾watch监听reactive对象
 * 			如果是整个reactive对象，直接传入对象即可
 * 			如果监听的是对象的某个属性，也是getter传参(与这里一致)
 *
 * 		所以 why？
 * 		因为watch接受的参数要求是ref、reactive或者getter型式(通过getter型式去收集其内部的响应式参数 其实也是要求数据本身具备响应性)
 *		而foo，或者reactive对象的某个属性，会被当做静态值！而不是响应式对象 (通过getter vue可以知道这个静态值依赖的对象是foo，而foo具备响应性 可以被追踪！)
 *
 *	  	所以需要这么写👇
 */
// watch(
//   () => props.foo3,
//   () => {}
// );

// 💡单项数据流 props向下传递，设计上也应该遵循，如果在子组件修改会抛出只读警告！
// 		对象、数组型式的props，内部的属性和值其实是可以修改的(因为传递的是引用)，vue没有进行规避因为代价过高，所以需要coder自己尽量遵循！

// 💡 defineProps宏提供类型和required、deafult等校验和默认值赋予方式，详见官方：
//		https://cn.vuejs.org/guide/components/props.html#prop-validation
//		感觉应当是被ts替代了 所以没细看
</script>
