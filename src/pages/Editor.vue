<template>
  <el-container class="editor-container">
    <el-aside width="300px">
      <attribute-tree :options="attribute" :values="example" />
    </el-aside>
    <el-container>
      <div
        :style="{
          transform: `translate(${transformed.translateX}px, ${transformed.translateY}px) scale(${transformed.scale}, ${transformed.scale})`,
          transformOrigin: 'left top',
        }"
      >
        <wallpaper
          :options="wallpaperOptions"
          :width="windowWidth"
          :height="windowHeight"
          @on-success="canvas = $event"
        />
      </div>
      <el-button
        type="primary"
        icon="el-icon-download"
        circle
        class="btn-download"
        @click="handleDownload"
      ></el-button>
    </el-container>
  </el-container>
</template>

<script>
import Wallpaper from "../components/Wallpaper.vue";
import AttributeTree from "../components/AttributeTree.vue";
import { useWindowSize } from "../mixins/useWindowSize";
import fontURL from "../assets/font/en.woff2";
import { getAttributeOptions } from "../utils/attribute";
import { deepCopy } from "../utils/object";

export default {
  components: {
    Wallpaper,
    AttributeTree,
  },
  data() {
    const defaultExample = {
      text: {
        content: "How are you?",
        fontSize: 200,
        fontFamily: "Luckiest Guy",
        fontURL,
        type: "none",
        color: "#532582",
      },
      background: {
        type: "none",
        color: "#fcbc23",
      },
      canvas: undefined,
    };
    const example = localStorage.getItem("cd-example");
    return {
      example: example ? JSON.parse(example) : defaultExample,
      init: true,
    };
  },
  mixins: [useWindowSize()],
  computed: {
    attribute() {
      const {
        text: { type: textType },
        background: { type: backgroundType },
      } = this.example;
      return getAttributeOptions(textType, backgroundType);
    },
    wallpaperOptions() {
      // Avoid use same example for attribute-tree and wallpaper.
      // This will make the watcher of wallpaper' options props always have the same newData and oldData.
      return deepCopy(this.example);
    },
    transformed() {
      const padding = 50;
      // 30 is for the tool buttons at the the bottom line
      const mainHeight = this.windowHeight - 61 - 30;
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
  methods: {
    handleDownload() {
      const a = document.createElement("a");
      a.download = "wallpaper";
      a.href = this.canvas.toDataURL("image/png");
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
  },
};
</script>

<style scoped>
.editor-container {
  height: calc(100vh - 61px);
}

.el-aside {
  background-color: #ffffff;
}

.el-container {
  background-color: #e5e5e5;
  overflow: hidden;
  padding: 0px;
}

.btn-download {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
}
</style>