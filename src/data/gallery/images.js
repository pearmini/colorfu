import fontURL from "../../assets/font/luckiest_guy.woff2";
import { defaultImageURL } from "../image";

export const images = {
  name: "Image",
  wallpapers: [
    {
      name: "Image",
      options: {
        text: {
          content: "How are you?",
          fontSize: 200,
          fontFamily: "Luckiest Guy",
          fontURL,
          type: "none",
          color: "#fff",
          mode: "autoFit",
          padding: 0,
          dy: 0
        },
        background: {
          mode: "image",
          imageURL: defaultImageURL
        }
      }
    }
  ]
};
