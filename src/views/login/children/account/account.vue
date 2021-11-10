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
      @accessVerify="(state:boolean)=>passwordVerify = state"
    ></BgInput>
    <BgRadio class="radio" title="记住密码" v-model="radio"></BgRadio>
    <BgButton title="登录"></BgButton>
  </div>
</template>

<script lang="ts">
// 从下载的组件中导入函数;
import { defineComponent, ref, watch } from "vue";

// 自定义方法引入
import { phoneReg, simplePassword } from "@/globals/regexp.ts";

import { setLocalCache, getLocalCache } from "@/globals/localStorage.ts";

export default defineComponent({
  name: "login-entry",
  setup() {
    // 绑定账号
    const username = ref("");
    username.value = getLocalCache("account");
    // 绑定密码
    const password = ref("");
    password.value = getLocalCache("password");

    // 绑定是否选择
    const radio = ref(false);
    // 判断验证是否通过
    const passwordVerify = ref(false);
    const usernameVerify = ref(false);

    watch(
      () => radio.value,
      (newValue) => {
        if (newValue && passwordVerify.value && usernameVerify.value) {
          setLocalCache("account", username.value);
          setLocalCache("password", password.value);
        }
      },
    );

    const usernameRegs = [
      {
        rule: phoneReg,
        info: "电话号码类型错误~~",
      },
    ];
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
