<template>
  <canvas ref="canvas" />
</template>

<script>
import {
  drawColorWords,
  drawImageWords,
  drawPatternWords,
} from "../utils/words";
import { loadFont, loadImage } from "../utils/load";

export default {
  props: {
    options: {
      title: String,
      fontSize: Number,
      fontFamily: {
        type: String,
        default: "wallpaper",
      },
      mode: String,
      fontURL: String,
      background: [String, Object],
      text: [String, Object],
    },
    width: Number,
    height: Number,
    mode: String,
  },
  data() {
    return {
      fontFace: undefined,
      image: undefined,
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    options: {
      deep: true,
      handler(oldData, newData) {
        if (newData.fontURL !== oldData.fontURL) this.fontFace = undefined;
        if (newData.imageURL !== newData.imageURL) this.image = undefined;
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
      await this.initFont();
      const options = {
        ...this.options,
        fontFace: this.fontFace,
      };
      switch (this.mode) {
        case "color":
          drawColorWords(this.$refs.canvas, this.width, this.height, options);
          break;
        case "pattern":
          drawPatternWords(this.$refs.canvas, this.width, this.height, options);
          break;
        case "image":
          await this.initImage();
          drawImageWords(this.$refs.canvas, this.width, this.height, {
            ...options,
            image: this.image,
          });
          break;
      }
    },
    async initFont() {
      const { fontFamily, fontURL } = this.options;
      this.fontFace = await loadFont(this.fontFace, { fontFamily, fontURL });
    },
    async initImage() {
      const { imageURL } = this.options;
      this.image = await loadImage(this.image, { imageURL });
    },
  },
};
</script>

<style scoped>
</style>