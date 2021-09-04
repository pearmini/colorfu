<template>
  <div>
    <h1>Carpe Diem</h1>
    <p>
      Use words mixed with colors, patterns and images to make awesome wallpaper
      to carpe diem. 🍉
    </p>
    <button>Get Started</button>
    <scale
      v-for="(example, index) in examples"
      :key="example.type"
      :from="dimensions[index].from"
      :to="dimensions[index].to"
      :progress="progress"
    >
      <screen :type="example.type">
        <wallpaper
          :options="example.data"
          :width="dimensions[index].from.width"
          :height="dimensions[index].from.height"
        />
      </screen>
    </scale>
  </div>
</template>

<script>
import Wallpaper from "../components/Wallpaper.vue";
import Scale from "../components/Scale.vue";
import Screen from "../components/Screen.vue";
import { useWindowScroll } from "../mixins/useWindowScroll";
import { useWindowSize } from "../mixins/useWindowSize";
import fontURL from "../assets/font/en.woff2";
import { map } from "../utils/math";

const [MIN_Y, MAX_Y] = [0, 200];

export default {
  data() {
    return {
      examples: [
        {
          type: "mac",
          data: {
            title: "How are you?",
            bgColor: "#132743",
            textColor: "#d7385e",
            fontSize: 230,
            fontFamily: "Luckiest Guy",
            fontURL,
          },
        },
      ],
    };
  },
  mixins: [useWindowScroll(MIN_Y, MAX_Y), useWindowSize()],
  computed: {
    progress() {
      return map(this.scrollY, MIN_Y, MAX_Y, 0, 1);
    },
    dimensions() {
      const scale = 0.5;
      return [
        {
          from: {
            x: 0,
            y: 0,
            width: this.windowWidth,
            height: this.windowHeight,
          },
          to: {
            width: this.windowWidth * scale,
            height: this.windowHeight * scale,
            x: (this.windowWidth * (1 - scale)) / 2,
            y: this.windowHeight - 100 - this.windowHeight * scale,
          },
        },
      ];
    },
  },
  components: {
    Wallpaper,
    Scale,
    Screen,
  },
};
</script>

<style>
</style>