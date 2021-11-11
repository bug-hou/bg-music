import { useStore } from "vuex";
import {} from "vue";
export default function (name?: string) {
  const store = useStore();
  const sendNetwork = (username: string, password: string) => {
    store.dispatch("login/" + name ?? "sendAccountLogin", {
      account: username,
      password,
    });
  };
  return {
    sendNetwork,
  };
}
