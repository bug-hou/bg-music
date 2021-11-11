<!-- name -->
<!-- 
属性:
（都是不必须传入的参数）title:按钮显示的文字,small:是否使用小按钮,backgroundColor:按钮背景颜色
事件:
buttonClick:点击事件(无参)
 -->
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
  emits: ["buttonClick"],
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
