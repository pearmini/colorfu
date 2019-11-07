import React, { useEffect } from "react";

export default function(props) {
  const { params, windowSize, editMode, poster } = props;

  useEffect(() => {
    const canvas = document.getElementById("app");
    poster.canvas(canvas);

    // 设置内容
    poster
      .imageURL(params.imageURL.value)
      .title(params.title.value)
      .contents(params.contents.value);

    // 设置样式
    poster
      .fontSize(params.fontSize.value)
      .contentFontSize(params.contentFontSize.value)
      .fontFamily(params.fontFamily.value)
      .contentFontFamily(params.contentFontFamily.value)
      .textColor(params.textColor.value)
      .contentTextColor(params.contentTextColor.value);

    // 设置布局
    poster
      .width(windowSize.width)
      .height(windowSize.height)
      .layout(params.layout.value);

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
