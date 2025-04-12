import { ref } from "vue";
import { useEventListener } from "./event";

// 💡 组合式函数 vue推荐用use...的形式作为函数名称
// 👇 组合式函数 Composables
export function useMouse() {
  // 管理的状态
  const x = ref(0);
  const y = ref(0);

  useEventListener(window, "mousemove", (event) => {
    x.value = event.pageX;
    y.value = event.pageY;
  });

  return { x, y };
}
