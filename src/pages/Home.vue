<template>
  <div>
    <h1>Carpe Diem</h1>
    <p>
      Use words mixed with colors, patterns and images to make awesome wallpaper
      to carpe diem. 🍉
    </p>
    <button>Get Started</button>
    <div
      class="example"
      :style="{
        left: transformed.x + 'px',
        top: transformed.y + 'px',
        transform: `scale(${transformed.scale}, ${transformed.scale})`,
        transformOrigin: 'left top',
      }"
    >
      <screen
        :src="screenURL"
        :meta="screenMeta"
        :width="transformed.width"
        :height="transformed.height"
      >
        <wallpaper
          :options="example"
          :width="transformed.width"
          :height="transformed.height"
          :mode="mode"
          @loadingImage="handleLoadingImage"
          @imageLoaded="handleImageLoaded"
        />
      </screen>
    </div>
    <div class="switcher">
      <div>
        <input
          type="radio"
          id="color"
          name="drone"
          value="color"
          v-model="mode"
          :disabled="disabled"
        />
        <label for="color">Color</label>
      </div>
      <div>
        <input
          type="radio"
          id="pattern"
          name="drone"
          value="pattern"
          v-model="mode"
          :disabled="disabled"
        />
        <label for="pattern">Pattern</label>
      </div>
      <div>
        <input
          type="radio"
          id="image"
          name="drone"
          value="image"
          v-model="mode"
          :disabled="disabled"
        />
        <label for="image">Image</label>
      </div>
    </div>
  </div>
</template>

<script>
import Wallpaper from "../components/Wallpaper.vue";
import Screen from "../components/Screen.vue";
import fontURL from "../assets/font/en.woff2";
import screenURL from "../assets/images/mac.png";
import { useWindowScroll } from "../mixins/useWindowScroll";
import { useWindowSize } from "../mixins/useWindowSize";
import { map } from "../utils/math";

const [MIN_Y, MAX_Y] = [0, 200];

export default {
  components: {
    Wallpaper,
    Screen,
  },
  data() {
    return {
      mode: "image",
      screenURL,
      screenMeta: {
        left: 145,
        right: 145,
        top: 45,
        bottom: 85,
        width: 1211,
        height: 707,
      },
      disabled: false,
    };
  },
  mixins: [useWindowScroll(MIN_Y, MAX_Y), useWindowSize()],
  computed: {
    progress() {
      return map(this.scrollY, MIN_Y, MAX_Y, 0, 1);
    },
    example() {
      const options = {
        title: "How are you?",
        fontSize: 200,
        fontFamily: "Luckiest Guy",
        fontURL,
      };
      const modeOptions = {
        color: {
          ...options,
          background: "#fcbc23",
          text: "#532582",
        },
        pattern: {
          ...options,
          background: {
            backgroundColor: "white",
            patternColor: "#ddd",
            type: "line",
          },
          text: {
            backgroundColor: "#89E089",
            patternColor: "currentColor",
            type: "line",
            rotation: -45,
            width: 25,
            height: 25,
          },
        },
        image: {
          ...options,
          imageURL: "https://i.loli.net/2021/09/04/drBtUVNhlq87Rwc.jpg",
          text: "#fff",
        },
      };
      return modeOptions[this.mode];
    },
    dimension() {
      const scale = 0.5;
      const bottom = 150;
      const macAspect = 0.625;
      return {
        from: {
          x: 0,
          y: 0,
          width: this.windowWidth,
          height: this.windowHeight,
          scale: 1,
        },
        to: {
          width: this.windowWidth,
          height: this.windowWidth * macAspect,
          x: (this.windowWidth * (1 - scale)) / 2,
          y: this.windowHeight - this.windowWidth * macAspect * scale - bottom,
          scale,
        },
      };
    },
    transformed() {
      const { from, to } = this.dimension;
      const {
        x: fromX,
        y: fromY,
        width: fromW,
        height: fromH,
        scale: fromS,
      } = from;
      const { x: toX, y: toY, width: toW, height: toH, scale: toS } = to;
      return {
        x: map(this.progress, 0, 1, fromX, toX),
        y: map(this.progress, 0, 1, fromY, toY),
        width: map(this.progress, 0, 1, fromW, toW),
        height: map(this.progress, 0, 1, fromH, toH),
        scale: map(this.progress, 0, 1, fromS, toS),
      };
    },
  },
  methods: {
    handleLoadingImage() {
      this.disabled = true;
    },
    handleImageLoaded() {
      this.disabled = false;
    },
  },
};
</script>

<style>
.switcher {
  display: flex;
  position: fixed;
  bottom: 1em;
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 0);
}

.switcher > div {
  margin-right: 1em;
}

.switcher > div > label {
  margin-left: 0.5em;
}

.example {
  position: absolute;
  z-index: 10;
}
</style>