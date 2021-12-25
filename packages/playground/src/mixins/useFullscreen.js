export const useFullscreen = () => ({
  data() {
    return {
      fullscreen: false
    };
  },
  mounted() {
    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
  },
  destroyed() {
    document.removeEventListener("fullscreenchange", this.handleFullscreenChange);
  },
  methods: {
    handleFullscreenChange() {
      this.fullscreen = document.fullscreenElement ? true : false;
    }
  }
});
