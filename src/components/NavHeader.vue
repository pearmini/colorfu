<template>
  <div>
    <el-menu
      mode="horizontal"
      :router="true"
      default-active="/editor"
    >
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/editor"> Editor</el-menu-item>
      <el-menu-item index="/gallery">Gallery</el-menu-item>
      <el-menu-item index="">
        <a href="https://github.com/pearmini/carpe-diem" target="_blank"
          >Github</a
        >
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

};
</script>

<style>
.el-menu {
  display: flex;
  justify-content: flex-end;
}
</style>