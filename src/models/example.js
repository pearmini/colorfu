export default {
  namespace: "example",
  state: {
    title: "♞ell⦿ 2☯︎2零",
    color: "#ffffff",
    backgroundColor: "#fd5e53",
    fontSize: 250,
    mode: "h"
  },
  reducers: {
    changeValue(state, action) {
      const { type, value } = action.payload;
      state[type] = value;
      return state;
    },
    swapColor(state) {
      const { color, backgroundColor } = state;
      (state.color = backgroundColor), (state.backgroundColor = color);
      return state;
    },
    setExample(state, action) {
      const { words } = action.payload;
      return words;
    }
  }
};
