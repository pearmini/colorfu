import fontURL from "../../assets/font/en.woff2";

export const patterns = {
  name: "Patterns",
  wallpapers: [
    {
      name: "Patterns",
      options: {
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
      }
    }
  ]
};
