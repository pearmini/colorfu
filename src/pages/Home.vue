<template>
  <div>
    <div class="top-container">
      <div class="top">
        <h1>Carpe Diem</h1>
        <p>Not only make your wallpaper beautiful, but also make it meaningful. 🍉</p>
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
      <device :width="screenSize.width" :height="screenSize.height">
        <el-carousel :height="screenSize.height + 'px'" :style="{ width: screenSize.width + 'px' }">
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
      </device>
    </scale>
  </div>
</template>

<script>
import Wallpaper from "../components/Wallpaper.vue";
import Device from "../components/Device.vue";
import Scale from "../components/Scale.vue";
import { useWindowScroll } from "../mixins/useWindowScroll";
import { useWindowSize } from "../mixins/useWindowSize";
import { map } from "../utils/math";
import { color, pattern, image } from "../data/examples";

const [MIN_Y, MAX_Y] = [0, 200];

export default {
  components: {
    Wallpaper,
    Device,
    Scale,
  },
  name: "home",
  data() {
    return {
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
      const macAspect = 0.625;
      const bodyHeight = ((this.windowHeight - 61) * 2) / 3;
      const padding = bodyHeight * 0.1;
      const deviceHeight = bodyHeight - padding;
      const screenHeight = (deviceHeight * (707 - 45 - 85)) / 707;
      const scale = screenHeight / (this.windowWidth * macAspect);
      return {
        from: {
          x: 0,
          y: 0,
          scale: 1,
        },
        to: {
          x: (this.windowWidth * (1 - scale)) / 2,
          y: this.windowHeight - screenHeight - 85 * scale - padding,
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
        this.progress <= 0
          ? sourceHeight
          : this.progress >= 1
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
  /** 61px 是 header 的高度 */
  height: calc((100vh - 61px) / 3);
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
  width: 100%;
}

/** device css 里面的样式会覆盖这个样式 */
.el-carousel__indicator--horizontal {
  display: inline-block !important;
}
</style>