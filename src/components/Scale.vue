<template>
  <div
    class="container"
    :style="{
      left: current.x + 'px',
      top: current.y + 'px',
      width: current.width + 'px',
      height: current.height + 'px',
      transform: `scale(${current.scale}, ${current.scale})`,
      transformOrigin: 'left top'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { map } from "../utils/math";

export default {
  props: {
    from: {
      width: Number,
      height: Number,
      x: Number,
      y: Number,
    },
    to: {
      width: Number,
      height: Number,
      x: Number,
      y: Number,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    current: function () {
      const { x: fromX, y: fromY, width: fromW, height: fromH } = this.from;
      const { x: toX, y: toY, width: toW, height: toH } = this.to;
      return {
        x: map(this.progress, 0, 1, fromX, toX),
        y: map(this.progress, 0, 1, fromY, toY),
        scale: map(this.progress, 0, 1, 1, (toW / fromW + toH / fromH) / 2),
        width: fromW,
        height: fromH,
      };
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