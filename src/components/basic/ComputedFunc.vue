<template>
  <p>name: {{ auther.name }}</p>
  <template v-if="publishedBooksAlready">
    <p>Published books:</p>
    <span v-for="(book, index) in auther.books">
      <p>{{ index + 1 }} : {{ book }}</p>
    </span>
  </template>
  <template v-else>
    <p>No books published yet~</p>
  </template>
  <hr />
  <p>{{ fullName }}</p>
  <hr />
  <p>{{ count }} {{ itsZero }}</p>
</template>
<script setup lang="ts">
import { reactive, computed, onMounted, ref } from "vue";

const auther = reactive({
  name: "何伟",
  books: ["江城", "甲骨文", "寻路中国"],
});
// 为什么需要computed而不是使用简单的func？That's a damn good questions！
// 计算属性 返回一个ref对象
const publishedBooksAlready = computed(() => {
  return auther.books.length > 0;
});

// 计算属性默认只读，尝试修改会收到运行时警告: Write operation failed: computed value is readonly
// onMounted(() => {
//   publishedBooksAlready.value = false;
// });

// 通过getter/setter的方式进行修改，当然最好是不会用到
const firstName = ref("Swing");
const lastName = ref("Dai");
const fullName = computed({
  // getter
  get() {
    // 注意 ref对象 需要通过.value访问
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    // 解构赋值语法
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});
// 这样就可以修改fullName了 由于它是一个ref 所以需要使用.value的方式访问
onMounted(() => {
  setTimeout(() => {
    fullName.value = "Qin Sha";
  }, 3000);
});

// 获取上一个值
// 通过getter的第一个参数获取计算属性返回的上一个值
// setter修改是是原变量
const count = ref(0);
const itsZero = computed({
  // get
  get(previous) {
    if (count.value <= 3) {
      return count.value;
    }
    console.log("return previous: " + previous);
    return previous;
  },
  // set
  set(newValue: number) {
    console.log("change to " + newValue);
    count.value = newValue;
  },
});

onMounted(() => {
  setTimeout(() => {
    itsZero.value = 10;
  }, 3000);
});
</script>
