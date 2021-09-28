<template>
  <div class="container">
    <span class="input-label">{{ name }}</span>
    <slot />
  </div>
</template>

<script>
export default { props: { name: String } };
</script>

<style scoped>
.input-label {
  display: inline-block;
  padding-right: 0.5em;
}

.container {
  display: flex;
  align-items: center;
  padding: 0.25em 0.5em;
  justify-content: space-between;
}
</style>