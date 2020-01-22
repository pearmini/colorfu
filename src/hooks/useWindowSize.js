import { useState, useEffect } from "react";

export default function() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      const { innerHeight, innerWidth } = window;
      setHeight(innerHeight);
      setWidth(innerWidth);
    });
    return () => {
      window.removeEventListener("resize", this);
    };
  });
  return [width, height];
}
