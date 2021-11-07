import fontURL from "../../assets/font/luckiest_guy.woff2";

function mock(id) {
  return {
    name: "Colors" + id,
    options: {
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
    }
  };
}
export const colors = {
  name: "Colors",
  wallpapers: new Array(10).fill(0).map((_, i) => mock(i))
};
