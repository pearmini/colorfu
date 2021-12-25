import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./pages/Home.vue";
import EditorPage from "./pages/Editor.vue";
import StoryPage from "./pages/Story.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  {
    path: "/editor",
    component: EditorPage,
    name: "editor",
  },
  {
    path: "/story",
    component: StoryPage,
    name: "story",
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
