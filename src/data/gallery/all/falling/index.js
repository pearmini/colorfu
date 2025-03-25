import options from "./index.json";
import IMAGE from "../../../../assets/images/1.jpeg";  

export const falling = {
  name: "Falling Down",
  type: "image",
  options: {
    ...options,
    background: {
      ...options.background,
      imageURL: IMAGE,
    },
  },
};
