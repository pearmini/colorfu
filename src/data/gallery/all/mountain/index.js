import options from "./index.json";
import IMAGE from "../../../../assets/images/3.jpg";

export const mountain = {
  name: "Eat Red Sun",
  type: "image",
  options: {
    ...options,
    background: {
      ...options.background,
      imageURL: IMAGE,
    },
  },
};
