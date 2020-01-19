import { useEffect, useState } from "react";

export default function() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      const { innerHeight, innerWidth } = window;
      setWidth(innerWidth);
      setHeight(innerHeight);
      return () => {
        window.removeEventListener(this);
      };
    });
  });
  return [width, height];
}
