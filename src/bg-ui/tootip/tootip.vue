<!-- 提示框组件 -->
<!-- 
属性:title:提示的内容（必传），
（非必传）:color:字体颜色，isActive:是否显示

 -->
<template>
  <div class="tootip" :class="{ active: isActive }" :style="[{ color: color }]">
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
    top: {
      default: "60%",
      type: String,
    },
    mTop: {
      default: "50%",
      type: String,
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
  border: 2px dashed var(--border-color);
  border-radius: 10px;
  transition: top 1s;
  background: var(--tootip-color);
  font-weight: bold;
  padding: 3px 5px;
  min-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  font-size: 1.5rem;
  letter-spacing: 5px;
}
.active {
  top: 60%;
}
@media screen and (max-width: 500px) {
  .active {
    top: 50%;
  }
}
</style>
