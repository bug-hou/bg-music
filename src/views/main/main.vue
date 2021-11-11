<!-- 主页面 -->
<template>
  <div class="main">我是main页面</div>
</template>

<script lang="ts">
// 从下载的组件中导入函数
import { defineComponent } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
  name: "main",
  setup() {
    return {};
  },
});
</script>
<style scoped lang="less"></style>
