import React from "react";
const WordsPaper = function({ imagePath, title, width, height }) {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          color: "white",
          textShadow:"1px 1px 3px black"
        }}
      >
        <div
          style={{ width, height, display: "flex", flexDirection: "column" }}
        >
          <div style={{ flex: 1 }}></div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <p style={{ fontSize: 150, fontFamily: "Righteous" }}>
              {title}
            </p>
          </div>
          <div style={{ flex: 1, fontSize: 80 }}></div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: 1
        }}
      >
        <img src={imagePath} width={width} height={height} />
      </div>
    </div>
  );
};
export default WordsPaper;
