<template>
  <div class="image-color-picker-container">
    <image-picker v-model="imageURL" :allowOnline="false" :cacheImage="false" />
    <div class="image-color-picker-colors">
      <div v-if="imageColors.length" style="color: #606266; font-size: 14px">
        Click to select {{ maxCount === Infinity ? "" : `up to ${maxCount} ` }}colors you want to
        use.
      </div>
      <span
        :key="color"
        v-for="(color, index) in imageColors"
        class="image-color-picker-color-item"
        @click="() => handleClickImageColorItem(index)"
        :style="{
          backgroundColor: color,
          borderColor: selectedImageColorIndex.indexOf(index) === -1 ? color : '#409eff',
        }"
      />
    </div>
  </div>
</template>

<script>
import ColorThief from "colorthief";
import { Message } from "element-ui";
import ImagePicker from "./ImagePicker.vue";
import { loadImage } from "../utils/load";
import { rgbToHex } from "../utils/color";

const colorThief = new ColorThief();

export default {
  props: {
    maxCount: {
      type: Number,
      default: Infinity,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ImagePicker,
  },
  data() {
    return {
      imageURL: "",
      imageColors: [],
    };
  },
  computed: {
    selectedImageColorIndex: {
      get() {
        console.log({ value: this.value });
        return this.value
          .map((vc) => this.imageColors.findIndex((ic) => vc === ic))
          .filter((d) => d !== -1);
      },
      set(newValue) {
        const colors = newValue.map((index) => this.imageColors[index]);
        this.$emit("input", colors);
      },
    },
  },
  watch: {
    imageURL: {
      immediate: true,
      async handler(newValue) {
        if (newValue === "") {
          this.imageColors = [];
          this.selectedImageColorIndex = [];
          return;
        }
        try {
          const img = await loadImage(newValue);
          const colors = colorThief.getPalette(img).map((d) => rgbToHex(...d));
          this.imageColors = colors;
        } catch (e) {
          Message.error("Extract colors from image failed!");
        }
      },
    },
  },
  methods: {
    handleClickImageColorItem(index) {
      const i = this.selectedImageColorIndex.indexOf(index);
      const newSelectedImageColorIndex = [...this.selectedImageColorIndex];
      if (i === -1) {
        if (this.selectedImageColorIndex.length >= this.maxCount) {
          Message.error(`Only can select ${this.maxCount} colors.`);
          return;
        }
        newSelectedImageColorIndex.push(index);
      } else {
        newSelectedImageColorIndex.splice(i, 1);
      }
      this.selectedImageColorIndex = newSelectedImageColorIndex;
    },
  },
};
</script>

<style >
.image-color-picker-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
}

.image-color-picker-colors {
  width: calc(100% - 250px);
  text-align: start;
  margin: 0 30px;
}

.image-color-picker-color-item {
  display: inline-block;
  width: 46px;
  height: 46px;
  margin-right: 15px;
  margin-top: 15px;
  border-radius: 5px;
  cursor: pointer;
  border-width: 4px;
  border-style: solid;
}
</style>
