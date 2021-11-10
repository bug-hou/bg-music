import { Module } from "vuex";

// 导入定义的接口
import { IRootState } from "../index.type";
import { ILoginState, IAccountPayload } from "./login.type"

// 导入网络请求
import axios from "../../networks/index"

const loginStore: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    isLogin: false,
    token: "",
    cookie: "",
    account: {},
    profile: {},
    bindings: {},
  },
  mutations: {
    changeLoginState(state, payload: boolean) {
      state.isLogin = payload;
    },
    setUserInfo(state, payload: any) {
      state.account = payload.account;
      state.token = payload.token;
      state.cookie = payload.cookie;
      state.bindings = payload.bindings;
      state.isLogin = true;
      state.profile = payload.profile;
    }
  },
  actions: {
    async sendAccountLogin({ commit }, payload: IAccountPayload) {
      const result = await axios.get("/login/cellphone", {
        params: {
          phone: payload.acount,
          password: payload.password,
        }
      })
      if (result.code == 502) {
        commit("changeLoginState", false);
      } else {
        commit("setUserInfo", result);
      }
    }
  },
}

export default loginStore;