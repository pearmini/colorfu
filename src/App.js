import React from "react";
import "./App.css";
import imagePath from "./static/images/example.jpg";
import WordsPaper from "./components/WordsPaper/index";
import Screen from "./components/Screen/index";
import { connect } from "dva";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  // const [width, height] = useWindowSize();
  const { width, height } = window.screen;
  return (
    <div>
      <Screen width={width} height={height}>
        <WordsPaper
          width={width}
          height={height}
          title="Happy New Year"
          imagePath={imagePath}
        />
      </Screen>
      <div
        style={{
          display: "flex"
        }}
      >
        <p>Words Paper</p>
        <button>home</button>
        <button>create</button>
        <button>gallery</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 300,

          fontWeight: "bold"
        }}
      >
        <p style={{ fontSize: 30 }}>Words Paper</p>
        <p style={{ fontSize: 70 }}>Make unique wallpaper.</p>
        <p style={{ fontSize: 70}}>Express different.</p>
      </div>
    </div>
  );
}

export default connect()(App);
