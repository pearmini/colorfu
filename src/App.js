import React, { useState } from "react";
import Sidebar from "./components/Sidebar/index";
import Canvas from "./components/Canvas/index";
import defalutURl from "./static/images/example3.jpeg";
import useWindowSize from "./hooks/useWindowSize";
import { awesome } from "./lib/awesome-poster";

const poster = awesome.poster();

function App(props) {
  const [width, height] = useWindowSize();
  const [isEdit, setIsEdit] = useState(false);
  const [params, setParams] = useState({
    imageURL: defalutURl,
    fontSize: 150,
    fontFamily: "Wawati SC",
    title: "Upwords",
    textColor: "#f0f0f0",
    layout: 'middle',
    content:
      "Upwords is tool based on web to create awesome wallpaper like this!"
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
