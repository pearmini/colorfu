<template>
  <div>
    <div class="top-container">
      <div class="top">
        <h1>Carpe Diem</h1>
        <p>
          Use words mixed with colors, patterns and images to communicate with your wallpaper. 🍉
        </p>
        <el-button type="primary" @click="handleStarted">Get Started</el-button>
        <el-button type="success" @click="handleExplore">Explore</el-button>
      </div>
    </div>
    <scale
      :progress="progress"
      :from="position.from"
      :to="position.to"
      @onResize="handleResize"
      :fixed="true"
    >
      <screen
        :src="screenURL"
        :meta="screenMeta"
        :width="screenSize.width"
        :height="screenSize.height"
      >
        <el-carousel :height="screenSize.height + 'px'">
          <el-carousel-item v-for="example in examples" :key="example.mode">
            <div
              @click="handleSelectExample(example)"
              :style="{
                cursor: progress >= 1 ? 'pointer' : 'default',
              }"
            >
              <wallpaper :options="example" :width="screenSize.width" :height="screenSize.height" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </screen>
    </scale>
  </div>
</template>

<script>
import Wallpaper from "../components/Wallpaper.vue";
import Screen from "../components/Screen.vue";
import Scale from "../components/Scale.vue";
import screenURL from "../assets/images/mac.png";
import { useWindowScroll } from "../mixins/useWindowScroll";
import { useWindowSize } from "../mixins/useWindowSize";
import { map } from "../utils/math";
import { color, pattern, image } from "../data/examples";

const [MIN_Y, MAX_Y] = [0, 200];

export default {
  components: {
    Wallpaper,
    Screen,
    Scale,
  },
  name: "home",
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
      examples: [color, pattern, image],
      screenSize: {},
    };
  },
  mixins: [useWindowScroll("", MIN_Y, MAX_Y), useWindowSize()],
  watch: {
    progress: {
      immediate: true,
      handler() {
        this.computedScreenSize();
      },
    },
    windowWidth() {
      this.computedScreenSize();
    },
    windowHeight() {
      this.computedScreenSize();
    },
  },
  computed: {
    progress() {
      return map(this.scrollY, MIN_Y, MAX_Y, 0, 1);
    },
    position() {
      const bottom = 120;
      const macAspect = 0.625;
      const toHeight = ((this.windowHeight * 0.7 - 61) * (707 - 45 - 85)) / 707 - bottom / 2;
      const scale = toHeight / (this.windowWidth * macAspect);
      return {
        from: {
          x: 0,
          y: 0,
          scale: 1,
        },
        to: {
          x: (this.windowWidth * (1 - scale)) / 2,
          y: this.windowHeight - this.windowWidth * macAspect * scale - bottom,
          scale,
        },
      };
    },
  },
  methods: {
    handleResize({ width, height }) {
      this.screenSize = {
        width,
        height,
      };
    },
    handleStarted() {
      this.$router.push({
        path: "/editor",
      });
    },
    handleExplore() {
      this.$router.push({ path: "gallery" });
    },
    handleSelectExample(example) {
      if (this.progress < 1) return;
      localStorage.setItem("cd-example", JSON.stringify(example));
      this.$router.push({ path: "editor" });
    },
    computedScreenSize() {
      // 因为性能问题，不能直接将 source size 过度到 target size
      // 这样每次 scroll 的时候都会重新绘制
      // 替代方案就是在最后再把 size 设置为 targetSize
      // size 到 targetSize 的变换用 css transition 去实现
      const macAspect = 0.625;
      const macHeight = this.windowWidth * macAspect;
      const sourceHeight = this.windowHeight;
      const targetHeight = macHeight;
      const height =
        this.progress === 0
          ? sourceHeight
          : this.progress === 1
          ? targetHeight
          : this.screenSize.height;

      // 没有办法把 screenSize 作为一个计算属性
      // 因为它除了依赖 progress，windowWidth， windowHeight
      // 还依赖它自己
      this.screenSize = {
        width: this.windowWidth,
        height,
      };
    },
  },
};
</script>

<style>
.top-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 33.3vh;
}

.top > h1 {
  margin: 0.2em;
  font-weight: bold;
  font-size: 50px;
}

.top > p {
  font-size: 20px;
  margin-bottom: 1em;
}

.el-carousel__container {
  transition: all 0.5s;
  transition-timing-function: linear;
}
</style>