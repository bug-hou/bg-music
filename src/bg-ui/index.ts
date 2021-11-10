import { App } from "vue";

import BgInput from "./input/input.vue";
import BgRadio from "./radio/radio.vue";
import BgCaptcha from "./captcha/captcha.vue";
import BgButton from "./button/button.vue";

const componet = [BgInput, BgRadio, BgCaptcha, BgButton];

export default {
  install(app: App) {
    componet.forEach((item) => {
      console.log(item.name);
      app.component(item.name, item);
    });
  },
};
