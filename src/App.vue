<!-- App -->
<template>
  <div id="App">
    <router-view class="view" #="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
// 从下载的组件中导入函数
import { defineComponent } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
  name: "App",
  setup() {
    return {};
  },
});
</script>
<style scoped lang="less">
@import url(//at.alicdn.com/t/font_2926546_m5de7bkoe6.css);
#App {
  width: 100%;
  height: 100%;
}
.view {
  width: 100%;
  height: 100%;
  background: red;
}
</style>
