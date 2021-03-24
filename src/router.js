import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./pages/Home.vue";
import EditorPage from "./pages/Editor.vue";
import GalleryPage from "./pages/Gallery.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  {
    path: "/editor",
    component: EditorPage,
  },
  {
    path: "/gallery",
    component: GalleryPage,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
