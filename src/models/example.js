export default {
  namespace: "example",
  state: {
    value: {
      title: "♞ell⦿ 2☯︎2零",
      color: "#ffffff",
      backgroundColor: "#fd5e53",
      fontSize: 250,
      mode: "h"
    }
  },
  reducers: {
    changeValue(state, action) {
      const { type, value } = action.payload;
      state.value[type] = value;
      return state;
    },
    swapColor(state) {
      const { color, backgroundColor } = state.value;
      (state.value.color = backgroundColor),
        (state.value.backgroundColor = color);
      return state;
    }
  }
};
