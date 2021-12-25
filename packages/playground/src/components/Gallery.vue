<template>
  <div class="gallery-container" style="margin-bottom: 50px">
    <div class="device-radio">
      <i
        class="el-icon-monitor device-icon"
        @click="activeType = 'pc'"
        :style="{ color: activeType === 'pc' ? '#409eff' : '#000' }"
      />
      <i
        class="el-icon-mobile device-icon"
        @click="activeType = 'phone'"
        :style="{ color: activeType === 'phone' ? '#409eff' : '#000' }"
      />
    </div>
    <div
      v-if="gallery.length === 1"
      class="gallery-card-container"
      :style="{
        'grid-template-columns': `repeat(${activeType === 'pc' ? 4 : 6}, 1fr)`,
      }"
    >
      <div
        v-for="wallpaper in gallery[0].wallpapers"
        :key="wallpaper.name"
        @click="() => handleClickCard(responsive(wallpaper.options))"
      >
        <div style="margin: 20px">
          <!-- 设置固定宽高比 -->
          <div
            class="gallery-card"
            :style="{
              paddingBottom: (deviceSize[1] / deviceSize[0]) * 100 + '%',
            }"
          >
            <!-- 撑开容器 -->
            <div class="gallery-card-content">
              <wallpaper
                :width="deviceSize[0]"
                :height="deviceSize[1]"
                styleHeight="100%"
                styleWidth="100%"
                :options="responsive(wallpaper.options)"
              />
            </div>
          </div>
        </div>
        <div>
          <span
            >{{ wallpaper.name }}
            <el-tooltip
              effect="dark"
              content="The image comes from Internet."
              placement="top"
              v-if="wallpaper.type === 'image'"
            >
              <i class="el-icon-warning-outline" style="cursor: pointer"></i>
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gallery } from "../data/gallery";
import Wallpaper from "./Wallpaper.vue";
import { gotoEditor } from "../utils/gotoEditor";
import { adaptOptions } from "../utils/adapt";

export default {
  components: {
    Wallpaper,
  },
  data() {
    return {
      gallery,
      windowWidth: screen.width,
      windowHeight: screen.height,
      activeType: "pc",
    };
  },
  computed: {
    deviceSize() {
      if (this.activeType === "pc") {
        return [screen.width, screen.height];
      } else {
        return [375, 667];
      }
    },
  },
  name: "gallery",
  methods: {
    handleClickCard(options) {
      gotoEditor(this.$router, options, this.activeType);
    },
    responsive(options) {
      if (this.activeType === "pc") {
        return options;
      } else {
        const scale = this.deviceSize[1] / screen.height;
        return adaptOptions(options, scale);
      }
    },
  },
};
</script>

<style>
.gallery-container .el-tabs__nav {
  transform: translateX(-50%) !important;
  margin-left: 50%;
}

.gallery-container .el-tabs {
  margin-top: 2em;
}

.gallery-card-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.gallery-card {
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  cursor: pointer;
  width: 100%;
  height: 0;
  padding: 0;
  position: relative;
}

.gallery-card-content {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 10px;
  overflow: hidden;
}

.gallery-card-content:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.device-radio {
  text-align: end;
  margin-right: 20px;
}

.device-icon {
  cursor: pointer;
  padding: 3px 6px;
  transition: color 0.3s;
}

.device-icon:hover {
  cursor: pointer;
  color: #409eff !important;
}
</style>
