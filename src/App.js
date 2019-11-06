import Sidebar from "./components/Sidebar/index";
import Canvas from "./components/Canvas/index";

import useWindowSize from "./hooks/useWindowSize";
import useFormInput from "./hooks/useFormInput";
import useImage from "./hooks/useImage";
import useBoolean from "./hooks/useBoolean";
import useFormInputList from "./hooks/useFormInputList"

import defaultImageURL from "./static/images/example4.jpg";
import { awesome } from "./lib/awesome-poster";
import React from "react";

const poster = awesome.poster();

function App(props) {
  const [width, height] = useWindowSize();
  const editMode = useBoolean(false);
  const params = {
    title: useFormInput("Upwords"),
    imageURL: useImage(defaultImageURL),
    fontFamily: useFormInput("Wawati SC"),
    textColor: useFormInput("#ffffff"),
    fontSize: useFormInput(150),
    layout: useFormInput("middle"),
    contentFontSize: useFormInput(40),
    contentFontFamily: useFormInput("Wawati SC"),
    contentTextColor: useFormInput("#E3E3E3"),
    contents: useFormInputList([
      "Upwords is web tool to create awesome wallpaper like this!",
      "You can edit, save or see more examples by click the top-left button."
    ])
  };

  return (
    <div>
      <Sidebar
        editMode={editMode}
        windowSize={{width, height}}
        params={params}
        canvasToPng={poster.saveToPng}
        poster={poster}
      />
      <Canvas
        params={params}
        windowSize={{width, height}}
        editMode={editMode}
        poster={poster}
      />
    </div>
  );
}

export default App;
