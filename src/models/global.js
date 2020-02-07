export default {
  namespace: "global",
  state: {
    showPreview: false,
    imageUrl: "",
    selectedNav: "home",
    headerTheme: {
      dark: {
        backgroundColor: "black",
        color: "white"
      },
      light: {
        backgroundColor: "transparent",
        color: "black"
      }
    }
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
    }
  }
};
