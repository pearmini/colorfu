<template>
  <div
    class="screen-container"
    :style="{
      left: -border.left + 'px',
      top: -border.top + 'px',
      width: border.width + 'px',
      height: border.height + 'px',
      borderWidth: `${border.top}px ${border.right}px ${border.bottom}px ${border.left}px`,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderImage: `url(${src})`,
      borderImageSlice: `${meta.top} ${meta.right} ${meta.bottom} ${meta.left}`,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    meta: Object,
    width: Number,
    height: Number,
  },
  computed: {
    border() {
      const { width: containerWidth, height: containerHeight } = this;
      const {
        width: imageWidth,
        height: imageHeight,
        left: sliceLeft,
        right: sliceRight,
        bottom: sliceBottom,
        top: sliceTop,
      } = this.meta;
      const contentWidth = imageWidth - sliceLeft - sliceRight;
      const contentHeight = imageHeight - sliceBottom - sliceTop;
      const ratioX = containerWidth / contentWidth;
      const ratioY = containerHeight / contentHeight;
      const left = Math.ceil(sliceLeft * ratioX);
      const right = Math.ceil(sliceRight * ratioX);
      const top = Math.ceil(sliceTop * ratioY);
      const bottom = Math.ceil(sliceBottom * ratioY);
      return {
        left,
        right,
        top,
        bottom,
        width: containerWidth,
        height: containerHeight,
      };
    },
  },
};
</script>

<style scoped>
.screen-container {
  position: relative;
  transition: all 0.5s;
  transition-timing-function: linear;
}
</style>