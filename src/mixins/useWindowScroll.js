import { constrain } from "../utils/math";

function getPage(URL) {
  const segments = URL.split("/");
  return segments[segments.length - 1];
}

export const useWindowScroll = (page = "*", minY = 0, maxY = 200, minX = 0, maxX = 200) => ({
  data: () => ({
    scrollY: 0,
    scrollX: 0
  }),
  methods: {
    _handleMousewheel({ deltaY, deltaX }) {
      if (page !== "*") {
        const currentPage = getPage(window.location.href);
        if (page !== currentPage) return;
      }
      this.scrollY = constrain(this.scrollY + deltaY, minY, maxY);
      this.scrollX = constrain(this.scrollX + deltaX, minX, maxX);
    }
  },
  mounted() {
    window.addEventListener("mousewheel", this._handleMousewheel);
  },
  destroyed() {
    window.removeEventListener("mousewheel", this._handleMousewheel);
  }
});
