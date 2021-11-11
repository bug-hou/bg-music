import { Module } from "vuex";

// 导入定义的接口
import { IRootState } from "../index.type";
import {
  ILoginState,
  IAccountPayload,
  ICaptchaPayload,
  IVerifyPayload,
} from "./login.type";

// 导入网络请求
import axios from "../../networks/index";

const loginStore: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    isLogin: false,
    token: "",
    cookie: "",
    account: {},
    profile: {},
    bindings: {},
    isCaptcha: null,
  },
  mutations: {
    // 更改登录状态
    changeLoginState(state, payload: boolean) {
      if (payload === false) {
        if (typeof state.isLogin === "number") {
          state.isLogin = false;
        } else {
          state.isLogin = 0;
        }
      } else {
        state.isLogin = true;
      }
    },
    // 登录成功后添加登录信息
    setUserInfo(state, payload: any) {
      state.account = payload.account;
      state.token = payload.token;
      state.cookie = payload.cookie;
      state.bindings = payload.bindings;
      state.isLogin = true;
      state.profile = payload.profile;
    },
    // 判断验证码是否正确
    changeCaptcha(state, payload: boolean) {
      state.isCaptcha = payload;
    },
  },
  actions: {
    // 发送账号登录请求
    async sendAccountLogin({ dispatch }, payload: IAccountPayload) {
      const result = await axios.get("/login/cellphone", {
        params: {
          phone: payload.account,
          password: payload.password,
        },
      });
      dispatch("resultValue", result);
    },
    // 发送邮箱登录请求
    async sendEmailLogin({ dispatch }, payload: IAccountPayload) {
      const result = await axios.get("/login", {
        params: {
          email: payload.account,
          password: payload.password,
        },
      });
      dispatch("resultValue", result);
    },
    // 发送号码登录请求
    async sendPhoneLogin({ dispatch }, payload: IAccountPayload) {
      const result = await axios.get("/login/cellphone", {
        params: {
          phone: payload.account,
          captcha: payload.password,
        },
      });
      dispatch("resultValue", result);
    },
    // 发送验证码请求
    async sendPhoneCaptcha(_, payload: ICaptchaPayload) {
      axios.get("/captcha/sent", {
        params: {
          phone: payload.phone,
        },
      });
    },
    // 发送验证验证码请求
    async verifyCaptcha({ commit, dispatch }, payload: IAccountPayload) {
      const result = await axios.get("/captcha/verify", {
        params: {
          phone: payload.account,
          captcha: payload.password,
        },
      });
      if (result.data) {
        commit("changeCaptcha", true);
        dispatch("sendPhoneLogin", payload);
      } else {
        commit("changeLoginState", false);
      }
    },
    // 将登录后的信息commit到mutations中
    resultValue({ commit }, result: any) {
      if (result.code == 200) {
        commit("setUserInfo", result);
      } else {
        commit("changeLoginState", false);
      }
    },
  },
};

export default loginStore;
