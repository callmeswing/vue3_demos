<template>
	<div>
		<p>改变todoId，会触发watch，10s内再次改变，会取消之前的回调逻辑并在控制台打印：{{ todoId }}</p>
		<input type="number" v-model="todoId">todoId：</input>
		<hr>
	</div>
  <div>
    <p>修改count2：{{ count2 }}</p>
    <input type="number" v-model="count2">
  </div>
  <div>
    <p>修改count3：{{ count3 }}</p>
    <p>sum：{{ sum }}</p>
    <input type="number" v-model="count3">
  </div>
</template>
<script setup lang="ts">
import { onWatcherCleanup, ref, watch, watchEffect } from "vue";

// 副作用清理
// Vue 3.5 新增onWatchCleanup API
// 之前版本有提供 onCleanup 传参(watch、watchEffect方法传参 )
/**
 * 			场景理解：根据id发起请求获取信息，但在请求完成之前id发生了变化。
 * 	这时就需要取消之前过失的请求，从新获取信息。这个取消就是副作用清理！
 */

 // onWatchCleanup 
 // 需要import		适用于watch、watchEffect
 /**
  * 需要注意的点：限制同步执行！！
  * 必须在 watchEffect 效果函数或 watch 回调函数的同步执行期间调用：你不能在异步函数的 await 语句之后调用它。
  */
const todoId = ref(1);
watch(todoId, (newTodoId) => {
  // 通过controller取消fetch请求
  const controller = new AbortController();
  // fetch的第二个参数是一个包含signal属性(AbortSignal)的对象
  fetch(`https://jsonplaceholder.typicode.com/todos/${newTodoId}`, {
    signal: controller.signal,
  }).then(() => {
    // 手动卡住这里
    setTimeout(() => {
      // do nothing
    }, 1000);
    // 此处fetch没有加 await会立即返回一个Promise
    // 回调业务逻辑
  });

  // 清理逻辑 位于watch函数回调之中，这一点比较奇怪
  /**
   * 你也许会很困惑！当然我也是！ 这样为什么没有执行？ 
   * 因为onWatcherCleanup()只是将传入的回调进行了注册！
   * 下次源发生变化的时候，先执行之前注册的回调，之后再次注册！ 需要看源码！
   */
  onWatcherCleanup(() => {
    controller.abort;
    console.log("执行清理");
  });
});


// await后使用onWatchCleanup() 失效
// await出让后 注册不上清理逻辑
const count = ref(0);
watch(count, async (newVal)=>{
  console.log(`watch 触发: count = ${newVal}`);
  await new Promise((resolve) => {setTimeout(resolve, 1000)}) // 模拟异步
  
  onWatcherCleanup(()=>{
    console.log("❌ GPT说这段清理代码不会被执行！")
  })

  console.log("watch 逻辑执行完毕")
})
// 触发 watch 逻辑
// setTimeout(() => count.value++, 500);
// setTimeout(() => count.value++, 2000);


// await前使用但是依然在async中 一样失效
// 即便能注册上清理逻辑 但是返回Promise后也会被提前
const count1 = ref(0);
watch(count1, async (newVal) => {
  console.log(`watch 触发: count = ${newVal}`);

  onWatcherCleanup(() => {
    console.log("❌ GPT说这段清理代码可能还是不会被执行！");
  });

  await new Promise((resolve) => setTimeout(resolve, 2000)); // 模拟异步请求
  console.log("watch 异步逻辑执行完毕");
});
// 触发 watch 逻辑
// setTimeout(() => count.value++, 1000);
// setTimeout(() => count.value++, 1500);

const count2 = ref(10)
const count3 = ref(100)
const sum = ref(0)
// onCleanup() watch 回调的第三个参数
watch(count2, (_newValue, _oldValue, onCleanup)=>{
  console.log("count2 is changed now!")
  // 清理逻辑
  onCleanup(()=>{
    console.log("before clean, count2 is: " + count2.value)
    // count2.value =10
    console.log("after clean, count2 is: " + count2.value)
  })
})

// onCleanup() watchEffect 回调的第一个参数
watchEffect((onCleanup)=>{
  sum.value += count3.value
  console.log("count3 is changed now!")
  // 清理逻辑
  // 实测清理逻辑中的依赖是不会被追踪的！
  onCleanup(()=>{
    console.log("before clean, count3 is: " + count3.value)
    // count3.value =100
    console.log("after clean, count3 is: " + count3.value)
  })
})


// 💡 关于回调的时机
/**
 *  1.类似于组件更新，用户创建的侦听器回调函数也会被批量处理以避免重复调用。
 *  2.默认情况下，侦听器回调会在父组件更新 (如有) 之后、所属组件的 DOM 更新之前
 *  被调用。这意味着如果你尝试在侦听器回调中访问所属组件的 DOM，
 *  那么 DOM 将处于更新前的状态。
 *  
 *  vue当然也提供了后置侦听回调 (DOM更新之后回调)
 *  watch(source, callback, {
        flush: 'post'
    })
    watchEffect(callback, {
      flush: 'post'
    })
    后置effect的别名方法 需要import
    watchPostEffect(() => {})


    除了post后置，还提供同步触发的sync和同名的watchSyncEffect()
    具体时机：在监听源发生变化后立即执行，不考虑dom的行为
    需要注意：同步侦听器不会进行批处理，每当检测到响应式数据发生变化时就会触发。
        可以使用它来监视简单的布尔值，但应避免在可能多次同步修改的数据源 (如数组) 上使用。
 */

  // 💡停止侦听器
  /**
   *  setup(包括方法)中注册的侦听器自动绑定在宿主组件实例上，
   *  并在组件实例卸载时停止侦听。因此，多数情况下无需关注停止侦听器。
   * 
   *  何时需要关注？
   *          记住一个关键：侦听器必须是同步语句创建的。
   *                如果是异步回调创建的侦听器的，就不会绑定到当前组件上。
   *                      必须手动停止，防止内存泄漏！
   *  
   */
  // 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  // watchEffect(() => {})
}, 100)

// 如何手动停止：请调用 watch 或 watchEffect 返回的函数：
const unwatch = watchEffect(() => {})
// ...当该侦听器不再需要时
unwatch()

// 需要异步创建侦听器的情况很少，请尽可能选择同步创建。
// 如果需要等待一些异步数据，你可以使用条件式的侦听逻辑 👇
// 需要异步请求得到的数据
const data = ref(null)
watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
</script>
