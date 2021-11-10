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
    <BgButton title="登录"></BgButton>
  </div>
</template>

<script lang="ts">
// 从下载的组件中导入函数;
import { defineComponent, ref, watch } from "vue";

// 自定义方法引入
import { emailReg, simplePassword } from "@/globals/regexp.ts";

import { setLocalCache } from "@/globals/localStorage.ts";

export default defineComponent({
  name: "login-entry",
  setup() {
    // 绑定账号
    const email = ref("");
    // 绑定密码
    const password = ref("");

    // 判断验证是否通过
    const passwordVerify = ref(false);
    const usernameVerify = ref(false);

    const usernameRegs = [
      {
        rule: emailReg,
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
      email,
      password,
      usernameRegs,
      passwordRegs,
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
