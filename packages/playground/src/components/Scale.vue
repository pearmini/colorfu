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
      x: Number,
      y: Number,
      scale: Number,
    },
    to: {
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
    offsetY: Number,
  },
  computed: {
    transformed() {
      const { from, to = from, progress, fixed } = this;
      const { x: fromX, y: fromY, scale: fromS } = from;
      const { x: toX, y: toY, scale: toS } = to;
      const boundingBox = {
        ...(fixed && { x: map(progress, 0, 1, fromX, toX) }),
        ...(fixed && { y: map(progress, 0, 1, fromY, toY) + this.offsetY }),
        scale: map(progress, 0, 1, fromS, toS),
      };
      return boundingBox;
    },
  },
};
</script>
