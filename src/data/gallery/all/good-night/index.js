import options from "./index.json";
import IMAGE from "../../../../assets/images/2.jpg";

export const goodNight = {
  name: "Another Planet",
  type: "image",
  options: {
    ...options,
    background: {
      ...options.background,
      imageURL: IMAGE,
    },
  },
};
