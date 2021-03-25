<template>
  <div>
    <h1>Home</h1>
    <div class="wallpaper"><wallpaper :data="wallpaper" /></div>
  </div>
</template>

<script>
import Wallpaper from "../components/Wallpaper.vue";
export default {
  data: () => ({
    wallpaper: {
      title: "Carpe Diem",
      bgColor: "#132743",
      textColor: "#d7385e",
      fontSize: 200,
      fontFamily: "Luckiest Guy",
    },
  }),
  components: {
    Wallpaper,
  },
};
</script>

<style>
.wallpaper {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
}
</style>