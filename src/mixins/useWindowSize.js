export const useWindowSize = () => ({
  data: () => ({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  }),
  methods: {
    // 加一个前缀防止冲突
    _handleWindowResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    }
  },
  mounted() {
    window.addEventListener("resize", this._handleWindowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this._handleWindowResize);
  }
});
