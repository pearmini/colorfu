export default {
  namespace: "control",
  state: {
    showPreview: false,
    imageUrl: ""
  },
  reducers: {
    displayPreview(state) {
      state.showPreview = true;
      return state;
    },
    hidePreview(state) {
      state.showPreview = false;
      return state;
    },
    setImageUrl(state, action) {
      const { imageUrl } = action.payload;
      state.imageUrl = imageUrl;
      return state;
    }
  }
};
