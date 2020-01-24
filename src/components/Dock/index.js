import { useState } from "react";

export default function({ types, onClick }) {
  const [focusIndex, setFocusIndex] = useState(-2);
  function getScale(index) {
    if (focusIndex === index) {
      return 1.2;
    } else if (index === focusIndex - 1 || index === focusIndex + 1) {
      return 1.1;
    } else {
      return 1;
    }
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", height:100 }}>
        {types.map((type, index) => (
          <div
            key={index}
            style={{
              width: 100 * getScale(index),
              height: 50 * getScale(index),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "steelblue",
              marginLeft: 20,
              cursor: "pointer",
              transform: `scale(${getScale(index)})`
            }}
            onClick={() => onClick(type.id)}
            onMouseEnter={() => setFocusIndex(index)}
            onMouseLeave={() => setFocusIndex(-2)}
          >
            <div>{type.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
