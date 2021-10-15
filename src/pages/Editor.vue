<template>
  <el-container class="editor-container">
    <el-aside width="300px">
      <attribute-tree :options="attribute" :values="example" />
    </el-aside>
    <el-container>
      <div :class="{ preivew: preview }" :style="wallpaperStyles">
        <wallpaper
          :options="wallpaperOptions"
          :width="windowWidth"
          :height="windowHeight"
          @on-success="canvas = $event"
        />
      </div>
      <div class="tools-container">
        <el-button type="primary" icon="el-icon-view" circle @click="handlePreview"></el-button>
        <el-button
          type="primary"
          icon="el-icon-download"
          circle
          @click="handleDownloadFile"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-picture-outline"
          circle
          @click="handleDownloadImage"
        ></el-button>
      </div>
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
import { downloadImage, downloadFile } from "../utils/file";
import { Message } from "element-ui";

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
      preview: false,
    };
  },
  mixins: [useWindowSize()],
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("fullscreenchange", this.handleFullScreenChange);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("fullscreenchange", this.handleFullScreenChange);
  },
  computed: {
    wallpaperStyles() {
      const { transformed } = this;
      return this.preview
        ? {}
        : {
            transform: `translate(${transformed.translateX}px, ${transformed.translateY}px) scale(${transformed.scale}, ${transformed.scale})`,
            transformOrigin: "left top",
          };
    },
    attribute() {
      return getAttributeOptions(this.example);
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
    handleDownloadImage() {
      downloadImage(this.canvas, "wallpaper");
    },
    handleDownloadFile() {
      downloadFile(this.example, "wallpaper");
    },
    async handlePreview() {
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        // 如果没有进入到全屏模式失败
        // 那么就是走这里进入伪全屏
        this.preview = true;
        Message.success("Press esc to exit full screen!");
      }
    },
    // 在全凭模式下按下 esc 键不会触发该事件
    // 这个只是针对进入到全屏模式失败的情况
    handleKeydown({ key }) {
      if (key === "Escape" && this.preview) {
        this.preview = false;
      }
    },
    handleFullScreenChange() {
      this.preview = !this.preview;
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

.tools-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 900;
}

.preivew {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
</style>