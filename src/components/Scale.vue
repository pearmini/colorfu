<template>
  <div class="container"><slot></slot></div>
</template>

<script>
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
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>