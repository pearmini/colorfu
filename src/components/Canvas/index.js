import React, { useEffect } from "react";

export default function(props) {
  const { canvasState, windowSize, editMode, poster } = props;

  useEffect(() => {
    const canvas = document.getElementById("app");
    poster.canvas(canvas);

    // 设置内容
    poster
      .imageURL(canvasState.imageURL)
      .title(canvasState.title)
      .contents(canvasState.contents);

    // 设置样式
    poster
      .fontSize(canvasState.fontSize)
      .contentFontSize(canvasState.contentFontSize)
      .fontFamily(canvasState.fontFamily)
      .contentFontFamily(canvasState.contentFontFamily)
      .textColor(canvasState.textColor)
      .contentTextColor(canvasState.contentTextColor);

    // 设置布局
    poster
      .width(windowSize.width)
      .height(windowSize.height)
      .layout(canvasState.layout);

    // 设置生命周期监听函数
    poster
      .on("canvasWillDraw", console.log)
      .on("canvasDidDraw", console.log)
      .on("canvasWillLoadFont", console.log)
      .on("canvasDidLoadFont", console.log)
      .on("canvasWillLoadImage", console.log)
      .on("canvasDidLoadImage", console.log)

    poster.draw();
  });

  return (
    <div onClick={editMode.setFalse}>
      <canvas id="app"></canvas>
    </div>
  );
}
