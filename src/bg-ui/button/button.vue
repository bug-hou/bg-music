<!-- name -->
<template>
  <button
    @click="$emit('buttonClick')"
    :class="{ small: small }"
    :style="'background:' + backgroundColor + ';'"
    v-bind="$attrs"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
// 从下载的组件中导入函数
import { defineComponent } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
  name: "BgButton",
  props: {
    title: {
      default: "登录",
      type: String,
    },
    small: {
      default: false,
      type: Boolean,
    },
    backgroundColor: {
      default: "",
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped lang="less">
button {
  width: 200px;
  height: 50px;
  border-radius: 15px;
  font-size: 2rem;
  background: rgba(0, 255, 255, 0.3);
  font-weight: bold;
  border: 2px solid var(--border-color);
}
.small {
  width: 100px;
  height: 30px;
}
</style>
