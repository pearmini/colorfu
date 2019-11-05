import React, { useEffect } from "react";


let canvas = null;
export default function({ params, windowSize, handleChangeMode, poster }) {
  useEffect(() => {
    if (canvas === null) {
      canvas = document.getElementById("app");
      poster.canvas(canvas);
    }
    poster
      .width(windowSize.width)
      .height(windowSize.height)
      .imageURL(params.imageURL)
      .fontSize(params.fontSize)
      .fontFamily(params.fontFamily)
      .contentFontFamily(params.contentFontFamily)
      .title(params.title)
      .contents(params.contents)
      .textColor(params.textColor)
      .contentFontSize(params.contentFontSize)
      .layout(params.layout)
      .fontURL(params.fontURL)
      .contentTextColor(params.contentTextColor)
      .on("end", console.log);
    
    poster.draw();
  });
  return (
    <div onClick={handleChangeMode}>
      <canvas id="app"></canvas>
    </div>
  );
}
