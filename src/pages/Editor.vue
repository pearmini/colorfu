<template>
  <el-container class="editor-container">
    <el-aside width="300px">
      <attribute-tree :options="attribute" :values="example" @update="handleUpdateExample" />
    </el-aside>
    <el-container>
      <div :class="{ preivew: fullscreen }" :style="wallpaperStyles">
        <wallpaper
          :options="example"
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
import { Message } from "element-ui";
import Wallpaper from "../components/Wallpaper.vue";
import AttributeTree from "../components/AttributeTree.vue";
import fontURL from "../assets/font/en.woff2";
import { getAttributeOptions } from "../utils/attribute";
import { downloadImage, downloadFile } from "../utils/file";
import { set, deepCopy } from "../utils/object";
import { useWindowSize } from "../mixins/useWindowSize";
import { useFullscreen } from "../mixins/useFullscreen";

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
    };
  },
  mixins: [useWindowSize(), useFullscreen()],
  computed: {
    wallpaperStyles() {
      const { transformed: t } = this;
      return this.fullscreen
        ? {}
        : {
            transform: `translate(${t.translateX}px, ${t.translateY}px) scale(${t.scale}, ${t.scale})`,
            transformOrigin: "left top",
          };
    },
    attribute() {
      return getAttributeOptions(this.example);
    },
    transformed() {
      const padding = 50;
      const bottomToolsHeight = 30;
      const mainHeight = this.windowHeight - 61 - bottomToolsHeight;
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
    handleUpdateExample({ key, value }) {
      // 每次更新的时候都深度拷贝一份
      // 这样 watcher 里面的 newData 和 oldData 就会不一样了
      this.example = deepCopy(this.example);
      set(this.example, key, value);
    },
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
        Message.success("Failed to enter full screen");
      }
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
  /** slider 的 z-index 是 1001 */
  z-index: 1005;
}
</style>