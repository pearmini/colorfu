import { constrain } from "../utils/math";

function getPage(URL) {
  const segments = URL.split("/");
  return segments[segments.length - 1];
}

export const useWindowScroll = (page = "*", minY = 0, maxY = 200) => ({
  data: () => ({
    scrollY: 0,
    realScrollY: 0
  }),
  methods: {
    _handleMousewheel(e) {
      if (page !== "*") {
        const currentPage = getPage(window.location.href);
        if (page !== currentPage) return;
      }
      const { deltaY } = e;
      const activeY0 = 0;
      const activeY1 = maxY + 50;

      // 最开始没有渲染 gallery，需要设置 clientHeight
      const clientHeight = Math.max(document.body.clientHeight, window.innerHeight);
      const maxScrollY = clientHeight - window.innerHeight + activeY1 + 50;
      this.realScrollY = constrain(this.realScrollY + deltaY, 0, maxScrollY);
      if (this.realScrollY >= activeY0 && this.realScrollY <= activeY1) {
        this.scrollY = constrain(this.scrollY + deltaY, minY, maxY);
        e.preventDefault();
      }
    }
  },
  mounted() {
    // passive 是必须需要的
    window.addEventListener("wheel", this._handleMousewheel, { passive: false });
  },
  destroyed() {
    window.removeEventListener("wheel", this._handleMousewheel, { passive: false });
  }
});
