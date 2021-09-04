<template>
  <div>
    <h1>Carpe Diem</h1>
    <p>
      Use words mixed with colors, patterns and images to make awesome wallpaper
      to carpe diem. 🍉
    </p>
    <button>Get Started</button>
    <scale :from="dimension.from" :to="dimension.to" :progress="progress">
      <screen>
        <wallpaper
          :options="example"
          :width="dimension.from.width"
          :height="dimension.from.height"
          :mode="mode"
        />
      </screen>
    </scale>
    <div class="switcher">
      <div>
        <input
          type="radio"
          id="color"
          name="drone"
          value="color"
          v-model="mode"
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
        />
        <label for="image">Image</label>
      </div>
    </div>
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
      mode: "image",
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
      if (this.mode === "color") {
        return {
          ...options,
          background: "#132743",
          text: "#d7385e",
        };
      } else if (this.mode === "pattern") {
        return {
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
        };
      } else {
        return {
          ...options,
          imageURL: "https://i.loli.net/2021/09/04/drBtUVNhlq87Rwc.jpg",
          text: "#fff",
        };
      }
    },
    dimension() {
      const scale = 0.5;
      return {
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
      };
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
</style>