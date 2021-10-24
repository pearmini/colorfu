<template>
  <div class="group-container">
    <div class="group-container-header">
      <span class="group-container-name">{{ name }}</span>
      <slot name="header" />
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
  },
};
</script>

<style scoped>
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
</style>
