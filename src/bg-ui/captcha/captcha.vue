<!-- 定义验证码组件 -->
<!-- 
属性:title:要是输入框的内容（必传）modelValue:要进行绑定的值（必传）
type:类型，placeholder：没有值时显示的内容，isVerify:是否进行验证，verifyList:当verify为true时就必须传达，buttonInfo：button要显示的值

事件:
buttonClick

 -->
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
    <button @click="$emit('buttonClick')" :disabled="isDisable">
      {{ buttonInfo }}
    </button>
  </label>
</template>

<script lang="ts">
// 从下载的组件中导入函数
import { defineComponent, watch, ref } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
  emits: ["update:modelValue", "buttonClick"],
  name: "BgCaptcha",
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
    buttonInfo: {
      default: "获取验证码",
      type: String,
    },
    isDisable: {
      type: Boolean,
      default: false,
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
    padding: 1.5px;
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
    left: 27%;
    top: 73%;
    width: 0;
    transition: all 1s linear;
  }
  button {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    font-size: 1.3rem;
    background: rgba(0, 255, 255, 0.3);
    font-weight: bold;
    border: 2px solid var(--border-color);
    position: absolute;
    right: 5%;
    top: 10%;
  }
  button[disabled] {
    cursor: not-allowed;
  }
}
</style>
