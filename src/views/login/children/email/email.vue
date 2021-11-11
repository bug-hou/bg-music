<!-- 账号登录组件 -->
<template>
  <div class="main">
    <p class="header">邮箱登录</p>
    <BgInput
      v-model="email"
      title="邮件"
      :isVerify="true"
      :verifyList="usernameRegs"
      @accessVerify="(state:boolean)=>usernameVerify = state"
    ></BgInput>
    <BgInput
      v-model="password"
      title="密码"
      type="password"
      :isVerify="true"
      :verifyList="passwordRegs"
      @accessVerify="(state:boolean)=>passwordVerify = state"
    ></BgInput>
    <BgButton title="登录" @buttonClick="submit"></BgButton>
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// 自定义方法引入
import { emailReg, simplePassword } from "@/globals/regexp.ts";

import mixin from "../mixins/main";

export default defineComponent({
  name: "login-entry",
  setup() {
    const store = useStore();
    const router = useRouter();
    // 从mixin中获取网络请求
    const { sendNetwork } = mixin("sendEmailLogin");

    // 绑定账号
    const email = ref("");
    // 绑定密码
    const password = ref("");

    // 判断验证是否通过
    const passwordVerify = ref(false);
    const usernameVerify = ref(false);

    // 是否登录成功，没有成功，有提示框出现
    const tootip = ref(false);

    // 提交登录请求
    const submit = () => {
      console.log(passwordVerify.value, usernameVerify.value);
      if (passwordVerify.value && usernameVerify.value) {
        sendNetwork(email.value, password.value);
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
        }
      },
    );

    const usernameRegs = [
      {
        rule: emailReg,
        info: "邮箱格式错误~~",
      },
    ];
    const passwordRegs = [
      {
        rule: simplePassword,
        info: "密码格式不对~~",
      },
    ];
    return {
      email,
      password,
      usernameRegs,
      passwordRegs,
      passwordVerify,
      usernameVerify,
      tootip,
      submit,
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
