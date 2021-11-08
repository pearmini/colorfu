<template>
  <div class="gallery-container">
    <div v-if="gallery.length === 1" class="gallery-card-container" style="margin-top: 50px">
      <div
        v-for="wallpaper in gallery[0].wallpapers"
        :key="wallpaper.name"
        @click="() => handleClickCard(wallpaper.options)"
      >
        <div
          class="gallery-card"
          :style="{
            paddingBottom: (windowHeight / windowWidth) * 100 + '%',
          }"
        >
          <div class="gallery-card-content">
            <wallpaper
              :width="windowWidth"
              :height="windowHeight"
              styleHeight="100%"
              styleWidth="100%"
              :options="wallpaper.options"
            />
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
    <el-tabs v-else type="card" :value="gallery[0].name">
      <el-tab-pane
        :label="collection.name"
        :name="collection.name"
        v-for="collection in gallery"
        :key="collection.name"
      >
        <div class="gallery-card-container">
          <div
            v-for="wallpaper in collection.wallpapers"
            :key="wallpaper.name"
            class="gallery-card"
            @click="() => handleClickCard(wallpaper.options)"
          >
            <wallpaper
              :width="windowWidth"
              :height="windowHeight"
              styleHeight="100%"
              styleWidth="100%"
              :options="wallpaper.options"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { gallery } from "../data/gallery";
import Wallpaper from "./Wallpaper.vue";

export default {
  components: {
    Wallpaper,
  },
  data() {
    return {
      gallery,
      windowWidth: screen.width,
      windowHeight: screen.height,
    };
  },
  name: "gallery",
  computed: {
    cardSize() {
      const col = 4;
      const cardWidth = this.windowWidth / col;
      const cartHeight = (cardWidth * this.windowHeight) / this.windowWidth;
      return {
        width: cardWidth + "px",
        height: cartHeight + "px",
      };
    },
  },
  methods: {
    handleClickCard(options) {
      localStorage.setItem("cd-example", JSON.stringify(options));
      this.$router.push({ path: "editor" });
    },
  },
};
</script>

<style>
.gallery-card-container {
  margin-bottom: 70px;
}

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
  margin: 20px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.gallery-card-content:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
