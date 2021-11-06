import fontURL from "../assets/font/en.woff2";
import { defaultImageURL } from "./image";

export const color = {
  text: {
    content: "How are you?",
    fontSize: 200,
    fontFamily: "Luckiest Guy",
    fontURL,
    type: "none",
    color: "#532582",
    mode: "autoFit",
    padding: 0,
    dy: 0
  },
  background: {
    type: "none",
    color: "#fcbc23",
    mode: "pattern"
  }
};

export const pattern = {
  text: {
    content: "How are you?",
    fontSize: 200,
    fontFamily: "Luckiest Guy",
    fontURL,
    type: "line",
    rotation: 45,
    width: 25,
    height: 25,
    foregroundColor: "#000",
    color: "#89E089",
    mode: "autoFit",
    lineWidth: 1.5,
    padding: 0,
    dy: 0
  },
  background: {
    mode: "pattern",
    color: "#fff",
    foregroundColor: "#ddd",
    type: "line",
    width: 50,
    lineWidth: 1.5,
    rotation: 0
  }
};

export const image = {
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
};
