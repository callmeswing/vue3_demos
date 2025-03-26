import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import { Space, Button, message } from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);
app.use(router).use(Antd).use(Space).use(Button).mount("#app");
app.config.globalProperties.$message = message;
