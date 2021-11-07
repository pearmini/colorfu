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
  InputNumber,
  Upload,
  Loading,
  Select,
  Option,
  Radio,
  Dialog,
  Tooltip,
  Popover,
  Tabs,
  TabPane,
  Empty,
  Card,
  Link,
  OptionGroup,
} from "element-ui";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import "./assets/css/devices.min.css";
import locale from "element-ui/lib/locale";
import lang from "element-ui/lib/locale/lang/en";

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
Vue.use(InputNumber);
Vue.use(Upload);
Vue.use(Loading);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(TabPane);
Vue.use(Tabs);
Vue.use(Empty);
Vue.use(Card);
Vue.use(OptionGroup);
Vue.use(Link);
Vue.component(CollapseTransition.name, CollapseTransition);

locale.use(lang);

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
