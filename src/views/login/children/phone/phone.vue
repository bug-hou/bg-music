<!-- 账号登录组件 -->
<template>
  <div class="main">
    <p class="header">手机号登录</p>
    <BgInput
      v-model="username"
      title="号码"
      :isVerify="true"
      :verifyList="usernameRegs"
      @accessVerify="(state:boolean)=>usernameVerify = state"
    ></BgInput>
    <BgCaptcha
      v-model="password"
      title="验证码"
      :isDisable="isDisable"
      @buttonClick="sendCaptcha"
    ></BgCaptcha>
    <BgButton title="登录" @buttonClick="submit"></BgButton>
    <BgTootip
      :title="tootipTitle"
      :isActive="tootip"
      color="rgb(248, 144, 127)"
    ></BgTootip>
  </div>
</template>

<script lang="ts">
// 从下载的组件中导入函数;
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// 自定义方法引入
import { phoneReg } from "@/globals/regexp.ts";

import mixin from "../mixins/main";

export default defineComponent({
  name: "login-entry",
  setup() {
    const store = useStore();
    const router = useRouter();

    // 获取mixin
    const { sendNetwork } = mixin("verifyCaptcha");
    // 绑定账号
    const username = ref("");
    // 绑定密码
    const password = ref("");

    // 是否登录成功，没有成功，有提示框出现
    const tootip = ref(false);
    const tootipTitle = ref("登录失败");

    // 是否对发生验证码按钮禁用
    const isDisable = ref(false);

    // 判断验证是否通过
    const usernameVerify = ref(false);

    // 提交登录请求
    const submit = () => {
      if (usernameVerify.value) {
        sendNetwork(username.value, password.value);
      } else {
        tootip.value = true;
        setTimeout(() => {
          tootip.value = false;
        }, 2000);
      }
    };

    // 请求发送验证码
    const sendCaptcha = () => {
      if (usernameVerify.value) {
        // 使用tootip来提示发送成功
        tootip.value = true;
        tootipTitle.value = "验证码发送成功";
        setTimeout(() => {
          tootip.value = false;
        }, 1000);
        // 禁止再次改变
        isDisable.value = true;
        setTimeout(() => {
          isDisable.value = false;
        }, 60000);
        store.dispatch("login/sendPhoneCaptcha", { phone: username.value });
      }
    };

    // 监听是否登录成功，成功就跳转导main页面
    watch(
      () => store.state.login.isLogin,
      (newValue) => {
        if (newValue) {
          router.push("/main");
        } else {
          tootipTitle.value = "验证码错误";
          tootip.value = true;
          setTimeout(() => {
            tootip.value = false;
          }, 1000);
        }
      },
    );

    const usernameRegs = [
      {
        rule: phoneReg,
        info: "电话号码类型错误~~",
      },
    ];
    return {
      username,
      password,
      usernameRegs,
      usernameVerify,
      tootip,
      submit,
      isDisable,
      tootipTitle,
      sendCaptcha,
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
