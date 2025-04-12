import { onMounted, onUnmounted } from "vue";

// export default function useEventListener<
//   Target extends Window | HTMLElement,
//   EventName extends Target extends Window
//     ? keyof WindowEventMap
//     : keyof HTMLElementEventMap
// >(
//   target: Target,
//   event: EventName,
//   callback: (
//     this: Target,
//     ev: Target extends Window
//       ? WindowEventMap[EventName]
//       : HTMLElementEventMap[EventName]
//   ) => any
// ) {
//   onMounted(() => {
//     target.addEventListener(event, callback as EventListener);
//   });
//   onUnmounted(() => {
//     target.removeEventListener(event, callback as EventListener);
//   });
// }

// 针对 window 的重载
export function useEventListener<K extends keyof WindowEventMap>(
  target: Window,
  event: K,
  callback: (this: Window, ev: WindowEventMap[K]) => any
): void;

// 针对 HTMLElement 的重载
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  event: K,
  callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
): void;

// 实现签名（通用形式）
export function useEventListener(
  target: any,
  event: string,
  callback: EventListener
) {
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}
