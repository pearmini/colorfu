import React from "react";
import Sidebar from "./components/Sidebar/index";
import Canvas from "./components/Canvas/index";
import Footer from "./components/Footer/index";

import useWindowSize from "./hooks/useWindowSize";
import useBoolean from "./hooks/useBoolean";
import useCanvas from "./hooks/useCanvas";
import useCounter from "./hooks/useCounter";

import { awesome } from "./lib/awesome-poster";
import data from "./data/index";

const poster = awesome.poster();

function App(props) {
  const loading = useBoolean(true);
  const [width, height] = useWindowSize();
  const editMode = useBoolean(false);
  const [counterState, counterDispatch] = useCounter(0);
  const initialCanvas = data[counterState.count];
  const [canvasState, canvasDispatch] = useCanvas(initialCanvas);

  function handleNext() {
    if (counterState.count + 1 >= data.length) return;
    const nextCanvas = data[counterState.count + 1];
    counterDispatch({ type: "increment" });
    canvasDispatch({ type: "update", canvas: nextCanvas });
  }

  function handlePre() {
    if (counterState.count - 1 < 0) return;
    const preCanvas = data[counterState.count - 1];
    counterDispatch({ type: "decrement" });
    canvasDispatch({ type: "update", canvas: preCanvas });
  }

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
        editMode={editMode}
        poster={poster}
        loading={loading}
      />
      <Footer
        handleNext={handleNext}
        handlePre={handlePre}
        poster={poster}
        loading={loading}
      />
    </div>
  );
}

export default App;
