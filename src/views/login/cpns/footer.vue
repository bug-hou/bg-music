<template>
  <footer>
    <div class="selectLogin">
      <p
        v-for="(item, index) in list"
        :class="{
          select: currentSelect == item.name,
          iconfont: true,
          [item['class']]: true,
        }"
        :name="item.name"
        :title="item.title"
        :key="item.id"
        @click="changeSelect(index)"
      ></p>
    </div>
  </footer>
</template>

<script lang="ts">
interface IList {
  name: string;
  title: string;
  class: string;
  id: string;
  path: string;
}

// 从下载的组件中导入函数;
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";

// 自定义组件引入
export default defineComponent({
  name: "cpn-footer",
  setup() {
    // 引入router组件
    const router = useRouter();
    const currentSelect = ref("account");
    const list: IList[] = reactive([
      {
        name: "account",
        title: "账号登录",
        id: "#asdf",
        class: "icon-zhanghaodenglu",
        path: "/login/account",
      },
      {
        name: "email",
        title: "邮箱登录",
        id: "#1234",
        class: "icon-youxiangdenglu",
        path: "/login/email",
      },
      {
        name: "phone",
        title: "短信登录",
        id: "#jkl",
        class: "icon-duanxindenglu",
        path: "/login/phone",
      },
    ]);
    return {
      currentSelect,
      list,
      changeSelect(index: number) {
        currentSelect.value = list[index].name;
        router.push(list[index].path);
      },
    };
  },
});
</script>

<style scoped lang="less">
footer {
  .selectLogin {
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    p {
      width: 40px;
      height: 40px;
      line-height: 35px;
      font-size: 2rem;
      color: var(--select-color);
      border: 3px solid var(--border-color);
      border-radius: 50%;
    }
    .select {
      color: var(--font-color);
    }
  }
}
@media screen and (max-width: 500px) {
  footer {
    .selectLogin {
      margin-top: 30px;
    }
  }
}
</style>
