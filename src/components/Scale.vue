<template>
  <div
    :style="[
      fixed && {
        position: 'absolute',
        left: transformed.x + 'px',
        top: transformed.y + 'px',
        zIndex,
      },
      {
        transformOrigin: 'left top',
        transform: `scale(${transformed.scale}, ${transformed.scale})`,
        width: transformed.width + 'px',
        height: transformed.height + 'px',
      },
      styles,
    ]"
  >
    <slot />
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
      scale: Number,
    },
    to: {
      width: Number,
      height: Number,
      x: Number,
      y: Number,
      scale: Number,
    },
    progress: Number,
    styles: Object,
    fixed: {
      default: false,
      type: Boolean,
    },
    zIndex: {
      default: 10,
      type: Number,
    },
  },
  computed: {
    transformed() {
      const { from, to = from, progress, fixed } = this;
      const { x: fromX, y: fromY, width: fromW, height: fromH, scale: fromS } = from;
      const { x: toX, y: toY, width: toW, height: toH, scale: toS } = to;
      const boundingBox = {
        ...(fixed && { x: map(progress, 0, 1, fromX, toX) }),
        ...(fixed && { y: map(progress, 0, 1, fromY, toY) }),
        width: map(progress, 0, 1, fromW, toW),
        height: map(progress, 0, 1, fromH, toH),
        scale: map(progress, 0, 1, fromS, toS),
      };
      this.$emit("onResize", boundingBox);
      return boundingBox;
    },
  },
};
</script>

<style scoped>
</style>