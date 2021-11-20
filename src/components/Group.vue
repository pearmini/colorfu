<template>
  <div class="group-container">
    <div class="group-container-header">
      <span class="group-container-name">
        <el-popover class="item" effect="dark" width="300" trigger="hover" placement="bottom-start">
          <p class="group-help-content">
            {{ help }}
          </p>
          <i class="el-icon-bell group-help-icon" slot="reference" />
        </el-popover>
        {{ name }}</span
      >
    </div>
    <div class="group-children">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    help: String,
  },
};
</script>

<style>
.group-container {
  padding: 1em 1em 0 1em;
}

.group-container-name {
  width: 100%;
  text-align: left;
  display: inline-block;
  font-weight: bold;
}

.group-children {
  padding: 0.5em 0;
}

.group-container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.25em;
}

.group-help-icon {
  padding-right: 5px;
  cursor: pointer;
}

.group-help-content {
  word-wrap: break-word;
  word-break: normal;
}
</style>
