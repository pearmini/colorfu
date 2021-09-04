<template>
  <canvas ref="canvas" />
</template>

<script>
import { drawColorWords } from "../utils/canvas";
import { loadFont } from "../utils/font";

export default {
  props: {
    options: {
      title: String,
      bgColor: String,
      fontSize: Number,
      fontFamily: {
        type: String,
        default: "wallpaper",
      },
      textColor: String,
      mode: String,
      fontURL: String,
    },
    width: Number,
    height: Number,
  },
  data() {
    return {
      fontFace: undefined,
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.fontFace = undefined;
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
      const options = { ...this.options, fontFace: this.fontFace };
      drawColorWords(this.$refs.canvas, this.width, this.height, options);
    },
    async initFont() {
      const { fontFamily, fontURL } = this.options;
      this.fontFace = await loadFont(this.fontFace, { fontFamily, fontURL });
    },
  },
};
</script>

<style scoped>
</style>