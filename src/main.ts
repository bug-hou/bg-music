import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入css重置样式
import "assets/css/reset.css";
// 引入全局css样式
import "assets/css/global.css";
// 引入全局theme样式
import "assets/css/theme.css";

// 引入UI组件
import BgUi from "@/bg-ui";

createApp(App).use(BgUi).use(store).use(router).mount("#app");
