export default {
  namespace: "control",
  state: {
    showPreview: false
  },
  reducers: {
    displayPreview(state) {
      state.showPreview = true;
      return state;
    },
    hidePreview(state) {
      state.showPreview = false;
      return state;
    }
  }
};
