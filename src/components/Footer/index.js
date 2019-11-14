import React from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
export default function(props) {
  const { handleNext, handlePre, poster, loading } = props;
  const leftButtonStyle = {
      position: "absolute",
      right: 110,
      bottom: 10
    },
    rightButtonStyle = {
      position: "absolute",
      bottom: 10,
      right: 10
    },
    middileButtonStyle = {
      position: "absolute",
      bottom: 10,
      right: 60
    };

  function handleDowloadImage(e) {
    const filename = poster.title();
    poster.canvasToPng(`${filename}.png`);
  }

  return (
    <div>
      {!loading.value && (
        <div>
          <Button
            shape="circle"
            icon="left"
            ghost
            style={leftButtonStyle}
            onClick={() => {
              handlePre();
            }}
          />
          <Button
            shape="circle"
            icon="right"
            ghost
            style={middileButtonStyle}
            onClick={() => {
              handleNext();
            }}
          />
          <Button
            shape="circle"
            icon="download"
            ghost
            style={rightButtonStyle}
            onClick={() => {
              handleDowloadImage();
            }}
          />
        </div>
      )}
    </div>
  );
}
