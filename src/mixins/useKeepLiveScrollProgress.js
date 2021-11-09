import { constrain, map } from "../utils/math";

// Todo refactor
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
    mounted() {
      window.scrollTo(0, 0);
    },
    activated() {
      const container = document.getElementById("app-container");
      if (this.scrollY < maxY) {
        const app = document.getElementById("app");
        app.style.width = "100%";
        app.style.height = window.innerHeight + maxY + "px";
        container.style.position = "fixed";
        container.style.width = "100%";
        container.style.marginTop = "0px";
        window.scrollTo(0, this.scrollY);
      } else {
        const container = document.getElementById("app-container");
        container.style.marginTop = maxY + "px";
        window.scrollTo(0, maxY);
      }
      window.addEventListener("wheel", this.handleMousewheel);
    },
    deactivated() {
      const app = document.getElementById("app");
      app.style.width = "auto";
      app.style.height = "auto";

      const container = document.getElementById("app-container");
      container.style.position = "static";
      container.style.marginTop = "0px";
      window.removeEventListener("wheel", this.handleMousewheel);
    }
  };
};
