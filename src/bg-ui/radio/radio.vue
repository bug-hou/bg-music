<!-- BgRadio -->
<template>
  <label v-bind="$attrs">
    <input
      type="checkbox"
      name="bug"
      id=""
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target?.checked)"
    />
    <div class="input"></div>
    <span>{{ title }}</span>
  </label>
</template>

<script lang="ts">
// 从下载的组件中导入函数
import { defineComponent } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
  name: "BgRadio",
  props: {
    modelValue: {
      required: true,
    },
    title: {
      required: true,
      type: String,
    },
    checked: {
      default: false,
      type: Boolean,
    },
  },
  setup(props) {
    return {};
  },
});
</script>
<style scoped lang="less">
label {
  min-width: 300px;
  min-height: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  input {
    visibility: hidden;
    &:checked + div {
      background: var(--select-color);
    }
  }
  .input {
    border: 3px solid var(--border-color);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 20px;
    padding: 3px;
    background-origin: content-box;
  }
  span {
    font-size: 1.4rem;
    font-weight: bold;
  }
}
</style>
