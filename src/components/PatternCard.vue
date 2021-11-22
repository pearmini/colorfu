<template>
  <div class="pattern-card-container">
    <canvas ref="canvas" class="pattern" />
    <span>{{ name }}</span>
  </div>
</template>

<script>
import { createPattern } from "../utils/pattern";
import { createContext } from "../utils/canvas";

export default {
  props: { options: Object, size: { type: Number, default: 300 }, name: String },
  mounted() {
    const canvas = this.$refs.canvas;
    const context = createContext(canvas, this.size, this.size);
    const { color } = this.options;
    context.fillStyle = createPattern(context, { ...this.options, backgroundColor: color });
    context.fillRect(0, 0, this.size, this.size);
  },
};
</script>

<style>
.pattern-card-container {
  cursor: pointer;
}

.pattern-card-container .pattern {
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: box-shadow 0.3s;
}

.pattern-card-container .pattern:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
