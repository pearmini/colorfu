import React, { useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";

export default function(props) {
  const { canvasState, windowSize, poster, loading, fonts } = props;
  const style = {
    position: "absolute",
    left: window.innerWidth / 2 - 20,
    top: window.innerHeight / 2 - 20
  };
  // // 获取字体
  // const words = canvasState.title + canvasState.contents.join(" ");
  // console.log(words);

  // 设置生命周期监听函数
  poster
    .on("canvasWillDraw", console.log)
    .on("canvasDidDraw", console.log)
    .on("canvasWillLoadFont", console.log)
    .on("canvasDidLoadFont", console.log)
    .on("canvasWillLoadImage", console.log)
    .on("canvasDidLoadImage", () => loading.setFalse());

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

  useEffect(() => {
    const canvas = document.getElementById("app");
    poster.canvas(canvas);
    poster.draw();
  });

  return (
    <div>
      {loading.value && <Spin size="large" tip="加载图片中..." style={style} />}
      <canvas id="app"></canvas>
      {/* 初始化字体 */}
      {[...fonts.all, ...fonts.en].map((font, index) => (
        <p style={{fontFamily: font.en}} key={index}>
          hello world
        </p>
      ))}
    </div>
  );
}
