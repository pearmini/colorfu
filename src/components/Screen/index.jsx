import React from "react";
import mac from "../../static/images/mac.jpg";
const Screen = function({ children, width, height }) {
  const outerWidth = 520,
    outerHeight = 250,
    offsetY = 40;

  const offsetHeight = 250;
  return (
    <div
      style={{
        width,
        height: height + offsetHeight,
        transform: "scale(0.45)",
        position: "absolute"
      }}
    >,
      <img
        src={mac}
        width={width + outerWidth}
        height={height + outerHeight}
        style={{
          position: "absolute",
          left: -outerWidth / 2,
          top: -outerHeight / 2 + offsetY
        }}
      />
      {children}
    </div>
  );
};

export default Screen;
