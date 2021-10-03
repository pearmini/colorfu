<template>
  <div :class="[containerClass, flex === 'row' ? rowClass : colClass]">
    <span class="input-label">{{ name }}</span>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    flex: {
      default: "row",
      type: String,
    },
  },
  data() {
    return { containerClass: "container", rowClass: "row", colClass: "col" };
  },
};
</script>

<style scoped>
.input-label {
  display: inline-block;
  padding-right: 0.5em;
}

.container {
  padding: 0.25em 0.5em;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.col > span {
  margin-bottom: 0.5em;
}
</style>