<template>
  <el-container class="container">
    <el-aside width="300px">Aside</el-aside>
    <el-container>
      <el-main><wallpaper /></el-main>
      <el-footer height="200px">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { Wallpaper } from "../components/Wallpaper.vue";
import { useWindowSize } from "../mixins/useWindowSize";
export default {
  data() {
    return {
      examples: [],
    };
  },
  mixins: [useWindowSize()],
  components: {
    Wallpaper,
  },
};
</script>

<style scoped>
.container {
  height: calc(100vh - 61px);
}

.el-footer {
  background-color: #b3c0d1;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
}
</style>