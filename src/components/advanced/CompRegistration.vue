<template>
  <div>
    <my-component><p>全局注册的组件</p></my-component>
    <hr />
  </div>
</template>
<script setup lang="ts">
/**
 * 💡全局注册存在的问题：
 * 			1.全局注册的组件即便没有使用，也无法在打包的过程中被自动移除(tree-shaking)
 * 			2.依赖关系变得不确定，和使用过多的全局变量一样，大型项目会变得难以维护(官方说的，我没有明确感受 😄)
 *
 *  💡局部注册：
 * 			局部注册，首先需要import
 *				之所以import之后都是在模板中直接使用，是因为setup语法糖的缘故❗
 *					如果没有使用<script setup>语法糖，则需要通过 components 进行注册：

 1.composition api
 import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}

2.optional api
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}

	局部注册的组件在后代组件中不可用！
	组件名格式：PascalCase or kebab-case
 */
</script>
