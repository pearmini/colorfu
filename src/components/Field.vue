<template>
  <div :class="[containerClass, flex === 'row' ? rowClass : colClass]">
    <div class="input-label">
      <slot name="name">{{ name }}</slot>
    </div>
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
    return { containerClass: "field-container", rowClass: "row", colClass: "col" };
  },
};
</script>

<style scoped>
.input-label {
  display: inline-block;
  padding-right: 0.5em;
}

.field-container {
  padding: 0.25em 0em;
  font-size: 14px;
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

.col .input-label {
  margin-bottom: 0.5em;
}

.col > span {
  margin-bottom: 0.5em;
}
</style>