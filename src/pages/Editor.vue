<template>
  <el-container class="container">
    <el-aside width="300px">Aside</el-aside>
    <el-container>
      <el-main
        ><div
          :style="{
            transform: `translate(${transformed.translateX}px, ${transformed.translateY}px) scale(${transformed.scale}, ${transformed.scale})`,
            transformOrigin: 'left top',
          }"
        >
          <wallpaper
            :options="example"
            :mode="example.mode"
            :width="windowWidth"
            :height="windowHeight"
          /></div
      ></el-main>
      <el-footer height="200px">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Wallpaper from "../components/Wallpaper.vue";
import { useWindowSize } from "../mixins/useWindowSize";
import fontURL from "../assets/font/en.woff2";

export default {
  components: {
    Wallpaper,
  },
  data() {
    return {
      example: {
        mode: "color",
        title: "How are you?",
        fontSize: 200,
        fontFamily: "Luckiest Guy",
        fontURL,
        background: "#fcbc23",
        text: "#532582",
      },
    };
  },
  mixins: [useWindowSize()],
  computed: {
    transformed() {
      const padding = 30;
      const mainHeight = this.windowHeight - 61 - 200;
      const mainWidth = this.windowWidth - 300;
      const width = mainWidth - padding * 2;
      const height = mainHeight - padding * 2;
      const sh = height / this.windowHeight;
      const sw = width / this.windowWidth;
      const scale = Math.min(sh, sw);
      const translateX = (mainWidth - this.windowWidth * scale) / 2;
      const translateY = (mainHeight - this.windowHeight * scale) / 2;
      return {
        scale,
        translateX,
        translateY,
      };
    },
  },
  watch: {
    $route(to) {
      const example = to.params.example || this.example;
      this.example = example;
    },
  },
};
</script>

<style scoped>
.container {
  height: calc(100vh - 61px);
}

.el-footer {
  background-color: #b3c0d1;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
  overflow: hidden;
  padding: 0px;
}
</style>