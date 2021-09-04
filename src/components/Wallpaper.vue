<template>
  <canvas ref="canvas" />
</template>

<script>
import { drawColorWords, drawPatternWords } from "../utils/words";
import { loadFont } from "../utils/font";

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
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    options: {
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
      switch (this.mode) {
        case "color":
          drawColorWords(this.$refs.canvas, this.width, this.height, options);
          break;
        case "pattern":
          drawPatternWords(this.$refs.canvas, this.width, this.height, options);
          break;
      }
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