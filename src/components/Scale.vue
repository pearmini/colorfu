<template>
  <div
    class="container"
    :style="{
      left: current.x,
      top: current.y,
      width: current.width,
      height: current.height,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import map from "../utils/map";

export default {
  props: {
    data: {
      domain: Array,
      range: {
        width: Array,
        height: Array,
        x: Array,
        y: Array,
      },
      progress: {
        type: Number,
        default: 0,
      },
    },
  },
  computed: {
    current: function () {
      return Object.keys(this.data.range).reduce((obj, key) => {
        const [r0, r1] = this.data.range[key];
        const isPercentage = isNaN(+r0);
        let t0, t1;
        if (isPercentage) {
          t0 = +r0.slice(0, -1);
          t1 = +r1.slice(0, -1);
        } else {
          t0 = +r0;
          t1 = +r1;
        }
        const t = map(+this.data.progress, 0, 1, t0, t1);
        obj[key] = isPercentage ? t + "%" : t + "px";
        return obj;
      }, {});
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  z-index: 10;
}
</style>