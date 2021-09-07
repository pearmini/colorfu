<template>
  <div>
    <div class="top-container" :style="{ height: topHeight + 'px' }">
      <div class="top">
        <h1>Carpe Diem</h1>
        <p>
          Use words mixed with colors, patterns and images to communicate with
          your wallpaper. 🍉
        </p>
        <el-button type="primary">Get Started</el-button>
        <el-button type="success">Explore</el-button>
      </div>
    </div>
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
        <el-carousel :height="transformed.height + 'px'">
          <el-carousel-item v-for="example in examples" :key="example.mode">
            <wallpaper
              :options="example"
              :width="transformed.width"
              :height="transformed.height"
              :mode="example.mode"
              @loadingImage="handleLoadingImage"
              @imageLoaded="handleImageLoaded"
            />
          </el-carousel-item>
        </el-carousel>
      </screen>
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
      examples: [
        {
          mode: "color",
          title: "How are you?",
          fontSize: 200,
          fontFamily: "Luckiest Guy",
          fontURL,
          background: "#fcbc23",
          text: "#532582",
        },
        {
          mode: "pattern",
          title: "How are you?",
          fontSize: 200,
          fontFamily: "Luckiest Guy",
          fontURL,
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
        {
          mode: "image",
          title: "How are you?",
          fontSize: 200,
          fontFamily: "Luckiest Guy",
          fontURL,
          imageURL: "https://i.loli.net/2021/09/04/drBtUVNhlq87Rwc.jpg",
          text: "#fff",
        },
      ],
    };
  },
  mixins: [useWindowScroll(MIN_Y, MAX_Y), useWindowSize()],
  computed: {
    progress() {
      return map(this.scrollY, MIN_Y, MAX_Y, 0, 1);
    },
    dimension() {
      const bottom = 100;
      const macAspect = 0.625;
      const toHeight = ((this.windowHeight * 0.7 - 61) * (707 - 45 - 85)) / 707 - bottom / 2;
      const scale = toHeight / (this.windowWidth * macAspect);
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
    topHeight() {
      return this.windowHeight * 0.3;
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
.example {
  position: absolute;
  z-index: 10;
}

.top-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top > h1 {
  margin: 0.25em;
  font-weight: bold;
  font-size: 50px;
}

.top > p {
  font-size: 20px;
  margin-bottom: 1em;
}
</style>