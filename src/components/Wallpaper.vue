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
import {
  drawColorWords,
  drawImageWords,
  drawPatternWords,
} from "../utils/words";

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
        if (newData.fontURL !== oldData.fontURL) this.fontFace = undefined;
        this.image = undefined;
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
      this.fontFace = await this.loadFont();
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
          this.image = await this.loadImage();
          drawImageWords(this.$refs.canvas, this.width, this.height, {
            ...options,
            image: this.image,
          });
          break;
      }
    },
    async loadFont() {
      const { fontFamily, fontURL } = this.options;
      // return cached fontFace
      if (!fontURL || (this.fontFace && this.fontFace.loaded)) {
        return this.fontFace;
      }

      // load fontFace and return
      this.$emit("onLoadingFont");
      this.loading = true;
      const fontFace = await new FontFace(fontFamily, `url(${fontURL})`).load();
      this.loading = false;
      this.$emit("onLoadedFont");
      return fontFace;
    },
    async loadImage() {
      // return cached iamge
      if (this.image) return this.image;

      // load image and return
      this.$emit("onLoadingImage");
      this.loading = true;
      const newImage = new Image();
      const { imageURL } = this.options;
      newImage.src = imageURL;

      const image = await new Promise((resolve) => {
        newImage.onload = function () {
          resolve(newImage);
        };
      });
      this.loading = false;
      this.$emit("onLoadedImage");
      return image;
    },
  },
};
</script>