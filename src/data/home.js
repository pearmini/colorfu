import pic from "../static/images/homepage.jpg"

const num = Math.random() * 2 | 0;
const mode = num === 0 ? "image" : "colors";
export default {
  title: "uPaper",
  contents: [
    "It is a web tool to create awesome pictures like this.",
    "You can use them as wallpaper or event a gift.",
    "You can DIY by click the top-left button or see more examples."
  ],
  // imageURL: "https://i.loli.net/2019/11/11/qLXbkMHA8FmEg4B.jpg",
  imageURL: pic,
  layout: "middle",
  fontFamily: "Righteous",
  textColor: "#ffffff",
  fontSize: 150,
  contentFontSize: 40,
  contentFontFamily: "Poiret One",
  contentTextColor: "#ffffff",
  mode: mode,
  colors:[
    { value: "#000000", weight: 0.4 },
  ],
  ratio: 0.5,
  blendType: "left",
  exampleImageURL: "https://i.loli.net/2019/11/11/qLXbkMHA8FmEg4B.jpg"
};
