export default {
  namespace: "control",
  state: {
    showPreview: false,
    imageUrl: "",
    selectedNav: "home",
    showOverlayer: false
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
    },
    setSelectedNav(state, action) {
      const { key } = action.payload;
      state.selectedNav = key;
      return state;
    },
    setOverlayer(state, action) {
      const { value } = action.payload;
      state.showOverlayer = value;
      return state;
    }
  }
};
