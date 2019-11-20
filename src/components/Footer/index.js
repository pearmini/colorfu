import React from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
export default function(props) {
  const { poster, loading, showExamples } = props;
  const rightButtonStyle = {
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
            icon="up"
            ghost
            style={middileButtonStyle}
            onClick={() => {
                showExamples.setTrue();
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
