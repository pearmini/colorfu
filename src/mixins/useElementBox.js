export const useElementBox = refName => ({
  data() {
    return {
      [refName + "X"]: 0,
      [refName + "Y"]: 0,
      [refName + "Width"]: 0,
      [refName + "Height"]: 0
    };
  },
  mounted() {
    const element = this.$refs[refName];
    if (!element) return;
    const { top, left, right, bottom } = element.getBoundingClientRect();
    this[refName + "X"] = left;
    this[refName + "Y"] = top;
    this[refName + "Width"] = right - left;
    this[refName + "Height"] = bottom - top;
  }
});
