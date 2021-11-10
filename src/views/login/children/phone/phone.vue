<!-- 账号登录组件 -->
<template>
  <div class="main">
    <p class="header">手机号登录</p>
    <BgInput
      v-model="username"
      title="号码"
      :isVerify="true"
      :verifyList="usernameRegs"
    ></BgInput>
    <BgCaptcha
      v-model="password"
      title="验证码"
      :isVerify="true"
      :verifyList="passwordRegs"
    ></BgCaptcha>
    <BgButton title="登录"></BgButton>
  </div>
</template>

<script lang="ts">
// 从下载的组件中导入函数;
import { defineComponent, ref } from "vue";

// 自定义方法引入
import { phoneReg, simplePassword } from "@/globals/regexp.ts";

export default defineComponent({
  name: "login-entry",
  setup() {
    // 绑定账号
    const username = ref("");
    // 绑定密码
    const password = ref("");

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
