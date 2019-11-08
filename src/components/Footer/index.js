import React from "react";
export default function(props) {
  const {handleNext, handlePre} = props;
  const leftButtonStyle = {
    position: "absolute",
    right: 150,
    bottom: 10,
    width:100
  },
  rightButtonStyle = {
    position: "absolute",
    bottom:10,
    right: 10,
    width:100
  };

  return (
    <div>
      <button style={leftButtonStyle} onClick={handlePre}>Previous</button>
      <button style={rightButtonStyle} onClick={handleNext}>Next</button>
    </div>
  );
}
