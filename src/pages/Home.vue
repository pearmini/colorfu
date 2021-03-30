<template>
  <div>
    <h1>Carpe Diem</h1>
    <p>Use colors to make awesome wallpaper to carpe diem. 🍉</p>
    <button>Get Started</button>
    <scale
      v-for="example in examples"
      :key="example.type"
      :data="example.scale"
    >
      <screen :type="examples.type">
        <wallpaper :data="example.data" />
      </screen>
    </scale>
  </div>
</template>

<script>
import Wallpaper from "../components/Wallpaper.vue";
import Scale from "../components/Scale.vue";
import Screen from "../components/Screen.vue";

export default {
  data: () => ({
    examples: [
      {
        type: "mac",
        data: {
          title: "How are you?",
          bgColor: "#132743",
          textColor: "#d7385e",
          fontSize: 280,
          fontFamily: "Luckiest Guy",
        },
        scale: {
          domain: [0, 200],
          range: {
            width: [],
            height: [],
            x: [],
            y: [],
          },
        },
      },
    ],
  }),
  components: {
    Wallpaper,
    Scale,
    Screen,
  },
};
</script>

<style>
</style>