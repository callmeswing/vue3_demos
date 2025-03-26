<template>
  <p>count: {{ count }}</p>
  <a-space :size="4">
    <a-button @click="count++">count++</a-button>
    <!-- AntDesgin的Button被打印出来是个span-->
    <a-button @click="greet">Greeting</a-button>
    <a-button @click="warn('$event变量传参', $event)">Warn1</a-button>
    <a-button @click="(event: Event) => warn('内联箭头函数传参event', event)">
      Warn2
    </a-button>
  </a-space>
  <!--事件、按键、鼠标行为修饰符-->
</template>
<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);

const name = ref("swing");
function greet(event: Event) {
  alert(`Hello ${name.value}!`);
  // 如果是原生事件
  if (event instanceof Event) {
    alert(
      event.target instanceof HTMLElement
        ? event.target.tagName
        : "Unknown target"
    );
  }
}

function warn(message: String, event: Event) {
  if (event) {
    event.preventDefault();
  }
  alert(message);
}
</script>
