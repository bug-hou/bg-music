import { App } from "vue";

import BgInput from "./input/input.vue";
import BgRadio from "./radio/radio.vue"

const componet = [BgInput, BgRadio];

export default {
  install(app: App) {
    componet.forEach((item) => {
      app.component(item.name, item);
    });
  },
};
