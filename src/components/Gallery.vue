<template>
  <div class="gallery-container">
    <el-tabs type="card" :value="gallery[0].name">
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
import { useWindowSize } from "../mixins/useWindowSize";

export default {
  components: {
    Wallpaper,
  },
  data() {
    return {
      gallery,
    };
  },
  name: "gallery",
  mixins: [useWindowSize()],
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
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  margin: 20px;
  cursor: pointer;
}

.gallery-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
