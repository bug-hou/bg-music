<!-- 登录页面的入口文件-->
<template>
  <div id="login-entry">
    <main>
      <header>BG-MUSIC</header>
      <div class="main">
        <p class="header">账号登录</p>
        <BgInput
          v-model="username"
          title="账号"
          :isVerify="true"
          :verifyList="usernameRegs"
        ></BgInput>
        <BgInput
          v-model="password"
          title="密码"
          type="password"
          :isVerify="true"
          :verifyList="passwordRegs"
          class="lastInput"
        ></BgInput>
        <BgRadio title="记住密码" v-model="radio"></BgRadio>
      </div>
      <footer>
        <button class="login">登录</button>
        <div class="selectLogin">
          <p
            :class="{ select: currentSelect == 'account' }"
            name="account"
            title="账号登录"
            class="iconfont icon-zhanghaodenglu"
            @click="currentSelect = 'account'"
          ></p>
          <p
            :class="{ select: currentSelect == 'email' }"
            name="email"
            title="邮箱登录"
            class="iconfont icon-youxiangdenglu"
            @click="currentSelect = 'email'"
          ></p>
          <p
            :class="{ select: currentSelect == 'message' }"
            name="message"
            title="短信登录"
            class="iconfont icon-duanxindenglu"
            @click="currentSelect = 'message'"
          ></p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script lang="ts">
// 从下载的组件中导入函数;
import { defineComponent, ref } from "vue";

// 自定义方法引入
import { phoneReg, simplePassword } from "@/global/regexp.ts";

// 自定义组件引入
export default defineComponent({
  name: "login-entry",
  setup() {
    const username = ref("");
    const password = ref("");
    const radio = ref(true);

    const currentSelect = ref("account");

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
      currentSelect,
    };
  },
});
</script>
<style scoped lang="less">
#login-entry {
  background: url("~assets/image/login/bg.png");
  background-size: 100% 100%;
  position: relative;
  main {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 80%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
      width: 100%;
      height: 20%;
      font-size: 2.5rem;
      font-weight: bold;
      line-height: 3;
      background-image: var(--title-color);
      color: transparent;
      background-clip: text;
    }
    .main {
      width: 300px;
      height: 50%;
      .header {
        font-size: 2rem;
        font-weight: bold;
      }
    }
    button {
      width: 200px;
      height: 50px;
      border-radius: 15px;
      font-size: 2rem;
      background: rgba(0, 255, 255, 0.3);
      font-weight: bold;
      border: 2px solid var(--border-color);
    }
    .lastInput {
      margin-bottom: 0;
    }
    .selectLogin {
      margin-top: 10px;
      width: 200px;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      p {
        width: 50px;
        height: 50px;
        font-size: 2.5rem;
        color: var(--select-color);
        border: 2px solid #0ff;
        border-radius: 50%;
      }
      .select {
        color: var(--font-color);
      }
    }
  }
}
@media screen and (max-width: 500px) {
  #login-entry {
    background: url("~assets/image/login/bg.m.png");
    background-size: 100% 100%;
    main {
      width: 100%;
      height: 100%;
      left: 50%;
      top: 50%;
      border-radius: 0;
      background: rgba(255, 255, 255, 0.3);
      header {
        line-height: 5;
      }
      .lastInput {
        margin-bottom: 20px;
      }
      .main {
        height: 43%;
      }
    }
  }
}
</style>
