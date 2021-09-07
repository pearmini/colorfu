<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      default-active="/"
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
export default {};
</script>

<style>
</style>