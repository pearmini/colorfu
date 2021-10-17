<template>
  <div
    class="device device-macbook device-spacegray screen-container"
    :style="transformStyles.container"
  >
    <div class="device-frame">
      <div :style="transformStyles.content">
        <slot></slot>
      </div>
    </div>
    <div class="device-stripe"></div>
    <div class="device-header"></div>
    <div class="device-sensors"></div>
    <div class="device-btns"></div>
    <div class="device-power"></div>
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
    transformStyles() {
      const deviceScreenWidth = 576;
      const deviceScreenHeight = 360;
      const tx = 83;
      const ty = 29;
      const sx = this.width / deviceScreenWidth;
      const sy = this.height / deviceScreenHeight;
      return {
        container: {
          transformOrigin: `${tx}px ${ty}px`,
          transform: `translate(${-tx}px, ${-ty}px) scale(${sx}, ${sy})`,
        },
        content: {
          transformOrigin: "left top",
          transform: `scale(${1 / sx}, ${1 / sy})`,
        },
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