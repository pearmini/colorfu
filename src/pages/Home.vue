<template>
  <div class="home-container">
    <div class="top-container">
      <div class="top-text">
        <h1>Make beautiful but also meaningful wallpapers.</h1>
        <p>
          ColorFu is where people can use words, colors, patterns and images to make unique
          wallpapers to express their feelings or ideas.
        </p>
        <div style="dispaly: flex">
          <el-button type="primary" @click="handleStarted">Make wallpaper</el-button>
          <el-button @click="handleOpen">Why is it</el-button>
        </div>
      </div>
      <div class="device-container" ref="deviceContainer">
        <scale
          :progress="progress"
          :from="position.from"
          :to="position.to"
          @onResize="handleResize"
          :fixed="true"
          :offsetY="progress >= 1 ? 200 : 0"
        >
          <device :width="screenSize.width" :height="screenSize.height">
            <el-carousel
              :height="screenSize.height + 'px'"
              :style="{ width: screenSize.width + 'px' }"
            >
              <el-carousel-item v-for="example in examples" :key="example.mode">
                <div
                  @click="handleSelectExample(example)"
                  :style="{
                    cursor: progress >= 1 ? 'pointer' : 'default',
                  }"
                >
                  <wallpaper
                    :options="example"
                    :width="screenSize.width"
                    :height="screenSize.height"
                  />
                </div>
              </el-carousel-item>
            </el-carousel>
          </device>
        </scale>
      </div>
    </div>
    <gallery v-show="progress > 0" />
  </div>
</template>

<script>
import Wallpaper from "../components/Wallpaper.vue";
import Device from "../components/Device.vue";
import Scale from "../components/Scale.vue";
import { useKeepLiveScrollProgress } from "../mixins/useKeepLiveScrollProgress";
import { useWindowSize } from "../mixins/useWindowSize";
import { useElementBox } from "../mixins/useElementBox";
import { color, pattern, image } from "../data/examples";
import Gallery from "../components/Gallery.vue";

export default {
  components: {
    Wallpaper,
    Device,
    Scale,
    Gallery,
  },
  name: "home",
  data() {
    return {
      disabled: false,
      examples: [color, pattern, image],
      screenSize: {},
    };
  },
  mixins: [useKeepLiveScrollProgress(200), useWindowSize(), useElementBox("deviceContainer")],
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
    position() {
      const macAspect = 0.625;
      const ratio = 0.7;
      const deviceContainerAspect = this.deviceContainerHeight / this.deviceContainerWidth;
      let deivceWidth;
      let deviceHeight;
      if (deviceContainerAspect > macAspect) {
        deivceWidth = this.deviceContainerWidth * ratio;
        deviceHeight = deivceWidth * macAspect;
      } else {
        deviceHeight = this.deviceContainerHeight * ratio;
        deivceWidth = deviceHeight / macAspect;
      }

      return {
        from: {
          x: 0,
          y: 0,
          scale: 1,
        },
        to: {
          x: this.deviceContainerX + (this.deviceContainerWidth - deivceWidth) / 2,
          y: this.deviceContainerY + (this.deviceContainerHeight - deviceHeight) / 2,
          scale: deivceWidth / this.windowWidth,
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
    handleSelectExample(example) {
      if (this.progress < 1) return;
      localStorage.setItem("cd-example", JSON.stringify(example));
      this.$router.push({ path: "editor" });
    },
    handleOpen() {
      window.open("https://github.com/pearmini/colorfu#why-is-it", "_blank");
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
  justify-content: flex-start;
  align-items: center;
  height: 480px;
  padding: 0 72px;
}

.top-text {
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  text-align: start;
}

.top-text > h1 {
  margin: 0.2em 0;
  font-weight: bold;
  font-size: 50px;
}

.top-text > p {
  font-size: 20px;
  margin-bottom: 1em;
}

.device-container {
  width: 50%;
  height: 100%;
}

.home-container .el-carousel__container {
  transition: all 0.5s;
  transition-timing-function: linear;
  width: 100%;
}

/** device css 里面的样式会覆盖这个样式 */
.home-container .el-carousel__indicator--horizontal {
  display: inline-block !important;
}
</style>