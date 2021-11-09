import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入css重置样式
import "assets/css/reset.css";

createApp(App).use(store).use(router).mount("#app");
