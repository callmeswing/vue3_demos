<style scoped>
.meta {
  font-size: 0.8em;
  color: #42b883;
}
</style>

<template>
  <FancyButton>boom!</FancyButton>
  <FancyList api-url="url" :per-page="10">
    <!-- 解构作用域插槽的传参 -->
    <template #item="{ body, username, likes }">
      <div class="item">
        <p>{{ body }}</p>
        <p class="meta">by {{ username }} | {{ likes }} likes</p>
      </div>
    </template>
  </FancyList>
</template>
<script setup lang="ts">
import FancyButton from "./FancyButton.vue";
import FancyList from "./FancyList.vue";

/**
 * 	插槽：组件接收模板
 * 	<slot><slot/> slot元素是一个插槽出口 slot outlet	父元素提供插槽内容 slot content
 *
 * 	作用领：
 * 	插槽内容可以访问父组件的数据作用域，这并不奇怪，因为内容本身就是在父组件模板中定义的。
 * 	也因此，插槽内容无法访问子组件的数据。Vue模板中的表达式只能访问其定义时所处的作用域，同JS的词法作用域。
 *
 * 	默认内容：
 * 	父组件没有提供任何插槽内容时生效
 * 	<slot>deafult content<slot/>
 *
 *	具名插槽：
		通过特殊的attribute name 分配唯一ID
		带有name就是具名插槽，没有name的插槽出口会隐式的命名为default
			<slot name="main"></slot>
		而在父组件，需要 带v-slot指令的<template>元素指定内容到达的插槽名称
			<MyComponent>
				<template v-slot: main>
					<!-- 插槽具体内容 -->
				</template>
			</MyComponent>
	  ❗ v-slot指令 缩写#
	  			<template #main>

		同是传递具名插槽内容 和 默认插槽内容
		所有顶级的非<template>内容会被隐式视为默认插槽的内容
			<MyComponent>
				<template #header>
    				<h1>Here might be a page title</h1>
 				 </template>

  				<!-- 隐式的默认插槽 -->
  				<p>A paragraph for the main content.</p>
  				<p>And another one.</p>

  				<template #footer>
    				<p>Here's some contact info</p>
  				</template>
			</MyComponent>

 *	条件插槽：
		根据是否有内容传入插槽而决定是否进行渲染
		通过 v-if与$slot 结合实现
		<div v-if="$slot.main">
			<slot name="main">
		<div/>
		如果没有指定到main的内容传入 这整个div都不会渲染

 *  动态插槽名：
		同模板语法 中的动态指令参数(置于方括号中) ❗ 可以用于定义动态的插槽名：
			<template v-slot:[dynamicSlotName]>
			</template>
		缩写如下：
			<template #[dynamicSlotName]>
			</template>
		语法限制也一样：动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的
		动态参数(表达式)过于复杂的情况下，建议用computed替代

		💡这里提到一个有趣的点：即为什么模板中建议使用 kebab-case 来声明和传递参数
		因为 假设是写在DOM的内嵌模板中，大写会被转化为小写，如oneAttr会被转为oneattr，虽然通常不会用到DOM内嵌模板的方式，但想必是与之相关的

 * 	作用域插槽：
		基于开头提到的插槽的作用域问题，可能存在需求：某些时候需要用到子组件作用域的数据！
		方案：让子组件在渲染时将一部分数据提供给插槽

		情况1：默认插槽
			子组件传递数据 通过像对组件传递props一样
			<div>
				<slot :text="..." :count="">
			</div>
			父组件接受并使用 (这里的v-slot跟具名不一样❗ 具名是在template中使用v-slot 并且具名是: 不是=)
			<MyComponent v-slot="slotProps">
				{{ slotProps.text }}
			</MyComponent>
			父组件也可以解构
			<MyComponent v-slot={ name, count}>
				{{ name }}
			</MyComponent>

		情况2：具名插槽
			传递 ❗那么是Vue保留的特殊attribute，因此不会作为props传递给插槽(毕竟这里是具名！name是用于指定插槽名称的)
			<div>
				<slot name="my-slot" message="123">
			</div>
			接收
			<MyComponent>
				<template v-slot:my-slot="slotProps">
					{{ slotProps}}
				</template>
			</MyComponent>	
			接收(缩写)	
			<MyComponent>
				<template #my-slot="slotProps">
					{{ slotProps}}
				</template>
			</MyComponent>	

		情况3：都有...
			其实是同具名一样，在接收端(父组件)显式的为默认插槽的内容包装一层<template>并指定名称为default
			也不能在组件上(最外层)接收参数，必须是对应传props的插槽内才能接收使用
			<MyComponent>
  				<template #default="{ message }">
    				<p>{{ message }}</p>
  				</template>
			</MyComponent>
 */

// ❗无渲染组件：没有渲染内容(可能只包含了逻辑而渲染内容通过插槽交给了别的组件)
</script>
