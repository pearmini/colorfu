import React from "react";
import Sidebar from "./components/Sidebar/index";
import Canvas from "./components/Canvas/index";
import Footer from "./components/Footer/index";
import Examples from "./components/Examples/index";

import useWindowSize from "./hooks/useWindowSize";
import useBoolean from "./hooks/useBoolean";
import useCounter from "./hooks/useCounter";
import useCanvas from "./hooks/useCanvas";

import { awesome } from "./lib/awesome-poster";
import data from "./data/index";

const poster = awesome.poster();


function App() {
  const loading = useBoolean(false);
  const editMode = useBoolean(false);
  const showExamples = useBoolean(false);
  const [width, height] = useWindowSize();
  const [counterState, counterDispatch] = useCounter(0);
  const initialCanvas = data[counterState.count];
  const [canvasState, canvasDispatch] = useCanvas(initialCanvas);

  // 获得案例图片
  const images = data.map(item => item.exampleImageURL);

  function switchExample(index) {
    const nextCanvas = data[index];
    counterDispatch({ type: "switch", index });
    canvasDispatch({ type: "update", canvas: nextCanvas });
  }

  // setInterval(() => {
  //   canvasDispatch({type: "changeMode"})
  // }, 1000);

  return (
    <div>
      <Sidebar
        editMode={editMode}
        windowSize={{ width, height }}
        canvasState={canvasState}
        dispatch={canvasDispatch}
        canvasToPng={poster.saveToPng}
        poster={poster}
        loading={loading}
      />
      <Canvas
        canvasState={canvasState}
        windowSize={{ width, height }}
        poster={poster}
        loading={loading}
        editMode={editMode}
      />
      <Examples
        showExamples={showExamples}
        images={images}
        switchExample={switchExample}
      />
      <Footer showExamples={showExamples} poster={poster} loading={loading} />
    </div>
  );
}

export default App;
