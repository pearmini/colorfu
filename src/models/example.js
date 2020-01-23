export default {
  namespace: "example",
  state: {
    value: {
      title: "♞ell⦿",
      color: "#ffffff",
      backgroundColor: "#000000",
      fontSize: 400,
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
