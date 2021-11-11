import { App } from "vue";

import BgInput from "./input/input.vue";
import BgRadio from "./radio/radio.vue";
import BgCaptcha from "./captcha/captcha.vue";
import BgButton from "./button/button.vue";
import BgTootip from "./tootip/tootip.vue";

const componet = [BgInput, BgRadio, BgCaptcha, BgButton, BgTootip];

export default {
  install(app: App) {
    componet.forEach((item) => {
      console.log(item.name);
      app.component(item.name, item);
    });
  },
};
