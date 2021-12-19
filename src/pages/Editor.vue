<template>
  <el-container class="editor-container">
    <el-aside width="300px">
      <attribute-tree :options="attribute" :values="example" @update="handleUpdateExample" />
    </el-aside>
    <el-container>
      <div class="main-container">
        <div class="tools-container">
          <div class="tools">
            <div class="tool-item">
              <el-dropdown @command="activeDevice = $event" size="medium">
                <span class="el-dropdown-link">
                  Size: {{ devices[activeDevice].name
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in devices"
                    :key="item.key"
                    :divided="item.divided"
                    :command="index"
                    >{{ item.name }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="tool-item">
              <el-input-number
                :value="deviceSize[0]"
                controls-position="right"
                :min="1"
                size="mini"
                :disabled="activeDevice !== 0"
                @change="customWidth = $event"
              ></el-input-number>
              <i class="el-icon-sort icon-switch" @click="rotate = !rotate"></i>
              <el-input-number
                :value="deviceSize[1]"
                controls-position="right"
                :min="1"
                size="mini"
                :disabled="activeDevice !== 0"
                @change="customHeight = $event"
              ></el-input-number>
              <span class="scale-text">
                {{ `${(transformed.scale * 100).toFixed(1)}%` }}
              </span>
            </div>
            <div class="tool-item">
              <el-tooltip effect="dark" content="Preview" placement="bottom">
                <i class="el-icon-view" @click="handlePreview"></i>
              </el-tooltip>
            </div>
            <div class="tool-item">
              <el-dropdown
                @command="$event === 'image' ? handleDownloadImage() : handleDownloadFile()"
                size="medium"
                placement="bottom"
              >
                <span class="el-dropdown-link">
                  <i class="el-icon-download"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="image">
                    <i class="el-icon-picture-outline el-icon--left"></i>
                    Image
                  </el-dropdown-item>
                  <el-dropdown-item command="file">
                    <i class="el-icon-files el-icon--left"></i>
                    File
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="preview-container" ref="preview">
          <div :class="{ preview: fullscreen }" :style="wallpaperStyles">
            <wallpaper
              :options="example"
              :width="deviceSize[0]"
              :height="deviceSize[1]"
              :animate="false"
              @on-success="canvas = $event"
            />
          </div>
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import { Message } from "element-ui";
import Wallpaper from "../components/Wallpaper.vue";
import AttributeTree from "../components/AttributeTree.vue";
import { getAttributeOptions } from "../utils/attribute";
import { downloadImage, downloadFile } from "../utils/file";
import { set, deepCopy, get } from "../utils/object";
import { useWindowSize } from "../mixins/useWindowSize";
import { useFullscreen } from "../mixins/useFullscreen";
import { useElementBox } from "../mixins/useElementBox";
import { color } from "../data/examples";

export default {
  components: {
    Wallpaper,
    AttributeTree,
  },
  name: "editor",
  data() {
    const example = localStorage.getItem("cd-example");
    return {
      example: example ? JSON.parse(example) : color,
      activeDevice: 1,
      customWidth: screen.width,
      customHeight: screen.height,
      rotate: false,
      devices: [
        { name: "Custom" },
        { name: "PC", width: screen.width, height: screen.height, divided: true },
        { name: "Moto G4", width: 360, height: 640, divided: true },
        { name: "Galaxy S5", width: 360, height: 640 },
        { name: "Pixel 2", width: 411, height: 731 },
        { name: "Pixel 2 XL", width: 411, height: 823 },
        { name: "IPhone 5/SE", width: 320, height: 568 },
        { name: "IPhone 6/7/8", width: 375, height: 667 },
        { name: "IPhone 6/7/8 Plus", width: 414, height: 736 },
        { name: "IPhone X", width: 375, height: 812 },
        { name: "IPad", width: 768, height: 1024 },
        { name: "IPad Pro", width: 1024, height: 1366 },
        { name: "Surface Duo", width: 540, height: 720 },
        { name: "Galaxy Fold", width: 280, height: 653 },
        { name: "Nest Hub", width: 1024, height: 600 },
        { name: "Nest Hub Max", width: 1280, height: 800 },
      ],
    };
  },
  mixins: [useWindowSize(), useFullscreen(), useElementBox("preview")],
  watch: {
    deviceSize(newValue, oldValue) {
      const mode = get(this.example, "text.mode");
      if (mode === "autoFit") return;
      const oldSize = get(this.example, "text.fontSize");
      const [oldWidth] = oldValue;
      const [newWidth] = newValue;
      const scale = newWidth / oldWidth;
      const newSize = oldSize * scale;
      this.handleUpdateExample({ key: "text.fontSize", value: newSize });
    },
  },
  computed: {
    wallpaperStyles() {
      const {
        transformed: { translateX, translateY, scale },
      } = this;
      return this.fullscreen
        ? {}
        : {
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale}, ${scale})`,
            transformOrigin: "left top",
          };
    },
    deviceSize() {
      // 自定义大小
      let deviceWidth;
      let deviceHeight;
      if (this.activeDevice === 0) {
        deviceWidth = this.customWidth;
        deviceHeight = this.customHeight;
      } else {
        const { width, height } = this.devices[this.activeDevice];
        deviceWidth = width;
        deviceHeight = height;
      }
      if (this.rotate) {
        [deviceWidth, deviceHeight] = [deviceHeight, deviceWidth];
      }
      return [deviceWidth, deviceHeight];
    },
    attribute() {
      return getAttributeOptions(this.example);
    },
    transformed() {
      const { previewWidth, previewHeight } = this;
      const [deviceWidth, deviceHeight] = this.deviceSize;
      const padding = 50;
      const width = previewWidth - padding * 2;
      const height = previewHeight - padding * 2;
      const sh = height / deviceHeight;
      const sw = width / deviceWidth;
      const scale = Math.min(sh, sw, 1);
      const translateX = (previewWidth - deviceWidth * scale) / 2;
      const translateY = (previewHeight - deviceHeight * scale) / 2;
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
      try {
        downloadImage(this.canvas, "wallpaper");
      } catch (e) {
        Message.error({
          message:
            "The online image can't be downloaded, You can take a screenshot in preview mode or upload local image!",
          duration: 5000,
        });
        console.log(e);
      }
    },
    handleDownloadFile() {
      downloadFile(this.example, "index");
    },
    handleHelp() {
      this.$router.push("/story");
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

<style>
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

.main-container {
  width: 100%;
}

.tools-container {
  height: 48px;
  width: 100%;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
}

.tools-container .el-input-number--mini {
  width: 100px;
}

.tool-item {
  margin-right: 15px;
  cursor: pointer;
  color: #606266;
}

.el-dropdown-link:hover {
  color: #409eff;
}

.tool-item:hover {
  color: #409eff;
}

.tools {
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 48px;
}

.preview-container {
  height: calc(100vh - 61px - 48px);
  width: 100%;
}

.tools-container .el-button {
  margin: 0 6px;
}

.preview {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  /** slider 的 z-index 是 1001 */
  z-index: 1005;
}

.icon-switch {
  transform: rotate(90deg);
  padding: 0 10px;
}

.scale-text {
  font-size: 12px;
  line-height: 28px;
}
</style>