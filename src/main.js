import Vue from "vue";
import {
  Menu,
  MenuItem,
  Button,
  Carousel,
  CarouselItem,
  Container,
  Aside,
  Main,
  Footer,
  Input,
  ColorPicker,
  Slider,
  Upload,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Main);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Footer);
Vue.use(Input);
Vue.use(ColorPicker);
Vue.use(Slider);
Vue.use(Upload);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
