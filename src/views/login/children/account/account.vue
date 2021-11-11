<!-- 账号登录组件 -->
<template>
  <div class="main">
    <p class="header">账号登录</p>
    <BgInput
      v-model="username"
      title="账号"
      :isVerify="true"
      :verifyList="usernameRegs"
      @accessVerify="(state:boolean) => (usernameVerify = state)"
    ></BgInput>
    <BgInput
      v-model="password"
      title="密码"
      type="password"
      :isVerify="true"
      :verifyList="passwordRegs"
      class="lastInput"
      :isShow="passwordIsShow"
      @accessVerify="(state:boolean)=>passwordVerify = state"
      @buttonClick="passwordIsShow = !passwordIsShow"
    ></BgInput>
    <BgRadio class="radio" title="记住密码" v-model="radio"></BgRadio>
    <BgButton @buttonClick="submit" title="登录"></BgButton>
    <BgTootip
      title="登录失败"
      :isActive="tootip"
      color="rgb(248, 144, 127)"
    ></BgTootip>
  </div>
</template>

<script lang="ts">
// 从下载的组件中导入函数;
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// 自定义方法引入
import { phoneReg, simplePassword } from "@/globals/regexp.ts";

import { setLocalCache, getLocalCache } from "@/globals/localStorage.ts";

import mixin from "../mixins/main";

export default defineComponent({
  name: "login-entry",
  setup() {
    const store = useStore();
    const router = useRouter();
    // 从mixin中获取网络请求
    const { sendNetwork } = mixin("sendAccountLogin");
    // 绑定账号
    const username = ref("");
    username.value = getLocalCache("account");
    // 绑定密码
    const password = ref("");
    const passwordIsShow = ref(false);
    password.value = getLocalCache("password");

    // 绑定是否选择
    const radio = ref(false);
    // 判断验证是否通过
    const passwordVerify = ref(false);
    const usernameVerify = ref(false);

    // 提示登录失败（是否显示tootip
    const tootip = ref(false);

    // 监听是否点击了记住密码,当为true时，添加到localStorage中
    watch(
      () => radio.value,
      (newValue) => {
        if (newValue && passwordVerify.value && usernameVerify.value) {
          setLocalCache("account", username.value);
          setLocalCache("password", password.value);
        }
      },
    );

    // 提交登录请求
    const submit = () => {
      if (passwordVerify.value && usernameVerify.value) {
        sendNetwork(username.value, password.value);
      } else {
        tootip.value = true;
        setTimeout(() => {
          tootip.value = false;
        }, 2000);
      }
    };

    // 监听是否登录成功，成功就跳转导main页面
    watch(
      () => store.state.login.isLogin,
      (newValue) => {
        if (newValue) {
          router.push("/main");
        } else {
          tootip.value = true;
          setTimeout(() => {
            tootip.value = false;
          }, 1000);
        }
      },
    );

    // 用户名正则验证
    const usernameRegs = [
      {
        rule: phoneReg,
        info: "电话号码类型错误~~",
      },
    ];
    // 密码正则验证
    const passwordRegs = [
      {
        rule: simplePassword,
        info: "密码格式不对~~",
      },
    ];
    return {
      username,
      password,
      usernameRegs,
      passwordRegs,
      radio,
      passwordVerify,
      usernameVerify,
      submit,
      passwordIsShow,
      tootip,
    };
  },
});
</script>
<style scoped lang="less">
.main {
  width: 300px;
  height: 70%;
  .header {
    font-size: 2rem;
    font-weight: bold;
  }
  .radio {
    margin-bottom: 10px;
  }
  .lastInput {
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 500px) {
  .main {
    height: 50%;
  }
  .lastInput {
    margin-bottom: 20px;
  }
}
</style>
