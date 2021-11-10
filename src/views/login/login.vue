<!-- 登录页面的入口文件-->
<template>
  <div id="login-entry">
    <main>
      <header>BG-MUSIC</header>
      <router-view class="view" #="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
      <cpn-footer> </cpn-footer>
    </main>
  </div>
</template>

<script lang="ts">
// 从下载的组件中导入函数;
import { defineComponent } from "vue";

// 自定义方法引入

// 自定义组件引入
import cpnFooter from "./cpns/footer.vue";

export default defineComponent({
  name: "login-entry",
  components: {
    cpnFooter,
  },
});
</script>
<style scoped lang="less">
// 导入过渡动画库
@import url(~assets/css/animation/login.css);
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
    overflow: hidden;
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
  }
  .view {
    overflow: hidden;
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
    }
  }
}
</style>
