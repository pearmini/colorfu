import Vue from "vue";
import { Menu, MenuItem, Button, Carousel, CarouselItem } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
