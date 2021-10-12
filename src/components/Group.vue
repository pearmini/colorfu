<template>
  <div class="group-container">
    <span>{{ name }}</span>
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

.group-container > span {
  width: 100%;
  text-align: left;
  display: inline-block;
  font-weight: bold;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.25em;
}

.group-children {
  padding: 0.5em 0;
}
</style>
