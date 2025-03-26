<template>
  <div>
    <p>vbind+click: {{ text }}</p>
    <input
      :value="text"
      @input="(event) => (text = (event.target! as HTMLInputElement).value)"
    />
  </div>
  <div>
    <p>关于lazy：需要了解change事件和input事件</p>
    <p>v-model(lazy): {{ text2 }}</p>
    <input v-model.lazy="text2" placeholder="edit me" />
  </div>
  <div>
    <span>多行文字：</span>
    <P style="white-space: pre-line">{{ multipleLineText }}</P>
    <textarea v-model="multipleLineText" placeholder="edit me"></textarea>
  </div>
  <div>
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">复选框：{{ checked }}</label>
  </div>
  <div>
    <p>selected: {{ selectedCheckNameList }}</p>
    <template v-for="name in checkNameList">
      <input
        type="checkbox"
        :id="name"
        :value="name"
        v-model="selectedCheckNameList"
      />
      <label :for="name">{{ name }}</label>
    </template>
  </div>
  <div>
    <p>单选按钮：{{ picked }}</p>
    <input type="radio" id="one" value="one" v-model="picked" />
    <label for="one">One</label>
    <input type="radio" id="two" value="two" v-model="picked" />
    <label for="two">Two</label>
  </div>
  <div>
    <p>下拉选择器：{{ selected }}</p>
    <!--可多选multiple-->
    <select v-model="selected">
      <option disabled value="">selectOne</option>
      <option value="a">A</option>
      <option>B</option>
      <option>C</option>
    </select>
  </div>
  <!--通过v-bind实现动态value绑定-->
  <div>
    <!--Vue特有的attribute：true-value、false-value 配合v-model 但其并不改变value参数-->
    <!--字符串true、false-value-->
    <!--通过v-bind简写可将true/false-value绑定为变量型式-->
    <p>toggle(true/false-value)：{{ toggle }}</p>
    <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
  </div>
  <div>
	<!--也可以绑定value-->
    <p>pick: {{ pick }}</p>
    <input type="radio" v-model="pick" :value="first">first</input>
    <input type="radio" v-model="pick" :value="second">second</input>
  </div>
  <div>
	<!--选择器绑定value为对象-->
	<p>123: {{ selected1 }}</p>
	<select v-model="selected1">
		<!--内联 对象字面量-->
		<option :value="{ number: 123 }">123</option>
	</select>
  </div>
  <!--深入组件章节 了解通过v-model实现输入组件复用-->
</template>
<script setup lang="ts">
import { ref } from "vue";
const text = ref("");
const text2 = ref("");
const multipleLineText = ref("");
const checked = ref(false);
const checkNameList: string[] = ["Tom", "Jerry", "Leo"];
const selectedCheckNameList = ref<string[]>([]);
const picked = ref<string>("");
const selected = ref<string>("");
const toggle = ref("");
const pick = ref("");
const first = ref("refFirst");
const second = ref("refSecond");
const selected1 = ref();
</script>
