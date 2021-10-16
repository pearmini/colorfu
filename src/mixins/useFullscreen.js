export const useFullscreen = () => ({
  data() {
    return {
      fullscreen: false
    };
  },
  mounted() {
    document.addEventListener("fullscreenchange", this._handleFullscreenChange);
  },
  destroyed() {
    document.removeEventListener("fullscreenchange", this._handleFullscreenChange);
  },
  methods: {
    _handleFullscreenChange() {
      this.fullscreen = document.fullscreenElement ? true : false;
    }
  }
});
