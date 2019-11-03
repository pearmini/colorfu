import React, { useState } from "react";
import Sidebar from "./components/Sidebar/index";
import Canvas from "./components/Canvas/index";
import defaultImageURL from "./static/images/example3.jpeg";
import defaultFontURL from "./static/fonts/font.woff2"
import useWindowSize from "./hooks/useWindowSize";
import { awesome } from "./lib/awesome-poster";

const poster = awesome.poster();

function App(props) {
  const [width, height] = useWindowSize();
  const [isEdit, setIsEdit] = useState(false);
  const [params, setParams] = useState({
    imageURL: defaultImageURL,
    fontSize: 150,
    fontFamily: "Wawati SC",
    title: "Upwords",
    textColor: "#f0f0f0",
    layout: 'middle',
    contentFontSize: 40,
    // fontURL: defaultFontURL,
    content:
      "Upwords is web tool to create awesome wallpaper like this!"
  });

  function handleShowEdit() {
      setIsEdit(true);
  }

  function handleHideEdit(){
      setIsEdit(false);
  }

  return (
    <div>
      <Sidebar
        isEdit={isEdit}
        windowSize={{ width, height }}
        handleChangeMode={handleShowEdit}
        params={params}
        setParams={setParams}
        canvasToPng={poster.saveToPng}
      />
      <Canvas
        params={params}
        windowSize={{ width, height }}
        handleChangeMode={handleHideEdit}
        poster={poster}
      />
    </div>
  );
}

export default App;
