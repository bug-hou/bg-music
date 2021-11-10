import { createStore } from "vuex";

import { IRootState } from "./index.type"
// 导入其他模块
import loginStore from "./login/login";

export default createStore<IRootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login: loginStore
  },
});
