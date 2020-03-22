import Vue from "vue";
import App from "./App.vue";
import { gsap } from "gsap";

gsap.defaults({ ease: "sine.out", duration: 2.3 });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
