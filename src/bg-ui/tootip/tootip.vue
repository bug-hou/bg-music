<!-- 提示框组件 -->
<template>
  <div class="tootip" :class="{ active: isActive }" :style="{ color: color }">
    {{ title }}
  </div>
</template>

<script lang="ts">
// 从下载的组件中导入函数
import { defineComponent } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
  name: "BgTootip",
  props: {
    title: {
      required: true,
      type: String,
    },
    color: {
      type: String,
      default: "red",
    },
    isActive: {
      type: Boolean,
      requried: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped lang="less">
.tootip {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: -10%;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  transition: all 1s;
}
.isActive {
  top: 60%;
}
</style>
