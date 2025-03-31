import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import { Space, Button, message } from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
// 全局注册的组件
import MyComponent from "./components/advanced/MyComponent.vue";

const app = createApp(App);
app
  .component("MyComponent", MyComponent)
  .use(router)
  .use(Antd)
  .use(Space)
  .use(Button)
  .mount("#app");
app.config.globalProperties.$message = message;
