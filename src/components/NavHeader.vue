<template>
  <div class="nav-header-container">
    <el-menu
      mode="horizontal"
      :router="true"
      :default-active="path"
      background-color="#24292f"
      text-color="#ffffff"
      active-text-color="#999999"
    >
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/editor"> Editor</el-menu-item>
      <el-menu-item index="/gallery">Gallery</el-menu-item>
      <el-menu-item index="">
        <a href="https://github.com/pearmini/carpe-diem" target="_blank">Github</a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: this.$router.currentRoute.path,
    };
  },
  watch: {
    $route(to) {
      const { path } = to;
      this.path = path;
    },
  },
};
</script>

<style>
.nav-header-container .el-menu {
  display: flex;
  justify-content: flex-end;
}
</style>