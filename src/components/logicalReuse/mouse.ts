import { ref, onMounted, onUnmounted } from "vue";

// 💡 组合式函数 vue推荐用use...的形式作为函数名称
// 👇 组合式函数 Composables
export function useMouse() {
  // 管理的状态
  const x = ref(0);
  const y = ref(0);

  //组合式函数可以随时更改状态
  function update(event: MouseEvent) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onUnmounted(() => {
    window.addEventListener("mousemove", update);
  });

  return { x, y };
}

/**
 * 	上面这样函数中包含一个内部函数的行为，是闭包closure 的常见做法
 *  这样update可以直接访问到关联的状态x、y
 * 	也避免update在外部需要讲x、y提升或者关联到外部作用域的做法，保持封装
 */
