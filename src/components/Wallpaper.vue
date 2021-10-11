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
import { Message } from "element-ui";
import { drawWallpaper } from "../utils/wallpaper";
import { loadImage, loadFont } from "../utils/load";
import { deepCopy } from "../utils/object";

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
      loading: false,
      rendering: false,
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
        if (newData.background.imageURL !== oldData.background.imageURL) this.image = undefined;
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
      try {
        if (this.rendering) return;
        this.rendering = true;

        await this.loadAssets();
        const options = deepCopy(this.options);
        if (this.image) options.background.image = this.image;
        drawWallpaper(this.$refs.canvas, this.width, this.height, options);

        this.rendering = false;
      } catch (e) {
        this.rendering = false;
        Message.error("Failed to draw!");
        console.error(e);
      }
    },
    async loadAssets() {
      const { fontURL, fontFamily } = this.options.text;
      const { imageURL } = this.options.background;
      const shouldLoadFont = fontURL && (!this.fontFace || !this.fontFace.loaded);
      const shouldLoadImage = imageURL && !this.image;
      if (!shouldLoadFont && !shouldLoadImage) return;

      this.loading = true;
      this.fontFace = shouldLoadFont ? await loadFont(fontURL, fontFamily) : this.fontFace;
      this.image = shouldLoadImage ? await loadImage(imageURL) : this.image;
      this.loading = false;
    },
  },
};
</script>