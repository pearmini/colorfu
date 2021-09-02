import { constrain } from "../utils/math";

export const useWindowScroll = (
  minY = 0,
  maxY = 200,
  minX = 0,
  maxX = 200
) => ({
  data: () => ({
    scrollY: 0,
    scrollX: 0,
  }),
  mounted: function() {
    window.addEventListener("mousewheel", ({ deltaY, deltaX }) => {
      this.scrollY = constrain(this.scrollY + deltaY, minY, maxY);
      this.scrollX = constrain(this.scrollX + deltaX, minX, maxX);
    });
  },
});
