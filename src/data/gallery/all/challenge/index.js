import options from "./index.json";
import IMAGE from "../../../../assets/images/5.jpeg";

export const challenge = {
  name: "Face challenge",
  type: "image",
  options: {
    ...options,
    background: {
      ...options.background,
      imageURL: IMAGE,
    },
  },
};

