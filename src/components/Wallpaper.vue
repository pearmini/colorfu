<template>
  <div
    class="container"
    v-loading="loading"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <canvas ref="canvas" />
  </div>
</template>

<script>
import { drawWallpaper } from "../utils/wallpaper";
import { loadImage, loadFont } from "../utils/load";
import { Message } from "element-ui";

export default {
  props: {
    options: Object,
    width: Number,
    height: Number,
  },
  data() {
    return {
      fontFace: undefined,
      image: undefined,
      loading: true,
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    options: {
      deep: true,
      handler(oldData, newData) {
        if (newData.text.fontURL !== oldData.text.fontURL) this.fontFace = undefined;
        if (newData.background.imageURL !== oldData.text.fontURL) this.image = undefined;
        this.render();
      },
    },
    width() {
      this.render();
    },
    height() {
      this.render();
    },
  },
  methods: {
    async render() {
      await this.loadAssets();
      if (this.image) this.options.background.image = this.image;
      drawWallpaper(this.$refs.canvas, this.width, this.height, this.options);
    },
    async loadAssets() {
      try {
        const { fontURL, fontFamily } = this.options.text;
        const { imageURL } = this.options.background;
        const shouldLoadFont = fontURL && (!this.fontFace || !this.fontFace.loaded);
        const shouldLoadImage = imageURL && !this.image;
        if (!shouldLoadFont && !shouldLoadImage) return;
        this.loading = true;
        this.fontFace = shouldLoadFont ? await loadFont(fontURL, fontFamily) : this.fontFace;
        this.image = shouldLoadImage ? await loadImage(imageURL) : this.image;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        Message.error("Failed to load assets!");
        console.error(e);
      }
    },
  },
};
</script>