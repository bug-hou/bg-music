<!-- 定义input组件 -->
<template>
  <label v-bind="$attrs">
    <span>{{ title }}</span>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
    <div class="checked"></div>
    <p class="verify" v-if="isVerify">{{ showErrorInfo }}</p>
  </label>
</template>

<script lang="ts">
// 从下载的组件中导入函数
import { defineComponent, watch, ref } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
  name: "BgInput",
  props: {
    title: {
      required: true,
    },
    type: {
      default: "text",
    },
    placeholder: {
      default: "",
    },
    modelValue: {
      required: true,
    },
    isVerify: {
      default: false,
    },
    verifyList: {
      default() {
        return [
          {
            rule: /^a/,
            info: "内容错误~~",
          },
        ];
      },
    },
  },
  setup(props: any) {
    const showErrorInfo = ref("");
    if (props.isVerify) {
      watch(
        () => props.modelValue,
        (newValue, oldValue) => {
          const currentState = props.verifyList.some((item: any) => {
            if (!item.rule.test(newValue)) {
              showErrorInfo.value = item.info;
              return false;
            } else {
              return true;
            }
          });
          console.log(currentState);
          if (currentState) {
            showErrorInfo.value = "";
          }
        },
      );
    }
    return {
      showErrorInfo,
    };
  },
});
</script>
<style scoped lang="less">
label {
  min-width: 300px;
  min-height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  margin: 10px 0 20px;
  span {
    font-size: 1.6rem;
    font-weight: bold;
  }
  input {
    border: none;
    border-bottom: 3px solid var(--border-color);
    width: 70%;
    height: 90%;
    font-size: 1.4rem;
    position: relative;
    &:focus + div {
      width: 70%;
    }
  }
  p {
    position: absolute;
    left: 25%;
    bottom: 0;
    color: red;
    line-height: 1;
    font-weight: bold;
  }
  .checked {
    position: absolute;
    border-bottom: 3px solid #0ff;
    left: 25%;
    top: 64%;
    width: 0;
    transition: all 1s linear;
  }
}
</style>
