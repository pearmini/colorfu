import options from "./index.json";
import IMAGE from "../../../../assets/images/4.jpg";

export const bigWorld = {
  name: "Big World",
  type: "image",
  options: {
    ...options,
    background: {
      ...options.background,
      imageURL: IMAGE,
    },
  },
};
