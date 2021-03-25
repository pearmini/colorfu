<template>
  <div class="container" :style="{ background: data.bgColor }">
    <p
      :style="{
        fontSize: data.fontSize + 'px',
        fontFamily: data.fontFamily,
        color: data.textColor,
        fontWeight: 'bold',
      }"
    >
      {{ data.title }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      title: String,
      bgColor: String,
      fontSize: Number,
      fontFamily: String,
      textColor: String,
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>