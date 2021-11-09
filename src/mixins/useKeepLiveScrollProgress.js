import { constrain, map } from "../utils/math";

export const useKeepLiveScrollProgress = maxY => {
  return {
    data: () => ({
      scrollY: 0,
      realScrollY: 0
    }),
    computed: {
      progress() {
        return map(this.scrollY, 0, maxY, 0, 1);
      }
    },
    methods: {
      handleMousewheel() {
        const scrollTop = document.documentElement.scrollTop;
        this.scrollY = constrain(scrollTop, 0, maxY);

        const container = document.getElementById("app-container");
        const app = document.getElementById("app");
        if (scrollTop < maxY) {
          app.style.width = "100%";
          app.style.height = window.innerHeight + maxY + "px";
          container.style.position = "fixed";
          container.style.width = "100%";
          container.style.marginTop = "0px";
        } else {
          app.style.width = "auto";
          app.style.height = "auto";
          container.style.position = "static";
          container.style.marginTop = maxY + "px";
        }
      }
    },
    activated() {
      window.addEventListener("wheel", this.handleMousewheel);
    },
    deactivated() {
      const app = document.getElementById("app");
      app.style.width = "auto";
      app.style.height = "auto";

      const container = document.getElementById("app-container");
      container.style.position = "static";
      container.style.marginTop = "auto";
      window.removeEventListener("wheel", this.handleMousewheel);
    }
  };
};
